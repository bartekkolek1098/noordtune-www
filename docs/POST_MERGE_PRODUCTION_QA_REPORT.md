# Post-Merge Production QA Report

Date: `2026-06-14`  
Production URL: `https://www.noordtune.nl`  
Repository: `bartekkolek1098/noordtune-www`  
Branch tested locally: `main`  
Commit tested locally: `3bf3053af18313784952fb53386b65e6778b56f5`

## Result

Production is clean after the content-growth merge.

No hotfix is needed.

The content-growth merge is safe in production. Draft brand pages, draft article topics and the BMW X3 customer result remain hidden and non-public.

## Core Route Results

Production HTTP checks:

- `https://www.noordtune.nl` -> `307` to `/nl`
- `https://www.noordtune.nl/nl` -> `200`
- `https://www.noordtune.nl/en` -> `200`
- `https://www.noordtune.nl/pl` -> `200`
- `https://www.noordtune.nl/nl/chiptuning` -> `200`
- `https://www.noordtune.nl/nl/auto-diagnose` -> `200`
- `https://www.noordtune.nl/nl/diensten` -> `200`
- `https://www.noordtune.nl/nl/prijzen` -> `200`
- `https://www.noordtune.nl/nl/resultaten` -> `200`
- `https://www.noordtune.nl/nl/blog` -> `200`
- `https://www.noordtune.nl/nl/over-ons` -> `200`
- `https://www.noordtune.nl/nl/contact` -> `200`
- `https://www.noordtune.nl/nl/afspraak` -> `200`

## Blog And Article Route Results

Production checks:

- `https://www.noordtune.nl/nl/blog` -> `200`
- `https://www.noordtune.nl/nl/blog/wat-is-chiptuning` -> `200`
- `https://www.noordtune.nl/nl/blog/stage-1-vs-stage-2` -> `200`
- `https://www.noordtune.nl/nl/blog/is-ecu-remap-veilig` -> `200`
- `https://www.noordtune.nl/en/news-blog/what-is-chiptuning` -> `200`
- `https://www.noordtune.nl/pl/aktualnosci-blog/co-to-jest-chiptuning` -> `200`

Published article checks confirmed:

- metadata exists
- JSON-LD exists
- Power Catalog CTA exists
- WhatsApp CTA exists
- Polish content includes proper diacritics
- no English CTA leftovers were found on Polish article page

## Draft Brand Page Safety

These pages remain hidden in production:

- `https://www.noordtune.nl/nl/bmw-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/audi-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/volkswagen-chiptuning` -> `404`
- `https://www.noordtune.nl/nl/mercedes-chiptuning` -> `404`

They are not public and are not in the sitemap.

## Draft Article Safety

Checked draft topics:

- `wat-is-ecu-remap`
- `chiptuning-met-automaat`
- `wanneer-is-stage-2-verstandig`
- `waarom-loganalyse-belangrijk-is`
- `dsg-tcu-tuning-uitgelegd`
- `dpf-egr-adblue-storing-wat-nu`

Production result:

- all checked draft article routes returned `404`
- draft topics are not linked from the blog index
- draft topics are not in the sitemap

## BMW X3 Draft Safety

BMW X3 E83 2.0d Stage 1 remains hidden:

- `https://www.noordtune.nl/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`
- `https://www.noordtune.nl/en/results/bmw-x3-e83-20d-stage-1` -> `404`
- `https://www.noordtune.nl/pl/rezultaty/bmw-x3-e83-20d-stage-1` -> `404`

The draft remains:

- non-public
- non-indexable
- not in sitemap
- not linked publicly

## Sitemap Result

Production sitemap:

- `https://www.noordtune.nl/sitemap.xml` -> `200`
- sitemap URL count: `66`

Confirmed included:

- published main pages
- published Dutch SEO landing pages
- published blog articles

Confirmed not included:

- `bmw-chiptuning`
- `audi-chiptuning`
- `volkswagen-chiptuning`
- `mercedes-chiptuning`
- `wat-is-ecu-remap`
- `chiptuning-met-automaat`
- `bmw-x3-e83-20d-stage-1`

`https://www.noordtune.nl/robots.txt` returned `200`.

## Power Catalog Link Result

Confirmed:

- Power Catalog CTAs point to `https://power.noordtune.nl/`
- local `/power` on the main site remains `404`
- `https://power.noordtune.nl/` remains separate and responds with a redirect/status suitable for its own app
- no main website RDW/catalog logic was added

## WhatsApp Link Result

Confirmed:

- WhatsApp CTAs point to `https://wa.me/31685759600`
- checked article CTA links, header/menu links and visible page CTA links through production HTML and mobile menu test

## Language And Mobile Result

Production mobile test used a `390x844` viewport.

Confirmed:

- `/pl` has `html lang="pl"`
- Polish homepage text includes proper Polish diacritics
- no English CTA text appears on Polish page
- mobile menu opens as a full overlay/dialog
- menu overlay sits above the floating WhatsApp button
- scroll lock works while menu is open
- Escape closes the menu and restores scroll
- clicking a menu link closes the menu and restores scroll
- no horizontal overflow was detected
- no browser console errors were captured
- EN page uses `html lang="en"` and includes Power Catalog wording
- NL page uses `html lang="nl"`

Polish mobile menu labels confirmed:

- `PL`
- `NL`
- `EN`
- `Start`
- `Katalog mocy`
- `Chiptuning`
- `Diagnostyka`
- `Usługi`
- `Cennik`
- `Rezultaty`
- `Aktualności`
- `O nas`
- `Kontakt`
- `Napisz na WhatsApp`
- `Sprawdź możliwości auta`

## Local QA Command Results

`pnpm` was unavailable in the local shell:

- `pnpm lint` -> `command not found`

Equivalent package-script commands were run with the local Node runtime:

- `eslint .` -> passed
- `tsc --noEmit` -> passed
- `next build` -> passed
- `tsx scripts/audit-locales.ts` -> passed

Build result:

- Next.js build passed
- static page generation remains `72` pages

## Production Safety

Confirmed:

- no feature code was changed in this QA pass
- `power.noordtune.nl` was not modified
- booking was not implemented
- Facebook API sync was not implemented
- file service was not implemented
- draft brand pages were not published
- draft article pages were not published
- BMW X3 customer result was not published
- `feature/customer-results-mvp` was not merged

## Recommendation

Production is clean after the content-growth merge.

It is safe to proceed to planning or updating `feature/customer-results-mvp` next, as long as it remains separate from production until reviewed.
