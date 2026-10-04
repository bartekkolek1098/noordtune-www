import assert from "node:assert/strict";
import {chromium, type BrowserContext, type Page} from "playwright";
import {brandNavigationLinks} from "../src/content/brand-pages";
import {enquiryCopy} from "../src/content/enquiry";
import {locales, pathFor, site, type Locale} from "../src/content/site";

const baseUrl = process.env.ANALYTICS_TEST_BASE_URL ?? "http://127.0.0.1:3001";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(baseUrl).hostname), "Analytics browser tests must target localhost");

type CapturedEvent = ["event", {name: string; data: Record<string, string>}];

async function prepare(context: BrowserContext) {
  await context.addInitScript(() => {
    Object.defineProperty(window, "__ntAnalyticsEvents", {configurable: true, value: [], writable: true});
    Object.defineProperty(window, "__ntOpenCalls", {configurable: true, value: [], writable: true});
    window.va = (...args: unknown[]) => window.__ntAnalyticsEvents.push(args);
    window.open = (...args: unknown[]) => {
      window.__ntOpenCalls.push(args);
      return null;
    };
    document.addEventListener("click", (event) => {
      if ((event.target as Element | null)?.closest("a")) event.preventDefault();
    }, true);
  });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith("/_vercel/insights/")) return route.fulfill({status: 204});
    if (url.hostname === "va.vercel-scripts.com") {
      return route.fulfill({status: 200, contentType: "application/javascript", body: "void 0;"});
    }
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    return route.fulfill({status: 204});
  });
}

async function events(page: Page): Promise<CapturedEvent[]> {
  return page.evaluate(() => window.__ntAnalyticsEvents.filter((entry: unknown[]) => entry[0] === "event") as CapturedEvent[]);
}

async function clearEvents(page: Page) {
  await page.evaluate(() => { window.__ntAnalyticsEvents.length = 0; });
}

async function expectSingleClick(page: Page, selector: string, name: string, locale: Locale, property: "source" | "slug") {
  await clearEvents(page);
  const link = page.locator(selector).first();
  await link.click();
  const captured = await events(page);
  assert.equal(captured.length, 1, `${name} should fire exactly once`);
  assert.equal(captured[0][1].name, name);
  assert.equal(captured[0][1].data.locale, locale);
  assert.deepEqual(Object.keys(captured[0][1].data).sort(), ["locale", property].sort());
}

async function verifyLocale(page: Page, locale: Locale) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

  await page.goto(`${baseUrl}${pathFor(locale, "home")}`, {waitUntil: "networkidle"});
  assert.equal(await page.locator('script[src*="vercel-scripts.com"], script[src*="/_vercel/insights/"]').count(), 1);
  await expectSingleClick(page, '[data-analytics-event="power_catalog_click"][data-analytics-source="homepage_hero"]', "power_catalog_click", locale, "source");
  await expectSingleClick(page, '[data-analytics-event="appointment_click"]', "appointment_click", locale, "source");
  await expectSingleClick(page, '[data-analytics-event="customer_result_click"]', "customer_result_click", locale, "slug");
  await expectSingleClick(page, '[data-analytics-event="blog_article_click"]', "blog_article_click", locale, "slug");

  await page.goto(`${baseUrl}${pathFor(locale, "contact")}`, {waitUntil: "networkidle"});
  const composer = page.locator('[data-enquiry="contact"]');
  await clearEvents(page);
  await composer.getByLabel(enquiryCopy[locale].service, {exact: false}).selectOption("diagnostics");
  await composer.getByLabel(enquiryCopy[locale].description, {exact: false}).fill("NT-SYNTHETIC-ANALYTICS-CHECK");
  let captured = await events(page);
  assert.equal(captured.filter((event) => event[1].name === "appointment_enquiry_started").length, 1);
  assert.ok(!JSON.stringify(captured).includes("NT-SYNTHETIC-ANALYTICS-CHECK"));
  await clearEvents(page);
  await composer.getByRole("button", {name: enquiryCopy[locale].continue, exact: true}).click();
  captured = await events(page);
  assert.equal(captured.length, 1);
  assert.equal(captured[0][1].name, "appointment_whatsapp_handoff");
  assert.deepEqual(Object.keys(captured[0][1].data).sort(), ["locale", "source"]);
  assert.ok(!JSON.stringify(captured).includes("NT-SYNTHETIC-ANALYTICS-CHECK"));
  assert.equal(await page.evaluate(() => window.__ntOpenCalls.length), 1);
  await expectSingleClick(page, '[data-enquiry="contact"] [data-analytics-event="phone_click"]', "phone_click", locale, "source");
  await expectSingleClick(page, '[data-enquiry="contact"] [data-analytics-event="email_click"]', "email_click", locale, "source");
  await expectSingleClick(page, '[data-enquiry="contact"] [data-analytics-event="whatsapp_click"]', "whatsapp_click", locale, "source");

  await page.goto(`${baseUrl}${pathFor(locale, "appointment")}`, {waitUntil: "networkidle"});
  await clearEvents(page);
  const appointment = page.locator('[data-enquiry="appointment"]');
  await appointment.getByLabel(enquiryCopy[locale].description, {exact: false}).fill("NT-SYNTHETIC-START");
  captured = await events(page);
  assert.equal(captured.filter((event) => event[1].name === "appointment_enquiry_started").length, 1);

  await page.goto(`${baseUrl}${pathFor(locale, "resultaten")}`, {waitUntil: "networkidle"});
  await expectSingleClick(page, '[data-analytics-event="customer_result_click"]', "customer_result_click", locale, "slug");
  assert.equal(await page.locator(`a[href="${site.catalogUrl}"]`).first().getAttribute("href"), site.catalogUrl);

  await page.goto(`${baseUrl}${pathFor(locale, "blog")}`, {waitUntil: "networkidle"});
  await expectSingleClick(page, '[data-analytics-event="blog_article_click"]', "blog_article_click", locale, "slug");

  await page.goto(`${baseUrl}${pathFor(locale, "chiptuning")}`, {waitUntil: "networkidle"});
  await expectSingleClick(page, '[data-analytics-event="brand_page_click"]', "brand_page_click", locale, "slug");
  const brandHref = brandNavigationLinks(locale)[0]?.href;
  assert.ok(brandHref);
  await page.goto(`${baseUrl}${brandHref}`, {waitUntil: "networkidle"});
  await expectSingleClick(page, '[data-analytics-event="power_catalog_click"][data-analytics-source="brand_hero"]', "power_catalog_click", locale, "source");
  await expectSingleClick(page, '[data-analytics-event="whatsapp_click"][data-analytics-source="brand_hero"]', "whatsapp_click", locale, "source");
  await expectSingleClick(page, '[data-analytics-event="customer_result_click"]', "customer_result_click", locale, "slug");

  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  assert.deepEqual(errors, []);
}

async function verifyFailureDoesNotBlockNavigation(browser: import("playwright").Browser) {
  const context = await browser.newContext({viewport: {width: 390, height: 844}});
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "va.vercel-scripts.com") return route.fulfill({status: 200, contentType: "application/javascript", body: "void 0;"});
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    return route.fulfill({status: 204});
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/en`, {waitUntil: "networkidle"});
  await page.evaluate(() => { window.va = () => { throw new Error("Synthetic analytics failure"); }; });
  const link = page.locator('[data-analytics-event="blog_article_click"]').first();
  const href = await link.getAttribute("href");
  assert.ok(href);
  await Promise.all([page.waitForURL(`${baseUrl}${href}`), link.click()]);
  assert.equal(page.url(), `${baseUrl}${href}`);
  await context.close();
}

async function main() {
  const browser = await chromium.launch({channel: "chrome"});
  try {
    for (const locale of locales) {
      const context = await browser.newContext({viewport: {width: 820, height: 1180}, reducedMotion: "reduce"});
      await prepare(context);
      try {
        await verifyLocale(await context.newPage(), locale);
        console.log(`PASS ${locale} analytics events, privacy-safe payloads and responsive layout`);
      } finally {
        await context.close();
      }
    }
    await verifyFailureDoesNotBlockNavigation(browser);
    console.log("Analytics browser QA passed: requests intercepted; no production events or messages sent.");
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : "Analytics browser QA failed");
  process.exitCode = 1;
});

declare global {
  interface Window {
    __ntAnalyticsEvents: unknown[][];
    __ntOpenCalls: unknown[][];
  }
}
