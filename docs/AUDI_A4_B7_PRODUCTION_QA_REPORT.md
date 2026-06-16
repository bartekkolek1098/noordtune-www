# Audi A4 B7 Production QA Report

## Scope

- Production URL: `https://www.noordtune.nl`
- QA date: 2026-06-16
- Main commit tested locally: `c8c91e9`
- Result checked: Audi A4 B7 2.0 TDI Stage 2+

This was a production QA pass only. No website features, booking logic, Facebook API sync, file service, production/domain settings, or `power.noordtune.nl` files were changed.

## Production Route Results

Production listing pages:

- `https://www.noordtune.nl/nl/resultaten`: 200
- `https://www.noordtune.nl/en/results`: 200
- `https://www.noordtune.nl/pl/rezultaty`: 200

Production Audi A4 detail pages:

- `https://www.noordtune.nl/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `https://www.noordtune.nl/en/results/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `https://www.noordtune.nl/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`: 200

BMW X3 detail pages:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`: 200
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`: 200
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`: 200

Demo detail routes:

- `/nl/resultaten/bmw-330d-stage-1`: 404
- `/nl/resultaten/audi-a4-20-tdi-stage-1`: 404
- `/nl/resultaten/volkswagen-golf-gti-stage-1`: 404
- `/nl/resultaten/mercedes-c-220d-stage-1`: 404

`/power` on the main website remains 404.

## Listing QA

Verified on production:

- Audi A4 appears on listing pages as a real customer result.
- BMW X3 still appears on listing pages as a real customer result.
- Demo/example cards are hidden from public listings.
- Localized labels are present:
  - Dutch: `Klantresultaat`
  - English: `Customer result`
  - Polish: `Realizacja klienta`

## Audi A4 Content QA

Verified on production:

- Stats are correct:
  - Stock: 170 hp / 350 Nm
  - Tuned: 235 hp / 470 Nm
  - Gain: +65 hp / +120 Nm
- ECU wording is localized and uses the approved meaning:
  - Dutch: `Gecontroleerd tijdens service; niet publiek vermeld`
  - English: `Verified during service; not publicly listed`
  - Polish: `Zweryfikowane podczas usługi; niepodawane publicznie`
- Polish page uses proper Polish diacritics.
- No English CTA text appears on the Polish detail page.

## Image And Privacy QA

Verified on production:

- Audi A4 image asset loads: `/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp` returns 200 as `image/webp`.
- Audi A4 Open Graph image loads: `/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp` returns 200 as `image/webp`.
- Audi A4 image is present on listing pages.
- Audi A4 image is present on detail pages.
- Audi A4 Open Graph metadata uses the Audi A4 OG image.
- Visible license plate appears only inside the owner-approved marketing graphic.
- No full VIN is exposed in page HTML.
- No customer name is exposed in page HTML.
- No customer address or private contact data is exposed in page HTML.
- No certificate number or private document reference is exposed in page HTML.

## Link QA

Verified on production listing and Audi detail pages:

- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.

## Sitemap QA

Production sitemap:

- `https://www.noordtune.nl/sitemap.xml`

Verified:

- Sitemap includes Audi A4 Dutch route.
- Sitemap includes Audi A4 English route.
- Sitemap includes Audi A4 Polish route.
- Sitemap includes BMW X3 routes.
- Sitemap excludes demo result detail routes.

## Mobile And Browser QA

Browser QA was run with the project Playwright package after the in-app browser surface became unavailable during reconnect.

Mobile viewport tested: 390x844.

Verified:

- `/nl/resultaten`: no horizontal overflow, no console errors, Audi image loaded and visible.
- `/en/results`: no horizontal overflow, no console errors, Audi image loaded and visible.
- `/pl/rezultaty`: no horizontal overflow, no console errors, Audi image loaded and visible.
- `/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`: no horizontal overflow, no console errors, Audi image loaded and visible, Polish diacritics present, no English CTA leftovers.
- `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: no horizontal overflow, no console errors, Audi image loaded and visible.

## Local QA Commands

`pnpm` was not available in the shell PATH, so equivalent local binaries were run with the bundled Codex Node runtime:

- `eslint .`: passed.
- `tsc --noEmit`: passed.
- `next build`: passed.
- `tsx scripts/audit-locales.ts`: passed.

## Result

Production QA passed.

No launch blockers were found for the Audi A4 B7 customer result.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- No new customer result was published in this pass.
