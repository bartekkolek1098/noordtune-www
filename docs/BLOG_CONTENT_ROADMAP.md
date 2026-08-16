# NoordTune Blog Content Roadmap

Date: 2026-08-16  
Branch: `feature/blog-content-roadmap`  
Status: planning only; no new routes or articles are published by this document

## 1. Executive Summary

NoordTune already has a credible technical knowledge base. The live structure contains 12 published article topics in Dutch, English and Polish, 12 Dutch SEO landing pages and 7 real customer-result topics. The next phase should therefore not add more first-level definitions. It should answer the practical questions customers ask immediately before and after making a tuning decision.

The recommended sequence is:

1. Buyer questions: price, fuel use and APK implications.
2. Ownership and aftercare: turbo use and maintenance after Stage 1.
3. Deeper technical authority: torque limiters, turbo operation, fuel and EGT.
4. Model-specific expertise supported by approved customer results.
5. One useful local-process article for Assen, without duplicating existing local landing pages.

Dutch remains the source version. English and Polish should be localized only after the Dutch article has passed technical and owner review.

## 2. Current Content Audit

### Current inventory

- 36 published article records: 12 topics in Dutch, English and Polish.
- 12 published Dutch SEO landing pages.
- 4 prepared brand landing concepts that remain unpublished.
- 21 localized public customer-result pages representing 7 real projects.
- 12 local article-image roles; each visual is reused only across the three translations of the same topic.
- Article rendering supports canonical metadata, Open Graph, Article JSON-LD, FAQ JSON-LD, related links, Power Catalog CTA and WhatsApp CTA.
- `sitemap.ts` includes published articles and excludes draft articles by status.

### Current strengths

1. **Strong evergreen foundation.** Existing articles explain chiptuning, ECU remap, Stage 1 versus Stage 2, remap safety, automatic transmissions, log analysis, DSG/TCU tuning and emissions-system fault diagnosis.
2. **Dutch-first architecture.** The Dutch articles are the deepest source versions, while English and Polish have complete localized routes.
3. **Commercial next step without hard selling.** Power Catalog is positioned as an indication tool and WhatsApp as the route for final vehicle-specific advice.
4. **Clear separation of content types.** Educational SEO articles, customer results and future social updates are separate.
5. **Real proof is now available.** BMW X3, Audi A4, Ford Transit Connect, Toyota ProAce, BMW F40, VW Caddy and VW Transporter cases can support relevant technical articles.
6. **Responsible public wording.** Current DPF, EGR and AdBlue content emphasizes diagnosis, fault analysis and solutions only where legally permitted.
7. **Search Console-ready publishing.** Published URLs enter the sitemap automatically; drafts do not.

### Weaknesses and gaps

1. **Buyer-decision questions remain underrepresented.** Price, fuel consumption, APK and total ownership impact are common objections but do not yet have dedicated answers.
2. **Aftercare is too broad.** “5 tips na een tuning” is useful, but turbo operation, oil/service intervals and warning signs deserve focused articles.
3. **Technical depth can go one level further.** Torque limiters, EGT, thermal load, injector duty and ECU/TCU torque communication are only touched indirectly.
4. **Model-intent content is missing.** Broad brand pages are prepared but unpublished, and there are no focused articles around Volkswagen 2.0 TDI, Ford EcoBlue or Toyota ProAce 2.0D.
5. **Contextual result links are sparse.** The renderer provides conversion CTAs, but article-level links to relevant real customer cases are still limited.
6. **Visual education is limited.** The site has good local images, but no purpose-built torque-flow, EGT or diagnostic-process diagrams.
7. **Localized article relationships are not explicitly grouped.** Equivalent NL/EN/PL articles are separate records. A future `translationKey` could allow richer cross-language `hreflang` alternates in sitemap and metadata.
8. **Blog cards and article records remain separate data sets.** Auditing protects route validity, but deriving cards from published article data later would reduce editorial drift.

## 3. Missing Customer Questions

Questions the next content batches should answer:

- What does chiptuning cost, and why do prices differ per ECU and vehicle?
- Does fuel consumption improve or increase after tuning?
- What does chiptuning mean for the Dutch APK inspection?
- Does Stage 1 require shorter maintenance intervals?
- Which fuel and oil quality should be used after tuning?
- How should a turbo engine be warmed up and cooled down?
- What are torque limiters, and why can the gearbox matter as much as the engine?
- Which symptoms after tuning require a check rather than continued driving?
- When should the vehicle return for logs or follow-up control?
- How does an appointment in Assen work from intake to delivery?

## 4. Topic Clusters

### Cluster 1: Buyer decision articles

Purpose: remove uncertainty before a customer opens the Power Catalog or contacts NoordTune.

Priority topics:

- Wat kost chiptuning en waar betaal je voor?
- Verbruikt mijn auto meer na chiptuning?
- Chiptuning en APK in Nederland.
- Is Stage 1 tuning veilig? Use the existing remap-safety article as the canonical answer; expand it instead of publishing a competing article.
- Moet ik eerst diagnose doen? Strengthen the existing diagnostics-before-tuning article rather than creating a duplicate.
- Stage 1, Stage 2 or standard software: how to choose responsibly.
- Does factory warranty remain after an ECU remap?
- Can software be returned to original?

### Cluster 2: Technical explanation articles

Purpose: demonstrate how NoordTune makes decisions, not merely what can be sold.

Priority topics:

- Hoe werkt een ECU-map? Treat this as an expansion angle within the existing ECU-remap article unless the search intent proves distinct.
- Wat zijn koppelbegrenzers in ECU en TCU?
- ECU versus TCU tuning: where does torque control live?
- Turbo, brandstof en EGT uitgelegd.
- Injector duty, rail pressure and lambda under load.
- Why software version and ECU access method affect the work.
- Bench, boot and OBD reading: when is each method used?
- How a diagnostic log becomes a calibration decision.

### Cluster 3: Local SEO support

Purpose: support local service pages with useful process content, not thin city variants.

Existing landing pages already own the primary local intents:

- `/nl/chiptuning-assen`
- `/nl/chiptuning-drenthe`
- `/nl/chiptuning-groningen`
- `/nl/auto-diagnose-assen`

Recommended supporting topics:

- Chiptuning Assen: zo verloopt een afspraak bij NoordTune.
- What vehicle information to send before travelling to Assen.
- Mobile diagnostics versus workshop diagnostics in Noord-Nederland.
- Preparing a car for diagnosis or tuning from Groningen or elsewhere in Drenthe.
- Stage 1 tuning in Noord-Nederland: what can be checked before the visit?

Do not publish separate articles titled only “Chiptuning Groningen”, “Chiptuning Drenthe” or “Auto diagnose Assen”. Those terms are already served by dedicated landing pages and duplicate articles could cause keyword cannibalization.

### Cluster 4: Brand and model topics

Purpose: answer platform-specific questions with real technical context and approved cases.

Recommended topics:

- Volkswagen 2.0 TDI tuning: versions, torque and daily use.
- Ford EcoBlue tuning: torque delivery, diagnostics and emissions-system context.
- Toyota ProAce 2.0D Comfort Power: tuning for a passenger van.
- VAG TDI Stage 1 versus Stage 2.
- BMW B38 with 7DCT300: why engine and transmission calibration must agree.
- Audi 2.0 TDI with supporting hardware: when Stage 2+ becomes a system project.
- ECU cloning on Volkswagen commercial vehicles.

Broad “BMW chiptuning”, “Audi chiptuning”, “Volkswagen chiptuning” and “Mercedes chiptuning” queries should eventually be handled by the prepared brand landing pages, not competing blog posts. Publish those pages only after unique owner-reviewed content and relevant real results are available.

### Cluster 5: Aftercare and ownership

Purpose: build trust after the sale and reduce avoidable technical problems.

Recommended topics:

- Hoe rijden na chiptuning?
- Turbo warmrijden en afkoelen.
- Onderhoud na Stage 1.
- Fuel quality after an ECU remap.
- Wanneer terugkomen voor controle of loganalyse?
- Symptomen na tuning die je niet moet negeren.
- What to do after a software or dealership update.
- Towing, payload and long-distance use after tuning.

## 5. First 10 Recommended Articles

“Publish next” below means eligible for a future article branch after technical, language, image and owner review. Nothing in this roadmap publishes a route.

### 1. Wat kost chiptuning en waar betaal je voor?

- **Priority:** P1
- **Primary keyword:** `chiptuning kosten`
- **Search intent:** commercial investigation
- **Language priority:** NL first; EN and PL after Dutch pricing review
- **Slugs:**
  - NL: `wat-kost-chiptuning`
  - EN: `how-much-does-chiptuning-cost`
  - PL: `ile-kosztuje-chiptuning`
- **Outline:** what determines price; OBD versus bench/boot access; diagnosis and original-file backup; Stage 1 versus Stage 2 scope; why “from” prices are used; questions to send before quoting.
- **Internal links:** `/nl/prijzen`, `/nl/stage-1-tuning`, `/nl/stage-2-tuning`, `/nl/auto-diagnose`, Power Catalog.
- **Related results:** BMW X3 Stage 1, Audi A4 Stage 2+ and BMW F40 TCU tuning to show different work scopes.
- **Image suggestion:** owner-produced ECU bench/workshop image with a simple “scope determines price” overlay; no vehicle or personal data.
- **CTA:** “Controleer jouw auto in de Power Catalog” followed by WhatsApp for an exact scope.
- **Recommendation:** publish next after owner confirms current public prices and inclusions.

### 2. Verbruikt mijn auto meer na chiptuning?

- **Priority:** P1
- **Primary keyword:** `chiptuning verbruik`
- **Search intent:** informational with purchase concern
- **Language priority:** NL first, then EN/PL together
- **Slugs:**
  - NL: `verbruikt-mijn-auto-meer-na-chiptuning`
  - EN: `fuel-consumption-after-chiptuning`
  - PL: `czy-auto-pali-wiecej-po-chiptuningu`
- **Outline:** efficiency versus driver demand; torque and shift points; petrol versus diesel; measuring fairly; why no universal saving can be promised; when increased consumption can indicate a problem.
- **Internal links:** ECU-remap article, remap-safety article, loganalyse page, diagnostics-before-tuning article, Power Catalog.
- **Related results:** Toyota ProAce Comfort Power and Ford Transit Connect Stage 1.
- **Image suggestion:** local dashboard/trip-computer and log-analysis composition with identifying data removed.
- **CTA:** vehicle-specific Power Catalog check; WhatsApp for use case, mileage and driving profile.
- **Recommendation:** publish next after technical review.

### 3. Chiptuning en APK in Nederland: wat moet je weten?

- **Priority:** P1, legally time-sensitive
- **Primary keyword:** `chiptuning APK`
- **Search intent:** legal/informational
- **Language priority:** NL first; Polish second for customers living in the Netherlands; EN third
- **Slugs:**
  - NL: `chiptuning-en-apk-in-nederland`
  - EN: `chiptuning-and-dutch-apk-inspection`
  - PL: `chiptuning-a-przeglad-apk-w-holandii`
- **Outline:** what APK checks and does not prove; emissions and warning lights; hardware modifications; insurance/registration responsibility; why regulations and vehicle use matter; when to seek current advice.
- **Internal links:** Stage 2 page, DPF/EGR/AdBlue guide, Auto Diagnose, Contact.
- **Related results:** Audi A4 Stage 2+ only as a vehicle-specific case with an explicit legal-context disclaimer.
- **Image suggestion:** custom local inspection/checklist graphic; avoid third-party APK logos unless licensed.
- **CTA:** WhatsApp for the exact configuration; Power Catalog only as a tuning indication, not legal approval.
- **Recommendation:** draft first; verify current Dutch rules and owner wording immediately before publication.

### 4. Wat zijn koppelbegrenzers in ECU en TCU?

- **Priority:** P1
- **Primary keyword:** `koppelbegrenzer chiptuning`
- **Search intent:** technical education
- **Language priority:** NL first, then EN/PL
- **Slugs:**
  - NL: `koppelbegrenzers-in-ecu-en-tcu`
  - EN: `torque-limiters-in-ecu-and-tcu`
  - PL: `ograniczniki-momentu-w-ecu-i-tcu`
- **Outline:** requested versus delivered torque; engine and gearbox communication; clutch protection; why deleting limits is not calibration; automatic and manual considerations; how logs verify behavior.
- **Internal links:** DSG/TCU service page, DSG/TCU article, automatic-transmission article, loganalyse.
- **Related results:** BMW F40 7DCT300 TCU tuning and BMW X3 Stage 1.
- **Image suggestion:** original dark/red torque-flow diagram from pedal to ECU, engine, TCU and wheels.
- **CTA:** Power Catalog for ECU/TCU availability; WhatsApp with gearbox type and software details.
- **Recommendation:** publish next after calibration review.

### 5. Turbo, brandstof en EGT uitgelegd

- **Priority:** P1
- **Primary keyword:** `EGT chiptuning`
- **Search intent:** advanced technical education
- **Language priority:** NL first; EN second; PL third
- **Slugs:**
  - NL: `turbo-brandstof-en-egt-uitgelegd`
  - EN: `turbo-fuel-and-egt-explained`
  - PL: `turbo-paliwo-i-egt-wyjasnienie`
- **Outline:** air and fuel relationship; boost is not the complete answer; EGT and thermal load; petrol/diesel differences; effects of hardware and ambient conditions; what NoordTune checks in logs.
- **Internal links:** Stage 2 article, loganalyse page/article, ECU-remap safety article.
- **Related results:** Audi A4 Stage 2+ and VW Caddy Stage 1, with clear vehicle-specific caveats.
- **Image suggestion:** custom chart showing boost, lambda/fueling and EGT trends; use illustrative values, not fake customer measurements.
- **CTA:** WhatsApp for log analysis; Power Catalog as the first vehicle check.
- **Recommendation:** draft first, then publish after technical chart review.

### 6. Turbo warmrijden en afkoelen na chiptuning

- **Priority:** P1
- **Primary keyword:** `turbo warmrijden afkoelen`
- **Search intent:** aftercare/how-to
- **Language priority:** NL first, then PL/EN
- **Slugs:**
  - NL: `turbo-warmrijden-en-afkoelen-na-chiptuning`
  - EN: `warming-up-and-cooling-down-a-turbo-after-tuning`
  - PL: `rozgrzewanie-i-chlodzenie-turbiny-po-tuningu`
- **Outline:** oil temperature versus coolant; load while cold; cool-down after heavy use; when idling is or is not useful; short trips; practical daily routine.
- **Internal links:** 5 tips after tuning, maintenance article, Stage 1 page, Contact.
- **Related results:** Audi A4 Stage 2+ and Ford Transit Connect Stage 1.
- **Image suggestion:** owner/local turbo or engine-bay detail, plus a compact warm-up/load timeline.
- **CTA:** WhatsApp for vehicle-specific aftercare questions.
- **Recommendation:** publish next after workshop review.

### 7. Onderhoud na Stage 1: olie, brandstof en controle

- **Priority:** P1
- **Primary keyword:** `onderhoud na chiptuning`
- **Search intent:** aftercare/how-to
- **Language priority:** NL first, then EN/PL
- **Slugs:**
  - NL: `onderhoud-na-stage-1`
  - EN: `maintenance-after-stage-1-tuning`
  - PL: `serwis-po-stage-1`
- **Outline:** maintenance baseline; oil specification and interval; spark plugs/ignition for petrol; fuel and injector health for diesel; gearbox service; when to request logs or diagnosis.
- **Internal links:** 5 tips after tuning, Auto Diagnose, loganalyse, ECU-remap safety.
- **Related results:** BMW X3, Toyota ProAce and Ford Transit Connect.
- **Image suggestion:** owned workshop service image with filters/oil/diagnostic tablet; no brand claims unless the product is actually used.
- **CTA:** WhatsApp for a vehicle-specific maintenance checklist.
- **Recommendation:** publish next after owner validates practical service advice.

### 8. Volkswagen 2.0 TDI tuning: wat verschilt per uitvoering?

- **Priority:** P2
- **Primary keyword:** `Volkswagen 2.0 TDI chiptuning`
- **Search intent:** model-family commercial investigation
- **Language priority:** NL and PL high; EN second
- **Slugs:**
  - NL: `volkswagen-20-tdi-tuning`
  - EN: `volkswagen-20-tdi-tuning`
  - PL: `tuning-volkswagen-20-tdi`
- **Outline:** power variants are not interchangeable; ECU/software differences; manual versus DSG; condition and emissions systems; Stage 1 versus hardware-supported work; why exact vehicle identification matters.
- **Internal links:** Stage 1, Stage 2, DSG/TCU, DPF/EGR/AdBlue guide, Power Catalog.
- **Related results:** VW Caddy Stage 1 and VW Transporter ECU cloning + Stage 1.
- **Image suggestion:** approved local VW result graphics or a new owned workshop image; do not imply one result applies to every 2.0 TDI.
- **CTA:** Power Catalog with exact model/year/engine selection.
- **Recommendation:** draft first; publish after platform-specific technical review.

### 9. Ford EcoBlue tuning: waar letten we op?

- **Priority:** P2
- **Primary keyword:** `Ford EcoBlue chiptuning`
- **Search intent:** model-family commercial investigation
- **Language priority:** NL and PL high; EN second
- **Slugs:**
  - NL: `ford-ecoblue-tuning`
  - EN: `ford-ecoblue-tuning`
  - PL: `tuning-ford-ecoblue`
- **Outline:** torque and commercial-vehicle use; diagnostics first; ECU/software variation; turbo and fueling; emissions-system fault context; realistic daily-use calibration.
- **Internal links:** Stage 1, Auto Diagnose, DPF/EGR/AdBlue article, Power Catalog.
- **Related results:** Ford Transit Connect 1.5 EcoBlue Stage 1.
- **Image suggestion:** owner-approved Transit Connect graphic plus a separate local diagnostic detail; avoid repeating the result graphic as the only visual.
- **CTA:** check the exact EcoBlue version in Power Catalog and send load/use details by WhatsApp.
- **Recommendation:** draft first because legal/emissions wording needs careful owner review.

### 10. Chiptuning in Assen: zo verloopt een afspraak

- **Priority:** P2
- **Primary keyword:** `chiptuning Assen afspraak`
- **Search intent:** local transactional/process
- **Language priority:** NL first, Polish second, English third
- **Slugs:**
  - NL: `chiptuning-assen-zo-verloopt-een-afspraak`
  - EN: `chiptuning-in-assen-what-to-expect`
  - PL: `chiptuning-w-assen-jak-wyglada-wizyta`
- **Outline:** vehicle details before the visit; intake and fault history; diagnosis/original read; calibration; checks and delivery; what the customer receives; broad Assen location wording without publishing a private street address.
- **Internal links:** Chiptuning Assen landing page, Prijzen, Contact, Afspraak placeholder, Power Catalog.
- **Related results:** link to the full results archive rather than forcing one model case.
- **Image suggestion:** owned workshop/intake image with no private address, customer or plate data.
- **CTA:** Power Catalog first, then WhatsApp to plan the visit.
- **Recommendation:** publish next after owner confirms the exact operational workflow.

## 6. Secondary Backlog

After the first ten:

1. Symptomen na tuning die je niet moet negeren.
2. Wanneer terugkomen voor controle of loganalyse?
3. Toyota ProAce 2.0D Comfort Power uitgelegd.
4. BMW B38 en 7DCT300: motor en transmissie als systeem.
5. ECU cloning: wanneer is een vervangende regelunit nodig?
6. OBD, bench en boot mode uitgelegd.
7. Welke brandstof na chiptuning?
8. Tuning bij hoge kilometerstand: wanneer wel en niet?
9. Trekgewicht, belading en tuning bij bedrijfswagens.
10. Wat gebeurt er bij een dealer-softwareupdate na tuning?

## 7. Internal Linking Roadmap

### Hub-and-spoke rules

- **Buyer articles** link to one main service page, one explanatory article, Prijzen where relevant, Power Catalog and WhatsApp.
- **Technical articles** link to ECU remap, DSG/TCU, loganalyse or Auto Diagnose, plus one directly related article.
- **Model articles** link to Power Catalog, the relevant Stage/service page and one approved customer result.
- **Aftercare articles** link to Auto Diagnose/loganalyse and WhatsApp, not only to sales pages.
- **Local process content** links to the existing Assen landing page, Contact and Afspraak; it must not replace or duplicate the local landing.

### Immediate opportunities in existing content

- Add BMW F40 result context to the DSG/TCU and automatic-transmission articles.
- Add Audi A4 Stage 2+ context to the Stage 2 and loganalyse articles.
- Add Toyota ProAce and Ford Transit Connect context to buyer/aftercare articles about drivability and fuel use.
- Add VW Caddy and VW Transporter to future Volkswagen 2.0 TDI and ECU-cloning content.
- Link existing local landing pages to the future Assen appointment article once published.
- Review old related-link blocks so each article has one service link, one educational link and one conversion link.

### Cannibalization safeguards

- Do not publish a second generic “Is ECU remap veilig?” article; improve the existing page.
- Do not publish duplicate “Wat is ECU remap?” or “Waarom diagnose vóór tuning?” pages.
- Keep city keywords on existing SEO landing pages; blog posts should address process or preparation intent.
- Keep broad brand keywords for future brand landing pages; use the blog for engine/platform-specific questions.

## 8. Image and Visual Roadmap

Allowed sources:

- owner-provided NoordTune photos and graphics;
- existing local NoordTune assets;
- original diagrams created for NoordTune;
- clearly documented licensed stock assets.

Priority visuals to produce:

1. ECU-to-TCU torque-flow diagram.
2. Boost, fueling and EGT educational chart with explicitly illustrative values.
3. Workshop appointment process strip: intake, diagnosis, read, calibration, check and delivery.
4. Turbo warm-up/load timeline.
5. Maintenance-after-Stage-1 checklist graphic.
6. Model-family visuals that distinguish VW TDI, Ford EcoBlue and Toyota ProAce content without repeating one generic tuning image.

Every asset needs a descriptive filename, meaningful localized alt text, web optimization, documented origin and a privacy check for plates, VINs, addresses and customer data.

## 9. Content Quality and Publication Rules

1. No thin AI-generated pages. AI drafts require technical editing, language editing and owner review.
2. Dutch is the canonical source and must be the strongest version.
3. English and Polish must be natural localizations, not sentence-by-sentence machine translations.
4. Never copy competitor text or closely paraphrase its structure sentence by sentence.
5. Never use random, hotlinked or unlicensed internet images.
6. DPF, EGR and AdBlue wording must focus on diagnosis, fault analysis, tailored advice and solutions only where legally permitted.
7. Never advertise generic emissions-system removal or imply every modification is road-legal.
8. Never guarantee identical power, torque, economy or reliability for every vehicle.
9. Distinguish measured project values, owner-supplied values and illustrative examples.
10. Link to Power Catalog where a vehicle check is useful and to WhatsApp where final advice requires vehicle details.
11. Link customer results only when they genuinely support the article topic.
12. Each published article needs unique metadata, canonical URL, Open Graph, Article JSON-LD and FAQ JSON-LD when FAQs are present.
13. Every article card must resolve to a published route; drafts must remain absent from the blog index and sitemap.
14. Legal/time-sensitive articles must be rechecked immediately before publication.

## 10. Suggested Publication Order

### Batch 1: highest-value customer questions

1. Wat kost chiptuning?
2. Verbruikt mijn auto meer na chiptuning?
3. Turbo warmrijden en afkoelen.
4. Onderhoud na Stage 1.

### Batch 2: technical authority

5. Koppelbegrenzers in ECU en TCU.
6. Turbo, brandstof en EGT.
7. Chiptuning en APK, after current legal review.

### Batch 3: platform and local conversion

8. Volkswagen 2.0 TDI tuning.
9. Ford EcoBlue tuning.
10. Chiptuning in Assen: appointment process.

Recommended cadence: two Dutch articles per month. Localize each approved Dutch batch into English and Polish before starting another large topic set. Quality and Search Console feedback take priority over fixed volume.

## 11. Search Console Monitoring Plan

### Before each batch

- Record the previous 28 days for clicks, impressions, CTR and average position.
- Check whether the proposed query already belongs to an existing page.
- Record the target article, supporting service page and intended internal links.
- Confirm sitemap and canonical behavior in preview.

### Publication day

- Confirm the live route, metadata, JSON-LD, image and localized CTAs.
- Confirm the article appears once in sitemap and no draft route is exposed.
- Submit or inspect the URL in Google Search Console.
- Add only the planned contextual internal links.

### Day 7

- Check discovery/indexing status and mobile usability signals.
- Review early queries for intent mismatch.
- Fix technical indexing issues, broken links or metadata errors only; avoid rewriting based on a tiny sample.

### Day 14

- Compare impressions, CTR and position with the target query set.
- Identify pages with impressions but weak CTR; review title and description clarity.
- Identify query overlap with existing landing pages or articles.
- Add one or two relevant internal links if discovery is weak.

### Day 30

- Review clicks, impressions, CTR, position and conversions to Power Catalog/WhatsApp where measurable and privacy-compliant.
- Improve titles/meta for pages with impressions but low CTR.
- Expand useful sections for pages ranking below the first page but receiving relevant impressions.
- Consolidate or reposition content if two NoordTune pages compete for the same intent.
- Decide whether the next batch should deepen a winning cluster or address a real gap.

### Ongoing reporting

- Maintain one content log with publication date, target keyword, linked hub, Search Console observations and next action.
- Review old WordPress redirect errors and 404s alongside new-content performance.
- Do not add analytics code until the privacy/cookie approach is approved.

## 12. Technical Follow-up Recommendations

These are future tasks, not part of this planning branch:

- Add a stable translation-group key to NL/EN/PL article records so metadata and sitemap can expose full language alternates.
- Consider deriving blog cards from published article data to prevent card/article drift.
- Extend the content audit to check planned internal links and duplicate primary-intent assignments.
- Add optional content fields for primary keyword, intent, reviewer and Search Console review dates.

## 13. Scope Confirmation

- No article, route, sitemap entry or public content was created by this roadmap.
- No customer result data was changed.
- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file-service implementation was added.
- No production, domain or Vercel setting was changed.
