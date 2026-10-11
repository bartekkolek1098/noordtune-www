# NL business van offer, shared prices and Berlingo case

Date: 2026-10-11
Base main: 399e9bb0e8a60766be152126340ab0cd69a8de69
Branch: feature/nl-business-vans-pricing-berlingo-20261011

## Delivered scope

- Native Dutch offer at /nl/bedrijfswagens, linked from the homepage and footer. Intake, work process, use cases, Stage 1 price bands, vehicle-specific scope, six verified model links and a quote composer.
- Homepage business feature and reviewed price summary. The existing main navigation, passenger-car offering and workshop imagery remain.
- All ten visible Power Catalog Price V2 tiers are mirrored in one reviewed website snapshot. Stage 1 from EUR 299 / 349 / 399; Stage 2 from EUR 449 / 499 / 549; Stage 3+ from EUR 699 / 849 / 999; TCU from EUR 249. Existing website VAT convention is retained. Supporting services remain EUR 89 / 149 / 129 or quotation. Prices are starting prices, not a final quote or ECU access-method classification.
- Price-bearing copy, metadata, service landings and price cards now read the central snapshot. verify:catalog-pricing --live checks it against the current catalog source. Reviewed catalog commit: 30a9b1f3b6c2851bcd835e56c88ee4685d506aba. No Power Catalog repository code was changed.
- The homepage catalog text and existing SVG no longer promise computed Stage 2/3 results. Stage 2/3 service prices remain separate from unsupported power predictions.
- Berlingo technical case in NL, EN and PL: maintenance, ECU identity, source limitations and open recommendations. The declared 130 PS / 320 Nm are calibration targets, not dyno measurements; numeric measured-output/gain fields remain empty. Older approximate-100 artwork does not override the later service report.
- Three cropped photographic areas of the supplied project composites; no AI mockup is published as evidence. Registration/VIN and the original identifying reports are not published.

## Approval and case boundaries

Customer approval is not fabricated. The owner's explicit publication request is recorded separately for an anonymized manual technical case. The publication helper rejects owner-only records with visible registration approval, external image sources, missing evidence notes, identifying VIN text or Facebook provenance. Customer-approved legacy cases remain supported. Unapproved records cannot render publicly; the content audit remains enabled.

The timing-belt work does not prove replacement of the separate camshaft chain. Oil-leak repair and cold-start-noise follow-up remain open. Recorded SCR/readiness/Start-Stop history is not presented as proof of emissions, APK or road-use approval. The business offer does not sell road-vehicle emissions defeat.

## Enquiry behavior

The composer prepares a message for WhatsApp or the visitor's email application. It does not claim successful delivery or a confirmed reservation. Company, fleet, engine, use and preference fields are optional as appropriate; service and question are validated. There is no native GET/POST form or application storage of the fields. Analytics uses only the existing non-PII event keys. Clipboard denial reveals a selectable preview.

## Validation before preview

- 14 business tests, 14 SEO tests, 6 analytics tests and 11 enquiry tests: PASS (45 total).
- TypeScript, ESLint, content audit and optimized Next.js build: PASS. Build generated 145 pages.
- Current remote catalog price parity: PASS (10 visible tiers).
- Browser QA: 36 page/viewport checks, including 320–1920 px header coverage, homepages/pricing/case locales and NL offer.
- Functional QA: CTA scrolling, required-field validation, fleet/vehicle message, intercepted WhatsApp handoff, clipboard success/denial, SSR fallback, unpublished-language 404s and six live catalog destinations: PASS.
- No real messages sent. Third-party analytics intercepted in browser QA.
- Sitemap: 139 unique URLs, including the one NL offer and three case translations.
- Desktop/mobile screenshots visually reviewed. Raw screenshots stay outside the repository.

## Release gate and rollback

Create and verify the exact Git-linked Vercel preview before merging. Then verify the production deployment, routes, sitemap and contact behavior. Record those post-publication checks in the PR. This document records pre-release QA, not proof of publication.

Return point: tag backup/pre-business-offer-20261011, pointing to the prior main commit 399e9bb0e8a60766be152126340ab0cd69a8de69.
