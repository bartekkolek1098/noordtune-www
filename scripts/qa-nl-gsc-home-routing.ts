import assert from "node:assert/strict";
import {chromium} from "playwright";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3165").replace(/\/$/,"");

async function run(){
 const browser=await chromium.launch({
  headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"
 });
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));

  // Public/uncookied entry must be a stable canonical Dutch-language target.
  for(const language of ["nl-NL,nl;q=0.9","en-US,en;q=0.9","pl-PL,pl;q=0.9"]){
   const response=await page.request.get(base+"/",{
    maxRedirects:0,headers:{"Accept-Language":language}
   });
   assert.equal(response.status(),308,"Root should be a stable 308 for first-time "+language);
   assert.equal(new URL(response.headers()["location"]??"",base).pathname,"/nl");
  }
  for(const lang of ["en","pl"]){
   const r=await page.request.get(base+"/",{
    maxRedirects:0,headers:{"Cookie":"noordtune_locale="+lang,"Accept-Language":"nl-NL"}
   });
   assert.equal(r.status(),307,"Respect explicit language selection "+lang);
   assert.equal(new URL(r.headers()["location"]??"",base).pathname,"/"+lang);
  }

  for(const locale of ["nl","en","pl"]){
   const response=await page.goto(base+"/"+locale,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.noordtune.nl/"+locale);
   const hreflang=await page.locator('link[rel="alternate"][hreflang]').evaluateAll(
    nodes=>nodes.map(x=>({lang:x.getAttribute("hreflang"),href:x.getAttribute("href")}))
   );
   for(const lang of ["nl","en","pl","x-default"]){
    assert.equal(hreflang.find(a=>a.lang===lang)?.href,
     "https://www.noordtune.nl/"+(lang==="x-default"?"nl":lang));
   }
   const region=page.getByTestId("nl-local-workshop-region");
   assert.equal(await region.count(),locale==="nl"?1:0,"Dutch-only local-workshop region "+locale);
  }

  const response=await page.goto(base+"/nl",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  const region=page.getByTestId("nl-local-workshop-region");
  assert.match(await region.innerText(),/één werkplaats in Assen/i);
  assert.match(await region.innerText(),/geen vestiging in Groningen/i);
  for(const path of [
   "/nl/chiptuning-assen","/nl/chiptuning-groningen","/nl/auto-diagnose-assen",
   "/nl/resultaten","/nl/afspraak"
  ]){
   assert.equal(await region.locator('a[href="'+path+'"]').count(),1,path+" crawlable NL service link");
   const dest=await page.request.get(base+path,{timeout:35000});
   assert.equal(dest.status(),200,path+" actually works");
   const html=await dest.text();
   assert.ok(html.includes('rel="canonical"'),path+" independently canonical service");
  }
  assert.equal(await region.locator('a[href^="https://wa.me/"]').count(),1);
  assert.equal(await region.locator('a[data-analytics-event="appointment_click"]').count(),1);
  assert.equal(await region.locator('a[data-analytics-event="whatsapp_click"]').count(),1);
  assert.ok(await page.getByTestId("homepage-business-offer").count()===1,"Keep the original business-van CTA");
  assert.ok(await page.locator('a[href="https://power.noordtune.nl/nl/merken"]').count()>=1);

  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:920});
   await page.goto(base+"/nl",{waitUntil:"domcontentloaded",timeout:45000});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),
    "No horizontal scroll at "+width);
   assert.equal(await page.getByTestId("nl-local-workshop-region").count(),1);
  }
  const groningen=await page.goto(base+"/nl/chiptuning-groningen",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(groningen?.status(),200);
  assert.match(await page.locator("main").innerText(),/geen vestiging in Groningen/i);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),
   "https://www.noordtune.nl/nl/chiptuning-groningen");

  const sitemap=await page.request.get(base+"/sitemap.xml",{timeout:35000});
  assert.equal(sitemap.status(),200);
  const xml=await sitemap.text();
  const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
  assert.equal(new Set(urls).size,urls.length);
  for(const important of ["https://www.noordtune.nl/nl","https://www.noordtune.nl/en",
   "https://www.noordtune.nl/pl","https://www.noordtune.nl/nl/chiptuning-groningen"]){
    assert.ok(urls.includes(important),important+" sitemap");
  }
  assert.deepEqual(errors,[],"No JavaScript errors");
  console.log("NL_GSC_HOME_ROUTING_QA_PASS",JSON.stringify({
   base,stableDefaultRoot:true,storedENPLRetained:true,
   allFourHreflangsCorrect:true,linksValidated:5,unchangedCanonicalPages:true,
   sitemapUrls:urls.length,noFakeGroningenOffice:true,viewportWidths:[320,390,1440]
  }));
 }finally{await browser.close()}
}
run().catch(e=>{console.error(e);process.exitCode=1});
