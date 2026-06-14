# Production Launch QA Report

Date: `2026-06-14`  
Production URL tested: `https://www.noordtune.nl`  
Branch used for local checks: `main`  
Commit checked locally: `06764e7`

## Recommendation

Production clean.

No launch blockers were found. No production hotfix branch was needed.

## Scope Confirmation

This QA pass did not implement new features and did not modify:

- `power.noordtune.nl`
- booking logic
- Facebook API sync
- file service
- production DNS or Vercel domain settings
- `feature/customer-results-mvp`

The customer results MVP branch was not merged.

## Core Routes

All required production routes returned `200`:

- `https://www.noordtune.nl` -> final URL `https://www.noordtune.nl/nl`
- `https://www.noordtune.nl/nl`
- `https://www.noordtune.nl/en`
- `https://www.noordtune.nl/pl`
- `https://www.noordtune.nl/nl/chiptuning`
- `https://www.noordtune.nl/nl/auto-diagnose`
- `https://www.noordtune.nl/nl/diensten`
- `https://www.noordtune.nl/nl/prijzen`
- `https://www.noordtune.nl/nl/resultaten`
- `https://www.noordtune.nl/nl/blog`
- `https://www.noordtune.nl/nl/over-ons`
- `https://www.noordtune.nl/nl/contact`
- `https://www.noordtune.nl/nl/afspraak`

## Blog / Article Routes

All checked article routes returned `200`:

- `https://www.noordtune.nl/nl/blog/wat-is-chiptuning`
- `https://www.noordtune.nl/en/news-blog/what-is-chiptuning`
- `https://www.noordtune.nl/pl/aktualnosci-blog/co-to-jest-chiptuning`

Article JSON-LD is present on checked article pages.

## Sitemap / Robots

Checked:

- `https://www.noordtune.nl/sitemap.xml` -> `200`
- `https://www.noordtune.nl/robots.txt` -> `200`

Confirmed:

- `robots.txt` contains `User-Agent: *`
- `robots.txt` points to `https://www.noordtune.nl/sitemap.xml`
- sitemap includes blog article pages
- sitemap includes published Dutch SEO landing pages
- sitemap does not include local `/power`
- sitemap does not expose unpublished brand pages:
  - `/nl/bmw-chiptuning`
  - `/nl/audi-chiptuning`
  - `/nl/volkswagen-chiptuning`
  - `/nl/mercedes-chiptuning`

## Technical SEO Metadata

Checked pages:

- `/nl`
- `/en`
- `/pl`
- `/nl/chiptuning`
- `/nl/prijzen`
- `/nl/contact`
- `/nl/blog/wat-is-chiptuning`
- `/en/news-blog/what-is-chiptuning`
- `/pl/aktualnosci-blog/co-to-jest-chiptuning`

Confirmed:

- canonical URLs use `https://www.noordtune.nl`
- Open Graph metadata exists
- Twitter card metadata exists
- `html lang` is correct for `nl`, `en` and `pl`
- LocalBusiness / AutoRepair JSON-LD exists
- FAQ JSON-LD exists where relevant
- Article JSON-LD exists on checked article pages

## Redirect Checks

Expected redirects passed:

- `/chiptuning` -> `/nl/chiptuning`
- `/contact` -> `/nl/contact`
- `/stage-1-chiptuning` -> `/nl/stage-1-tuning`
- `/stage-2-chiptuning` -> `/nl/stage-2-tuning`
- `/adblue-nox-diagnose` -> `/nl/adblue-storing`
- `/egr-dpf-diagnose` -> `/nl/dpf-storing`
- `/tuning-resultaten` -> `https://power.noordtune.nl/`
- `/tuning-resultaten/abarth-500-abarth-eu-1-4-t-jet-135` -> `https://power.noordtune.nl/`

Non-blocking redirect note:

- `/tuning-resultaten/abarth-500-abarth-eu-1-4-t-jet-135/` first receives a trailing-slash normalization redirect to `/tuning-resultaten/abarth-500-abarth-eu-1-4-t-jet-135`, then redirects to `https://power.noordtune.nl/`.
- Final redirect chain is correct and reaches the Power Catalog.

Admin/template-like paths are not exposed:

- `/power` -> `404`
- `/wp-admin` -> `404`
- `/wp-content` -> `404`
- `/content-templates` -> `404`

## Power Catalog

Confirmed:

- all checked Power Catalog CTAs point to `https://power.noordtune.nl/`
- no local `/power` links were found
- `/power` on the main website returns `404`
- `https://power.noordtune.nl/` remains separate and returns `200`, redirecting to its own `/nl` route
- the main website does not rebuild RDW, vehicle database or catalog logic

## WhatsApp

Confirmed checked WhatsApp links point to:

`https://wa.me/31685759600`

Checked link surfaces included:

- header / mobile menu
- floating WhatsApp
- footer
- article CTA
- Power Catalog section
- main content CTAs

## Language QA

Confirmed:

- root redirect respects Accept-Language:
  - Dutch -> `/nl`
  - English -> `/en`
  - Polish -> `/pl`
  - unknown/fallback -> `/nl`
- language cookie overrides Accept-Language
- language switcher navigates correctly
- language switcher stores cookie, verified with `noordtune_locale=en`
- `/nl` uses `html lang="nl"`
- `/en` uses `html lang="en"`
- `/pl` uses `html lang="pl"`
- Polish content uses proper diacritics in checked pages
- no English CTA leftovers were found on checked Polish pages
- no Dutch/Polish CTA leftovers were found on checked English pages

## Mobile QA

Checked on a `390x844` mobile viewport.

Confirmed:

- `/pl` mobile header works
- mobile menu opens as a full fixed overlay
- overlay covers the viewport
- page behind the menu does not visually mix with menu content
- body scroll lock is active while menu is open
- Escape closes the menu and restores body styles
- clicking a menu link closes the menu and navigates
- floating WhatsApp is below/behind the menu overlay
- no horizontal overflow on `/pl`
- Polish menu labels are localized:
  - `Katalog mocy`
  - `Diagnostyka`
  - `Usługi`
  - `Cennik`
  - `Rezultaty`
  - `Napisz na WhatsApp`
  - `Sprawdź możliwości auta`

## Visual QA

Checked live production pages for:

- logo sharpness and transparent background
- homepage hero layout
- pricing page
- contact page
- blog article page
- footer
- Power Catalog section
- results page
- mobile spacing

Result:

- visual direction remains premium and consistent
- no obvious layout breakage found
- no horizontal overflow found in checked desktop/mobile views
- no critical visual issue found

## Local Command Checks

`pnpm` was not available in the active shell, so equivalent local binaries were used.

Passed:

- `eslint .`
- `tsc --noEmit`
- `next build`
- `tsx scripts/audit-locales.ts`

Build result:

- Next.js build completed successfully
- 72 static pages generated

## Issues Found

No launch blockers.

One non-blocking redirect nuance:

- old `tuning-resultaten` URLs with a trailing slash first normalize the slash, then redirect to Power Catalog.
- final destination is correct.

## Final Status

Production status: clean.

It is safe to proceed to post-launch SEO setup, such as Search Console, sitemap submission, analytics and monitoring.

## Post-Launch SEO Follow-Up

Post-launch SEO setup documentation has been created:

- `docs/POST_LAUNCH_SEO_SETUP.md`
- `docs/OWNER_POST_LAUNCH_CHECKLIST.md`

Next recommended owner step:

1. Add `https://www.noordtune.nl` in Google Search Console.
2. Verify ownership.
3. Submit `https://www.noordtune.nl/sitemap.xml`.
4. Inspect the homepage, main Dutch pages, priority Dutch SEO landing pages and Dutch blog articles.

No site feature changes were made for this documentation step.
