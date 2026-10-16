# NoordTune NL SEO Factory — GSC locale routing + regional intent batch (2026-10-16)

## Evidence used — connected Google Search Console via Windsor.ai
Property: sc-domain:noordtune.nl, 2026-09-16 through 2026-10-13, grouped by both query and ranking page.
- `chiptuning groningen` had 53 impressions on the ROOT `https://www.noordtune.nl/`, 0 clicks, average position 81.0189, **not** the specific published `/nl/chiptuning-groningen` page. An additional 14 impressions of this same query went to `/pl` according to query/page grouping; these rows across pages/queries may not be simple additive unique totals.
- `auto chiptuning groningen` had 28 impressions / 0 clicks / avg position 82.6429 on root, plus additional variants on PL and NL contact; similarly `bmw tuning groningen` and `audi tuning groningen` often surfaced generic roots/PL instead of targeted Dutch pages.
- `chiptuning assen` had 45 impressions, 2 clicks, avg position 4.2889 on `/nl/chiptuning`, while `tuning assen` had 22 impressions on the same specific page with avg position 5.6364. These are real observations, not proof of ranking cause.
- Live HTTP HEAD tests on `https://www.noordtune.nl/` showed dynamic HTTP 307: Accept-Language nl -> `/nl`, en -> `/en`, pl -> `/pl`. Vercel Googlebot without this header may see default NL, but temporary language-dependent redirects are weak canonical signals.
- Live server has already published dedicated NL `chiptuning-groningen` and `chiptuning-assen` pages. The NL homepage lacked a direct link to the Groningen page (verified by public HTML), though `/nl/chiptuning` gained one in PR #32.
- The Google Business Profile is connected with real Assen tuning-workshop category, official www URL, matching phone, Mon-Sat 09-18 opening times and description honestly saying visit by appointment. No physical Groningen location and no extra address should be fabricated.

## Site changes
1. The unlocalized root `/` now produces a consistent **308 Permanent Redirect to `/nl`** for a first-time visitor, regardless of Accept-Language. Explicit user-selected `noordtune_locale=en` or `pl` cookie is honored with its own **307 temporary redirect** to the selected language. All three localized home pages and language switcher remain; no unwanted broad rewrite or technical page collision.
2. Main localized homepage metadata `hreflang x-default` points to the real canonical `https://www.noordtune.nl/nl`, not the redirecting undecided root URL. Exact reciprocal EN and PL entries remain; all other translated metadata retains the previous behavior.
3. Add one **Dutch-only** useful original on-page Assen work-region section to NL homepage, placed near the top after the commercial service offer. Explains the one real Assen workshop, diagnosis/ECU/transmission before Stage 1, and that Groningen customers make an appointment in Assen.
4. Three editorial direct links to existing separately canonical NL pages: `/nl/chiptuning-assen`, `/nl/chiptuning-groningen`, `/nl/auto-diagnose-assen`; plus authentic published `/nl/resultaten` cases and existing `/nl/afspraak` and WhatsApp handoffs. Existing whitelisted anonymous click labels reused. No new indexable page, prices, customer claims, reviewed Stage 1 figures, phone, location or GBP settings changed.

Google's own technical guideline: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites warns that browser-language-based redirects can obscure locale versions. Its localized versions docs https://developers.google.com/search/docs/specialty/international/localized-versions recommend reciprocal language-specific URLs and x-default fallback, which can be a specific default language page.

## Release gate
- `pnpm test:seo` including `tests/gsc-nl-home-routing.test.ts`, `pnpm test:business`, `pnpm test:analytics`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Browser QA on local production (and later live WWW) `pnpm exec tsx scripts/qa-nl-gsc-home-routing.ts` validates anonymous HEAD/GET root redirects for NL/EN/PL request headers; explicit EN/PL cookie redirects; four reciprocal hreflangs; public canonical; direct links and all 200; responsive 320/390/1440; EN/PL no NL local region.
- Test the already published Assen/Groningen canonical pages and existing quote CTAs; ensure production deployment READY matches exact merge SHA and www.noordtune.nl alias.
- Rollback tag points to pre-merge production `77161ee1c9c1102b90700020e8b3cc43ebb8e7b5`.

## What this does not prove
Technical redirects and crawlable internal links can improve discovery but do not guarantee indexing, higher placement, traffic or leads. Search Console's query/page impressions and average positions cannot establish whether rankings change because of this one release. Revisit NL query/page rows after 2–4 weeks; GSC is already connected through Windsor.ai. WWW sitemap published 139 URLs, Power Catalog 484, neither a count of confirmed Google indexed documents. Windsor.ai GSC connection is read-only, so no sitemap resubmission can be claimed.
