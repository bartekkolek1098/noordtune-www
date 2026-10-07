# Workshop trust and ZICHTGROEI attribution

Date: 2026-10-07

Branch: `feature/workshop-trust-zichtgroei-2026-10`

Base: clean `main` at `909ac28d1f9aeb72b42ed5be348a8c5666bb1ace`.

## Implementation

- The localized About pages display the owner-confirmed Magicmotorsport FLEX, AutoTuner, HEXPROG II, FormulaFlash, Alientech KESS3, KT200 and PCMFlash names as compact text tags, alongside the confirmed professional diagnostic interfaces and specialised software licences.
- The section explains vehicle-, control-unit- and software-specific method selection, the initial technical assessment and its practical value to customers. No manufacturer logos, endorsements, universal compatibility claims or new experience/certification claims were added.
- Services-only descriptions for chiptuning, diagnostics and DSG/TCU tuning reference professional programming equipment, exact-controller method selection and diagnosis before software changes. A localized About link is included. Homepage service copy and existing Power Catalog/appointment CTAs are unchanged.
- The footer bottom area identifies ZICHTGROEI solely as the website development and maintenance provider, with `target="_blank"` and `rel="nofollow noopener noreferrer"`. The credit reserves space for the existing floating WhatsApp button.

| Locale | About route | New equipment heading | Footer text |
| --- | --- | --- | --- |
| NL | `/nl/over-ons` | Professionele apparatuur. Voertuigspecifieke aanpak. | Website ontwikkeld en onderhouden door ZICHTGROEI |
| EN | `/en/about` | Professional equipment. A vehicle-specific approach. | Website developed and maintained by ZICHTGROEI |
| PL | `/pl/o-nas` | Profesjonalny sprzęt. Podejście dopasowane do pojazdu. | Strona stworzona i utrzymywana przez ZICHTGROEI |

The supplied Dutch paragraphs are preserved exactly. Natural English and Polish equivalents, customer-value paragraphs and the Services descriptions are in `src/content/workshop.ts`.

## Files changed

- `src/content/workshop.ts`: localized equipment and Services copy.
- `src/components/workshop-equipment.tsx`: About-only equipment section.
- `src/components/page-renderers.tsx`: About section and Services-only description/link integration.
- `src/components/footer.tsx`: localized attribution and compact wrapping layout.
- `public/brand/zichtgroei-mark-white.svg`: original official white mark.
- `docs/WORKSHOP_TRUST_ZICHTGROEI_REPORT.md`: this report.

## Logo provenance and destination

Source: `C:\Users\barto\Downloads\ZICHTGROEI_Logo_Pakiet.zip`, entry `SVG-wektor/ZICHTGROEI_znak_bialy.svg`. Its original bytes are retained, with SHA-256 `c8c8fe077f3314f2efafe7f486ab9d57e615396acb44ef96b6e0797528d01d30`.

The supplied white mark is rendered at 16×16 px, secondary to NoordTune, with an empty alt because the adjacent link already says ZICHTGROEI. The complete SVG wordmark depends on the unbundled Geist font; the font-independent mark avoids that dependency. No logo package, font, source/print asset or branding reinterpretation was committed.

Configured destination: exactly `https://zichtgroei.nl/`.

Availability on 2026-10-07: the HTTPS request failed with an unknown-host error and Cloudflare DNS (`1.1.1.1`) returned NXDOMAIN. The official website is not currently reachable from this QA environment. The intended link remains in the feature branch; no substitute destination, DNS change or change to the separate ZICHTGROEI project was made. Recheck public availability before recommending production release.

## Trust-claim review

The existing Dutch `whyItems` copy says “Jarenlange ervaring met chiptuning, ECU diagnose en software.” (`src/content/copy.ts`, line 915). The repository supplies no evidence for the duration of that experience. Owner confirmation or a separately approved wording change is needed; the claim was not treated as proven false and was left unchanged.

The existing NL/EN/PL Result benefit statements promise a noticeable improvement in power, torque and driving experience without a qualification in that specific card. Other public copy already explains that results are vehicle-specific. The owner should consider qualifying those short benefit statements in a separate copy review. No customer-result facts or figures were changed.

No public manufacturer-partnership or professional-certification claim was found. The BMW X3 result's delivered certificate is an existing owner-confirmed case fact, not a claim of workshop accreditation; it remains unchanged. Existing blog and brand-page disclaimers reject universal outcomes and guaranteed savings.

## QA and safeguards

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; 141 static pages |
| `pnpm content:audit` | Pass |
| `pnpm test:seo` | Pass; 7 tests |
| `pnpm test:brand` | Pass; 6 tests |
| `pnpm test:enquiry` | Pass; 11 tests |
| `pnpm test:analytics` | Pass; 6 tests |
| Focused workshop/footer browser QA | Pass; 12 routes × 6 viewports = 72 cases |
| `pnpm test:analytics:browser` | Pass; NL/EN/PL intercepted events |
| `pnpm test:enquiry:browser` | Pass; 40 cases on isolated rerun |
| `pnpm test:seo:browser` | Pass; 84 internal links |
| `pnpm test:brand:browser` | Pass; 14 routes × 6 viewports |

The focused QA covered all nine requested About/Services/home routes plus representative Dutch article, customer-result and brand pages at 390×844, 430×932, 768×1024, 820×1180, 1180×820 and 1440×1000. It checked the translations, seven tool tags, About links, exact attribution URL and secure rel, original square logo sizing, compact footer, clearance from the WhatsApp bubble, mobile menu opening/closing, horizontal overflow and console errors. Screenshots were reviewed locally; no overflow or browser errors remain.

One initial concurrent enquiry run stopped at an immediate enabled-control assertion while the Polish appointment page was hydrating. The unmodified suite passed all 40 cases when rerun on its own. No enquiry-code change was made. External requests were intercepted and all enquiry data was synthetic; no real enquiry, email or WhatsApp message was sent.

A rendered comparison against production on the 12 representative routes confirmed identical titles, descriptions, canonicals, hreflang, JSON-LD business identity, analytics event names/properties and existing Power Catalog, appointment, phone, email and WhatsApp links. The sitemap response was identical. The homepage still has three customer projects and each localized archive has seven. The enquiry regression also preserved the iPad Power Catalog layout.

No dependency/lockfile, price, existing blog article, brand-page content, customer-result data, business name/phone/location, structured-data provider, SEO route or deployment configuration changed. The Power Catalog destination remains exactly `https://power.noordtune.nl/`; its repository and application were not modified.

## Release hold and owner decisions

This branch is for owner review and preview only. Preserve the production analytics baseline through the requested hold: do not merge before 2026-10-11, and require owner approval before any production release. Confirm the public ZICHTGROEI destination is live and resolve the experience-claim decision before recommending a merge. `main` and production remain unchanged by this task.
