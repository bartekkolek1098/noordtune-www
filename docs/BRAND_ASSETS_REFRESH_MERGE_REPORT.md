# NoordTune brand assets refresh merge report

Date: 2026-10-04

PR: [#15](https://github.com/bartekkolek1098/noordtune-www/pull/15)

Accepted head: `a5ae3ad3a6488dfbf4dc9c2ab6699cf8759f49b3`

## Merge result

PR #15 was confirmed open and mergeable with the exact approved head SHA and successful Vercel checks immediately before merge. It was squash merged into `main` without deleting the feature branch.

Merge commit: `3b201bf61191dc835ffc5a00c807104344674f15`

Local `main` was fast-forwarded after the merge and matched `origin/main`. The remote `feature/brand-assets-refresh-2026-10` branch remained available at the accepted head.

## Pre-merge scope audit

- The PR contained all 11 and only the approved public web-brand assets.
- `NoordTune_Logo_Kompletny_Pakiet.zip` was not committed.
- No PDF, EPS, AI, PSD, TIFF, preview, print or source-package export was committed.
- `pnpm-lock.yaml` was unchanged.
- Active website source contained no reference to the legacy `/brand/noordtune-logo.png` or `/brand/noordtune-icon.png` paths.
- The legacy PNG files remained in place only because historical reports and rollback documentation still refer to them.
- The Power Catalog destination remained exactly `https://power.noordtune.nl/`.
- No Power Catalog file, route, metadata, sitemap or vehicle data changed.

## QA results

The repository does not define generic `content` or `test` scripts. The existing focused script names from `package.json` were used.

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages generated |
| `pnpm content:audit` | Pass |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:enquiry` | Pass; 11 tests |

The focused suites confirmed the supplied SVG dimensions and variants, complete icon set, manifest metadata, active component references, structured-data logo URL and dimensions, frozen Power Catalog destination, homepage/SEO invariants, and unchanged NL/EN/PL enquiry composition behavior.

## Production deployment

Vercel created Production deployment `6845240100` for merge commit `3b201bf61191dc835ffc5a00c807104344674f15`.

- Status: `success`
- Description: `Deployment has completed`
- Deployment URL: `https://noordtune-1izm2rvnn-bartekkolek1098s-projects.vercel.app`

Live verification against `https://www.noordtune.nl/nl` confirmed:

- the page and all 11 approved web assets return HTTP 200;
- header, mobile-menu and footer code use the official dark logo;
- the live HTML references the stable schema logo URL;
- favicon, Apple icon and manifest metadata are present;
- the manifest uses `#111111` and declares the 192×192 and 512×512 Android icons;
- the Power Catalog destination remains exactly `https://power.noordtune.nl/`.

## Final scope confirmation

The official dark logo, icon package, manifest, theme color and structured-data logo are now on `main`. `pnpm-lock.yaml` remained unchanged. No service worker, PWA behavior, dependency upgrade, content change, contact/appointment behavior change, DNS change, domain change or Vercel project-setting change was introduced. `power.noordtune.nl` was not modified.
