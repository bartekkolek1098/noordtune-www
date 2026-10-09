import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {join} from "node:path";
import {test} from "node:test";
import type {Metadata} from "next";
import {
  blogArticleAlternates,
  blogArticleTranslationGroups,
  blogArticleUrl,
  blogArticlesForLocale,
  latestBlogArticles
} from "../src/content/blog-articles";
import {
  customerResultAlternates,
  customerResultUrl,
  displayCustomerResults,
  featuredCustomerResults,
  translatedCustomerResultSlugs
} from "../src/content/customer-results";
import {locales, site} from "../src/content/site";
import {pageHeroes, pricingPlans, seo} from "../src/content/copy";
import {seoLandingFromSlug} from "../src/content/seo-landings";
import sitemap from "../src/app/sitemap";
import {
  articleJsonLd,
  createBlogArticleMetadata,
  createCustomerResultMetadata,
  createMetadata,
  localBusinessJsonLd
} from "../src/lib/seo";

function metadataLanguages(metadata: Metadata) {
  const languages = metadata.alternates?.languages;
  assert.ok(languages && typeof languages === "object");
  return Object.fromEntries(
    Object.entries(languages).map(([locale, value]) => [locale, String(value)])
  );
}

test("homepage uses exactly three explicitly selected projects from the newest publication date", () => {
  const expected = [
    "ford-transit-connect-15-ecoblue-2019-stage-1",
    "toyota-proace-verso-vip-20d-2023-stage-1",
    "bmw-f40-118i-7dct300-tcu-tuning"
  ];

  for (const locale of locales) {
    const published = displayCustomerResults(locale);
    const featured = featuredCustomerResults(locale);
    assert.equal(featured.length, 3);
    assert.deepEqual(featured.map((result) => result.slug), expected);
    assert.ok(featured.every((result) => result.publishedAt === published[0].publishedAt));
  }
});

test("latest article selection uses publication date and stable editorial order for ties", () => {
  for (const locale of locales) {
    const published = blogArticlesForLocale(locale);
    const latest = latestBlogArticles(locale);
    const newestDate = Math.max(...published.map((article) => Date.parse(article.publishedAt)));
    assert.equal(latest.length, 2);
    assert.ok(latest.every((article) => Date.parse(article.publishedAt) === newestDate));
    assert.ok(latest.every((article) => article.status === "published"));
  }
});

test("every published article belongs to one explicit reciprocal translation group", () => {
  assert.equal(Object.keys(blogArticleTranslationGroups).length, 17);

  for (const locale of locales) {
    for (const article of blogArticlesForLocale(locale)) {
      const alternates = blogArticleAlternates(article);
      assert.deepEqual(Object.keys(alternates).sort(), [...locales].sort());
      assert.equal(alternates[locale], blogArticleUrl(article));
      assert.deepEqual(metadataLanguages(createBlogArticleMetadata(article)), alternates);
      assert.ok(!("x-default" in alternates));
    }
  }
});

test("every published customer result belongs to one explicit reciprocal translation group", () => {
  assert.equal(translatedCustomerResultSlugs.size, 7);

  for (const locale of locales) {
    for (const result of displayCustomerResults(locale)) {
      const alternates = customerResultAlternates(result);
      assert.deepEqual(Object.keys(alternates).sort(), [...locales].sort());
      assert.equal(alternates[locale], customerResultUrl(result));
      assert.deepEqual(metadataLanguages(createCustomerResultMetadata(result)), alternates);
      assert.ok(!("x-default" in alternates));
    }
  }
});

test("x-default is limited to general localized pages", () => {
  for (const locale of locales) {
    assert.equal(metadataLanguages(createMetadata(locale, "home"))["x-default"], site.url);
    assert.equal(
      metadataLanguages(createMetadata(locale, "chiptuning"))["x-default"],
      `${site.url}/nl/chiptuning`
    );
  }
});

test("Organization structured data uses the official local logo", () => {
  const logoUrl = `${site.url}/brand/noordtune-logo-schema.svg`;
  assert.ok(existsSync(join(process.cwd(), "public", "brand", "noordtune-logo-schema.svg")));

  const article = latestBlogArticles("nl", 1)[0];
  assert.ok(article);
  const structuredData = articleJsonLd(article);
  assert.equal(structuredData.author.logo.url, logoUrl);
  assert.equal(structuredData.author.logo.width, 600);
  assert.equal(structuredData.author.logo.height, 184);
  assert.equal(structuredData.publisher.logo.url, logoUrl);
  assert.equal(localBusinessJsonLd("nl").logo, logoUrl);
});

test("Power Catalog destination remains frozen", () => {
  assert.equal(site.catalogUrl, "https://power.noordtune.nl/");
});

test("AutoRepair service offerings use valid Offer and Service objects for every locale", () => {
  for (const locale of locales) {
    const business = localBusinessJsonLd(locale);
    assert.equal(business["@type"], "AutoRepair");
    assert.equal(business.makesOffer.length, 6);

    for (const offer of business.makesOffer) {
      assert.equal(offer["@type"], "Offer");
      assert.equal(offer.itemOffered["@type"], "Service");
      assert.ok(offer.itemOffered.name.trim().length > 0);
    }
  }
});

test("sitemap omits unverifiable modification dates but retains editorial dates", () => {
  const entries = sitemap();

  for (const url of [site.url + "/nl", site.url + "/nl/chiptuning", site.url + "/nl/stage-2-tuning", site.url + "/nl/ford-chiptuning"]) {
    const entry = entries.find((item) => item.url === url);
    assert.ok(entry, "Missing sitemap URL: " + url);
    assert.equal(entry.lastModified, undefined, "Unverified lastmod on " + url);
  }

  const article = latestBlogArticles("nl", 1)[0];
  const articleEntry = entries.find((item) => item.url === blogArticleUrl(article));
  assert.ok(articleEntry?.lastModified);
  assert.equal(new Date(articleEntry.lastModified).toISOString().slice(0, 10), article.updatedAt);

  const result = displayCustomerResults("nl")[0];
  const resultEntry = entries.find((item) => item.url === customerResultUrl(result));
  assert.ok(resultEntry?.lastModified);
  assert.equal(new Date(resultEntry.lastModified).toISOString().slice(0, 10), result.updatedAt);
});

test("Groningen tuning landing communicates the real Assen location and routes to a verified case", () => {
  const page = seoLandingFromSlug("nl", "chiptuning-groningen");
  assert.ok(page);
  assert.ok(page.seo.title.includes("Groningen"));
  assert.ok(page.hero.intro.includes("Assen"));
  assert.ok(page.sections.some((section) => section.text.includes("geen vestiging in Groningen")));
  assert.ok(page.sections.some((section) => section.text.includes("Volkswagen Caddy 2.0 TDI")));
  for (const href of [
    "/nl/chiptuning",
    "/nl/resultaten/vw-caddy-20-tdi-2020-stage-1",
    "/nl/prijzen",
    "/nl/contact",
    "/nl/afspraak"
  ]) {
    assert.ok(page.related.some((link) => link.href === href), "Missing Groningen enquiry or proof link: " + href);
  }
});

test("tuning-first pricing keeps approved amounts and sets an honest basic-diagnostics scope", () => {
  for (const locale of locales) {
    const plans = pricingPlans[locale];
    assert.equal(plans[0].name, "Stage 1");
    assert.equal(plans[0].price, "€150,-");
    assert.equal(plans[0].highlighted, true);
    assert.equal(plans[1].name, "Stage 2");
    assert.equal(plans[1].price, "€250,-");
    assert.equal(plans[2].price, "€89,-");
    assert.ok(!/Volledige diagnose|Full diagnosis|Pełna diagnostyka/.test(plans[2].text));
    assert.equal(plans[3].price, "€149,-");
    assert.equal(plans[4].price, "€129,-");
  }
  assert.equal(pricingPlans.nl[2].name, "Basisdiagnose");
  assert.match(pricingPlans.nl[2].text, /basiscontrole/);
  assert.equal(pricingPlans.en[2].name, "Basic diagnostics");
  assert.equal(pricingPlans.pl[2].name, "Podstawowa diagnostyka");
  assert.match(seo.prijzen.nl.title, /Stage 1 vanaf €150/);
  assert.match(pageHeroes.prijzen.nl.title.join(" "), /Chiptuning prijzen/);
});

test("Dutch service landing H1s name the exact commercial tuning service", () => {
  const targets = [
    ["stage-1-tuning", /Stage 1 tuning/],
    ["stage-2-tuning", /Stage 2 tuning/],
    ["ecu-remap", /ECU remap/],
    ["dsg-tcu-tuning", /DSG \/ TCU tuning/]
  ] as const;
  for (const [slug, expected] of targets) {
    const page = seoLandingFromSlug("nl", slug);
    assert.ok(page, "Published NL tuning page missing: " + slug);
    assert.match(page.hero.title.join(" "), expected);
    assert.equal(page.locale, "nl");
  }
});
