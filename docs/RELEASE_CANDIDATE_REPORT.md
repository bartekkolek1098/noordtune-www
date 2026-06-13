# Release Candidate Report

Project: NoordTune.nl main website  
Date: 2026-06-12  
Local preview: `http://127.0.0.1:3001/nl`  
Scope: main marketing website only

## Scope Guard

Confirmed:

- No production deployment was performed.
- No booking logic was implemented.
- No Facebook API sync was implemented.
- No file service was implemented.
- The existing `power.noordtune.nl` app was not modified.
- The main website only links to the existing catalog at `https://power.noordtune.nl/`.

## Git And File Safety

`git status --short` result:

```text
fatal: not a git repository (or any of the parent directories): .git
```

This folder is currently not a Git repository, so there is no tracked baseline for a real changed-file diff.

Recommendation before preview deployment:

1. Initialize Git in `/Users/bartk/Documents/www.noordtune.nl`.
2. Commit the current release-candidate state.
3. Push to a new GitHub repository.
4. Connect that GitHub repository to Vercel for preview deployments.

Do not commit from Codex until explicitly approved.

Important project files and folders currently present:

- `src/app/*`
- `src/components/*`
- `src/content/*`
- `src/lib/seo.tsx`
- `public/brand/*`
- `public/images/heroes/*`
- `public/images/sections/*`
- `scripts/audit-locales.ts`
- `scripts/capture-screenshots.ts`
- `docs/*`
- `package.json`
- `pnpm-lock.yaml`

## Build Status

Required commands were run:

```text
pnpm lint          pass
pnpm typecheck     pass
pnpm build         pass
pnpm content:audit pass
pnpm screenshots   pass
```

Production build result:

- Next.js compiled successfully.
- Static generation completed successfully.
- `54` static pages generated.
- `sitemap.xml` and `robots.txt` generated.

## Route Audit Result

All requested routes returned HTTP `200` locally.

Dutch main pages:

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

English main pages:

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

Polish main pages:

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

Dutch SEO pages:

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

Unpublished brand SEO pages correctly return `404`:

- `/nl/bmw-chiptuning`
- `/nl/audi-chiptuning`
- `/nl/volkswagen-chiptuning`
- `/nl/mercedes-chiptuning`

## Link Audit Result

Pass:

- All catalog CTAs use the single configured catalog URL: `https://power.noordtune.nl/`.
- No local `/power` route exists; `/power` returns `404`.
- WhatsApp links use `https://wa.me/31685759600`.
- Footer legal links return `200` in Dutch, English and Polish.
- Language switcher preserves equivalent routes for main pages.
- Dutch-only SEO pages fall back to locale home for untranslated EN/PL variants.
- Root `/` redirects by cookie or `Accept-Language`.
- Dutch is the fallback when no supported language is detected.

Root redirect checks:

- Default `/` -> `/nl`
- `Accept-Language: en` -> `/en`
- `Accept-Language: pl` -> `/pl`
- `noordtune_locale=pl` cookie -> `/pl`

## Language Audit Result

Pass:

- `pnpm content:audit` passed.
- Rendered Polish pages do not contain `OPEN POWER CATALOG`, `MESSAGE US`, or `CHECK TUNING OPTIONS`.
- Rendered Polish pages do not contain common unaccented Polish leftovers such as `Wiecej`, `Wyslij`, `Otworz`, `Osiagi`, or `Zamowienie`.
- Rendered English pages do not contain Dutch CTA labels such as `Vermogen berekenen`, `Plan een afspraak`, `WhatsApp ons`, or `Bekijk tuningmogelijkheden`.
- Rendered Dutch pages do not contain Polish CTA labels such as `Otwórz katalog mocy`, `Napisz na WhatsApp`, `Sprawdź możliwości auta`, or `Umów wizytę`.

Manual language review is still recommended before launch, especially Polish and legal copy.

## SEO Technical Audit Result

Pass:

- `sitemap.xml` exists and returns `200`.
- `robots.txt` exists and returns `200`.
- Canonical URLs use `https://www.noordtune.nl`.
- Open Graph metadata exists.
- Open Graph image metadata exists.
- LocalBusiness JSON-LD is present as `AutoRepair`.
- FAQ JSON-LD is present where relevant.
- Dutch SEO landing pages are included in the sitemap.
- Unpublished brand SEO pages are not present in the sitemap and return `404`.

Checked sitemap includes:

- `https://www.noordtune.nl/nl/ecu-remap`
- `https://www.noordtune.nl/nl/dsg-tcu-tuning`
- `https://www.noordtune.nl/nl/loganalyse`
- `https://www.noordtune.nl/nl/dpf-storing`
- `https://www.noordtune.nl/nl/egr-storing`
- `https://www.noordtune.nl/nl/adblue-storing`

## Asset Audit Result

Pass:

- Logo files exist:
  - `public/brand/noordtune-logo.png`
  - `public/brand/noordtune-icon.png`
- Logo files are PNG RGBA assets.
- Logo replacement path is documented in `README.md`.
- Favicon/icon path exists.
- Referenced local image paths exist.
- No random external copyrighted image URLs are used in the application source.
- Current visuals are local assets and safe generated placeholders.

Remaining asset recommendation:

- Replace generated placeholders with final owned/generated workshop, ECU, diagnostics, dyno/logging and customer-result images where available.
- Use transparent SVG/PNG for the final logo if a sharper brand asset becomes available.

## Screenshot Result

`pnpm screenshots` passed.

Screenshots generated:

- `docs/qa-screenshots/desktop/desktop-home.png`
- `docs/qa-screenshots/desktop/desktop-chiptuning.png`
- `docs/qa-screenshots/desktop/desktop-auto-diagnose.png`
- `docs/qa-screenshots/desktop/desktop-diensten.png`
- `docs/qa-screenshots/desktop/desktop-prijzen.png`
- `docs/qa-screenshots/desktop/desktop-resultaten.png`
- `docs/qa-screenshots/desktop/desktop-blog.png`
- `docs/qa-screenshots/desktop/desktop-over-ons.png`
- `docs/qa-screenshots/desktop/desktop-contact.png`
- `docs/qa-screenshots/mobile/mobile-home.png`
- `docs/qa-screenshots/mobile/mobile-chiptuning.png`
- `docs/qa-screenshots/mobile/mobile-auto-diagnose.png`
- `docs/qa-screenshots/mobile/mobile-diensten.png`
- `docs/qa-screenshots/mobile/mobile-prijzen.png`
- `docs/qa-screenshots/mobile/mobile-resultaten.png`
- `docs/qa-screenshots/mobile/mobile-blog.png`
- `docs/qa-screenshots/mobile/mobile-over-ons.png`
- `docs/qa-screenshots/mobile/mobile-contact.png`

## Remaining Manual Checks

Before production launch:

- Final owner review of phone, address, opening hours and service area.
- Final legal review of privacy policy and terms.
- Final legal review of DPF / EGR / AdBlue wording.
- Native/fluent review of Polish copy.
- Fluent review of English copy.
- Final logo asset decision.
- Replace generated image placeholders with final owned imagery if available.
- Review preview deployment on real mobile devices.
- Check Lighthouse/performance on preview deployment.
- Confirm DNS plan for `www.noordtune.nl`.
- Confirm `power.noordtune.nl` DNS remains separate.

## Deployment Recommendation

Ready for preview deployment after Git/GitHub setup.

Not ready for production deployment until the remaining manual checks are complete.

## Exact GitHub Next Step

Recommended commands after approval:

```bash
cd /Users/bartk/Documents/www.noordtune.nl
git init
git add .
git commit -m "Prepare NoordTune main website release candidate"
git branch -M main
git remote add origin <new-github-repo-url>
git push -u origin main
```

Do not include unrelated folders such as:

- `/Users/bartk/Documents/power.noordtune.nl`
- WordPress backup folders
- future file service folders

## Exact Vercel Preview Deployment Steps

1. Create a new Vercel project.
2. Import the GitHub repository for `/Users/bartk/Documents/www.noordtune.nl`.
3. Framework preset: `Next.js`.
4. Install command: `pnpm install`.
5. Build command: `pnpm build`.
6. Output directory: leave as Next.js default.
7. Environment variables: none required for the current release candidate.
8. Deploy preview.
9. Review preview URL on desktop and mobile.
10. Confirm:
    - `/nl`, `/en`, `/pl`
    - `sitemap.xml`
    - `robots.txt`
    - language switcher
    - Power Catalog links
    - WhatsApp links
11. Only after preview approval, connect production domain `www.noordtune.nl`.

## Power Catalog Reminder

The power catalog must remain a separate app at:

`https://power.noordtune.nl/`

The main website must not rebuild RDW lookup, vehicle database, Stage logic, or catalog behavior.
