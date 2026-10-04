import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {join} from "node:path";
import {chromium, type BrowserContext, type Page} from "playwright";
import {latestBlogArticles, blogArticleAlternates, blogArticlePath} from "../src/content/blog-articles";
import {brandPagePath, brandPages} from "../src/content/brand-pages";
import {customerResultAlternates, customerResultPath, featuredCustomerResults} from "../src/content/customer-results";
import {locales, pageRoutes, pathFor, site, type Locale} from "../src/content/site";

const baseUrl = process.env.SEO_TEST_BASE_URL ?? "http://127.0.0.1:3001";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(baseUrl).hostname), "SEO browser tests must target localhost");
const output = join(process.cwd(), "docs", "qa-screenshots", "homepage-freshness-seo");
const viewports = [
  {width: 390, height: 844},
  {width: 820, height: 1180},
  {width: 1180, height: 820},
  {width: 1440, height: 1000}
];
const resultTitles = {
  nl: "Recente klantprojecten",
  en: "Recent customer projects",
  pl: "Najnowsze realizacje klientów"
} satisfies Record<Locale, string>;
const latestTitles = {
  nl: "Praktische kennis, uitleg en recente updates.",
  en: "Practical knowledge, explanations and recent updates.",
  pl: "Praktyczna wiedza, poradniki i najnowsze aktualizacje."
} satisfies Record<Locale, string>;
const internalPaths = new Set<string>();

async function guardNetwork(context: BrowserContext) {
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith("/_vercel/insights/")) return route.fulfill({status: 204});
    if (url.hostname === "va.vercel-scripts.com") return route.fulfill({status: 200, contentType: "application/javascript", body: "void 0;"});
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    return route.fulfill({status: 200, contentType: "text/plain", body: "External navigation intercepted by local QA"});
  });
}

async function collectInternalLinks(page: Page) {
  const hrefs = await page.locator("a[href]").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")).filter((href): href is string => Boolean(href))
  );
  for (const href of hrefs) {
    const url = new URL(href, site.url);
    if (url.origin === site.url) internalPaths.add(`${url.pathname}${url.search}`);
  }
}

async function assertPageBasics(page: Page, path: string) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
  assert.equal(response?.status(), 200, `${path} did not return 200`);
  assert.ok(await page.locator("main").innerText(), `${path} rendered no main content`);
  assert.equal(await page.locator("h1").count(), 1, `${path} must have one h1`);
  assert.ok(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
    `${path} has horizontal overflow`
  );
  const images = await page.locator("img").evaluateAll((items) =>
    items.map((image) => ({
      alt: image.getAttribute("alt"),
      decorative: image.getAttribute("aria-hidden"),
      src: image.getAttribute("src")
    }))
  );
  assert.ok(images.length > 0, `${path} rendered no images`);
  for (const image of images) {
    assert.notEqual(image.alt, null, `Image is missing alt on ${path}: ${image.src}`);
    if (image.alt === "") {
      assert.equal(image.decorative, "true", `Empty-alt image is not explicitly decorative on ${path}: ${image.src}`);
    }
  }
  const catalogLinks = await page.locator('a[href*="power.noordtune.nl"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href"))
  );
  assert.ok(catalogLinks.length > 0, `${path} has no Power Catalog path`);
  assert.ok(catalogLinks.every((href) => href === site.catalogUrl), `${path} changed a Power Catalog destination`);
  await collectInternalLinks(page);
  await page.waitForTimeout(50);
  assert.deepEqual(errors, [], `${path} logged browser errors`);
}

async function assertHomepage(page: Page, locale: Locale) {
  const resultSection = page.getByRole("heading", {name: resultTitles[locale], exact: true}).locator("xpath=ancestor::section");
  assert.equal(await resultSection.locator("[data-customer-result]").count(), 3);
  const resultHrefs = await resultSection.locator(`[data-customer-result] a[href^="/${locale}/${pageRoutes.resultaten[locale]}/"]`).evaluateAll((links) =>
    links.map((link) => link.getAttribute("href"))
  );
  assert.equal(resultHrefs.length, 3);
  assert.ok(resultHrefs.every((href) => href?.startsWith(`/${locale}/${pageRoutes.resultaten[locale]}/`)));

  const latest = page.getByRole("heading", {name: latestTitles[locale], exact: true}).locator("xpath=ancestor::div[contains(@class, 'border-t')]");
  const latestArticles = latestBlogArticles(locale);
  for (const article of latestArticles) {
    assert.equal(
      await latest.locator(`a[href="${blogArticlePath(locale, article.slug)}"]`).count(),
      1,
      `Latest article missing for ${locale}: ${article.slug}`
    );
  }
  assert.ok(await page.locator(`a[href="${pathFor(locale, "appointment")}"]`).count() > 0, `Homepage lacks appointment path for ${locale}`);
}

async function assertAlternates(page: Page, expected: Record<string, string>, path: string) {
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${site.url}${path}`);
  const alternates = Object.fromEntries(
    await page.locator('link[rel="alternate"][hreflang]').evaluateAll((links) =>
      links.map((link) => [link.getAttribute("hreflang"), link.getAttribute("href")])
    )
  );
  assert.deepEqual(alternates, expected);
  assert.ok(!("x-default" in alternates), `Detail page must not have x-default: ${path}`);
}

async function assertArticleJsonLd(page: Page) {
  const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.map((script) => JSON.parse(script.textContent ?? "{}"))
  );
  const article = blocks.find((block) => block["@type"] === "Article");
  assert.ok(article, "Article JSON-LD missing");
  const logo = `${site.url}/brand/noordtune-logo-schema.svg`;
  assert.equal(article.author?.logo?.url, logo);
  assert.equal(article.author?.logo?.width, 600);
  assert.equal(article.author?.logo?.height, 184);
  assert.equal(article.publisher?.logo?.url, logo);
}

async function main() {
  await mkdir(output, {recursive: true});
  const browser = await chromium.launch({channel: "chrome"});
  const representativeBrand = brandPages.find((page) => page.locale === "nl" && page.status === "published");
  assert.ok(representativeBrand);
  const representativeResult = featuredCustomerResults("nl", 1)[0];
  assert.ok(representativeResult);
  const representativeArticles = locales.map((locale) => latestBlogArticles(locale, 1)[0]);
  assert.ok(representativeArticles.every(Boolean));
  const routes = [
    "/nl/contact",
    "/nl/afspraak",
    "/nl/resultaten",
    "/nl/blog",
    "/nl/chiptuning",
    brandPagePath(representativeBrand),
    customerResultPath(representativeResult),
    ...representativeArticles.map((article) => blogArticlePath(article.locale, article.slug))
  ];

  try {
    for (const viewport of viewports) {
      for (const locale of locales) {
        const context = await browser.newContext({viewport, reducedMotion: "reduce", colorScheme: "dark"});
        await guardNetwork(context);
        const page = await context.newPage();
        await assertPageBasics(page, pathFor(locale, "home"));
        await assertHomepage(page, locale);
        if (locale === "nl") {
          await page.screenshot({path: join(output, `nl-home-${viewport.width}.png`), fullPage: true});
        }
        await context.close();
        console.log(`PASS ${locale} homepage ${viewport.width}x${viewport.height}`);
      }

      for (const path of routes) {
        const context = await browser.newContext({viewport, reducedMotion: "reduce", colorScheme: "dark"});
        await guardNetwork(context);
        const page = await context.newPage();
        await assertPageBasics(page, path);
        if (path === "/nl/chiptuning") {
          assert.ok(await page.locator('a[href^="/nl/resultaten/"]').count() >= 3);
          assert.ok(await page.locator('a[href^="/nl/blog/"]').count() >= 2);
          assert.ok(await page.locator('a[href="/nl/afspraak"]').count() >= 2);
        }
        await context.close();
        console.log(`PASS ${path} ${viewport.width}x${viewport.height}`);
      }
    }

    for (const article of representativeArticles) {
      const context = await browser.newContext({viewport: viewports[3]});
      await guardNetwork(context);
      const page = await context.newPage();
      const path = blogArticlePath(article.locale, article.slug);
      await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
      await assertAlternates(page, blogArticleAlternates(article), path);
      await assertArticleJsonLd(page);
      await context.close();
    }

    {
      const context = await browser.newContext({viewport: viewports[3]});
      await guardNetwork(context);
      const page = await context.newPage();
      const path = customerResultPath(representativeResult);
      await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
      await assertAlternates(page, customerResultAlternates(representativeResult), path);
      await context.close();
    }

    const requestContext = await browser.newContext();
    for (const path of [...internalPaths].sort()) {
      const response = await requestContext.request.get(`${baseUrl}${path}`);
      assert.ok(response.status() < 400, `Broken internal link ${path}: ${response.status()}`);
    }
    await requestContext.close();
    console.log(`Homepage/SEO browser QA passed: ${internalPaths.size} unique internal links resolved.`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : "Homepage/SEO browser QA failed");
  process.exitCode = 1;
});
