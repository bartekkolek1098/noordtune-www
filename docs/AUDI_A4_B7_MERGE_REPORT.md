# Audi A4 B7 Merge Report

## Merge Result

- PR: https://github.com/bartekkolek1098/noordtune-www/pull/5
- PR title: `Publish Audi A4 B7 2.0 TDI Stage 2+ customer result`
- Merge method: squash merge
- Merge commit on `main`: `4422801747ad4a8dd0d447cfeefc4933548d35be`
- Source branch retained for now: `feature/publish-audi-a4-b7-result`

## Result Published

- Audi A4 B7 2.0 TDI Stage 2+
- Year: 2008
- Transmission: manual
- TCU: not applicable
- Hardware: downpipe + hybrid turbo
- Stock: 170 hp / 350 Nm
- Tuned: 235 hp / 470 Nm
- Gain: +65 hp / +120 Nm
- Certificate: delivered to customer
- ECU wording: verified during service; not publicly listed

## Route Result

Verified locally from latest `main` after merge:

- `/nl/resultaten`: 200
- `/en/results`: 200
- `/pl/rezultaty`: 200
- `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `/en/results/audi-a4-b7-20-tdi-stage-2-plus`: 200
- `/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`: 200

The Audi A4 listing card appears as:

- Dutch: `Klantresultaat`
- English: `Customer result`
- Polish: `Realizacja klienta`

## BMW X3 Safety Result

BMW X3 still returns 200 in all languages:

- `/nl/resultaten/bmw-x3-e83-20d-stage-1`: 200
- `/en/results/bmw-x3-e83-20d-stage-1`: 200
- `/pl/rezultaty/bmw-x3-e83-20d-stage-1`: 200

## Demo Route Result

Demo detail routes remain hidden:

- `/nl/resultaten/bmw-330d-stage-1`: 404
- `/nl/resultaten/audi-a4-20-tdi-stage-1`: 404
- `/nl/resultaten/volkswagen-golf-gti-stage-1`: 404
- `/nl/resultaten/mercedes-c-220d-stage-1`: 404

The Next.js local production server logged internal `NoFallbackError` messages while serving these intentional 404 checks, but the HTTP status returned to the client was 404 as expected.

Demo/example cards remain hidden from public listing pages.

## Sitemap Result

Verified locally from `/sitemap.xml` after merge:

- Sitemap includes Audi A4 NL/EN/PL result routes.
- Sitemap includes BMW X3 NL/EN/PL result routes.
- Sitemap excludes demo result detail routes.

## Link Result

Verified locally on listing pages:

- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.
- `/power` on the main website remains 404.

## QA Results

`pnpm` was not available in the shell PATH, so equivalent local binaries were run with the bundled Codex Node runtime:

- `eslint .`: passed.
- `tsc --noEmit`: passed.
- `next build`: passed.
- `tsx scripts/audit-locales.ts`: passed.

## Production Deployment Status

Vercel production deployments were created automatically from GitHub:

- Audi merge commit `4422801747ad4a8dd0d447cfeefc4933548d35be`: production deployment created.
- Merge-report commit `f434a6c858544fed9f7673ee2e0aa6934d3279ea`: production deployment completed successfully.

Latest deployment status from GitHub deployments API:

- Environment: `Production`
- State: `success`
- Description: `Deployment has completed`

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- No other customer result detail pages were published.
- Demo examples were not converted into real customer cases.
