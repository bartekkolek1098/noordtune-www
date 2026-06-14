# Content Growth Merge Report

Date: `2026-06-14`  
PR: `#1`  
Merged branch: `feature/content-growth-seo` -> `main`  
Repository: `bartekkolek1098/noordtune-www`

## Merge Result

PR `#1` was approved by the owner and merged into `main` with a squash merge.

Main merge commit:

- `432b9127fbd5134a26796cd0f7b917a69509f870`

PR state after merge:

- `MERGED`

The source branch was not deleted. It should remain available until post-merge production QA is complete.

## Scope Confirmed

The merge added content-growth preparation only:

- draft brand SEO content
- draft article topic structures
- content growth audit
- internal linking plan
- improved article CTA wording
- BMW X3 E83 2.0d Stage 1 customer-result draft
- branch QA report

No production feature logic was added.

## QA Results

`pnpm` was unavailable in the local shell (`pnpm: command not found`), so the equivalent package-script commands were run with the local Node runtime.

Post-merge checks on `main`:

- `eslint .` -> passed
- `tsc --noEmit` -> passed
- `next build` -> passed
- `tsx scripts/audit-locales.ts` -> passed

Build result:

- Next.js build completed successfully
- static page generation remained `72` pages
- no new public route files were added

## Sitemap Result

Local production server check:

- `/sitemap.xml` returned `200`
- sitemap URL count: `66`
- existing published blog articles remain included
- existing Dutch SEO landing pages remain included

Confirmed not included in sitemap:

- `bmw-chiptuning`
- `audi-chiptuning`
- `volkswagen-chiptuning`
- `mercedes-chiptuning`
- draft article topics such as `wat-is-ecu-remap`, `chiptuning-met-automaat`, `dsg-tcu-tuning-uitgelegd`
- BMW X3 draft slug `bmw-x3-e83-20d-stage-1`

## Draft Safety Result

Brand draft routes remain hidden:

- `/nl/bmw-chiptuning` -> `404`
- `/nl/audi-chiptuning` -> `404`
- `/nl/volkswagen-chiptuning` -> `404`
- `/nl/mercedes-chiptuning` -> `404`

Draft article routes remain hidden:

- `18` prepared draft article routes checked
- all returned `404`
- none are in sitemap
- none are included in blog static params

BMW X3 result remains hidden:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`
- draft entries are `status: "draft"`
- draft entries are `indexable: false`
- `customerApproved: false`
- not returned by `publishedCustomerResults`

## Published Article Result

All currently published article routes still returned `200` locally.

Published article checks confirmed:

- metadata still exists
- JSON-LD still exists
- Power Catalog CTA exists
- WhatsApp CTA exists
- Polish content still contains proper diacritics

## Link Safety

Confirmed:

- Power Catalog links still point to `https://power.noordtune.nl/`
- WhatsApp links still point to `https://wa.me/31685759600`
- no local `/power` route was created
- no draft content is linked from public navigation, footer, blog index or published articles

## Production Safety

Confirmed:

- `power.noordtune.nl` was not modified
- no booking implementation was added
- no Facebook API sync was added
- no file service was added
- no production/domain settings were changed
- no `next.config.ts` changes were made by this merge

## Vercel Deployment

GitHub commit status for merge commit `432b9127fbd5134a26796cd0f7b917a69509f870` reported:

- context: `Vercel`
- state: `success`
- description: `Deployment has completed`

This confirms Vercel production deployment started automatically after the merge and completed successfully for the merge commit.

This documentation commit may trigger another doc-only Vercel deployment after it is pushed to `main`.

## Recommendation

The merge is technically clean.

Before publishing any prepared growth content later, manually review:

- draft brand page quality
- draft article depth
- BMW X3 image rights and customer approval
- Search Console data after initial indexing

Do not publish draft brand pages, draft articles or the BMW X3 result until explicitly approved.
