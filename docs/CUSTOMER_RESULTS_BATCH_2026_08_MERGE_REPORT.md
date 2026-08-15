# Customer Results Batch 2026-08 Merge Report

Date: 2026-08-16  
Repository: `bartekkolek1098/noordtune-www`

## Merge Result

- PR: https://github.com/bartekkolek1098/noordtune-www/pull/8
- Source branch: `feature/add-customer-results-batch-2026-08`
- Target branch: `main`
- Merge method: squash merge
- Result: merged successfully
- Merge commit on `main`: `350307d727ed129c83c4d654449374ee15d88228`
- Responsive follow-up commit on `main`: `95a5209c61fcd31100602641bc30e2ef0aaafc64`
- Source branch retained pending production QA.

The PR was `MERGEABLE` with a `CLEAN` merge state and was based directly on the latest `origin/main` before merge.

At final owner approval, PR #8 was already merged and no second PR or duplicate squash merge was created. The approved iPad Power Catalog correction was already present on `main` as commit `95a5209`. The source branch remains available on GitHub but is older than `main` and has no additional work that needs merging.

## Published Results

The merge adds five owner-approved customer projects in Dutch, English and Polish:

1. Ford Transit Connect 1.5 EcoBlue 2019 Stage 1
2. Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power
3. BMW F40 118i 7DCT300 TCU tuning
4. Volkswagen Caddy 2.0 TDI 2020 Stage 1
5. Volkswagen Transporter 2.0 TDI 2013 ECU cloning + Stage 1

Unknown ECU, TCU, transmission, torque and certificate fields were not guessed. The BMW F40 project uses TCU-specific metrics instead of presenting unverified engine gains.

## QA Results

The checks were run before merge and repeated from the merged `main` branch. Node was supplied through the bundled Codex runtime because it was not present on the default shell `PATH`.

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 111 static/server routes generated |
| `pnpm content:audit` | Passed |
| Local production-server route audit | Passed |
| Sitemap audit | Passed |
| CTA audit | Passed |
| Local image asset audit | Passed |

The complete check set was repeated after the owner approved the responsive follow-up. All checks remained green on the latest `main`.

## Route Result

All 15 new localized routes returned HTTP 200 after merge.

### Dutch

- `/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1`
- `/nl/resultaten/toyota-proace-verso-vip-20d-2023-stage-1`
- `/nl/resultaten/bmw-f40-118i-7dct300-tcu-tuning`
- `/nl/resultaten/vw-caddy-20-tdi-2020-stage-1`
- `/nl/resultaten/vw-transporter-20-tdi-2013-ecu-cloning-stage-1`

### English

- `/en/results/ford-transit-connect-15-ecoblue-2019-stage-1`
- `/en/results/toyota-proace-verso-vip-20d-2023-stage-1`
- `/en/results/bmw-f40-118i-7dct300-tcu-tuning`
- `/en/results/vw-caddy-20-tdi-2020-stage-1`
- `/en/results/vw-transporter-20-tdi-2013-ecu-cloning-stage-1`

### Polish

- `/pl/rezultaty/ford-transit-connect-15-ecoblue-2019-stage-1`
- `/pl/rezultaty/toyota-proace-verso-vip-20d-2023-stage-1`
- `/pl/rezultaty/bmw-f40-118i-7dct300-tcu-tuning`
- `/pl/rezultaty/vw-caddy-20-tdi-2020-stage-1`
- `/pl/rezultaty/vw-transporter-20-tdi-2013-ecu-cloning-stage-1`

The three listing pages returned HTTP 200 and showed all seven real published results without demo cards:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`

## Existing Result Compatibility

BMW X3 and Audi A4 remained available in all three languages. All six existing localized detail routes returned HTTP 200 after merge.

- BMW X3 E83 2.0d Stage 1: passed
- Audi A4 B7 2.0 TDI Stage 2+: passed

Their existing content was not changed by this merge beyond compatibility with the shared result model and audit rules.

## Demo Route Result

Demo cards remain hidden from all public result listings. The checked NL demo detail routes returned HTTP 404:

- `/nl/resultaten/bmw-330d-stage-1`
- `/nl/resultaten/audi-a4-20-tdi-stage-1`
- `/nl/resultaten/volkswagen-golf-gti-stage-1`
- `/nl/resultaten/mercedes-c-220d-stage-1`

These demo slugs are excluded from the sitemap.

## Sitemap Result

The generated `/sitemap.xml`:

- includes all 15 new approved localized result routes;
- includes the existing BMW X3 and Audi A4 localized routes;
- excludes all checked demo result detail routes.

No draft or demo result was made indexable.

## Image Result

Ten optimized local WebP files were verified after merge: one main image and one Open Graph variant for each project. Every URL returned HTTP 200 with the `image/webp` content type.

- Ford Transit Connect: main and OG passed
- Toyota ProAce Verso VIP: main and OG passed
- BMW F40 118i 7DCT300: main and OG passed
- Volkswagen Caddy: main and OG passed
- Volkswagen Transporter: main and OG passed

The images are owner-provided local assets. Visible plates are limited to owner-approved promotional graphics, and no full VIN or private customer data was added as page content.

## Links

All 15 new result pages were checked in the local production build:

- Power Catalog CTAs point to `https://power.noordtune.nl/`.
- WhatsApp CTAs point to `https://wa.me/31685759600`.

## iPad Power Catalog Fix

Owner visual approval was received for the tablet/iPad responsive correction in commit `95a5209c61fcd31100602641bc30e2ef0aaafc64`.

The final layout strategy is:

- mobile: one content column with a two-by-two feature grid;
- tablet and iPad widths: one content column with the feature boxes below in a four-column grid;
- desktop from the `xl` breakpoint: two columns using `minmax(0, ...)` tracks;
- long headings, feature labels and bullet text use safe wrapping;
- the decorative catalog SVG is simplified on tablet to prevent its embedded labels from visually mixing with live content.

The component retains `min-width: 0`, overflow containment and responsive type sizing. The owner confirmed that the repaired iPad/tablet layout is visually approved.

## Production Deployment

Vercel started automatically after the GitHub merge.

- Deployment commit: `350307d727ed129c83c4d654449374ee15d88228`
- Vercel status: `success`
- Description: `Deployment has completed`
- Deployment dashboard: https://vercel.com/bartekkolek1098s-projects/noordtune-www/4w1s9xTmCY25n5gtQExvwbrMV81b
- Responsive fix deployment commit: `95a5209c61fcd31100602641bc30e2ef0aaafc64`
- Responsive fix Vercel status: `success`
- Responsive fix deployment dashboard: https://vercel.com/bartekkolek1098s-projects/noordtune-www/CQdPhxgNrtaGG4uD3KxTPgr923c2

Production URL QA and owner tablet visual approval are complete. The source branch is intentionally retained until the owner chooses to remove it.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- No demo result was published.
- The source branch was not deleted.
