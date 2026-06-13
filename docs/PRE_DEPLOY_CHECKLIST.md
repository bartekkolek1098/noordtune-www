# Pre-Deploy Checklist

Project: NoordTune.nl main website  
Status: pre-launch checklist  
Date: 2026-06-12

## Scope Guard

- [ ] Deploy only the main website project: `/Users/bartk/Documents/www.noordtune.nl`
- [ ] Do not deploy changes to `power.noordtune.nl`
- [ ] Do not enable booking system logic yet
- [ ] Do not enable Facebook API sync yet
- [ ] Do not add file-service logic yet

## Environment And Build

- [ ] Confirm Node and pnpm versions on deployment provider
- [ ] Confirm `pnpm install` works
- [ ] Confirm `pnpm build` works
- [ ] Confirm no required runtime environment variables are missing
- [ ] Add future env vars only when booking, analytics, Meta sync or payments are implemented

## Domain And DNS

- [ ] Production domain: `www.noordtune.nl`
- [ ] Root/apex domain handling confirmed if needed
- [ ] DNS points `www.noordtune.nl` to the new main website deployment
- [ ] DNS for `power.noordtune.nl` remains pointed to the existing power catalog app
- [ ] SSL certificate active

## Deployment Platform

- [ ] Vercel or hosting project created for this standalone Next.js app
- [ ] Framework preset: Next.js
- [ ] Install command: `pnpm install`
- [ ] Build command: `pnpm build`
- [ ] Output settings left as Next.js default
- [ ] Preview deployment reviewed before production

## SEO Technical

- [ ] `sitemap.xml` loads in production
- [ ] `robots.txt` loads in production
- [ ] Canonical URLs use `https://www.noordtune.nl`
- [ ] Open Graph images resolve
- [ ] Metadata titles/descriptions checked for all main pages
- [ ] LocalBusiness JSON-LD validates
- [ ] FAQ JSON-LD validates where present
- [ ] Dutch SEO landing pages reviewed for quality
- [ ] Brand SEO pages stay unpublished until unique copy is ready

## Assets

- [ ] Replace final logo if a sharper transparent SVG/PNG is available
- [ ] Confirm no white-background logo is used
- [ ] Confirm favicon/app icon uses the final brand icon
- [ ] Replace generated visual placeholders with owned workshop/vehicle/diagnostics images where available
- [ ] Confirm all images are licensed, owned, generated or explicitly approved
- [ ] Check mobile image framing

## Content And Legal

- [ ] Contact details confirmed: `+31 685 759 600`
- [ ] WhatsApp link confirmed: `https://wa.me/31685759600`
- [ ] Address confirmed: `A. Vogelstraat 1, 9406 XD Assen`
- [ ] Opening hours confirmed
- [ ] Privacy page reviewed
- [ ] Terms page reviewed
- [ ] DPF / EGR / AdBlue wording reviewed for legal caution
- [ ] Dutch copy reviewed as official primary language
- [ ] English copy reviewed by a fluent speaker if possible
- [ ] Polish copy reviewed by a fluent speaker if possible

## Navigation And Links

- [ ] All catalog CTAs point to `https://power.noordtune.nl/`
- [ ] No local `/power` route exists
- [ ] WhatsApp CTAs point to `https://wa.me/31685759600`
- [ ] Language switcher preserves equivalent routes where available
- [ ] Root `/` redirects by cookie or Accept-Language
- [ ] 404 page reviewed
- [ ] Footer legal links work

## QA

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm build`
- [ ] `pnpm content:audit`
- [ ] `pnpm screenshots`
- [ ] Review desktop screenshots at `1440x1200`
- [ ] Review mobile screenshots at `390x1200`
- [ ] Check no horizontal overflow on mobile
- [ ] Check header at desktop, tablet and mobile
- [ ] Check floating WhatsApp button does not cover important CTAs

## Post-Launch Later

- [ ] Add analytics only after privacy decision
- [ ] Set up Google Search Console
- [ ] Submit sitemap
- [ ] Add uptime or error monitoring
- [ ] Plan booking system implementation
- [ ] Plan Facebook social update sync
