# Audi A4 B7 Branch QA Report

## Branch

- Branch: `feature/publish-audi-a4-b7-result`
- Result: Audi A4 B7 2.0 TDI Stage 2+

## Files Changed

- `src/content/customer-results.ts`
- `public/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp`
- `public/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp`
- `docs/AUDI_A4_B7_RESULT_PUBLICATION_REPORT.md`
- `docs/AUDI_A4_B7_OWNER_REVIEW_CHECKLIST.md`
- `docs/AUDI_A4_B7_BRANCH_QA_REPORT.md`

## Route QA

Verified locally against a production build served at `http://127.0.0.1:3026`:

- `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: 200.
- `/en/results/audi-a4-b7-20-tdi-stage-2-plus`: 200.
- `/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`: 200.
- `/nl/resultaten`: 200, shows BMW X3 + Audi A4 as real customer results.
- `/en/results`: 200, shows BMW X3 + Audi A4 as real customer results.
- `/pl/rezultaty`: 200, shows BMW X3 + Audi A4 as real customer results.
- BMW X3 routes still return 200.
- Demo detail routes still return 404.
- `/power` on the main website remains 404.

## Image QA

- Main image path: `/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp`
- Open Graph image path: `/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp`
- Main image asset returns 200 locally.
- Open Graph image asset returns 200 locally.
- The visible license plate remains visible because the owner approved it for this marketing graphic.
- No full VIN, customer name, customer address, private contact details or certificate number is published.

## Sitemap QA

Verified after build:

- Sitemap includes Audi A4 result routes in NL/EN/PL.
- Sitemap still includes BMW X3 result routes.
- Sitemap excludes demo result detail routes.

## CTA QA

- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.
- Polish detail page uses localized CTAs and contains no English CTA leftovers.

## QA Command Results

`pnpm` was not available in the shell PATH, so equivalent local binaries were run with the bundled Codex Node runtime:

- `eslint .`: passed.
- `tsc --noEmit`: passed.
- `next build`: passed.
- `tsx scripts/audit-locales.ts`: passed.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
