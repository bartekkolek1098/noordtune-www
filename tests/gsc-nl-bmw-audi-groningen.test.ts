import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {brandPageForBrand,brandPagePath,brandPageStaticParams} from "../src/content/brand-pages";
import {seoLandings,seoLandingUrl} from "../src/content/seo-landings";
import {seo,pricingPlans} from "../src/content/copy";
import {conversionEventPropertyKeys} from "../src/lib/analytics";

const region=seoLandings.find(page=>page.locale==="nl"&&page.slug==="chiptuning-groningen");
const bmw=brandPageForBrand("nl","bmw");
const audi=brandPageForBrand("nl","audi");
const vw=brandPageForBrand("nl","volkswagen");
assert.ok(region&&bmw&&audi&&vw);

test("GSC-supported regional BMW/Audi intent uses existing, indexable Dutch landing pages",()=>{
 assert.equal(seoLandingUrl(region),"/nl/chiptuning-groningen");
 assert.equal(region.seo.title,"Chiptuning Groningen | Stage 1 & ECU-remap in Assen | NoordTune.nl");
 assert.match(region.sections[0].text,/werkplaats in Assen, geen vestiging in Groningen/);
 for(const [brand,page] of [["bmw",bmw],["audi",audi],["volkswagen",vw]] as const){
  assert.equal(brandPagePath(page),"/nl/"+brand+"-chiptuning");
  assert.equal(region.related.filter(link=>link.href===brandPagePath(page)).length,1);
 }
 assert.equal(brandPageStaticParams().length,15,"No extra location doorway or brand routes");
 assert.equal(new Set(seoLandings.map(seoLandingUrl)).size,seoLandings.length);
 assert.ok(!seoLandings.some(x=>/bmw|audi/.test(x.slug)&&/groningen/.test(x.slug)));
});

test("regional BMW and Audi sections link back to one actual Assen location and validated technical evidence",()=>{
 const b=bmw.sections.find(s=>s.eyebrow==="BMW tuning voor Groningen");
 assert.ok(b);
 assert.match(b.title,/BMW chiptuning vanuit Groningen/);
 assert.match(b.body.join(" "),/320d B47/);
 assert.match(b.body.join(" "),/N47/);
 assert.match(b.body.join(" "),/BMW X3 E83-klantcase/);
 assert.match(b.body.join(" "),/geen vestiging in Groningen/);
 assert.ok(b.links?.some(link=>link.href==="https://power.noordtune.nl/nl/vehicles/bmw-320d-b47"));
 for(const page of [bmw,audi]){
  const s=page.sections.find(item=>item.eyebrow.endsWith("tuning voor Groningen"));
  assert.ok(s);
  assert.equal(s.links?.filter(x=>x.href==="/nl/chiptuning-groningen").length,1);
  assert.equal(s.links?.filter(x=>x.href==="/nl/afspraak").length,1);
  assert.match(s.body.join(" "),/Assen/);
  assert.match(s.body.join(" "),/geen (?:tweede )?vestiging in Groningen/,"Explicitly no second Groningen branch");
  assert.doesNotMatch(s.body.join(" "),/\b\d{2,3}\s*(pk|Nm)\b|€\d+/i,"No new guessed stage gains or prices");
 }
 const a=audi.sections.find(s=>s.eyebrow==="Audi tuning voor Groningen");
 assert.ok(a);
 assert.match(a.body.join(" "),/hybride turbo en downpipe/);
 assert.match(a.body.join(" "),/geen algemene Stage 2-belofte/);
 assert.ok(a.links?.some(link=>link.href==="/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus"));
});

test("only the Groningen Dutch regional landing mounts practical brand pathways with approved anonymous events",()=>{
 const renderer=readFileSync("src/components/seo-landing-renderer.tsx","utf8");
 const component=readFileSync("src/components/nl-groningen-brand-pathways.tsx","utf8");
 const brandRenderer=readFileSync("src/components/brand-page-renderer.tsx","utf8");
 assert.match(renderer,/page\.locale === "nl" && page\.slug === "chiptuning-groningen"/);
 assert.match(brandRenderer,/text-4xl leading-none text-white \[overflow-wrap:anywhere\] md:text-6xl/,"Long BMW/Audi headings must wrap on 320px mobile");
 assert.match(renderer,/isNlChiptuningGroningen \? <NlGroningenBrandPathways \/>/);
 for(const [slug,href] of [["bmw-chiptuning","/nl/bmw-chiptuning"],["audi-chiptuning","/nl/audi-chiptuning"],["volkswagen-chiptuning","/nl/volkswagen-chiptuning"]]){
  assert.ok(component.includes('brandSlug: "'+slug+'"'));
  assert.ok(component.includes('brandHref: "'+href+'"'));
 }
 for(const target of ["https://power.noordtune.nl/nl/vehicles/bmw-320d-b47",
                       "https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888",
                       "/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus",
                       "/nl/afspraak"]) assert.ok(component.includes(target),"Valid named destination "+target);
 assert.equal((component.match(/brandSlug:/g)||[]).length,4,"Three named brands + type");
 assert.match(component,/NoordTune heeft één werkplaats in Assen/);
 assert.match(component,/geen vestiging in Groningen/);
 assert.match(component,/indicaties, geen door NoordTune gemeten of gegarandeerde resultaten/);
 assert.deepEqual(conversionEventPropertyKeys.power_catalog_click,["locale","source"]);
 assert.deepEqual(conversionEventPropertyKeys.brand_page_click,["locale","slug"]);
 assert.deepEqual(conversionEventPropertyKeys.appointment_click,["locale","source"]);
 assert.match(component,/source: "groningen_brand_guide"/);
 const tracked=component.match(/analytics=\{\{name: "appointment_click"[^\n]+/);
 assert.ok(tracked);
 assert.doesNotMatch(tracked[0],/vin|kenteken|email|phone|query|customer|plate/i);
 assert.equal(pricingPlans.nl.find(x=>x.name==="Basisdiagnose")?.price,"€89,-");
 assert.notEqual(seo.diagnose.en.title,seo.diagnose.nl.title);
 assert.notEqual(seo.diagnose.pl.title,seo.diagnose.nl.title);
});
