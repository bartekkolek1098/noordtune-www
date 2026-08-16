# Blog Buyer Decision Branch QA Report

Date: 2026-08-16  
Branch tested: `feature/blog-buyer-decision-batch`  
Local production URL: `http://127.0.0.1:3027`

## Command results

| Command | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 126 static pages generated |
| `pnpm content:audit` | Passed |

## Route QA

- All 15 new localized article routes returned HTTP 200.
- `/nl/blog`, `/en/news-blog` and `/pl/aktualnosci-blog` returned HTTP 200.
- Every new card link was present on the matching localized blog index.
- Existing BMW X3 and Audi A4 customer result routes returned HTTP 200.
- No customer result source file changed in this branch.

## SEO QA

- Sitemap contains exactly the 15 expected new localized article URLs.
- Every tested article has a title, meta description, canonical URL, Open Graph title and Open Graph image.
- Every tested article renders Article JSON-LD and FAQPage JSON-LD.
- Every tested article has at least one Power Catalog link to `https://power.noordtune.nl/`.
- Every tested article has at least one WhatsApp link to `https://wa.me/31685759600`.

## Image QA

- All five local WebP URLs returned HTTP 200.
- Browser QA found no broken images on any of the 15 article pages.
- Image dimensions are 1672 x 941 px; file sizes are approximately 72-122 KB.
- Images contain no private customer information and are not externally hotlinked.
- Localized article image alt text is used by the page and Open Graph metadata.

## Language and content QA

- Dutch articles contain six practical sections and four FAQ items each.
- English and Polish articles contain five practical sections and at least three FAQ items each.
- The Polish locale audit passed, including diacritics and CTA-language checks.
- The APK article avoids legal guarantees and public advertising of emissions-system removal.
- Performance, fuel-saving and suitability guarantees are explicitly avoided.

## Browser QA

Playwright checked all 15 articles and all three blog indexes in the production build. The checks covered:

- HTTP response and card targets;
- metadata, Open Graph and JSON-LD;
- CTA destinations;
- image loading and browser console errors;
- horizontal overflow on the three localized blog indexes at 390 x 844.

Result: passed. No browser console errors or horizontal overflow were found.

## Owner review recommendation

The branch is technically ready for owner review. Before merge, the owner should read at least the Dutch APK, pricing and fuel-consumption articles, then spot-check the English and Polish versions for preferred tone. No technical blocker remains.

## Scope confirmation

- `power.noordtune.nl` was not modified.
- Customer results were not changed.
- Booking, Facebook API sync and file service were not implemented.
- Production/domain settings were not changed.

