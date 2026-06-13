import {mkdir} from "node:fs/promises";
import {join} from "node:path";
import {chromium, type Page} from "playwright";

const baseUrl = "http://127.0.0.1:3001";
const outputDir = join(process.cwd(), "docs", "qa-screenshots", "mobile-menu");

const routes = [
  {locale: "pl", path: "/pl", fileName: "mobile-menu-pl.png"},
  {locale: "nl", path: "/nl", fileName: "mobile-menu-nl.png"},
  {locale: "en", path: "/en", fileName: "mobile-menu-en.png"}
] as const;

async function assertServerReachable() {
  try {
    const response = await fetch(`${baseUrl}/pl`, {method: "HEAD"});
    if (!response.ok) {
      throw new Error(`Server responded with HTTP ${response.status}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Local server is not reachable at ${baseUrl}. Start it first with: pnpm dev --hostname 127.0.0.1 --port 3001. Details: ${message}`
    );
  }
}

async function preparePage(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-delay: 0ms !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
      }
    `
  });
}

async function captureMobileMenus() {
  await assertServerReachable();
  await mkdir(outputDir, {recursive: true});

  const browser = await chromium.launch();

  try {
    for (const route of routes) {
      const context = await browser.newContext({
        viewport: {width: 390, height: 1200},
        deviceScaleFactor: 2,
        colorScheme: "dark",
        reducedMotion: "reduce",
        isMobile: true,
        hasTouch: true
      });

      const page = await context.newPage();
      await preparePage(page);

      const url = `${baseUrl}${route.path}`;
      const response = await page.goto(url, {waitUntil: "networkidle", timeout: 30_000});

      if (!response || !response.ok()) {
        throw new Error(`Failed to load ${url}: HTTP ${response?.status() ?? "unknown"}`);
      }

      const menuButton = page.locator('button[aria-controls="mobile-navigation"]').first();
      await menuButton.waitFor({state: "visible", timeout: 10_000});
      await menuButton.click();

      const menu = page.locator("#mobile-navigation");
      await menu.waitFor({state: "visible", timeout: 10_000});
      await page.waitForTimeout(150);

      const menuState = await page.evaluate(() => {
        const overlay = document.querySelector("#mobile-navigation");
        const elementAtCenter = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        const elementAtBottom = document.elementFromPoint(window.innerWidth - 32, window.innerHeight - 32);
        return {
          hasOverlay: Boolean(overlay),
          centerInsideMenu: Boolean(elementAtCenter?.closest("#mobile-navigation")),
          bottomInsideMenu: Boolean(elementAtBottom?.closest("#mobile-navigation")),
          bodyOverflow: document.body.style.overflow,
          bodyPosition: document.body.style.position
        };
      });

      if (!menuState.hasOverlay || !menuState.centerInsideMenu || !menuState.bottomInsideMenu) {
        throw new Error(`Mobile menu overlay did not cover the viewport correctly on ${route.path}`);
      }

      if (menuState.bodyOverflow !== "hidden" || menuState.bodyPosition !== "fixed") {
        throw new Error(`Scroll lock was not active after opening the menu on ${route.path}`);
      }

      const filePath = join(outputDir, route.fileName);
      await page.screenshot({path: filePath});
      console.log(`Captured ${route.locale} open mobile menu: ${filePath}`);

      await page.keyboard.press("Escape");
      await menu.waitFor({state: "hidden", timeout: 10_000});

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

captureMobileMenus().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
