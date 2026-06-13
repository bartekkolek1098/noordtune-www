import {notFound} from "next/navigation";
import {BlogArticleRenderer} from "@/components/blog-article-renderer";
import {blogArticleFromRoute, blogArticleStaticParams} from "@/content/blog-articles";
import {defaultLocale, isLocale, type Locale} from "@/content/site";
import {
  articleJsonLd,
  createBlogArticleMetadata,
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
  return blogArticleStaticParams().map((params) => ({
    locale: params.locale,
    slug: params.blogSlug,
    articleSlug: params.articleSlug
  }));
}

export async function generateMetadata({params}: PageProps) {
  const {locale, slug, articleSlug} = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const article = blogArticleFromRoute(safeLocale, slug, articleSlug);

  if (!article) {
    return {};
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

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd data={localBusinessJsonLd(safeLocale)} />
      <JsonLd data={articleJsonLd(article)} />
      {article.faq.length > 0 ? <JsonLd data={faqItemsJsonLd(article.faq)} /> : null}
      <BlogArticleRenderer article={article} />
    </>
  );
}
