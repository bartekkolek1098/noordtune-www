# Content Growth Branch QA Report

Date: `2026-06-14`  
Branch tested: `feature/content-growth-seo`  
Base branch: `origin/main`  
Repository: `bartekkolek1098/noordtune-www`

## Result

Status: safe to keep as a merge candidate after manual owner review.

No production/domain settings were changed. No booking implementation, Facebook API sync, file service or Power Catalog implementation was added. The existing `power.noordtune.nl` app was not modified.

## Changed Files Summary

Changed against `origin/main`:

- `docs/CONTENT_ARCHITECTURE_RESULTS_AND_SOCIAL.md`
- `docs/CONTENT_GROWTH_AUDIT.md`
- `docs/FACEBOOK_SYNC_PLAN.md`
- `docs/INTERNAL_LINKING_PLAN.md`
- `docs/OWNER_POST_LAUNCH_CHECKLIST.md`
- `docs/POST_LAUNCH_SEO_SETUP.md`
- `scripts/audit-locales.ts`
- `src/components/blog-article-renderer.tsx`
- `src/content/content-growth-drafts.ts`
- `src/content/customer-results.ts`

Added files:

- `docs/CONTENT_GROWTH_AUDIT.md`
- `docs/INTERNAL_LINKING_PLAN.md`
- `src/content/content-growth-drafts.ts`

## Public Route Changes

No public route files changed:

- no `src/app` changes
- no `src/app/sitemap.ts` changes
- no `src/app/robots.ts` changes
- no `src/content/site.ts` route changes
- no `next.config.ts` changes

Production build still generated `72` static pages, matching the previous public route shape.

## Sitemap Result

Local sitemap check:

- `/sitemap.xml` returned `200`
- sitemap URL count: `66`
- published blog articles remain included
- published Dutch SEO landing pages remain included
- draft brand pages are not included
- draft article topics are not included
- BMW X3 draft result is not included

Explicit sitemap exclusions confirmed:

- `bmw-chiptuning`
- `audi-chiptuning`
- `volkswagen-chiptuning`
- `mercedes-chiptuning`
- `wat-is-ecu-remap`
- `chiptuning-met-automaat`
- `dsg-tcu-tuning-uitgelegd`
- `bmw-x3-e83-20d-stage-1`

## Draft Brand Page Safety

Checked locally:

- `/nl/bmw-chiptuning` -> `404`
- `/nl/audi-chiptuning` -> `404`
- `/nl/volkswagen-chiptuning` -> `404`
- `/nl/mercedes-chiptuning` -> `404`

The new brand content lives in `src/content/content-growth-drafts.ts` and is not imported by renderers, navigation, footer, sitemap or route generation.

## Draft Article Safety

Prepared draft article count: `18`

Checked locally:

- all draft article routes returned `404`
- no draft article route appears in blog static params
- no draft article route appears in sitemap
- no draft article is linked from the blog index
- all draft article entries use `status: "draft"`

## Existing Published Article Route Result

All published article routes returned `200` locally:

Dutch:

- `/nl/blog/wat-is-chiptuning`
- `/nl/blog/stage-1-vs-stage-2`
- `/nl/blog/is-ecu-remap-veilig`
- `/nl/blog/adblue-storing-uitgelegd`
- `/nl/blog/5-tips-na-een-tuning`
- `/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is`

English:

- `/en/news-blog/what-is-chiptuning`
- `/en/news-blog/stage-1-vs-stage-2`
- `/en/news-blog/is-ecu-remap-safe`
- `/en/news-blog/adblue-fault-explained`
- `/en/news-blog/5-tips-after-a-tune`
- `/en/news-blog/why-diagnostics-before-tuning-matter`

Polish:

- `/pl/aktualnosci-blog/co-to-jest-chiptuning`
- `/pl/aktualnosci-blog/stage-1-vs-stage-2`
- `/pl/aktualnosci-blog/czy-remap-ecu-jest-bezpieczny`
- `/pl/aktualnosci-blog/usterka-adblue-wyjasnienie`
- `/pl/aktualnosci-blog/5-zalecen-po-chiptuningu`
- `/pl/aktualnosci-blog/dlaczego-diagnostyka-przed-tuningiem-jest-wazna`

Checks confirmed on published article pages:

- metadata exists
- JSON-LD exists
- Power Catalog CTA exists and points to `https://power.noordtune.nl/`
- WhatsApp CTA exists and points to `https://wa.me/31685759600`
- Polish pages contain Polish diacritics

## BMW X3 Draft Safety

BMW X3 E83 2.0d Stage 1 draft entries:

- `draft-bmw-x3-e83-20d-stage-1-nl`
- `draft-bmw-x3-e83-20d-stage-1-en`
- `draft-bmw-x3-e83-20d-stage-1-pl`

Confirmed:

- `status: "draft"`
- `indexable: false`
- `customerApproved: false`
- no public images yet
- no sitemap entry
- not returned by `publishedCustomerResults`
- no public detail pages

Checked locally:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`

## Internal Linking Result

No public links to draft routes were found in renderers, navigation, footer, blog index or published articles.

Public-facing link change:

- existing article sidebar CTA wording was improved to position the Power Catalog as the first vehicle-specific indication and WhatsApp as the follow-up advice channel.

Draft-only internal link plans exist in `src/content/content-growth-drafts.ts` and `docs/INTERNAL_LINKING_PLAN.md`, but they are not rendered publicly.

## Production Safety

Confirmed:

- no production/domain settings changed
- no `next.config.ts` changes
- no booking implementation added
- no Facebook API sync added
- no file service added
- no local `/power` route added
- `site.catalogUrl` remains `https://power.noordtune.nl/`
- Power Catalog remains separate

## QA Commands

`pnpm` was unavailable in this local runtime (`pnpm: command not found`), so the exact package-script equivalents were run with the local Node runtime:

- `eslint .` -> passed
- `tsc --noEmit` -> passed
- `next build` -> passed
- `tsx scripts/audit-locales.ts` -> passed

Additional checks:

- static content/sitemap validation -> passed
- local HTTP route check through `next start -H 127.0.0.1 -p 3012` -> passed

Screenshots were not run because this branch adds hidden drafts, documentation and small article CTA copy improvements; no layout components or visual design systems changed.

## Manual Review Before Merge

Recommended before merging to `main`:

- owner confirms the article sidebar CTA wording is acceptable
- owner reviews the draft brand-page direction
- owner confirms the BMW X3 draft data before any future publication
- no draft routes should be connected until content is intentionally promoted from draft to published

## Merge Readiness

This branch is technically safe to merge later. It does not expose draft pages, does not change the sitemap behavior, and does not alter production infrastructure.

Manual content review is still recommended before merging because this branch prepares future SEO growth strategy and draft content.
