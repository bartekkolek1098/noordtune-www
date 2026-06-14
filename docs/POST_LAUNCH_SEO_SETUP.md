# Post-Launch SEO Setup

Production site: `https://www.noordtune.nl`  
Power Catalog: `https://power.noordtune.nl/`  
Status: production live, launch QA passed

## Purpose

This guide covers the first search-engine setup and monitoring steps after launch. It does not add analytics code, content growth, booking, Facebook sync, or any new website features.

## 1. Google Search Console

### Add Property

Add a new Google Search Console property:

`https://www.noordtune.nl`

Recommended first property type:

- URL-prefix property

Reason:

- fastest to verify
- matches the live production URL exactly
- enough for initial sitemap submission and indexing checks

A Domain property can be added later if DNS TXT verification is convenient.

### Verification Options

Recommended verification methods:

1. HTML meta tag
   - Good if we want to implement verification in the site later.
   - Requires adding the Google verification meta tag to the website layout.
   - Do not add it until the owner provides the exact verification token.

2. DNS TXT record
   - Good if the owner prefers DNS-level verification.
   - Works well for a Domain property.
   - Requires access to DNS settings.

3. Google Analytics
   - Do later only after privacy and cookie decisions.
   - Do not add analytics code before choosing the privacy approach.

### Submit Sitemap

Submit:

`https://www.noordtune.nl/sitemap.xml`

Confirmed during production QA:

- sitemap loads
- sitemap uses `https://www.noordtune.nl`
- blog article pages are included
- Dutch SEO landing pages are included
- unpublished brand pages are not exposed

### Inspect Key URLs

Use URL Inspection in Google Search Console for:

- `https://www.noordtune.nl/`
- `https://www.noordtune.nl/nl`
- `https://www.noordtune.nl/en`
- `https://www.noordtune.nl/pl`
- `https://www.noordtune.nl/nl/chiptuning`
- `https://www.noordtune.nl/nl/auto-diagnose`
- `https://www.noordtune.nl/nl/diensten`
- `https://www.noordtune.nl/nl/prijzen`
- `https://www.noordtune.nl/nl/contact`

For the most important pages, request indexing after inspection if Google reports that the page is not indexed yet.

## 2. Important Dutch SEO URLs To Inspect

Inspect these Dutch SEO landing pages after the sitemap is submitted:

- `https://www.noordtune.nl/nl/chiptuning-assen`
- `https://www.noordtune.nl/nl/chiptuning-drenthe`
- `https://www.noordtune.nl/nl/chiptuning-groningen`
- `https://www.noordtune.nl/nl/auto-diagnose-assen`
- `https://www.noordtune.nl/nl/stage-1-tuning`
- `https://www.noordtune.nl/nl/stage-2-tuning`
- `https://www.noordtune.nl/nl/ecu-remap`
- `https://www.noordtune.nl/nl/dsg-tcu-tuning`
- `https://www.noordtune.nl/nl/loganalyse`
- `https://www.noordtune.nl/nl/dpf-storing`
- `https://www.noordtune.nl/nl/egr-storing`
- `https://www.noordtune.nl/nl/adblue-storing`

Priority order:

1. `chiptuning-assen`
2. `auto-diagnose-assen`
3. `stage-1-tuning`
4. `stage-2-tuning`
5. `ecu-remap`
6. `dsg-tcu-tuning`
7. emissions-storing pages

## 3. Blog URLs To Inspect

Inspect these Dutch knowledge-base articles:

- `https://www.noordtune.nl/nl/blog/wat-is-chiptuning`
- `https://www.noordtune.nl/nl/blog/stage-1-vs-stage-2`
- `https://www.noordtune.nl/nl/blog/is-ecu-remap-veilig`
- `https://www.noordtune.nl/nl/blog/adblue-storing-uitgelegd`
- `https://www.noordtune.nl/nl/blog/5-tips-na-een-tuning`
- `https://www.noordtune.nl/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is`

These are evergreen SEO articles and should remain separate from customer results or future Facebook social updates.

## 4. Bing Webmaster Tools

Add:

`https://www.noordtune.nl`

Submit sitemap:

`https://www.noordtune.nl/sitemap.xml`

If Google Search Console is connected first, Bing Webmaster Tools can often import the site from Google Search Console.

Recommended flow:

1. Set up Google Search Console first.
2. Verify the sitemap is accepted.
3. Open Bing Webmaster Tools.
4. Import from Google Search Console if available.
5. Submit the sitemap manually if import is not available.

## 5. Redirect Monitoring

Check old/public URLs after launch:

- `https://www.noordtune.nl/chiptuning`
- `https://www.noordtune.nl/contact`
- `https://www.noordtune.nl/stage-1-chiptuning`
- `https://www.noordtune.nl/stage-2-chiptuning`
- `https://www.noordtune.nl/adblue-nox-diagnose`
- `https://www.noordtune.nl/egr-dpf-diagnose`
- `https://www.noordtune.nl/tuning-resultaten/abarth-500-abarth-eu-1-4-t-jet-135/`

Expected:

- old service pages redirect to current `/nl/...` routes
- old `tuning-resultaten` URLs redirect to `https://power.noordtune.nl/`
- `/power` remains `404` on the main website

Production QA note:

- old `tuning-resultaten` URLs with a trailing slash may first normalize the trailing slash, then redirect to Power Catalog.
- final destination is correct when the chain reaches `https://power.noordtune.nl/`.

## 6. First 30-Day Monitoring Plan

### Day 1

- Verify Google Search Console property.
- Submit `https://www.noordtune.nl/sitemap.xml`.
- Inspect homepage and main Dutch pages.
- Inspect Power Catalog links from the main site.
- Check `robots.txt`.
- Check `sitemap.xml`.
- Confirm `/power` remains `404` on the main website.

### Day 3

- Check indexing status for submitted pages.
- Check redirect errors.
- Inspect important Dutch SEO pages.
- Check mobile usability reports if available.
- Confirm no unexpected crawl errors for `/wp-admin`, `/wp-content` or old WordPress paths.

### Day 7

- Check early impressions and queries.
- Check indexing warnings.
- Check 404 reports.
- Check old WordPress URL redirects.
- Note which pages Google has discovered but not indexed yet.

### Day 14

- Review indexed pages.
- Review search queries.
- Identify pages with impressions but low CTR.
- Prepare title/meta improvements if needed, but do not change titles blindly.
- Compare Search Console data against the intended priority pages.

### Day 30

- Review Search Console performance.
- Review pages with no impressions.
- Plan the next SEO content batch.
- Plan the first approved customer result publication.
- Plan real workshop and vehicle photo replacement.
- Decide whether analytics should be added.

## 7. Analytics And Privacy Note

Do not add analytics code yet.

Recommended next decision:

- choose analytics approach later
- consider cookie and privacy implications first
- if using privacy-friendly analytics, document the tool and data handling
- if using Google Analytics, decide cookie/privacy wording first
- update the privacy policy before adding tracking if needed

Possible options to evaluate later:

- Vercel Web Analytics
- Plausible or another privacy-focused analytics tool
- Google Analytics, only after cookie/privacy decision

## 8. Uptime And Error Monitoring

Recommended optional monitoring:

- Vercel monitoring for the main website
- uptime monitor for `https://www.noordtune.nl`
- separate uptime monitor for `https://power.noordtune.nl/`
- periodic check for `sitemap.xml`
- periodic check for `robots.txt`

Keep monitoring separate for the main site and the Power Catalog because they are separate applications.

## 9. What Not To Do Yet

Do not start the following until the owner approves the next phase:

- booking payments
- Facebook API sync
- file service
- auto-publishing Facebook posts
- merging `feature/customer-results-mvp`
- publishing unapproved customer result pages
- creating thin brand landing pages

## 10. First Owner Action

The recommended immediate next step is:

1. Create or open Google Search Console.
2. Add `https://www.noordtune.nl` as a URL-prefix property.
3. Verify ownership.
4. Submit `https://www.noordtune.nl/sitemap.xml`.
5. Inspect `/nl`, `/nl/chiptuning`, `/nl/auto-diagnose`, `/nl/prijzen`, `/nl/contact`.
