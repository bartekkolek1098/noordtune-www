# Customer Results MVP Report

Date: `2026-06-13`  
Branch: `feature/customer-results-mvp`  
Status: implemented as a feature branch, not merged to `main`

## Scope

This MVP prepares NoordTune.nl for real customer result pages without mixing workshop/Facebook-style posts into SEO blog articles.

No booking payments, Facebook API sync, file service, DNS change or `power.noordtune.nl` changes are included.

## Implemented

- Extended `src/content/customer-results.ts` with a richer content model:
  - source and approval state
  - `published`, `draft` and `demo` statuses
  - `indexable` flag
  - vehicle generation, engine, transmission, ECU, TCU and fuel fields
  - stock/tuned power and torque
  - customer approval, certificate availability and disclaimer fields
  - Power Catalog and WhatsApp CTA URLs
- Added future-ready customer result detail routing:
  - Dutch: `/nl/resultaten/[slug]`
  - English: `/en/results/[slug]`
  - Polish: `/pl/rezultaty/[slug]`
- Detail routes are generated only for results with:
  - `status: "published"`
  - `indexable: true`
- Added customer result metadata and Article JSON-LD support for future public cases.
- Updated sitemap generation so only public/indexable customer result pages are included.
- Updated result cards so every card links to:
  - `https://power.noordtune.nl/`
  - `https://wa.me/31685759600`
- Updated content audit checks for result visibility, approval and CTA safety.

## Current Public/Indexable Result Pages

None.

The current BMW 330d, Audi A4, Volkswagen Golf GTI and Mercedes C 220d cards remain listing-only demo examples. They are intentionally:

- `status: "demo"`
- `indexable: false`
- not exposed as detail pages
- not included in the sitemap

## BMW X3 E83 2.0d Stage 1 Draft

A first real-result template was added as a draft:

- BMW X3 E83 2.0d
- Stage 1
- N47
- Bosch EDC17
- 177 hp / 350 Nm stock
- 214 hp / 420 Nm tuned
- +37 hp / +70 Nm
- certificate noted as given to the customer

It remains:

- `status: "draft"`
- `indexable: false`
- not rendered publicly
- not included in sitemap

Before publishing, the owner should confirm:

- customer approval
- photo rights
- exact vehicle details
- whether the certificate/report can be referenced publicly
- final wording and image alt text

## Publishing Rule

A customer result page should become public only when:

- the result is real and owner-approved
- customer approval is confirmed
- image rights are clear
- vehicle data and figures are confirmed
- the page contains enough useful context
- disclaimer wording is present

Recommended public settings:

```ts
status: "published",
indexable: true,
customerApproved: true
```

## SEO Rule

Demo, draft and thin customer results must not be indexed. They should not enter `sitemap.xml`.

Real approved customer results can be indexable if they include:

- actual vehicle/project details
- useful technical notes
- clear before/after values when available
- vehicle-specific disclaimer
- Power Catalog and WhatsApp CTAs

## QA Notes

The content audit now checks:

- demo and draft results are not indexable
- public customer results resolve through static params
- non-public results do not resolve as public routes
- customer result CTAs point to the correct Power Catalog and WhatsApp URLs
- published/indexable results require customer approval

