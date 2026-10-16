# NoordTune — VW Golf GTI vs Golf R, NL discovery update (2026-10-16)

## Real Google Search Console signal

Connected Windsor.ai Search Console, verified `sc-domain:noordtune.nl`, Netherlands, 2026-09-16–2026-10-14:
- `golf gti tuning groningen`: 41 impressions, 0 clicks, average position 72.7561 (query-level).
- Query/page breakdown showed 30 impressions for the **English Golf 7 R** profile `/en/vehicles/volkswagen-golf-7-r-20-tsi` on that GTI-intent search. This is a *historical correlation*, not proof of an indexing bug; search engine ranking is outside NoordTune's direct control.
- The previously published Dutch GTI Performance and Golf R profiles were both checked live, returning HTTP 200 and their own unique Dutch canonical URLs.

## One safe, differentiated content improvement

No fabricated location, performance or case:
1. Existing `/nl/volkswagen-chiptuning`: original Dutch technical section distinguishing Golf 7 GTI Performance EA888 from the Golf 7 R, ECU/TCU and gearbox checks, source-conditioned estimates and the sole real workshop in Assen for visitors from Groningen.
2. Exact crawlable links to `https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888` (GTI) and `https://power.noordtune.nl/nl/vehicles/volkswagen-golf-7-r-20-tsi` (R), and the original `/nl/afspraak` booking route.
3. Contextual brand link from existing `/nl/chiptuning-groningen`, not a new search-doorway page.
4. Updated only the Dutch VW meta description. Existing NL canonical, the authorized Caddy and Transporter cases, original images, all EN/PL pages and prices remain.
5. External direct catalog links on brand service sections now report anonymous `power_catalog_click` with only `locale` and whitelisted `source=brand_section`. No VIN, plate, name, contact fields, symptoms or other customer values.

## Verification before release

- New 3-case regression suite: `tests/gsc-nl-vw-gti-discovery.test.ts`; included in `pnpm test:seo`.
- `pnpm test:seo` 34 PASS; `pnpm test:business` 19 PASS; `pnpm test:analytics` 6 PASS; `pnpm test:catalog-handoff` 5 PASS.
- `pnpm typecheck`, `pnpm lint`, `pnpm build`: PASS.
- Production-build Chrome script `pnpm qa:vw-gti:www` at `http://127.0.0.1:3173`: PASS. Checks canonical, metadata, exact variant descriptions and catalog destinations, live 200/locale, source-only click event, Groningen -> VW -> appointment, EN/PL unchanged, widths 320/390/1440, 139 sitemap URLs and no JS errors.
- QA does not send an actual message or booking.

After public deployment, rerun `NOORDTUNE_WWW_QA_URL=https://www.noordtune.nl pnpm qa:vw-gti:www`. Actual SEO impact should be rechecked with GSC after adequate recrawl/data collection; do not infer an instant rank improvement.
