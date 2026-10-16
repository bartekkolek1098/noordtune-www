# NoordTune — Search Console-driven Audi A4 B7 Stage 2+ result optimization (2026-10-16)

## Observed search demand, not projected success
Connected Google Search Console through Windsor.ai (property `sc-domain:noordtune.nl`, Netherlands, **16 September – 14 October 2026**) shows a very specific commercial/technical query:
- `audi a4 2.0 tdi stage 2` — **11 impressions, 0 clicks, mean position 7.1818**, landing on `https://www.noordtune.nl/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`.
- `audi a4 b7 chip tuning` — 3 impressions, 0 clicks, mean position 17.6667, same landing.
- `audi a4 2.0 tdi chiptuning` — 2 impressions, 0 clicks, mean position 25.5, same landing.
- Sample counts are small and must not be extrapolated as an expected increase in bookings.

The published 2008 Audi A4 B7 2.0 TDI Stage 2+ project is **owner-/customer-approved**, has an approved original image and the source-approved project values **170 pk / 350 Nm → 235 pk / 470 Nm** (change +65 pk and +120 Nm). Hardware recorded: **hybrid turbo, downpipe**, manual transmission and a custom ECU calibration. The published owner-supplied certificate is explicitly a **certificate of the service performed**, **not** a guaranteed dyno sheet or independent road-legal emissions/homologation approval.

## Changes
- NL-only metadata title changed from generic, lengthy boilerplate to `Audi A4 B7 2.0 TDI Stage 2+: 170 naar 235 pk | NoordTune`. New source-scoped NL description explicitly distinguishes this particular historical project, original factory and after software power/torque and custom turbo+ECU hardware, rather than promising values for other 2.0 TDIs.
- NL original case has an **individually written technical evidence section** answering 3 intent-specific questions: exact hardware, whether 235 pk / 470 Nm applies to others (no), and what the service certificate means (not a dyno/vehicle homologation claim). Road-required DPF/SCR and local law remain explicitly protected. All numbers derive from the existing reviewed case `CustomerResult`, not guessed.
- NL case now has clear existing appointment CTA `/nl/afspraak` and a contextual info link to the existing `/nl/stage-2-tuning`, with no new price or product/vehicle page.
- The already-published, high-GSC-impression service landing `/nl/chiptuning` now has a **crawlable contextual link** into this precisely matching, owner-approved Stage 2+ Audi case, next to other genuine cases and explanatory articles. NL only; no generic unsupported translations.
- On-page data and metadata preserve source date `publishedAt: 2026-06-16`, update the actually edited NL case `updatedAt: 2026-10-16`, and leave EN/PL versions and all original hardware, image, customer approval and case power/torque records unchanged.
- **No new WWW indexable URL** or canonical path, no generic Stage 2 promise, no unsupported measurements, no new stage/ECU estimate, no fake location or reviews.
- These changes follow Google's current title and snippet guidance on concise, accurate, distinctive titles and substantive on-page text: https://developers.google.com/search/docs/appearance/title-link and https://developers.google.com/search/docs/appearance/snippet.

## Release gate
- `pnpm test:seo`, including new `tests/gsc-audi-a4-stage2-case.test.ts` verifying source data immutability, exactly scoped NL meta, authorized photo, project metrics and no technical/evidence extrapolation.
- `pnpm test:business`, `pnpm test:analytics`, `pnpm typecheck`, `pnpm lint`, `pnpm build` (existing Next.js 146 static routes).
- Production Chrome test `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3171 pnpm exec tsx scripts/qa-nl-gsc-audi-case.ts`: metadata, one H1/canonical and source-backed project values, three questions, certificate clarification, project/appointment URLs, path from NL chiptuning service, original Article JSON-LD 2026-06-16/2026-10-16 dates, no EN/PL duplication, unchanged 139 sitemap URLs, screen widths 320, 390 and 1440.
- Protect prior WWW production `f6c2a1914e9050c44ed7bb17535f10dd701a5fd0` by rollback tag, push PR, validate Vercel READY for exact preview SHA, merge, confirm production alias exact merged SHA, run public Chrome QA, sync both repos clean.

## Measurement
Recheck query/page GSC data in 2–4 weeks (e.g. 2026-10-30 through 2026-11-13) to observe whether the case obtains organic impressions and clicks. Do not claim immediate rankings or guaranteed conversions from an 11-impression baseline; Search Console average position is a sample statistic.
