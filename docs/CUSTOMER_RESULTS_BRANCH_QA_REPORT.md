# Customer Results Branch QA Report

Date: `2026-06-13`  
Branch tested: `feature/customer-results-mvp`  
Commit tested: `b08f242`  
Status: passed for branch preview / later-review use

## Preview URL

GitHub commit status reports Vercel success for the branch:

- Vercel status: `success`
- Vercel target: `https://vercel.com/bartekkolek1098s-projects/noordtune-www/9k7KDiM7254YUXNzCt1oGzki4Nde`

GitHub deployment metadata did not expose a public `environment_url`, and standard guessed branch aliases did not resolve. Because no direct public branch preview URL was available from GitHub/Vercel metadata, QA was performed against a local production build of the branch:

- Local production QA URL: `http://127.0.0.1:3002`

The public alias `https://noordtune-www.vercel.app` was not treated as the branch preview because it may represent the stable deployment.

## Routes Checked

Results listing pages:

- `/nl/resultaten` -> `200`
- `/en/results` -> `200`
- `/pl/rezultaty` -> `200`

Negative detail-route checks:

- `/nl/resultaten/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/audi-a4-20-tdi-stage-1` -> `404`
- `/nl/resultaten/volkswagen-golf-gti-stage-1` -> `404`
- `/nl/resultaten/mercedes-c-220d-stage-1` -> `404`
- `/en/results/bmw-330d-stage-1` -> `404`
- `/pl/rezultaty/bmw-330d-stage-1` -> `404`
- `/nl/resultaten/bmw-x3-e83-20d-stage-1` -> `404`

The expected `404` checks intentionally request non-public demo/draft result routes. Next.js logs an internal no-fallback message during these negative probes, but the HTTP result is correct and no public page is exposed.

## Demo Result Cards

Confirmed on Dutch, English and Polish result listing pages:

- 4 demo cards visible per locale.
- Demo cards are clearly labelled:
  - Dutch: `Indicatief voorbeeld`
  - English: `Indicative example`
  - Polish: `Przykład orientacyjny`
- Demo cards include disclaimer wording that results are vehicle-specific and not guaranteed.
- Demo cards do not link to internal detail pages.
- Demo cards link to the Power Catalog:
  - `https://power.noordtune.nl/`
- Demo cards link to WhatsApp:
  - `https://wa.me/31685759600`
- No local `/power` links were found.

## Public Customer Result Pages

Current public/indexable customer result page count: `0`.

Model state:

- `12` demo entries
- `1` draft entry
- `0` public/indexable entries

The BMW X3 E83 2.0d Stage 1 case remains a draft and is not exposed publicly.

## Sitemap

Local branch sitemap:

- `/sitemap.xml` -> `200`
- includes normal result listing pages:
  - `/nl/resultaten`
  - `/en/results`
  - `/pl/rezultaty`
- includes normal SEO blog article pages:
  - `/nl/blog/wat-is-chiptuning`
  - `/en/news-blog/what-is-chiptuning`
  - `/pl/aktualnosci-blog/co-to-jest-chiptuning`
- does not include demo or draft customer result slugs:
  - `bmw-330d-stage-1`
  - `audi-a4-20-tdi-stage-1`
  - `volkswagen-golf-gti-stage-1`
  - `mercedes-c-220d-stage-1`
  - `bmw-x3-e83-20d-stage-1`

## Language QA

Confirmed:

- Dutch, English and Polish result listing labels are localized.
- Polish uses correct diacritics in visible result labels and CTA copy.
- No English CTA leftovers were found on Polish result listing page.
- Polish result page uses `Sprawdź swoje auto w katalogu mocy` for the Power Catalog CTA.

## Content Architecture QA

Confirmed:

- SEO Blog / Knowledge Base remains separate.
- Customer Results remain separate from blog articles.
- Social Updates remain future architecture only.
- No Facebook API sync was implemented.
- Facebook-style posts are still documented as future draft social updates or draft customer results requiring approval.

## Technical QA Commands

`pnpm` was not available in this shell and `corepack` was not present in the provided Node runtime, so equivalent local binaries were used:

- `eslint .` -> passed
- `tsc --noEmit` -> passed
- `next build` -> passed
- `tsx scripts/audit-locales.ts` -> passed

Build result:

- Next.js compiled successfully.
- Static generation completed.
- Generated page count stayed at `72`, confirming no new public customer result detail pages were generated.

## Browser QA

Playwright checks against local production build confirmed:

- no horizontal overflow on `/nl/resultaten`, `/en/results`, `/pl/rezultaty`
- no failed page resources on the listing pages
- no page errors on the listing pages
- all Power Catalog links use `https://power.noordtune.nl/`
- all WhatsApp links use `https://wa.me/31685759600`
- demo/draft detail routes return `404`

## Safety Confirmation

- `main` was not changed.
- This work remains only on `feature/customer-results-mvp`.
- `power.noordtune.nl` was not modified.
- Booking, Facebook API sync and file service were not implemented.
- Production domain settings were not touched.

## Recommendation

This branch is safe to keep for later review and future merge after the production domain work is complete.

Do not merge it into `main` until the current production release candidate is fully connected and manually approved.
