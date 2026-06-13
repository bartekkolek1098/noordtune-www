# Visual QA Report

Project: NoordTune.nl main Next.js marketing website  
QA date: 2026-06-12  
Local URL: `http://127.0.0.1:3001`  
Screenshot command: `pnpm screenshots`  
Desktop viewport: `1440x1200`  
Mobile viewport: `390x1200`
Latest cleanup pass: language, CTA and UI polish
Latest pre-deploy polish pass: image variety, mobile rhythm, footer polish and next SEO batch

## Scope

This QA covers the standalone main website in:

`/Users/bartk/Documents/www.noordtune.nl`

Not touched:

- Existing power catalog app: `/Users/bartk/Documents/power.noordtune.nl`
- WordPress backup/reference files
- Deployment

## Routes Tested

### Dutch

- `/nl`
- `/nl/chiptuning`
- `/nl/auto-diagnose`
- `/nl/diensten`
- `/nl/prijzen`
- `/nl/resultaten`
- `/nl/blog`
- `/nl/over-ons`
- `/nl/contact`
- `/nl/afspraak`
- `/nl/privacybeleid`
- `/nl/algemene-voorwaarden`

### English

- `/en`
- `/en/chiptuning`
- `/en/car-diagnostics`
- `/en/services`
- `/en/pricing`
- `/en/results`
- `/en/news-blog`
- `/en/about`
- `/en/contact`
- `/en/appointment`
- `/en/privacy-policy`
- `/en/terms`

### Polish

- `/pl`
- `/pl/chiptuning`
- `/pl/diagnostyka-samochodowa`
- `/pl/uslugi`
- `/pl/cennik`
- `/pl/rezultaty`
- `/pl/aktualnosci-blog`
- `/pl/o-nas`
- `/pl/kontakt`
- `/pl/termin`
- `/pl/polityka-prywatnosci`
- `/pl/regulamin`

### Dutch SEO Landing Pages

- `/nl/chiptuning-assen`
- `/nl/chiptuning-drenthe`
- `/nl/chiptuning-groningen`
- `/nl/auto-diagnose-assen`
- `/nl/stage-1-tuning`
- `/nl/stage-2-tuning`
- `/nl/ecu-remap`
- `/nl/dsg-tcu-tuning`
- `/nl/loganalyse`
- `/nl/dpf-storing`
- `/nl/egr-storing`
- `/nl/adblue-storing`

## Screenshot Files Generated

Desktop:

- `docs/qa-screenshots/desktop/desktop-home.png`
- `docs/qa-screenshots/desktop/desktop-chiptuning.png`
- `docs/qa-screenshots/desktop/desktop-auto-diagnose.png`
- `docs/qa-screenshots/desktop/desktop-diensten.png`
- `docs/qa-screenshots/desktop/desktop-prijzen.png`
- `docs/qa-screenshots/desktop/desktop-resultaten.png`
- `docs/qa-screenshots/desktop/desktop-blog.png`
- `docs/qa-screenshots/desktop/desktop-over-ons.png`
- `docs/qa-screenshots/desktop/desktop-contact.png`

Mobile:

- `docs/qa-screenshots/mobile/mobile-home.png`
- `docs/qa-screenshots/mobile/mobile-chiptuning.png`
- `docs/qa-screenshots/mobile/mobile-auto-diagnose.png`
- `docs/qa-screenshots/mobile/mobile-diensten.png`
- `docs/qa-screenshots/mobile/mobile-prijzen.png`
- `docs/qa-screenshots/mobile/mobile-resultaten.png`
- `docs/qa-screenshots/mobile/mobile-blog.png`
- `docs/qa-screenshots/mobile/mobile-over-ons.png`
- `docs/qa-screenshots/mobile/mobile-contact.png`

## Rendering Checks

Pass:

- All screenshot routes returned HTTP `200`.
- `/nl/blog` is now the active Dutch blog route.
- CSS loads correctly after a clean devserver restart.
- In-app browser check confirms dark body styling, loaded stylesheet, H1 present and full desktop nav present.
- Root `/` redirects to `/nl` by default.
- `Accept-Language: en` redirects root to `/en`.
- `noordtune_locale=pl` cookie redirects root to `/pl`.
- Polish content audit passes for common missing diacritics and mixed-language CTA labels.

## Desktop Issues Found

Fixed:

- Full desktop navigation is visible at `1440px`.
- Header no longer shows only flags plus hamburger on desktop.
- Homepage hero content now sits inside the centered content grid instead of touching the viewport edge.
- Logo presence was increased slightly on desktop and mobile without introducing a white-background asset.
- Single-card sections on pricing, results and contact were replaced with richer split layouts.
- Footer now has stronger hierarchy, social row and service-area block.
- Power Catalog now appears as a branded feature section across key pages.
- Dutch blog route mismatch was resolved by using `/nl/blog`.
- Final CTA is now one reusable localized block per page; the previous duplicated footer CTA was removed.
- Floating WhatsApp action is available on main pages without changing catalog or booking behavior.
- Added distinct local SVG visuals for ECU/laptop, diagnostics tablet, turbo/engine, workshop lift, dyno/logging, customer result and Power Catalog contexts.

Remaining:

- Logo is sharp and transparent, but could still be made more dominant if the final brand asset allows it.
- Imagery is safe and local, but still relies on a limited set of generated assets. More unique ECU, dyno, turbo and diagnostic-detail images would improve final polish.
- Some long pages remain dense; this is acceptable for SEO but should be watched on mobile.

## Mobile Issues Found

Fixed:

- Header remains compact with logo, flags and hamburger.
- No horizontal overflow visible in the captured pages.
- Power Catalog and rich split sections stack cleanly.
- Footer remains readable and better organized than the previous QA pass.
- Mobile section spacing and large heading sizes were tightened for long pages.

Remaining:

- Homepage is long on mobile because it contains strong SEO and conversion content.
- Repeated dark/red imagery is still visible when stacked vertically.
- The Power Catalog heading is intentionally bold; it may be tuned smaller later if it feels too forceful on very small devices.
- Floating WhatsApp button respects the safe-area inset; keep watching bottom-right overlap during final real-device QA.

## Logo Quality Check

Pass with minor note.

- Uses transparent local logo asset.
- No white-background logo is used.
- File to replace later: `/public/brand/noordtune-logo.png`.
- Icon file to replace later: `/public/brand/noordtune-icon.png`.

## Header Check

Pass.

- Desktop at `1440px` shows logo, full nav, language switcher and no hamburger.
- WhatsApp phone CTA is hidden until extra-wide screens to preserve spacing.
- Mobile/tablet keeps language switcher and hamburger.

## Hero Check

Pass.

- Heroes keep the premium dark automotive style with red performance accents.
- Subpages have distinct safe local visuals.
- Home hero remains the strongest visual match to the references.

## Card Spacing Check

Pass.

- Pricing "Waarom vanaf-prijzen?" is now a rich split layout.
- Results intro is now a split layout with stats and related links.
- Contact service area is now a split layout with service stats and CTAs.
- Cards remain sharp bordered and consistent.

## Image Quality Check

Pass with future improvement.

- No random copyrighted internet images were added.
- Current assets are local project assets and safe generated SVG placeholders.
- Image roles are more differentiated across ECU, diagnostics, turbo, lift, logging, results and catalog sections.
- More unique realistic assets should be added before final launch if available.

## Footer Check

Pass.

- Footer now includes a stronger brand column, contact block, quick links, social row and service area.
- Visual hierarchy is closer to the premium references.
- Social icons now include accessible labels and hover treatment.

## Language Switcher Check

Pass.

- NL / EN / PL flags are visible in header and mobile menu.
- Active state is clear.
- Click stores `noordtune_locale` cookie.
- Equivalent route is preserved for main pages.
- Dutch-only SEO pages fall back to locale home when no equivalent translation exists.
- Polish UI labels now use proper diacritics and localized CTA wording.

## WhatsApp CTA Check

Pass.

All WhatsApp CTAs point to:

`https://wa.me/31685759600`

Floating WhatsApp button:

- Desktop: bottom right as a compact icon-only premium dark/red control.
- Mobile: bottom right using `env(safe-area-inset-bottom)`.
- Contact page uses the reduced variant to limit overlap risk.

## Power Catalog CTA Check

Pass.

All catalog CTAs route through:

`https://power.noordtune.nl/`

No RDW lookup, vehicle database, tuning stage logic or local `/power` route was added to the main website.

## Overall Premium Review

The site is now materially closer to the supplied premium reference screenshots:

- Dark graphite/black visual system
- Red performance accents
- Bold condensed racing-style headings
- Full desktop nav at 1440px
- Branded Power Catalog feature
- Stronger pricing/results/contact layouts
- Single localized final CTA before the footer
- Correct Polish diacritics in primary UI and content blocks
- Floating WhatsApp access
- More premium footer
- Better Dutch SEO depth and local search structure

Still recommended before final launch:

- Add more distinct owned/generated vehicle, ECU, diagnostics and workshop images.
- Finish remaining prepared SEO pages only when each has unique high-quality copy.
- Consider a final logo asset pass if a transparent SVG becomes available.
- Review generated SVG placeholders against final brand photography when owned assets are available.

## Latest QA Commands

Pre-deploy polish pass command status:

- `pnpm lint`: pass
- `pnpm typecheck`: pass
- `pnpm build`: pass
- `pnpm content:audit`: pass
- `pnpm screenshots`: pass

Latest production build generated `54` static pages, including the next Dutch SEO batch:

- `/nl/ecu-remap`
- `/nl/dsg-tcu-tuning`
- `/nl/loganalyse`
- `/nl/dpf-storing`
- `/nl/egr-storing`
- `/nl/adblue-storing`
