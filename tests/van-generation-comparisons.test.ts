import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {businessVanModels,businessVansPath} from "../src/content/business-vans";
import {vanComparisonIndexUrl,vanGenerationComparisons,vanComparisonUrl} from "../src/content/van-generation-comparisons";

test("Nine current, manually reviewed commercial-van comparison pages have distinct direct NL URLs",()=>{
 assert.equal(vanGenerationComparisons.length,9);
 const urls=vanGenerationComparisons.map(vanComparisonUrl);
 assert.equal(new Set(urls).size,9);
 assert.equal(new Set(vanGenerationComparisons.map(g=>g.slug)).size,9);
 assert.equal(vanComparisonIndexUrl,"https://power.noordtune.nl/nl/bedrijfswagens/vergelijken");
 assert.deepEqual(vanGenerationComparisons.map(g=>g.slug),[
  "mercedes-sprinter-313-317-cdi",
  "mercedes-vito-114-119-cdi",
  "volkswagen-transporter-t5-t6-t61",
  "ford-transit-custom-22-tdci-20-ecoblue",
  "ford-transit-ecoblue-130-165-170",
  "volkswagen-crafter-20-tdi-102-140",
  "toyota-proace-15-20-d4d",
  "peugeot-boxer-20-22-bluehdi",
  "fiat-ducato-23-multijet-euro6"
 ]);
 for(const g of vanGenerationComparisons){
  assert.match(g.slug,/^[a-z0-9]+(?:-[a-z0-9]+)+$/);
  assert.ok(g.title.length>=16&&g.detail.length>=43,g.slug+" individual editorial detail");
  assert.ok(g.make.length>2&&g.model.length>2);
  assert.ok(["Grote werkbus","Servicebus","Bedrijfsbus"].includes(g.kind));
  const u=new URL(vanComparisonUrl(g));
  assert.equal(u.protocol,"https:");
  assert.equal(u.host,"power.noordtune.nl");
  assert.equal(u.pathname,"/nl/bedrijfswagens/vergelijken/"+g.slug);
  assert.equal(u.search,"");
  assert.equal(u.hash,"");
 }
});

test("Technical van comparison links complement rather than replace existing workshop model links",()=>{
 assert.equal(businessVansPath,"/nl/bedrijfswagens");
 assert.equal(businessVanModels.length,6);
 const old=businessVanModels.map(g=>g.slug);
 assert.ok(old.includes("ford-transit")&&old.includes("mercedes-sprinter")&&old.includes("volkswagen-transporter"));
 const section=readFileSync("src/components/van-generation-comparisons.tsx","utf8");
 const landing=readFileSync("src/components/business-vans.tsx","utf8");
 const analytics=readFileSync("src/lib/analytics.ts","utf8");
 assert.match(landing,/<VanGenerationComparisonSection\s*\/>/,"NL van offer has an explicit comparison section");
 assert.match(landing,/href=\{vanComparisonIndexUrl\}/,"Homepage drives to reviewed technical index");
 assert.match(landing,/href=\{'https:\/\/power\.noordtune\.nl\/nl\/bedrijfswagens\/'.*model\.slug\}/,"Existing six business van model links remain");
 assert.match(section,/vanGenerationComparisons\.map/);
 assert.match(section,/href=\{vanComparisonUrl\(item\)\}/);
 assert.match(section,/data-comparison-slug=\{item\.slug\}/);
 assert.match(section,/href=\{businessVansPath\+"#offerte"\}/,"Existing quote entrypoint remains");
 assert.match(section,/data-testid="www-van-comparison-links"/);
 assert.match(section,/data-testid="www-van-comparison-directory"/);
 assert.match(section,/name:"power_catalog_click"/);
 assert.match(section,/name:"appointment_click"/);
 assert.match(analytics,/"business_van_compare"/);
 assert.match(analytics,/"homepage_van_compare"/);
 assert.doesNotMatch(section,/fetch\(|localStorage|sessionStorage|sendBeacon|mailto:\?body=/);
 assert.doesNotMatch(section,/[\w-]+@(?:gmail|outlook)\.com/i);
});

test("New discovery section keeps Stage 1 promises out of commercial advertising",()=>{
 const section=readFileSync("src/components/van-generation-comparisons.tsx","utf8");
 assert.match(section,/bronindicaties per gecontroleerde uitvoering/);
 assert.match(section,/DPF, SCR en AdBlue functioneren/);
 assert.match(section,/echte ECU, transmissie/);
 assert.doesNotMatch(section,/garandeer.*(?:\d+\s*(?:pk|Nm))|€\s*\d+(?!\d)/i);
});
