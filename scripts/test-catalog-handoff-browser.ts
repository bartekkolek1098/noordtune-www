import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {chromium} from 'playwright';
import {catalogEnquiryHref, type CatalogEnquiryRef} from '../src/lib/catalog-enquiry-contract';
const www = (process.env.HANDOFF_WWW_BASE ?? 'http://127.0.0.1:53931').replace(/\/$/,'');
const catalog = (process.env.HANDOFF_CATALOG_BASE ?? 'http://127.0.0.1:53932').replace(/\/$/,'');
const bridge = process.env.HANDOFF_LOCAL_BRIDGE === '1';
const out = resolve(process.env.HANDOFF_QA_OUT ?? '../noordtune-handoff-qa-20261011/local');
const fixtures = JSON.parse(readFileSync(resolve(process.env.HANDOFF_FIXTURES ?? '../noordtune-handoff-qa-20261011/fixtures.json'),'utf8'));
for (const raw of [www,catalog]) {const u=new URL(raw);assert.ok(['127.0.0.1','localhost','www.noordtune.nl','power.noordtune.nl'].includes(u.hostname)||u.hostname.endsWith('-bartekkolek1098s-projects.vercel.app'));}
async function main(){
 mkdirSync(out,{recursive:true});const browser=await chromium.launch({headless:true});let checks=0;
 const context=await browser.newContext();const errors:string[]=[];const networkLeaks:string[]=[];
 let apiMode:'normal'|'fail'|'slow'='normal';
 try {
  if(process.env.HANDOFF_PREVIEW_ACCESS_URL){const p=await context.newPage();await p.goto(process.env.HANDOFF_PREVIEW_ACCESS_URL);await p.close();}
  await context.addInitScript(()=>{(window as unknown as {qaHandoffs:string[]}).qaHandoffs=[];window.open=((url: string)=>{(window as unknown as {qaHandoffs:string[]}).qaHandoffs.push(String(url));return null;}) as typeof window.open;});
  context.on('request',r=>{if(r.url().includes('PRIVATE_QA_COMPANY')||(r.postData()??'').includes('PRIVATE_QA_COMPANY'))networkLeaks.push(new URL(r.url()).pathname);});
  await context.route('**/*',async route=>{
    const request=route.request(),u=new URL(request.url());
    if(u.pathname.startsWith('/_vercel/insights')||u.hostname.endsWith('vercel-insights.com'))return route.fulfill({status:200,contentType:'application/javascript',body:''});
    if(u.pathname==='/api/rdw-lookup')return route.fulfill({json:fixtures.rdw});
    if(u.pathname==='/api/catalog-enquiry'){
      if(apiMode==='fail')return route.fulfill({status:503,json:{error:'CATALOG_UNAVAILABLE'}});
      if(apiMode==='slow')await new Promise(r=>setTimeout(r,1500));
      if(bridge){const response=await context.request.get(catalog+'/api/enquiry-context'+u.search);return route.fulfill({response});}
    }
    if(u.origin==='https://www.noordtune.nl'&&www!=='https://www.noordtune.nl'){
      const response=await context.request.get(www+u.pathname+u.search);return route.fulfill({response});
    }
    if([new URL(www).origin,new URL(catalog).origin,'https://www.noordtune.nl'].includes(u.origin))return route.continue();
    return route.fulfill({status:200,contentType:'application/javascript',body:''});
  });
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  async function checkPrefill(ref:CatalogEnquiryRef,locale:'nl'|'en'|'pl',business=false){
    const canonical=new URL(catalogEnquiryHref(ref,locale,business));
    const load=await page.goto(www+canonical.pathname+canonical.hash,{waitUntil:'networkidle'});
    assert.equal(load?.status(),200,canonical.pathname);
    assert.equal(new URL(page.url()).hostname,new URL(www).hostname);
    await page.locator('[data-testid="catalog-enquiry-status"][data-status="ready"]').waitFor();
    const form=business?page.getByTestId('business-enquiry'):page.locator('[data-enquiry="contact"]');
    const vehicle=business?form.locator('#business-vehicle'):form.locator('input[id$="-vehicle"]');
    assert.ok((await vehicle.inputValue()).length>5);assert.ok((await vehicle.inputValue()).includes(ref.year?String(ref.year):'Proace'));
    assert.equal(new URL(page.url()).hash,business?'#offerte':'#enquiry');
    assert.equal(new URL(page.url()).search,'');
    assert.equal(await form.locator('select').first().inputValue(),business?'Advies over mijn motor':'advice');
    const question=business?form.locator('#business-question'):form.locator('textarea[id$="-description"]');
    assert.equal(await question.inputValue(),'');
    await question.fill('PRIVATE_QA_COMPANY: graag advies over mijn motor.');
    if(business)await form.locator('#business-use').fill('Gereedschap en aanhanger');
    const buttonName={nl:'Verder via WhatsApp',en:'Continue in WhatsApp',pl:'Przejdź do WhatsApp'}[locale];
    await form.getByRole('button',{name:buttonName,exact:true}).click();
    const handoffs=await page.evaluate(()=>(window as unknown as {qaHandoffs:string[]}).qaHandoffs);
    assert.equal(handoffs.length,1);const url=new URL(handoffs[0]);
    assert.equal(url.origin+url.pathname,'https://wa.me/31685759600');
    assert.ok(url.searchParams.get('text')?.includes(await vehicle.inputValue()));
    assert.ok(url.searchParams.get('text')?.includes('PRIVATE_QA_COMPANY'));
    assert.ok(!url.searchParams.get('text')?.includes('QA0000'),'Registration should not cross the catalog-form bridge');
    assert.equal(await form.getByRole('button',{name:{nl:'Verder via e-mail',en:'Continue by email',pl:'Przejdź do e-maila'}[locale],exact:true}).isEnabled(),true);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    checks++;return vehicle;
  }
  for(const width of [390,1440]){await page.setViewportSize({width,height:1000});for(const locale of ['nl','en','pl'] as const)await checkPrefill(fixtures.refs.bmw,locale);await checkPrefill(fixtures.refs.engine,'nl',true);await page.screenshot({path:resolve(out,'enquiry-'+width+'.png')});}
  await checkPrefill(fixtures.refs.pending,'pl');await checkPrefill(fixtures.refs.van,'nl',true);await checkPrefill(fixtures.refs.rdw,'nl');
  if(process.env.HANDOFF_RECEIVER_ONLY!=='1'){
  // Real clickable link on an engine page, including cross-origin navigation.
  await page.goto(catalog+'/nl/bedrijfswagens/motoren/'+fixtures.refs.engine.id,{waitUntil:'networkidle'});
  await page.getByTestId('catalog-enquiry-link').click();await page.locator('[data-testid="catalog-enquiry-status"][data-status="ready"]').waitFor();
  assert.ok((await page.locator('#business-vehicle').inputValue()).includes('Proace'));checks++;
  // Real RDW UI using a synthetic, in-memory registration fixture only.
  await page.goto(catalog+'/nl',{waitUntil:'networkidle'});const rdw=page.locator('#rdw-check');await rdw.locator('input').first().fill('QA0000');await rdw.locator('form button[type="submit"]').click();
  const rdwLink=page.getByTestId('rdw-result').getByTestId('catalog-enquiry-link');await rdwLink.waitFor();assert.doesNotMatch(await rdwLink.getAttribute('href')??'',/QA0000/);await rdwLink.click();await page.locator('[data-testid="catalog-enquiry-status"][data-status="ready"]').waitFor();assert.match(await page.locator('[data-enquiry="contact"] input[id$="-vehicle"]').inputValue(),/Berlingo/i);checks++;
  }
  // An unavailable context never disables the enquiry or claims successful import.
  apiMode='fail';const dest=new URL(catalogEnquiryHref(fixtures.refs.bmw,'pl'));await page.goto(www+dest.pathname+dest.hash,{waitUntil:'networkidle'});await page.locator('[data-status="failed"]').waitFor();assert.equal(await page.locator('input[id$="-vehicle"]').inputValue(),'');assert.equal(await page.locator('input[id$="-vehicle"]').isEnabled(),true);checks++;
  // Slow resolution must not overwrite a visitor's edit.
  apiMode='slow';await page.goto(www+dest.pathname+dest.hash,{waitUntil:'domcontentloaded'});const input=page.locator('input[id$="-vehicle"]');await input.waitFor();await input.fill('Moje poprawione auto');await page.locator('[data-status="ready"]').waitFor();assert.equal(await input.inputValue(),'Moje poprawione auto');checks++;
  assert.deepEqual(networkLeaks,[]);assert.deepEqual(errors,[]);
  const report={ok:true,www,catalog,localApiBridge:bridge,receiverOnly:process.env.HANDOFF_RECEIVER_ONLY==='1',checks,locales:['nl','en','pl'],actualMessagesSent:0,registrationTransferred:false,networkLeaks:0,checkedAt:new Date().toISOString()};writeFileSync(resolve(out,'report.json'),JSON.stringify(report,null,2));console.log('CATALOG_HANDOFF_BROWSER_PASS',JSON.stringify(report));
 }finally{await context.close();await browser.close();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
