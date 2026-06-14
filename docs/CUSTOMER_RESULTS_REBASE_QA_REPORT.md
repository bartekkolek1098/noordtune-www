# Customer Results MVP Rebase QA Report

Date: 2026-06-14  
Branch: `feature/customer-results-mvp`  
Base merged in: `origin/main` at `a2c96d3`  
Branch pre-merge head: `3d04c7b`

## Summary

`feature/customer-results-mvp` was updated with the latest `main` after the content-growth merge.

The branch remains safe as a future merge candidate:

- Customer result listing pages are public.
- Customer result detail pages remain unpublished.
- Public/indexable customer result page count is `0`.
- BMW X3 E83 2.0d Stage 1 remains draft, non-public and non-indexable.
- Demo result cards remain visible only as indicative examples.
- Draft brand pages and draft article topics from content-growth remain hidden.
- No booking, Facebook API sync, file service or Power Catalog implementation was added.
- The existing `power.noordtune.nl` app was not modified.

## Merge Result

Merge command:

```bash
git merge origin/main
```

Result: merge completed after resolving one conflict.

## Conflicts Found And Resolved

One conflict was found:

- `src/content/customer-results.ts`

Resolution:

- Kept the richer Customer Results MVP model from the branch.
- Kept `CustomerResultStatus = "published" | "draft" | "demo"`.
- Kept `indexable: boolean` as a required safety field.
- Kept public-route guards based on `status === "published"` and `indexable === true`.
- Added content-growth draft metadata fields:
  - `certificateNote`
  - `draftNotes`
  - `localizedDraftDescriptions`
- Removed a duplicated Dutch BMW X3 draft entry created by the merge conflict.
- Kept the BMW X3 E83 2.0d Stage 1 case as draft, non-public and non-indexable.
- Kept content-growth draft brand pages and draft article structures from main.

Conflict marker check:

```bash
rg -n '<<<<<<<|=======|>>>>>>>' src/content/customer-results.ts
```

Result: no conflict markers remain.

## Files Changed By The Merge

Main content-growth files now present on the branch:

- `docs/CONTENT_ARCHITECTURE_RESULTS_AND_SOCIAL.md`
- `docs/CONTENT_GROWTH_AUDIT.md`
- `docs/CONTENT_GROWTH_BRANCH_QA_REPORT.md`
- `docs/CONTENT_GROWTH_MERGE_REPORT.md`
- `docs/FACEBOOK_SYNC_PLAN.md`
- `docs/INTERNAL_LINKING_PLAN.md`
- `docs/OWNER_POST_LAUNCH_CHECKLIST.md`
- `docs/POST_LAUNCH_SEO_SETUP.md`
- `docs/POST_MERGE_PRODUCTION_QA_REPORT.md`
- `docs/PRODUCTION_LAUNCH_QA_REPORT.md`
- `scripts/audit-locales.ts`
- `src/components/blog-article-renderer.tsx`
- `src/content/content-growth-drafts.ts`
- `src/content/customer-results.ts`

This report was added:

- `docs/CUSTOMER_RESULTS_REBASE_QA_REPORT.md`

## QA Command Results

`pnpm` was not available in the shell PATH, so the equivalent local binaries were run through the bundled Node runtime and project `node_modules/.bin`.

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

Build output summary:

- Next.js compiled successfully.
- Static generation completed: `72/72` pages.
- App routes generated for locale pages, SEO pages, blog articles, sitemap and robots.

## Customer Result Route Safety

Checked against local production server:

```bash
next start -H 127.0.0.1 -p 3017
```

Listing pages:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

Demo detail routes:

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

BMW X3 draft detail routes:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`

Customer result static params:

```json
{
  "publicResultPageCount": 0,
  "totalCustomerResults": 15,
  "draftCount": 3,
  "demoCount": 12,
  "publishedCount": 0
}
```

## Sitemap Result

`/sitemap.xml` was checked locally.

Sitemap excludes:

- `bmw-x3-e83-20d-stage-1`
- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`
- `bmw-chiptuning`
- `audi-chiptuning`
- `volkswagen-chiptuning`
- `mercedes-chiptuning`
- `wat-is-ecu-remap`
- `chiptuning-met-automaat`
- `wanneer-is-stage-2`
- `waarom-loganalyse-belangrijk-is-voor-tuning`
- `dsg-tcu-tuning-uitgelegd`
- `dpf-egr-of-adblue-storing-wat-nu`

Sitemap still includes:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`
- `/nl/blog/wat-is-chiptuning`
- `/nl/stage-1-tuning`
- `/nl/stage-2-tuning`

## Draft Safety Result

Draft brand pages remain hidden:

- `/nl/bmw-chiptuning` -> `404`
- `/nl/audi-chiptuning` -> `404`
- `/nl/volkswagen-chiptuning` -> `404`
- `/nl/mercedes-chiptuning` -> `404`

Draft article topics remain hidden:

- Dutch draft article routes -> `404`
- English draft article routes -> `404`
- Polish draft article routes -> `404`

Published articles still return `200` in Dutch, English and Polish.

## Link Safety

Checked listing pages:

- Power Catalog links point to `https://power.noordtune.nl/`
- WhatsApp links point to `https://wa.me/31685759600`
- No local `/power` links were found on result listing pages.
- Demo cards are marked as indicative examples in NL/EN/PL.

Source configuration remains:

- `site.catalogUrl`: `https://power.noordtune.nl/`
- `site.whatsappUrl`: `https://wa.me/31685759600`

## Production Safety

Confirmed:

- No production/domain settings changed.
- No booking implementation added.
- No Facebook API sync added.
- No file service added.
- No local Power Catalog implementation added.
- No customer result detail pages are public.
- BMW X3 remains draft and non-indexable.

## Recommendation

The branch is safe to keep as an updated merge candidate for later owner review.

Do not merge to `main` until the owner explicitly approves publishing the Customer Results MVP behavior. BMW X3 should remain draft until images, customer approval, rights, final technical notes and certificate references are confirmed.
