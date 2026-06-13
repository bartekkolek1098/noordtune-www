import type {MetadataRoute} from "next";
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

  return [...mainPages, ...landingPages];
}
