# BMW X3 Branch QA Report

Date: 2026-06-15  
Branch tested: `feature/publish-bmw-x3-result`  
Commit tested: `cea7ecb` plus this QA documentation update  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3

## Summary

The BMW X3 E83 2.0d Stage 1 customer result branch is ready for owner manual review.

The branch publishes one real customer result in three locales:

- Dutch: `/nl/resultaten/bmw-x3-e83-20d-stage-1`
- English: `/en/results/bmw-x3-e83-20d-stage-1`
- Polish: `/pl/rezultaty/bmw-x3-e83-20d-stage-1`

Demo result detail pages remain hidden and return `404`.

## PR

PR URL:

```text
https://github.com/bartekkolek1098/noordtune-www/pull/3
```

PR title:

```text
Publish BMW X3 E83 2.0d Stage 1 customer result
```

The PR description includes:

- BMW X3 result routes in NL/EN/PL
- stock/tuned/gain values
- privacy decisions
- placeholder image note
- sitemap behavior
- QA results
- confirmation that `power.noordtune.nl` was not modified
- confirmation that no booking/Facebook/file-service implementation was added

## Preview / Local URL Tested

Vercel created a branch preview and reported deployment success:

```text
https://noordtune-www-git-feature-publ-786263-bartekkolek1098s-projects.vercel.app
```

However, direct automated access to that preview returned `401`, so the functional branch QA was completed locally as a production build.

Local production URL tested:

```text
http://127.0.0.1:3021
```

Local server command:

```bash
next start -H 127.0.0.1 -p 3021
```

## Routes Checked

BMW X3 customer result routes:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `200`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `200`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `200`

Result listing routes:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

Demo result detail routes:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

No other customer result detail pages became public.

## Content Result

Verified on the branch:

- Dutch title: `BMW X3 E83 2.0d Stage 1 chiptuning`
- English title: `BMW X3 E83 2.0d Stage 1 ECU remap`
- Polish title: `BMW X3 E83 2.0d Stage 1 — indywidualny remap ECU`

Stats are visible and localized:

- Dutch: `Origineel`, `Na tuning`, `Winst`
- English: `Stock`, `Tuned`, `Gain`
- Polish: `Seria`, `Po modyfikacji`, `Przyrost`

Values shown:

- Stock: 177 hp / 350 Nm
- Tuned: 214 hp / 420 Nm
- Gain: +37 hp / +70 Nm

Technical details shown:

- BMW X3 E83 2.0d
- N47
- Bosch EDC17
- Stage 1 / custom ECU remap
- vehicle-specific calibration
- certificate delivered to customer
- recommendations after tuning delivered to customer

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

## Privacy Result

Verified:

- no full VIN is rendered
- no VIN-like string is rendered
- no license plate is rendered
- no customer name is rendered
- no customer address is rendered
- no private contact data is rendered
- customer origin is broad country-level context only: Poland
- certificate number/file/reference is not exposed

Current content fields:

- `licensePlateVisible: false`
- `customerApproved: true`
- `certificateAvailable: true`
- `status: "published"`
- `indexable: true`

Owner should still manually approve the privacy decision before merge.

## Image Result

Current image:

```text
/images/sections/tuning-laptop-b2.webp
```

Image status:

- safe local placeholder
- no visible license plate
- no visible VIN
- no visible customer/person/private data
- no real BMW X3 owner photo included yet

Owner decision still needed:

- approve placeholder for first merge, or
- replace with owner-approved BMW X3 image before merge

If a real vehicle image is added later, license plates must be blurred or not visible.

## CTA Result

Power Catalog CTA:

- all checked BMW X3 pages and listing pages link to `https://power.noordtune.nl/`

WhatsApp CTA:

- all checked BMW X3 pages and listing pages link to `https://wa.me/31685759600`

No local `/power` links were found in the checked rendered pages.

## SEO Result

Verified on all three BMW X3 routes:

- localized metadata exists
- canonical URL exists
- Open Graph metadata exists
- Article JSON-LD exists
- vehicle-related JSON-LD `about` object exists through the customer result renderer

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

Build result:

- Next.js compiled successfully.
- Static generation completed: `75/75` pages.
- The three additional generated pages are the BMW X3 result pages in NL/EN/PL.

## Remaining Manual Owner Decisions

Before merge, owner should confirm:

- Dutch copy approved
- English copy approved
- Polish copy approved
- result values are correct
- certificate statement is correct
- privacy is acceptable
- placeholder image is acceptable or should be replaced first
- indexable publication is approved

## Merge Readiness

Branch status:

- ready for owner review
- safe to merge after owner approval
- not merged to `main`

Scope safety:

- `power.noordtune.nl` was not modified
- no booking implementation was added
- no Facebook API sync was added
- no file service was added
- no production/domain settings were changed
