# Customer Results Batch 2026-08 Production QA Report

Date: 2026-08-16  
Production: https://www.noordtune.nl  
Repository: `bartekkolek1098/noordtune-www`  
Production content commit: `350307d727ed129c83c4d654449374ee15d88228`

## Result

The August 2026 customer-results batch is live and passed production HTTP, content, asset, SEO, sitemap and local build QA. No functional launch blocker was found.

One manual follow-up remains: the browser-control runtime was unavailable in this QA session, so a fresh interactive production console and viewport measurement could not be performed. The branch-level browser QA for the same implementation previously passed at 1440 x 1200 and 390 x 844 with no horizontal overflow, broken images or console errors. An owner mobile spot check is still recommended before deleting the source branch.

## Production Routes

All requested listing and detail routes returned HTTP 200.

### Listings

- `/nl/resultaten`: 200
- `/en/results`: 200
- `/pl/rezultaty`: 200

Each listing contains all seven real customer results and does not render the demo/example cards.

### New Dutch Results

- `/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1`: 200
- `/nl/resultaten/toyota-proace-verso-vip-20d-2023-stage-1`: 200
- `/nl/resultaten/bmw-f40-118i-7dct300-tcu-tuning`: 200
- `/nl/resultaten/vw-caddy-20-tdi-2020-stage-1`: 200
- `/nl/resultaten/vw-transporter-20-tdi-2013-ecu-cloning-stage-1`: 200

The matching English and Polish routes for all five projects also returned HTTP 200, for 15 successful new localized detail routes in total.

### Existing Results

- `/nl/resultaten/bmw-x3-e83-20d-stage-1`: 200
- `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`: 200

BMW X3 and Audi A4 remain visible as real customer results.

## Demo Safety

Demo cards are absent from the NL, EN and PL listing HTML. The checked demo detail routes continue to return HTTP 404:

- `/nl/resultaten/bmw-330d-stage-1`
- `/nl/resultaten/audi-a4-20-tdi-stage-1`
- `/nl/resultaten/volkswagen-golf-gti-stage-1`
- `/nl/resultaten/mercedes-c-220d-stage-1`

These demo slugs remain absent from the sitemap.

## Images and Open Graph

All ten new image assets returned HTTP 200 with `image/webp` content type:

- five primary result graphics;
- five dedicated Open Graph variants.

Every new production page references its matching primary image and matching `-og.webp` Open Graph image. No hotlinked external image was introduced.

Visible license plates appear only inside owner-approved marketing graphics. No full VIN, customer name, customer address, private contact data, certificate number or private document reference is published as page text.

## Technical Data Safety

- Unknown ECU and transmission fields are omitted or described as verified during service but not publicly listed; they are not guessed.
- BMW F40 is presented as GETRAG 7DCT300 TCU tuning. Its approximately 300 Nm value is explicitly described as calibration context, not a measured engine power result.
- Volkswagen Caddy contains supplied power values only. Torque values are absent and explicitly not estimated.
- Volkswagen Transporter uses service-specific metrics for ECU cloning and Stage 1. Power and torque values are absent and explicitly not estimated.
- Ford certificate availability is not claimed because it was not supplied.

## Legal and Emissions Wording

Public page copy uses vehicle-specific and legally careful language:

- system-related software work is described only where legally permitted;
- suitability depends on the vehicle, use and applicable regulations;
- Toyota explicitly states that DPF, EGR and AdBlue remain active;
- no generic claim is made that emissions-system modifications are legal for every vehicle or use case.

Owner-provided promotional graphics retain their approved embedded wording. The surrounding website copy supplies the legally responsible context.

## Link QA

All 15 new localized detail pages contain the expected conversion links:

- Power Catalog: `https://power.noordtune.nl/`
- WhatsApp: `https://wa.me/31685759600`

The listing pages also use the same approved destinations.

## Language QA

- All five Polish detail pages contain Polish diacritics.
- No English Power Catalog or WhatsApp CTA labels were found on the Polish pages.
- NL and EN result content remained localized.

## Sitemap

Production `/sitemap.xml` returned HTTP 200.

- All 15 new NL, EN and PL result URLs are included.
- Existing BMW X3 and Audi A4 result URLs remain included.
- Checked demo result slugs remain excluded.

## Mobile and Browser QA

Direct interactive production browser control was unavailable in this session. Therefore, a new console-log capture and live `scrollWidth` measurement were not claimed.

Supporting evidence:

- branch-level browser QA for the same shipped implementation passed at 390 x 844 and 1440 x 1200;
- the long BMW F40 software identifier already uses safe wrapping;
- live production HTML returned the expected localized cards and image references;
- all responsive image assets loaded successfully;
- no production-facing code changed between approved branch QA and deployment.

Recommended manual follow-up: open `/pl/rezultaty` and the BMW F40 detail page on one physical mobile device, confirm no horizontal pan, and inspect the browser console if available.

## Local QA

The latest `main` was clean and synchronized with `origin/main`. Node was supplied through the bundled Codex runtime because it was not present on the default shell `PATH`.

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 111 static/server routes generated |
| `pnpm content:audit` | Passed |

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- Production/domain settings were not changed.
- No feature code was changed during this production QA pass.
