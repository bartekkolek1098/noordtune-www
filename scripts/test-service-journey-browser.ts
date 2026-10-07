import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {join} from "node:path";
import {chromium, type BrowserContext, type Page} from "playwright";
import {customerResultFromRoute, customerResultPath} from "../src/content/customer-results";
import {locales, pageRoutes, pathFor, site} from "../src/content/site";

const baseUrl = process.env.JOURNEY_TEST_BASE_URL ?? "http://127.0.0.1:3002";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(baseUrl).hostname), "Journey QA must target localhost");
const output = join(process.cwd(), "docs", "qa-screenshots", "chiptuning-service-growth");
const services = ["stage-1-tuning", "stage-2-tuning", "ecu-remap", "dsg-tcu-tuning"];
const proofCases = [
  {service: "stage-2-tuning", slug: "audi-a4-b7-20-tdi-stage-2-plus"},
  {service: "dsg-tcu-tuning", slug: "bmw-f40-118i-7dct300-tcu-tuning"}
];
const viewports = [
  {width: 390, height: 844}, {width: 430, height: 932}, {width: 768, height: 1024},
  {width: 820, height: 1180}, {width: 1180, height: 820}, {width: 1440, height: 1000}
];

async function guard(context: BrowserContext) {
  await context.addInitScript(() => {
    window.__ntAnalyticsEvents = [];
    window.va = (...args: unknown[]) => { window.__ntAnalyticsEvents.push(args); };
    document.addEventListener("click", (event) => {
      if ((event.target as Element | null)?.closest("a[data-analytics-event]")) event.preventDefault();
    }, true);
  });
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "va.vercel-scripts.com") return route.fulfill({status: 200, contentType: "application/javascript", body: "void 0;"});
    if (url.pathname.startsWith("/_vercel/insights/")) return route.fulfill({status: 204});
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    return route.fulfill({status: 204});
  });
}

async function basics(page: Page, path: string) {
  const response = await page.goto(`${baseUrl}${path}`, {waitUntil: "load"});
  assert.equal(response?.status(), 200, `${path} must return 200`);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path} overflows`);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${site.url}${path}`);
  const catalogLinks = await page.locator('a[href*="power.noordtune.nl"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  assert.ok(catalogLinks.length > 0 && catalogLinks.every((href) => href === site.catalogUrl));
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const block of blocks) JSON.parse(block);
}

async function checkActions(page: Page, section: string) {
  const area = page.locator(section);
  assert.equal(await area.locator(`a[href="${pathFor("nl", "prijzen")}"]`).count(), 1);
  for (const [name, href] of [
    ["appointment_click", pathFor("nl", "appointment")],
    ["power_catalog_click", site.catalogUrl],
    ["whatsapp_click", site.whatsappUrl]
  ]) {
    await page.evaluate(() => { window.__ntAnalyticsEvents.length = 0; });
    const link = area.locator(`[data-analytics-event="${name}"]`);
    assert.equal(await link.getAttribute("href"), href);
    if (href.startsWith("https:")) {
      assert.equal(await link.getAttribute("target"), "_blank");
      assert.ok((await link.getAttribute("rel"))?.includes("noreferrer"));
    }
    await link.click();
    const captured = await page.evaluate(() => window.__ntAnalyticsEvents.filter((entry: unknown[]) => entry[0] === "event"));
    assert.deepEqual(JSON.parse(JSON.stringify(captured)), [["event", {name, data: {locale: "nl", source: "site_cta"}}]], "Each action must emit exactly one safe event");
  }
}

async function main() {
  await mkdir(output, {recursive: true});
  const browser = await chromium.launch({channel: "chrome"});
  try {
    for (const viewport of viewports) {
      const context = await browser.newContext({viewport});
      await guard(context);
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await basics(page, "/nl/chiptuning");
      assert.equal(await page.locator("[data-service-journey]").count(), 1);
      for (const service of services) {
        assert.equal(await page.locator(`[data-service-journey] nav a[href="/nl/${service}"]`).count(), 1);
        assert.equal((await context.request.get(`${baseUrl}/nl/${service}`)).status(), 200);
      }
      await checkActions(page, "[data-service-journey]");
      await page.locator("[data-service-journey]").screenshot({path: join(output, `chooser-${viewport.width}x${viewport.height}.png`), style: "header, a.fixed {visibility: hidden !important;}"});
      if (viewport.width === 390) {
        for (const service of services) {
          await basics(page, "/nl/chiptuning");
          await Promise.all([
            page.waitForURL(`${baseUrl}/nl/${service}`),
            page.locator(`[data-service-journey] nav a[href="/nl/${service}"]`).click()
          ]);
          assert.ok(await page.locator("main").innerText());
        }
      }
      for (const proof of proofCases) {
        await basics(page, `/nl/${proof.service}`);
        const result = customerResultFromRoute("nl", pageRoutes.resultaten.nl, proof.slug);
        assert.ok(result && result.customerApproved);
        const area = page.locator(`[data-tuning-proof="${proof.service}"]`);
        const link = area.locator('[data-analytics-event="customer_result_click"]');
        assert.equal(await link.getAttribute("href"), customerResultPath(result));
        assert.equal((await context.request.get(`${baseUrl}${customerResultPath(result)}`)).status(), 200);
        const text = await area.innerText();
        if (proof.service === "stage-2-tuning") {
          assert.match(text, /hybride turbo en downpipe/);
          assert.match(text, /alleen voor deze Audi/);
          assert.match(text, /openbare weg/);
          assert.ok(!/235|470/.test(text), "Case output must not become a general tuning promise");
        } else {
          assert.match(text, /GETRAG 7DCT300/);
          assert.match(text, /geen Volkswagen DSG-project/);
        }
        await page.evaluate(() => { window.__ntAnalyticsEvents.length = 0; });
        await link.click();
        const captured = await page.evaluate(() => window.__ntAnalyticsEvents.filter((entry: unknown[]) => entry[0] === "event"));
        assert.deepEqual(JSON.parse(JSON.stringify(captured)), [["event", {name: "customer_result_click", data: {locale: "nl", slug: result.slug}}]]);
        await checkActions(page, `[data-tuning-proof="${proof.service}"]`);
        await area.screenshot({path: join(output, `${proof.service}-${viewport.width}x${viewport.height}.png`), style: "header, a.fixed {visibility: hidden !important;}"});
      }
      for (const locale of locales) {
        for (const key of ["home", "diensten"] as const) {
          await basics(page, pathFor(locale, key));
          const card = page.locator("main article").filter({has: page.getByRole("heading", {name: "DSG / TCU tuning", exact: true})});
          assert.equal(await card.locator("a").getAttribute("href"), locale === "nl" ? "/nl/dsg-tcu-tuning" : pathFor(locale, "diensten"));
        }
        for (const key of ["chiptuning", "prijzen", "appointment"] as const) {
          await basics(page, pathFor(locale, key));
          if (locale !== "nl") assert.equal(await page.locator("[data-service-journey], [data-tuning-proof]").count(), 0);
          if (key === "appointment") assert.equal(await page.locator('[data-enquiry="appointment"]').count(), 1);
        }
      }
      assert.deepEqual(errors, [], "No browser console or runtime errors");
      await context.close();
      console.log(`PASS service journey, case proof, safe single events and NL/EN/PL routes ${viewport.width}x${viewport.height}`);
    }
    console.log("Service journey browser QA passed. External navigation and analytics collection intercepted; no messages sent.");
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
