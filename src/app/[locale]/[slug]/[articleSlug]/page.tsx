import {notFound} from "next/navigation";
import {BlogArticleRenderer} from "@/components/blog-article-renderer";
import {CustomerResultRenderer} from "@/components/customer-result-renderer";
import {blogArticleFromRoute, blogArticleStaticParams} from "@/content/blog-articles";
import {
  customerResultFromRoute,
  customerResultStaticParams
} from "@/content/customer-results";
import {defaultLocale, isLocale, type Locale} from "@/content/site";
import {
  articleJsonLd,
  createCustomerResultMetadata,
  createBlogArticleMetadata,
  customerResultJsonLd,
  faqItemsJsonLd,
  JsonLd,
  localBusinessJsonLd
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
    articleSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const articleParams = blogArticleStaticParams().map((params) => ({
    locale: params.locale,
    slug: params.blogSlug,
    articleSlug: params.articleSlug
  }));

  const resultParams = customerResultStaticParams().map((params) => ({
    locale: params.locale,
    slug: params.resultsSlug,
    articleSlug: params.resultSlug
  }));

  return [...articleParams, ...resultParams];
}

export async function generateMetadata({params}: PageProps) {
  const {locale, slug, articleSlug} = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const article = blogArticleFromRoute(safeLocale, slug, articleSlug);

  if (!article) {
    const result = customerResultFromRoute(safeLocale, slug, articleSlug);
    return result ? createCustomerResultMetadata(result) : {};
  }

  return createBlogArticleMetadata(article);
}

export default async function BlogArticlePage({params}: PageProps) {
  const {locale, slug, articleSlug} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const article = blogArticleFromRoute(safeLocale, slug, articleSlug);

  if (article) {
    return (
      <>
        <JsonLd data={localBusinessJsonLd(safeLocale)} />
        <JsonLd data={articleJsonLd(article)} />
        {article.faq.length > 0 ? <JsonLd data={faqItemsJsonLd(article.faq)} /> : null}
        <BlogArticleRenderer article={article} />
      </>
    );
  }

  const result = customerResultFromRoute(safeLocale, slug, articleSlug);

  if (!result) {
    notFound();
  }

  return (
    <>
      <JsonLd data={localBusinessJsonLd(safeLocale)} />
      <JsonLd data={customerResultJsonLd(result)} />
      <CustomerResultRenderer result={result} />
    </>
  );
}
