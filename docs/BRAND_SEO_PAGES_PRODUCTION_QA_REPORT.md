# Brand SEO Pages Production QA Report

Date: 2026-08-16  
Production URL: https://www.noordtune.nl  
Main commit tested: `b271f9f`  
Brand implementation merge commit: `38986100a5d93a0c75022d3ac96cb448ff3a19ed`

## Final result

Production QA passed. All five brand families are clean in Dutch, English and Polish. No launch blocker or hotfix requirement was found.

## Production routes

All 15 routes returned HTTP 200:

- Dutch: `/nl/bmw-chiptuning`, `/nl/audi-chiptuning`, `/nl/volkswagen-chiptuning`, `/nl/ford-chiptuning`, `/nl/toyota-chiptuning`.
- English: `/en/bmw-chiptuning`, `/en/audi-chiptuning`, `/en/volkswagen-chiptuning`, `/en/ford-chiptuning`, `/en/toyota-chiptuning`.
- Polish: `/pl/chiptuning-bmw`, `/pl/chiptuning-audi`, `/pl/chiptuning-volkswagen`, `/pl/chiptuning-ford`, `/pl/chiptuning-toyota`.

No broken production image or browser-console error was found on any of the 15 routes.

## Customer-result matching

Every brand page links only to approved, matching, localized customer-result routes:

- BMW: BMW X3 E83 Stage 1 and BMW F40 118i 7DCT300 TCU tuning.
- Audi: Audi A4 B7 Stage 2+.
- Volkswagen: VW Caddy Stage 1 and VW Transporter ECU cloning/Stage 1.
- Ford: Ford Transit Connect Stage 1.
- Toyota: Toyota ProAce Verso Stage 1 Comfort Power.

No demo result link was rendered. No technical figures, privacy data, publication states or customer-result source data were changed.

## Metadata and structured data

Automated production HTML inspection passed for 15/15 pages:

- 15 unique page titles;
- meta description present;
- canonical URL exactly matches the production route;
- Open Graph title, description and local image present;
- all `application/ld+json` blocks parse successfully;
- FAQPage JSON-LD present;
- BreadcrumbList JSON-LD present with three ordered, linked items;
- LocalBusiness/AutoRepair JSON-LD present.

No malformed structured data was found.

## Sitemap

`https://www.noordtune.nl/sitemap.xml` loads and contains all 15 localized brand routes. Demo customer-result routes remain excluded.

## CTA links

All 15 brand pages contain the approved destinations:

- Power Catalog: `https://power.noordtune.nl/`
- WhatsApp: `https://wa.me/31685759600`

No local `/power` route was introduced.

## Existing-site regression

- Homepage: exactly 3 featured customer results in NL, EN and PL.
- Results archives: exactly 7 published customer results in NL, EN and PL.
- Public customer-result details: 21/21 localized routes return HTTP 200.
- Demo result samples: 12/12 return HTTP 404.
- Blog indexes: 3/3 return HTTP 200.
- Published blog articles: 51/51 return HTTP 200.
- No broken images or horizontal overflow on tested homepage/archive mobile views.

## Responsive QA

Production brand pages were tested at:

- 390x844 — Polish BMW.
- 430x932 — English Ford.
- 768x1024 — Dutch Audi.
- 820x1180 — Dutch Volkswagen.
- 1024x768 — Polish Toyota.
- 1180x820 — English BMW.
- 1440x1000 — Dutch Ford.

Results:

- no horizontal overflow or out-of-bounds page elements;
- no overlapping result cards or CTA buttons;
- customer-result cards and local images remain readable;
- all buttons remain within the viewport;
- mobile menu opens as a modal overlay, locks body scroll and closes with Escape;
- floating WhatsApp has no interactive control underneath it in the checked result-card position;
- browser console logs are empty;
- the 820 px Power Catalog layout remains inside its section, with RDW, Stage 1-3+, DSG/TCU and Advies separated and readable.

## Language QA

- Dutch pages use natural Dutch copy and localized CTA labels.
- English pages use natural English copy without Dutch or Polish CTA leftovers.
- All five Polish pages contain correct Polish diacritics and localized CTA labels.
- No English CTA leftovers were found in Polish content.

## Local command results

Executed from the latest production `main`:

- `pnpm lint` — passed.
- `pnpm typecheck` — passed.
- `pnpm build` — passed; 141 static pages generated.
- `pnpm content:audit` — passed.

## Scope confirmation

- Only this QA report was added during production QA.
- `power.noordtune.nl` was not modified.
- Customer-result data was not modified.
- Blog content was not modified.
- No booking, Facebook API sync or file-service implementation was added.
- Production-domain and Vercel settings were not changed.

