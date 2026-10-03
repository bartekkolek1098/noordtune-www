# Homepage freshness and technical SEO production QA report

Date: 2026-10-03

## Production QA result

PASS. Final QA was run from clean, synchronized `main` at `7e7b36c87f821d8b84d4c5228ee3283643c07bb3` against `https://www.noordtune.nl`.

The feature deployment `dpl_FH6dLGV5LXuK6cc8ScUiizEiGywg` and the later merge-report deployment `dpl_DXncEtEKnSgQ8Cwr8aqRRepiVGiT` both reported production, READY and PROMOTED with no alias error before live QA.

There are no production blockers. One initial local browser attempt encountered the Windows host error `ERR_NO_BUFFER_SPACE` on an image request. After closing a stale browser session, the unchanged production build completed the full suite successfully. The separate live production matrix also completed successfully, so the error was not reproducible as a website fault.

## Commands and automated checks

The repository has no generic `content` or `test` script. The existing focused script names were used:

- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: passed; 141 static pages generated.
- `pnpm content:audit`: passed.
- `pnpm test:seo`: passed, 7 tests.
- `pnpm test:enquiry`: passed, 11 tests.
- `pnpm test:seo:browser`: passed against the latest-main production build at 390x844, 820x1180, 1180x820 and 1440x1000; 84 unique internal links resolved.
- `pnpm test:enquiry:browser`: passed, 40 cases, including no-JS, blocked-hydration, mobile navigation and iPad Power Catalog regressions. External navigation was intercepted and no message was sent.

The independent live production matrix passed 72 page loads and audited 520 rendered images. It covered all four required viewports, every requested regression route, all localized homepages, all localized enquiry routes, representative translated article/result groups and all three result archives.

## Homepage freshness

- `/nl`, `/en` and `/pl` each render exactly three project cards: Ford Transit Connect, Toyota ProAce Verso VIP and BMW F40 118i.
- Each localized latest-content block renders the expected two published articles with the correct locale route.
- Appointment CTAs resolve to `/nl/afspraak`, `/en/appointment` and `/pl/termin`.
- Results CTAs resolve to `/nl/resultaten`, `/en/results` and `/pl/rezultaty`.
- The NL, EN and PL results archives each still render seven published customer results.
- Every rendered Power Catalog link remains exactly `https://power.noordtune.nl/`.

## Structured data and image semantics

- Every JSON-LD block encountered in the live matrix parsed successfully.
- Article Organization author and publisher objects contain the official `https://www.noordtune.nl/brand/noordtune-logo.png` image with the expected 260 by 75 dimensions.
- Canonicals were self-referencing on all tested home, general, article, customer-result and SEO landing routes.
- Meaningful images had contextual non-empty alt text. Decorative hero, service and Power Catalog imagery used empty alt text with `aria-hidden="true"`.

## Hreflang and x-default

- The tested cost article group linked reciprocally and only to `/nl/blog/wat-kost-chiptuning`, `/en/news-blog/what-does-chiptuning-cost` and `/pl/aktualnosci-blog/ile-kosztuje-chiptuning`.
- The tested Ford Transit Connect case linked reciprocally and only to the same case slug under the NL, EN and PL result archives.
- Article and customer-result detail pages did not emit `x-default`.
- Localized homepages emitted NL, EN, PL and the intended site-root `x-default`.
- `/nl/chiptuning` emitted the intended general-page alternates and NL `x-default`.

## Responsive and regression result

- `/nl/chiptuning`, `/nl/chiptuning-assen`, `/nl/contact`, `/nl/afspraak`, `/nl/resultaten`, `/nl/blog`, `/nl/bmw-chiptuning`, the Ford Transit Connect result and representative NL/EN/PL articles returned HTTP 200 at every requested viewport.
- No tested page produced horizontal overflow, page exceptions or console errors.
- At 820x1180, visible Power Catalog CTAs remained within the viewport in all three homepage locales.
- Visual review of the NL latest-content area at 390px and 820px found no clipping, overlap or broken layout.
- `/nl/chiptuning-assen` remained live and self-canonical. It was not consolidated, redirected, removed or recanonicalized.

## Enquiry and social regression

- All NL, EN and PL contact and appointment composers accepted a service and required description and generated the expected editable localized preview.
- Phone, email and the central WhatsApp alternative remained present. No form, WhatsApp handoff, clipboard action or external contact request was submitted during live QA.
- Facebook remained `https://www.facebook.com/profile.php?id=61590085682134` and Instagram remained `https://www.instagram.com/noordtune.nl`; both opened in a new tab with `noopener noreferrer`.
- TikTok and YouTube remained hidden.

## Scope confirmation

`power.noordtune.nl` was not modified. No Power Catalog route, sitemap, metadata, catalog data, structure, DNS or Vercel setting changed. No product feature or content item was added during this QA task.
