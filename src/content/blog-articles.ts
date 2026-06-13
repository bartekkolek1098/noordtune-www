import type {FaqItem} from "./copy";
import {enBlogArticles} from "./blog-articles-data-en";
import {nlBlogArticles} from "./blog-articles-data-nl";
import {plBlogArticles} from "./blog-articles-data-pl";
import {pageRoutes, site, type Locale} from "./site";

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
  ...enBlogArticles,
  ...plBlogArticles
];
