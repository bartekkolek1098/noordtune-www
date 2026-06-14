# BMW X3 Customer Result Publication Report

Date: 2026-06-14  
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

Demo examples remain marked as:

- Dutch: `Indicatief voorbeeld`
- English: `Indicative example`
- Polish: `Przykład orientacyjny`

Demo result detail pages still return `404`.

## Image Status

No owner-approved BMW X3 vehicle photo was available in the repository for this publication pass.

Used safe local placeholder:

```text
/images/sections/tuning-laptop-b2.webp
```

Reason:

- local project asset
- no visible license plate
- no VIN
- no customer identity
- automotive tuning/logging context fits the result page

TODO before/after owner image approval:

- replace the placeholder with owner-approved BMW X3 photos
- confirm license plates are not visible or are blurred
- confirm no customer-identifying details are visible
- update alt text if a real approved image is added

## Privacy Decisions

Published:

- vehicle make/model/generation
- engine family
- ECU type
- stock/tuned/gain figures
- customer origin as broad country-level context: Poland
- certificate and recommendations were delivered

Not published:

- full VIN
- license plate
- customer name
- customer address
- private contact data
- certificate file or certificate number

Safety fields:

- `licensePlateVisible: false`
- `customerApproved: true`
- `certificateAvailable: true`
- `status: "published"`
- `indexable: true`

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
- demo cards remain labelled as indicative examples
- demo detail routes still return `404`
- sitemap includes BMW X3 routes
- sitemap excludes demo result routes
- Power Catalog links point to `https://power.noordtune.nl/`
- WhatsApp links point to `https://wa.me/31685759600`
- Polish text uses proper diacritics
- source scan found no VIN-like data

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file service was added.
- No production/domain settings were changed.
- No demo result was converted into a real customer case.
- No customer name, license plate or full VIN was published.

## Recommendation

Open a PR from `feature/publish-bmw-x3-result` to `main` for owner review.

Before merging, the owner should manually review:

- public copy in Dutch, English and Polish
- placeholder image acceptability
- privacy and approval assumptions
- whether to replace the placeholder with an owner-approved BMW X3 photo
