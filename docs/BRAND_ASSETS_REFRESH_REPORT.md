# NoordTune brand assets refresh report

Date: 2026-10-04

Branch: `feature/brand-assets-refresh-2026-10`

Source package: `NoordTune_Logo_Kompletny_Pakiet.zip`

## Result

The main NoordTune website now uses the owner-supplied web logo, favicon, Apple touch icon, Android icons and web manifest. The dark-background logo is active in the header, mobile menu and footer. Structured data uses the light-background logo at the stable absolute URL `https://www.noordtune.nl/brand/noordtune-logo-schema.svg` with its actual 600×184 intrinsic dimensions.

No site content, feature behavior, route, canonical, hreflang, sitemap, contact data, dependency, lockfile or Power Catalog configuration changed.

## Source-package audit

The archive was inspected before assets were copied. `START-TUTAJ.txt` and `07_WWW/README-WWW.txt` were read and followed. Only files from `07_WWW` were selected. No print export, source file or preview image was added to the site.

- `logo-dark.svg` is the supplied white/red full logo for dark backgrounds.
- `logo.svg` is the supplied black/red full logo for light backgrounds and schema consumers.
- Both full-logo SVGs declare `width="600"`, `height="184"` and `viewBox="80 72 600 184"`.
- Both SVGs use vector outlines, have transparent backgrounds and contain no embedded bitmap or filter.
- The favicon SVG contains the package's built-in color-scheme behavior. No CSS inversion was added.
- PNG dimensions were verified from their IHDR data. The ICO contains 16, 24, 32, 48, 64, 128 and 256 pixel layers.

## Added owner assets

| Public path | Purpose | Verified size |
| --- | --- | --- |
| `/brand/noordtune-logo-dark.svg` | Header, mobile menu and footer | 600×184 |
| `/brand/noordtune-logo-schema.svg` | Structured-data logo | 600×184 |
| `/favicon.svg` | Primary adaptive favicon | 180×180 viewBox |
| `/favicon.ico` | Multi-size browser fallback | 16–256 px layers |
| `/favicon-16x16.png` | PNG favicon fallback | 16×16 |
| `/favicon-32x32.png` | PNG favicon fallback | 32×32 |
| `/favicon-48x48.png` | PNG favicon fallback | 48×48 |
| `/apple-touch-icon.png` | Apple touch icon | 180×180 |
| `/android-chrome-192x192.png` | Manifest icon | 192×192 |
| `/android-chrome-512x512.png` | Manifest icon | 512×512 |
| `/site.webmanifest` | Web-app metadata supplied in the package | JSON |

## Integration

- Header, mobile-menu and footer `next/image` declarations now use `/brand/noordtune-logo-dark.svg` with 600×184 intrinsic dimensions. Existing responsive display widths remain in place.
- Root metadata declares the supplied SVG, ICO, 16/32/48 PNG favicon set, Apple touch icon and `/site.webmanifest` once each.
- Viewport metadata uses the package theme color `#111111`.
- The supplied manifest remains unchanged and its two Android icon URLs resolve locally.
- `AutoRepair.image`, `AutoRepair.logo` and Article publisher/author Organization logos now use the stable schema-logo URL.
- The Organization `ImageObject` declares the actual 600×184 dimensions.
- No service worker or other PWA behavior was added.

The legacy `public/brand/noordtune-logo.png` and `public/brand/noordtune-icon.png` files remain only because historical reports and rollback documentation still refer to them. Active application code and metadata no longer reference either legacy PNG.

## Validation

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages generated |
| `pnpm content:audit` | Pass |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:enquiry` | Pass; 11 tests |
| `pnpm test:brand:browser` | Pass; 14 routes at 6 viewports |
| `pnpm test:seo:browser` | Pass; 84 unique internal links resolved |
| `pnpm test:enquiry:browser` | Pass; 40 cases |

Brand browser QA covered 390×844, 430×932, 768×1024, 820×1180, 1180×820 and 1440×1000. It checked the NL/EN/PL home, contact and appointment pages plus a blog article, customer result, chiptuning page, diagnostics page and brand page. Final checks confirmed:

- supplied logos load and remain visible in the header, mobile menu and footer;
- all 11 branding and metadata assets return HTTP 200;
- HTML icon, Apple icon, manifest and theme-color metadata are present;
- manifest JSON parses and both declared icons return HTTP 200;
- homepage and article JSON-LD parse and use the expected schema logo;
- no horizontal overflow or console errors occur in the tested matrix;
- no service worker is registered;
- Power Catalog links still point exactly to `https://power.noordtune.nl/`.

Focused visual review of the captured mobile and desktop header, mobile menu and footer confirmed that the logo remains sharp, proportional and readable without clipping or navigation displacement.

## Scope boundaries

`power.noordtune.nl` and all Power Catalog code, routes, data, SEO, sitemap, metadata and layout remain unchanged. No contact data, customer-result facts, blog content, brand-page content, DNS, domain or Vercel project setting was changed. No PWA, service worker or unrelated feature was added.
