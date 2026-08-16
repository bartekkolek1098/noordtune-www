# Homepage Results Cleanup Production QA Report

Date: 2026-08-16  
Production URL: https://www.noordtune.nl  
Repository: `bartekkolek1098/noordtune-www`  
Production code merge: `c088a4c45e58b617a8d75cf5080bdef330c45aa8`  
Latest `main` tested: `25eb439`

## Result

Production QA passed. The homepage/results cleanup is clean in production and no blocker or hotfix was identified.

## Homepage

The following pages were tested:

- `/nl`
- `/en`
- `/pl`

Each homepage renders exactly three featured customer results in this order:

1. Audi A4 B7 2.0 TDI Stage 2+
2. BMW X3 E83 2.0d Stage 1
3. Toyota ProAce Verso VIP 2.0D Stage 1 Comfort Power

All seven published results are not rendered on the homepage. The localized section heading, introduction and archive CTA are present in Dutch, English and Polish. Each CTA points to the correct localized archive, and each featured card points to its correct localized result detail route.

## Results Archives

The following pages were tested:

- `/nl/resultaten`
- `/en/results`
- `/pl/rezultaty`

Each archive displays all seven published real customer results and the correct localized result count. Category and service tags are localized, remain inside their cards and wrap without overlap. Demo/example cards are not visible.

A source diff check confirmed that the cleanup merge did not alter technical figures, privacy fields, publication states or indexability for existing customer results.

## Routes And Sitemap

Production HTTP checks confirmed:

- all 21 localized published customer-result detail routes return HTTP 200;
- four representative demo result routes return HTTP 404;
- `/sitemap.xml` returns HTTP 200;
- all 21 published/indexable result routes are present in the sitemap;
- checked demo result slugs are excluded from the sitemap.

## Responsive QA

The localized homepages and archives were checked across 42 page/viewport combinations:

- `390x844`
- `430x932`
- `768x1024`
- `820x1180`
- `1024x768`
- `1180x820`
- `1440x1000`

Results:

- no horizontal overflow;
- no overlapping result cards or tags;
- localized archive CTA text fits its control;
- the fixed WhatsApp control does not cover result-card links or the archive CTA;
- mobile menus open as modal overlays in NL/EN/PL;
- `aria-expanded` changes correctly;
- body scrolling is locked while a menu is open and restored after close;
- no browser console errors were recorded.

## Power Catalog Regression

The Dutch Power Catalog section was rechecked at `768x1024`, `820x1180`, `1024x768` and `1180x820`.

- `RDW`, `Stage 1-3+`, `DSG / TCU` and `Advies` are readable and do not overlap;
- the long Dutch heading remains within its available width;
- the section causes no horizontal overflow;
- all Power Catalog links point to `https://power.noordtune.nl/`.

All checked WhatsApp links point to `https://wa.me/31685759600`.

## Local QA

The default shell `pnpm` wrapper could not locate `node`, so the commands were run with the bundled Codex Node/pnpm runtime on `PATH`.

| Command | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 126 pages generated |
| `pnpm content:audit` | Passed |

## Scope Confirmation

- Only this QA report was added during the production QA pass.
- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- No customer result was removed, unpublished or edited.
