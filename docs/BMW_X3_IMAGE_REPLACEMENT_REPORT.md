# BMW X3 Image Replacement Report

Date: 2026-06-15  
Branch: `feature/publish-bmw-x3-result`  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3

## Summary

The BMW X3 E83 2.0d Stage 1 customer result now uses the owner-provided NoordTune promotional graphic instead of the temporary tuning laptop placeholder.

The visible license plate remains in the image because the owner explicitly approved this promotional graphic for marketing use. The plate is not published as structured text data.

## Source Image Used

```text
/Users/bartk/Pictures/Photos Library.photoslibrary/resources/derivatives/9/91159539-EA0A-49A1-AA22-43B2FC8A84DE_1_105_c.jpeg
```

Original source properties:

- JPEG
- 1024 x 768
- owner-provided BMW X3 E83 Stage 1 promotional graphic

## Final Asset Paths

Website image:

```text
public/images/results/bmw-x3-e83-20d-stage-1.webp
```

Public URL:

```text
/images/results/bmw-x3-e83-20d-stage-1.webp
```

Open Graph / social preview image:

```text
public/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

Public URL:

```text
/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

## Optimization Notes

- Main WebP: 1024 x 768, about 140 KB
- Open Graph WebP: 1200 x 630, about 112 KB
- Metadata was stripped during WebP export.
- The graphic was not redesigned, blurred or materially altered.
- The license plate remains visible as part of the owner-approved marketing graphic.

## Content Updates

Updated `src/content/customer-results.ts`:

- replaced `/images/sections/tuning-laptop-b2.webp`
- added `/images/results/bmw-x3-e83-20d-stage-1.webp`
- added `/images/results/bmw-x3-e83-20d-stage-1-og.webp`
- set `licensePlateVisible: true`
- kept `customerApproved: true`
- kept `certificateAvailable: true`
- kept `status: "published"`
- kept `indexable: true`

Localized alt text:

- Dutch: `BMW X3 E83 2.0d Stage 1 chiptuning resultaat bij NoordTune.nl`
- English: `BMW X3 E83 2.0d Stage 1 ECU remap result at NoordTune.nl`
- Polish: `BMW X3 E83 2.0d Stage 1 — wynik indywidualnego remapu ECU w NoordTune.nl`

Updated `src/lib/seo.tsx`:

- customer result metadata now prefers `result.ogImage` for Open Graph and Twitter preview images.

## Privacy QA Result

Confirmed:

- no full VIN is published
- no customer name is published
- no customer address is published
- no private contact data is published
- no certificate number is published
- no private document reference is published
- visible license plate appears only inside the owner-approved BMW X3 promotional graphic
- source/text scan found no VIN-like string in website text/data
- WebP `strings` scan did not expose readable private metadata

## Route QA Result

Local production server:

```text
http://127.0.0.1:3022
```

BMW X3 routes:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Result listings:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

Listing labels:

- Dutch BMW X3: `Klantresultaat`
- English BMW X3: `Customer result`
- Polish BMW X3: `Realizacja klienta`
- Dutch demo cards: `Indicatief voorbeeld`
- English demo cards: `Indicative example`
- Polish demo cards: `Przykład orientacyjny`

Demo detail routes remain hidden:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

## Sitemap QA Result

Local sitemap includes:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Local sitemap excludes demo detail routes:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## CTA QA Result

Checked BMW X3 detail pages and result listing pages:

- all Power Catalog links point to `https://power.noordtune.nl/`
- all WhatsApp links point to `https://wa.me/31685759600`
- no local `/power` hrefs were found

## Build QA Result

`pnpm` was not available in the shell PATH, so equivalent local project binaries were run through the bundled Node runtime and `node_modules/.bin`.

Commands run:

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

Build summary:

- Next.js compiled successfully.
- Static generation completed: `75/75` pages.

## Screenshot QA

Generated:

- `docs/qa-screenshots/bmw-x3/desktop-nl-result.png`
- `docs/qa-screenshots/bmw-x3/mobile-pl-result.png`
- `docs/qa-screenshots/bmw-x3/desktop-nl-listing.png`

Note: `docs/qa-screenshots/` is ignored by `.gitignore`, so these screenshots are local QA artifacts unless deliberately force-added.

Visual review:

- desktop Dutch result page displays the BMW X3 graphic as the hero background
- mobile Polish result page remains readable and vertically stacked
- results listing shows BMW X3 as a real customer result
- demo cards remain clearly marked as indicative examples

## Remaining Owner Review Items

Before merging PR #3, owner should confirm:

- the BMW X3 graphic is visually approved on desktop
- the BMW X3 graphic is visually approved on mobile
- the visible license plate is approved for this specific marketing graphic
- all visible result values are correct
- indexable publication is still approved

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file service was added.
- No production/domain settings were changed.
