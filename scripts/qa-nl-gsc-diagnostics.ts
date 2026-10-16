import assert from "node:assert/strict";
import {chromium} from "playwright";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3167").replace(/\/$/,"");
const site="https://www.noordtune.nl";
const mainRoute="/nl/auto-diagnose";
const localRoute="/nl/auto-diagnose-assen";

async function run(){
 const browser=await chromium.launch({
  headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"
 });
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",err=>errors.push(err.message));

  let res=await page.goto(base+mainRoute,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(res?.status(),200);
  assert.equal(await page.locator("title").textContent(),"Auto uitlezen & storingsdiagnose | NoordTune Assen");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+mainRoute);
  assert.equal(await page.locator("h1").count(),1);
  const serviceH1=await page.locator("h1").innerText();
  assert.match(serviceH1,/Auto uitlezen/i);
  assert.match(serviceH1,/met live data/i);
  const mainDescription=await page.locator('meta[name="description"]').getAttribute("content");
  assert.match(mainDescription??"",/ook voor klanten uit Groningen/i);
  const hero=page.locator("main > section").first();
  assert.equal(await hero.locator('a[href="/nl/afspraak"]').count(),1,"Diagnosis hero must lead to actual appointment");
  const guide=page.getByTestId("nl-diagnostics-service-guide");
  assert.equal(await guide.count(),1);
  assert.match(await guide.innerText(),/Onze enige werkplaats is in Assen/);
  assert.match(await guide.innerText(),/€89,- incl\. btw/,"One existing reviewed price, never invented");
  assert.match(await guide.innerText(),/Diagnose is niet hetzelfde als directe reparatie/);
  assert.match(await guide.innerText(),/geen vestiging in Groningen/);
  assert.match(await guide.innerText(),/DPF en SCR\/AdBlue/);
  assert.equal(await page.getByTestId("nl-diagnostics-process").locator("article").count(),4);
  assert.equal(await page.getByTestId("nl-diagnostics-faq").locator("details").count(),3);
  const guideQuote=guide.locator('a[href="/nl/afspraak"]');
  assert.equal(await guideQuote.count(),1);
  assert.equal(await guideQuote.getAttribute("data-analytics-event"),"appointment_click");
  assert.equal(await guideQuote.getAttribute("data-analytics-source"),"site_cta");
  const whatsapp=guide.locator('a[href^="https://wa.me/"]');
  assert.equal(await whatsapp.count(),1);
  assert.equal(await whatsapp.getAttribute("data-analytics-event"),"whatsapp_click");
  for(const route of [localRoute,"/nl/blog/dpf-egr-of-adblue-storing-wat-nu","/nl/contact","/nl/prijzen","/nl/afspraak"]){
   assert.equal((await page.request.get(base+route,{timeout:30000})).status(),200,"Related diagnostic page: "+route);
  }
  assert.equal(await guide.locator('a[href="'+localRoute+'"]').count(),1);

  res=await page.goto(base+localRoute,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(res?.status(),200);
  assert.equal(await page.locator("title").textContent(),"Storingsdiagnose Assen | Foutcodes & Meetdata | NoordTune");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+localRoute);
  const localH1=await page.locator("h1").innerText();
  assert.match(localH1,/Foutcodes uitlezen/i);
  assert.match(localH1,/oorzaken onderzoeken/i);
  assert.match(await page.locator("main").innerText(),/Vervolgonderzoek en werkplaatsbezoek/i);
  assert.match(await page.locator("main").innerText(),/niet in een vestiging in Groningen/i);
  assert.equal(await page.getByTestId("nl-diagnostics-service-guide").count(),0,"Local SEO page must have distinct hand-authored content");
  assert.ok(await page.locator('a[href="/nl/auto-diagnose"]').count()>=1,"Useful bidirectional main diagnosis guide link");
  const faq=page.locator('main details');
  assert.ok(await faq.count()>=5,"Five substantial diagnosis FAQs");
  assert.ok((await page.locator("main").innerText()).includes("Wanneer is loganalyse bij een storingsdiagnose nodig?"));
  assert.ok((await page.locator("main").innerText()).includes("Wat neem ik mee voor auto uitlezen in Assen?"));
  assert.ok(await page.locator('a[href="/nl/afspraak"]').count()>=2);
  assert.ok(await page.locator('a[href="/nl/afspraak"][data-analytics-event="appointment_click"]').count()>=1,
   "Visible appointment CTA tracked without sensitive payload");
  const openCatalog=page.locator('a[href="https://power.noordtune.nl/"]');
  assert.ok(await openCatalog.count()>=1,"Legacy technical catalog links still exist");

  res=await page.goto(base+"/nl/chiptuning-groningen",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(res?.status(),200);
  assert.match(await page.locator("main").innerText(),/geen vestiging in Groningen/i);
  const diagnosisLink=page.locator('main a[href="/nl/auto-diagnose"]');
  assert.ok(await diagnosisLink.count()>=1,"Groningen chiptuning page refers visitors with faults to diagnostics");
  await diagnosisLink.first().click();
  await page.waitForURL(u=>u.pathname===mainRoute,{timeout:45000});
  assert.equal(await guide.count(),1,"Groningen -> real diagnostic service link works");
  await guideQuote.click();
  await page.waitForURL(u=>u.pathname==="/nl/afspraak",{timeout:45000});
  assert.equal(await page.locator("h1").count(),1,"Real appointment route works");
  assert.ok(await page.locator('a[href="https://wa.me/31685759600"]').count()>=1);

  res=await page.goto(base+"/nl",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(res?.status(),200);
  const localHome=page.getByTestId("nl-local-workshop-region");
  assert.equal(await localHome.count(),1);
  assert.match(await localHome.innerText(),/Storingsdiagnose & auto uitlezen in Assen/);
  assert.match(await localHome.innerText(),/Ook voor klanten uit Groningen/);
  assert.equal(await localHome.locator('a[href="'+localRoute+'"]').count(),1);

  for(const [,path] of [["en","/en/car-diagnostics"],["pl","/pl/diagnostyka-samochodowa"]] as const){
   res=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(res?.status(),200);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+path);
   assert.equal(await page.getByTestId("nl-diagnostics-service-guide").count(),0,"NL-specific workshop offer never auto-translated");
   assert.equal((await page.locator("title").textContent()??"").includes("Storingsdiagnose"),false);
  }

  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:920});
   for(const route of [mainRoute,localRoute]){
    res=await page.goto(base+route,{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(res?.status(),200);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow "+width+" "+route);
   }
  }

  const sitemap=await page.request.get(base+"/sitemap.xml",{timeout:30000});
  assert.equal(sitemap.status(),200);
  const xml=await sitemap.text();
  const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  assert.equal(locs.length,139,"No new thin doorway routes; original WWW sitemap retained");
  assert.equal(new Set(locs).size,139);
  for(const route of [mainRoute,localRoute,"/nl/chiptuning-groningen"]){
   assert.ok(locs.includes(site+route),"Original canonical remains in sitemap "+route);
  }
  assert.deepEqual(errors,[],"No JS runtime errors");
  console.log("NL_GSC_DIAGNOSTIC_ASSEN_GRONINGEN_QA_PASS",JSON.stringify({
   base,source:"Connected Search Console diagnosis intent",
   diagnosticService:mainRoute,localAssenPage:localRoute,
   visitorRegion:"Groningen to actual Assen workshop",diagnosticSteps:4,
   newDedicatedFaqs:3,legacyAssenFaqs:5,existingReviewedBasicPrice:"€89,-",
   leadJourney:"Groningen service -> diagnosis -> appointment",
   noFakeGroningenBranch:true,emissionsControlsRequired:true,
   EN_PL_Unchanged:true,responsive:[320,390,1440],
   sitemapUrls:locs.length,noNewThinRoutes:true,noContactMessagesSent:true
  }));
 }finally{await browser.close()}
}
run().catch(e=>{console.error(e);process.exitCode=1});
