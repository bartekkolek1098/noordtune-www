import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {createMetadata} from "../src/lib/seo";
import {defaultLocale, locales, localeCookieName, sharedLocaleCookieName, site} from "../src/content/site";

test("shared cookie is distinct from legacy cookie and NL remains the crawler default", () => {
  assert.equal(sharedLocaleCookieName, "noordtune_preferred_locale");
  assert.equal(localeCookieName, "noordtune_locale");
  assert.notEqual(sharedLocaleCookieName, localeCookieName);
  assert.equal(defaultLocale, "nl");
  const root = readFileSync("src/app/page.tsx", "utf8");
  assert.match(root, /get\(sharedLocaleCookieName\)/);
  assert.match(root, /isLocale\(sharedLocale\) \? sharedLocale : visitorCookies\.get\(localeCookieName\)/);
  assert.match(root, /permanentRedirect\(\x60\/\$\{defaultLocale\}\x60\)/);
  assert.doesNotMatch(root, /headers\(\)|localeFromAcceptLanguage|navigator\.language/);
  for (const locale of locales) {
    const meta = createMetadata(locale, "home");
    assert.equal(meta.alternates?.canonical, `${site.url}/${locale}`);
    assert.equal(meta.alternates?.languages?.["x-default"], `${site.url}/nl`);
  }
});

test("sticky mobile/desktop switcher displays a globe and language code, with accessible three-language menu", () => {
  const switcher = readFileSync("src/components/language-switcher.tsx", "utf8");
  const header = readFileSync("src/components/header.tsx", "utf8");
  const mobile = readFileSync("src/components/mobile-menu.tsx", "utf8");
  assert.match(switcher, /data-testid="language-switcher-trigger"/);
  assert.match(switcher, /<Globe2/);
  assert.match(switcher, /aria-expanded=\{open\}/);
  assert.match(switcher, /aria-controls=\{menuId\}/);
  assert.match(switcher, /data-testid="language-switcher-options"/);
  assert.match(switcher, /min-h-11/);
  assert.match(switcher, /<Check/);
  assert.match(switcher, /Switch to \$\{languageLabels\[item\]\.name\}/);
  assert.match(switcher, /document\.addEventListener\("pointerdown"/);
  assert.match(switcher, /event\.key === "Escape"/);
  assert.match(switcher, /hrefLang=\{item\}/);
  assert.match(switcher, /languagePaths\?\.\[item\] \?\? pathFor\(item, pageKey\)/);
  assert.match(header, /<LanguageSwitcher compact/);
  assert.match(header, /<LanguageSwitcher languagePaths/);
  assert.match(mobile, /<LanguageSwitcher[\s\S]*?expanded/);
  assert.match(switcher, /Taal \/ Language \/ Język/);
  assert.match(switcher, /grid-cols-3/);
  assert.deepEqual(locales, ["nl", "en", "pl"]);
});

test("explicit selection stores one authoritative cookie on the parent domain without leaking private data", () => {
  const switcher = readFileSync("src/components/language-switcher.tsx", "utf8");
  assert.match(switcher, /Domain=\.noordtune\.nl/);
  assert.match(switcher, /\$\{sharedLocaleCookieName\}=\$\{locale\}/);
  assert.match(switcher, /Max-Age=31536000; SameSite=Lax/);
  assert.match(switcher, /storeLocaleCookie\(item\)/);
  assert.doesNotMatch(switcher, /plate|kenteken|vin|analytics|email|contactMessage/i);
});
