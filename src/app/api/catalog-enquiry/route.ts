import {NextRequest, NextResponse} from 'next/server';
import {parseCatalogEnquiryParams} from '@/lib/catalog-enquiry-contract';
import {fetchCatalogEnquiryContext} from '@/lib/catalog-enquiry-fetch';
export const runtime = 'nodejs';
const headers = {'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow'};
export async function GET(request: NextRequest) {
  const ref = request.nextUrl.search.length <= 400 ? parseCatalogEnquiryParams(request.nextUrl.searchParams) : undefined;
  if (!ref) return NextResponse.json({error: 'INVALID_REFERENCE'}, {status: 400, headers});
  try {
    const context = await fetchCatalogEnquiryContext(ref);
    if (!context) return NextResponse.json({error: 'UNKNOWN_REFERENCE'}, {status: 404, headers});
    return NextResponse.json({context}, {headers: {...headers, 'Cache-Control': 'public, s-maxage=3600'}});
  } catch {
    // No visitor data, upstream body or URL in logs/errors. The enquiry remains usable.
    return NextResponse.json({error: 'CATALOG_UNAVAILABLE'}, {status: 503, headers});
  }
}
