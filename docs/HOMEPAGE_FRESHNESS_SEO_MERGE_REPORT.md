# Homepage freshness and technical SEO merge report

Date: 2026-10-03

## Merge result

- PR: `#14` — `Refresh homepage activity and technical SEO`
- Approved head: `d9d4eda74420b1057ca05c8674153dfadaded596`
- Method: squash merge into `main`
- Merge commit: `d5c3e764fb001689569b1578e9e85bd51547d155`
- Local `main` was fast-forwarded to the merge commit and matched `origin/main` before this report was added.
- The local and remote `feature/homepage-freshness-seo-2026-10` branches were retained for production QA.

## Pre-merge guards

- The PR was open, mergeable and reported a clean merge state immediately before merging.
- The PR head matched the approved SHA exactly.
- Vercel and Vercel Preview Comments checks were successful.
- No dependency versions or lockfiles changed. The `package.json` change added only the focused SEO test scripts.
- The only configured Power Catalog destination remained exactly `https://power.noordtune.nl/`.

## QA results

The repository has no generic `content` or `test` scripts. The existing `content:audit`, `test:seo`, `test:enquiry`, `test:seo:browser` and `test:enquiry:browser` scripts were used.

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed; 141 static pages generated.
- `pnpm content:audit`: passed.
- `pnpm test:seo`: passed, 7 tests.
- `pnpm test:enquiry`: passed, 11 tests.
- `pnpm test:seo:browser`: passed against the production build at 390x844, 820x1180, 1180x820 and 1440x1000. The suite verified the three-card homepage limit, localized latest content, exact Power Catalog links, alt text, canonicals, hreflang, JSON-LD, requested routes, no horizontal overflow, no console errors and 84 internal links.
- `pnpm test:enquiry:browser`: passed, 40 cases. It covered NL/EN/PL contact and appointment flows, no-JS and blocked-hydration behavior, blog/brand/result regressions, mobile navigation and the iPad Power Catalog layout. External navigation was intercepted and no message was sent.

## Production result

- Vercel deployment: `dpl_FH6dLGV5LXuK6cc8ScUiizEiGywg`
- Deployment source: exact merge commit `d5c3e764fb001689569b1578e9e85bd51547d155` on `main`
- Target and status: production, READY
- Production alias: `https://www.noordtune.nl`
- Live, non-submitting browser QA passed for the homepage at all four required viewports; representative blog, brand and customer-result routes; `/nl/chiptuning`; `/nl/chiptuning-assen`; and every NL/EN/PL contact and appointment page.
- The live homepage shows exactly three customer-project cards, the localized latest-content element, the appointment path and exact Power Catalog links. The 820px check confirmed the Power Catalog CTA remains within the viewport.
- Live article and customer-result pages expose only the expected reciprocal NL/EN/PL alternates, retain self canonicals and omit detail-page `x-default`. Article Organization data exposes the existing local NoordTune logo.
- Live enquiry composers accepted the required service and description fields and generated localized editable previews. No form, WhatsApp handoff or other external contact action was submitted.

## Scope confirmations

- `/nl/chiptuning-assen` remains available with its self canonical. It was not consolidated, redirected or removed, and the canonical strategy for it and `/nl/chiptuning` was not changed.
- `power.noordtune.nl` was not modified. No Power Catalog route, sitemap, metadata, catalog data, structure, DNS or Vercel setting was changed.
- No new blog article, customer result, booking database, payment flow or other feature was added during the merge task.
