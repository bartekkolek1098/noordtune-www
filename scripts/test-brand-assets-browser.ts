import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {join} from "node:path";
import {chromium, type BrowserContext, type Page} from "playwright";
import {blogArticlePath, latestBlogArticles} from "../src/content/blog-articles";
import {brandPagePath, brandPages} from "../src/content/brand-pages";
import {customerResultPath, featuredCustomerResults} from "../src/content/customer-results";
import {locales, pathFor, site} from "../src/content/site";

const baseUrl = process.env.BRAND_TEST_BASE_URL ?? "http://127.0.0.1:3001";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(baseUrl).hostname), "Brand browser tests must target localhost");

const output = join(process.cwd(), ".tmp", "brand-assets-qa");
const viewports = [
  {width: 390, height: 844},
  {width: 430, height: 932},
  {width: 768, height: 1024},
  {width: 820, height: 1180},
  {width: 1180, height: 820},
  {width: 1440, height: 1000}
];
const schemaLogo = `${site.url}/brand/noordtune-logo-schema.svg`;
const assetPaths = [
  "/brand/noordtune-logo-dark.svg",
  "/brand/noordtune-logo-schema.svg",
  "/favicon.svg",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon-48x48.png",
  "/apple-touch-icon.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/site.webmanifest"
];

async function guardNetwork(context: BrowserContext) {
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    return route.fulfill({status: 200, contentType: "text/plain", body: "External request intercepted by local brand QA"});
  });
}

async function assertPageBrand(page: Page, path: string, errors: string[]) {
  errors.length = 0;
  const response = await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
  assert.equal(response?.status(), 200, `${path} did not return 200`);
  assert.ok(await page.locator("main").count(), `${path} rendered no main element`);
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    `${path} has horizontal overflow`
  );

  const logos = page.locator('img[src*="noordtune-logo-dark.svg"]');
  assert.ok(await logos.count() >= 2, `${path} does not render the supplied header and footer logos`);
  for (const logo of await logos.all()) {
    await logo.scrollIntoViewIfNeeded();
    const handle = await logo.elementHandle();
    assert.ok(handle, `${path} logo element disappeared before loading`);
    await page.waitForFunction((image) => (image as HTMLImageElement).complete, handle);
    const state = await logo.evaluate((image: HTMLImageElement) => ({
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      width: image.getBoundingClientRect().width,
      height: image.getBoundingClientRect().height
    }));
    assert.ok(state.complete && state.naturalWidth > 0 && state.naturalHeight > 0, `${path} has a broken logo`);
    assert.ok(state.width > 0 && state.height > 0, `${path} has an invisible logo`);
  }

  const catalogLinks = await page.locator('a[href*="power.noordtune.nl"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href"))
  );
  assert.ok(catalogLinks.length > 0, `${path} has no Power Catalog link`);
  assert.ok(catalogLinks.every((href) => href === site.catalogUrl), `${path} changed the Power Catalog destination`);
  assert.deepEqual(errors, [], `${path} logged browser errors`);
}

async function assertMetadataAndAssets(context: BrowserContext, page: Page) {
  for (const path of assetPaths) {
    const response = await context.request.get(`${baseUrl}${path}`);
    assert.equal(response.status(), 200, `${path} did not return 200`);
  }

  const manifestResponse = await context.request.get(`${baseUrl}/site.webmanifest`);
  const manifest = await manifestResponse.json();
  assert.deepEqual(manifest.icons, [
    {src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
    {src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png"}
  ]);
  for (const icon of manifest.icons) {
    assert.equal((await context.request.get(`${baseUrl}${icon.src}`)).status(), 200);
  }

  await page.goto(`${baseUrl}/nl`, {waitUntil: "networkidle"});
  const iconLinks = await page.locator('link[rel="icon"]').evaluateAll((links) =>
    links.map((link) => ({href: new URL((link as HTMLLinkElement).href).pathname, sizes: link.getAttribute("sizes")}))
  );
  for (const path of ["/favicon.svg", "/favicon-16x16.png", "/favicon-32x32.png", "/favicon-48x48.png", "/favicon.ico"]) {
    assert.ok(iconLinks.some((icon) => icon.href === path), `HTML metadata is missing ${path}`);
  }
  assert.equal(new URL(await page.locator('link[rel="manifest"]').getAttribute("href") ?? "", baseUrl).pathname, "/site.webmanifest");
  assert.equal(new URL(await page.locator('link[rel="apple-touch-icon"]').getAttribute("href") ?? "", baseUrl).pathname, "/apple-touch-icon.png");
  assert.equal(await page.locator('meta[name="theme-color"]').getAttribute("content"), "#111111");

  const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
  );
  const localBusiness = blocks.find((block) => block["@type"] === "AutoRepair");
  assert.ok(localBusiness, "Homepage AutoRepair JSON-LD is missing");
  assert.equal(localBusiness.logo, schemaLogo);
  assert.equal(localBusiness.image, schemaLogo);
  assert.equal((await context.request.get(localBusiness.logo.replace(site.url, baseUrl))).status(), 200);

  const registrations = await page.evaluate(async () =>
    "serviceWorker" in navigator ? (await navigator.serviceWorker.getRegistrations()).length : 0
  );
  assert.equal(registrations, 0, "Brand refresh must not register a service worker");
}

async function main() {
  await mkdir(output, {recursive: true});
  const browser = await chromium.launch({channel: "chrome"});
  const article = latestBlogArticles("nl", 1)[0];
  const result = featuredCustomerResults("nl", 1)[0];
  const brand = brandPages.find((page) => page.locale === "nl" && page.status === "published");
  assert.ok(article && result && brand);

  const routes = [
    ...locales.map((locale) => pathFor(locale, "home")),
    ...locales.map((locale) => pathFor(locale, "contact")),
    ...locales.map((locale) => pathFor(locale, "appointment")),
    blogArticlePath(article.locale, article.slug),
    customerResultPath(result),
    pathFor("nl", "chiptuning"),
    pathFor("nl", "diagnose"),
    brandPagePath(brand)
  ];

  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({viewport, reducedMotion: "reduce", colorScheme: "dark"});
      await guardNetwork(context);
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });

      for (const path of routes) {
        await assertPageBrand(page, path, errors);
      }

      await page.goto(`${baseUrl}/nl`, {waitUntil: "networkidle"});
      await page.screenshot({path: join(output, `nl-home-${viewport.width}x${viewport.height}.png`)});
      await page.locator("footer").screenshot({path: join(output, `nl-footer-${viewport.width}x${viewport.height}.png`)});
      if (viewport.width === 390) {
        await page.getByRole("button", {name: "Menu openen"}).click();
        assert.ok(await page.locator('img[src*="noordtune-logo-dark.svg"]').count() >= 3, "Mobile menu logo is missing");
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
        await page.screenshot({path: join(output, "nl-mobile-menu-390x844.png")});
      }

      if (viewport.width === 1440) {
        await assertMetadataAndAssets(context, page);
      }
      await context.close();
      console.log(`PASS brand routes ${viewport.width}x${viewport.height}`);
    }

    {
      const context = await browser.newContext({viewport: viewports.at(-1)});
      await guardNetwork(context);
      const page = await context.newPage();
      await page.goto(`${baseUrl}${blogArticlePath(article.locale, article.slug)}`, {waitUntil: "networkidle"});
      const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
        scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
      );
      const articleData = blocks.find((block) => block["@type"] === "Article");
      assert.ok(articleData, "Article JSON-LD is missing");
      assert.deepEqual(articleData.publisher.logo, {
        "@type": "ImageObject",
        url: schemaLogo,
        width: 600,
        height: 184
      });
      await context.close();
    }

    console.log(`Brand browser QA passed: ${routes.length} routes across ${viewports.length} viewports.`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : "Brand browser QA failed");
  process.exitCode = 1;
});
