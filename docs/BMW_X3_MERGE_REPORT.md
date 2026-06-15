# BMW X3 Customer Result Merge Report

Date: 2026-06-15  
Repository: `bartekkolek1098/noordtune-www`  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3  
Source branch: `feature/publish-bmw-x3-result`  
Target branch: `main`

## Merge Result

PR #3 was squash merged into `main`.

Main merge commit:

```text
70ff57a08bb4db95b3ce0baa3614e3ef8c3819ce
```

Squash commit title:

```text
Publish BMW X3 E83 2.0d Stage 1 customer result
```

The source branch was not deleted.

## Approved Publication Scope

The owner approved publishing the BMW X3 E83 2.0d Stage 1 customer result as indexable content.

Approved result data:

- BMW X3 E83 2.0d
- N47
- Bosch EDC17
- Stage 1 / custom ECU remap
- 177 hp / 350 Nm stock
- 214 hp / 420 Nm tuned
- +37 hp / +70 Nm
- certificate delivered to customer

Approved privacy state:

- no full VIN
- no customer name
- no customer address
- no private contact data
- no certificate number or private document reference
- visible plate appears only inside the owner-approved marketing graphic

## QA Command Results

`pnpm` was not available in the shell PATH, so equivalent local project binaries were run through the bundled Node runtime and `node_modules/.bin`.

Commands run on fresh `main` after the merge:

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

## Local Route QA

Local production server:

```text
http://127.0.0.1:3025
```

Result listing routes:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

BMW X3 detail routes:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Demo detail routes remain hidden:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

`/power` on the main website remains `404`.

## Listing Result

The BMW X3 appears on public listing pages as the only real customer result.

Localized labels verified:

- Dutch: `Klantresultaat`
- English: `Customer result`
- Polish: `Realizacja klienta`

Demo/example cards are hidden from public listings.

## BMW X3 Image Result

Verified locally after merge:

- listing card includes `/images/results/bmw-x3-e83-20d-stage-1.webp`
- detail hero/background includes `/images/results/bmw-x3-e83-20d-stage-1.webp`
- detail project visual includes `/images/results/bmw-x3-e83-20d-stage-1.webp`
- Open Graph metadata includes `/images/results/bmw-x3-e83-20d-stage-1-og.webp`
- BMW X3 pages do not include the invalid `q=92` image optimizer request

## Sitemap Result

Local sitemap includes:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `/en/results/bmw-x3-e83-20d-stage-1`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Local sitemap excludes demo result detail routes:

- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

## CTA Result

Power Catalog links still point to:

```text
https://power.noordtune.nl/
```

WhatsApp links still point to:

```text
https://wa.me/31685759600
```

## Deployment Status

GitHub deployments show Vercel created a production deployment for merge commit `70ff57a08bb4db95b3ce0baa3614e3ef8c3819ce`.

Deployment result:

```text
Production deployment: success
Target URL: https://noordtune-pjt41k0gm-bartekkolek1098s-projects.vercel.app
```

The production domain remains managed separately by Vercel. No domain or DNS settings were changed in this pass.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was implemented.
- No file service was implemented.
- No production/domain settings were changed.
- No other customer result detail pages were published.
- Demo examples were not converted into real customer cases.

## Recommendation

The BMW X3 customer result merge is clean. Proceed with production spot-checking the live public URLs after Vercel finishes serving the latest deployment on `https://www.noordtune.nl`.
