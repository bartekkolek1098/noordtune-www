# NoordTune WWW — Reviewed Dutch Brand Guide Navigation (2026-10-15)

## Baseline
- www.noordtune.nl production: 728648ffd246b60b731db4df41b9f3c843d0da62 (PR #27).
- power.noordtune.nl production: 74f4a6c48a7efd71cb95880c0757309a1d72498e (PR #71), 15 source-reviewed Dutch technical brand guides under /nl/merken.

## Implemented
- Direct, crawlable link to all fifteen published technical brand guides at `https://power.noordtune.nl/nl/merken` within existing NL Power Catalog Discovery sections on homepage, chiptuning landing and five published brand service pages.
- Each of the five individual NL service brand pages (BMW, Audi, Volkswagen, Ford, Toyota) gains a prominent **Merkenoverzicht** tile pointing to its own technically reviewed corresponding brand guide. These appear alongside the previously validated exact model/engine/van links.
- A total of 27 whitelisted individual catalog topics are now reachable from the existing homepage and/or brand pages. Main homepage keeps nine selected model/vehicle cards; extra brand directory is a separate editorial link.
- All external links are to the fixed trusted `https://power.noordtune.nl` host; no unsafe user-supplied URLs, prices, duplicate site pages, personal data or invented tuning numbers.
- Click analytics retains existing two-field, non-PII `power_catalog_click` events (`locale`, `source`). NL only; EN/PL unaffected.
- Main-site prices, forms, RDW lookup and customer results remain unchanged.

## Verification
- `pnpm test:seo`, `pnpm test:analytics`, `pnpm typecheck`, `pnpm lint`, `pnpm build` PASS.
- `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3142 pnpm qa:catalog-discovery` PASS: 9 homepage model links, 5 individual brand service pages, correct NL-only technical brand directory CTA, 27 exact catalog topic URLs HTTP 200 with canonical, 320/390/1440 viewports and click analytics.
- After PR merge, confirm Vercel Production matching SHA, live WWW HTTP 200, and representative cross-domain navigation.

## SEO
Brand technical guide pages are distinct from commercial workshops service pages. New indexed URL count on Power Catalog is 459; WWW adds no new canonical URLs in this change. Publishing pages does not imply Google indexing or rankings; measure with Search Console.
