# Contact and appointment enquiry refresh

Date: 2026-10-01

Branch: `feature/www-contact-refresh-2026-09`

Base main: `ee10d9db9ab7f45a30be15c239a0ef2027822960`

## Confirmed causes and changes

The contact form had disconnected inputs and an unparameterized WhatsApp link. Appointment pages described a future booking system. Footer phone/email/WhatsApp were text, and social icons were decorative spans.

- `src/components/whatsapp-enquiry.tsx`: one small client component shared by contact and appointment pages. Service and description are required; vehicle, plate and appointment preference are optional. Labels, errors, preview, actions and explanations are localized in NL/EN/PL. Limits are 1,000 / 120 / 24 / 100 characters for description / vehicle / plate / preference.
- `src/content/enquiry.ts` and `src/lib/enquiry.ts`: localized message text, validation and URL encoding. The recipient comes from the unchanged `site.whatsappUrl`.
- `src/components/page-renderers.tsx`, `page-hero.tsx` and `src/content/copy.ts`: connect both page types to the composer, replace appointment placeholders with a personal enquiry process, and link the hero action to the composer. Only appointment metadata wording changed; routes and canonical URLs are preserved.
- `src/components/footer.tsx`: real phone, email and WhatsApp links. Contact cards and the composer offer the same configured alternatives. No business contact data changed.
- `src/components/rich-info-section.tsx`: optional stat-text sizing, used only by contact pages to fix pre-existing mobile overflow in the service-area cards. Other callers retain their original sizing.
- `tests/enquiry.test.ts`, `scripts/test-enquiry-browser.ts` and two package scripts: focused tests using the existing tsx, Node assertions and Playwright installation. No dependencies or lockfile changes.

The floating WhatsApp button is omitted on enquiry pages to avoid covering fields. Inline WhatsApp links remain available; the floating button on other pages and the mobile navigation are unchanged.

## Message and privacy behavior

The preview updates as the visitor edits fields; empty optional fields are omitted. Continuing opens a new WhatsApp tab with an encoded message. Visitors are explicitly told that they send it themselves and that NoordTune must personally confirm an appointment. Opening WhatsApp neither clears the input nor claims delivery, storage or booking success.

State stays in React memory. There is no enquiry backend, storage, analytics or logging. A fieldset with explicit buttons replaces the native form, so there is no native GET/POST submission path. Controls are disabled before hydration; visible phone, email and direct WhatsApp alternatives work without the composer. Without JavaScript, composition is unavailable and the page explains the alternatives.

Copy feedback appears only after a successful clipboard write. Failure or an unavailable Clipboard API focuses/selects the readable preview for manual copying. Editing resets feedback and invalidates pending copy results. A localized privacy link opens separately to preserve the current page. The explicit handoff shares message contents with WhatsApp in its URL; the page does not claim that data never leaves the browser.

## Validation

Local browser target: `http://127.0.0.1:3001`. Synthetic input only; automated external navigation is intercepted. No WhatsApp messages or emails were sent.

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm content:audit` | Passed |
| `pnpm test:enquiry` | Passed, 11 tests |
| `pnpm build` | Passed, 141 static pages |
| `pnpm test:enquiry:browser` | Passed, 40 cases: 24 responsive flow checks, 12 unhydrated checks, 3 locale regression groups, 1 clipboard/alternative-link case |

Browser coverage: all six contact/appointment routes at 390x844, 820x1180, 1180x820 and 1440x1000; required/whitespace validation, optional omissions, Unicode/newline/symbol round-trip, correct recipient, explicit click/Enter handoff, retained fields, real clipboard success, clipboard failure/manual selection, stale copy results, no false confirmations, keyboard focus, mobile menu, no overflow or obstructing bubble, and no browser errors or synthetic input in website requests, console output or persistent browser storage. Reload clears in-memory fields. No-JavaScript and blocked-hydration Enter/click checks cover all six routes.

Regression coverage in NL/EN/PL: exactly three featured homepage results, all seven published archive results, blog indexes, all 15 brand pages, preserved canonical URLs and catalog destinations, and contained/non-overlapping iPad catalog metrics. Desktop and mobile composer screenshots were visually reviewed. Generated QA screenshots remain ignored under `docs/qa-screenshots/contact-refresh/`.

Limitations: automated browser coverage uses installed Chrome on Windows; other browser engines and physical devices were not tested. WhatsApp acceptance/delivery, email delivery, native app launching and real appointment booking are intentionally not claimed. The no-JavaScript tests verify disabled controls/direct alternatives and also force-enable controls to prove there is still no native submission path.

## Missing social profiles and scope

No exact verified Facebook, Instagram, TikTok or YouTube business-profile URL was found in the project. Those decorative icons were removed; no profile URL was guessed.

Main branch, Power Catalog files/processes/deployments, catalog link destinations, dependency versions/lockfile, business facts, blog articles, brand content, customer-result data, domains, DNS and Vercel project settings were not changed. No merge or production deployment is authorized by this task.
