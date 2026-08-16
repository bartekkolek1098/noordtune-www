# Blog Buyer Decision Production QA Report

Date: 2026-08-16  
Production URL: https://www.noordtune.nl  
Commit tested: `8fe0a4f248f17372708165adbefe52c01d7453bd`

## Result

Production QA passed. The buyer-decision article batch is clean in production and no launch blocker or hotfix requirement was found.

## Routes checked

The following production routes returned HTTP 200:

- `/nl/blog`
- `/en/news-blog`
- `/pl/aktualnosci-blog`
- `/nl/blog/wat-kost-chiptuning`
- `/nl/blog/verbruikt-mijn-auto-meer-na-chiptuning`
- `/nl/blog/chiptuning-en-apk-in-nederland`
- `/nl/blog/koppelbegrenzers-in-ecu-en-tcu`
- `/nl/blog/turbo-brandstof-en-egt-uitgelegd`
- `/en/news-blog/what-does-chiptuning-cost`
- `/pl/aktualnosci-blog/ile-kosztuje-chiptuning`
- `/nl/resultaten/bmw-x3-e83-20d-stage-1`
- `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`

The Dutch, English and Polish blog indexes contain links to all five newly added localized cards. No dead batch card was found.

## Metadata and structured data

Browser QA confirmed on all five Dutch articles plus the requested English and Polish samples:

- non-empty title and meta description;
- canonical URL;
- Open Graph title and local Open Graph image;
- `AutoRepair`, `Article` and `FAQPage` JSON-LD;
- Power Catalog CTA to `https://power.noordtune.nl/`;
- WhatsApp CTA to `https://wa.me/31685759600`.

## Image result

All five production image URLs returned HTTP 200:

- `/images/blog/chiptuning-cost.webp`
- `/images/blog/fuel-consumption-after-tuning.webp`
- `/images/blog/chiptuning-apk-netherlands.webp`
- `/images/blog/ecu-tcu-torque-limiters.webp`
- `/images/blog/turbo-fuel-egt.webp`

No broken visible article image or image-related browser console error was found.

## Language QA

- The Polish sample uses `lang="pl"`.
- Polish diacritics render correctly.
- No `OPEN POWER CATALOG`, `MESSAGE US` or `CHECK TUNING OPTIONS` leftovers were found in Polish visible content.
- The locale content audit passed.

## Mobile QA

The three localized blog indexes were tested at 390 x 844. In every case `document.documentElement.scrollWidth` stayed within the viewport width. No horizontal overflow or browser console error was found.

## Sitemap

Production `https://www.noordtune.nl/sitemap.xml` returned HTTP 200 and includes all 15 expected localized URLs from this batch:

- 5 Dutch article URLs;
- 5 English article URLs;
- 5 Polish article URLs.

Result: `15/15` present.

## Local command results

The latest `main` was pulled before running the checks.

| Command | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 126 static pages generated |
| `pnpm content:audit` | Passed |

## Scope confirmation

- Only this QA report was added during the production QA pass.
- `power.noordtune.nl` was not modified.
- Customer result content was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production domain and Vercel settings were not changed.

