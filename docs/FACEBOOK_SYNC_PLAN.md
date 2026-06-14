# Facebook Sync Plan

Project: NoordTune.nl main website  
Date: 2026-06-12  
Status: architecture note only

## Goal

Future Facebook sync should bring selected Facebook Page posts into the website as social updates, without mixing them with intentionally written SEO blog articles.

No Facebook API sync is implemented in this pass.

## Owner Posting Workflow

The owner normally posts on Facebook in a workshop/result format:

- vehicle photo or photo set
- short modification description
- vehicle make, model and engine
- Stage or service performed
- power/torque result or gains when available
- certificate or service confirmation sometimes
- short professional summary

These posts are valuable proof content, but they should not be treated as normal SEO blog articles.

## Content Separation

Keep three content models separate:

- SEO articles: evergreen, structured, written for search intent
- Customer results: curated tuning/result examples with disclaimers
- Social updates: short updates synced from Facebook or manually added

Reason:

- Facebook posts are usually timely, short and informal.
- SEO articles need stable headings, metadata, internal links and structured content.
- Mixing them would make the blog weaker for search and harder to maintain.

## Meta App Requirements

Future setup needs:

- Meta developer app
- Connected Facebook Page
- Page access token
- Required permissions for reading Page posts
- Token refresh/rotation plan

Likely permissions to evaluate later:

- `pages_read_engagement`
- `pages_show_list`
- Additional media-related permissions depending on the API approach

Exact permissions should be confirmed in Meta documentation at implementation time.

## Sync Job

Recommended process:

1. Scheduled job requests recent Page posts.
2. Normalize post text, date, permalink and media.
3. Store every imported item as a draft social update first.
4. Detect likely customer result posts from vehicle/model/result language.
5. Let admin convert a draft social update into a draft customer result.
6. Admin edits vehicle data, power/torque, service type, ECU/TCU notes and legal wording.
7. Download/store approved images locally or in controlled object storage.
8. Link back to the original Facebook post when useful.
9. Publish either a social update card or a full customer result page.
10. Keep SEO articles separate from imported social content.

Manual approval is recommended because:

- Facebook copy may be too informal for the website.
- Images may need cropping or alt text.
- Some posts may not be suitable for permanent website content.

## Image Handling

Future image rules:

- Store approved media locally or in a controlled object storage bucket.
- Generate responsive sizes.
- Add descriptive alt text manually where possible.
- Avoid hotlinking Facebook CDN URLs as permanent website assets.

## Scheduling

Possible sync cadence:

- Every 6 or 12 hours
- Manual "sync now" action in admin later

Avoid very frequent polling unless there is a clear need.

## Publishing Rules

Social updates should:

- Use noindex if they are thin and not evergreen
- Link to relevant service pages when useful
- Never replace SEO landing pages or articles
- Avoid claims that are not backed by customer approval or measured data

Customer results should:

- publish only after owner/admin review
- include vehicle make, model, engine and service type
- include stock/tuned power and torque only when known
- include a vehicle-specific disclaimer
- never promise identical gains for every vehicle
- link to the original Facebook post when imported from Facebook
- remain noindex or draft if the content is too thin

SEO articles should:

- remain manually written evergreen knowledge-base content
- include metadata, internal links and FAQ where useful
- never be auto-created from Facebook posts

## Implementation Notes

Do not implement Facebook API access yet.

When implementation starts, add:

- Environment variables for Meta credentials
- Secure token storage
- Scheduled route or worker
- Content moderation / approval state
- Error logging and retry handling

Current related architecture:

- SEO articles: `src/content/blog-articles.ts`
- Customer results: `src/content/customer-results.ts`
- Content architecture note: `docs/CONTENT_ARCHITECTURE_RESULTS_AND_SOCIAL.md`

## Content Growth Reminder

During the SEO content-growth phase, Facebook-style workshop posts should still be treated as source material for future draft social updates or draft customer results only.

Do not:

- auto-create SEO articles from Facebook posts
- publish imported vehicle results without owner/admin approval
- index thin social updates
- use customer photos before image rights and approval are confirmed

The prepared BMW X3 E83 2.0d Stage 1 case is a draft result template, not a Facebook sync implementation.
