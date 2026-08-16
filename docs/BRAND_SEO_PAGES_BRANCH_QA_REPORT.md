# Brand SEO Pages Branch QA Report

Date: 2026-08-16  
Branch tested: `feature/brand-seo-pages`  
Local production server: `http://127.0.0.1:3025`

## Route result

All 15 new brand routes returned HTTP 200 in the local production build:

- NL: BMW, Audi, Volkswagen, Ford and Toyota.
- EN: BMW, Audi, Volkswagen, Ford and Toyota.
- PL: BMW, Audi, Volkswagen, Ford and Toyota.

All 21 existing localized public customer-result routes also returned HTTP 200. Sample demo routes in NL, EN and PL returned HTTP 404.

## SEO result

- Canonical metadata: present.
- Open Graph image metadata: present and local.
- FAQPage JSON-LD: present.
- BreadcrumbList JSON-LD: present.
- LocalBusiness/AutoRepair JSON-LD: present.
- Sitemap: all 15 localized brand routes present.
- Language switching: preserves the equivalent brand route in NL/EN/PL.

The extended content audit verifies unique static brand routes, required metadata, local images, content depth, FAQs, localized CTAs, Polish diacritics and public-result references.

## Content quality review

The Dutch pages are the strongest and most detailed. English and Polish are complete natural-language adaptations. Pages use different brand-specific intents and proof:

- BMW focuses on ECU/TCU coordination.
- Audi focuses on hardware-aware Stage 2 decisions.
- Volkswagen separates ECU remap, TCU and ECU service/cloning.
- Ford focuses on daily load, EcoBlue diagnostics and careful legal wording.
- Toyota focuses on Comfort Power and active emissions systems in the approved case.

No unsupported ECU, engine-family or guaranteed-gain claims were added. DPF/EGR/AdBlue and hardware wording consistently requires diagnosis, vehicle context and legal suitability.

## Responsive and browser QA

Tested viewport/page combinations:

- 390x844: Polish BMW page.
- 768x1024: English Audi page.
- 820x1180: Dutch Volkswagen page.
- 1024x768: Polish Ford page.
- 1440x1000: Dutch Toyota page.

Results:

- no horizontal overflow or out-of-bounds elements;
- hero text, breadcrumbs and CTA labels wrap correctly;
- result proof images use `object-contain` and keep their graphic composition;
- no browser console errors;
- mobile language controls remain usable;
- Power Catalog at 820px remained inside its section with RDW, Stage 1-3+, DSG/TCU and Advies labels separated and readable;
- homepage regression check: exactly three result cards in NL/EN/PL;
- archive regression check: seven published cards remain visible.

## Command results

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed; 141 static pages generated.
- `pnpm content:audit`: passed.

## Changed behavior

- Added 15 public brand pages.
- Added compact brand discoverability to the Chiptuning page.
- Added contextual brand links to matching real results and relevant article related-link blocks.
- Added brand pages to sitemap and structured metadata.

No homepage content, blog article body, result data or Power Catalog implementation was changed.

## Recommendation

The branch is technically ready for Vercel preview and owner review. Before merge, the owner should visually review one page per language, confirm brand tone and legal nuance, and check that the selected real-result proof accurately represents the desired marketing emphasis.

