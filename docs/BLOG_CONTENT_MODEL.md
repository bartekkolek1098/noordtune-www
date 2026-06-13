# Blog Content Model

Project: NoordTune.nl main website  
Status: pre-launch architecture note  
Date: 2026-06-12

## Purpose

The blog should become a useful knowledge base, not a stream of thin updates. NoordTune.nl has three different content needs that should stay separate.

## Content Types

### SEO Articles

Evergreen educational articles written around search intent.

Examples:

- Wat is chiptuning?
- Stage 1 vs Stage 2: wat is het verschil?
- Is ECU remap veilig voor mijn motor?
- AdBlue storing uitgelegd
- 5 tips na een tuning
- Waarom diagnose vóór tuning belangrijk is

Recommended fields:

- `slug`
- `locale`
- `title`
- `metaTitle`
- `metaDescription`
- `category`
- `readTime`
- `heroImage`
- `intro`
- `sections`
- `faq`
- `relatedLinks`
- `publishedAt`
- `updatedAt`
- `status`

### Customer Results

Curated result examples with careful wording.

Recommended fields:

- Vehicle make/model/engine
- Stage
- Stock power/torque
- Tuned power/torque
- Notes about vehicle condition
- Disclaimer that results are indicative
- CTA to Power Catalog
- Optional customer approval status

Customer result pages should not promise the same result for every vehicle.

### Social Updates

Shorter updates that may later come from Facebook or manual posting.

Recommended fields:

- Source
- Original post URL
- Media
- Short caption
- Related service
- Approval status
- Published date

## Facebook Sync Separation

Facebook-synced posts should not be mixed directly into SEO articles.

Reasons:

- Social posts are usually short, time-sensitive and informal.
- SEO articles need stable structure, metadata, headings, internal links and FAQs.
- Synced posts may contain photos or wording that need manual approval.
- Search pages should not be diluted by low-context updates.

Future Facebook sync should publish into a separate social updates stream, or import posts as drafts that can be edited before publishing.

## Admin Approval Flow Later

Recommended future flow:

1. Facebook sync imports posts as draft social updates.
2. Admin reviews text, image, legal wording and customer privacy.
3. Admin adds alt text and related service links.
4. Admin approves or rejects the item.
5. Approved social updates appear on the website separately from SEO articles.

## Current Implementation

Current blog cards are static content entries in:

- `src/content/copy.ts`

Full SEO article pages are now implemented in:

- `src/content/blog-articles.ts`
- `src/content/blog-articles-data-nl.ts`
- `src/content/blog-articles-data-en.ts`
- `src/content/blog-articles-data-pl.ts`
- `src/app/[locale]/[slug]/[articleSlug]/page.tsx`

Blog cards link to these article routes:

- `/nl/blog/...`
- `/en/news-blog/...`
- `/pl/aktualnosci-blog/...`

Customer-result style posts remain separate in:

- `src/content/customer-results.ts`

Facebook-synced posts should still become draft social updates or draft customer results, not SEO articles.
