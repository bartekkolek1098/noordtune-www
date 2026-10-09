# NoordTune WWW — 90-day organic acquisition plan

Created: 2026-10-09. Window: 2026-10-09 through 2027-01-07.
Scope: www.noordtune.nl only. The separate power.noordtune.nl repository is out of scope.
Business objective: more qualified, booked Stage 1 / Stage 2, ECU remap and DSG/TCU jobs from the Netherlands, not simply more impressions or generic diagnostic enquiries.

## Verified Dutch Search Console baseline

Source: connected Windsor.ai Google Search Console, property sc-domain:noordtune.nl; country Netherlands; 2026-07-01 through 2026-10-05. Search Console data can lag; query totals and URL-specific impressions are not additive.

| Dutch query | Clicks | Impressions | Average position |
| --- | ---: | ---: | ---: |
| chiptuning assen | 9 | 181 | 9.35 |
| chiptuning drenthe | 0 | 72 | 20.11 |
| chiptuning groningen | 0 | 367 | 64.35 |
| ford chiptuning | 0 | 67 | 32.21 |

Query + landing page evidence: for 'chiptuning assen' the leading NoordTune URL is /nl/chiptuning (156 impressions, 9 clicks, position 6.32); /nl/contact also appears (46 impressions, position 19.41). For 'chiptuning drenthe' /nl/chiptuning appears in 70 URL-level impressions; for 'ford chiptuning' /nl/ford-chiptuning has 63 impressions. The dedicated regional landing pages are not currently the search leaders in these splits.

Historical October 4 index coverage reports listed 68 indexed / 67 unindexed URLs in a main-site sitemap filter, including discovered but unindexed tuning pages. This is a dated observation, NOT proof of today's index state. Diagnose with Google Search Console URL Inspection before changing canonicals or redirect behavior.

Vercel custom analytics started October 4; initial event counts are too small for a reliable funnel rate. Do not equate a CTA click with a paying lead.

## Immediate implementation (Oct 9–23): first high-intent gains

- Review and safely integrate independent draft PR #18 (workshop equipment + visible ZICHTGROEI footer credit) and draft PR #19 (NL service navigation, approved Stage 2/TCU proof and enquiry path), each with owner approval and a combined regression pass. Preview and code work are permitted now; do not auto-merge or auto-deploy to production.
- Correct AutoRepair.makesOffer to typed Offer/Service structures and remove unverified hard-coded sitemap lastModified values for core, generic landing and brand pages. Preserve dates that originate from approved editorial article/result records. Add tests.
- Audit /nl/chiptuning vs /nl/chiptuning-assen, /nl/chiptuning-drenthe, /nl/chiptuning-groningen using Search Console query→URL evidence; preserve routes and canonical signals until a verified reason to change exists.
- Check service navigation, customer proof, pricing and quotation links on mobile, without increasing homepage length. Maintain exact https://power.noordtune.nl/ links.
- Confirm Vercel Web Analytics events and log manually: real WhatsApp enquiries, quotes sent, bookings and completed jobs (no customer data in analytics).

## Days 15–30 (Oct 24–Nov 7): commercial NL page quality

- Improve /nl/chiptuning, /nl/stage-1-tuning, /nl/stage-2-tuning, /nl/ecu-remap, /nl/dsg-tcu-tuning with concise helpful content, relevant owner-approved technical proof and accurate pricing paths, conditional on URL Inspection outcomes.
- Strengthen /nl/ford-chiptuning and the highest-opportunity BMW/Audi/VW pages using relevant published results. Never invent dyno measurements, case outcomes, manufacturer endorsements or warranties.
- Review titles and descriptions on queries where impression volume and current position justify testing; record exact before/after release date.
- Examine mobile experience and actual field Core Web Vitals if available. Keep existing styles if measured performance is good.
- Owner-led: validate Google Business Profile category, services, location, phone and website; start asking actual customers for unfiltered, voluntary reviews.

## Days 31–60 (Nov 8–Dec 8): index coverage and regional authority

- Individually inspect high-value URLs reported excluded, recording live status, last crawl, Google-selected canonical, discovered internal links and whether quality/duplication is plausible; implement only verified fixes.
- Test root / versus /nl Google-selected canonical and language redirect with crawler/search evidence; avoid speculative changes.
- Strengthen Assen and Drenthe pages with verified workshop location, actual capabilities, real results and clear appointment steps.
- For Groningen, improve evidence that NoordTune serves the area from Assen; never claim a Groningen workshop, fake local addresses or customer cases.
- Add only original owner-verified tuning projects and articles answering distinct customer questions supported by Search Console, not mass city pages.
- Seek legitimate references from real workshops, suppliers and automotive partners; no paid-link schemes or manipulative footer cross-links.

## Days 61–90 (Dec 9–Jan 7): iterate on lead quality

- Compare Google Search Console Dutch non-branded clicks/queries/pages in equal-length periods; review indexability and CTR with position changes.
- Compare Vercel unique visitors, page views, Power Catalog clicks, appointment enquiry starts, WhatsApp handoffs with dates and traffic changes.
- Manually record qualified enquiries, quotations, booked tuning work and actual sales by acquisition channel where the customer voluntarily provides it, outside analytics event payloads.
- Improve the single weakest high-traffic customer journey based on evidence; avoid simultaneous large redesigns that erase attribution.
- Assess whether additional distinct service pages are warranted, using verified search demand and owner-approved service capability. Plan the next 90 days.

## KPIs and release discipline

Weekly: NL Google impressions/clicks/CTR by priority query and landing URL, index coverage changes, page and CTA events, qualified tuning enquiries and bookings.
Monthly: 28-day comparable organic windows, conversion from qualified enquiry to booking, organic share of actual jobs, work completed and rejected hypotheses.
No invented traffic forecasts, ranking promises or guaranteed revenue.

Every implementation: clean feature branch, small diff, relevant lint/typecheck/tests and browser checks once, GitHub draft PR + Vercel Preview, owner approval before merging. Keep PR #18/#19 independent until approved and reconcile shared renderer changes through a tested integration.
