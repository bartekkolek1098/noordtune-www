import type {MetadataRoute} from "next";
import {blogArticles, blogArticleUrl} from "@/content/blog-articles";
import {brandPageForBrand, brandPages, brandPageUrl} from "@/content/brand-pages";
import {customerResults, customerResultUrl, isPublicCustomerResult} from "@/content/customer-results";
import {seoLandings, seoLandingUrl} from "@/content/seo-landings";
import {
  absolutePath,
  locales,
  pageRoutes,
  site,
  type PageKey
} from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pageRoutes) as PageKey[];

  const mainPages = keys.flatMap((key) =>
    locales.map((locale) => ({
      url: absolutePath(locale, key),
      lastModified: new Date("2026-06-11"),
      changeFrequency: key === "blog" ? ("weekly" as const) : ("monthly" as const),
      priority: key === "home" ? 1 : key === "contact" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, absolutePath(item, key)])
        )
      }
    }))
  );

  const landingPages = seoLandings.map((page) => ({
    url: `${site.url}${seoLandingUrl(page)}`,
    lastModified: new Date("2026-06-12"),
    changeFrequency: "monthly" as const,
    priority: 0.78,
    alternates: {
      languages: {
        [page.locale]: `${site.url}${seoLandingUrl(page)}`
      }
    }
  }));

  const articlePages = blogArticles
    .filter((article) => article.status === "published")
    .map((article) => ({
      url: blogArticleUrl(article),
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.72,
      alternates: {
        languages: {
          [article.locale]: blogArticleUrl(article)
        }
      }
    }));

  const resultPages = customerResults
    .filter(isPublicCustomerResult)
    .map((result) => ({
      url: customerResultUrl(result),
      lastModified: new Date(result.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.68,
      alternates: {
        languages: {
          [result.locale]: customerResultUrl(result)
        }
      }
    }));

  const brandLandingPages = brandPages.map((page) => ({
    url: brandPageUrl(page),
    lastModified: new Date("2026-08-16"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.flatMap((locale) => {
          const localizedPage = brandPageForBrand(locale, page.brand);
          return localizedPage ? [[locale, brandPageUrl(localizedPage)]] : [];
        })
      )
    }
  }));

  return [...mainPages, ...landingPages, ...articlePages, ...resultPages, ...brandLandingPages];
}
