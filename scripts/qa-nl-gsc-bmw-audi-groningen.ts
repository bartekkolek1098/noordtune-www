import assert from "node:assert/strict";
import {chromium} from "playwright";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3174").replace(/\/$/,"");
const site="https://www.noordtune.nl";
const region="/nl/chiptuning-groningen";
const bmw="/nl/bmw-chiptuning";
const audi="/nl/audi-chiptuning";
const vw="/nl/volkswagen-chiptuning";
const appointment="/nl/afspraak";
const b47="https://power.noordtune.nl/nl/vehicles/bmw-320d-b47";
const gti="https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888";
const audiCase="/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus";

async function run(){
 const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",error=>errors.push(error.message));
  let response=await page.goto(base+region,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(response?.status(),200);
  assert.equal(await page.locator("title").textContent(),"Chiptuning Groningen | Stage 1 & ECU-remap in Assen | NoordTune.nl");
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+region);
  assert.equal(await page.locator("h1").count(),1);
  const guide=page.getByTestId("nl-groningen-brand-pathways");
  assert.equal(await guide.count(),1);
  assert.equal(await guide.locator("article").count(),3);
  assert.match(await guide.innerText(),/één werkplaats in Assen/);
  assert.match(await guide.innerText(),/geen vestiging in Groningen/);
  assert.match(await guide.innerText(),/geen door NoordTune gemeten of gegarandeerde resultaten/);

  for(const [slug,href,resource,resourceEvent] of [
   ["bmw-chiptuning",bmw,b47,"power_catalog_click"],
   ["audi-chiptuning",audi,audiCase,"customer_result_click"],
   ["volkswagen-chiptuning",vw,gti,"power_catalog_click"]
  ]){
   const card=guide.locator('article:has(a[href="'+href+'"])');
   assert.equal(await card.count(),1,"One region brand card: "+slug);
   const brand=card.locator('a[href="'+href+'"]');
   assert.equal(await brand.getAttribute("data-analytics-event"),"brand_page_click");
   assert.equal(await brand.getAttribute("data-analytics-slug"),slug);
   const sourceLink=card.locator('a[href="'+resource+'"]');
   assert.equal(await sourceLink.count(),1,"Source-verified link "+slug);
   assert.equal(await sourceLink.getAttribute("data-analytics-event"),resourceEvent);
   if(resourceEvent==="power_catalog_click"){
    assert.equal(await sourceLink.getAttribute("data-analytics-source"),"groningen_brand_guide");
    const remote=await page.request.get(resource,{timeout:30000});
    assert.equal(remote.status(),200,"Actual published technical profile");
    const html=await remote.text();
    assert.match(html,/<html[^>]*lang="nl"/);
    assert.match(html,/<link rel="canonical" href="https:\/\/power\.noordtune\.nl\/nl\/vehicles\//);
   }else{
    assert.equal(await sourceLink.getAttribute("data-analytics-slug"),"audi-a4-b7-20-tdi-stage-2-plus");
    assert.equal((await page.request.get(base+resource,{timeout:30000})).status(),200);
   }
  }

  assert.equal(await guide.locator('a[href="'+appointment+'"][data-analytics-event="appointment_click"][data-analytics-source="groningen_brand_guide"]').count(),1);
  assert.equal(await guide.locator('a[href^="https://wa.me/"][data-analytics-event="whatsapp_click"][data-analytics-source="groningen_brand_guide"]').count(),1);
  assert.equal(await page.locator('main a[href="'+bmw+'"]').count()>=1,true);
  assert.equal(await page.locator('main a[href="'+audi+'"]').count()>=1,true);

  await guide.locator('a[href="'+bmw+'"]').click();
  await page.waitForURL(url=>url.pathname===bmw,{timeout:45000});
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+bmw);
  assert.equal(await page.locator("h1").count(),1);
  assert.match(await page.locator("main").innerText(),/BMW chiptuning vanuit Groningen/i);
  assert.equal(await page.locator('main a[href="'+region+'"]').count(),1,"BMW links back to honest region landing");
  assert.equal(await page.locator('main a[href="'+b47+'"]').count()>=1,true);
  await page.locator('main a[href="'+region+'"]').click();
  await page.waitForURL(url=>url.pathname===region,{timeout:45000});

  await guide.locator('a[href="'+audi+'"]').click();
  await page.waitForURL(url=>url.pathname===audi,{timeout:45000});
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+audi);
  assert.match(await page.locator("main").innerText(),/Audi chiptuning vanuit Groningen/i);
  assert.match(await page.locator("main").innerText(),/hybride turbo en downpipe/);
  assert.equal(await page.locator('main a[href="'+region+'"]').count(),1,"Audi links back to honest region landing");
  await page.locator('main a[href="'+region+'"]').click();
  await page.waitForURL(url=>url.pathname===region,{timeout:45000});
  await guide.locator('a[href="'+appointment+'"]').click();
  await page.waitForURL(url=>url.pathname===appointment,{timeout:45000});
  assert.equal(await page.locator("h1").count(),1,"Workshop appointment form is accessible; not submitted");

  for(const path of ["/en/bmw-chiptuning","/pl/chiptuning-bmw","/en/audi-chiptuning","/pl/chiptuning-audi"]){
   response=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site+path);
   assert.equal((await page.locator("main").innerText()).includes("BMW chiptuning vanuit Groningen"),false);
   assert.equal((await page.locator("main").innerText()).includes("Audi chiptuning vanuit Groningen"),false);
   assert.equal(await page.getByTestId("nl-groningen-brand-pathways").count(),0);
  }

  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:920});
   for(const path of [region,bmw,audi]){
    response=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
    assert.equal(response?.status(),200);
    assert.equal(await page.locator("h1").count(),1);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow at "+width+" "+path);
   }
  }

  const sitemap=await page.request.get(base+"/sitemap.xml",{timeout:30000});
  assert.equal(sitemap.status(),200);
  const xml=await sitemap.text();
  const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]);
  assert.equal(locs.length,139,"No new location doorway or duplicate sitemap entry");
  assert.equal(new Set(locs).size,139);
  for(const href of [region,bmw,audi,vw,appointment]) assert.ok(locs.includes(site+href),"Existing canonical present "+href);
  assert.deepEqual(errors,[],"No client JS errors");
  console.log("NL_GSC_BMW_AUDI_GRONINGEN_QA_PASS",JSON.stringify({base,landing:region,brandRoutes:[bmw,audi,vw],sources:[b47,audiCase,gti],region:"Groningen to the actual Assen workshop",analytics:"brand_page_click/power_catalog_click/appointment_click/whatsapp_click",responsive:[320,390,1440],sitemapUrls:locs.length,noNewCityPages:true,noMessagesSent:true}));
 }finally{await browser.close()}
}
run().catch(error=>{console.error(error);process.exitCode=1});
