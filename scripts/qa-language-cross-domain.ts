import assert from "node:assert/strict";
import {chromium, type BrowserContext, type Page} from "playwright";

const www=(process.env.NOORDTUNE_WWW_QA_URL??"http://127.0.0.1:3175").replace(/\/$/,"");
const power=(process.env.NOORDTUNE_POWER_QA_URL??"http://127.0.0.1:3176").replace(/\/$/,"");

async function go(page: Page, base: string, expected: string) {
  const response=await page.goto(base+"/",{waitUntil:"domcontentloaded",timeout:60000});
  assert.equal(response?.status(),200,`Home status at ${base}`);
  assert.equal(new URL(page.url()).pathname,expected,`Expected saved-language root routing at ${base}`);
  assert.equal(await page.locator("html").getAttribute("lang"),expected.slice(1));
}

async function menu(page: Page, expectedCurrent: string) {
  const header=page.locator("header").first();
  const button=header.locator('[data-testid="language-switcher-trigger"]:visible');
  assert.equal(await button.count(),1,"One visible header language button");
  assert.equal(await button.isVisible(),true);
  assert.equal(await button.getAttribute("aria-expanded"),"false");
  assert.match(await button.innerText(),new RegExp(expectedCurrent.toUpperCase()));
  const box=await button.boundingBox();
  assert.ok(box&&box.width>=65&&box.height>=44,"Usable touch target");
  assert.ok(box.x>=0&&box.x+box.width<=page.viewportSize()!.width+1,"Language button fits the screen");
  await button.click();
  assert.equal(await button.getAttribute("aria-expanded"),"true");
  const options=header.locator('[data-testid="language-switcher-options"]:visible');
  assert.equal(await options.isVisible(),true);
  assert.equal(await options.getByRole("link").count(),3);
  for(const label of ["Nederlands","English","Polski"]){
    assert.equal(await options.getByRole("link",{name:`Switch to ${label}`}).isVisible(),true);
  }
  const panel=await options.boundingBox();
  assert.ok(panel&&panel.x>=0&&panel.x+panel.width<=page.viewportSize()!.width+1,"Opened menu fits viewport");
  await page.keyboard.press("Escape");
  assert.equal(await button.getAttribute("aria-expanded"),"false","Escape closes switcher");
  assert.equal(await button.evaluate(el=>document.activeElement===el),true,"Focus returns to trigger");
  await button.click();
  assert.equal(await options.isVisible(),true);
  await page.mouse.click(5,page.viewportSize()!.height-15);
  assert.equal(await button.getAttribute("aria-expanded"),"false","Clicking outside closes switcher");
  return button;
}

async function selectedCookie(context: BrowserContext) {
  return (await context.cookies()).filter(c=>c.name==="noordtune_preferred_locale");
}

async function main(){
  const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"});
  const errors:string[]=[];
  try {
    // First visit on WWW remains deterministically NL for Google and new visitors.
    // Catalog keeps browser-language discovery for a new user.
    for(const [locale,expected] of [["pl-PL","/pl"],["en-GB","/en"],["nl-NL","/nl"],["de-DE","/nl"]] as const){
      const context=await browser.newContext({locale,viewport:{width:390,height:844}});
      const page=await context.newPage();
      page.on("pageerror",error=>errors.push(error.message));
      await go(page,power,expected);
      assert.equal((await selectedCookie(context)).length,0,"Browser-only discovery does not set an explicit shared preference");
      await context.close();
    }

    const context=await browser.newContext({locale:"pl-PL",viewport:{width:320,height:820}});
    const page=await context.newPage();
    page.on("pageerror",error=>errors.push(error.message));
    await go(page,www,"/nl");
    await menu(page,"nl");

    // User explicitly selects PL on www. Both sites now honor this exact choice.
    await page.locator('header [data-testid="language-switcher-trigger"]:visible').click();
    await page.locator('header [data-testid="language-switcher-options"]:visible')
      .getByRole("link",{name:"Switch to Polski"}).click();
    await page.waitForURL(u=>u.pathname==="/pl",{timeout:30000});
    assert.equal((await selectedCookie(context))[0]?.value,"pl");
    if(new URL(www).hostname.endsWith(".noordtune.nl"))
      assert.equal((await selectedCookie(context))[0]?.domain,".noordtune.nl");
    await go(page,power,"/pl");
    await menu(page,"pl");

    // Stale, unrelated catalog cookie cannot override the manual shared selection.
    await context.addCookies([{name:"NEXT_LOCALE",value:"nl",url:power}]);
    await go(page,power,"/pl");

    // Switching language in the catalog must in turn persist to the main WWW.
    await page.locator('header [data-testid="language-switcher-trigger"]:visible').click();
    await page.locator('header [data-testid="language-switcher-options"]:visible')
      .getByRole("link",{name:"Switch to English"}).click();
    await page.waitForURL(u=>u.pathname==="/en",{timeout:30000});
    assert.equal((await selectedCookie(context))[0]?.value,"en");
    await go(page,www,"/en");
    await menu(page,"en");

    // The mobile menu also offers large, always-readable language choices.
    for(const [base,path,openLabel] of [[www,"/en","Open menu"],[power,"/en","Open menu"]] as const){
      await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:60000});
      const openButton=page.getByRole("button",{name:openLabel});
      await openButton.click();
      const expanded=page.getByTestId("language-switcher-expanded");
      assert.equal(await expanded.isVisible(),true,"Language chooser visible inside mobile menu");
      assert.match(await expanded.innerText(),/Taal \/ Language \/ Język/i);
      assert.equal(await expanded.getByRole("link",{name:/Switch to/}).count(),3);
      const panel=await expanded.boundingBox();
      assert.ok(panel&&panel.x>=0&&panel.x+panel.width<=321,"Expanded options fit 320px viewport");
      await page.keyboard.press("Escape");
      assert.equal(await expanded.count(),0,"Escape closes mobile menu");
    }

    // Explicit language URLs always work and must never redirect because of cookies.
    for(const [base,path] of [[www,"/nl"],[www,"/pl"],[power,"/nl"],[power,"/pl"]] as const){
      const response=await page.goto(base+path,{waitUntil:"domcontentloaded",timeout:60000});
      assert.equal(response?.status(),200);
      assert.equal(new URL(page.url()).pathname,path);
    }

    // New header needs to remain usable at mobile, tablet and wide desktop.
    for(const width of [320,390,1440]){
      await page.setViewportSize({width,height:900});
      for(const base of [www,power]){
        await page.goto(base+"/nl",{waitUntil:"domcontentloaded",timeout:60000});
        assert.equal(await page.locator("h1").count(),1);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),
          `No horizontal overflow at ${width} on ${base}`);
        await menu(page,"nl");
      }
    }
    assert.deepEqual(errors,[],"No JavaScript runtime errors in locale flow");
    console.log("NOORDTUNE_VISIBLE_LANGUAGE_CROSS_DOMAIN_QA_PASS",JSON.stringify({
      www,power,locales:["nl","en","pl"],regionSEO:"www first visit always NL",
      firstVisitCatalog:"Accept-Language only when no explicit cookie",
      preference:"noordtune_preferred_locale",sharedBetweenDomains:true,
      legacyNEXT_LOCALEFallback:true,languageOptions:3,
      outsideClick:true,escape:true,mobileExpanded:true,
      viewports:[320,390,1440],noCustomerData:true,noMessagesSent:true
    }));
  }finally{await browser.close()}
}
main().catch(error=>{console.error(error);process.exitCode=1});
