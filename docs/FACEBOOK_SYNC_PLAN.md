# Facebook Sync Plan

Project: NoordTune.nl main website  
Date: 2026-06-12  
Status: architecture note only

## Goal

Future Facebook sync should bring selected Facebook Page posts into the website as social updates, without mixing them with intentionally written SEO blog articles.

No Facebook API sync is implemented in this pass.

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
3. Download or proxy approved images safely.
4. Store synced posts as draft social updates.
5. Admin manually approves before publishing.
6. Published social updates appear in a separate website section.

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

## Implementation Notes

Do not implement Facebook API access yet.

When implementation starts, add:

- Environment variables for Meta credentials
- Secure token storage
- Scheduled route or worker
- Content moderation / approval state
- Error logging and retry handling
