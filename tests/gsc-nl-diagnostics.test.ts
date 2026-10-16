import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {test} from "node:test";
import {pageHeroes,pricingPlans,seo} from "../src/content/copy";
import {seoLandings,seoLandingUrl} from "../src/content/seo-landings";
import {pathFor} from "../src/content/site";
import {createMetadata,createSeoLandingMetadata} from "../src/lib/seo";

const local=seoLandings.find(x=>x.locale==="nl"&&x.key==="auto-diagnose-assen");
const groningen=seoLandings.find(x=>x.locale==="nl"&&x.key==="chiptuning-groningen");
assert.ok(local,"Previous canonical Assen diagnosis landing must remain published");
assert.ok(groningen,"Previous Groningen tuning landing must remain published");

test("Dutch diagnosis pages differentiate real Assen service overview and local details",()=>{
 const main=seo.diagnose.nl;
 assert.equal(main.title,"Auto uitlezen & storingsdiagnose | NoordTune Assen");
 assert.match(main.description,/klanten uit Groningen/i);
 assert.match(main.description,/foutcodes, live data en loganalyse/i);
 assert.match(pageHeroes.diagnose.nl.title.join(" "),/Auto uitlezen/);
 assert.equal(pageHeroes.diagnose.nl.secondary,"Maak een afspraak");
 const metadata=createMetadata("nl","diagnose");
 assert.equal(metadata.alternates?.canonical,"https://www.noordtune.nl/nl/auto-diagnose");
 assert.equal(metadata.title,main.title);
 assert.equal(seoLandingUrl(local),"/nl/auto-diagnose-assen");
 assert.equal(local.seo.title,"Storingsdiagnose Assen | Foutcodes & Meetdata | NoordTune");
 assert.notEqual(local.seo.title,main.title,"Distinct pages need distinct intent");
 const localMeta=createSeoLandingMetadata(local);
 assert.equal(localMeta.alternates?.canonical,"https://www.noordtune.nl/nl/auto-diagnose-assen");
 assert.equal(local.parentKey,"diagnose");
 assert.match(local.hero.title.join(" "),/Foutcodes uitlezen/);
 assert.equal(local.hero.secondary,"Maak een afspraak");
 assert.ok(local.sections.some(x=>x.kicker==="Vervolgonderzoek en werkplaatsbezoek"));
 assert.equal(local.faqs.length,5,"Preserve previous 3 FAQs and add 2 source-backed diagnostic questions");
 for(const phrase of ["Wanneer is loganalyse bij een storingsdiagnose nodig?","Wat neem ik mee voor auto uitlezen in Assen?"]){
  assert.ok(local.faqs.some(x=>x.question===phrase),"Unique useful local diagnostic answer: "+phrase);
 }
 for(const href of ["/nl/auto-diagnose","/nl/blog/dpf-egr-of-adblue-storing-wat-nu",pathFor("nl","appointment")]){
  assert.ok(local.related.some(x=>x.href===href),"Diagnose Assen needs an exact crawlable resource: "+href);
 }
 assert.ok(groningen.related.some(x=>x.href==="/nl/auto-diagnose"),"Groningen tuning page leads to actual diagnostic service, not a fake local branch");
 assert.match(groningen.sections[0].text,/geen vestiging in Groningen/);
});

test("diagnostics are accurately priced from existing approved table and not sold as instant repair",()=>{
 const plan=pricingPlans.nl.find(x=>x.name==="Basisdiagnose");
 assert.ok(plan);
 assert.equal(plan.price,"€89,-");
 assert.equal(plan.note,"vanaf");
 const component=readFileSync("src/components/nl-diagnostics-service-guide.tsx","utf8");
 assert.match(component,/pricingPlans\.nl\.find\(plan=>plan\.name==="Basisdiagnose"\)/,"Use original price source, not drift-prone hardcoded new amount");
 assert.doesNotMatch(component,/€89/);
 assert.match(component,/data-testid="nl-diagnostics-service-guide"/);
 assert.match(component,/diagnosticSteps\.map/);
 assert.match(component,/questions\.map/);
 for(const phrase of ["Onze enige werkplaats is in Assen","geen vestiging in Groningen","geen weglegale oplossing","Diagnose is niet hetzelfde als directe reparatie"]){
  assert.ok(component.includes(phrase),"Transparent diagnosis scope: "+phrase);
 }
 assert.match(component,/DPF en SCR\/AdBlue/);
 assert.match(component,/href="\/nl\/afspraak"/);
 assert.match(component,/href=\{site\.whatsappUrl\}/);
 assert.match(component,/analytics=\{\{name:"appointment_click"/);
 assert.match(component,/analytics=\{\{name:"whatsapp_click"/);
 assert.match(component,/href="\/nl\/auto-diagnose-assen"/);
 assert.match(component,/href="\/nl\/blog\/dpf-egr-of-adblue-storing-wat-nu"/);
 assert.doesNotMatch(component,/garantie op reparatie|storingsvrij gegarandeerd|DPF delete|AdBlue off/i);
});

test("diagnostic routes and tracked contact actions remain scoped to Dutch content",()=>{
 const renderer=readFileSync("src/components/page-renderers.tsx","utf8");
 const landings=readFileSync("src/components/seo-landing-renderer.tsx","utf8");
 const localSection=readFileSync("src/components/nl-local-service-area.tsx","utf8");
 const info=readFileSync("src/components/rich-info-section.tsx","utf8");
 assert.match(renderer,/pageKey === "diagnose" && locale === "nl" \? <NlDiagnosticsServiceGuide/);
 assert.match(landings,/page\.locale === "nl" && page\.slug === "auto-diagnose-assen"/);
 assert.match(landings,/isNlDiagnosisAssen \? pathFor\("nl","appointment"\) : site\.catalogUrl/);
 assert.match(info,/href === pathFor\(analyticsLocale,"appointment"\)/);
 assert.match(info,/name:"appointment_click"/);
 assert.match(localSection,/label:"Storingsdiagnose & auto uitlezen in Assen"/);
 assert.match(localSection,/Ook voor klanten uit Groningen/);
 assert.ok(!renderer.includes('pageKey === "diagnose" && locale === "en" ? <NlDiagnosticsServiceGuide'));
 assert.notEqual(seo.diagnose.en.title,seo.diagnose.nl.title);
 assert.notEqual(seo.diagnose.pl.title,seo.diagnose.nl.title);
 assert.equal(new Set(seoLandings.map(x=>seoLandingUrl(x))).size,seoLandings.length,"No extra or duplicate local page introduced");
});
