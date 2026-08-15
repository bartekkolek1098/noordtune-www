# Customer Results Batch 2026-08

## Scope

This branch adds five owner-approved customer projects in Dutch, English and Polish. BMW X3 and Audi A4 B7 remain unchanged and public. Demo entries remain in development data but are not rendered, indexed or added to the sitemap.

## Results added

| Result | Published facts | Unknown fields handled safely |
| --- | --- | --- |
| Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 | 100 hp / 250 Nm to 145 hp / 320 Nm | Transmission not listed; exact ECU verified during service but not publicly listed; certificate not publicly stated |
| Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power | 177 hp / 400 Nm to 205 hp / 450 Nm; DPF, EGR and AdBlue remain active | Transmission not listed; exact ECU verified during service but not publicly listed; certificate not publicly stated |
| BMW F40 118i GETRAG 7DCT300 TCU tuning | Internal-flash read, HEXPROG II bench mode and vehicle-specific gearbox calibration | No engine power result is claimed; approximately 190-195 hp / 290-300 Nm is labelled only as Stage 1 engine context; certificate not publicly stated |
| Volkswagen Caddy 2.0 TDI 2020 Stage 1 | 102 hp to 185 hp | Torque, transmission and exact ECU are not guessed; certificate not publicly stated |
| Volkswagen Transporter 2.0 TDI 2013 ECU cloning + Stage 1 | Damaged ECU data read and transferred to a replacement unit | Power, torque, transmission and exact ECU are not guessed; certificate not publicly stated |

## Content model

The customer-result model now supports optional power and torque values plus localized service metrics. This allows TCU and ECU-cloning projects to show accurate technical outcomes without fake `0 hp`, `0 Nm` or invented gains.

All five projects use:

- `status: "published"`
- `indexable: true`
- `source: "manual"`
- `customerApproved: true`
- local image and Open Graph assets
- the standard Power Catalog and WhatsApp URLs

## Images

The five owner-provided JPEG graphics were converted locally to WebP with metadata omitted. Layout, visible marketing text and approved visible plates were preserved.

- `/images/results/ford-transit-connect-15-ecoblue-2019-stage-1.webp`
- `/images/results/toyota-proace-verso-vip-20d-2023-stage-1.webp`
- `/images/results/bmw-f40-118i-7dct300-tcu-tuning.webp`
- `/images/results/vw-caddy-20-tdi-2020-stage-1.webp`
- `/images/results/vw-transporter-20-tdi-2013-ecu-cloning-stage-1.webp`

Each image also has a matching `-og.webp` variant. Final files are approximately 99-171 KB each.

## Privacy and approvals

- Ford and Toyota plates are visible only inside owner-approved marketing graphics and are marked approved.
- BMW F40, VW Caddy and VW Transporter graphics do not show a plate.
- No full VIN, customer name, address, private contact data, certificate number or private document reference is included as page text.
- No customer images are downloaded or hotlinked from external sources.

## Legal wording

Page copy does not advertise generic emissions-system removal. It uses vehicle-specific wording such as diagnosis, system-related software solutions where legally permitted, and dependence on vehicle, use and regulations. The Toyota copy explicitly states that DPF, EGR and AdBlue remain active.

The supplied Ford, Caddy and Transporter promotional graphics contain original owner-provided references to system changes. They are retained as approved source artwork; the surrounding website copy provides the careful legal context above.

## Routes

Each slug is available under `/nl/resultaten/`, `/en/results/` and `/pl/rezultaty/`:

- `ford-transit-connect-15-ecoblue-2019-stage-1`
- `toyota-proace-verso-vip-20d-2023-stage-1`
- `bmw-f40-118i-7dct300-tcu-tuning`
- `vw-caddy-20-tdi-2020-stage-1`
- `vw-transporter-20-tdi-2013-ecu-cloning-stage-1`

All 15 localized routes are generated and included in the sitemap. Demo result routes remain excluded.

## Scope confirmation

- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook/Meta API integration was added.
- No file-service implementation was added.
- No production domain settings were changed.
