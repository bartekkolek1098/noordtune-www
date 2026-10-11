# Berlingo — original photographs and concise workshop case

Revision requested by the owner on 11 October 2026. Extends the existing NL business-offer/pricing feature; does not modify Power Catalog data or prices.

## Public presentation

- The localized NL/EN/PL Berlingo entry is now explicitly a workshop story, not a power-measurement report. The title, description, homepage teaser, business-offer teaser and metadata describe completed maintenance and ECU work.
- Removed the calibration-target performance panel, numerical power/torque/gain claims and repeated measurement-status warnings together. No numerical output was relabelled as a measured result. The original service dossier remains unchanged, including unresolved technical recommendations; the story makes no repair-completion or road-approval claim beyond its stated scope.
- Completed work: main timing belt and coolant pump, auxiliary drive-belt kit, service filters/coolant, Bosch MD1CS003 identification and KT200 bench read, ECU calibration work and available-data review, recorded service/follow-up advice.
- `presentation: workshop` gives the entry its own editorial labels and suppresses the performance panels. Publication guard rejects workshop entries carrying numerical performance fields or custom result metrics. Other result types and their verification panels retain existing behavior.

## Original photographs

Five owner-supplied photographic files replace the previous low-resolution crops from graphic composites. Source attachments are IMG_4180, IMG_4181, IMG_4182, IMG_4184 and IMG_4186. IMG_4185 was not needed because of near-duplicate composition.

Four assets retain 1536 × 864 pixels; the workbench overview is 1240 × 864 after excluding a monitor. WebP quality 92, source and output SHA256s, dimensions and file sizes are recorded in `data/berlingo-original-photos-manifest.json`. Orientation was normalized and metadata stripped. Registration and ECU serial/barcode areas were anonymized. No generated setting, vehicle or workstation was used.

Hero, business offer, homepage teaser and OG share image all reference the new assets. Gallery photographs preserve aspect ratio and open the full-size asset on click. Responsive image sizes and lazy loading are used. Previous composite crops were removed only after scanning runtime sources for references.

## Validation completed before the revision commit

- 46 unit checks: 15 business/editorial/photo-integrity, 14 SEO, 6 analytics, 11 enquiry.
- Current remote catalog parity: all ten price tiers unchanged and matching the reviewed source.
- Content audit, TypeScript, ESLint and optimized Next build passed; 145 generated pages.
- 36 optimized local page/viewport browser checks passed: NL/EN/PL cases/home/pricing, Dutch business offer, header widths 320–1920, no horizontal overflow, correct canonicals/hreflang, 139 unique sitemap URLs. All five original photos loaded, four gallery links point to full-size assets, and the case has no target-power or dyno-status text.
- Functional checks retained: enquiry CTA scroll, required fields, fleet/vehicle message, intercepted WhatsApp handoff, clipboard success/permission denial, no form input transmitted over HTTP, SSR fallback, unsupported translations 404, six real catalog model destinations.
- No real messages, email or appointment requests were sent. Third-party analytics were intercepted for QA. Screenshots and temporary transfer files remain outside source control; temporary private Drive transfer copies were deleted after successful checksum verification.

## Release scope

Base `399e9bb0e8a60766be152126340ab0cd69a8de69`, existing feature branch `feature/nl-business-vans-pricing-berlingo-20261011`, WWW PR #25. The pushed rollback tag `backup/pre-business-offer-20261011` retains the base. Local QA is not claimed as authenticated Vercel preview testing or public deployment verification. Check the exact new Git-linked deployment and record actual production status separately.
