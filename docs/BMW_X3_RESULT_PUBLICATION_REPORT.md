# BMW X3 Customer Result Publication Report

Date: 2026-06-15
Branch: `feature/publish-bmw-x3-result`  
Repository: `bartekkolek1098/noordtune-www`

## Summary

Prepared the first real public customer result page for:

```text
BMW X3 E83 2.0d Stage 1
```

The BMW X3 case is now public and indexable on this feature branch only. It has not been merged to `main`.

## Result Data Used

- Vehicle: BMW X3 E83 2.0d
- Engine: N47
- ECU: Bosch EDC17
- Service: Stage 1 / custom ECU remap
- Stock: 177 hp / 350 Nm
- Tuned: 214 hp / 420 Nm
- Gain: +37 hp / +70 Nm
- Certificate: delivered to customer
- Customer origin: Poland
- Calibration: individual, vehicle-specific software calibration
- Recommendations after tuning: delivered to customer

## Published Routes On Branch

Dutch:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1`

English:

- `/en/results/bmw-x3-e83-20d-stage-1`

Polish:

- `/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Local route verification:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

## Localized Content

Titles:

- Dutch: `BMW X3 E83 2.0d Stage 1 chiptuning`
- English: `BMW X3 E83 2.0d Stage 1 ECU remap`
- Polish: `BMW X3 E83 2.0d Stage 1 — indywidualny remap ECU`

Stats labels:

- Dutch: `Origineel`, `Na tuning`, `Winst`
- English: `Stock`, `Tuned`, `Gain`
- Polish: `Seria`, `Po modyfikacji`, `Przyrost`

CTA labels:

- Dutch Power Catalog: `Controleer jouw auto in de Power Catalog`
- English Power Catalog: `Check your vehicle in the Power Catalog`
- Polish Power Catalog: `Sprawdź swoje auto w katalogu mocy`
- Dutch WhatsApp: `Stuur je kenteken of motorgegevens via WhatsApp`
- English WhatsApp: `Send us your vehicle details on WhatsApp`
- Polish WhatsApp: `Wyślij nam dane auta przez WhatsApp`

CTA URLs:

- Power Catalog: `https://power.noordtune.nl/`
- WhatsApp: `https://wa.me/31685759600`

## Listing Page Behavior

Updated result listings:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`

BMW X3 now appears as a real customer result:

- Dutch label: `Klantresultaat`
- English label: `Customer result`
- Polish label: `Realizacja klienta`

Demo/example result cards are no longer rendered in public listings. The demo data remains available for development/reference only.

Demo result detail pages still return `404` and are not included in the sitemap.

Future note shown below the public BMW X3 card:

- Dutch: `Meer klantresultaten worden binnenkort toegevoegd.`
- English: `More customer results will be added soon.`
- Polish: `Kolejne realizacje klientów zostaną dodane wkrótce.`

## Image Status

The owner-provided BMW X3 E83 Stage 1 promotional graphic is now used as the primary customer result visual.

Source image:

```text
/Users/bartk/Pictures/Photos Library.photoslibrary/resources/derivatives/9/91159539-EA0A-49A1-AA22-43B2FC8A84DE_1_105_c.jpeg
```

Website image:

```text
/images/results/bmw-x3-e83-20d-stage-1.webp
```

Open Graph / social preview image:

```text
/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

Image notes:

- owner-provided marketing graphic for this BMW X3 case
- visible license plate is intentionally owner-approved for this promotional graphic
- no full VIN is shown
- no customer name is shown
- no customer address is shown
- no private contact data is shown
- no certificate number or private document reference is shown
- WebP optimized for the website and social preview

Remaining owner review item:

- final visual approval of the promotional graphic on desktop, mobile and social preview

## Privacy Decisions

Published:

- vehicle make/model/generation
- engine family
- ECU type
- stock/tuned/gain figures
- customer origin as broad country-level context: Poland
- certificate and recommendations were delivered
- owner-approved promotional graphic with visible license plate

Not published:

- full VIN
- customer name
- customer address
- private contact data
- certificate file or certificate number

Safety fields:

- `licensePlateVisible: true`
- `customerApproved: true`
- `certificateAvailable: true`
- `status: "published"`
- `indexable: true`

The visible license plate appears only inside the owner-approved BMW X3 promotional graphic. It is not published as structured text data.

## Sitemap Result

Local sitemap includes:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Local sitemap excludes demo result detail routes:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## SEO Result

Implemented through existing customer-result route architecture:

- canonical URL
- localized metadata
- Open Graph metadata
- Twitter summary image metadata
- Article JSON-LD
- Vehicle-related JSON-LD `about` object

The page remains indexable only because:

- `status === "published"`
- `indexable === true`
- `customerApproved === true`

## QA Results

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
- The three additional static pages are the BMW X3 result pages in NL/EN/PL.

Local production server checks:

- BMW X3 public routes return `200`
- result listing pages return `200`
- BMW X3 listing cards link to the public detail pages
- BMW X3 cards are labelled as customer results
- demo/example cards are hidden from public listings
- demo detail routes still return `404`
- sitemap includes BMW X3 routes
- sitemap excludes demo result routes
- Power Catalog links point to `https://power.noordtune.nl/`
- WhatsApp links point to `https://wa.me/31685759600`
- Polish text uses proper diacritics
- source scan found no VIN-like data in website text/data
- visible license plate was intentionally left in the owner-approved marketing graphic

## Detail Image Render Fix

The BMW X3 detail image rendering was rechecked after a broken-image report.

Root cause:

- the direct public BMW X3 assets were present and returned `200`
- the detail project visual requested the image through the Next image optimizer with `q=92`
- the project image configuration allows `78`, `82` and `90`
- the optimizer URL with `q=92` returned `400` on the local production server

Fix:

- normalized customer result image paths through shared helpers
- used the BMW X3 page image consistently for listing and detail rendering
- used the BMW X3 OG image consistently for metadata
- changed the detail project visual to an allowed/direct-safe image render
- kept the project visual panel responsive and non-collapsing on mobile

Rechecked locally at:

```text
http://127.0.0.1:3024
```

Verified:

- listing card shows `/images/results/bmw-x3-e83-20d-stage-1.webp`
- detail page hero/background uses `/images/results/bmw-x3-e83-20d-stage-1.webp`
- detail page project visual uses `/images/results/bmw-x3-e83-20d-stage-1.webp`
- Open Graph metadata uses `/images/results/bmw-x3-e83-20d-stage-1-og.webp`
- BMW X3 pages no longer render `q=92`
- no console errors were found during screenshot QA
- no horizontal overflow was found during screenshot QA

Screenshot QA files:

- `docs/qa-screenshots/bmw-x3-image-fix/desktop-nl-listing.png`
- `docs/qa-screenshots/bmw-x3-image-fix/desktop-nl-detail.png`
- `docs/qa-screenshots/bmw-x3-image-fix/mobile-pl-detail.png`

Note: `docs/qa-screenshots/` is ignored by `.gitignore`, so these screenshots are local QA artifacts unless deliberately force-added.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file service was added.
- No production/domain settings were changed.
- No demo result was converted into a real customer case.
- No customer name, full VIN, address, private contact data, certificate number or private document reference was published.
- The visible license plate in the BMW X3 promotional graphic is owner-approved for this case.

## Recommendation

Open a PR from `feature/publish-bmw-x3-result` to `main` for owner review.

Before merging, the owner should manually review:

- public copy in Dutch, English and Polish
- final visual approval of the owner-provided BMW X3 promotional graphic
- privacy and approval assumptions
- whether to keep this graphic as-is for merge
