# Redirect Strategy

Repository: `https://github.com/bartekkolek1098/noordtune-www`  
Preview checked: `https://noordtune-www.vercel.app`  
Prepared: `2026-06-13`

## Goal

When `www.noordtune.nl` moves from the previous WordPress site to the new Next.js website, old public URLs should not become unnecessary 404s. The redirect strategy must preserve useful traffic while keeping the main website separate from:

- the existing Power Catalog at `https://power.noordtune.nl/`
- WordPress backup/admin paths
- future file service paths

Do not redirect everything blindly to the homepage. Only stable, known public URLs should redirect.

## WordPress Export Findings

Reference checked:

- `/Users/bartk/Downloads/noordtune.WordPress.2026-06-09.xml`

Observed URL patterns:

- Public service/content slugs such as `/chiptuning/`, `/auto-diagnose/`, `/stage-1-chiptuning/`, `/stage-2-chiptuning/`, `/adblue-nox-diagnose/`, `/egr-dpf-diagnose/`, `/veelgestelde-vragen/`, `/voorwaarden-disclaimer/`.
- English and Polish public slugs such as `/en/tuning-results/`, `/en/online-fileservice/`, `/pl/wyniki-chiptuningu/`, `/pl/fileservice-online/`, `/pl/kontakt/`.
- Large published vehicle/catalog result set under `/tuning-resultaten/...`.
- Internal content template URLs under `/content-templates/...`.
- WordPress upload asset URLs under `/wp-content/uploads/...`.

## Implemented Redirects

Stable old public page redirects:

- `/chiptuning` -> `/nl/chiptuning`
- `/auto-diagnose` -> `/nl/auto-diagnose`
- `/diensten` -> `/nl/diensten`
- `/prijzen` -> `/nl/prijzen`
- `/resultaten` -> `/nl/resultaten`
- `/blog` -> `/nl/blog`
- `/nieuws-blog` -> `/nl/blog`
- `/nieuws` -> `/nl/blog`
- `/over-ons` -> `/nl/over-ons`
- `/contact` -> `/nl/contact`
- `/afspraak` -> `/nl/afspraak`

Observed WordPress service redirects:

- `/stage-1-chiptuning` -> `/nl/stage-1-tuning`
- `/stage-2-chiptuning` -> `/nl/stage-2-tuning`
- `/adblue-nox-diagnose` -> `/nl/adblue-storing`
- `/egr-dpf-diagnose` -> `/nl/dpf-storing`
- `/voorwaarden-disclaimer` -> `/nl/algemene-voorwaarden`
- `/veelgestelde-vragen` -> `/nl/contact`

Language redirects:

- `/en/tuning-results` -> `/en/results`
- `/en/online-fileservice` -> `/en/contact`
- `/pl/contact` -> `/pl/kontakt`
- `/kontakt` -> `/pl/kontakt`
- `/pl/wyniki-chiptuningu` -> `/pl/rezultaty`
- `/pl/fileservice-online` -> `/pl/kontakt`

Vehicle/catalog result redirects:

- `/tuning-resultaten` -> `https://power.noordtune.nl/`
- `/tuning-resultaten/:path*` -> `https://power.noordtune.nl/`

## Vehicle Catalog Recommendation

Old WordPress vehicle pages under `/tuning-resultaten/...` were published catalog-like pages. The new main website must not rebuild vehicle data, RDW lookup, or Stage 1/2/3 logic. The best safe redirect is therefore:

`/tuning-resultaten/:path*` -> `https://power.noordtune.nl/`

This sends old vehicle-result traffic to the existing dedicated Power Catalog, where that intent belongs, instead of sending users to a generic marketing page.

The main site still keeps `/power` as `404` to avoid creating a second catalog route.

## Paths Intentionally Not Redirected

Internal or admin-like paths should not be exposed or preserved:

- `/content-templates/:path*`
- `/wp-admin/:path*`
- `/wp-content/:path*`

Recommended handling: keep these as 404 unless a specific public asset is still needed later. Do not redirect these paths to the homepage.

## Production Notes

- Redirects are implemented in `next.config.ts`.
- Redirects are permanent because these old public URLs should move to stable new locations.
- Locale routes, `/sitemap.xml`, and `/robots.txt` must remain unaffected.
- `power.noordtune.nl` remains a separate app.
