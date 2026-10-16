import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {brandPageForBrand,brandPagePath,brandPageStaticParams,brandPageUrl} from "../src/content/brand-pages";
import {seoLandings} from "../src/content/seo-landings";
import {pricingPlans} from "../src/content/copy";

const nl=brandPageForBrand("nl","volkswagen");
const en=brandPageForBrand("en","volkswagen");
const pl=brandPageForBrand("pl","volkswagen");
const region=seoLandings.find(page=>page.locale==="nl"&&page.slug==="chiptuning-groningen");
assert.ok(nl&&en&&pl&&region,"Existing canonical VW pages and Groningen landing must remain published");

const gti="https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888";
const golfR="https://power.noordtune.nl/nl/vehicles/volkswagen-golf-7-r-20-tsi";

test("real GSC Golf GTI interest gets a distinct Dutch GTI-vs-R path without a new doorway",()=>{
 assert.equal(brandPagePath(nl),"/nl/volkswagen-chiptuning");
 assert.equal(brandPageUrl(nl),"https://www.noordtune.nl/nl/volkswagen-chiptuning");
 assert.match(nl.metaDescription,/Golf GTI, Golf R/);
 assert.match(nl.metaDescription,/Assen/);
 const section=nl.sections.find(item=>item.eyebrow==="Golf GTI of Golf R");
 assert.ok(section);
 assert.match(section.title,/Golf GTI chiptuning/);
 assert.match(section.body.join(" "),/Golf 7 GTI Performance met 2.0 TSI EA888/);
 assert.match(section.body.join(" "),/Golf 7 R met 2.0 TSI/);
 assert.match(section.body.join(" "),/niet automatisch bij jouw GTI/);
 assert.match(section.body.join(" "),/uitsluitend in de werkplaats in Assen/);
 assert.match(section.body.join(" "),/brongebonden indicaties, geen op jouw auto gemeten of gegarandeerde resultaten/);
 assert.ok(section.bullets?.some(value=>value.includes("geen vestiging in Groningen")));
 assert.deepEqual(section.links?.map(link=>link.href),[gti,golfR,"/nl/afspraak"]);
 assert.equal(new Set(section.links?.map(link=>link.href)).size,3);
 assert.doesNotMatch(section.body.join(" " ),/\b\d{2,3}\s*(pk|Nm)\b|€\d+/i,"No invented Stage 1 gain, torque or price");
 assert.equal(region.related.filter(link=>link.href==="/nl/volkswagen-chiptuning").length,1);
 assert.ok(region.sections[0].text.includes("geen vestiging in Groningen"));
 assert.equal(brandPageStaticParams().length,15,"Existing language/brand pages only, no new city doorway");
});

test("NL-only editorial does not corrupt genuine VW cases, EN/PL, prices or canonical structure",()=>{
 assert.equal(en.sections.some(item=>item.eyebrow==="Golf GTI of Golf R"),false);
 assert.equal(pl.sections.some(item=>item.eyebrow==="Golf GTI of Golf R"),false);
 assert.deepEqual(nl.resultSlugs,["vw-caddy-20-tdi-2020-stage-1","vw-transporter-20-tdi-2013-ecu-cloning-stage-1"]);
 assert.equal(pricingPlans.nl.find(plan=>plan.name==="Basisdiagnose")?.price,"€89,-");
 const stage1=pricingPlans.nl.find(plan=>plan.name==="Stage 1");
 if(stage1) assert.ok(stage1.price,"Existing Stage 1 price remains sourced from approved table");
 assert.deepEqual(brandPageStaticParams().filter(p=>p.locale==="nl"&&p.slug==="volkswagen-chiptuning"),[{locale:"nl",slug:"volkswagen-chiptuning"}]);
});

test("Dutch links carry whitelisted anonymous catalog-click analytics without customer identifiers",()=>{
 const renderer=readFileSync("src/components/brand-page-renderer.tsx","utf8");
 const analytics=readFileSync("src/lib/analytics.ts","utf8");
 assert.match(renderer,/link\.href\.startsWith\("https:\/\/power\.noordtune\.nl\/"\)/);
 assert.match(renderer,/name: "power_catalog_click", properties: \{locale: page\.locale, source: "brand_section"\}/);
 assert.match(analytics,/\| "brand_section"/);
 const eventBlock=renderer.match(/analytics=\{link\.href\.startsWith\([^\n]+/);
 assert.ok(eventBlock);
 assert.doesNotMatch(eventBlock[0],/vin|kenteken|email|phone|query|customer|plate|registration/i);
 assert.match(renderer,/href=\{link\.href\}/);
});
