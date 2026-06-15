# Customer Results Listing Cleanup Report

Date: 2026-06-15
Branch: `feature/publish-bmw-x3-result`
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3

## Summary

The public Results section is now treated as a real NoordTune portfolio area instead of a mixed demo/example section.

Public result listings now show only real published and indexable customer results. At this moment that means:

- BMW X3 E83 2.0d Stage 1

Demo/example data remains in `src/content/customer-results.ts` for development/reference, but it is no longer rendered publicly, is not indexable and does not appear in the sitemap.

## BMW X3 Image Placement Result

BMW X3 image:

```text
public/images/results/bmw-x3-e83-20d-stage-1.webp
```

Open Graph image:

```text
public/images/results/bmw-x3-e83-20d-stage-1-og.webp
```

Confirmed placement:

- `/nl/resultaten` listing card
- `/en/results` listing card
- `/pl/rezultaty` listing card
- `/nl/resultaten/bmw-x3-e83-20d-stage-1` detail page
- `/en/results/bmw-x3-e83-20d-stage-1` detail page
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` detail page
- Open Graph metadata

Rendering changes:

- listing card uses a taller customer-result thumbnail area
- real customer result image uses `object-contain` to preserve the promotional graphic
- detail page keeps the image as the hero background
- detail page also includes a prominent full project visual panel with `object-contain`
- mobile Polish detail page has no horizontal overflow

## Demo Cards Hidden From Public Listings

Hidden from public listing pages:

- BMW 330d
- Audi A4 2.0 TDI
- Volkswagen Golf GTI
- Mercedes C 220d

Rules now enforced by rendering:

- public listing pages use only public customer results
- demo data can remain in content data with `status: "demo"`
- demo detail routes still return `404`
- demo result slugs are not in sitemap
- demo cases are not presented as real customer cases

Public listing pages now show a future note:

- Dutch: `Meer klantresultaten worden binnenkort toegevoegd.`
- English: `More customer results will be added soon.`
- Polish: `Kolejne realizacje klientów zostaną dodane wkrótce.`

## Results Page Copy Update

The public results page copy was updated in Dutch, English and Polish.

New direction:

- Dutch: `Klantresultaten`
- English: `Customer results`
- Polish: `Realizacje klientów`

The page now explains that published cases are real selected NoordTune projects and that results vary by:

- vehicle condition
- software version
- fuel
- transmission
- ECU/TCU
- hardware
- maintenance and use

## Facebook / Manual Import Plan

Prepared architecture:

- `docs/FACEBOOK_RESULT_IMPORT_TEMPLATE.md`
- `docs/FACEBOOK_RESULT_IMPORT_PLAN.md`
- `data/facebook-result-import.example.json`
- `scripts/import-facebook-results.ts`

The importer is a dry-run/manual helper only.

It:

- reads a local JSON file
- validates required fields
- produces draft customer result objects
- defaults source to `facebook`
- defaults status to `draft`
- defaults indexable to `false`
- requires owner/admin approval before publication
- does not download Facebook images
- does not call Meta APIs
- does not require tokens
- does not write to `src/content/customer-results.ts`

Dry run tested:

```bash
tsx scripts/import-facebook-results.ts --input=data/facebook-result-import.example.json
```

Result: passed.

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

## Local Route QA

Local production server:

```text
http://127.0.0.1:3023
```

Listing pages:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

BMW X3 detail pages:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Demo detail pages:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

## Sitemap QA

Sitemap includes:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Sitemap excludes:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## CTA QA

Checked BMW X3 detail pages and result listing pages:

- all Power Catalog links point to `https://power.noordtune.nl/`
- all WhatsApp links point to `https://wa.me/31685759600`
- no local `/power` hrefs were found

## Language / Mobile QA

- Polish result page uses proper Polish diacritics.
- No English CTA leftovers were found on the Polish BMW X3 detail page.
- Mobile Polish detail page has no horizontal overflow.
- BMW X3 project visual remains readable on mobile.

## Remaining Owner Decisions

Before merging PR #3:

- owner should visually approve the BMW X3 listing card
- owner should visually approve the BMW X3 detail page
- owner should confirm visible license plate approval remains valid
- owner should confirm the result values and certificate wording are correct
- owner should approve indexable publication

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No full Facebook API sync was added.
- No file service was added.
- No production/domain settings were changed.
