# Content Architecture: SEO Articles, Customer Results and Social Updates

Date: `2026-06-13`  
Status: architecture and first implementation pass

## Why This Split Exists

The owner mainly posts on Facebook in a practical workshop format:

- vehicle photo or photo set
- short description of the modification
- vehicle model and engine
- Stage or service performed
- power and torque result when available
- short professional summary

That format is valuable, but it is not the same as an evergreen SEO article. The NoordTune.nl website should therefore keep three content streams separate.

## 1. SEO Articles / Knowledge Base

Purpose:

- evergreen educational content
- structured for search intent
- useful for customers comparing chiptuning, ECU remap, diagnosis and aftercare

Examples:

- Wat is chiptuning?
- Stage 1 vs Stage 2
- Is ECU remap veilig?
- AdBlue storing uitgelegd
- 5 tips na tuning
- Waarom diagnose vóór tuning belangrijk is

Rules:

- indexable by default
- full metadata and Open Graph
- Article JSON-LD
- FAQ JSON-LD when FAQ exists
- internal links to services and related topics
- Power Catalog CTA
- WhatsApp CTA
- no copied competitor text
- no Facebook-style short updates mixed into these pages

Current implementation:

- `src/content/blog-articles.ts`
- `src/content/blog-articles-data-nl.ts`
- `src/content/blog-articles-data-en.ts`
- `src/content/blog-articles-data-pl.ts`
- `src/app/[locale]/[slug]/[articleSlug]/page.tsx`

## 2. Customer Results / Realisaties / Klantresultaten

Purpose:

- vehicle/project cases
- proof-oriented content based on real work
- future home for Facebook-style tuning result posts after owner/admin approval

Recommended data:

- vehicle make, model, engine and year
- Stage or service performed
- ECU/TCU information when available
- stock power and torque
- tuned power and torque
- gains
- photos of the actual vehicle
- source URL if imported from Facebook
- customer approval state
- certificate/report link if available later
- disclaimer

Indexing rule:

- customer result detail pages should only be indexable when they contain enough unique, useful content.
- thin or unapproved result cards should remain listing-only or noindex later.

Important wording:

- never promise identical gains for every vehicle.
- always explain that results depend on condition, ECU/TCU, software version, fuel, maintenance, hardware and use.

Current implementation:

- `src/content/customer-results.ts`
- existing Results page renders selected published result cards from this model.
- current cases are marked as indicative examples, not customer-approved real cases.

## 3. Social Updates

Purpose:

- short updates from Facebook or manual posts
- timely workshop/social content
- not designed as evergreen SEO content

Future rules:

- Facebook-synced posts should become draft social updates first.
- If a post looks like a vehicle result, admin can convert it into a draft customer result.
- Thin social updates can be noindex if published.
- Social updates should not appear inside the SEO Blog / Knowledge Base.

## Facebook Import Rule

Facebook posts should not be automatically mixed into SEO articles.

Future flow:

1. Import Facebook Page post as draft social update.
2. Detect whether it likely describes a customer result.
3. Let admin review and optionally convert it into a customer result.
4. Admin edits vehicle data, power/torque, service type, images and legal wording.
5. Approved images are stored locally or in controlled storage.
6. Published item becomes either:
   - social update card
   - full customer result page
7. SEO articles remain manually written evergreen content.

## Current Launch Recommendation

Publish SEO articles now.

Keep customer results as carefully labelled indicative examples until real owner-approved vehicle cases are added.

Do not publish Facebook-synced content automatically.

## Content Growth Phase Note

The content growth branch prepares draft brand pages, draft educational articles and the first BMW X3 E83 2.0d Stage 1 customer-result template without publishing them.

Rules for this phase:

- draft brand pages remain outside routes, navigation and sitemap.
- draft educational articles remain separate from published SEO articles until owner review.
- the BMW X3 result stays `draft` and `indexable: false` until image rights, customer approval and final copy are confirmed.
- social/Facebook-style posts remain a future import workflow and should not be mixed into SEO articles.
