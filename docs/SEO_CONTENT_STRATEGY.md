# SEO Content Strategy

Project: NoordTune.nl main website  
Date: 2026-06-12  
Scope: custom Next.js marketing website only

## Positioning

NoordTune.nl should rank and convert as a technical, premium local chiptuning and auto diagnostics specialist in Assen. The content should feel more precise than a generic tuning website: no exaggerated power promises, no copied competitor copy, and no public advertising of illegal emissions removal.

Core themes:

- Maatwerk ECU remap per voertuig, motor, transmissie and use case
- Diagnose vooraf where needed
- Safe margins and realistic performance gains
- Stage 1 and Stage 2 explained clearly
- Auto diagnose Assen, live data and loganalyse
- DPF / EGR / AdBlue storing analyse with careful legal wording
- DSG / TCU tuning as drivetrain behavior, not just power
- NoordTune Power Catalog as the branded starting point
- Assen, Drenthe, Groningen and Noord-Nederland service area

## Primary Keywords

Use naturally, not stuffed:

- chiptuning Assen
- chiptuning Drenthe
- chiptuning Groningen
- ECU remap Assen
- auto diagnose Assen
- Stage 1 tuning
- Stage 2 tuning
- DPF storing
- EGR storing
- AdBlue storing
- DSG tuning
- TCU tuning
- BMW chiptuning
- Audi chiptuning
- Volkswagen chiptuning
- Mercedes chiptuning

## Implemented Dutch SEO Landing Pages

These are real routes and included in the sitemap:

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

Each implemented page includes:

- Unique metadata title and description
- Unique H1 hero copy
- Three editorial content sections
- FAQ block
- Power Catalog CTA
- WhatsApp CTA
- Internal links to existing relevant pages

## Prepared SEO Landing Pages

These are prepared as content topics, but not exposed as live routes yet to avoid thin pages:

- `/nl/bmw-chiptuning`
- `/nl/audi-chiptuning`
- `/nl/volkswagen-chiptuning`
- `/nl/mercedes-chiptuning`

Next step for these pages:

- Write unique Dutch body copy with a clear search intent
- Add 3-5 sections, FAQ, and related links
- Include careful legal wording for emissions-related pages
- Only publish once each page has enough value to stand alone

## Blog Model

The blog remains separate from SEO landing pages.

Detailed architecture note:

- `/Users/bartk/Documents/www.noordtune.nl/docs/BLOG_CONTENT_MODEL.md`

Content types to support:

- SEO articles: evergreen educational posts such as "Wat is chiptuning?"
- Customer results: curated cases with vehicle, stage, stock/tuned figures and disclaimers
- Social updates: future synced short posts from Facebook or manually approved updates

Important distinction:

- SEO articles should be intentionally written, structured, and internally linked.
- Social updates should not replace evergreen SEO content.
- Customer result pages should use indicative wording and avoid unverifiable claims.

## Power Catalog Strategy

The Power Catalog is now treated as a branded NoordTune feature across the site.

Use cases:

- Home: early trust and conversion point
- Chiptuning: check vehicle before advice
- Diensten: connect services to catalog result
- Prijzen: explain indicative pricing
- Resultaten: compare examples to vehicle-specific catalog indication
- Contact: give users a useful action before messaging

All catalog CTAs must point to:

`https://power.noordtune.nl/`

No RDW, vehicle database or stage logic should be rebuilt in the main website.

## Language Quality

Dutch remains the official primary language.

English and Polish must feel professionally written, not placeholder translations.

The latest cleanup pass focused on removing mixed-language CTA labels, improving Polish idiom, and ensuring the Polish pages use proper UTF-8 diacritics instead of ASCII approximations.

Polish requirements:

- Use UTF-8 Polish characters: `ą, ć, ę, ł, ń, ó, ś, ź, ż`
- Avoid ASCII Polish such as `Wiecej`, `Wyslij`, `Otworz`, `zamowienie`
- Avoid English CTA leftovers on Polish pages
- Use natural Polish terms:
  - `diagnostyka samochodowa`
  - `katalog mocy`
  - `oprogramowanie`
  - `analiza usterek`
  - `rozwiązania zgodne z przepisami`

Content QA:

- `pnpm content:audit` checks common Polish accent mistakes, mixed CTA labels and UTF-8 validity.
- Final CTA labels are localized in one reusable component to avoid duplicated or mixed-language bottom CTAs.
- The Power Catalog copy is localized separately for Dutch, English and Polish.

## Competitor Research

Reference research is documented in:

- `/Users/bartk/Documents/www.noordtune.nl/docs/COMPETITOR_CONTENT_RESEARCH.md`

That research was used only for service-page structure, FAQ ideas and customer-objection mapping. No competitor text was copied or sentence-by-sentence paraphrased.

## Legal Copy Rules

Allowed public wording:

- storing analyse
- diagnose
- advies op maat
- software-oplossingen waar wettelijk toegestaan
- afhankelijk van voertuig, gebruik and regelgeving

Avoid:

- Generic claims that DPF/EGR/AdBlue removal is a public service
- Guarantees of exact power results
- Claims that imply emission-system modifications are always legal

## Logo And Image Replacement

Current logo files:

- `/public/brand/noordtune-logo.png`
- `/public/brand/noordtune-icon.png`

Replacement rule:

- Use transparent PNG or SVG only.
- Do not use white-background logo exports.
- Keep the same file paths when possible to avoid component changes.

Current image assets:

- `/public/images/heroes/*`
- `/public/images/sections/*`

The latest visual pass added safe local generated SVG placeholders for:

- ECU tuning laptop
- Diagnostic tablet
- Turbo / engine detail
- Workshop lift
- Dyno / logging graph
- Customer result visual
- Power Catalog interface visual

Future image improvement:

- Add distinct ECU, diagnostics tablet, laptop logging, turbo, workshop and dyno-style visuals.
- Keep all assets licensed, generated, owned, or explicitly approved.
