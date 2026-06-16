# Audi A4 B7 Production QA Report

## Scope

- Production URL: `https://www.noordtune.nl`
- QA date: 2026-06-16
- Main commit tested locally: `c8c91e9`
- Result checked: Audi A4 B7 2.0 TDI Stage 2+

This QA pass verifies the production publication of the Audi A4 B7 customer result after merge and Vercel deployment.

## Production Route Results

Live production route checks:

- `https://www.noordtune.nl/nl/resultaten`: 200
- `https://www.noordtune.nl/en/results`: 200
- `https://www.noordtune.nl/pl/rezultaty`: 200
- `https://www.noordtune.nl/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `https://www.noordtune.nl/en/results/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `https://www.noordtune.nl/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`: 200
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`: 200
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`: 200

Intentional hidden/demo checks:

- `https://www.noordtune.nl/nl/resultaten/bmw-330d-stage-1`: 404
- `https://www.noordtune.nl/nl/resultaten/audi-a4-20-tdi-stage-1`: 404
- `https://www.noordtune.nl/nl/resultaten/volkswagen-golf-gti-stage-1`: 404
- `https://www.noordtune.nl/nl/resultaten/mercedes-c-220d-stage-1`: 404
- `https://www.noordtune.nl/power`: 404

## Listing Result

Verified on Dutch, English and Polish listing pages:

- Audi A4 appears as a real customer result.
- BMW X3 still appears as a real customer result.
- Demo/example cards are hidden from public listings.
- Labels are localized:
  - Dutch: `Klantresultaat`
  - English: `Customer result`
  - Polish: `Realizacja klienta`

## Audi A4 Detail Result

Verified on all Audi A4 detail pages:

- Audi A4 detail pages return 200.
- Stats are correct:
  - 170 hp / 350 Nm
  - 235 hp / 470 Nm
  - +65 hp / +120 Nm
- Dutch stats use `pk`.
- English stats use `hp`.
- Polish stats use `KM`.
- ECU wording is correct:
  - Dutch: `Gecontroleerd tijdens service; niet publiek vermeld`
  - English: `Verified during service; not publicly listed`
  - Polish: `Zweryfikowane podczas usługi; niepodawane publicznie`

## Image And Open Graph Result

Verified:

- `https://www.noordtune.nl/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp`: 200, `image/webp`
- `https://www.noordtune.nl/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp`: 200, `image/webp`
- Audi A4 image appears in listing pages.
- Audi A4 image appears on detail pages.
- Audi A4 Open Graph metadata uses `/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp`.
- The visible license plate appears only inside the owner-approved marketing graphic.

## Privacy Result

Production HTML was checked for sensitive data.

Not exposed:

- Full VIN
- Customer name
- Customer address
- Private contact data
- Certificate number
- Private document reference

The visible license plate remains part of the approved promotional graphic only.

## Link Result

Verified on listing and detail pages:

- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.
- `/power` on the main website remains 404.

## Language Result

Verified:

- Polish pages use proper Polish diacritics.
- No English CTA text appears on the Polish Audi A4 page.
- HTML language attributes are correct on checked result pages.

## Mobile Result

Browser QA at 390x844 viewport:

- Listing pages have no horizontal overflow.
- Audi A4 detail pages have no horizontal overflow.
- Audi image renders visibly on mobile.
- No broken Audi image was detected.
- No console errors or page errors were detected on checked pages.

## Sitemap Result

Verified production sitemap:

Included:

- `https://www.noordtune.nl/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`
- `https://www.noordtune.nl/en/results/audi-a4-b7-20-tdi-stage-2-plus`
- `https://www.noordtune.nl/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`
- BMW X3 result routes in Dutch, English and Polish

Excluded:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## Local QA Commands

`pnpm` was not available in the shell PATH, so equivalent local binaries were run with the bundled Codex Node runtime.

- `eslint .`: passed
- `tsc --noEmit`: passed
- `next build`: passed
- `tsx scripts/audit-locales.ts`: passed

## Conclusion

Production QA passed.

No launch blockers were found. The Audi A4 B7 customer result is clean in production, BMW X3 still works, demo content remains hidden, sitemap behavior is correct, and mobile layout is stable.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
