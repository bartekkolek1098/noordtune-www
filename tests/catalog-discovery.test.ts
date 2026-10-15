import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {brandPages,type BrandKey} from "../src/content/brand-pages";
import {catalogTopics,catalogDiscoveryTopics,catalogTopicUrl} from "../src/content/catalog-discovery";

test("NL catalog discovery links are distinct, technical and on the verified Power Catalog host",()=>{
 const topics=Object.values(catalogTopics);
 assert.equal(topics.length,27);
 assert.equal(new Set(topics.map(t=>t.path)).size,topics.length);
 assert.equal(new Set(topics.map(t=>t.title)).size,topics.length);
 for(const t of topics){
  assert.match(t.path,/^\/nl\/(?:modellen|motoren|vehicles|bedrijfswagens|merken)(?:\/[a-z0-9-]+)+$/);
  assert.ok(t.title.length>=10&&t.detail.length>25);
  assert.ok(["Modelvergelijking","Motorprofiel","Bedrijfswagen","Merkenoverzicht"].includes(t.kind));
  const u=new URL(catalogTopicUrl(t));
  assert.equal(u.origin,"https://power.noordtune.nl");
  assert.equal(u.pathname,t.path);
  assert.equal(u.search,"");
  assert.equal(u.hash,"");
 }
});

test("Homepage has nine useful, non-duplicated direct vehicle/model URLs",()=>{
 const featured=catalogDiscoveryTopics();
 assert.equal(featured.length,9);
 assert.equal(new Set(featured.map(x=>x.path)).size,featured.length);
 assert.ok(featured.some(x=>x.path.startsWith("/nl/modellen/")));
 assert.ok(featured.some(x=>x.path.startsWith("/nl/bedrijfswagens/")));
});

test("Every published Dutch brand landing has distinct same-brand catalog links",()=>{
 const expected:BrandKey[]=["bmw","audi","volkswagen","ford","toyota"];
 const dutch=brandPages.filter(page=>page.locale==="nl");
 assert.deepEqual(new Set(dutch.map(page=>page.brand)),new Set(expected));
 for(const page of dutch){
  const links=catalogDiscoveryTopics(page.brand);
  assert.ok(links.length>=4&&links.length<=6,page.brand);
  assert.equal(links[0].path,"/nl/merken/"+page.brand,"Every published NL service brand links its verified engine directory");
  assert.equal(new Set(links.map(x=>x.path)).size,links.length);
  for(const link of links){
   const title=link.title.toLowerCase();
   if(page.brand==="bmw")assert.match(title,/bmw/);
   if(page.brand==="audi")assert.match(title,/audi/);
   if(page.brand==="volkswagen")assert.match(title,/volkswagen|transporter/);
   if(page.brand==="ford")assert.match(title,/ford|transit/);
   if(page.brand==="toyota")assert.match(title,/toyota/);
  }
 }
});

test("Internal entry points use crawlable NL links only in relevant pages",()=>{
 const home=readFileSync("src/components/page-renderers.tsx","utf8");
 const brand=readFileSync("src/components/brand-page-renderer.tsx","utf8");
 const component=readFileSync("src/components/catalog-deep-links.tsx","utf8");
 assert.match(home,/<CatalogDeepLinks locale=\{locale\} \/>/);
 assert.match(home,/pageKey === "chiptuning" \? <CatalogDeepLinks/);
 assert.match(brand,/<CatalogDeepLinks brand=\{page.brand\} locale=\{page.locale\}/);
 assert.match(component,/if\(locale!=="nl"\)return null/);
 assert.match(component,/href=\{catalogTopicUrl\(topic\)\}/);
 assert.match(component,/<nav aria-label=\{label\}/);
 assert.match(component,/href="https:\/\/power.noordtune.nl\/nl\/merken"/);
 assert.match(component,/data-testid="nl-technical-brand-directory-link"/);
 assert.ok(!component.includes('rel="nofollow"'));
 assert.ok(!component.includes("robots:{index:false}"));
});
