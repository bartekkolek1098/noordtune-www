# Customer Results Batch 2026-08 Branch QA

## Branch

`feature/add-customer-results-batch-2026-08`

Base: latest `origin/main` at the time the branch was created.

## Automated checks

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 111 static/server routes generated |
| `pnpm content:audit` | Passed |

Node was supplied through the bundled Codex runtime because `node` was not present on the default shell `PATH`. The repository's pinned pnpm lockfile was used.

## Route QA

- Three result listing routes returned HTTP 200.
- All 15 new localized result routes returned HTTP 200.
- Existing BMW X3 and Audi A4 routes returned HTTP 200.
- `/power` returned HTTP 404 on the main site.
- Four NL demo detail routes returned HTTP 404.
- All five main image URLs returned HTTP 200.

## Listing QA

The NL, EN and PL listings show seven real published results: the five new projects plus BMW X3 and Audi A4. Demo cards are hidden. Labels remain localized as `Klantresultaat`, `Customer result` and `Realizacja klienta`.

## Sitemap and SEO QA

- All 15 localized routes are present in `/sitemap.xml`.
- Demo result slugs are absent.
- Each result uses localized metadata, canonical URL, Open Graph image and Article/Vehicle JSON-LD.
- Main and OG images are local public assets.

## CTA and language QA

- Power Catalog URL: `https://power.noordtune.nl/`
- WhatsApp URL: `https://wa.me/31685759600`
- Polish result pages contain localized CTA labels and correct Polish diacritics.
- No English Power Catalog CTA leftovers were found on Polish pages.

## Visual QA

Browser checks were completed at 1440 x 1200 and 390 x 844.

- Seven real cards render in a clean three-column desktop grid.
- Promotional graphics remain legible and are displayed with `object-contain`.
- Portrait VW graphics remain fully visible on mobile.
- BMW F40 TCU displays TCU-specific metrics instead of fake power figures.
- A mobile overflow caused by the long TCU software identifier was found and fixed with `min-width: 0` and safe word wrapping.
- Final mobile pages have no horizontal overflow.
- No visible broken images or browser console errors remained.

## Safety result

- Unknown torque, transmission and ECU values were not invented.
- Visible plates are limited to owner-approved graphics.
- No full VIN or private customer data appears in the added content.
- Customer-result demo routes remain private and non-indexable.

## Recommendation

The branch is technically ready for owner review. Before merge, the owner should visually approve all five listing thumbnails and detail-page graphics, confirm the stated values, and accept the retained wording inside the supplied promotional graphics.

`power.noordtune.nl` and all excluded future systems were not modified.
