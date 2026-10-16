# NL BMW / Audi regional discovery — GSC-led implementation (2026-10-16)

## Search evidence and opportunity

Data: Windsor.ai `searchconsole` connector, verified property `sc-domain:noordtune.nl`, Netherlands, 2026-09-16 to 2026-10-14.

Query aggregate:
- `bmw tuning groningen`: **36 impressions**, **0 clicks**, average position about **86.25**.
- `audi tuning groningen`: **24 impressions**, **0 clicks**, average position about **89.5**.
- `chiptuning groningen`: **61 impressions**, **0 clicks**, average position about **81.459**.

Historical query+page rows additionally showed BMW intent on homepage root (35 impressions, position 87.54) and Polish /pl (18 impressions, position 95.28); Audi intent on /pl (23 impressions, position 91.48) and root (12 impressions, position 85.5). These query/page rows are not additive to aggregate query impressions, and they do not describe rankings after the previous October 16 redirects/hreflang optimizations.

## What changed

- Kept the **existing**, canonical `/nl/chiptuning-groningen`. No separate BMW/Audi city doorway pages.
- Added a Netherlands-focused, source-aware BMW/Audi/Volkswagen orientation section on this single regional landing, after its existing unique explanatory content, with three genuine technical routes: BMW 320d B47 vs older N47; true Audi A4 B7 2.0 TDI Stage 2+ hardware-specific customer result; Golf GTI Performance vs Golf R. Wording promises no unsupported gains.
- Visible contextual links to the existing Dutch `/nl/bmw-chiptuning`, `/nl/audi-chiptuning` and `/nl/volkswagen-chiptuning` pages, plus verified `/nl/vehicles/bmw-320d-b47` and `/nl/vehicles/vw-golf-20-tsi-ea888` on the Power Catalog and an authentic Audi client-result page. Exact links were tested HTTP 200 before coding. An alternate Audi A4 B9 deep URL returned HTTP 404 and was deliberately excluded.
- Added independent, specific NL regional guidance to existing BMW and Audi brand landing pages, with reciprocal crawlable links to Groningen, true case/context, the exact BMW B47 engine profile and actual appointment route in Assen.
- One real NoordTune workshop: **Assen only**. Groningen customers are invited to contact the Assen workshop in advance.
- Real Chrome baseline audit at 320 px uncovered **pre-existing mobile horizontal overflow** on the BMW (386 px document width) and Audi (324 px) brand pages, both locally and on previous public Production. Root cause: long uppercase intro H2 headings without safe overflow wrapping. Fixed the shared brand-page renderer heading using `[overflow-wrap:anywhere]`, with regression coverage; no layout hiding or content truncation.
- Full NL-only navigation, with original EN/PL brand pages, prices, genuine project photos, existing vehicle metrics, approved customer projects, all canonicals and previous SEO changes preserved.
- Anonymous Vercel events for `brand_page_click`, `customer_result_click`, `power_catalog_click`, `appointment_click` and `whatsapp_click` use existing whitelisted event shapes. New fixed source `groningen_brand_guide` contains no registration, VIN, name, phone, e-mail, query string, vehicle text or customer data.

## QA and release criteria

- Added `tests/gsc-nl-bmw-audi-groningen.test.ts` and `scripts/qa-nl-gsc-bmw-audi-groningen.ts`.
- Run `pnpm test:seo`, `pnpm test:business`, `pnpm test:analytics`, `pnpm test:catalog-handoff`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Run a real Chrome check with `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3174 pnpm qa:brands:groningen`, then publicly after Vercel production deployment.
- Preserve 139 original WWW sitemap entries, all existing canonical URLs and responsive widths 320 / 390 / 1440.
- This measures technical correctness and navigation, **not** actual Google ranking gains or new confirmed leads. Reassess GSC query/page after recrawl over 2–4 weeks.
