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
  const logoUrl = `${site.url}/brand/noordtune-logo.png`;
  assert.ok(existsSync(join(process.cwd(), "public", "brand", "noordtune-logo.png")));

  const article = latestBlogArticles("nl", 1)[0];
  assert.ok(article);
  const structuredData = articleJsonLd(article);
  assert.equal(structuredData.author.logo.url, logoUrl);
  assert.equal(structuredData.publisher.logo.url, logoUrl);
  assert.equal(localBusinessJsonLd("nl").logo, logoUrl);
});

test("Power Catalog destination remains frozen", () => {
  assert.equal(site.catalogUrl, "https://power.noordtune.nl/");
});
