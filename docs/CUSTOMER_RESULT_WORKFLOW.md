# Customer Result Intake Workflow

This workflow is for turning owner-provided workshop notes, photos or Facebook-style posts into safe customer result drafts.

It does not publish anything automatically.

## Goal

NoordTune customer results should be real vehicle/project cases, separate from SEO articles and separate from short social updates.

Each public customer result must be reviewed for:

- technical accuracy
- customer approval
- image approval
- visible license plate approval
- privacy
- enough useful unique content

## Practical Workflow

1. Owner posts on Facebook or finishes a vehicle project.
2. Owner collects vehicle data and photos.
3. Owner or Codex fills `data/customer-result-intake.template.json`.
4. The draft helper creates safe draft suggestions.
5. Owner checks privacy:
   - no full VIN
   - customer approval confirmed
   - visible plate approval confirmed if a plate is visible
   - no private certificate number
   - no customer address
   - no private contact data
6. The draft is reviewed and manually converted into `src/content/customer-results.ts`.
7. The result stays draft until approved.
8. Publication requires:
   - `status: "published"`
   - `indexable: true`
   - `customerApproved: true`
   - approved image
   - enough unique content
9. After merge, production QA is run and the final URL can be inspected in Google Search Console.

## Intake Template

Use:

```text
data/customer-result-intake.template.json
```

Recommended process:

1. Duplicate the template locally.
2. Fill the duplicate from a Facebook post, workshop note or owner message.
3. Keep private data out of the file.
4. Run the helper in dry-run mode.

The default safety fields are intentionally conservative:

```json
{
  "shouldPublish": false,
  "shouldIndex": false,
  "customerApproved": false,
  "licensePlateApproved": false
}
```

## Draft Helper

Run a dry-run:

```bash
pnpm result:draft data/customer-result-intake.bmw-x3-example.json
```

If `pnpm` is not available in the local shell, use:

```bash
tsx scripts/prepare-customer-result-draft.ts data/customer-result-intake.bmw-x3-example.json
```

The helper:

- reads one or more intake JSON files
- validates required fields
- calculates power/torque gains when stock and tuned values are available
- suggests a slug
- creates NL/EN/PL draft object suggestions
- warns if `customerApproved` is false
- warns if a license plate is visible but not approved
- warns if publishing/indexing is requested without required approvals
- never edits `src/content/customer-results.ts`
- never calls Meta/Facebook APIs
- never downloads Facebook images

Optional local draft output:

```bash
pnpm result:draft data/customer-result-intake.bmw-x3-example.json --write
```

This writes a draft JSON file under:

```text
data/customer-result-drafts/
```

Real local draft JSON files are ignored by git:

```text
data/customer-result-drafts/*.json
```

The `.gitkeep` file keeps the folder available in the repository.

## Example

Safe example file:

```text
data/customer-result-intake.bmw-x3-example.json
```

This file uses the approved BMW X3 E83 2.0d Stage 1 data only as an example for testing the helper.

It must not create a new publication.

## Manual Conversion To Published Content

After review, Codex can manually convert an approved draft into `src/content/customer-results.ts`.

Keep the result as draft unless the owner explicitly approves publication.

Do not publish unless:

- customer approval is confirmed
- image rights are confirmed
- visible plate approval is confirmed if applicable
- no full VIN is present
- no customer name/address/private contact data is present
- no certificate number or private document reference is present
- localized NL/EN/PL copy is reviewed
- result values are checked
- disclaimer is visible

## Publication QA

Before merging a new public customer result:

- build locally
- run content audit
- verify only the approved result route becomes public
- verify demo/draft routes remain 404
- verify sitemap only includes published/indexable results
- verify Power Catalog links point to `https://power.noordtune.nl/`
- verify WhatsApp links point to `https://wa.me/31685759600`
- verify mobile layout
- verify image privacy

After merge:

- check production listing pages
- check production detail page
- check sitemap
- check Open Graph image
- inspect the new URL in Search Console

## Important Boundaries

This workflow does not implement:

- automatic Facebook API sync
- Meta app tokens
- automatic image downloading
- automatic publication
- booking
- file service
- changes to `power.noordtune.nl`
