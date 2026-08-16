# Brand SEO Pages Report

Date: 2026-08-16  
Branch: `feature/brand-seo-pages`

## Scope

This branch publishes five evidence-led brand landing pages in Dutch, English and Polish. Each page is built around NoordTune's diagnostic-first process, existing services and approved real customer results. No new customer-result claims or technical values were created.

## Published routes

| Brand | Dutch | English | Polish |
| --- | --- | --- | --- |
| BMW | `/nl/bmw-chiptuning` | `/en/bmw-chiptuning` | `/pl/chiptuning-bmw` |
| Audi | `/nl/audi-chiptuning` | `/en/audi-chiptuning` | `/pl/chiptuning-audi` |
| Volkswagen | `/nl/volkswagen-chiptuning` | `/en/volkswagen-chiptuning` | `/pl/chiptuning-volkswagen` |
| Ford | `/nl/ford-chiptuning` | `/en/ford-chiptuning` | `/pl/chiptuning-ford` |
| Toyota | `/nl/toyota-chiptuning` | `/en/toyota-chiptuning` | `/pl/chiptuning-toyota` |

All 15 routes are published, indexable, statically generated and included in the sitemap with localized alternates.

## Content model

Each localized page includes:

- unique metadata, H1, introduction and hero alt text;
- pre-tuning checks and a diagnostic-first explanation;
- Stage 1 and Stage 2/hardware guidance;
- ECU/TCU, drivetrain and logging considerations;
- approved customer-result proof cards;
- related services and knowledge-base links;
- brand-specific Power Catalog and WhatsApp CTAs;
- FAQ, visible disclaimer and breadcrumbs.

Dutch is the primary and deepest version. English and Polish are complete localized editions rather than literal line-by-line translations. The pages avoid unsupported engine/ECU claims, universal gains and broad legal promises.

## Evidence used

- BMW: BMW X3 E83 Stage 1 and BMW F40 GETRAG 7DCT300 TCU project.
- Audi: Audi A4 B7 2.0 TDI Stage 2+ project.
- Volkswagen: VW Caddy Stage 1 and VW Transporter ECU cloning/Stage 1 project.
- Ford: Ford Transit Connect 1.5 EcoBlue Stage 1 project.
- Toyota: Toyota ProAce Verso VIP Stage 1 Comfort Power project.

Only existing approved images, values and public project details are rendered. Result detail pages remain the source of truth for technical figures and privacy decisions.

## Draft assessment and cannibalization

The older brand entries in `src/content/content-growth-drafts.ts` were intentionally not promoted directly. They were Dutch-only preparation material, too short for publication and contained broader technical references without enough result-led evidence. The new `src/content/brand-pages.ts` is the sole route source for the published brand pages.

There is one canonical URL per brand and language. Draft entries remain outside routing, navigation and sitemap, so they cannot compete in search. Mercedes remains unpublished because this release has no approved real Mercedes result supporting a strong evidence-led page.

## Internal discoverability

- The Chiptuning page now has one compact five-link brand section.
- Related public customer-result pages link back to the matching localized brand page.
- Articles gain at most two deduplicated brand links, and only when their existing related links already reference a matching real result.
- The homepage was not changed and remains limited to three featured results.

## Images

No external assets were added. Brand heroes and proof cards reuse approved local result graphics under `public/images/results/`. No image hotlinking or random copyrighted imagery was introduced.

## SEO and structured data

- localized canonical and hreflang alternates;
- Open Graph and Twitter metadata using approved local images;
- LocalBusiness/AutoRepair JSON-LD;
- FAQPage JSON-LD;
- BreadcrumbList JSON-LD;
- all 15 pages in `sitemap.xml`.

## Safety confirmation

- `power.noordtune.nl` was not modified; all catalog CTAs remain `https://power.noordtune.nl/`.
- WhatsApp CTAs remain `https://wa.me/31685759600`.
- Customer-result technical data, privacy fields, status and indexability were not changed.
- No booking, Facebook API sync or file-service work was added.
- Production/domain/Vercel settings were not changed.

