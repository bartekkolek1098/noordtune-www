# BMW X3 Image Render Fix Report

Date: 2026-06-15  
Branch: `feature/publish-bmw-x3-result`  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3

## Summary

Fixed the BMW X3 customer result detail image rendering before final owner visual review.

The BMW X3 promotional graphic is now verified on:

- result listing cards
- BMW X3 detail page hero/background treatment
- BMW X3 detail page main project visual panel
- Open Graph metadata

## Root Cause

The image asset itself was present and the direct public URLs returned `200`.

The broken detail-page image was caused by the detail project visual requesting the BMW X3 image through the Next image optimizer with:

```text
q=92
```

The project `next.config.ts` allows image qualities:

```text
78, 82, 90
```

The local production server confirmed:

- direct asset URL -> `200`
- optimized URL with `q=92` -> `400`
- optimized URL with `q=90` -> `200`

## Fix

Implemented a small customer result image helper in `src/content/customer-results.ts` and used it consistently for:

- card thumbnail image
- detail page primary image
- Open Graph image

The detail hero/background now uses the normalized direct public image path as a CSS background image. The main project visual uses the same normalized path with a non-collapsing responsive image panel and an allowed image quality.

## Asset Paths Verified

Repository assets:

```text
public/images/results/bmw-x3-e83-20d-stage-1.webp
public/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

Public URLs verified locally:

```text
/images/results/bmw-x3-e83-20d-stage-1.webp -> 200 image/webp
/images/results/bmw-x3-e83-20d-stage-1-og.webp -> 200 image/webp
```

Expected page paths:

```text
/images/results/bmw-x3-e83-20d-stage-1.webp
/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

## Route QA

Local production server:

```text
http://127.0.0.1:3024
```

Routes verified:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`
- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Demo result detail routes verified as hidden:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

`/power` on the main site remains `404`.

## Visual QA

Playwright screenshot QA confirmed:

- listing card shows the BMW X3 image
- desktop Dutch detail page shows the BMW X3 image in the hero/background and project visual panel
- mobile Polish detail page shows the BMW X3 image in the hero/background and project visual panel
- image is loaded successfully
- no BMW X3 image requests returned `4xx`
- no console errors were detected
- no horizontal overflow was detected

Local screenshot paths:

```text
docs/qa-screenshots/bmw-x3-image-fix/desktop-nl-listing.png
docs/qa-screenshots/bmw-x3-image-fix/desktop-nl-detail.png
docs/qa-screenshots/bmw-x3-image-fix/mobile-pl-detail.png
```

Note: `docs/qa-screenshots/` is ignored by `.gitignore`; screenshots are local QA artifacts unless deliberately force-added.

## SEO / OG QA

Verified on all three BMW X3 detail routes:

- canonical URL exists
- Open Graph image uses `https://www.noordtune.nl/images/results/bmw-x3-e83-20d-stage-1-og.webp`
- Article JSON-LD exists
- vehicle-related JSON-LD exists
- LocalBusiness / AutoRepair JSON-LD exists

Sitemap result:

- BMW X3 NL/EN/PL result routes are included
- demo result detail routes are excluded

## CTA QA

Power Catalog links still point to:

```text
https://power.noordtune.nl/
```

WhatsApp links still point to:

```text
https://wa.me/31685759600
```

## QA Command Results

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

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file service was added.
- No production/domain settings were changed.
- No demo customer result was published.
- No other customer result detail page became public.

## Recommendation

PR #3 is ready again for final owner visual review after this image-render fix.
