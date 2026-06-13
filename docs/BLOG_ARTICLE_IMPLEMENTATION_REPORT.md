# Blog Article Implementation Report

Date: `2026-06-13`  
Status: implemented for release-candidate preview

## Summary

The Nieuws & Blog / News & Blog / Aktualności cards are no longer dead cards. They now link to full educational article pages.

The blog is treated as a knowledge base for evergreen SEO content. Facebook-style vehicle posts and customer result posts are intentionally kept out of the SEO article model.

## Article Routes Created

Dutch:

- `/nl/blog/wat-is-chiptuning`
- `/nl/blog/stage-1-vs-stage-2`
- `/nl/blog/is-ecu-remap-veilig`
- `/nl/blog/adblue-storing-uitgelegd`
- `/nl/blog/5-tips-na-een-tuning`
- `/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is`

English:

- `/en/news-blog/what-is-chiptuning`
- `/en/news-blog/stage-1-vs-stage-2`
- `/en/news-blog/is-ecu-remap-safe`
- `/en/news-blog/adblue-fault-explained`
- `/en/news-blog/5-tips-after-a-tune`
- `/en/news-blog/why-diagnostics-before-tuning-matter`

Polish:

- `/pl/aktualnosci-blog/co-to-jest-chiptuning`
- `/pl/aktualnosci-blog/stage-1-vs-stage-2`
- `/pl/aktualnosci-blog/czy-remap-ecu-jest-bezpieczny`
- `/pl/aktualnosci-blog/usterka-adblue-wyjasnienie`
- `/pl/aktualnosci-blog/5-zalecen-po-chiptuningu`
- `/pl/aktualnosci-blog/dlaczego-diagnostyka-przed-tuningiem-jest-wazna`

## Files Added

- `src/content/blog-articles.ts`
- `src/content/blog-articles-data-nl.ts`
- `src/content/blog-articles-data-en.ts`
- `src/content/blog-articles-data-pl.ts`
- `src/app/[locale]/[slug]/[articleSlug]/page.tsx`
- `src/components/blog-article-renderer.tsx`
- `src/content/customer-results.ts`
- `docs/CONTENT_ARCHITECTURE_RESULTS_AND_SOCIAL.md`
- `docs/BLOG_ARTICLE_IMPLEMENTATION_REPORT.md`

## SEO Features

Each published article has:

- unique route
- unique metadata title and description
- canonical URL
- Open Graph metadata
- Article JSON-LD
- FAQ JSON-LD when FAQ content exists
- localized CTAs
- Power Catalog CTA
- WhatsApp CTA
- internal related links

## Blog Cards

Blog cards now render as links using:

- `src/components/cards.tsx`
- `blogArticlePath(locale, post.slug)`

The audit checks that every blog card has a matching article route.

## Customer Results Separation

Vehicle modification posts are not SEO articles.

Prepared model:

- `src/content/customer-results.ts`

Current result cards use indicative/demo content. Future real customer results can include:

- vehicle photos
- make/model/engine/year
- Stage/service
- stock and tuned power/torque
- ECU/TCU notes
- source URL when imported from Facebook
- customer approval state
- disclaimer

## QA Coverage

`pnpm content:audit` now checks:

- every blog card has a valid article route
- every required article route is present in static params
- every published article has metadata
- Polish article content has diacritics and no obvious English CTA leftovers
- social/Facebook content is not mixed into SEO articles
- customer result links point to the correct Power Catalog and WhatsApp URLs
- no local `/power` links are introduced

## Local QA Result

Completed on `2026-06-13`:

- `pnpm lint` passed
- `pnpm typecheck` passed
- `pnpm build` passed and generated `72` static pages
- `pnpm content:audit` passed
- `pnpm screenshots` passed
- direct local article route audit passed for `18` article pages
- blog listing links were confirmed for Dutch, English and Polish

## Important Non-Implementation

No Facebook API sync was implemented.

No booking logic was implemented.

No file service was implemented.

The existing `power.noordtune.nl` app was not modified.
