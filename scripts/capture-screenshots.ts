import {chromium, type Page} from "playwright";
import {mkdir} from "node:fs/promises";
import {join} from "node:path";

const baseUrl = "http://127.0.0.1:3001";
const outputRoot = join(process.cwd(), "docs", "qa-screenshots");

type CaptureRoute = {
  path: string;
  name: string;
};

const routes: CaptureRoute[] = [
  {path: "/nl", name: "home"},
  {path: "/nl/chiptuning", name: "chiptuning"},
  {path: "/nl/auto-diagnose", name: "auto-diagnose"},
  {path: "/nl/diensten", name: "diensten"},
  {path: "/nl/prijzen", name: "prijzen"},
  {path: "/nl/resultaten", name: "resultaten"},
  {path: "/nl/blog", name: "blog"},
  {path: "/nl/over-ons", name: "over-ons"},
  {path: "/nl/contact", name: "contact"}
];

const viewports = [
  {folder: "desktop", width: 1440, height: 1200},
  {folder: "mobile", width: 390, height: 1200}
] as const;

async function assertServerReachable() {
  try {
    const response = await fetch(`${baseUrl}/nl`, {method: "HEAD"});
    if (!response.ok) {
      throw new Error(`Server responded with HTTP ${response.status}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Local dev server is not reachable at ${baseUrl}. Start it first with: pnpm dev --hostname 127.0.0.1 --port 3001. Details: ${message}`
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

async function triggerLazyImages(page: Page) {
  await page.evaluate(`
    (async () => {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const step = Math.max(window.innerHeight * 0.75, 600);
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await delay(60);
      }
      window.scrollTo(0, 0);
      await delay(120);
    })()
  `);
}

async function capture() {
  await assertServerReachable();

  for (const viewport of viewports) {
    await mkdir(join(outputRoot, viewport.folder), {recursive: true});
  }

  const browser = await chromium.launch();

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: {width: viewport.width, height: viewport.height},
        deviceScaleFactor: 1,
        colorScheme: "dark",
        reducedMotion: "reduce"
      });

      const page = await context.newPage();
      await preparePage(page);

      for (const route of routes) {
        const url = `${baseUrl}${route.path}`;
        const response = await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 30_000
        });

        if (!response || !response.ok()) {
          throw new Error(`Failed to load ${url}: HTTP ${response?.status() ?? "unknown"}`);
        }

        await triggerLazyImages(page);

        const filePath = join(outputRoot, viewport.folder, `${viewport.folder}-${route.name}.png`);
        await page.screenshot({
          path: filePath,
          fullPage: true
        });

        console.log(`Captured ${filePath}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

capture().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
