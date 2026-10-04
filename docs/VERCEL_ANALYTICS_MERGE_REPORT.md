# NoordTune Vercel Analytics merge report

Date: 2026-10-04

PR: [#17](https://github.com/bartekkolek1098/noordtune-www/pull/17)

Accepted head: `0a59eddfcfde3bf9b7961bab6d175c94c33ae144`

## Merge result

PR #17 was confirmed open and mergeable with the exact approved head SHA and successful Vercel checks immediately before merge. It was squash merged into `main` without deleting the feature branch.

Merge commit: `e906ffa9696e8a753020f74e0193d90e559a1a8f`

Local `main` was fast-forwarded after the merge and matched `origin/main`. The remote `feature/vercel-conversion-analytics-2026-10` branch remained available at the accepted head.

## Pre-merge scope and privacy audit

- `@vercel/analytics` is the only analytics provider in the application and the only dependency added by the PR.
- No GA4, Google Tag Manager, Meta Pixel, Speed Insights, Web Analytics Plus or other analytics provider was added.
- The typed helper permits only `whatsapp_click`, `appointment_click`, `appointment_enquiry_started`, `appointment_whatsapp_handoff`, `power_catalog_click`, `customer_result_click`, `blog_article_click`, `brand_page_click`, `phone_click` and `email_click`.
- Every custom event has exactly two properties: `locale` plus either `source` or `slug`.
- Event payloads cannot contain a name, phone number, email address, registration, VIN, free text, requested date or WhatsApp message content.
- The browser interception and unit tests confirmed that generated enquiry text does not enter analytics payloads.
- The Power Catalog destination remained exactly `https://power.noordtune.nl/`.
- No Power Catalog route, sitemap, metadata, catalog data or structure changed.

## QA results

The repository does not define generic `content` or `test` scripts. The existing focused script names from `package.json` were used.

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

The checks cover the event allowlist, two-property limit, PII exclusion, analytics mounting, enquiry-message exclusion, exact Power Catalog destination, NL/EN/PL enquiry behavior, homepage/SEO invariants and branding invariants.

## Production deployment and Web Analytics

Vercel completed Production deployment `dpl_4HME9uLvqbemwLYJkK9pNwBbhfBE` for merge commit `e906ffa9696e8a753020f74e0193d90e559a1a8f`.

- GitHub/Vercel status: `success`
- Description: `Deployment has completed`
- Production alias: `https://www.noordtune.nl`
- `https://www.noordtune.nl/nl`: HTTP 200
- Production Analytics loader: HTTP 200 with JavaScript content
- Browser verification: the Vercel Analytics queue is mounted and the page reports no console errors

Vercel Web Analytics is active in production. The live page contains the approved analytics attributes and loader; no custom event with PII was emitted during production verification.

## Final scope confirmation

The approved Vercel Web Analytics integration, privacy-safe custom events, localized NL/EN/PL privacy disclosure, typed helper and analytics tests are now on `main`. No DNS, domain or Vercel project-setting change was made during this merge task. No customer-result fact, blog content or brand-page content was changed. `power.noordtune.nl` was not modified.
