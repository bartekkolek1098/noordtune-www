# NL local and Ford SEO growth — Wave 2

Date: 9 October 2026. Scope: development and Git-integrated Vercel Preview only; production release is not authorized.

Branch: `feature/nl-local-ford-seo-2026-10`, based on fetched `origin/main` at `909ac28d1f9aeb72b42ed5be348a8c5666bb1ace`. Work used a separate managed Git worktree; the original checkout and the branches for PRs #18 and #19 were preserved.

## Verified search baseline

Read through Windsor.ai, connector `searchconsole`, account `sc-domain:noordtune.nl`, 1 July–5 October 2026. These are the four exact queries with country **Netherlands**; they are not a complete Dutch organic traffic total. CTR below is shown as a percentage. No Power Catalog account was queried.

| Query | Impressions | Clicks | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| chiptuning assen | 181 | 9 | 4.97% | 9.35 |
| chiptuning drenthe | 72 | 0 | 0% | 20.11 |
| chiptuning groningen | 367 | 0 | 0% | 64.35 |
| ford chiptuning | 67 | 0 | 0% | 32.21 |

The recheck matches the supplied baseline. A separate query/page read also filtered URLs to `https://www.noordtune.nl/` and country Netherlands:

- `/nl/chiptuning` leads for Assen: 156 impressions, 9 clicks, position 6.32; and Drenthe: 70 impressions, 0 clicks, position 18.97.
- `/nl/ford-chiptuning` receives 63 of the Ford query's page-level impressions, position 31.94. The EN Ford page receives 4, position 36.50.
- Groningen's query appears mainly on the root URL (229 impressions, position 80.27), contact (122, position 37.95) and PL homepage (111, position 92.51); the main chiptuning page has 16, position 36.88. The dedicated Groningen page is not among returned query/page rows.
- Across all reported queries for the three target pages, the NL Ford page has 144 impressions, 0 clicks, position 31.90. No Drenthe or Groningen page rows were returned for this period/filter.

Query totals and page totals use different aggregation; page impressions can overlap and must not be summed to reproduce property/query totals. Missing rows do not prove a URL has never had impressions. No ranking or conversion uplift is claimed.

## Audit and indexing findings

Before editing, all three production targets returned HTTP 200, one H1, `index, follow`, a self-referencing canonical and inclusion in the live sitemap.

| Target | Initial title / H1 and intent | Proof and customer journey before change | Authenticated Google URL Inspection on 9 October |
| --- | --- | --- | --- |
| `/nl/ford-chiptuning` | Title: “Ford chiptuning \| EcoBlue ECU-remap & diagnose \| NoordTune.nl”. H1: “Ford chiptuning voor betere dagelijkse trekkracht”. Brand-specific commercial tuning intent. | Real Transit Connect Stage 1 case and catalog/WhatsApp CTAs already present; ECU programming method and quotation/pricing/appointment path could be clearer. | **Indexed**. Last crawl 9 September 2026, 00:20:03 as displayed by GSC; smartphone Googlebot, successful fetch, crawl/indexing allowed. Declared canonical is the target; Google's canonical is the inspected URL. GSC shows a temporary sitemap-processing message despite the URL being indexed. |
| `/nl/chiptuning-drenthe` | Title: “Chiptuning Drenthe \| Stage 1 & ECU Remap \| NoordTune.nl”. H1: “Maatwerk tuning voor Drenthe”. Regional commercial intent. | Generic Stage/diagnostics copy; catalog/WhatsApp links present, but no specific case or contextual pricing/appointment links. | **Not indexed: URL unknown to Google**. No referring sitemap, referring page, crawl or canonical data reported in this inspection. This differs from the live sitemap, which does contain the URL. |
| `/nl/chiptuning-groningen` | Title: “Chiptuning Groningen \| ECU Remap vlakbij Groningen \| NoordTune.nl”. H1: “Meer respons vlakbij Groningen”. Service-area intent for customers travelling to Assen. | States Assen in metadata/FAQ, lists nearby areas, offers catalog/WhatsApp plus Stage 1, pricing and archive links; no specific case. | **Not indexed: discovered, currently not indexed**. GSC identifies the main sitemap as both sitemap and referring source; no crawl or canonical data reported. |

HTTP indexability is distinct from Google index inclusion. Neither unindexed regional page has a returned Google canonical that supports changing the canonical strategy. No indexing requests, sitemap submissions, root redirect changes or coverage fixes were made. Groningen was audited and left unchanged; a broad rewrite is not justified by these data alone.

## Exact content changes

Only two application content modules changed; existing renderers and link components are reused.

### Dutch Ford page — `src/content/brand-pages.ts`

- Title now: “Ford chiptuning | Stage 1 & ECU-remap in Assen | NoordTune.nl”. Description emphasizes vehicle/ECU/software assessment, the published Transit Connect case and a quotation.
- Hero introduction clarifies ECU remapping and Stage 1 where supported, from the Assen workshop. H1, URL, imagery and canonical remain unchanged.
- Added one ECU-remapping section explaining identification of the installed ECU/software version, support assessment and professional ECU programming equipment. No equipment model, protocol, blanket compatibility claim or new performance figure is asserted.
- Qualified the existing Stage 1 explanation by supported ECU/software and a healthy technical basis. Existing maintenance/fault checks, vehicle-dependent results and project disclaimer are retained.
- Reworked the quotation paragraph and added contextual links to prices, contact and appointment. Existing WhatsApp CTA label now says “Vraag een Ford-offerte via WhatsApp”; destination and event payload are unchanged.
- Related-section wording keeps tuning as the commercial focus, with diagnostics supporting suitability assessment.

### Drenthe page — `src/content/seo-landings.ts`

- Description and hero introduction identify the Assen workshop serving Drenthe. Title, H1 and URL remain unchanged.
- Replaced generic regional copy with three distinct sections: work carried out in Assen with vehicle-specific tuning assessment; catalog/pricing/personal quotation journey; and a published completed project with a vehicle-specific-results limitation.
- Updated two FAQ answers to explain the Assen location and quotation path without lists implying verified regional customer origins.
- Expanded contextual related links to existing tuning services, the Ford case, results, prices, contact and appointment. The main chiptuning page remains the broad tuning explanation; this page focuses on service area and the practical customer journey.

### Internal links added in page content

These are contextual additions, even where a destination was already available in the shared header/footer:

| Source | Added contextual destinations |
| --- | --- |
| Ford | `/nl/ecu-remap`, `/nl/prijzen`, `/nl/contact`, `/nl/afspraak` |
| Drenthe | `/nl/chiptuning`, `/nl/stage-1-tuning`, `/nl/ecu-remap`, `/nl/dsg-tcu-tuning`, `/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1`, `/nl/resultaten`, `/nl/prijzen`, `/nl/afspraak` |

Drenthe retains `/nl/stage-2-tuning` and `/nl/contact` and gives the contact link an explicit quotation label. Its related block replaces the previous Assen and diagnostics links with the above commercial/proof paths. No Assen or diagnostics route was removed. All Power Catalog links still point exactly to `https://power.noordtune.nl/`; WhatsApp remains `https://wa.me/31685759600`.

## Customer evidence

Only the already published, owner-approved **Ford Transit Connect 1.5 EcoBlue, 2019, Stage 1 / maatwerk ECU-remap** is used. Its existing NL case is `/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1`.

The source case records 100 pk / 250 Nm to 145 pk / 320 Nm for that vehicle. This PR adds no figures to the landing-page copy, changes no case facts, and makes no guarantee for another Ford. The existing Ford proof card and disclaimer are retained. Drenthe references it as a completed project without asserting the customer's location. No additional customer case or compatibility is invented.

## QA receipts

Commands run once after the final application edits:

| Check | Result |
| --- | --- |
| `pnpm lint` | PASS |
| `pnpm typecheck` | PASS |
| `pnpm build` | PASS; 141 pages generated |
| `pnpm content:audit` | PASS |
| `pnpm test:seo` | PASS; 7/7 |
| `git diff --check` | PASS |

Focused local production-build Playwright checks (`.tmp/qa-wave2.ts`, development-only receipt; no permanent test/dependency changes):

- 20 page/viewport combinations: NL Ford, Drenthe and Groningen; EN Ford; PL `/pl/chiptuning-ford`; each at 390×844, 820×1180, 1180×820 and 1440×1000.
- All render with HTTP 200 and one H1. Canonicals and hreflang arrays match the captured production baseline. Generated JSON-LD parses successfully.
- All other brand objects, including EN/PL Ford, and all other SEO landing objects, including Groningen, deeply match the pre-edit baseline. Existing Ford result selection and summaries are unchanged.
- 16 unique destinations from the edited pages' content links return HTTP 200, including the Ford case and all new quotation/service links.
- Main-content case/pricing/contact/appointment/ECU links exist on both edited pages. Actual clicks follow Ford quotation to the contact composer and Drenthe appointment to the appointment composer. Synthetic ECU-tuning enquiry text produces a message preview; no WhatsApp message, email or appointment booking is sent.
- One existing Ford hero WhatsApp click emits exactly one `whatsapp_click` with `{locale: "nl", source: "brand_hero"}`. Analytics is intercepted locally; no enquiry content enters that event. Analytics implementation/contracts are not edited.
- No horizontal overflow, console errors or runtime errors observed. Mobile and iPad captures were reviewed locally; existing layouts are reused. Temporary screenshots/QA fixtures are excluded from the commit.
- Full unchanged browser suites were not rerun. The focused harness was corrected for CSS uppercase text and the SDK's optional undefined `options` field; its final run passes.

## Scope protection, purpose and follow-up

Draft PR: [#20](https://github.com/bartekkolek1098/noordtune-www/pull/20), targeting `main`. Application commit: `0832f9a14afdf96967918df36464b95a53d64aeb`.

Vercel [Preview](https://noordtune-www-git-feature-nl-l-b52a1d-bartekkolek1098s-projects.vercel.app) is **Ready**, with successful GitHub Vercel and Preview Comments checks for the application commit. Authenticated hosted-browser smoke confirms the new Ford programming section and both pages' case/quotation/appointment links, production self-canonicals, exact Power Catalog destination, no observed overflow and no captured console errors. Hosted smoke is separate from the fuller local viewport/interactions QA above. The Vercel connector returns a team-scope 403 and no local Vercel CLI is available; GitHub checks and the existing authenticated browser provide Preview verification instead. No access or protection settings were changed. The final follow-up commit records these documentation receipts only.

Files delivered: `src/content/brand-pages.ts`, `src/content/seo-landings.ts`, and this report. No dependency or lockfile changes. No shared renderer, footer, card, SEO helper, sitemap, redirect, route, customer-result data, blog content or other brand content changes.

PR #18 remained open/draft at `5534b1b3206156866079d0078da8d5173435e8dc`; PR #19 remained open/draft at `258d89f31bbfbc5352476145c1c71bb5eb8d6b05`. Their current file lists do not overlap the two application files edited here. Their branches and PRs were not changed, merged or rebased. Recheck integration against then-current main before any separately authorized release.

The expected business purpose is clearer Ford tuning relevance and a shorter path from service-area searches to verified evidence, prices and a vehicle-specific enquiry. Impact is a hypothesis, not a measured uplift. Rankings, Google recrawl/indexing and conversion gains are not guaranteed; the regional pages currently lack index inclusion.

Recommended next steps after owner review and a separately authorized release:

1. Review Drenthe discovery in GSC against its actual sitemap/referring links; recheck Google inspection after recrawl. Keep this separate from content changes and avoid mass submissions.
2. For Groningen, consider a small factual service-area revision that foregrounds the Assen workshop, replaces “een korte rit” with location-neutral wording, and adds a verified case plus quotation/appointment path. Do not claim a Groningen workshop, customer origin or travel time. Validate indexing and query/page mapping first; no additional location pages are needed.
3. Compare the same Netherlands query/page segments after sufficient post-release data; evaluate qualified quotation enquiries as well as clicks. Keep the existing main chiptuning landing page and canonical strategy unless later evidence supports a separate decision.

Production remains unchanged by this task: no main push, merge, manual deployment, promotion, DNS/domain change or Vercel project-setting change. No new booking system, forms or analytics provider. **`power.noordtune.nl` and the Power Catalog application, data, routes, metadata, sitemap, structure and deployment settings were not modified.**
