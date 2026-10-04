import assert from "node:assert/strict";
import {mkdir} from "node:fs/promises";
import {join} from "node:path";
import {chromium, type BrowserContext, type Page} from "playwright";
import {enquiryCopy} from "../src/content/enquiry";
import {brandPagePath, brandPages} from "../src/content/brand-pages";
import {customerResultPath, displayCustomerResults, featuredCustomerResults} from "../src/content/customer-results";
import {locales, pathFor, site, type Locale} from "../src/content/site";
import type {EnquiryKind} from "../src/lib/enquiry";

const baseUrl = process.env.ENQUIRY_TEST_BASE_URL ?? "http://127.0.0.1:3001";
assert.ok(["127.0.0.1", "localhost"].includes(new URL(baseUrl).hostname), "Browser tests must target localhost");
const output = join(process.cwd(), "docs", "qa-screenshots", "contact-refresh");
const marker = "NT-SYNTHETIC-ONLY";
const description = `${marker} Zażółć gęślą jaźń & + #\nDruga linia: test ECU?`;
const phase = process.env.ENQUIRY_TEST_PHASE ?? "all";
assert.ok(["all", "forms", "fallback", "regression", "clipboard"].includes(phase), "Unknown test phase");
const viewports = [{width: 390, height: 844}, {width: 820, height: 1180}, {width: 1180, height: 820}, {width: 1440, height: 1000}];
const routes = locales.flatMap((locale) => (["contact", "appointment"] as const).map((kind) => ({locale, kind, path: pathFor(locale, kind)})));
const verifiedSocialProfiles = [
  {name: "Facebook", href: "https://www.facebook.com/profile.php?id=61590085682134"},
  {name: "Instagram", href: "https://www.instagram.com/noordtune.nl"}
];

async function guardNetwork(context: BrowserContext) {
  await context.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.startsWith("/_vercel/insights/")) return route.fulfill({status: 204});
    if (url.hostname === "va.vercel-scripts.com") return route.fulfill({status: 200, contentType: "application/javascript", body: "void 0;"});
    if (url.origin === new URL(baseUrl).origin) return route.continue();
    // No external navigation or message is ever sent, including WhatsApp, email and catalog.
    return route.fulfill({status: 200, contentType: "text/plain", body: "External navigation intercepted by local test"});
  });
}

async function storage(page: Page) {
  return page.evaluate(() => ({local: {...localStorage}, session: {...sessionStorage}, cookies: document.cookie}));
}

async function assertLayout(page: Page) {
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Horizontal overflow");
  const escapedControls = await page.locator("[data-enquiry] input, [data-enquiry] select, [data-enquiry] textarea, [data-enquiry] button, [data-enquiry] label, [data-enquiry] [role=alert]").evaluateAll((elements) => elements.filter((element) => {
    const box = element.getBoundingClientRect();
    return box.left < -1 || box.right > innerWidth + 1 || box.width < 1;
  }).length);
  assert.equal(escapedControls, 0, "Composer control or label exceeds viewport");
  // Enquiry pages use inline WhatsApp links; no fixed bubble can obstruct the fields.
  assert.equal(await page.locator('a.fixed[href^="https://wa.me/"]').count(), 0);
}

async function assertContactLinks(page: Page) {
  for (const area of [page.locator("footer"), page.locator("[data-enquiry]")]) {
    assert.equal(await area.locator('a[href^="tel:"]').first().getAttribute("href"), `tel:${site.phone.replace(/\s/g, "")}`);
    assert.equal(await area.locator('a[href^="mailto:"]').first().getAttribute("href"), `mailto:${site.email}`);
    assert.equal(await area.getByRole("link", {name: "WhatsApp", exact: true}).getAttribute("href"), site.whatsappUrl);
  }
  const destinations = await page.locator('a[href*="power.noordtune.nl"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  assert.ok(destinations.length > 0);
  assert.ok(destinations.every((href) => href === site.catalogUrl));
  for (const profile of verifiedSocialProfiles) {
    const link = page.locator("footer").getByRole("link", {name: profile.name, exact: true});
    assert.equal(await link.count(), 1);
    assert.ok(await link.isVisible());
    assert.equal(await link.getAttribute("href"), profile.href);
    assert.equal(await link.getAttribute("target"), "_blank");
    const rel = (await link.getAttribute("rel"))?.split(/\s+/) ?? [];
    assert.ok(rel.includes("noopener") && rel.includes("noreferrer"));
    assert.equal(await link.locator('svg[aria-hidden="true"]').count(), 1);
  }
  assert.equal(await page.locator('footer [aria-label="TikTok"], footer [aria-label="YouTube"], footer a[href*="tiktok.com"], footer a[href*="youtube.com"], footer a[href*="youtu.be"]').count(), 0);
}

async function handoff(context: BrowserContext, page: Page, action: () => Promise<unknown>, expected: string | null) {
  const popupPromise = context.waitForEvent("page");
  await action();
  const popup = await popupPromise;
  await popup.waitForURL("https://wa.me/**");
  await popup.waitForLoadState("domcontentloaded");
  const url = new URL(popup.url());
  assert.equal(url.origin + url.pathname, site.whatsappUrl, "Wrong WhatsApp recipient");
  assert.equal(url.searchParams.get("text"), expected, "Message changed during encoding");
  assert.equal(url.hash, "");
  await popup.close();
  await page.bringToFront();
}

async function checkMenu(page: Page) {
  const button = page.locator('button[aria-controls="mobile-navigation"]').first();
  if (!await button.isVisible()) return;
  await button.click();
  const menu = page.locator("#mobile-navigation");
  await menu.waitFor({state: "visible"});
  assert.equal(await page.evaluate(() => document.body.style.overflow), "hidden");
  assert.ok(await menu.locator("a").count() > 5);
  await page.keyboard.press("Tab");
  assert.ok(await page.evaluate(() => !!document.activeElement?.closest("#mobile-navigation")), "Menu keyboard focus escaped");
  await page.keyboard.press("Escape");
  await menu.waitFor({state: "hidden"});
}

async function verifyComposer(context: BrowserContext, page: Page, locale: Locale, kind: EnquiryKind, path: string) {
  const copy = enquiryCopy[locale];
  const browserErrors: string[] = [];
  const logged: string[] = [];
  const requests: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    logged.push(message.text());
    if (message.type() === "error") browserErrors.push(message.text());
  });
  context.on("request", (request) => {
    if (new URL(request.url()).origin === new URL(baseUrl).origin) requests.push(request.url(), request.postData() ?? "");
  });
  const response = await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
  assert.equal(response?.status(), 200);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${site.url}${path}`);
  const composer = page.locator("[data-enquiry]");
  const select = composer.getByLabel(copy.service, {exact: false});
  const request = composer.getByLabel(copy.description, {exact: false});
  const vehicle = composer.getByLabel(copy.vehicle, {exact: false});
  const plate = composer.getByLabel(copy.plate, {exact: false});
  const preview = composer.getByLabel(copy.preview, {exact: true});
  const proceed = composer.getByRole("button", {name: copy.continue, exact: true});
  const copyButton = composer.getByRole("button", {name: copy.copy, exact: true});
  const status = composer.getByRole("status");
  await select.waitFor({state: "visible"});
  assert.ok(await select.isEnabled());
  const originalStorage = await storage(page);
  assert.equal(await composer.locator("form").count(), 0);
  assert.equal(await composer.locator("input").count(), kind === "appointment" ? 3 : 2);
  assert.equal(await select.locator("option").count(), 6);
  await assertContactLinks(page);
  assert.equal(await composer.getByRole("link", {name: copy.privacy, exact: true}).getAttribute("href"), pathFor(locale, "privacy"));
  if (kind === "contact") {
    assert.equal(await page.locator('#contact > div a[href^="tel:"]').getAttribute("href"), `tel:${site.phone.replace(/\s/g, "")}`);
    assert.equal(await page.locator('#contact > div a[href^="mailto:"]').getAttribute("href"), `mailto:${site.email}`);
  } else {
    assert.doesNotMatch(await page.locator("main").innerText(), /coming soon|for now|komt binnenkort|voorlopig|w przygotowaniu|na razie/i);
  }

  await proceed.click();
  assert.equal(await select.getAttribute("aria-invalid"), "true");
  assert.equal(await request.getAttribute("aria-invalid"), "true");
  assert.ok(await select.evaluate((element) => document.activeElement === element));
  assert.equal(await composer.getByRole("alert").count(), 2);
  await assertLayout(page);
  await select.selectOption("diagnostics");
  await request.fill(" \n\t ");
  await vehicle.press("Enter");
  assert.equal(await request.getAttribute("aria-invalid"), "true");
  assert.equal(page.url(), `${baseUrl}${path}`);
  assert.equal(context.pages().length, 1);
  await select.focus();
  await page.keyboard.press("Tab");
  assert.ok(await request.evaluate((element) => document.activeElement === element));
  assert.notEqual(await request.evaluate((element) => getComputedStyle(element).boxShadow), "none", "Missing keyboard focus indicator");

  await request.fill(description);
  const minimal = await preview.inputValue();
  assert.ok(minimal.includes(description));
  for (const key of ["vehicle", "plate", "preferred"] as const) assert.ok(!minimal.includes(`${copy[key]}:`));
  assert.equal(context.pages().length, 1, "Typing must not open WhatsApp");
  await handoff(context, page, () => proceed.click(), minimal);
  assert.equal(await status.innerText(), "", "Handoff must not claim delivery or booking");
  assert.equal(await request.inputValue(), description, "Opening WhatsApp cleared fields");

  await vehicle.fill(`${marker} Test car 2.0 +`);
  await plate.fill("TEST-ONLY");
  if (kind === "appointment") await composer.getByLabel(copy.preferred, {exact: false}).fill("Test weekday afternoon");
  const complete = await preview.inputValue();
  await handoff(context, page, () => vehicle.press("Enter"), complete);
  assert.equal(page.url(), `${baseUrl}${path}`, "Enter changed the website URL");
  await request.press("End");
  await request.press("Enter");
  await request.pressSequentially("Another line");
  assert.ok((await request.inputValue()).includes("\nAnother line"));
  assert.equal(context.pages().length, 1, "Textarea Enter must add a newline");

  // A real clipboard write/read in an isolated browser context with permission.
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await copyButton.click();
  await page.waitForFunction((label) => document.querySelector('[data-enquiry] [role="status"]')?.textContent === label, copy.copied);
  assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n"), await preview.inputValue());
  await request.fill(description);
  assert.equal(await status.innerText(), "", "Editing must clear stale copy feedback");
  // String keeps tsx's function-name helpers out of the injected browser function.
  await page.evaluate("Object.defineProperty(navigator.clipboard, 'writeText', {configurable: true, value: async () => { throw new Error('Synthetic clipboard refusal'); }})");
  await copyButton.click();
  await page.waitForFunction((label) => document.querySelector('[data-enquiry] [role="status"]')?.textContent === label, copy.copyFailed);
  assert.equal(await preview.evaluate((element: HTMLTextAreaElement) => element.selectionEnd - element.selectionStart), (await preview.inputValue()).length);
  assert.ok(await preview.evaluate((element) => document.activeElement === element));
  assert.notEqual(await status.innerText(), copy.copied);
  assert.doesNotMatch(await status.innerText(), /message sent|booking completed|appointment confirmed|bericht verzonden|afspraak bevestigd|wiadomość wysłana|termin potwierdzony/i);
  assert.deepEqual(await storage(page), originalStorage, "Enquiry changed persistent browser storage");
  assert.ok(!requests.some((value) => decodeURIComponent(value).includes(marker)), "Input reached a NoordTune request");
  assert.ok(!logged.some((value) => value.includes(marker)), "Input reached browser logs");
  assert.deepEqual(browserErrors, []);
  await checkMenu(page);
  await assertLayout(page);
  await composer.scrollIntoViewIfNeeded();
  await page.screenshot({path: join(output, `${locale}-${kind}-${page.viewportSize()?.width}.png`), fullPage: true});
  await page.reload({waitUntil: "networkidle"});
  assert.equal(await request.inputValue(), "", "Input was persisted across reload");
  assert.equal(await vehicle.inputValue(), "");
}

async function verifyUnhydrated(context: BrowserContext, page: Page, locale: Locale, path: string) {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url(), request.postData() ?? ""));
  await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
  const composer = page.locator("[data-enquiry]");
  assert.equal(await composer.locator("form").count(), 0);
  assert.equal(await composer.locator("fieldset").getAttribute("disabled"), "");
  assert.ok(await composer.locator("input").first().isDisabled());
  assert.ok(await composer.getByText(enquiryCopy[locale].noScript, {exact: true}).isVisible());
  await assertContactLinks(page);
  // Prove the structural no-submit guarantee even if a browser restores control values.
  await composer.locator("fieldset").evaluate((element) => element.removeAttribute("disabled"));
  await composer.locator("input").first().fill(marker);
  await composer.locator("input").first().press("Enter");
  // Skip animation-frame stability polling in Chromium's JavaScript-disabled context.
  await composer.getByRole("button", {name: enquiryCopy[locale].continue, exact: true}).click({force: true});
  assert.equal(page.url(), `${baseUrl}${path}`);
  assert.ok(!requests.some((value) => value.includes(marker)));
  assert.equal(context.pages().length, 1);
}

async function verifyRegression(page: Page, locale: Locale) {
  const resultPrefix = `${pathFor(locale, "resultaten")}/`;
  await page.goto(`${baseUrl}${pathFor(locale, "home")}`, {waitUntil: "networkidle"});
  const resultLinks = () => page.locator(`main article a[href^="${resultPrefix}"]`).evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  assert.equal((await resultLinks()).length, 3);
  assert.deepEqual((await resultLinks()).sort(), featuredCustomerResults(locale).map(customerResultPath).sort());
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  // Existing iPad catalog metrics must remain contained and must not overlap.
  const statLabels = ["RDW", "Stage 1-3+", "DSG / TCU", locale === "nl" ? "Advies" : locale === "en" ? "Advice" : "Konsultacja"];
  const boxes = [];
  for (const label of statLabels) {
    const stat = page.getByText(label, {exact: true}).first();
    const box = await stat.boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= 821, `Catalog stat ${label} escapes the iPad viewport`);
    boxes.push(box);
  }
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const a = boxes[i], b = boxes[j];
    assert.ok(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y, "Catalog stat overlap");
  }
  await page.screenshot({path: join(output, `${locale}-home-ipad.png`), fullPage: true});
  await page.goto(`${baseUrl}${pathFor(locale, "resultaten")}`, {waitUntil: "networkidle"});
  assert.equal((await resultLinks()).length, 7);
  assert.deepEqual((await resultLinks()).sort(), displayCustomerResults(locale).map(customerResultPath).sort());
  for (const path of [pathFor(locale, "blog"), ...brandPages.filter((brand) => brand.locale === locale && brand.status === "published").map(brandPagePath)]) {
    const response = await page.goto(`${baseUrl}${path}`, {waitUntil: "networkidle"});
    assert.equal(response?.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"), `${site.url}${path}`);
  }
}

async function verifyClipboardTimingAndLinks(context: BrowserContext, page: Page) {
  await page.goto(`${baseUrl}/en/contact`, {waitUntil: "networkidle"});
  const composer = page.locator("[data-enquiry]");
  await composer.getByLabel("Service", {exact: false}).selectOption("advice");
  const request = composer.getByLabel(enquiryCopy.en.description, {exact: false});
  await request.fill(description);
  const copyButton = composer.getByRole("button", {name: "Copy message", exact: true});
  const status = composer.getByRole("status");
  await page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable: true, value: {writeText: () => new Promise(resolve => { window.finishTestCopy = resolve; })}})");
  await copyButton.click();
  assert.equal(await status.innerText(), "", "Pending clipboard write must not claim success");
  assert.ok(await composer.getByRole("button", {name: "Copying…", exact: true}).isDisabled());
  await request.fill(`${description}\nEdited while copying`);
  await page.evaluate("window.finishTestCopy()");
  assert.equal(await status.innerText(), "", "A stale clipboard completion must not mark the edited message as copied");
  await page.evaluate("Object.defineProperty(navigator, 'clipboard', {configurable: true, value: undefined})");
  await copyButton.click();
  assert.equal(await status.innerText(), enquiryCopy.en.copyFailed, "Unavailable clipboard must offer manual copying");
  await page.evaluate(`
    window.testProtocolLinks = [];
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href^="tel:"], a[href^="mailto:"]');
      if (link) { event.preventDefault(); window.testProtocolLinks.push(link.getAttribute('href')); }
    }, true);
  `);
  for (const area of [composer, page.locator("footer"), page.locator("#contact > div")]) {
    await area.locator('a[href^="tel:"]').click();
    await area.locator('a[href^="mailto:"]').click();
  }
  assert.deepEqual(await page.evaluate("window.testProtocolLinks"), Array.from({length: 3}, () => [`tel:${site.phone.replace(/\s/g, "")}`, `mailto:${site.email}`]).flat());
  await handoff(context, page, () => composer.getByRole("link", {name: "WhatsApp", exact: true}).click(), null);
  for (const profile of verifiedSocialProfiles) {
    const popupPromise = context.waitForEvent("page");
    await page.locator("footer").getByRole("link", {name: profile.name, exact: true}).click();
    const popup = await popupPromise;
    await popup.waitForURL((url) => url.href === profile.href);
    await popup.waitForLoadState("domcontentloaded");
    assert.equal(popup.url(), profile.href);
    assert.equal(await popup.evaluate(() => window.opener), null);
    await popup.close();
    await page.bringToFront();
    assert.equal(page.url(), `${baseUrl}/en/contact`);
  }
  assert.ok((await request.inputValue()).includes("Edited while copying"));
}

async function main() {
  await mkdir(output, {recursive: true});
  const browser = await chromium.launch({channel: "chrome"});
  let cases = 0;
  try {
    if (phase === "all" || phase === "forms") for (const viewport of viewports) for (const route of routes) {
      const context = await browser.newContext({viewport, reducedMotion: "reduce", colorScheme: "dark"});
      await guardNetwork(context);
      const page = await context.newPage();
      try {
        await verifyComposer(context, page, route.locale, route.kind, route.path);
        console.log(`PASS ${route.path} ${viewport.width}x${viewport.height}`);
        cases++;
      } catch (error) {
        await page.screenshot({path: join(output, `failure-${route.locale}-${route.kind}-${viewport.width}.png`), fullPage: true});
        throw error;
      } finally { await context.close(); }
    }
    if (phase === "all" || phase === "fallback") for (const mode of ["no-js", "blocked-hydration"] as const) for (const route of routes) {
      const context = await browser.newContext({javaScriptEnabled: mode !== "no-js", viewport: viewports[0], reducedMotion: "reduce"});
      await guardNetwork(context);
      if (mode === "blocked-hydration") await context.route("**/_next/**/*.js*", (request) => request.abort());
      try {
        await verifyUnhydrated(context, await context.newPage(), route.locale, route.path);
        console.log(`PASS ${route.path} ${mode}`);
        cases++;
      } finally { await context.close(); }
    }
    if (phase === "all" || phase === "regression") for (const locale of locales) {
      const context = await browser.newContext({viewport: viewports[1]});
      await guardNetwork(context);
      try {
        await verifyRegression(await context.newPage(), locale);
        console.log(`PASS ${locale} homepage/archive/blog/brands and iPad catalog regression`);
        cases++;
      } finally { await context.close(); }
    }
    if (phase === "all" || phase === "clipboard") {
      const context = await browser.newContext({viewport: viewports[0]});
      await guardNetwork(context);
      try {
        await verifyClipboardTimingAndLinks(context, await context.newPage());
        console.log("PASS clipboard timing/unavailable API and intercepted phone/email/WhatsApp/social links");
        cases++;
      } finally { await context.close(); }
    }
    console.log(`Enquiry browser QA passed (${phase}): ${cases} cases. External navigation intercepted; no messages sent.`);
  } finally { await browser.close(); }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.stack : "Browser QA failed");
  process.exitCode = 1;
});
