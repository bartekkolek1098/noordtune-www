import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {
  conversionEventNames,
  conversionEventPropertyKeys,
  createConversionTracker,
  maxConversionEventProperties,
  type ConversionEvent
} from "../src/lib/analytics";
import {site} from "../src/content/site";

const expectedNames = [
  "whatsapp_click",
  "appointment_click",
  "appointment_enquiry_started",
  "appointment_whatsapp_handoff",
  "power_catalog_click",
  "customer_result_click",
  "blog_article_click",
  "brand_page_click",
  "phone_click",
  "email_click"
].sort();

test("the conversion helper exposes only the approved event allowlist", () => {
  assert.deepEqual([...conversionEventNames].sort(), expectedNames);
  assert.equal(maxConversionEventProperties, 2);
});

test("every event has exactly two non-PII properties", () => {
  const safeKeys = new Set(["locale", "source", "slug"]);
  const forbidden = new Set(["name", "phone", "email", "registration", "kenteken", "vin", "message", "description", "date"]);
  for (const [name, keys] of Object.entries(conversionEventPropertyKeys)) {
    assert.equal(keys.length, 2, `${name} should use two properties`);
    assert.ok(keys.every((key) => safeKeys.has(key)), `${name} has an unexpected property`);
    assert.ok(keys.every((key) => !forbidden.has(key)), `${name} has a PII property`);
  }
});

test("the tracker forwards approved data and swallows transport failure", () => {
  const received: Array<{name: string; properties: Record<string, string>}> = [];
  const tracker = createConversionTracker((name, properties) => received.push({name, properties}));
  const event: ConversionEvent = {name: "power_catalog_click", properties: {locale: "en", source: "homepage_hero"}};
  tracker(event);
  assert.deepEqual(received, [event]);

  const failingTracker = createConversionTracker(() => { throw new Error("Synthetic blocked analytics"); });
  assert.doesNotThrow(() => failingTracker(event));

  assert.doesNotThrow(() => tracker({name: "visitor_supplied", properties: {locale: "en", source: "homepage_hero"}} as never));
  assert.equal(received.length, 1, "An event outside the allowlist reached the transport");
});

test("Analytics is mounted once without custom endpoints or beforeSend", () => {
  const sourceFiles = [
    "src/app/layout.tsx",
    "src/components/tracked-link.tsx",
    "src/lib/analytics.ts"
  ].map((path) => readFileSync(path, "utf8")).join("\n");
  assert.equal((sourceFiles.match(/<Analytics\s*\/>/g) ?? []).length, 1);
  assert.doesNotMatch(sourceFiles, /beforeSend|eventEndpoint|viewEndpoint|scriptSrc/);
});

test("WhatsApp handoff never adds the generated message to analytics properties", () => {
  const source = readFileSync("src/components/whatsapp-enquiry.tsx", "utf8");
  const handoff = source.match(/name: "appointment_whatsapp_handoff",\s*properties: \{([^}]*)\}/);
  assert.ok(handoff);
  assert.doesNotMatch(handoff[1], /message|fields|description|plate|preferred|phone|email|vin/i);
});

test("the Power Catalog destination remains exact", () => {
  assert.equal(site.catalogUrl, "https://power.noordtune.nl/");
});
