import assert from "node:assert/strict";
import {chromium} from "playwright";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3173").replace(/\/$/,"");
const site="https://www.noordtune.nl";
const volkswagen="/nl/volkswagen-chiptuning";
const groningen="/nl/chiptuning-groningen";
const gti="https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888";
const golfR="https://power.noordtune.nl/nl/vehicles/volkswagen-golf-7-r-20-tsi";

async function main(){
 const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",error=>errors.push(error.message));

  let response=await page.goto(base+volkswagen,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  assert.equal(await page.locator("title").textContent(),"Volkswagen chiptuning & ECU-service | NoordTune.nl");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+volkswagen);
  assert.equal(await page.locator("h1").count(),1);
  assert.match(await page.locator('meta[name="description"]').getAttribute("content")??"",/Golf GTI, Golf R/);

  const section=page.locator("main section").filter({has:page.getByRole("heading",{name:"Golf GTI chiptuning vraagt een ander profiel dan Golf R."})});
  assert.equal(await section.count(),1);
  assert.match(await section.innerText(),/Golf 7 GTI Performance met 2.0 TSI EA888/);
  assert.match(await section.innerText(),/geen vestiging in Groningen/);
  assert.match(await section.innerText(),/geen op jouw auto gemeten of gegarandeerde resultaten/);

  for(const [label,href] of [["Golf GTI Performance: motorprofiel",gti],["Golf 7 R: ander motorprofiel",golfR]]){
   const link=section.getByRole("link",{name:label});
   assert.equal(await link.count(),1);
   assert.equal(await link.getAttribute("href"),href);
   assert.equal(await link.getAttribute("data-analytics-event"),"power_catalog_click");
   assert.equal(await link.getAttribute("data-analytics-locale"),"nl");
   assert.equal(await link.getAttribute("data-analytics-source"),"brand_section");
   const result=await page.request.get(href,{timeout:30000});
   assert.equal(result.status(),200,"Live NL motor profile "+label);
   const html=await result.text();
   assert.match(html,/<link rel="canonical" href="https:\/\/power\.noordtune\.nl\/nl\/vehicles\//);
   assert.match(html,/<html[^>]+lang="nl"/);
  }
  assert.equal(await section.getByRole("link",{name:"Plan een afspraak in Assen"}).getAttribute("href"),"/nl/afspraak");

  response=await page.goto(base+groningen,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+groningen);
  const fromGroningen=page.locator('main a[href="/nl/volkswagen-chiptuning"]');
  assert.equal(await fromGroningen.count(),1);
  await fromGroningen.click();
  await page.waitForURL(url=>url.pathname===volkswagen,{timeout:45000});
  assert.equal(await section.count(),1,"Groningen visitor reaches variant comparison and matching catalog profiles");
  await section.getByRole("link",{name:"Plan een afspraak in Assen"}).click();
  await page.waitForURL(url=>url.pathname==="/nl/afspraak",{timeout:45000});
  assert.equal(await page.locator("h1").count(),1);

  for(const path of ["/en/volkswagen-chiptuning","/pl/chiptuning-volkswagen"]){
   response=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+path);
   assert.equal((await page.locator("main").innerText()).includes("Golf GTI chiptuning vraagt een ander profiel"),false);
  }

  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:920});
   response=await page.goto(base+volkswagen,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow at "+width);
  }

  const sitemap=await page.request.get(base+"/sitemap.xml",{timeout:30000});
  assert.equal(sitemap.status(),200);
  const xml=await sitemap.text();
  const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
  assert.equal(urls.length,139,"Retain sitemap and avoid new city doorway pages");
  assert.ok(urls.includes(site+volkswagen));
  assert.ok(urls.includes(site+groningen));
  assert.deepEqual(errors,[],"No client-side JavaScript crashes");
  console.log("NL_GSC_VW_GTI_QA_PASS",JSON.stringify({base,gti,golfR,service:volkswagen,visitorRegion:"Groningen to actual Assen workshop",variantsDifferent:true,analytics:"power_catalog_click/brand_section",responsive:[320,390,1440],sitemapUrls:urls.length,noNewDoorways:true,noMessagesSent:true}));
 } finally{await browser.close()}
}
main().catch(error=>{console.error(error);process.exitCode=1});
