# NoordTune — NL service-area discovery and conversion tracking

Date: 2026-10-09
Branch: `feature/nl-local-discovery-tracking-2026-10`
Base: main at `58a87deb754f8119e58652d0fc4ea8f585a906f7`

## Business objective

Increase discoverability of the existing Drenthe and Groningen tuning pages from the already-visible /nl/chiptuning page and close a specific conversion-measurement gap on published service landing pages. No new locations, services, offers or landing pages.

## Verified supporting data

Windsor.ai Search Console, `sc-domain:noordtune.nl`, Netherlands only, July 1–October 5, 2026:
- `chiptuning assen`: 181 impressions / 9 clicks / 9.35 average position.
- `chiptuning drenthe`: 72 impressions / 0 clicks / 20.11 average position.
- `chiptuning groningen`: 367 impressions / 0 clicks / 64.35 average position.

Earlier authorized Google URL Inspection (October 9) found /nl/chiptuning-drenthe unknown to Google and /nl/chiptuning-groningen discovered but currently not indexed. Those observations do not identify the cause, and the new internal links do not guarantee indexing.

## Actual changes

1. `src/components/tuning-service-journey.tsx`: one short, natural Dutch paragraph after the existing service chooser. It explicitly locates NoordTune in Assen and links to the already-existing `/nl/chiptuning-drenthe` and `/nl/chiptuning-groningen` URLs. No new geographic claims or page sections.
2. `src/components/page-hero.tsx`: existing destination-based conversion events are used for Power Catalog, WhatsApp and appointment PageHero buttons. The event name/shape is unchanged; exactly `locale` and `source: "site_cta"`. Internal anchor links and other navigation are not falsely counted as conversions.
3. `src/components/seo-landing-renderer.tsx`: passes the already-supported locale to both existing rich-info CTA sections. The existing `RichInfoSection` can now record its catalog and WhatsApp actions without new dependencies, providers or event contracts.
4. `scripts/test-service-journey-browser.ts`: adds checks for both visible local links and their HTTP 200 targets; verifies the hero and rich-section tracked buttons and exactly one safe event for a catalog click.
5. Updated only the mobile and iPad chooser screenshots; no unrelated rendered screenshots intentionally changed.
6. `src/content/seo-landings.ts`: strengthened only the existing NL Groningen landing page, with an explicit Assen workshop location, specific Stage 1 / ECU-remap suitability explanation, a verified Volkswagen Caddy Stage 1 project link and direct pricing/contact/appointment paths. Removed unsupported travel-time framing and diagnostic-first positioning. The Groningen SEO title, description, H1 and FAQ were clarified without changing its URL.

There are no changes to customer-result facts, pricing, canonical/hreflang/sitemap/redirect logic, workshop/footer credit, Power Catalog or its links. Only the existing Groningen page's SEO title and description were revised; other SEO metadata is unchanged. No new event names or properties; no personal vehicle/contact/enquiry data sent to analytics.

## QA

- `pnpm install --frozen-lockfile`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm content:audit`: PASS
- `pnpm test:analytics`: PASS (6/6)
- `pnpm test:seo`: PASS (10/10, including a focused Groningen location and customer-proof regression test)
- `pnpm build`: PASS (141 static pages)
- `pnpm exec tsx scripts/test-service-journey-browser.ts`: PASS on 390×844, 430×932, 768×1024, 820×1180, 1180×820 and 1440×1000. Link targets, one H1, existing customer proof, NL/EN/PL routes, correct single conversion events and privacy fields, no horizontal overflow and no console/runtime errors.

The browser test ran against a local production build on port 3002. External navigation and analytics intake were intercepted; no real WhatsApp message, email or production tracking event was sent. No full hosted-preview QA or measured SEO/ranking outcome is claimed.

## Delivery and next step

Open draft PR to main. Do not merge without owner approval. Review the preview, then assess search coverage and qualified NL tuning enquiries after Google recrawls. The separate Power Catalog app at `power.noordtune.nl` was not modified; destination remains exactly `https://power.noordtune.nl/`.

## October 9 Groningen refinement and investigation

- The production `/` URL was checked using a Googlebot user agent without Accept-Language: HTTP 307 to `/nl`. Direct requests for `/nl`, `/nl/chiptuning-groningen` and `/nl/chiptuning-drenthe` all returned HTTP 200. This does not establish why Search Console historically chose `/` over `/nl` as a homepage canonical.
- Google Search Central recommends accessible, distinct language-specific URLs and cautions about automatic language redirects: https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites . Current redirect behavior remains unchanged pending stronger index/canonical evidence.
- The Groningen page now clearly states that the actual NoordTune workshop is in Assen, with no Groningen branch, and offers a vehicle-specific path from Power Catalog to quote and appointment. It links to the existing approved Volkswagen Caddy 2.0 TDI (2020) Stage 1 result, not a fabricated regional project.
- No changes were made to `robots.txt`, canonical/hreflang, sitemap, redirects, analytics payload contracts, publication dates or Power Catalog. No index request or sitemap resubmission was performed.
- Focused local production-build Playwright smoke after the final update: PASS at 390×844, 820×1180 and 1440×900. Verified local H1, accurate workshop reference, self-canonical, proof/pricing/contact/appointment links all HTTP 200, reciprocal region discovery from `/nl/chiptuning`, no horizontal overflow and no console or runtime errors. External Vercel Analytics collection was intercepted. An initial harness-only 404 was identified as the absent local `/_vercel/insights/script.js` and resolved by intercepting that script in the QA harness; no production application change was needed.
- The final lint, typecheck, content audit, 10 SEO tests and Next.js build (141 generated pages) all passed.

Recheck these regional URLs with Google URL Inspection after publishing meaningful changes and allowing adequate recrawl time. Improved internal linking and content do not guarantee indexing or ranking improvements.
