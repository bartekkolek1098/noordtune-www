# NoordTune — Tuning-first pricing and service SEO
Date: 2026-10-09
Base: `6220eb954a9b3e58bab9c39a79a80650ed4d2906`
Branch: `feature/tuning-first-pricing-seo-2026-10`

## Why

The published prices page led with a €89 diagnostic offer and described it as a "full diagnosis" despite only listing fault codes, basic checks and advice. The owner prioritizes Stage 1 / Stage 2, ECU and TCU tuning bookings and wants diagnostics offered as a paid supporting service. Previously published Dutch service H1s did not name their actual Stage 1, Stage 2, ECU remap or DSG/TCU service.

## Changes

- NL pricing metadata leads with chiptuning in Assen and the approved Stage 1 starting price (€150).
- NL pricing hero explicitly says chiptuning prices, Stage 1 from €150, Stage 2 from €250, including VAT, with vehicle-dependent final quotation.
- NL/EN/PL pricing-card ordering is now Stage 1, Stage 2, basic diagnostics, then existing supporting services. The highlighted Stage 1 plan stays highlighted.
- The €89 starting tier is accurately described in all languages as fault-code reading, basic checks and initial advice. Extensive diagnostics require a separately discussed scope; no promise of a comprehensive engine/system diagnosis at the basic price.
- The pricing summary statistics reflect the same tuning-first order.
- Dutch Stage 1, Stage 2, ECU remap and DSG/TCU landing page H1s explicitly identify the service. Existing intros, approved proof, page URL, titles, canonical/hreflang and related links are retained.
- New content regression tests preserve the owner-approved starting prices, correct tier order and service-specific NL H1s.

## Confirmed commercial prices — unchanged

Stage 1 from €150; Stage 2 from €250; basic diagnostics from €89; log analysis from €149; mobile service from €129; emissions-related work by quotation, subject to applicable laws.

## Boundaries

No changes to actual price values, translations of other page sections, customer-result facts, indexability/redirect/sitemap configuration, analytics allowlist or properties, business location, ZICHTGROEI footer or Power Catalog. The exact Power Catalog destination remains `https://power.noordtune.nl/`.

## SEO context and measurement

Windsor.ai GSC has verified commercial Dutch interest (July 1–Oct 5, 2026: "chiptuning assen" 181 impressions and 9 clicks, Netherlands). This does not provide a measured CTR baseline for the pricing page itself. Some tuning pages were previously reported excluded from Google's index; clearer H1s do not guarantee inclusion. Record the release date and revisit settled GSC query/page metrics after crawling.

## Validation

- `pnpm install --frozen-lockfile`: PASS.
- `pnpm lint`: PASS.
- `pnpm typecheck`: PASS.
- `pnpm test:seo`: PASS (12/12).
- `pnpm content:audit`: PASS.
- Final `pnpm build`: PASS, including lint/type checks and all 141 generated pages.
- Focused browser QA: PASS, 21 page/viewport checks (390×844, 820×1180 and 1440×900) across NL/EN/PL pricing and all four NL tuning landings. Verified correct price order, unchanged amounts, initial diagnostic scope, exactly one H1, commercial service wording, self-canonical, exact Power Catalog destination, no horizontal overflow, and no browser console/runtime errors. Third-party tracking collection was intercepted; no real enquiries or analytics events sent.

Owner has delegated appropriate implementation and release decisions. Require successful final build, actual browser QA and Vercel deployment checks before release, and verify production afterwards.
