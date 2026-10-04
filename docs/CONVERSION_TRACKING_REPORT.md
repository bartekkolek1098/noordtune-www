# NoordTune conversion tracking audit

Date: 2026-10-04

Branch: `feature/conversion-tracking-2026-10`

Production audited: [https://www.noordtune.nl](https://www.noordtune.nl)

## Outcome

No analytics system currently exists in the main NoordTune website. In accordance with the task's explicit stop condition, this branch does not install analytics, initialize a provider, add conversion events, add a consent banner, or change runtime code.

This is an audit-only change. The only tracked file added by the task is this report.

## Current analytics audit

### 1. Analytics system

None detected.

Repository searches covered GA4, Google Analytics, Google Tag Manager, `gtag`, GTM container IDs, `dataLayer`, analytics packages, Vercel Analytics, Meta/Facebook Pixel, Clarity, consent handling and cookie banners.

- `package.json` contains no analytics dependency.
- Active source contains no analytics import, tag snippet, provider component, event call or data layer.
- Git history contains no prior `@vercel/analytics`, Google Tag Manager or `dataLayer` integration.
- No tracked or local `.env` file is present.
- Active source and configuration contain no environment-variable consumer for an analytics or measurement identifier.
- No local `.vercel/project.json` link is present.

### 2. Initialization

There is no analytics initialization in the root layout, page layouts, components, middleware or configuration.

### 3. Production measurement IDs

No GA4, GTM, Universal Analytics or Google Ads measurement ID was found in tracked configuration, active source, generated production HTML or production browser globals.

The Vercel dashboard's environment-variable inventory was not read or changed. Even if an unused value existed there, the deployed application has no code path that consumes an analytics identifier.

### 4. Consent and cookies

There is no analytics-consent mechanism or cookie banner. The only cookie behavior in application source is the functional `noordtune_locale` preference set by the language switcher.

A fresh production browser context contained no cookies, local-storage keys or session-storage keys during `/nl`, `/nl/contact` and `/nl/afspraak` navigation. No consent mechanism was bypassed and no new banner was added.

### 5. Existing conversion events

None detected. No CTA, enquiry, phone, email, social, result, article, brand or Power Catalog interaction currently emits an analytics event.

### 6. Automatic page views

Automatic page views are not currently tracked. Production navigation across `/nl`, `/nl/contact` and `/nl/afspraak` produced:

- zero analytics scripts;
- zero analytics requests;
- zero non-GET beacon/write requests;
- no `dataLayer`, `gtag`, `fbq`, Clarity or Vercel Analytics global;
- no measurement-ID match in rendered HTML.

## Events implemented

None. The requested event names remain a proposed model for a separately approved implementation:

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

No production analytics events were sent during this audit or its automated tests.

## Privacy safeguards

Because no analytics code was added, the website continues to send none of the following to an analytics provider:

- customer names;
- phone numbers or email addresses;
- registration plates or VINs;
- free-text enquiry or diagnostic content;
- WhatsApp message bodies;
- custom IP-derived identifiers;
- form contents of any kind.

The existing enquiry composer remains client-side and does not store its fields for analytics.

Any future analytics helper should accept only closed, typed event names and closed, typed parameters such as locale, source page, destination type, predefined service type, result slug, article slug or brand. It should have no API shape capable of accepting arbitrary form objects or free text, and it should fail as a no-op when the provider is unavailable or blocked.

## Recommendation and required owner decision

The smallest technical fit is likely Vercel Web Analytics because the website is already deployed on Vercel and the official product supports automatic page views and client-side custom events. This is a recommendation only, not an implementation or legal conclusion.

Before any code is added, the owner must:

1. explicitly approve the analytics provider;
2. confirm the Vercel plan supports custom events, because Vercel currently documents custom events for Pro and Enterprise plans;
3. approve the desired page-view and conversion-event scope;
4. decide the consent and privacy-notice treatment appropriate for NoordTune;
5. authorize dashboard enablement and the new `@vercel/analytics` dependency if Vercel Web Analytics is selected.

Relevant official documentation:

- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart)
- [Tracking custom events](https://vercel.com/docs/analytics/custom-events)
- [Privacy and compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Limits and pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Redacting sensitive data](https://vercel.com/docs/analytics/redacting-sensitive-data)

If the owner selects GA4 or GTM instead, a production measurement/container ID and an approved consent approach would be required before implementation. No provider should be installed until that decision is made.

## Validation

| Check | Result |
| --- | --- |
| Repository analytics/provider search | Pass; none found |
| Production script/global/request audit | Pass; none found |
| Production measurement-ID scan | Pass; none found |
| Production cookie/storage audit | Pass; empty fresh context |
| `pnpm lint` | Pass; zero warnings after temporary audit cleanup |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages generated |
| `pnpm content:audit` | Pass |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:enquiry` | Pass; 11 tests |
| `pnpm test:enquiry:browser` | Pass; 40 cases, external navigation intercepted |
| `pnpm test:seo:browser` | Pass; 84 internal links resolved |

The browser suites confirmed no console errors or horizontal overflow, working CTA destinations, intact NL/EN/PL enquiry composition and WhatsApp handoff, exactly three homepage customer projects, seven results per localized archive, intact blog and brand routes, the iPad Power Catalog layout, and the verified Facebook and Instagram links.

## Files changed

- `docs/CONVERSION_TRACKING_REPORT.md`

No application, content, dependency, lockfile, DNS, domain or Vercel project-setting file changed.

## Scope confirmation

`power.noordtune.nl` was not modified. Power Catalog SEO, routes, sitemap, metadata and vehicle data remain unchanged. Customer-result facts, blog content, brand-page content, contact/appointment behavior, DNS, domains and Vercel project settings remain unchanged.
