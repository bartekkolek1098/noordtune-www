import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {createMetadata} from "../src/lib/seo";
import {locales,site} from "../src/content/site";

test("x-default homepage points to an indexable Dutch language URL, not a language-dependent redirect",()=>{
 for(const locale of locales){
  const m=createMetadata(locale,"home");
  assert.equal(m.alternates?.canonical,`${site.url}/${locale}`);
  const languages=m.alternates?.languages;
  assert.ok(languages);
  assert.equal(languages["x-default"],`${site.url}/nl`);
  for(const lang of locales)assert.equal(languages[lang],`${site.url}/${lang}`);
 }
});

test("New visitors and crawlers receive the same default NL root route; explicit language cookie survives",()=>{
 const root=readFileSync("src/app/page.tsx","utf8");
 assert.match(root,/permanentRedirect\(\`\/\$\{defaultLocale\}\`\)/);
 assert.match(root,/cookieStore|cookies\(\)/);
 assert.match(root,/redirect\(\`\/\$\{storedLocale\}\`\)/);
 assert.doesNotMatch(root,/get\("accept-language"\)|headers\(\)|localeFromAcceptLanguage/);
 const switcher=readFileSync("src/components/language-switcher.tsx","utf8");
 assert.match(switcher,/storeLocaleCookie\(item\)/);
 assert.match(switcher,/hrefLang=\{item\}/);
});

test("Real Assen workshop area appears only on Dutch homepage and links the actual service areas",()=>{
 const comp=readFileSync("src/components/nl-local-service-area.tsx","utf8");
 const home=readFileSync("src/components/page-renderers.tsx","utf8");
 assert.match(home,/locale === "nl" \? <NlLocalServiceArea/);
 assert.match(comp,/data-testid="nl-local-workshop-region"/);
 assert.match(comp,/één werkplaats in/);
 assert.match(comp,/geen vestiging in Groningen/);
 for(const destination of ["/nl/chiptuning-assen","/nl/chiptuning-groningen","/nl/auto-diagnose-assen","/nl/resultaten","/nl/afspraak"]){
  assert.ok(comp.includes(destination),"Missing exact relevant live NL navigation: "+destination);
 }
 assert.match(comp,/name:"appointment_click"/);
 assert.match(comp,/name:"whatsapp_click"/);
 assert.match(comp,/site\.whatsappUrl/);
 assert.doesNotMatch(comp,/@"type"|Review|aggregateRating|ratingValue|addressPostalCode/);
});
