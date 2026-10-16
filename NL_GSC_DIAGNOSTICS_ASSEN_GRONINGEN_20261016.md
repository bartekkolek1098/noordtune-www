# NoordTune NL diagnosis service — Google Search Console driven SEO/lead update (2026-10-16)

## Why this packet, not another location doorway page

Authoritative connected Google Search Console data, via Windsor.ai on verified `sc-domain:noordtune.nl`, query + page + country, 2026-09-16 through 2026-10-14:
- Netherlands `storingsdiagnose groningen`: **51 impressions, 0 clicks, average position 33.1961**; the page Google showed was `https://www.noordtune.nl/` (root), **not** an existing dedicated diagnosis service.
- Netherlands `auto uitlezen groningen`: **26 impressions, 0 clicks, average position 86.0385** on root, and another small 3-impression row to `/pl` at an even weaker average position.
- These counts are historic small samples, *not* an indexation/lead forecast. Search Console also exposed potential route/locale ambiguity already addressed in previous WWW PR #33; this packet focuses the **diagnostic service intent and customer contact journey**.

The physical workshop is **NoordTune in Assen** and the connected Google Business Profile lists actual tuning workshop, phone, Mon–Sat 09:00–18:00 and appointment-only visit. No invented second location in Groningen. Do not pretend the owner's business operates from Groningen.

## Improvements on existing indexable pages

1. `/nl/auto-diagnose`: differentiating metadata `Auto uitlezen & storingsdiagnose | NoordTune Assen`, source-faithful Dutch search description including visitors from Groningen and diagnostic approach. Explicit service hero with **working diagnosis appointment link** instead of an unsuitable Stage 1 power-lookup CTA.
2. One substantial new **Dutch-only technical diagnostic journey** on the existing generic diagnosis page: how symptoms/history → codes and freeze frames → relevant safe live measurements/logs → documented findings/next-step advice. A code does not prove which part failed; diagnosis is not a guaranteed repair.
3. Original practical pre-visit guidance for a Groningen/Drenthe owner; clarify **single Assen physical workshop**, no remote guarantee; basic diagnosis price displayed dynamically from the existing reviewed `pricingPlans.nl` table (`Basisdiagnose €89,-` incl VAT). Extensive log analysis and repairs are extra as discussed; no new price calculation or claim.
4. Three original visible diagnostic FAQs: remote vs physical reading, expected basic price vs extended diagnosis/repair, emission diagnostics vs road-illegal DPF/SCR/AdBlue deletion. Exact tested contact paths `/nl/afspraak` and original WhatsApp with existing anonymous click tracking.
5. `/nl/auto-diagnose-assen`: distinct local title `Storingsdiagnose Assen | Foutcodes & Meetdata | NoordTune`, honest user intent and hero. Fourth **technical follow-up section** focused on meaningful measurements and what can be decided after an initial read. Two newly written detailed FAQs on when to perform loganalysis and what history to bring. The previous 3 FAQs, original imagery, source pricing and service conditions remain. The primary CTA on this diagnosis landing now offers a real appointment, not a chiptuning-vehicle lookup; bidirectional direct contextual links into the full explanation and emissions-repair information.
6. `/nl/chiptuning-groningen`: preserve honest local city explanation, add one relevant crawlable link to `/nl/auto-diagnose` for customers with a fault that should be investigated before tuning.
7. `/nl` homepage: existing region card becomes **“Storingsdiagnose & auto uitlezen in Assen”**, explaining that customers from Groningen can discuss technical diagnosis while the actual work stays in Assen. No extra location page, fake testimonials, postal address or reviews.
8. `RichInfoSection` now correctly attributes internal appointment CTA clicks with whitelisted `appointment_click` event locale and source; no person, plate, VIN, symptoms, or other customer input is tracked by the new component.

No change to approved Stage 1/Stage 2 power/torque values, third-party tuning sources, legal emissions operation, prices, published photos, original contact form, GBP title/phone/hours, EN/PL translations or canonical URL count (**WWW sitemap 139**, Power Catalog **484**).

## Pre-release and post-release QA

- `pnpm test:seo` including `tests/gsc-nl-diagnostics.test.ts` (3 new evidence/scope checks); `pnpm test:business`, `pnpm test:analytics`, `pnpm typecheck`, `pnpm lint`, `pnpm build`.
- Chrome `NOORDTUNE_WWW_QA_URL=http://127.0.0.1:3167 pnpm qa:diagnostics:www`: both NL diagnosis routes title/canonical/H1, verified pricing and four technical steps, original Assen source metadata/5 FAQs, 3 NL guide FAQs, no indexable extra Groningen doorway, homepage and Groningen landing links, live service → diagnosis → appointment click, CTA analytics, EN/PL untouched, responsive widths 320/390/1440, all linked resources 200, 139 sitemap URLs.
- Rollback tag against previous main commit `0068259df9553e0bc105a86f36dd0bf8fc8ad8e8`; push exact head, await Vercel Preview READY + green GitHub status, merge and repeat public browser QA on `https://www.noordtune.nl`.
- Google ranking improvements cannot be established immediately. Compare actual NL query/page GSC positions/clicks after 2–4 weeks; average position is statistical and Google decides snippet/rank.
