# Contact refresh merge report

Date: 2026-10-01

1. **Merge result:** [PR #13](https://github.com/bartekkolek1098/noordtune-www/pull/13) was squash-merged into `main` with owner approval at 15:34:06 UTC. Immediately before merging, it was OPEN, MERGEABLE and CLEAN, with a successful Vercel check. The approved head was `ed1dfaa2a0af028068902a31fbc5d1a4a72274f3`; the base was `ee10d9db9ab7f45a30be15c239a0ef2027822960`. All 12 changed files matched the approved scope. Package changes only added test scripts; dependencies and the lockfile were unchanged.

2. **Merge commit:** `09b813acd54ca75f43904b07e34154b743f393d0`. Local `main` was pulled with `--ff-only` and matches remote `main`. Its parent is the checked base, and its complete Git tree equals the tested feature commit. The local and remote feature branch `feature/www-contact-refresh-2026-09` remain retained.

3. **Final QA:** All checks below passed. Existing script names were used because `package.json` defines neither `content` nor `test`.

   | Check | Result |
   | --- | --- |
   | `pnpm lint` | Passed |
   | `pnpm typecheck` | Passed |
   | `pnpm build` | Passed; 141 static pages |
   | `pnpm content:audit` | Passed |
   | `pnpm test:enquiry` | 11/11 passed |
   | `pnpm test:enquiry:browser` | 40/40 passed against the local production build before merge |
   | Live production browser QA | 40/40 passed against `https://www.noordtune.nl` after deployment |

   Chrome coverage included all six NL/EN/PL contact/appointment routes at 390, 820, 1180 and 1440 px; required-field validation, preview updates through editable inputs, Unicode/newline URL encoding, retained input, copy/manual-copy fallback, phone/email/WhatsApp alternatives, no-JavaScript and blocked hydration, and existing content regressions. No horizontal overflow or console errors were detected. Mobile composer and desktop footer screenshots were visually reviewed. Production QA used an ignored copy of the existing test harness restricted to the main-site origin and safe GET/HEAD requests. External handoffs were intercepted; no messages, emails or bookings were sent. Native-app launching and actual delivery were not tested.

   Facebook is exactly `https://www.facebook.com/profile.php?id=61590085682134`; Instagram is exactly `https://www.instagram.com/noordtune.nl`. Both open separate tabs with `noopener noreferrer` and no opener. TikTok and YouTube remain hidden.

4. **Vercel production:** READY for the exact merge SHA through the normal Git integration. Deployment: `dpl_5TvsbUMRVeboL28sar3bWQXGckZW`; [deployment dashboard](https://vercel.com/bartekkolek1098s-projects/noordtune-www/5TvsbUMRVeboL28sar3bWQXGckZW). The production alias `www.noordtune.nl` is assigned, and the GitHub Vercel status is successful. Build duration was approximately 50 seconds. The deployment-scoped error-log query returned no entries during verification; this is a point-in-time check, not ongoing monitoring. Log drains were not inspected.

5. **Main and live flow:** The approved enquiry flow is on `main` and passed browser QA on the public production domain. No additional feature changes were made during this merge task. This report is saved locally after production QA; no additional documentation commit or deployment was created.

6. **Power Catalog preserved:** `power.noordtune.nl` was not modified. Its SEO, structure, routes, sitemap, metadata and catalog data were untouched. Main-site catalog links remain exactly `https://power.noordtune.nl/`. Contact data, customer-result facts, blog articles, brand pages, DNS, domains and Vercel project settings were not changed.

7. **Excluded features:** No booking database, live availability, payments, Facebook API sync or file service was added. Appointment preferences remain enquiries requiring personal confirmation.
