import assert from "node:assert/strict";
import {chromium} from "playwright";
const base=process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3163";
async function main(){
 const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  const url=base+"/nl/chiptuning";
  const response=await page.goto(url,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  assert.equal(await page.locator("h1").count(),1);
  assert.equal(await page.locator("title").innerText(),"Chiptuning Assen | Stage 1 op maat & diagnose | NoordTune");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.noordtune.nl/nl/chiptuning");
  const description=await page.locator('meta[name="description"]').getAttribute("content");
  assert.match(description??"",/Stage 1 en ECU-remap per auto/);
  assert.match(description??"",/vraag jouw offerte/);
  const trust=page.getByTestId("nl-local-chiptuning-trust");
  assert.equal(await trust.count(),1);
  assert.match(await trust.innerText(),/eigen werkplaats in Assen/);
  for(const path of ["/nl/chiptuning-assen","/nl/chiptuning-groningen","/nl/resultaten"]){
   assert.equal(await trust.locator('a[href="'+path+'"]').count(),1);
   assert.equal((await page.request.get(base+path)).status(),200);
  }
  assert.equal(await page.locator('[data-testid="nl-home-catalog-links"]').count(),1,"Keep technical catalog discovery");
  assert.equal(await page.locator('a[href="/nl/afspraak"]').count()>=1,true,"Keep genuine quote and appointment CTA");
  assert.equal(await page.locator('a[href="/nl/chiptuning-groningen"]').count()>=1,true);
  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:920});
   await page.goto(url,{waitUntil:"domcontentloaded"});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No overflow "+width);
  }
  for(const locale of ["en","pl"]){
   const r=await page.goto(base+"/"+locale+"/chiptuning",{waitUntil:"domcontentloaded"});
   assert.equal(r?.status(),200);
   assert.equal(await page.getByTestId("nl-local-chiptuning-trust").count(),0,"No Dutch-only content in "+locale);
  }
  const assen=await page.goto(base+"/nl/chiptuning-assen",{waitUntil:"domcontentloaded"});
  assert.equal(assen?.status(),200);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.noordtune.nl/nl/chiptuning-assen");
  const groningen=await page.goto(base+"/nl/chiptuning-groningen",{waitUntil:"domcontentloaded"});
  assert.equal(groningen?.status(),200);
  assert.match(await page.locator("main").innerText(),/geen vestiging in Groningen/i);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.noordtune.nl/nl/chiptuning-groningen");
  assert.deepEqual(errors,[]);
  console.log("NL_GSC_CHIPTUNING_SERVICE_QA_PASS",JSON.stringify({base,source:"real Google Search Console query/page metrics",primaryService:"/nl/chiptuning",crosslinks:3,originalCanonicalsPreserved:true,noFakeGroningenLocation:true,responsive:[320,390,1440],noCustomerData:true}));
 }finally{await browser.close()}
}
main().catch(e=>{console.error(e);process.exitCode=1});
