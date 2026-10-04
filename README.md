# NoordTune.nl Main Website

Custom premium marketing website for `https://www.noordtune.nl`.

## Scope

- Main marketing website only.
- The power catalog remains separate at `https://power.noordtune.nl/`.
- No RDW lookup, vehicle database, tuning catalog or Stage 1/2/3 logic is implemented here.
- WordPress remains backup/reference only.

## Local Development

```bash
PATH="/Users/bartk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm install
PATH="/Users/bartk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm dev --hostname 127.0.0.1 --port 3001
```

Open `http://127.0.0.1:3001/nl`.

## Verification

```bash
PATH="/Users/bartk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm typecheck
PATH="/Users/bartk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm lint
PATH="/Users/bartk/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" pnpm build
```

## Content

Structured content lives in:

- `src/content/site.ts`
- `src/content/copy.ts`

Routes use locale prefixes:

- `/nl`
- `/en`
- `/pl`

## Assets

The active owner-supplied web branding assets are:

- `public/brand/noordtune-logo-dark.svg` for the dark header, mobile menu and footer.
- `public/brand/noordtune-logo-schema.svg` for structured data on a light background.
- `public/favicon.svg`, PNG favicon fallbacks, `public/favicon.ico` and `public/apple-touch-icon.png`.
- `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png` and `public/site.webmanifest`.

Brand asset rules:

- Use the dark-background SVG directly; do not apply a CSS invert filter.
- Keep the 600×184 intrinsic dimensions when the full logo is used.
- Use the light-background SVG at a stable absolute URL for schema markup.
- The legacy PNG logo and icon remain in the repository only for historical documentation and rollback references.

Replace hero and section imagery here:

- `public/images/heroes/`
- `public/images/sections/`
- `public/images/results/`

The current images are safe local/owner-supplied assets, generated visual placeholders and documented Wikimedia Commons model images for result cards. Public image credits are listed in `public/IMAGE_CREDITS.txt`; the working asset note is in `docs/IMAGE_ASSET_CREDITS.md`. Before final launch, replace any remaining placeholders with owned/generated high-resolution workshop, ECU, diagnostics, dyno/logging and customer-result imagery where available.

## Deployment

Deploy as a standalone Next.js project for `www.noordtune.nl`.

Recommended Vercel settings:

- Framework: Next.js
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output: Next.js default
- Production domain: `www.noordtune.nl`

Point DNS for `www.noordtune.nl` to the deployment provider. Keep `power.noordtune.nl` pointing to the existing catalog app.
