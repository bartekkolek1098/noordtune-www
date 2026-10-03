import type {FaqItem} from "./copy";
import {
  enBuyerDecisionBlogArticles,
  nlBuyerDecisionBlogArticles,
  plBuyerDecisionBlogArticles
} from "./blog-articles-buyer-decision";
import {enBlogArticles} from "./blog-articles-data-en";
import {enGrowthBlogArticles, nlGrowthBlogArticles, plGrowthBlogArticles} from "./blog-articles-growth";
import {nlBlogArticles} from "./blog-articles-data-nl";
import {plBlogArticles} from "./blog-articles-data-pl";
import {locales, pageRoutes, site, type Locale} from "./site";

export type BlogArticleSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type BlogArticle = {
  locale: Locale;
  slug: string;
  status: "published" | "draft";
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  heroImage: string;
  heroImageAlt?: string;
  intro: string;
  publishedAt: string;
  updatedAt: string;
  sections: BlogArticleSection[];
  faq: FaqItem[];
  relatedLinks: Array<{label: string; href: string}>;
};

export function blogArticlePath(locale: Locale, slug: string) {
  return `/${locale}/${pageRoutes.blog[locale]}/${slug}`;
}

const blogArticleSlugAliases: Partial<Record<Locale, Record<string, string>>> = {
  nl: {
    "tips-na-tuning": "5-tips-na-een-tuning",
    "diagnose-voor-tuning": "waarom-diagnose-voor-tuning-belangrijk-is"
  },
  en: {
    "tips-after-tuning": "5-tips-after-a-tune",
    "diagnostics-before-tuning": "why-diagnostics-before-tuning-matter"
  },
  pl: {
    "czym-jest-chiptuning": "co-to-jest-chiptuning",
    "adblue-wyjasnienie-usterki": "usterka-adblue-wyjasnienie",
    "porady-po-tuningu": "5-zalecen-po-chiptuningu",
    "diagnostyka-przed-tuningiem": "dlaczego-diagnostyka-przed-tuningiem-jest-wazna"
  }
};

export function blogArticleSlugForPost(locale: Locale, postSlug: string) {
  return blogArticleSlugAliases[locale]?.[postSlug] ?? postSlug;
}

export function blogArticlePathForPost(locale: Locale, postSlug: string) {
  return blogArticlePath(locale, blogArticleSlugForPost(locale, postSlug));
}

export function blogArticleUrl(article: BlogArticle) {
  return `${site.url}${blogArticlePath(article.locale, article.slug)}`;
}

export function blogArticlesForLocale(locale: Locale) {
  return blogArticles.filter((article) => article.locale === locale && article.status === "published");
}

export function latestBlogArticles(locale: Locale, limit = 2) {
  return blogArticlesForLocale(locale)
    .map((article, sourceOrder) => ({article, sourceOrder}))
    .sort(
      (a, b) =>
        Date.parse(b.article.publishedAt) - Date.parse(a.article.publishedAt) ||
        a.sourceOrder - b.sourceOrder
    )
    .slice(0, Math.max(0, limit))
    .map(({article}) => article);
}

export function blogArticleFromRoute(locale: Locale, blogSlug: string, articleSlug: string) {
  if (pageRoutes.blog[locale] !== blogSlug) {
    return undefined;
  }

  return blogArticles.find(
    (article) => article.locale === locale && article.slug === articleSlug && article.status === "published"
  );
}

export function blogArticleStaticParams() {
  return blogArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      locale: article.locale,
      blogSlug: pageRoutes.blog[article.locale],
      articleSlug: article.slug
    }));
}

export const blogArticles: BlogArticle[] = [
  ...nlBlogArticles,
  ...nlGrowthBlogArticles,
  ...nlBuyerDecisionBlogArticles,
  ...enBlogArticles,
  ...enGrowthBlogArticles,
  ...enBuyerDecisionBlogArticles,
  ...plBlogArticles,
  ...plGrowthBlogArticles,
  ...plBuyerDecisionBlogArticles
];

export const blogArticleTranslationGroups = {
  "what-is-chiptuning": {nl: "wat-is-chiptuning", en: "what-is-chiptuning", pl: "co-to-jest-chiptuning"},
  "stage-1-vs-stage-2": {nl: "stage-1-vs-stage-2", en: "stage-1-vs-stage-2", pl: "stage-1-vs-stage-2"},
  "ecu-remap-safety": {nl: "is-ecu-remap-veilig", en: "is-ecu-remap-safe", pl: "czy-remap-ecu-jest-bezpieczny"},
  "adblue-fault": {nl: "adblue-storing-uitgelegd", en: "adblue-fault-explained", pl: "usterka-adblue-wyjasnienie"},
  "after-tuning-tips": {nl: "5-tips-na-een-tuning", en: "5-tips-after-a-tune", pl: "5-zalecen-po-chiptuningu"},
  "diagnostics-before-tuning": {nl: "waarom-diagnose-voor-tuning-belangrijk-is", en: "why-diagnostics-before-tuning-matter", pl: "dlaczego-diagnostyka-przed-tuningiem-jest-wazna"},
  "what-is-ecu-remap": {nl: "wat-is-ecu-remap", en: "what-is-ecu-remap", pl: "co-to-jest-remap-ecu"},
  "automatic-transmission": {nl: "chiptuning-met-automaat", en: "chiptuning-with-automatic-transmission", pl: "chiptuning-z-automatyczna-skrzynia"},
  "stage-2-suitability": {nl: "wanneer-is-stage-2-tuning-verstandig", en: "when-does-stage-2-tuning-make-sense", pl: "kiedy-stage-2-ma-sens"},
  "log-analysis": {nl: "waarom-loganalyse-belangrijk-is-voor-tuning", en: "why-log-analysis-matters-before-tuning", pl: "dlaczego-logi-sa-wazne-przed-tuningiem"},
  "dsg-tcu-tuning": {nl: "dsg-tcu-tuning-uitgelegd", en: "dsg-tcu-tuning-explained", pl: "dsg-tcu-tuning-wyjasnienie"},
  "dpf-egr-adblue": {nl: "dpf-egr-of-adblue-storing-wat-nu", en: "dpf-egr-adblue-fault-what-now", pl: "dpf-egr-adblue-usterka-co-dalej"},
  "chiptuning-cost": {nl: "wat-kost-chiptuning", en: "what-does-chiptuning-cost", pl: "ile-kosztuje-chiptuning"},
  "fuel-consumption": {nl: "verbruikt-mijn-auto-meer-na-chiptuning", en: "does-chiptuning-increase-fuel-consumption", pl: "czy-auto-po-chiptuningu-wiecej-pali"},
  "apk-inspection": {nl: "chiptuning-en-apk-in-nederland", en: "chiptuning-and-dutch-apk-inspection", pl: "chiptuning-a-apk-w-holandii"},
  "torque-limiters": {nl: "koppelbegrenzers-in-ecu-en-tcu", en: "torque-limiters-in-ecu-and-tcu", pl: "limitery-momentu-w-ecu-i-tcu"},
  "turbo-fuel-egt": {nl: "turbo-brandstof-en-egt-uitgelegd", en: "turbo-fuel-and-egt-explained", pl: "turbo-paliwo-i-egt-wyjasnienie"}
} as const satisfies Record<string, Record<Locale, string>>;

export type BlogArticleTranslationKey = keyof typeof blogArticleTranslationGroups;

export function blogArticleForTranslationKey(key: BlogArticleTranslationKey, locale: Locale) {
  const slug = blogArticleTranslationGroups[key][locale];
  return blogArticles.find(
    (article) => article.locale === locale && article.slug === slug && article.status === "published"
  );
}

export function blogArticleAlternates(article: BlogArticle) {
  const group = Object.values(blogArticleTranslationGroups).find(
    (candidate) => candidate[article.locale] === article.slug
  );

  if (!group) {
    return {[article.locale]: blogArticleUrl(article)};
  }

  return Object.fromEntries(
    locales.flatMap((locale) => {
      const translatedArticle = blogArticles.find(
        (candidate) =>
          candidate.locale === locale &&
          candidate.slug === group[locale] &&
          candidate.status === "published"
      );
      return translatedArticle ? [[locale, blogArticleUrl(translatedArticle)]] : [];
    })
  );
}
