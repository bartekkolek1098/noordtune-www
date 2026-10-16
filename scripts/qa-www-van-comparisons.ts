import assert from "node:assert/strict";
import {chromium} from "playwright";
import {vanGenerationComparisons,vanAdditionalComparisons,allVanGenerationComparisons,vanComparisonIndexUrl,vanComparisonUrl} from "../src/content/van-generation-comparisons";
import {businessVansPath} from "../src/content/business-vans";
import {site} from "../src/content/site";

const base=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3153").replace(/\/$/,"");
const permitted=new URL(base);
assert.ok(["localhost","127.0.0.1","www.noordtune.nl"].includes(permitted.hostname)
 || permitted.hostname.endsWith("-bartekkolek1098s-projects.vercel.app"));
async function main(){
 const browser=await chromium.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const errors:string[]=[];
  await context.route("**/_vercel/insights/**",route=>route.fulfill({status:204,contentType:"text/plain",body:""}));
  const page=await context.newPage();
  page.on("pageerror",err=>errors.push(err.message));
  let r=await page.goto(base+"/nl",{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(r?.status(),200);
  assert.ok((await page.locator('link[rel="canonical"]').getAttribute("href"))===site.url+"/nl");
  const home=page.getByTestId("homepage-business-offer");
  assert.equal(await home.count(),1);
  const homeLink=home.locator('a[href="'+vanComparisonIndexUrl+'"]');
  assert.equal(await homeLink.count(),1,"Prominent direct van comparison CTA on NL homepage");
  assert.equal(await homeLink.getAttribute("data-analytics-event"),"power_catalog_click");
  assert.equal(await homeLink.getAttribute("data-analytics-source"),"homepage_van_compare");
  assert.equal(await page.getByTestId("www-van-generation-comparisons").count(),0,"Detailed van comparison navigation is confined to the relevant service page");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Homepage mobile viewport");

  r=await page.goto(base+businessVansPath,{waitUntil:"domcontentloaded",timeout:45000});
  assert.equal(r?.status(),200);
  assert.equal(await page.locator("h1").count(),1);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),site.url+businessVansPath);
  const section=page.getByTestId("www-van-generation-comparisons");
  assert.equal(await section.count(),1);
  const anchors=section.locator('[data-comparison-slug]');
  assert.equal(await anchors.count(),9);
  const destinations=await anchors.evaluateAll(elements=>elements.map(a=>({slug:a.getAttribute("data-comparison-slug"),href:a.getAttribute("href"),event:a.getAttribute("data-analytics-event"),source:a.getAttribute("data-analytics-source")})));
  assert.deepEqual(new Set(destinations.map(d=>d.slug)),new Set(vanGenerationComparisons.map(g=>g.slug)));
  for(const e of destinations){
   const entry=vanGenerationComparisons.find(v=>v.slug===e.slug);
   assert.ok(entry);
   assert.equal(e.href,vanComparisonUrl(entry));
   assert.equal(e.event,"power_catalog_click");
   assert.equal(e.source,"business_van_compare");
  }
  const additional=page.getByTestId("www-van-extra-comparison-links").locator("[data-additional-comparison-slug]");
  assert.equal(await additional.count(),12);
  const added=await additional.evaluateAll(nodes=>nodes.map(a=>({
   slug:a.getAttribute("data-additional-comparison-slug"),href:a.getAttribute("href"),
   event:a.getAttribute("data-analytics-event"),source:a.getAttribute("data-analytics-source")
  })));
  assert.deepEqual(new Set(added.map(g=>g.slug)),new Set(vanAdditionalComparisons.map(g=>g.slug)));
  assert.equal(new Set([...destinations,...added].map(g=>g.slug)).size,21,"Nine featured + twelve additional technical destinations");
  for(const link of added){
   const item=vanAdditionalComparisons.find(g=>g.slug===link.slug);
   assert.ok(item);
   assert.equal(link.href,vanComparisonUrl(item));
   assert.equal(link.event,"power_catalog_click");
   assert.equal(link.source,"business_van_compare");
  }
  assert.match(await section.innerText(),/21 gecontroleerde modelvergelijkingen/);
  const directory=page.getByTestId("www-van-comparison-directory");
  assert.equal(await directory.count(),1);
  assert.equal(await directory.getAttribute("href"),vanComparisonIndexUrl);
  assert.equal(await directory.getAttribute("data-analytics-source"),"business_van_compare");
  const quote=section.locator('a[href="/nl/bedrijfswagens#offerte"]');
  assert.equal(await quote.count(),1,"Do not replace actual workshop quote route");
  assert.equal(await quote.getAttribute("data-analytics-event"),"appointment_click");
  assert.equal(await quote.getAttribute("data-analytics-source"),"business_van_compare");
  assert.equal(await page.getByTestId("business-enquiry").count(),1);
  await page.waitForFunction(()=>document.querySelector("#business-service")?.matches(":enabled")===true,null,{timeout:20000});
  assert.equal(await page.locator('#business-service').isEnabled(),true);
  assert.equal(await page.locator('a[href^="https://power.noordtune.nl/nl/bedrijfswagens/"]').count()>=28,true,"Six old van model links, 21 comparisons and index retained");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Business landing mobile viewport");

  let checkedTargets=0;
  for(let i=0;i<allVanGenerationComparisons.length;i+=3){
   await Promise.all(allVanGenerationComparisons.slice(i,i+3).map(async item=>{
    const url=vanComparisonUrl(item);
    const response=await page.request.get(url,{timeout:35000});
    assert.equal(response.status(),200,url);
    const html=await response.text();
    assert.ok(html.includes('rel="canonical"')&&html.includes(url),"Correct self canonical "+url);
    assert.ok(!/<meta\s+name="robots"\s+content="noindex/i.test(html),"No noindex technical guide "+url);
    assert.ok(html.includes(item.model),"The technical comparison must match the linked vehicle "+url);
    checkedTargets++;
   }));
  }
  const indexRes=await page.request.get(vanComparisonIndexUrl,{timeout:35000});
  assert.equal(indexRes.status(),200);
  assert.ok((await indexRes.text()).includes('rel="canonical"'));
  for(const locale of ["en","pl"]){
   r=await page.goto(base+"/"+locale,{waitUntil:"domcontentloaded"});
   assert.equal(r?.status(),200);
   assert.equal(await page.getByTestId("www-van-generation-comparisons").count(),0,locale+" should not copy Dutch van navigation");
   assert.equal(await page.getByTestId("homepage-business-offer").count(),0,locale+" no NL-specific business section");
  }
  for(const width of [320,390,1440]){
   await page.setViewportSize({width,height:900});
   await page.goto(base+businessVansPath,{waitUntil:"domcontentloaded",timeout:45000});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),"No horizontal overflow "+width);
   assert.equal(await section.locator('[data-comparison-slug]').count(),9,"Nine featured links retained at "+width);
   assert.equal(await section.locator('[data-additional-comparison-slug]').count(),12,"Twelve new compact links present at "+width);
  }

  // Full, genuine cross-domain journey. No customer data or message is submitted.
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+businessVansPath,{waitUntil:"domcontentloaded",timeout:45000});
  const sprinter=section.locator('[data-comparison-slug="mercedes-sprinter-313-317-cdi"]');
  await sprinter.click();
  await page.waitForURL(url=>url.origin==="https://power.noordtune.nl"&&url.pathname==="/nl/bedrijfswagens/vergelijken/mercedes-sprinter-313-317-cdi",{timeout:45000});
  assert.equal(await page.getByTestId("van-comparison-variants").locator("article[data-engine-slug]").count(),7);
  const motorQuote=page.getByTestId("van-comparison-variants").getByTestId("catalog-enquiry-link").first();
  const handoff=await motorQuote.getAttribute("href");
  assert.ok(handoff,"Comparison card must offer the exact motor");
  assert.ok(handoff.startsWith("https://www.noordtune.nl/nl/bedrijfswagens#catalog-v1?"));
  assert.ok(handoff.includes("kind=engine")&&handoff.includes("mercedes-sprinter"));
  await motorQuote.click();
  await page.waitForURL(url=>url.origin==="https://www.noordtune.nl"&&url.pathname==="/nl/bedrijfswagens",{timeout:45000});
  await page.locator('[data-testid="catalog-enquiry-status"][data-status="ready"]').waitFor({timeout:35000});
  const actualVehicle=await page.locator("#business-vehicle").inputValue();
  assert.match(actualVehicle,/Mercedes(?:-Benz)? Sprinter/i);
  assert.equal(new URL(page.url()).hash,"#offerte");
  assert.equal(await page.locator("#business-question").inputValue(),"","No submitted quote details");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Cross-domain quote on mobile");

  // A newly published commercial model must also preserve the precise engine handoff.
  await page.goto(base+businessVansPath,{waitUntil:"domcontentloaded",timeout:45000});
  const ivecoLink=section.locator('[data-additional-comparison-slug="iveco-daily-23-30-euro6-euro6df"]');
  assert.equal(await ivecoLink.count(),1);
  await ivecoLink.click();
  await page.waitForURL(u=>u.origin==="https://power.noordtune.nl"
   &&u.pathname==="/nl/bedrijfswagens/vergelijken/iveco-daily-23-30-euro6-euro6df",{timeout:45000});
  assert.equal(await page.getByTestId("van-comparison-variants").locator("article[data-engine-slug]").count(),6);
  const ivecoQuote=page.getByTestId("van-comparison-variants").getByTestId("catalog-enquiry-link").first();
  const ivecoHref=await ivecoQuote.getAttribute("href");
  assert.ok(ivecoHref?.includes("id=iveco-daily-"),"One reviewed Iveco Daily engine ID must be transferred");
  await ivecoQuote.click();
  await page.waitForURL(u=>u.origin==="https://www.noordtune.nl"&&u.pathname==businessVansPath,{timeout:45000});
  await page.locator('[data-testid="catalog-enquiry-status"][data-status="ready"]').waitFor({timeout:35000});
  assert.match(await page.locator("#business-vehicle").inputValue(),/Iveco Daily/i);
  assert.equal(new URL(page.url()).hash,"#offerte");
  assert.equal(await page.locator("#business-question").inputValue(),"","No Iveco test enquiry was sent");
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=391),"Iveco quote mobile viewport");

  assert.deepEqual(errors,[],"No JS runtime errors");
  console.log("WWW_VAN_COMPARISON_CROSS_DOMAIN_QA_PASS",JSON.stringify({
   www:base,publishedComparisonTargets:checkedTargets,technicalComparisonDirectoryHTTP200:true,
   NLHomepageEntry:true,NLBusinessServiceEntries:21,featuredVanCards:9,newCompactComparisons:12,originalSixModelLinksPreserved:true,
   analyticsSources:["homepage_van_compare","business_van_compare"],crossDomainHandoff:"Mercedes Sprinter -> exact engine -> prefilled WWW quote",
   actualMessagesSent:0,languageGuard:true,responsive:[320,390,1440],correctCanonical:true
  }));
 }finally{await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
