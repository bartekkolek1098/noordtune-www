# NoordTune Vercel Analytics production QA report

Date: 2026-10-04

Production: [https://www.noordtune.nl](https://www.noordtune.nl)

Production commit tested: `ac7ebd154a92bef4c07e2330ee2e445fc68403ed`

## Production QA result

Pass. Vercel reported the production deployment successful, `https://www.noordtune.nl/nl` returned HTTP 200, and the final production browser checks found no console errors or horizontal overflow. No application feature or configuration was changed during this QA.

## Page-view analytics result

- The live page mounted one Vercel Web Analytics loader: `https://www.noordtune.nl/fc985b44a6107bfb/script.js`.
- The loader returned HTTP 200 and initialized `window.va` once.
- A synthetic anonymous page view generated one POST to the live generated collector endpoint `/fc985b44a6107bfb/view`.
- The production collector returned HTTP 200, confirming that normal page views are collectable.
- No second analytics loader or duplicate integration was present.
- No Google Analytics 4, Google Tag Manager, Meta Pixel or another analytics provider was found in live page scripts or application dependencies.

## Custom-event result

The live site was exercised with Chrome/Playwright. All custom-event requests were intercepted before delivery to Vercel, and anchor navigation plus `window.open` were blocked during the synthetic interaction pass. No real WhatsApp message or email was sent.

Each requested interaction emitted exactly one event:

| Interaction | Event | Count | Properties |
| --- | --- | ---: | --- |
| Homepage Power Catalog | `power_catalog_click` | 1 | `locale`, `source` |
| Homepage appointment | `appointment_click` | 1 | `locale`, `source` |
| Customer-result card | `customer_result_click` | 1 | `locale`, `slug` |
| Blog article | `blog_article_click` | 1 | `locale`, `slug` |
| Contact phone | `phone_click` | 1 | `locale`, `source` |
| Contact email | `email_click` | 1 | `locale`, `source` |
| Contact WhatsApp | `whatsapp_click` | 1 | `locale`, `source` |
| Appointment enquiry start | `appointment_enquiry_started` | 1 | `locale`, `source` |
| Appointment WhatsApp handoff | `appointment_whatsapp_handoff` | 1 | `locale`, `source` |

The approved allowlist remains unchanged:

- `whatsapp_click`
- `appointment_click`
- `appointment_enquiry_started`
- `appointment_whatsapp_handoff`
- `power_catalog_click`
- `customer_result_click`
- `blog_article_click`
- `brand_page_click`
- `phone_click`
- `email_click`

When the custom-event collector was deliberately blocked, the appointment link still navigated to `/nl/afspraak` without a page error. Analytics failure therefore remains non-blocking.

## PII and privacy result

Every captured custom event contained exactly two properties: `locale` plus either `source` or `slug`. The synthetic free-text marker and requested appointment date appeared in the local enquiry preview but not in analytics payloads.

No captured event property contained a name, phone number, email address, registration, VIN, free-text enquiry, requested appointment date, WhatsApp message content or clipboard contents. The handoff opened no external browser page and sent no message.

## Regression result

The repository does not define generic `content` or `test` scripts. The existing focused scripts from `package.json` were used.

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages generated |
| `pnpm content:audit` | Pass |
| `pnpm test:analytics` | Pass; 6 tests |
| `pnpm test:enquiry` | Pass; 11 tests |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:analytics:browser` | Pass; NL/EN/PL event, privacy and responsive checks |
| `pnpm test:enquiry:browser` | Pass; 40 cases |
| `pnpm test:seo:browser` | Pass; 84 unique internal links resolved |
| `pnpm test:brand:browser` | Pass; 14 routes across 6 viewports |

Live and focused browser verification confirmed:

- the contact and appointment composers remain operational;
- Facebook points to `https://www.facebook.com/profile.php?id=61590085682134`;
- Instagram points to `https://www.instagram.com/noordtune.nl`;
- the homepage contains exactly three customer projects;
- the results archive contains seven customer projects;
- the 820×1180 Power Catalog metrics remain inside the viewport without overlap;
- the tested pages have no horizontal overflow;
- the Power Catalog destination remains exactly `https://power.noordtune.nl/`.

## Blockers and scope confirmation

No production blocker was found. `power.noordtune.nl` and the separate Power Catalog application were not modified.
