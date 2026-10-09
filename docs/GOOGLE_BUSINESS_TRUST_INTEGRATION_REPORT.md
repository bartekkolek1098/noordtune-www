# NoordTune — Google Business Profile trust & website integration

Date: 2026-10-09
Repo: `bartekkolek1098/noordtune-www`
Feature: `feature/gbp-local-trust-links-2026-10`
Base: `5285ad8733ecef48aab884ce68dfef2cf49928ea`

## Live connected Business Profile facts

Windsor.ai account `locations/10088783664267544357` is the owner's official NoordTune.nl Chiptuning & Auto Diagnostiek | Assen listing.
- Official Maps URL: `https://maps.google.com/maps?cid=1006207776184446592`
- Official leave-review URL: `https://search.google.com/local/writereview?placeid=ChIJvX-wR8vSvWoRgK61LaTE9g0`
- Current confirmed business hours: Monday–Saturday 09:00–18:00; Sunday no opening period. The owner confirmed these hours.
- Profile data showed 0 reviews and 3 gallery images at the time of review. These are baseline observations, not forecasts or a promise of more clients.
- Google Business Profile has a tuning-workshop primary category and Assen as the business location. The existing categories, services, address, service area, hours and contact details were not changed by this sprint.

## Changes to WWW

- `src/content/site.ts`: expose verified Maps and review URLs as a single source of truth.
- `src/components/footer.tsx`: add a localized, visible official Google Maps link to the contact block, with safe external-link attributes.
- `src/components/page-renderers.tsx`: on the published-results archive only, add a small NL/EN/PL invitation to share an **honest** Google review from actual NoordTune experience, with a verified review link. No incentivized, gated or fabricated testimonials.
- `src/lib/seo.tsx`: add the official Google Maps identity link and existing public Instagram/Facebook profiles to `AutoRepair.sameAs`, retaining the Power Catalog URL; do not invent location or street address.
- `tests/seo-freshness.test.ts`: assert approved official identity links and consistency across all languages.

No changes to route paths, prices, canonicals, hreflang, sitemap, analytics event schema, paid enquiry flow, customer facts, domain settings or the independent Power Catalog.

## Business Profile content action

- Published one local Stage 1 post; Google accepted it and later reported it live.
- During asset verification, discovered that several *already-published* result graphics contain emissions-delete wording such as "AdBlue OFF"/"EGR OFF". These were deliberately **not uploaded** to Google Business Profile.
- Updated the new post to feature instead the owner-approved **Toyota ProAce Verso VIP 2.0D (2023) Stage 1** customer case: 177 to 205 pk and 400 to 450 Nm, explicitly limited to that vehicle; its original graphic states DPF/EGR/AdBlue remained active. Final call-to-action links to `/nl/resultaten/toyota-proace-verso-vip-20d-2023-stage-1`.
- The GBP post update was accepted as PROCESSING at the time of submission. Confirm LIVE state separately.
- No changes to older GBP posts or reputation/customer reviews.
- Workshop photographs already on the WWW were not proven to depict the actual NoordTune workshop, so no new claim of photo authenticity or gallery upload was made.

## QA and expected outcome

- `git diff --check`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test:seo`: PASS (13 tests)
- `pnpm content:audit`: PASS
- `pnpm build`: PASS (141 generated pages)
- Local production-build Playwright: PASS (12 combinations; NL/EN/PL homepage and results archive at mobile 390px and desktop 1440px); official Maps/review destinations, safe target/rel, SEO identity, one H1, no overflow, no console/runtime errors. External analytics blocked; no real conversion events emitted.
- Expected outcome is clearer trust/identity and a simple, non-coercive route for real customers to leave reviews. No organic ranking gains, GBP visibility increase, new reviews or enquiries are claimed.

## Follow-up decisions

Continue with authentic workshop photos once provenance and permission are confirmed. Review legacy promotional graphics containing emissions-off language for legal/compliance and customer trust before using them in new promotional campaigns. Do not change address, name, primary category or existing 22 GBP services blindly. Track actual Maps actions/reviews and qualified tuning enquiries before attributing business uplift.
