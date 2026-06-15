# Facebook / Manual Result Import Plan

Date: 2026-06-15
Status: prepared architecture only

## Goal

Prepare a safe way to turn owner-provided Facebook-style workshop posts into draft customer results without implementing the full Meta/Facebook API sync yet.

## What Was Added

- `docs/FACEBOOK_RESULT_IMPORT_TEMPLATE.md`
- `data/facebook-result-import.example.json`
- `scripts/import-facebook-results.ts`

The script is a dry-run/manual helper. It does not call Meta APIs, does not require tokens and does not download Facebook images.

## Workflow

1. Owner provides Facebook post data using the template.
2. Data is placed in a local JSON file matching `data/facebook-result-import.example.json`.
3. Run the importer in dry-run mode:

```bash
tsx scripts/import-facebook-results.ts --input=data/facebook-result-import.example.json
```

4. Review the generated draft customer result objects.
5. Optionally write draft JSON for manual review:

```bash
tsx scripts/import-facebook-results.ts --input=data/facebook-result-import.example.json --write --out=data/facebook-result-import.drafts.json
```

6. A developer/admin manually converts an approved draft into `src/content/customer-results.ts`.

## Safety Defaults

Generated drafts use:

- `source: "facebook"`
- `status: "draft"`
- `indexable: false`
- `customerApproved: false`

The importer never publishes automatically.

## Required Review Before Publication

Before a Facebook-sourced result can become public:

- customer approval must be confirmed
- image rights must be confirmed
- visible plates must be explicitly approved or blurred
- no full VIN may be shown
- no customer name/address/private contact data may be shown
- certificate/report references must not expose private numbers
- copy must be rewritten in a professional NoordTune voice
- NL/EN/PL language versions must be reviewed
- vehicle-specific disclaimer must be present

## SEO Rules

Facebook posts should not automatically become SEO blog articles.

Imported posts can become:

- draft social updates
- draft customer results

Only useful, approved customer result pages with enough unique content should become indexable.

Thin imported posts should remain draft or noindex.

## Not Implemented Yet

- no Meta app
- no Page access token
- no Facebook API calls
- no scheduled sync
- no automatic image download
- no admin UI
- no automatic publication
