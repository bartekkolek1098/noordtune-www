# Blog SEO Growth Merge Report

Date: 2026-06-17  
Repository: `bartekkolek1098/noordtune-www`

## PR

- PR: https://github.com/bartekkolek1098/noordtune-www/pull/6
- Source branch: `feature/blog-seo-growth`
- Target branch: `main`
- Merge method: squash merge

## Merge Result

- Result: merged into `main`
- Main merge commit: `4eaee8d27b5ba782f6bfcfe3446a9cc6e48d00a6`
- Local main was pulled after merge and fast-forwarded to the merge commit.

## Scope Confirmed Before Merge

- 18 new article routes were present.
- Blog index pages showed old and new article cards.
- Sitemap included the new article routes.
- Metadata, Open Graph metadata, Article JSON-LD and FAQ JSON-LD existed for the new articles.
- Power Catalog CTAs pointed to `https://power.noordtune.nl/`.
- WhatsApp CTAs pointed to `https://wa.me/31685759600`.
- Images were local assets in `public/images/blog/`.
- No customer result logic was changed.
- No booking, Facebook API sync or file-service logic was added.

## QA Results After Merge

`pnpm` was not available in the local shell PATH, so equivalent project-local binaries were used with the bundled Node runtime.

- Lint: passed
- Typecheck: passed
- Build: passed
- Content audit: passed
- Local route verification: passed
- Sitemap verification: passed
- Metadata / Open Graph / JSON-LD verification: passed
- Power Catalog and WhatsApp CTA verification: passed

## Article Route Result

Verified locally on a production build:

### Dutch

- `/nl/blog/wat-is-ecu-remap`
- `/nl/blog/chiptuning-met-automaat`
- `/nl/blog/wanneer-is-stage-2-tuning-verstandig`
- `/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning`
- `/nl/blog/dsg-tcu-tuning-uitgelegd`
- `/nl/blog/dpf-egr-of-adblue-storing-wat-nu`

### English

- `/en/news-blog/what-is-ecu-remap`
- `/en/news-blog/chiptuning-with-automatic-transmission`
- `/en/news-blog/when-does-stage-2-tuning-make-sense`
- `/en/news-blog/why-log-analysis-matters-before-tuning`
- `/en/news-blog/dsg-tcu-tuning-explained`
- `/en/news-blog/dpf-egr-adblue-fault-what-now`

### Polish

- `/pl/aktualnosci-blog/co-to-jest-remap-ecu`
- `/pl/aktualnosci-blog/chiptuning-z-automatyczna-skrzynia`
- `/pl/aktualnosci-blog/kiedy-stage-2-ma-sens`
- `/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem`
- `/pl/aktualnosci-blog/dsg-tcu-tuning-wyjasnienie`
- `/pl/aktualnosci-blog/dpf-egr-adblue-usterka-co-dalej`

All returned `200`.

## Blog Index Result

Verified locally:

- `/nl/blog`
- `/en/news-blog`
- `/pl/aktualnosci-blog`

All returned `200` and included the expanded article cards.

## Sitemap Result

`/sitemap.xml` includes all 18 new article routes.

## Production Deployment Status

GitHub deployment for merge commit `4eaee8d27b5ba782f6bfcfe3446a9cc6e48d00a6`:

- Environment: Production
- State: success
- Description: Deployment has completed
- Vercel preview/deployment URL: `https://noordtune-csqmhk5o3-bartekkolek1098s-projects.vercel.app`

Production URL should update through the existing Vercel production deployment pipeline. A separate post-merge production QA pass is still recommended before owner sign-off.

## Safety Confirmations

- `power.noordtune.nl` was not modified.
- No booking system was implemented.
- No Facebook API sync was implemented.
- No file service was implemented.
- No production/domain settings were changed.
- Customer results were not changed in this pass.
- No random external/copyrighted images were added.
