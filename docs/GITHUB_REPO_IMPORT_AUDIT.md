# GitHub Repository Import Audit

Repository: `https://github.com/bartekkolek1098/noordtune-www`  
Audit date: `2026-06-13`  
Audited clone path: `/tmp/noordtune-www-import-audit`  
Inspected source commit: `2bdcc43`

## Summary

The manually uploaded GitHub repository contains the complete NoordTune.nl main website project and is structured correctly for a standalone Next.js App Router deployment.

Two repository hygiene issues were found during the audit:

- `.gitignore` was missing from the manual browser upload.
- Generated QA/build artifacts were committed: `docs/qa-screenshots/` and `tsconfig.tsbuildinfo`.

These are small hygiene issues, not structural blockers. This audit update adds the missing `.gitignore` and removes the generated artifacts from the repository. The screenshot script remains available and can regenerate screenshots when needed.

Final recommendation: ready for Vercel preview deployment after this hygiene cleanup. Do not connect the production domain yet.

## Repository Structure

Required root files and folders were checked:

- `package.json`: present
- `pnpm-lock.yaml`: present
- `README.md`: present
- `.gitignore`: added by this audit
- `next.config.ts`: present
- `tsconfig.json`: present
- `tailwind.config.ts`: present
- `postcss.config.mjs`: present
- `src/`: present
- `public/`: present
- `docs/`: present
- `scripts/`: present

Important application paths were checked:

- `src/app/`: present
- `src/components/`: present
- `src/content/`: present
- `src/lib/`: present
- `src/app/[locale]/`: present
- `src/app/sitemap.ts`: present
- `src/app/robots.ts`: present
- `src/content/site.ts`: present
- `src/content/copy.ts`: present
- `src/content/seo-landings.ts`: present
- `src/lib/seo.tsx`: present
- `public/brand/`: present
- `public/images/`: present
- `public/images/heroes/`: present
- `public/images/sections/`: present
- `scripts/audit-locales.ts`: present
- `scripts/capture-screenshots.ts`: present
- `docs/RELEASE_CANDIDATE_REPORT.md`: present
- `docs/PRE_DEPLOY_CHECKLIST.md`: present
- `docs/VISUAL_QA_REPORT.md`: present
- `docs/SEO_CONTENT_STRATEGY.md`: present
- `docs/BLOG_CONTENT_MODEL.md`: present
- `docs/BOOKING_SYSTEM_PLAN.md`: present
- `docs/FACEBOOK_SYNC_PLAN.md`: present

## Nested Upload Check

The project is not nested incorrectly.

Confirmed:

- `package.json` is at the repository root.
- There is no `www.noordtune.nl/package.json` nested inside the repository.
- There is no `noordtune-www/package.json` nested inside the repository.
- There is no `src/src/` nesting.

## Unwanted File Check

The repository does not contain:

- `node_modules/`
- `.next/`
- `out/`
- `.env`
- `.env.local`
- WordPress backup folders
- `power.noordtune.nl` app files
- file service app files

The browser upload did include generated files:

- `docs/qa-screenshots/` with 18 generated screenshot PNG files, approximately 22 MB total
- `tsconfig.tsbuildinfo`, approximately 140 KB

These generated files were removed from the repository by this audit cleanup and are now covered by `.gitignore`.

## Gitignore Check

The repository now excludes:

- `node_modules/`
- `.next/`
- `out/`
- `.env`
- `.env.local`
- `.env.*`
- `.DS_Store`
- `*.log`
- common package-manager debug logs
- `tmp/`, `temp/`, `.tmp/`
- `*.tsbuildinfo`
- `docs/qa-screenshots/`

The repository does not exclude required source files such as `src/`, `public/`, `docs/`, `package.json`, `pnpm-lock.yaml`, or `README.md`.

## Clean Install And Build

The audit used the GitHub repository state from a clean clone.

Because the local shell did not have `pnpm` available, the audit used the official pnpm release asset for `pnpm@11.5.2` temporarily in `/tmp`, with the Codex Node runtime added to `PATH`.

Commands run:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
pnpm content:audit
```

Results:

- `pnpm install --frozen-lockfile`: passed
- `pnpm lint`: passed
- `pnpm typecheck`: passed
- `pnpm build`: passed
- `pnpm content:audit`: passed

Next.js build generated `54` static pages.

## Screenshot Script Check

The screenshot script exists:

```bash
scripts/capture-screenshots.ts
```

The package script exists:

```bash
pnpm screenshots
```

The script was run against a local dev server at `http://127.0.0.1:3001` and successfully regenerated all 18 QA screenshots:

- 9 desktop screenshots
- 9 mobile screenshots

Screenshots are intentionally not kept in the repository after cleanup because they are generated audit output.

## Route Check

All requested routes returned HTTP `200` locally.

Dutch:

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

English:

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

Polish:

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

Root language redirects were also checked:

- `Accept-Language: nl` redirects to `/nl`
- `Accept-Language: en` redirects to `/en`
- `Accept-Language: pl` redirects to `/pl`
- unknown language fallback redirects to `/nl`

## Link Audit

Power Catalog:

- All application CTAs use the centralized `site.catalogUrl`.
- `site.catalogUrl` is `https://power.noordtune.nl/`.
- `/power` returns `404`.
- No local Power Catalog implementation or local `/power` route exists.

WhatsApp:

- All application WhatsApp CTAs use the centralized `site.whatsappUrl`.
- `site.whatsappUrl` is `https://wa.me/31685759600`.

Language switcher:

- The language switcher uses localized route mappings from `src/content/site.ts`.
- Equivalent route preservation is structurally correct for Dutch, English and Polish page keys.
- The switcher stores the selected locale in the `noordtune_locale` cookie.

Footer legal links:

- Legal footer links use localized `privacy` and `terms` routes.
- The checked legal routes return HTTP `200`.

## SEO Audit

Generated technical SEO routes:

- `/sitemap.xml`: returns HTTP `200`
- `/robots.txt`: returns HTTP `200`

Canonical and metadata:

- Canonical URLs use `https://www.noordtune.nl`.
- Open Graph metadata is configured.
- LocalBusiness JSON-LD is present as `AutoRepair`.
- FAQ JSON-LD is present where relevant.

Sitemap:

- Dutch SEO landing pages are included in the sitemap.
- The newly added SEO pages are included:
  - `https://www.noordtune.nl/nl/ecu-remap`
  - `https://www.noordtune.nl/nl/dsg-tcu-tuning`
  - `https://www.noordtune.nl/nl/loganalyse`
  - `https://www.noordtune.nl/nl/dpf-storing`
  - `https://www.noordtune.nl/nl/egr-storing`
  - `https://www.noordtune.nl/nl/adblue-storing`

Unpublished brand SEO pages:

- `/nl/bmw-chiptuning`: `404`
- `/nl/audi-chiptuning`: `404`
- `/nl/volkswagen-chiptuning`: `404`
- `/nl/mercedes-chiptuning`: `404`
- These brand pages are not included in the sitemap.

## Content Audit

`pnpm content:audit` passed.

Confirmed:

- Polish text uses the expected UTF-8 diacritics in checked CTA/content patterns.
- Polish pages do not contain English CTA leftovers such as `OPEN POWER CATALOG`, `MESSAGE US`, or `CHECK TUNING OPTIONS`.
- English pages do not contain Dutch CTA leftovers where not intended.
- Dutch pages do not contain Polish CTA leftovers.

## Asset Audit

Brand assets:

- `public/brand/noordtune-logo.png`: present, PNG RGBA with alpha
- `public/brand/noordtune-icon.png`: present, PNG RGBA with alpha

Favicon/icon:

- `src/app/layout.tsx` references `/brand/noordtune-icon.png` for icon and Apple icon.

Image assets:

- `public/images/heroes/`: present
- `public/images/sections/`: present
- Hero images are local PNG assets.
- Section visuals are local SVG/PNG assets.

External image URLs:

- No random external copyrighted image URLs are used by the application.
- External URLs found in docs are competitor research references or deployment/contact notes, not runtime image dependencies.

## Vercel Readiness

Recommended Vercel settings:

- Framework preset: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output directory: Next.js default
- Environment variables: none required for this release candidate
- Production domain later: `www.noordtune.nl`

Do not connect the production domain yet. Use Vercel preview deployment first.

Keep `power.noordtune.nl` separate and pointed to the existing Power Catalog app.

## Remaining Manual Checks

Before production launch:

- Review the Vercel preview visually on real desktop and mobile devices.
- Confirm final logo approval.
- Confirm final image ownership/replacement plan.
- Confirm legal pages with the business owner.
- Confirm contact details and opening hours.
- Confirm Search Console and analytics plan.
- Confirm `www.noordtune.nl` DNS only after preview approval.

## Final Recommendation

Ready for Vercel preview deployment after the repository hygiene cleanup in this audit.

Not ready for production domain connection yet, by design.
