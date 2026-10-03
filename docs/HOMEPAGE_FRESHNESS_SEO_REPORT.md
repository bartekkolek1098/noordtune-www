# Homepage freshness and technical SEO report

Date: 2026-10-03  
Branch: `feature/homepage-freshness-seo-2026-10`

## Homepage

- Reframed the existing three-card portfolio block as recently added customer projects in NL, EN and PL. The homepage still renders a maximum of three project cards.
- Selected Ford Transit Connect, Toyota ProAce Verso VIP and BMW F40 118i. All three published records share the newest available `publishedAt` date, 2026-08-16, so explicit `featuredOnHome` and `featuredOrder` values provide a stable editorial order without claiming a project completion date.
- Added a compact, two-link latest-content strip inside the existing portfolio section. It uses published article data, sorts by `publishedAt`, and preserves source order when dates tie. No publication dates or article content were changed.
- The hero now links directly to the localized appointment route. The existing Power Catalog and all-results paths remain available, without adding another large homepage section.

## Technical SEO

- Meaningful shared-section images now receive localized contextual alt text. Decorative hero, service-card and Power Catalog images retain `alt=""` and are explicitly hidden from assistive technology.
- Article and customer-result Organization JSON-LD now uses the existing `/brand/noordtune-logo.png` asset, including its 260 by 75 dimensions. LocalBusiness data uses the same local logo URL.
- All 17 published blog subjects have an explicit NL/EN/PL translation map. Article detail pages emit only the verified reciprocal equivalents and retain a self canonical.
- All seven published customer cases have an explicit reciprocal NL/EN/PL mapping. Result detail pages emit only matching case equivalents and retain a self canonical.
- General localized pages emit `x-default`; the homepage points to the site root and other general pages point to their NL route. Article and customer-result detail pages deliberately omit `x-default` because they have exact locale equivalents and self canonicals.

## Chiptuning route review

`/nl/chiptuning` and `/nl/chiptuning-assen` materially overlap in title, description, location targeting and service intent. Because `/nl/chiptuning` already has the stated Search Console traction, the safest future consolidation is to retain it as the primary page, move any unique useful location copy into it, update internal links, and then permanently redirect `/nl/chiptuning-assen` after owner approval. This branch does not redirect, remove, recanonicalize or otherwise change `/nl/chiptuning-assen`.

The main `/nl/chiptuning` page now includes compact links to three real customer results, two exact localized technical guides and the appointment enquiry. Its existing title and description remain unchanged, avoiding extra repetition of “chiptuning Assen.”

## QA

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed; 141 static pages generated.
- `pnpm content:audit`: passed.
- `pnpm test:seo`: passed, 7 tests.
- `pnpm test:enquiry`: passed, 11 tests.
- `pnpm test:seo:browser`: passed against the production build at 390x844, 820x1180, 1180x820 and 1440x1000. It covered all requested regression routes, localized homepages, alt rules, canonicals, hreflang, JSON-LD, console errors, horizontal overflow and 84 unique internal links.
- `pnpm test:enquiry:browser`: passed against the production build, 40 cases including NL/EN/PL contact and appointment flows, no-JS and blocked-hydration fallbacks, mobile/navigation regressions and intercepted external contact/social links. No form or external message was submitted.

## Remaining opportunities

- Decide whether to consolidate `/nl/chiptuning-assen` into `/nl/chiptuning` after owner review and a current query/landing-page check.
- Continue adding genuine projects and articles through the existing content model; the homepage will select published article dates while project selection remains explicitly controlled when dates tie.

The Power Catalog repository, routes, sitemap, metadata, data and structure were not modified. Every main-site Power Catalog link remains exactly `https://power.noordtune.nl/`.
