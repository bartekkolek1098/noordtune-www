# BMW X3 Production QA Report

Date: 2026-06-15  
Production URL: https://www.noordtune.nl  
Repository: `bartekkolek1098/noordtune-www`  
Main commit tested locally: `2668253a2eb64b2114d6b6dba2d715125139438c`

## Summary

Production QA passed after publishing the BMW X3 E83 2.0d Stage 1 customer result.

No production blockers were found.

## Production Routes Tested

Result listing pages:

- `https://www.noordtune.nl/nl/resultaten` -> `200`
- `https://www.noordtune.nl/en/results` -> `200`
- `https://www.noordtune.nl/pl/rezultaty` -> `200`

BMW X3 detail pages:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Demo detail routes:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

## Listing QA

Verified on NL/EN/PL public result listings:

- BMW X3 appears as the only real customer result.
- BMW X3 card uses `/images/results/bmw-x3-e83-20d-stage-1.webp`.
- Demo/example cards are hidden from public listings.
- Demo labels are not rendered publicly.

Localized customer result labels verified:

- Dutch: `Klantresultaat`
- English: `Customer result`
- Polish: `Realizacja klienta`

## BMW X3 Detail Image QA

Verified on all three BMW X3 detail pages:

- BMW X3 main image path is present in rendered HTML.
- BMW X3 image loads successfully in the browser.
- BMW X3 image is visible in the detail page hero/background treatment.
- BMW X3 image is visible in the main project visual panel.
- No BMW X3 image request returned a `4xx`.
- The previous invalid `q=92` optimizer request is not present.
- No console errors related to the BMW X3 image were detected.

Open Graph image verified:

```text
https://www.noordtune.nl/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

## Privacy QA

Verified:

- no full VIN is exposed
- no customer name is exposed
- no customer address is exposed
- no private contact data is exposed
- no certificate number or private document reference is exposed
- visible license plate appears only inside the owner-approved BMW X3 marketing graphic

Notes:

- The page publicly states that a certificate was available/delivered to the customer.
- No certificate number, file identifier or private document reference is rendered.

## Result Data QA

Verified public BMW X3 result stats:

- Stock: `177 hp / 350 Nm`
- Tuned: `214 hp / 420 Nm`
- Gain: `+37 hp / +70 Nm`

Localized unit rendering is correct:

- Dutch uses `pk`
- English uses `hp`
- Polish uses `KM`

## CTA QA

Power Catalog links on checked production pages point to:

```text
https://power.noordtune.nl/
```

WhatsApp links on checked production pages point to:

```text
https://wa.me/31685759600
```

## Mobile QA

Mobile QA was run against the Polish BMW X3 detail page at a `390px` viewport width.

Verified:

- BMW X3 image loads on mobile.
- BMW X3 image is visible in the hero/background and main project visual panel.
- No horizontal overflow was detected.
- Polish text contains proper Polish diacritics.
- No English CTA leftovers were found on the Polish BMW X3 page.

## Sitemap QA

Production sitemap:

```text
https://www.noordtune.nl/sitemap.xml
```

Sitemap includes:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Sitemap excludes demo result detail routes:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## Local QA Command Results

`pnpm` was not available in the shell PATH, so equivalent local project binaries were run through the bundled Node runtime and `node_modules/.bin`.

Commands run from latest `main`:

```bash
eslint .
tsc --noEmit
next build
tsx scripts/audit-locales.ts
```

Results:

- Lint: passed
- Typecheck: passed
- Build: passed
- Content audit: passed

Build result:

- Next.js compiled successfully.
- Static generation completed: `75/75` pages.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was implemented.
- No file service was implemented.
- No production/domain settings were changed.
- No other customer result detail pages were published.
- Demo examples remain hidden from public listings and detail routes.

## Recommendation

The BMW X3 customer result is clean in production. No hotfix is needed.
