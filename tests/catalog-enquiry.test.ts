import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {catalogEnquiryHref, parseCatalogEnquiryHash, parseCatalogEnquiryParams, validCatalogEnquiryContext, type CatalogEnquiryRef} from '../src/lib/catalog-enquiry-contract';
import {fetchCatalogEnquiryContext} from '../src/lib/catalog-enquiry-fetch';
import {enquiryEmailUrl, validateEnquiry} from '../src/lib/enquiry';
import {createConversionTracker} from '../src/lib/analytics';
import {site} from '../src/content/site';
const ref: CatalogEnquiryRef = {kind:'manual',id:'tax-a390ba5b5ed30da2',year:2021};
const context = {...ref,version:1 as const,label:'BMW 1 · F40 · 118i 140 KM · 2021',yearFrom:2020,yearTo:2023};

test('handoff uses only public IDs in a removable fragment, never a search string', () => {
  for (const locale of ['nl','en','pl'] as const) {
    const url = new URL(catalogEnquiryHref(ref, locale));
    assert.equal(url.search, '');
    assert.deepEqual(parseCatalogEnquiryHash(url.hash), ref);
    assert.equal(url.origin, site.url);
  }
  assert.equal(parseCatalogEnquiryParams(new URLSearchParams('kind=manual&id=tax-a390ba5b5ed30da2&plate=QA0000')), undefined);
  assert.equal(parseCatalogEnquiryParams(new URLSearchParams('kind=profile&id=vlg97f')), undefined);
  assert.equal(parseCatalogEnquiryHash('#catalog-v1?kind=manual&id=tax-a390ba5b5ed30da2&year=2021&year=2020'), undefined);
  assert.equal(parseCatalogEnquiryHash('#catalog-v1?'+'x'.repeat(600)), undefined);
});
test('proxy requests only the fixed catalog host, refuses redirects and validates matching response', async () => {
  const got = await fetchCatalogEnquiryContext(ref, async (input, options) => {
    const url = new URL(String(input));
    assert.equal(url.origin,'https://power.noordtune.nl');
    assert.equal(url.pathname,'/api/enquiry-context');
    assert.equal(url.searchParams.get('id'),ref.id);
    assert.equal(options?.redirect,'error');
    assert.equal(options?.method,'GET');
    return Response.json({context});
  });
  assert.deepEqual(got, context);
  for (const invalid of [{...context,plate:'QA0000'},{...context,id:'rdw-other'}, {...context,label:'<script>alert(1)</script>'}, {...context,label:'someone@example.invalid'}, {...context,year:2020}, {...context,label:'x'.repeat(161)}]) {
    assert.equal(validCatalogEnquiryContext(invalid,ref),false);
    await assert.rejects(fetchCatalogEnquiryContext(ref,async()=>Response.json({context:invalid})));
  }
});
test('unknown, malformed and unavailable catalog data never become successful prefill', async () => {
  assert.equal(await fetchCatalogEnquiryContext(ref,async()=>new Response('',{status:404})),undefined);
  for (const response of [new Response('',{status:503}),new Response('not json',{headers:{'content-type':'application/json'}}),new Response('<html>Login</html>',{headers:{'content-type':'text/html'}}),new Response('x'.repeat(5000),{headers:{'content-type':'application/json'}})]) await assert.rejects(fetchCatalogEnquiryContext(ref,async()=>response));
});
test('email is a client-side handoff to the fixed recipient, not a sent-message event', () => {
  const message='BMW 118i\nPytanie: € + &\nCc: nobody@example.invalid';
  for (const locale of ['nl','en','pl'] as const) {
    const url=new URL(enquiryEmailUrl(message,locale));
    assert.equal(url.protocol,'mailto:');assert.equal(url.pathname,site.email);
    assert.equal(url.searchParams.get('body'),message);assert.equal(url.searchParams.get('cc'),null);
    assert.deepEqual([...url.searchParams.keys()],['subject','body']);
  }
  const events:unknown[]=[];const track=createConversionTracker((name,p)=>events.push({name,p}));
  track({name:'appointment_email_handoff',properties:{locale:'nl',source:'business_composer'}});
  assert.equal(events.length,1);
  assert.doesNotMatch(JSON.stringify(events),/lead_received|generate_lead|booking_confirmed|BMW|nobody/);
});
test('prefill does not complete the question or make an automatic booking', () => {
  assert.ok(validateEnquiry({service:'advice',vehicle:context.label,plate:'',description:'',preferred:''},'nl','contact').description);
  for (const p of ['src/components/business-enquiry.tsx','src/components/whatsapp-enquiry.tsx']) {
    const code=readFileSync(p,'utf8');
    assert.match(code,/vehicleEdited/);
    assert.doesNotMatch(code,/localStorage|sessionStorage|sendBeacon/);
  }
  const hook=readFileSync('src/hooks/use-catalog-enquiry.ts','utf8');
  assert.match(hook,/replaceState/);assert.match(hook,/AbortController/);
  assert.doesNotMatch(hook,/fields\.|plate:|vin:|message:|localStorage|sessionStorage/);
});
