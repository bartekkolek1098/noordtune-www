# Content Growth Audit

Date: `2026-06-14`  
Branch: `feature/content-growth-seo`  
Status: planning and draft-content preparation only

## Scope

This audit reviews the live NoordTune.nl content structure after launch and prepares the next growth phase without changing production routes. Main remains the stable production branch. This branch does not implement booking, Facebook sync, file service or power catalog logic.

## Current Content Strengths

- Strong primary Dutch pages for Home, Chiptuning, Auto Diagnose, Diensten, Prijzen, Resultaten, Blog, Over ons and Contact.
- Published Dutch SEO landing pages already cover local and service-intent searches such as chiptuning Assen, chiptuning Drenthe, ECU remap, DSG/TCU tuning, loganalyse and DPF/EGR/AdBlue storing.
- Blog architecture is separated from customer results and social updates.
- Article routes are localized for Dutch, English and Polish.
- Power Catalog is consistently positioned as the main conversion step.
- Customer result model exists and current public cards are marked as indicative examples.

## Content Gaps

- Brand-intent searches are not yet covered publicly: BMW chiptuning, Audi chiptuning, Volkswagen chiptuning and Mercedes chiptuning.
- Existing educational articles answer first-level questions, but deeper supporting articles are needed around ECU remap, automatic gearboxes, Stage 2 decision-making, log analysis and emissions-related diagnostics.
- Customer result proof is still limited to indicative examples. Real owner-approved cases should become the next trust layer.
- Service pages are solid, but some internal links can be made more intentional once new supporting articles are published.
- English and Polish versions are polished enough for launch, but future depth should remain Dutch-first and then be localized carefully.

## Weak Sections To Revisit Later

- Results page: needs real approved cases with owner-approved photos, certificate/report references and final technical notes.
- Blog index: useful now, but should later group content into knowledge base, diagnostics and aftercare.
- Brand pages: should stay draft until each page has unique technical content and at least one relevant internal link cluster.
- Contact and appointment: booking remains intentionally manual via WhatsApp; revisit only after booking MVP is scoped.

## Pages That Need More Depth

- `/nl/ecu-remap`: add stronger internal links from future "Wat is ECU remap?" article.
- `/nl/dsg-tcu-tuning`: support with an educational DSG/TCU article and automatic gearbox article.
- `/nl/loganalyse`: support with a practical log-analysis article.
- `/nl/stage-2-tuning`: support with a "Wanneer is Stage 2 verstandig?" decision article.
- `/nl/dpf-storing`, `/nl/egr-storing`, `/nl/adblue-storing`: support with careful educational content that avoids illegal emission-system claims.

## Suggested New SEO Pages

Draft-only brand pages prepared in `src/content/content-growth-drafts.ts`:

- `/nl/bmw-chiptuning`
- `/nl/audi-chiptuning`
- `/nl/volkswagen-chiptuning`
- `/nl/mercedes-chiptuning`

Recommendation: keep these pages unpublished until each has final owner review, brand-specific photos or result references, and enough unique technical detail to avoid thin SEO content.

## Suggested New Blog Articles

Draft article topics prepared in `src/content/content-growth-drafts.ts`:

- Wat is ECU remap?
- Chiptuning met automaat: waar moet je op letten?
- Wanneer is Stage 2 tuning verstandig?
- Waarom loganalyse belangrijk is vóór tuning
- DSG / TCU tuning uitgelegd
- DPF, EGR of AdBlue storing: wat nu?

English and Polish translation structures are prepared as drafts, but Dutch should be completed and owner-reviewed first.

## Suggested Future Customer Result Pages

Priority customer result candidates:

- BMW X3 E83 2.0d Stage 1, N47, Bosch EDC17, 177 pk / 350 Nm to 214 pk / 420 Nm.
- Future Facebook result posts with real vehicle photos and measured/confirmed data.
- Strong examples by category: diesel daily driver, petrol turbo, DSG/TCU case and diagnostic recovery case.

Publishing rule:

- only publish/index if the case is customer-approved, image rights are clear and content is useful beyond a thin result card.

## Suggested Internal Link Improvements

- Link Chiptuning to ECU remap, Stage 1, Stage 2, Power Catalog and selected result examples.
- Link Auto Diagnose to loganalyse, DPF storing, EGR storing, AdBlue storing and diagnostics-before-tuning article.
- Link Stage 2 to loganalyse, DSG/TCU and the future Stage 2 decision article.
- Link Blog articles back to the most relevant service page and Power Catalog.
- Link Results to Power Catalog, WhatsApp and relevant service pages, not to SEO articles unless the article directly explains the service.
- Link future brand pages to Stage 1, Stage 2, DSG/TCU, Auto Diagnose and one relevant approved customer result.

## Power Catalog CTA Improvements

Recommended wording patterns:

- Service pages: "Controleer jouw auto in de Power Catalog"
- Blog articles: "Gebruik de Power Catalog als eerste technische indicatie"
- Results pages: "Vergelijk jouw voertuig in de Power Catalog"
- Brand pages: "Controleer jouw [merk] in de Power Catalog"

All catalog CTAs must continue to point to `https://power.noordtune.nl/`.

## Recommendation

This branch should remain a content-growth preparation branch. Publish no new SEO pages until the prepared drafts are expanded, reviewed and connected deliberately to routes and sitemap.
