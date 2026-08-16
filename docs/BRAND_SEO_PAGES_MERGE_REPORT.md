# Brand SEO Pages Merge Report

Date: 2026-08-16  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/12  
Source branch: `feature/brand-seo-pages`  
Target branch: `main`

## Merge result

PR #12 was marked ready for review and squash merged into `main` after owner approval and a clean pre-merge audit.

Merge commit on `main`:

`38986100a5d93a0c75022d3ac96cb448ff3a19ed`

The source branch was retained for the production-QA window.

## QA results

Pre-merge and post-merge checks passed:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build` — 141 static pages generated
- `pnpm content:audit`

The PR was `MERGEABLE` with a `CLEAN` merge state and was 0 commits behind `main` before the squash merge.

## Route results

- 15/15 localized BMW, Audi, Volkswagen, Ford and Toyota brand routes returned HTTP 200 locally before merge.
- 15/15 brand routes returned HTTP 200 on `https://www.noordtune.nl` after deployment.
- 21/21 localized real customer-result routes returned HTTP 200 before merge.
- Sample NL/EN/PL demo result routes returned HTTP 404.
- Homepage regression: exactly 3 featured results in NL, EN and PL.
- Results archive regression: all 7 published results in NL, EN and PL.

## Sitemap and structured data

- All 15 brand routes are present in the local and production sitemap.
- Canonical URLs and localized alternates are present.
- Open Graph metadata uses approved local images.
- FAQPage JSON-LD is present.
- BreadcrumbList JSON-LD is present.
- LocalBusiness/AutoRepair JSON-LD is present.

## Real-result linking

Brand pages link only to matching published results:

- BMW: BMW X3 Stage 1 and BMW F40 7DCT300 TCU tuning.
- Audi: Audi A4 B7 Stage 2+.
- Volkswagen: VW Caddy Stage 1 and VW Transporter ECU cloning/Stage 1.
- Ford: Ford Transit Connect EcoBlue Stage 1.
- Toyota: Toyota ProAce Verso Comfort Power.

No customer-result technical figures, privacy fields, publication states or indexability settings were changed. No unsupported technical values were introduced.

## Responsive result

Browser QA passed at 390, 768, 820, 1024 and 1440 px. No horizontal overflow or out-of-bounds content was detected. The iPad Power Catalog regression check at 820 px passed: RDW, Stage 1-3+, DSG/TCU and Advies remained separated, readable and inside the section. Browser console logs were empty.

## Link safety

- Power Catalog remains `https://power.noordtune.nl/`.
- WhatsApp remains `https://wa.me/31685759600`.
- No local `/power` implementation was added.

## Deployment

Vercel production deployment completed successfully for the merge commit.

Deployment dashboard:

https://vercel.com/bartekkolek1098s-projects/noordtune-www/8caLmeJXUsHQQG6gFgddpCvvvTLm

## Scope confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file-service implementation was added.
- No production-domain settings were changed.
- No additional brands were published.

