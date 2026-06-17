# Blog SEO Growth Production QA Report

Date: 2026-06-17  
Production URL: `https://www.noordtune.nl`  
Main commit tested locally: `57be42b`

## Scope

This QA pass verifies the expanded SEO blog article set after production deployment.

No website features were added in this pass. This report is documentation-only.

## Production Blog Indexes Checked

- `https://www.noordtune.nl/nl/blog`
- `https://www.noordtune.nl/en/news-blog`
- `https://www.noordtune.nl/pl/aktualnosci-blog`

Result:

- All returned `200`.
- Old and new article cards are visible.
- No dead article cards were found.
- Category labels and reading times are visible.
- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.

## Production Article Routes Checked

### Dutch

- `https://www.noordtune.nl/nl/blog/wat-is-ecu-remap`
- `https://www.noordtune.nl/nl/blog/chiptuning-met-automaat`
- `https://www.noordtune.nl/nl/blog/wanneer-is-stage-2-tuning-verstandig`
- `https://www.noordtune.nl/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning`
- `https://www.noordtune.nl/nl/blog/dsg-tcu-tuning-uitgelegd`
- `https://www.noordtune.nl/nl/blog/dpf-egr-of-adblue-storing-wat-nu`

### English Sample Routes

- `https://www.noordtune.nl/en/news-blog/what-is-ecu-remap`
- `https://www.noordtune.nl/en/news-blog/dsg-tcu-tuning-explained`

### Polish Sample Routes

- `https://www.noordtune.nl/pl/aktualnosci-blog/co-to-jest-remap-ecu`
- `https://www.noordtune.nl/pl/aktualnosci-blog/dsg-tcu-tuning-wyjasnienie`

Result:

- All checked article routes returned `200`.
- Metadata exists.
- Open Graph metadata exists.
- Article JSON-LD exists.
- FAQ JSON-LD exists.
- New article images load correctly.
- Power Catalog CTAs point to `https://power.noordtune.nl/`.
- WhatsApp CTAs point to `https://wa.me/31685759600`.
- Polish pages use Polish diacritics.
- No English CTA leftovers were found on Polish pages.

## Sitemap Result

Checked:

- `https://www.noordtune.nl/sitemap.xml`

Result:

- Sitemap returned `200`.
- Sitemap includes all 18 new article routes:
  - `/nl/blog/wat-is-ecu-remap`
  - `/nl/blog/chiptuning-met-automaat`
  - `/nl/blog/wanneer-is-stage-2-tuning-verstandig`
  - `/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning`
  - `/nl/blog/dsg-tcu-tuning-uitgelegd`
  - `/nl/blog/dpf-egr-of-adblue-storing-wat-nu`
  - `/en/news-blog/what-is-ecu-remap`
  - `/en/news-blog/chiptuning-with-automatic-transmission`
  - `/en/news-blog/when-does-stage-2-tuning-make-sense`
  - `/en/news-blog/why-log-analysis-matters-before-tuning`
  - `/en/news-blog/dsg-tcu-tuning-explained`
  - `/en/news-blog/dpf-egr-adblue-fault-what-now`
  - `/pl/aktualnosci-blog/co-to-jest-remap-ecu`
  - `/pl/aktualnosci-blog/chiptuning-z-automatyczna-skrzynia`
  - `/pl/aktualnosci-blog/kiedy-stage-2-ma-sens`
  - `/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem`
  - `/pl/aktualnosci-blog/dsg-tcu-tuning-wyjasnienie`
  - `/pl/aktualnosci-blog/dpf-egr-adblue-usterka-co-dalej`

## Mobile QA

Checked with Playwright at `390x844` mobile viewport:

- `https://www.noordtune.nl/nl/blog`
- `https://www.noordtune.nl/en/news-blog`
- `https://www.noordtune.nl/pl/aktualnosci-blog`
- `https://www.noordtune.nl/pl/aktualnosci-blog/co-to-jest-remap-ecu`

Result:

- No horizontal overflow.
- No console errors.
- Polish diacritics visible on Polish pages.

## Customer Results Safety

Checked:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `https://www.noordtune.nl/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`

Result:

- Both returned `200`.
- Customer results still work after the blog SEO deployment.
- Customer result content was not changed in this pass.

## Local QA Commands

`pnpm` was not available in the local shell PATH, so equivalent project-local binaries were used with the bundled Node runtime.

- Lint: passed
- Typecheck: passed
- Build: passed
- Content audit: passed

## Production Safety Confirmations

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- Customer results were not changed.

## Recommendation

The expanded SEO blog content is clean in production.

No blockers remain from this QA pass.
