# NoordTune brand assets refresh production QA report

Date: 2026-10-04

Production: [https://www.noordtune.nl](https://www.noordtune.nl)

Tested `main`: `661343640881a201673e3be744818b216073ba25`

## Production QA result

PASS. The approved NoordTune branding package is live and complete. No release blocker was found.

Vercel reported a successful Production deployment for the tested `main` commit:

- Deployment ID: `6845266533`
- Status: `success`
- Description: `Deployment has completed`
- Deployment URL: `https://noordtune-ally4ju2y-bartekkolek1098s-projects.vercel.app`

## Direct asset verification

All 11 expected production assets returned HTTP 200 and matched the corresponding committed owner-package asset after line-ending normalization for text assets.

| Production asset | Result |
| --- | --- |
| `/brand/noordtune-logo-dark.svg` | HTTP 200; exact approved artwork |
| `/brand/noordtune-logo-schema.svg` | HTTP 200; exact approved artwork |
| `/favicon.svg` | HTTP 200; exact approved artwork |
| `/favicon.ico` | HTTP 200; exact approved file |
| `/favicon-16x16.png` | HTTP 200; exact approved file |
| `/favicon-32x32.png` | HTTP 200; exact approved file |
| `/favicon-48x48.png` | HTTP 200; exact approved file |
| `/apple-touch-icon.png` | HTTP 200; exact approved file |
| `/android-chrome-192x192.png` | HTTP 200; exact approved file |
| `/android-chrome-512x512.png` | HTTP 200; exact approved file |
| `/site.webmanifest` | HTTP 200; valid JSON |

The live SVGs declare 600×184 intrinsic dimensions, retain the approved red `#FF0000`, contain no embedded bitmap or SVG filter, and are not altered by a CSS filter.

## Header, mobile menu and footer branding

- The header uses `/brand/noordtune-logo-dark.svg`.
- The mobile menu uses `/brand/noordtune-logo-dark.svg`.
- The footer uses `/brand/noordtune-logo-dark.svg`.
- Each rendered logo loaded with a 600×184 natural size.
- Displayed aspect ratios matched the intrinsic ratio at every tested viewport.
- No logo was stretched, clipped, hidden or recolored by CSS filters.

Focused screenshots of the live header, mobile menu and footer were visually reviewed at mobile, tablet and desktop sizes. The logo remained sharp, proportional and legible without navigation displacement.

## Favicon, app icons and manifest

The live HTML declares the supplied SVG/ICO/16/32/48 favicon set, Apple touch icon and `/site.webmanifest`. The manifest parsed successfully and contains:

- theme and background color `#111111`;
- `/android-chrome-192x192.png` as a 192×192 PNG;
- `/android-chrome-512x512.png` as a 512×512 PNG;
- the supplied name, short name, display mode and start URL.

Both manifest icon URLs returned HTTP 200. No service worker was registered.

## Structured data and SEO metadata

- Homepage `AutoRepair.logo` and `AutoRepair.image` point to `https://www.noordtune.nl/brand/noordtune-logo-schema.svg`.
- Representative blog and customer-result Article author/publisher Organization objects use the same schema logo.
- Explicit Organization `ImageObject` dimensions are 600×184.
- Every JSON-LD block on the tested pages parsed successfully.
- Titles, descriptions, self-referencing canonicals and hreflang links were present on every tested route.
- The sitemap returned HTTP 200 and contained every representative route.
- Representative blog and customer-result Open Graph images matched their existing content artwork, not the schema logo.

The release diff from the pre-branding main commit changed only the approved structured-data logo references/dimensions and root icon, manifest and theme metadata. No blog, customer-result, brand-page, route, sitemap, robots, redirect, content-data or lockfile file changed.

## Responsive production matrix

The following ten production routes passed at 390×844, 430×932, 768×1024, 820×1180, 1180×820 and 1440×1000, for 60 route/viewport checks:

- `/nl`
- `/en`
- `/pl`
- `/nl/chiptuning`
- `/nl/contact`
- `/nl/afspraak`
- `/nl/resultaten`
- `/nl/blog`
- `/nl/bmw-chiptuning`
- `/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1`

Every page returned HTTP 200, rendered one H1, retained its canonical and hreflang metadata, contained the exact Power Catalog destination, and had no console errors or horizontal overflow.

At 820×1180, the Power Catalog metrics remained inside the viewport and did not overlap.

## Regression results

- NL contact and appointment enquiry composers generated editable localized previews.
- Correctly encoded WhatsApp handoffs were verified with external navigation intercepted; no message was sent.
- Clipboard copy behavior succeeded against production.
- Facebook and Instagram links used the exact verified URLs, opened in a new tab, used safe `noopener noreferrer` attributes and had no opener.
- TikTok and YouTube remained hidden.
- The homepage displayed exactly three customer project cards.
- The NL results archive contained the expected seven published results.
- Blog and customer-result Open Graph artwork remained unchanged.
- All Power Catalog links pointed exactly to `https://power.noordtune.nl/`.

## Repository validation

The repository does not define generic `content` or `test` scripts, so the exact existing focused commands from `package.json` were used.

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages generated |
| `pnpm content:audit` | Pass |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:enquiry` | Pass; 11 tests |

## Scope confirmation

No feature or production configuration change was made during this QA. `power.noordtune.nl`, Power Catalog files, routes, metadata, sitemap and vehicle data were not modified. The production QA work produced only this report for commit to `main`.
