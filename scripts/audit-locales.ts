import {readFile} from "node:fs/promises";
import {join} from "node:path";
import {
  blogArticleFromRoute,
  blogArticlePath,
  blogArticleSlugForPost,
  blogArticles,
  blogArticleStaticParams
} from "../src/content/blog-articles";
import {posts} from "../src/content/copy";
import {customerResults} from "../src/content/customer-results";
import {locales, pageRoutes, site, type Locale} from "../src/content/site";

type Check = {
  file: string;
  pattern: RegExp;
  message: string;
};

const root = process.cwd();

const files = [
  "src/content/copy.ts",
  "src/content/site.ts",
  "src/content/seo-landings.ts",
  "src/content/blog-articles.ts",
  "src/content/blog-articles-data-nl.ts",
  "src/content/blog-articles-data-en.ts",
  "src/content/blog-articles-data-pl.ts",
  "src/content/content-growth-drafts.ts",
  "src/content/customer-results.ts",
  "src/components/power-catalog-section.tsx",
  "src/components/cta-section.tsx",
  "src/components/blog-article-renderer.tsx",
  "src/components/page-renderers.tsx",
  "src/components/seo-landing-renderer.tsx",
  "src/components/footer.tsx",
  "src/components/cards.tsx"
];

const polishFiles = [
  "src/content/copy.ts",
  "src/content/blog-articles.ts",
  "src/content/blog-articles-data-pl.ts",
  "src/content/content-growth-drafts.ts",
  "src/content/customer-results.ts",
  "src/components/power-catalog-section.tsx",
  "src/components/cta-section.tsx",
  "src/components/blog-article-renderer.tsx",
  "src/components/page-renderers.tsx",
  "src/components/seo-landing-renderer.tsx",
  "src/components/footer.tsx",
  "src/components/cards.tsx"
];

const checks: Check[] = [
  {file: "src/content/copy.ts", pattern: /\bWiecej\b|\bWIECEJ\b|\bWiecej\b/i, message: "Polish copy contains unaccented 'wiecej'."},
  {file: "src/content/copy.ts", pattern: /\bOsiagi\b|\bOSIAGI\b|\bosiagi\b/, message: "Polish copy contains unaccented 'osiagi'."},
  {file: "src/content/copy.ts", pattern: /\bWyslij\b|\bwyslij\b|\bWYSLIJ\b/, message: "Polish copy contains unaccented 'wyslij'."},
  {file: "src/content/copy.ts", pattern: /\bOtworz\b|\botworz\b|\bOTWORZ\b/, message: "Polish copy contains unaccented 'otworz'."},
  {file: "src/content/copy.ts", pattern: /\bZamowienie\b|\bzamowienie\b|\bZAMOWIENIE\b/, message: "Polish copy contains unaccented 'zamowienie'."},
  {file: "src/content/copy.ts", pattern: /Diagnostyka auta|DIAGNOSTYKA AUTA/, message: "Polish copy uses the weak phrase 'diagnostyka auta'."},
  {file: "src/content/copy.ts", pattern: /lepsza jazde|LEPSZA JAZDE/i, message: "Polish copy contains unaccented 'lepsza jazde'."},
  {file: "src/components/power-catalog-section.tsx", pattern: /pl:\s*{[\s\S]*?(Open Power Catalog|Ask via WhatsApp|Zapytaj przez WhatsApp)[\s\S]*?}/, message: "Power Catalog component contains mixed-language Polish CTA leftovers."},
  {file: "src/components/cta-section.tsx", pattern: /Otworz|Napisz WhatsApp|OPEN POWER CATALOG|CHECK TUNING OPTIONS/, message: "Final CTA contains wrong-language or unaccented labels."},
  {file: "src/components/page-renderers.tsx", pattern: /Sprawdz auto|Napisz WhatsApp|WhatsApp us|Open catalogus|Open catalog"/, message: "Page renderer contains mixed or unaccented CTA labels."},
  {file: "src/components/footer.tsx", pattern: /Gotowy na lepsza|Sprawdz auto|wyslij|Open Power Catalog[\s\S]*pl/, message: "Footer contains Polish/English CTA leftovers."},
  {file: "src/components/cards.tsx", pattern: /Wiecej|Najczesciej/, message: "Cards contain unaccented Polish labels."},
  {file: "src/components/seo-landing-renderer.tsx", pattern: /Uzyj|Wyslij|Najczestsze|Powiazane/, message: "SEO landing renderer contains unaccented Polish labels."}
];

const requiredLabels = [
  "Vermogen berekenen",
  "Open Power Catalog",
  "WhatsApp ons",
  "Plan een afspraak",
  "Check tuning options",
  "Message us on WhatsApp",
  "Book an appointment",
  "Sprawdź możliwości auta",
  "Otwórz katalog mocy",
  "Napisz na WhatsApp",
  "Umów wizytę",
  "Sprawdź auto w katalogu"
];

function stripRouteBlocks(source: string) {
  return source
    .replace(/pl:\s*"(?:uslugi|rezultaty|aktualnosci-blog|polityka-prywatnosci)"/g, "")
    .replace(/\/pl\/(?:uslugi|rezultaty|aktualnosci-blog|polityka-prywatnosci)/g, "");
}

async function readUtf8(file: string) {
  const bytes = await readFile(join(root, file));
  const decoder = new TextDecoder("utf-8", {fatal: true});
  return decoder.decode(bytes);
}

async function main() {
  const failures: string[] = [];
  const contents = new Map<string, string>();

  for (const file of files) {
    try {
      contents.set(file, await readUtf8(file));
    } catch (error) {
      failures.push(`${file}: not valid UTF-8 (${error instanceof Error ? error.message : String(error)})`);
    }
  }

  for (const check of checks) {
    const source = contents.get(check.file);
    if (!source) {
      continue;
    }
    const searchable = polishFiles.includes(check.file) ? stripRouteBlocks(source) : source;
    if (check.pattern.test(searchable)) {
      failures.push(`${check.file}: ${check.message}`);
    }
  }

  const allSource = Array.from(contents.values()).join("\n");
  for (const label of requiredLabels) {
    if (!allSource.includes(label)) {
      failures.push(`Missing required CTA label: ${label}`);
    }
  }

  const polishVisibleSource = polishFiles.map((file) => stripRouteBlocks(contents.get(file) ?? "")).join("\n");
  for (const englishCta of ["OPEN POWER CATALOG", "MESSAGE US", "CHECK TUNING OPTIONS"]) {
    if (polishVisibleSource.includes(englishCta)) {
      failures.push(`Polish visible content contains English CTA: ${englishCta}`);
    }
  }

  const requiredArticleRoutes = {
    nl: [
      "/nl/blog/wat-is-chiptuning",
      "/nl/blog/stage-1-vs-stage-2",
      "/nl/blog/is-ecu-remap-veilig",
      "/nl/blog/adblue-storing-uitgelegd",
      "/nl/blog/5-tips-na-een-tuning",
      "/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is"
    ],
    en: [
      "/en/news-blog/what-is-chiptuning",
      "/en/news-blog/stage-1-vs-stage-2",
      "/en/news-blog/is-ecu-remap-safe",
      "/en/news-blog/adblue-fault-explained",
      "/en/news-blog/5-tips-after-a-tune",
      "/en/news-blog/why-diagnostics-before-tuning-matter"
    ],
    pl: [
      "/pl/aktualnosci-blog/co-to-jest-chiptuning",
      "/pl/aktualnosci-blog/stage-1-vs-stage-2",
      "/pl/aktualnosci-blog/czy-remap-ecu-jest-bezpieczny",
      "/pl/aktualnosci-blog/usterka-adblue-wyjasnienie",
      "/pl/aktualnosci-blog/5-zalecen-po-chiptuningu",
      "/pl/aktualnosci-blog/dlaczego-diagnostyka-przed-tuningiem-jest-wazna"
    ]
  } satisfies Record<Locale, string[]>;

  const staticArticleRoutes = new Set(
    blogArticleStaticParams().map((params) => `/${params.locale}/${params.blogSlug}/${params.articleSlug}`)
  );

  for (const locale of locales) {
    const localePosts = posts[locale];
    for (const post of localePosts) {
      const articleSlug = blogArticleSlugForPost(locale, post.slug);
      const route = blogArticlePath(locale, articleSlug);
      const article = blogArticleFromRoute(locale, pageRoutes.blog[locale], articleSlug);
      if (!article) {
        failures.push(`Blog card has no matching article route: ${route}`);
        continue;
      }
      if (!staticArticleRoutes.has(route)) {
        failures.push(`Article route is not in static params: ${route}`);
      }
      if (!article.metaTitle || !article.metaDescription || !article.heroImage) {
        failures.push(`Article is missing metadata fields: ${route}`);
      }
      if (!article.sections.length) {
        failures.push(`Article has no sections: ${route}`);
      }
    }

    for (const route of requiredArticleRoutes[locale]) {
      if (!staticArticleRoutes.has(route)) {
        failures.push(`Required article route is missing: ${route}`);
      }
    }
  }

  const articlePaths = new Set(blogArticles.filter((article) => article.status === "published").map((article) => blogArticlePath(article.locale, article.slug)));
  if (articlePaths.size !== blogArticles.filter((article) => article.status === "published").length) {
    failures.push("Published blog articles contain duplicate locale/slug routes.");
  }

  for (const article of blogArticles.filter((item) => item.status === "published")) {
    const route = blogArticlePath(article.locale, article.slug);
    const serialized = JSON.stringify(article);
    if (/facebook|social update/i.test(serialized)) {
      failures.push(`SEO article appears to contain social/Facebook update content: ${route}`);
    }
    if (article.locale === "pl") {
      const visibleText = [
        article.title,
        article.metaTitle,
        article.metaDescription,
        article.intro,
        ...article.sections.flatMap((section) => [section.heading, ...section.body, ...(section.bullets ?? [])]),
        ...article.faq.flatMap((item) => [item.question, item.answer])
      ].join(" ");

      if (!/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(visibleText)) {
        failures.push(`Polish article has no Polish diacritics: ${route}`);
      }
      for (const forbidden of ["OPEN POWER CATALOG", "MESSAGE US", "CHECK TUNING OPTIONS", "Wiecej", "Wyslij", "Otworz", "Osiagi", "Zamowienie"]) {
        if (visibleText.includes(forbidden)) {
          failures.push(`Polish article contains forbidden leftover '${forbidden}': ${route}`);
        }
      }
    }
  }

  for (const result of customerResults) {
    if (!result.id || !result.slug || !result.vehicleMake || !result.vehicleModel || !result.vehicleEngine) {
      failures.push(`Customer result is missing required vehicle fields: ${result.id || "(no id)"}`);
    }
    if (result.relatedPowerCatalogUrl !== site.catalogUrl) {
      failures.push(`Customer result has wrong Power Catalog URL: ${result.id}`);
    }
    if (result.whatsappCta !== site.whatsappUrl) {
      failures.push(`Customer result has wrong WhatsApp URL: ${result.id}`);
    }
    if (result.status === "published" && result.source === "facebook") {
      failures.push(`Facebook-sourced customer result should not publish automatically: ${result.id}`);
    }
    if (result.status === "published" && !result.disclaimer) {
      failures.push(`Published customer result is missing disclaimer: ${result.id}`);
    }
  }

  for (const file of files) {
    const source = contents.get(file) ?? "";
    if (/href=["']\/power\b|href:\s*["']\/power\b/.test(source)) {
      failures.push(`${file}: contains local /power link.`);
    }
    if (/wa\.me\/(?!31685759600)/.test(source)) {
      failures.push(`${file}: contains non-standard WhatsApp link.`);
    }
    if (/power\.noordtune\.nl(?!\/)/.test(source)) {
      failures.push(`${file}: Power Catalog URL should include trailing slash.`);
    }
  }

  if (failures.length > 0) {
    console.error("Content audit failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("Content audit passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
