import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {chromium} from "playwright";
import {brandPages} from "../src/content/brand-pages";
import {catalogTopics,catalogDiscoveryTopics,catalogTopicUrl} from "../src/content/catalog-discovery";

const base=process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3133";
const executable=["C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);

async function main(){
 const browser=await chromium.launch({headless:true,...(executable?{executablePath:executable}:{})});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  for(const path of ["/nl","/nl/chiptuning"]){
   const response=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(response?.status(),200,"NL route "+path);
   const links=page.locator('[data-testid="nl-home-catalog-links"] [data-catalog-path]');
   assert.equal(await links.count(),catalogDiscoveryTopics().length,"Overview links on "+path);
   const paths=await links.evaluateAll(a=>a.map(x=>x.getAttribute("data-catalog-path")));
   assert.deepEqual(new Set(paths),new Set(catalogDiscoveryTopics().map(x=>x.path)));
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Mobile width "+path);
   assert.ok((await links.first().getAttribute("href"))?.startsWith("https://power.noordtune.nl/nl/"));
   assert.equal(await links.first().getAttribute("data-analytics-event"),"power_catalog_click");
   assert.equal(await links.first().getAttribute("data-analytics-source"),"catalog_discovery_home");
  }
  let brandPagesChecked=0;
  for(const brand of brandPages.filter(p=>p.locale==="nl")){
   const path="/nl/"+brand.slug;
   const resp=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:45000});
   assert.equal(resp?.status(),200,path);
   const links=page.locator('[data-testid="nl-brand-catalog-links"] [data-catalog-path]');
   assert.equal(await links.count(),catalogDiscoveryTopics(brand.brand).length,path);
   const paths=await links.evaluateAll(a=>a.map(x=>x.getAttribute("data-catalog-path")));
   assert.deepEqual(new Set(paths),new Set(catalogDiscoveryTopics(brand.brand).map(x=>x.path)));
   assert.equal(await links.first().getAttribute("data-analytics-source"),"catalog_discovery_brand");
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Mobile width "+path);
   brandPagesChecked++;
  }
  await page.setViewportSize({width:320,height:720});
  await page.goto(base+"/nl/volkswagen-chiptuning",{waitUntil:"domcontentloaded"});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=321),"Small-screen no overflow");
  await page.setViewportSize({width:1440,height:900});
  await page.goto(base+"/nl",{waitUntil:"domcontentloaded"});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=1441),"Desktop no overflow");
  for(const locale of ["en","pl"]){
   const r=await page.goto(base+"/"+locale,{waitUntil:"domcontentloaded"});
   assert.equal(r?.status(),200);
   assert.equal(await page.locator('[data-testid="nl-home-catalog-links"]').count(),0,"No NL-only links on "+locale);
  }
  const topics=Object.values(catalogTopics);
  let source200=0;
  for(let i=0;i<topics.length;i+=4){
   await Promise.all(topics.slice(i,i+4).map(async topic=>{
    const target=catalogTopicUrl(topic);
    const result=await page.request.get(target,{timeout:30000});
    assert.equal(result.status(),200,"Published catalog deep link "+target);
    const html=await result.text();
    assert.ok(html.includes('rel="canonical"')&&html.includes(target),target+": matching canonical");
    assert.ok(!/<meta\s+name="robots"\s+content="noindex/.test(html),target+": noindex");
    source200++;
   }));
  }
  assert.deepEqual(errors,[],"No client-side runtime errors");
  console.log("WWW_CATALOG_DEEPLINK_QA_PASS",JSON.stringify({homepageLinks:catalogDiscoveryTopics().length,brandLandingPages:brandPagesChecked,catalogTopics:topics.length,targets200:source200,locales:"NL only",mobileWidths:[320,390],desktopWidth:1440,analytics:true,canonicals:true}));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
