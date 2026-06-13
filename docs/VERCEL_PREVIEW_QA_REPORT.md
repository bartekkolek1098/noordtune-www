# Vercel Preview QA Report

Preview URL: `https://noordtune-www.vercel.app`  
Owner checked: `https://noordtune-www.vercel.app/pl`  
QA date: `2026-06-13`

## Routes Tested

Live HTTP checks returned `200`:

- `/nl`
- `/en`
- `/pl`
- `/nl/chiptuning`
- `/nl/auto-diagnose`
- `/nl/diensten`
- `/nl/prijzen`
- `/nl/resultaten`
- `/nl/blog`
- `/nl/over-ons`
- `/nl/contact`
- `/nl/afspraak`
- `/sitemap.xml`
- `/robots.txt`

Expected negative check:

- `/power` returns `404`

## Browser QA

Desktop browser checks covered:

- Dutch, English and Polish home pages
- Dutch service pages
- Contact and appointment pages
- Open Graph metadata
- canonical URLs
- LocalBusiness/AutoRepair JSON-LD
- FAQ JSON-LD where relevant
- floating WhatsApp link visibility
- Power Catalog link correctness
- WhatsApp link correctness
- console errors
- horizontal overflow

Result:

- Pages loaded successfully.
- No console errors were detected.
- Desktop overflow check passed.
- Open Graph metadata exists.
- Canonical URLs point to `https://www.noordtune.nl`.
- JSON-LD exists.
- Polish content contains proper diacritics.

## Mobile QA

Mobile checks were run at a narrow mobile viewport.

Findings:

- Floating WhatsApp is visible and links to `https://wa.me/31685759600`.
- Mobile menu opens and includes localized Polish navigation and WhatsApp CTA.
- Polish text contains proper diacritics.
- A mobile header overflow issue was found on the live preview: the compact header language switcher plus hamburger exceeded the viewport on `/pl`.

Fix added:

- The header logo now scales smaller on narrow mobile widths.
- The header language switcher has a compact mobile mode.
- Language labels are hidden below very narrow widths while flags remain visible.

Post-deploy verification:

- `/pl` mobile was rechecked on the updated Vercel preview.
- `html.lang` resolves to `pl`.
- Horizontal overflow is no longer present.
- Floating WhatsApp remains visible.
- Polish diacritics are present.
- Mobile menu opens without horizontal overflow.

## Language QA

The language switcher is structurally correct and maps equivalent routes through `src/content/site.ts`.

Issue found:

- The live preview DOM had `html lang=\"nl\"` on `/en` and `/pl`.

Fix added:

- A small early root-layout script sets `document.documentElement.lang` from the first URL segment (`nl`, `en`, or `pl`) with Dutch fallback.

## Link Audit

Power Catalog:

- All application Power Catalog CTAs use `https://power.noordtune.nl/`.
- No local `/power` route exists.
- `/power` returns `404`.

WhatsApp:

- All WhatsApp CTAs use `https://wa.me/31685759600`.

## Redirect Strategy Summary

Created:

- `docs/REDIRECT_STRATEGY.md`

Implemented safe redirects in `next.config.ts`:

- old Dutch public page slugs to the matching `/nl/...` routes
- observed Stage 1/Stage 2 and emissions-diagnosis WordPress slugs to matching Dutch SEO/service pages
- obvious English/Polish legacy slugs to the current language routes
- old `/tuning-resultaten/:path*` vehicle/catalog traffic to `https://power.noordtune.nl/`

Not redirected:

- `/power`
- `/content-templates/:path*`
- `/wp-admin/:path*`
- `/wp-content/:path*`

## Production Readiness

The preview is approved in direction by the owner. This pass adds the remaining pre-production safety work:

- redirect strategy
- redirect implementation
- live preview QA report
- mobile overflow fix
- locale `html.lang` fix

Production domain is not connected yet.

## Remaining Manual Checks

Before connecting `www.noordtune.nl`:

- Wait for the next Vercel preview deployment from this commit.
- Re-check `/pl` mobile header on a real phone.
- Test a sample old URL on the preview deployment:
  - `/chiptuning`
  - `/stage-1-chiptuning`
  - `/tuning-resultaten/abarth-500-abarth-eu-1-4-t-jet-135/`
- Confirm legal pages with the owner.
- Confirm DNS cutover timing.

## Recommendation

Ready for final owner preview review.

Do not connect `www.noordtune.nl` until the updated preview is visually checked once more.
