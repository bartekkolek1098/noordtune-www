# Audi A4 B7 Result Publication Report

## Scope

Prepared the second real customer result page for the NoordTune.nl portfolio:

- Vehicle: Audi A4 B7 2.0 TDI
- Year: 2008
- Service: Stage 2+ / custom ECU remap
- Hardware: downpipe + hybrid turbo
- Stock: 170 hp / 350 Nm
- Tuned: 235 hp / 470 Nm
- Gain: +65 hp / +120 Nm
- Certificate: delivered to customer

This work was prepared on `feature/publish-audi-a4-b7-result` and must be owner-reviewed before merge.

## Routes Prepared

- Dutch: `/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus`
- English: `/en/results/audi-a4-b7-20-tdi-stage-2-plus`
- Polish: `/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus`

The result is set to:

- `status: "published"`
- `indexable: true`
- `customerApproved: true`
- `certificateAvailable: true`
- `licensePlateVisible: true`
- `licensePlateApproved: true`

## Image

Source image:

- `/Users/bartk/Downloads/722524990_122107351617336189_2060076126106552650_n.jpg`

Processed website assets:

- `public/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp`
- `public/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp`

Optimization notes:

- Main image: WebP, 1448x1086, approximately 219 KB.
- Open Graph image: WebP, 1200x900, approximately 141 KB.
- The visual design was preserved without blurring or redesign.
- The visible license plate remains visible because the owner approved this marketing graphic.

## ECU Handling

The exact ECU type is not published because it was not provided as verified public project data.

Public wording used:

- Dutch: `Gecontroleerd tijdens service; niet publiek vermeld`
- English: `Verified during service; not publicly listed`
- Polish: `Zweryfikowane podczas usługi; niepodawane publicznie`

This avoids guessing an ECU family such as EDC16 or PPD.

## Privacy Decisions

Approved for this case:

- The visible license plate inside the owner-approved promotional graphic.

Not published:

- Full VIN
- Customer name
- Customer address
- Private contact details
- Certificate number or private document reference

## Legal And Safety Wording

The page uses careful public wording around hardware and downpipe configuration:

- It describes this specific vehicle and hardware setup.
- It does not claim that every similar configuration is road legal.
- It does not advertise generic emissions-system removal.
- It states that legality depends on vehicle, use and applicable rules.

## Sitemap Behavior

Because this is a real approved and indexable customer result, the Audi A4 routes should be included in `sitemap.xml` after build.

Demo customer result routes must remain excluded.

Verified locally:

- Audi A4 NL/EN/PL routes are included in `sitemap.xml`.
- BMW X3 routes remain included.
- Demo result routes remain excluded.

## CTA Behavior

Power Catalog CTA:

- `https://power.noordtune.nl/`

WhatsApp CTA:

- `https://wa.me/31685759600`

Verified locally:

- Listing and detail pages include Power Catalog links to `https://power.noordtune.nl/`.
- Listing and detail pages include WhatsApp links to `https://wa.me/31685759600`.

## QA Result

`pnpm` was not available in the shell PATH, so equivalent local binaries were run with the bundled Codex Node runtime:

- `eslint .`: passed.
- `tsc --noEmit`: passed.
- `next build`: passed.
- `tsx scripts/audit-locales.ts`: passed.

Local route checks confirmed:

- Audi A4 result routes return 200 in Dutch, English and Polish.
- Listing pages return 200 in Dutch, English and Polish.
- BMW X3 routes still return 200.
- Demo detail routes still return 404.
- `/power` remains 404 on the main website.

## Scope Confirmation

- `power.noordtune.nl` was not modified.
- Booking was not implemented.
- Facebook API sync was not implemented.
- File service was not implemented.
- No production/domain settings were changed.
