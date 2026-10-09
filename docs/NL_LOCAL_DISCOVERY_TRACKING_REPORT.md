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

There are no changes to customer-result facts, pricing, SEO title/canonical/hreflang/sitemap/redirect logic, workshop/footer credit, Power Catalog or its links. No new event names or properties; no personal vehicle/contact/enquiry data sent to analytics.

## QA

- `pnpm install --frozen-lockfile`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm content:audit`: PASS
- `pnpm test:analytics`: PASS (6/6)
- `pnpm test:seo`: PASS (9/9)
- `pnpm build`: PASS (141 static pages)
- `pnpm exec tsx scripts/test-service-journey-browser.ts`: PASS on 390×844, 430×932, 768×1024, 820×1180, 1180×820 and 1440×1000. Link targets, one H1, existing customer proof, NL/EN/PL routes, correct single conversion events and privacy fields, no horizontal overflow and no console/runtime errors.

The browser test ran against a local production build on port 3002. External navigation and analytics intake were intercepted; no real WhatsApp message, email or production tracking event was sent. No full hosted-preview QA or measured SEO/ranking outcome is claimed.

## Delivery and next step

Open draft PR to main. Do not merge without owner approval. Review the preview, then assess search coverage and qualified NL tuning enquiries after Google recrawls. The separate Power Catalog app at `power.noordtune.nl` was not modified; destination remains exactly `https://power.noordtune.nl/`.
