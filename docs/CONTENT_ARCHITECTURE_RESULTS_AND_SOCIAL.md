# Content Architecture: SEO Articles, Customer Results and Social Updates

Date: `2026-06-13`  
Status: architecture and customer results MVP branch

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
- existing Results page renders selected listing cards from this model.
- current BMW/Audi/Volkswagen/Mercedes cases are marked as `demo`, not customer-approved real cases.
- demo and draft results are not indexable and do not generate public detail routes.
- future detail routes are prepared as `/nl/resultaten/[slug]`, `/en/results/[slug]` and `/pl/rezultaty/[slug]`.
- only `status: "published"` plus `indexable: true` can generate public detail pages and sitemap entries.

Current draft template:

- BMW X3 E83 2.0d Stage 1
- N47 / Bosch EDC17
- 177 hp / 350 Nm stock
- 214 hp / 420 Nm tuned
- +37 hp / +70 Nm
- certificate noted as given to the customer
- remains draft until owner confirms image rights, customer approval and final data.

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

Customer result detail pages should be published only after approval. Facebook-imported posts should never become indexable customer result pages automatically.

## Current Launch Recommendation

Publish SEO articles now.

Keep customer results as carefully labelled indicative examples until real owner-approved vehicle cases are added.

Do not publish Facebook-synced content automatically.
