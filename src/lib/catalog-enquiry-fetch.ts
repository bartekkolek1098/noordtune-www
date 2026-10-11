import {catalogEnquiryParams, validCatalogEnquiryContext, type CatalogEnquiryRef, type CatalogEnquiryContext} from './catalog-enquiry-contract';
export type CatalogContextFetcher = typeof fetch;
export const catalogContextOrigin = 'https://power.noordtune.nl';

/** Read-only request to our fixed public catalog. Never fetch a URL supplied by the visitor. */
export async function fetchCatalogEnquiryContext(ref: CatalogEnquiryRef, transport: CatalogContextFetcher = fetch): Promise<CatalogEnquiryContext | undefined> {
  const url = catalogContextOrigin + '/api/enquiry-context?' + catalogEnquiryParams(ref).toString();
  const response = await transport(url, {method: 'GET', redirect: 'error', cache: 'no-store',
    signal: AbortSignal.timeout(6000), headers: {Accept: 'application/json'}});
  if (response.status === 404 || response.status === 400) return undefined;
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('Catalog context unavailable');
  const text = await response.text();
  if (text.length > 4096) throw new Error('Unexpected catalog response');
  const data = JSON.parse(text) as {context?: unknown};
  if (!validCatalogEnquiryContext(data?.context, ref)) throw new Error('Unexpected catalog context');
  return data.context;
}
