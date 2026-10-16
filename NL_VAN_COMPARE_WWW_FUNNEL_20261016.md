# NoordTune WWW — NL commercial van comparison discovery & quote funnel, 2026-10-16

## Production baseline
- WWW `bartekkolek1098/noordtune-www`: `0d06282b6bab232ecc56fad90bf557c09cba6788`, PR #28, Vercel READY.
- Power Catalog `bartekkolek1098/noordtune-power-catalog`: `2fa160b704b83dc3670e868156b4ca651aa6a2fa`, PR #73, Vercel READY, **472 canonical sitemap URLs**.
- The commercial service page `/nl/bedrijfswagens` previously displayed six general van model links but none of the nine new source-reviewed technical motor-generation comparisons.

## Applied
- New explicit allowlist in `src/content/van-generation-comparisons.ts` of the nine already published Dutch technical comparisons: Sprinter, Vito, Transporter, Transit Custom, Transit, Crafter, Proace, Boxer, Ducato. Static model- and ECU-specific brief captions; exact HTTPS origin + canonical paths on `power.noordtune.nl`; no unverified tuner figures, plate numbers or constructed user links.
- New accessible `VanGenerationComparisonSection` on the existing **commercial chiptuning service** page. Nine direct cards with model label, technical distinction and direct comparison destination; index CTA; and existing workshop quote `/nl/bedrijfswagens#offerte`. The former six model-category links, prices, original photos, customer cases and business composer stay intact.
- A compact third CTA `Vergelijk busmotoren` from the existing NL homepage business offer to the nine-comparison index. Existing `Bekijk bedrijfswagenaanbod` and `Vraag een offerte` actions unchanged.
- Anonymous, whitelisted Vercel Analytics `power_catalog_click` sources `homepage_van_compare` and `business_van_compare`. Existing `appointment_click` event links to the workshop offer. Only locale/source fields, no customer data.
- No EN/PL duplicated SEO landing pages; no new WWW canonical URLs; no code changes in Power Catalog; no new pricing, tuning numerical claims or deletion of road-required DPF/SCR/AdBlue.

## Release QA
- `pnpm test:seo` **PASS** (21 tests)
- `pnpm test:business` **PASS** (18 tests)
- `pnpm test:analytics` **PASS** (6 tests)
- `pnpm typecheck`, `pnpm lint`, `pnpm build` **PASS** (146 static Next.js paths)
- Browser QA `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3153 pnpm qa:van-comparisons:www` **PASS**:
  - NL home CTA and NL service page nine unique direct links, existing six model links and current business enquiry preserved.
  - 9/9 live comparison URLs HTTP 200, no noindex, self-canonical; index HTTP 200.
  - Tracking attributes and allowed source labels.
  - Responsive 320/390/1440, EN/PL exclusion, no browser JS errors.
  - **Real cross-origin journey**: new WWW direct Sprinter comparison link → live Power Catalog technical comparison → exact Sprinter W906 313 CDI quotation link → published WWW business-enquiry with the right `Mercedes Sprinter W906 313 CDI 2.1 129 (2013)` vehicle imported. No message submitted, no plate/VIN shared.
- After merge, verify Vercel preview/prod against exact reviewed SHA, direct WWW production HTML and repeat new browser QA against `https://www.noordtune.nl`.

## Intent
Improve the actual customer journey from commercial vehicle SEO/service pages into verified precise tuning data, then into personalised workshop contact. The new links are beneficial internal/cross-domain navigation; **they do not prove Google has indexed any new catalog URLs or increased leads**. Search Console/Vercel Analytics needed to assess outcomes.
