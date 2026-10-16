import assert from "node:assert/strict";
import {chromium} from "playwright";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3171").replace(/\/$/,"");
const slug="audi-a4-b7-20-tdi-stage-2-plus";
const canonical="https://www.noordtune.nl/nl/resultaten/"+slug;
const title="Audi A4 B7 2.0 TDI Stage 2+: 170 naar 235 pk | NoordTune";
const href="/nl/resultaten/"+slug;

async function main(){
 const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  let response=await page.goto(base+href,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  assert.equal(await page.locator("title").textContent(),title);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),canonical);
  assert.equal(await page.locator("h1").count(),1);
  assert.match(await page.locator("h1").innerText(),/Audi A4 B7 2\.0 TDI Stage 2\+/i);
  const description=await page.locator('meta[name="description"]').getAttribute("content");
  assert.match(description??"",/170 naar 235 pk en 350 naar 470 Nm/);
  assert.match(description??"",/hybride turbo, ECU-afstelling/);
  assert.equal(await page.locator('meta[property="og:title"]').getAttribute("content"),title);
  assert.equal(await page.locator('link[rel="alternate"][hreflang="nl"]').getAttribute("href"),canonical);

  const evidence=page.getByTestId("audi-a4-b7-stage2-evidence");
  assert.equal(await evidence.count(),1,"Original owner-approved NL project must explain exact hardware and limitations");
  const cards=evidence.getByTestId("audi-stage2-technical-questions").locator("div");
  assert.equal(await cards.count(),3);
  const text=await evidence.innerText();
  for(const s of ["170 pk / 350 Nm","235 pk / 470 Nm","hybride turbo","downpipe",
   "certificaat van de uitgevoerde dienst","geen bewijs van een afzonderlijke rollenbankmeting",
   "DPF, SCR"]){
    assert.ok(text.includes(s),"Source-backed case explanation: "+s);
  }
  assert.equal(await evidence.locator('a[href="/nl/afspraak"]').count(),1);
  assert.equal(await evidence.locator('a[href="/nl/stage-2-tuning"]').count(),1);
  const original=page.getByTestId("performance-case");
  assert.equal(await original.count(),1,"Existing original case identity retained");
  assert.ok(await original.locator("img[alt*='Audi A4 B7']").count()>=1,"Owner-published photo retained");

  const jsonLd=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>{
    try{return JSON.parse(n.textContent??"null");}catch{return null;}
  }));
  const caseArticle=jsonLd.find((obj:unknown)=>!!obj&&typeof obj==="object"&&"mainEntityOfPage" in obj&&obj.mainEntityOfPage===canonical) as {datePublished:string;dateModified:string;["@type"]:string}|undefined;
  assert.ok(caseArticle,"Case Article structured data preserved");
  assert.equal(caseArticle["@type"],"Article");
  assert.equal(caseArticle.datePublished,"2026-06-16");
  assert.equal(caseArticle.dateModified,"2026-10-16");
  assert.ok(!jsonLd.some((o:unknown)=>!!o&&typeof o==="object"&&"@type" in o&&o["@type"]==="Product"&&"aggregateRating" in o),"No invented rich reviews");

  response=await page.goto(base+"/nl/chiptuning",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  const fromService=page.getByTestId("nl-audi-stage2-case-from-chiptuning");
  assert.equal(await fromService.count(),1,"Actual customer case linked from high-impression chiptuning hub");
  assert.equal(await fromService.locator('a[href="'+href+'"]').count(),1);
  assert.match(await fromService.innerText(),/geen standaard Stage 1/i);
  const tracked=fromService.locator('a[href="'+href+'"]');
  assert.equal(await tracked.getAttribute("data-analytics-event"),"customer_result_click");
  assert.equal(await tracked.getAttribute("data-analytics-slug"),slug);
  await tracked.click();
  await page.waitForURL(u=>u.pathname===href,{timeout:45000});
  assert.equal(await page.getByTestId("audi-a4-b7-stage2-evidence").count(),1);
  const appointment=page.getByTestId("audi-a4-b7-stage2-evidence").locator('a[href="/nl/afspraak"]');
  await appointment.click();
  await page.waitForURL(u=>u.pathname==="/nl/afspraak",{timeout:45000});
  assert.equal(await page.locator("h1").count(),1,"Actual existing appointment page remains accessible");

  for(const [locale,route] of [["en","results"],["pl","rezultaty"]] as const){
   response=await page.goto(base+"/"+locale+"/"+route+"/"+slug,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.getByTestId("audi-a4-b7-stage2-evidence").count(),0,"Dutch-specific case commentary is never auto-translated");
   assert.ok(!(await page.locator("title").innerText()).includes("170 naar 235 pk"),"Original localized title unchanged");
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://www.noordtune.nl/"+locale+"/"+route+"/"+slug);
  }
  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:940});
   response=await page.goto(base+href,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.getByTestId("audi-a4-b7-stage2-evidence").count(),1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),
    "No unexpected horizontal overflow at "+width+"px");
  }
  const xmlResponse=await page.request.get(base+"/sitemap.xml",{timeout:35000});
  assert.equal(xmlResponse.status(),200);
  const xml=await xmlResponse.text();
  const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  assert.equal(locs.length,139);
  assert.equal(locs.filter(x=>x===canonical).length,1);
  assert.ok(xml.includes("2026-10-16"),"Revised case modification date is reflected in sitemap");
  assert.deepEqual(errors,[],"Browser should not log any JavaScript errors");
  console.log("NL_GSC_AUDI_STAGE2_CASE_BROWSER_PASS",JSON.stringify({
   base,source:"NL Search Console exact intent: Audi A4 2.0 TDI Stage 2",
   originalOwnerApprovedCase:true,metadataMatchingSource:true,canonical,sourceValues:"170/350 -> 235/470",
   uniqueOnPageQuestions:3,certificateCorrectlyQualified:true,
   actualServiceToCaseToQuoteJourney:true,EN_PL_Unchanged:true,viewports:[320,390,1440],
   sitemapURLs:locs.length,noMessagesSent:true
  }));
 }finally{await browser.close();}
}
main().catch(err=>{console.error(err);process.exitCode=1;});
