# NoordTune WWW — link 21 audited Dutch commercial van comparisons (2026-10-16)

## Baseline
- WWW main `a5e77b8af951512f3ec4c274d15d175d6bb87180` (PR #30; production READY).
- Power Catalog main `a97270b4262d743e0f909abd6819fbce40719f23` (PR #74, production READY; 484 unique canonical sitemap URLs).
- Prior WWW business services page offered nine featured technical van comparison cards after PR #29, plus six original model links and the unchanged quotation form.

## Implemented
- Keep the **nine most popular, larger comparison cards** visible for Mercedes Sprinter/Vito, VW Transporter/Crafter, Ford Transit/Custom, Toyota Proace, Peugeot Boxer and Fiat Ducato.
- Add **12 compact, directly crawlable technical comparison links** underneath, covering Iveco Daily 2.3/3.0, Renault Master, Peugeot Expert, Toyota Proace City, Opel Vivaro B/Movano B-C/Combo E, Citroën Jumpy/Berlingo, Peugeot Partner, Fiat Doblò and Renault Kangoo.
- Technical card titles and descriptions highlight genuinely distinct source-reviewed model generations and ECU/RDW identity checks; all link only to the published `https://power.noordtune.nl/nl/bedrijfswagens/vergelijken/<approved-slug>` origin and exact reviewed paths.
- Dynamic title and primary CTA now show **21 reviewed comparisons**. Nine featured cards plus twelve compact links retain the commercial page's usability rather than making all 21 large cards.
- Homepage CTA already links to the unified technical comparison index and stays unchanged. The former 6 van model links and pricing/quotations, original workplace photos, WhatsApp/email, NL-only localization and DPF/SCR/AdBlue legality remain untouched.
- All new links track the existing anonymous `power_catalog_click` event with only `locale: nl` and `source: business_van_compare` (no new account fields, registrations, names, VIN or customer data).
- No new WWW indexable pages or metadata changes; no inflated Google indexation claims, no numeric Stage 1 values on the main service page.

## QA
- `pnpm test:seo`, `pnpm test:business`, `pnpm test:analytics`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Updated `tests/van-generation-comparisons.test.ts` expects exactly 9 original curated featured items + 12 new reviewed compact topics with 21 different safe external URLs, original business quoting retained.
- Updated `scripts/qa-www-van-comparisons.ts`: all **21** production catalog destinations HTTP 200 and canonical; nine original prominent + twelve compact cards, exact analytics; mobile 320/390 desktop 1440; EN/PL unaffected. Exact cross-origin live click tests for Mercedes Sprinter **and the newly added Iveco Daily** into the correct prefilled WWW quote without sending any message.
- After PR Preview READY, merge and check production READY exact SHA, rerun public browser verification against `https://www.noordtune.nl`.
- Rollback tag before main merge: `rollback-before-www-van-compare-expansion-20261016` pointing at pre-merge main `a5e77b8af951512f3ec4c274d15d175d6bb87180`.

## Next data-driven improvements
The 21 comparison URL publication and associated conversion links improve crawlable navigation and usability but do not prove organic traffic. Measure landing pages indexed, impressions and search terms in native free Google Search Console once available, and real click/source events in Vercel Analytics; direct future source-verified motor expansion toward missing or popular technical RDW variants.
