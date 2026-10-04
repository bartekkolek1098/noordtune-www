# Vercel Analytics implementation report

Date: 2026-10-04  
Branch: `feature/vercel-conversion-analytics-2026-10`  
Status: implementation and local QA complete; owner review required before merge

## Vercel plan and dashboard state

- Authenticated Vercel API metadata identifies team `bartekkolek1098s-projects` and project `noordtune-www` as **Pro**.
- Vercel documents custom Web Analytics events as available on Pro and Enterprise plans. Pro permits two custom properties per event.
- Web Analytics was disabled before this implementation (`features.webAnalytics: false`).
- Web Analytics was enabled for the existing `noordtune-www` project through the authenticated Vercel API. A follow-up project read returned `features.webAnalytics: true` and an active Web Analytics ID.
- No project, domain, DNS, subscription, Speed Insights setting, or paid Web Analytics Plus add-on was created or changed.

## Implementation

- Installed the official `@vercel/analytics` package at version `2.0.1`.
- Mounted `<Analytics />` once in `src/app/layout.tsx`, after the application content in the root body.
- Added one typed `trackConversion` helper with a compile-time event union and a runtime property-key guard.
- Tracking is best effort: synchronous analytics failures are caught and do not stop links, navigation, or WhatsApp handoff.
- No `beforeSend`, custom analytics endpoint, customer identifier, or second analytics provider was added.

## Event contract

| Event | Properties | Main placements |
| --- | --- | --- |
| `whatsapp_click` | `locale`, `source` | header, footer, floating action, contact alternatives, shared and brand CTAs |
| `appointment_click` | `locale`, `source` | homepage hero and chiptuning appointment CTA |
| `appointment_enquiry_started` | `locale`, `source` | first meaningful NL/EN/PL contact or appointment composer input |
| `appointment_whatsapp_handoff` | `locale`, `source` | validated explicit WhatsApp handoff from either composer |
| `power_catalog_click` | `locale`, `source` | homepage hero, contact/results CTA, shared CTA, footer, result and brand CTAs |
| `customer_result_click` | `locale`, `slug` | homepage, results archive, chiptuning proof and brand result cards |
| `blog_article_click` | `locale`, `slug` | homepage latest content, blog index and chiptuning proof links |
| `brand_page_click` | `locale`, `slug` | brand-specific cards on the chiptuning overview |
| `phone_click` | `locale`, `source` | contact composer alternatives, contact cards and footer |
| `email_click` | `locale`, `source` | contact composer alternatives, contact cards and footer |

Every event uses exactly two flat string properties. Event names cannot be supplied from visitor input.

## Privacy safeguards

The analytics API does not accept or send customer name, phone number, email address, registration/kenteken, VIN, enquiry description, requested date, WhatsApp message text, or clipboard contents. Composer tracking sends only locale plus a fixed source label. Content-card tracking sends only locale plus an editorial slug.

The NL, EN and PL privacy pages now state that the site uses Vercel Web Analytics to measure aggregate website usage and selected interactions, and that enquiry contents and direct customer contact details are not intentionally sent as analytics event data. No retention period, legal compliance conclusion, or consent claim was added. No cookie banner was added solely for this change.

## Validation

- `pnpm lint` — passed.
- `pnpm typecheck` — passed after the production build completed.
- `pnpm build` — passed; 141 static pages generated.
- `pnpm content:audit` — passed.
- `pnpm test:brand` — 6 passed.
- `pnpm test:seo` — 7 passed.
- `pnpm test:enquiry` — 11 passed.
- `pnpm test:analytics` — 6 passed.
- `pnpm test:analytics:browser` — passed for NL/EN/PL. Analytics intake and script requests were intercepted locally; no production events or external messages were sent.
- `pnpm test:enquiry:browser` — 40 cases passed across the requested composer, viewport, fallback, link and iPad catalog checks.
- `pnpm test:seo:browser` — homepage and representative routes passed at four viewports; 84 unique internal links resolved.
- `pnpm test:brand:browser` — 14 representative routes passed at six viewports.

Browser checks found no console errors or horizontal overflow. The enquiry composer, Facebook and Instagram links, three-card homepage limit, results archive, blog, brand pages, and existing iPad catalog layout remained intact.

## Plan and billing limitation

The implementation stays within the Pro limit of two custom properties. Web Analytics usage is subject to the active Vercel Pro account's metered analytics pricing and team-level usage controls. This work did not enable Web Analytics Plus or alter the subscription.

## Power Catalog boundary

The separate `power.noordtune.nl` application, its data, routes, sitemap, metadata, and configuration were not modified. The main website's Power Catalog presentation component was restored unchanged from `main`, and the destination remains exactly `https://power.noordtune.nl/`.
