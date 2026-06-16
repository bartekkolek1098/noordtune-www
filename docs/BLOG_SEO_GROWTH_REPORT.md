# Blog SEO Growth Report

Date: 2026-06-16  
Branch: `feature/blog-seo-growth`

## Articles Added

Six new evergreen SEO articles were added as published content in Dutch, English and Polish.

### ECU Remap

- Dutch: `/nl/blog/wat-is-ecu-remap`
- English: `/en/news-blog/what-is-ecu-remap`
- Polish: `/pl/aktualnosci-blog/co-to-jest-remap-ecu`

### Chiptuning With Automatic Transmission

- Dutch: `/nl/blog/chiptuning-met-automaat`
- English: `/en/news-blog/chiptuning-with-automatic-transmission`
- Polish: `/pl/aktualnosci-blog/chiptuning-z-automatyczna-skrzynia`

### When Stage 2 Tuning Makes Sense

- Dutch: `/nl/blog/wanneer-is-stage-2-tuning-verstandig`
- English: `/en/news-blog/when-does-stage-2-tuning-make-sense`
- Polish: `/pl/aktualnosci-blog/kiedy-stage-2-ma-sens`

### Log Analysis Before Tuning

- Dutch: `/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning`
- English: `/en/news-blog/why-log-analysis-matters-before-tuning`
- Polish: `/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem`

### DSG / TCU Tuning

- Dutch: `/nl/blog/dsg-tcu-tuning-uitgelegd`
- English: `/en/news-blog/dsg-tcu-tuning-explained`
- Polish: `/pl/aktualnosci-blog/dsg-tcu-tuning-wyjasnienie`

### DPF / EGR / AdBlue Faults

- Dutch: `/nl/blog/dpf-egr-of-adblue-storing-wat-nu`
- English: `/en/news-blog/dpf-egr-adblue-fault-what-now`
- Polish: `/pl/aktualnosci-blog/dpf-egr-adblue-usterka-co-dalej`

## Image Assets Added

All article visuals use existing local NoordTune assets copied or converted into descriptive blog image paths:

- `public/images/blog/ecu-remap.webp`
- `public/images/blog/automatic-transmission-tuning.webp`
- `public/images/blog/stage-2-tuning.webp`
- `public/images/blog/log-analysis.webp`
- `public/images/blog/dsg-tcu-tuning.webp`
- `public/images/blog/dpf-egr-adblue-diagnostics.webp`

No random external images, scraped images or hotlinked assets were added.

## Internal Linking Added

- ECU remap links to Chiptuning, Auto Diagnose and Power Catalog.
- Automaat content links to DSG/TCU or relevant services and Power Catalog.
- Stage 2 content links to Stage 2 context, log analysis and customer results.
- Loganalyse content links to diagnostics and ECU remap safety content.
- DSG/TCU content links to automaat content and services.
- DPF/EGR/AdBlue content links to diagnostics, contact and WhatsApp where appropriate.

## Blog Index

The blog index cards were expanded in NL/EN/PL. All new cards point to published article routes and retain localized category labels and reading times.

## Sitemap Result

All 18 new published article routes are included through `src/app/sitemap.ts`, because published blog articles are included automatically.

## QA Result

- Lint: passed via local project binary fallback (`./node_modules/.bin/eslint .`).
- Typecheck: passed via local project binary fallback (`./node_modules/.bin/tsc --noEmit`).
- Build: passed via local project binary fallback (`./node_modules/.bin/next build`).
- Content audit: passed via local project binary fallback (`./node_modules/.bin/tsx scripts/audit-locales.ts`).
- Route/sitemap verification: passed for all 18 new article routes and all 3 localized blog listing pages on local production server.
- Mobile blog overflow check: passed for `/nl/blog`, `/en/news-blog` and `/pl/aktualnosci-blog` at 390px mobile viewport.

`pnpm` was not available in the local shell PATH during this pass, so equivalent local project binaries were used with the bundled Node runtime.

## Remaining Manual Review Items

- Owner/editor can review whether article depth and tone match NoordTune's preferred public voice.
- Future article-specific photos can replace current local technical assets if approved.
- Search Console inspection should happen only after merge and production deployment.

## Safety Confirmations

- `power.noordtune.nl` was not modified.
- No booking logic was implemented.
- No Facebook API sync was implemented.
- No file service was implemented.
- Customer results remain separate from SEO blog articles.
