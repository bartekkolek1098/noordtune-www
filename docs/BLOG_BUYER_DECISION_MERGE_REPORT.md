# Blog Buyer Decision Merge Report

Date: 2026-08-16  
Repository: `bartekkolek1098/noordtune-www`  
Pull request: https://github.com/bartekkolek1098/noordtune-www/pull/10

## Merge result

- Source branch: `feature/blog-buyer-decision-batch`
- Target branch: `main`
- Method: squash merge
- Result: successful
- Squash merge commit: `b092c2e65bd33ec3b444ede441c3dbe24d530bdc`
- The source branch was retained for post-merge production QA.

## QA results

The required checks were run before the merge and repeated on the merged `main` commit:

| Check | Result |
| --- | --- |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| `pnpm build` | Passed; 126 static pages generated |
| `pnpm content:audit` | Passed |

Production-build browser QA before merge also passed for:

- all 15 new localized article routes;
- `/nl/blog`, `/en/news-blog` and `/pl/aktualnosci-blog`;
- title, description, canonical and Open Graph metadata;
- Article JSON-LD and FAQPage JSON-LD;
- Power Catalog and WhatsApp CTA destinations;
- existing result listing pages and the BMW X3 and Audi A4 result pages.

## Article routes

All five topics are published in Dutch, English and Polish. All 15 routes returned HTTP 200 in the local production build.

### Dutch

- `/nl/blog/wat-kost-chiptuning`
- `/nl/blog/verbruikt-mijn-auto-meer-na-chiptuning`
- `/nl/blog/chiptuning-en-apk-in-nederland`
- `/nl/blog/koppelbegrenzers-in-ecu-en-tcu`
- `/nl/blog/turbo-brandstof-en-egt-uitgelegd`

### English

- `/en/news-blog/what-does-chiptuning-cost`
- `/en/news-blog/does-chiptuning-increase-fuel-consumption`
- `/en/news-blog/chiptuning-and-dutch-apk-inspection`
- `/en/news-blog/torque-limiters-in-ecu-and-tcu`
- `/en/news-blog/turbo-fuel-and-egt-explained`

### Polish

- `/pl/aktualnosci-blog/ile-kosztuje-chiptuning`
- `/pl/aktualnosci-blog/czy-auto-po-chiptuningu-wiecej-pali`
- `/pl/aktualnosci-blog/chiptuning-a-apk-w-holandii`
- `/pl/aktualnosci-blog/limitery-momentu-w-ecu-i-tcu`
- `/pl/aktualnosci-blog/turbo-paliwo-i-egt-wyjasnienie`

## Sitemap result

- Local `/sitemap.xml` returned HTTP 200.
- All 15 new canonical article URLs were present.
- Existing draft behavior remained unchanged.
- Production `https://www.noordtune.nl/sitemap.xml` returned HTTP 200 after deployment.

## Link and scope safety

- Power Catalog links point to `https://power.noordtune.nl/`.
- WhatsApp links point to `https://wa.me/31685759600`.
- Customer result source data was not modified.
- `power.noordtune.nl` was not modified.
- No booking implementation was added.
- No Facebook API sync was added.
- No file-service implementation was added.
- No production domain or Vercel setting was changed.

## Deployment

Vercel deployment for squash merge commit `b092c2e65bd33ec3b444ede441c3dbe24d530bdc` completed successfully. The production Dutch cost article and production sitemap both returned HTTP 200 after deployment.

