# Customer Results Production QA Report

Date: 2026-06-14  
Production URL: `https://www.noordtune.nl`  
Repository: `bartekkolek1098/noordtune-www`  
Branch checked locally: `main`  
Main commit tested locally before report: `871edce`

## Summary

Production QA after the Customer Results MVP merge passed.

The Customer Results architecture is clean in production:

- result listing pages are public and working
- demo cards are visible and marked as indicative examples
- demo cards do not behave as real approved customer cases
- BMW X3 remains draft, non-public and non-indexable
- all customer result detail pages remain hidden
- sitemap does not expose demo or draft result routes
- Power Catalog remains separate at `https://power.noordtune.nl/`
- `/power` remains `404` on the main website

No launch blockers were found.

## Production Result Listing Pages

Checked:

- `https://www.noordtune.nl/nl/resultaten` -> `200`
- `https://www.noordtune.nl/en/results` -> `200`
- `https://www.noordtune.nl/pl/rezultaty` -> `200`

Verified on all three listing pages:

- demo cards are visible
- BMW 330d, Audi A4, Volkswagen Golf GTI and Mercedes C 220d demo examples appear
- cards are marked as indicative examples
- cards do not claim to be approved customer cases
- disclaimer wording is present
- Power Catalog URL is present: `https://power.noordtune.nl/`
- WhatsApp URL is present: `https://wa.me/31685759600`
- no local `/power` links were found

Indicative labels verified:

- Dutch: `Indicatief voorbeeld`
- English: `Indicative example`
- Polish: `Przykład orientacyjny`

Disclaimer wording verified:

- Dutch page includes wording that identical gains are not guaranteed.
- English page includes wording that identical gains are not guaranteed.
- Polish page includes wording that identical gains are not guaranteed.

## Hidden Detail Pages

BMW X3 draft pages:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`

Demo result detail pages:

- `https://www.noordtune.nl/nl/resultaten/bmw-330d-stage-1` -> `404`
- `https://www.noordtune.nl/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `https://www.noordtune.nl/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `https://www.noordtune.nl/nl/resultaten/mercedes-c-220d-stage-1` -> `404`

Result: all requested hidden pages remain hidden.

## Sitemap

Checked:

- `https://www.noordtune.nl/sitemap.xml`

Sitemap includes:

- `https://www.noordtune.nl/nl/resultaten`
- `https://www.noordtune.nl/en/results`
- `https://www.noordtune.nl/pl/rezultaty`

Sitemap excludes:

- `bmw-x3-e83-20d-stage-1`
- `bmw-330d-stage-1`
- `audi-a4-20-tdi-stage-1`
- `volkswagen-golf-gti-stage-1`
- `mercedes-c-220d-stage-1`

Result: no customer result demo or draft detail routes are exposed in sitemap.

## Core Site Safety

Checked:

- `https://www.noordtune.nl/nl` -> `200`
- `https://www.noordtune.nl/en` -> `200`
- `https://www.noordtune.nl/pl` -> `200`

Blog article smoke checks:

- `https://www.noordtune.nl/nl/blog/wat-is-chiptuning` -> `200`
- `https://www.noordtune.nl/en/news-blog/what-is-chiptuning` -> `200`
- `https://www.noordtune.nl/pl/aktualnosci-blog/co-to-jest-chiptuning` -> `200`

Draft brand pages remain hidden:

- `https://www.noordtune.nl/nl/bmw-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/audi-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/volkswagen-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/mercedes-chiptuning` -> `404`

Draft article pages remain hidden:

- `https://www.noordtune.nl/nl/blog/wat-is-ecu-remap` -> `404`
- `https://www.noordtune.nl/nl/blog/chiptuning-met-automaat-waar-moet-je-op-letten` -> `404`
- `https://www.noordtune.nl/nl/blog/wanneer-is-stage-2-tuning-verstandig` -> `404`
- `https://www.noordtune.nl/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning` -> `404`
- `https://www.noordtune.nl/nl/blog/dsg-tcu-tuning-uitgelegd` -> `404`
- `https://www.noordtune.nl/nl/blog/dpf-egr-of-adblue-storing-wat-nu` -> `404`

Main website catalog safety:

- `https://www.noordtune.nl/power` -> `404`
- `https://power.noordtune.nl/` -> reachable separately, returned `307` during the check

## Link Audit

Checked selected production pages:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`
- `/nl`
- `/en`
- `/pl`
- `/nl/blog/wat-is-chiptuning`
- `/en/news-blog/what-is-chiptuning`
- `/pl/aktualnosci-blog/co-to-jest-chiptuning`

Result:

- all Power Catalog links found point to `https://power.noordtune.nl/`
- all WhatsApp links found point to `https://wa.me/31685759600`
- no local `/power` hrefs were found

## Mobile QA

Checked production mobile viewport:

- page: `https://www.noordtune.nl/pl/rezultaty`
- viewport: `390x844`

Results:

- no horizontal overflow: `0px`
- mobile menu opens
- mobile menu closes with Escape
- no console errors were observed
- Polish labels and diacritics are correct
- no English CTA leftovers found in Polish mobile menu

Polish mobile menu labels verified:

- `PL`
- `NL`
- `EN`
- `START`
- `KATALOG MOCY`
- `CHIPTUNING`
- `DIAGNOSTYKA`
- `USŁUGI`
- `CENNIK`
- `REZULTATY`
- `AKTUALNOŚCI`
- `O NAS`
- `KONTAKT`
- `NAPISZ NA WHATSAPP`
- `SPRAWDŹ MOŻLIWOŚCI AUTA`

## Local QA From Latest Main

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
- Static generation completed: `72/72` pages.
- Sitemap and robots routes generated.

## Customer Result Content Count

Local content check:

```json
{
  "publicResultPageCount": 0,
  "totalCustomerResults": 15,
  "draftCount": 3,
  "demoCount": 12,
  "publishedCount": 0
}
```

Result: public/indexable customer result count remains `0`.

## BMW X3 Draft Safety

BMW X3 E83 2.0d Stage 1 remains:

- draft
- non-public
- non-indexable
- not in sitemap
- not linked as a public detail page

The case must not be published until owner-approved images, rights, customer approval, final technical copy and certificate/reference details are confirmed.

## Confirmation

- Customer Results MVP architecture is clean in production.
- No blockers remain from this QA pass.
- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file service was added.
- No customer result detail page was published.
- BMW X3 was not published.

## Recommendation

Production is clean after the Customer Results MVP merge.

Keep the customer result detail publishing guard in place and only publish real result pages after explicit owner approval per case.
