# Customer Results MVP Merge Report

Date: 2026-06-14  
Repository: `bartekkolek1098/noordtune-www`  
Merged branch: `feature/customer-results-mvp`  
Target branch: `main`

## PR

PR URL: https://github.com/bartekkolek1098/noordtune-www/pull/2

Merge method: squash merge.

Main merge commit:

```text
ea32943 Merge customer results MVP architecture
```

The feature branch was not deleted. Keep it available until post-merge production QA is fully accepted.

## Scope Merged

The merge adds the safe Customer Results MVP architecture:

- structured customer result content model
- demo customer result cards on listing pages
- future-ready localized customer result detail routing
- route guards so detail pages only render when `status === "published"` and `indexable === true`
- Customer Result JSON-LD helpers for future published cases
- stronger results-page copy and disclaimers
- BMW X3 E83 2.0d Stage 1 prepared as a draft only
- content audit checks for draft/demo safety

Not included:

- no published customer result detail pages
- no BMW X3 publication
- no booking implementation
- no Facebook API sync
- no file service
- no production/domain setting changes
- no changes to `power.noordtune.nl`

## QA Results

`pnpm` was not available in the local shell PATH, so equivalent local project binaries were run through the bundled Node runtime and `node_modules/.bin`.

Commands run on `main` after merge:

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
- Static generation completed: `72/72` pages.
- Sitemap and robots routes generated.

## Customer Result Public / Indexable Count

Local content safety check:

```json
{
  "publicResultPageCount": 0,
  "totalCustomerResults": 15,
  "draftCount": 3,
  "demoCount": 12,
  "publishedCount": 0
}
```

Result: no customer result detail pages are public or indexable.

## Route Verification

Checked locally with production server:

```bash
next start -H 127.0.0.1 -p 3018
```

Listing pages:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

BMW X3 draft pages:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`

Demo detail pages:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`
- `/en/results/bmw-330d-stage-1` -> `404`
- `/en/results/audi-a4-20-tdi-stage-1` -> `404`
- `/en/results/volkswagen-golf-gti-stage-1` -> `404`
- `/en/results/mercedes-c-220d-stage-1` -> `404`
- `/pl/rezultaty/bmw-330d-stage-1` -> `404`
- `/pl/rezultaty/audi-a4-20-tdi-stage-1` -> `404`
- `/pl/rezultaty/volkswagen-golf-gti-stage-1` -> `404`
- `/pl/rezultaty/mercedes-c-220d-stage-1` -> `404`

Main website `/power` route:

- `/power` -> `404`

## Sitemap Result

`/sitemap.xml` was checked locally after merge.

Sitemap includes:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`

Sitemap excludes:

- `bmw-x3-e83-20d-stage-1`
- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

Result: draft and demo customer result detail routes are not exposed in sitemap.

## BMW X3 Draft Safety

BMW X3 E83 2.0d Stage 1 remains:

- `status: "draft"`
- `indexable: false`
- non-public
- not in sitemap
- not linked as a public detail page

Known draft data remains prepared for later owner approval:

- BMW X3 E83 2.0d
- N47
- Bosch EDC17
- Stage 1
- 177 hp / 350 Nm stock
- 214 hp / 420 Nm tuned
- +37 hp / +70 Nm
- certificate noted as available according to owner

Do not publish until image rights, customer approval, final text and certificate reference are confirmed.

## Demo Result Safety

Demo result cards remain visible on listing pages as indicative examples only.

They are clearly marked in each language:

- Dutch: `Indicatief voorbeeld`
- English: `Indicative example`
- Polish: `Przykład orientacyjny`

Demo result detail pages return `404`.

## Link Safety

Checked result listing pages:

- Power Catalog links point to `https://power.noordtune.nl/`
- WhatsApp links point to `https://wa.me/31685759600`
- no local `/power` links were found

Configured values remain:

- `site.catalogUrl`: `https://power.noordtune.nl/`
- `site.whatsappUrl`: `https://wa.me/31685759600`

## Vercel Deployment

GitHub commit status for merge commit `ea32943`:

```text
Vercel: success
Deployment has completed
```

Deployment target:

```text
https://vercel.com/bartekkolek1098s-projects/noordtune-www/4Eb1ZjXYhXgc8sYqgsrxFV5hiEPk
```

## Confirmation

- `power.noordtune.nl` was not modified.
- No booking logic was implemented.
- No Facebook API sync was implemented.
- No file service was implemented.
- No customer result detail pages were published.
- No demo result was converted into a real customer case.
- No production/domain settings were changed.

## Recommendation

The Customer Results MVP architecture is safely merged into `main`.

Proceed with post-merge production QA before deleting the feature branch or publishing any real customer result.
