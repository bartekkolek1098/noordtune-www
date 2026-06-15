import type {Metadata} from "next";
import {blogArticleUrl, type BlogArticle} from "@/content/blog-articles";
import {
  customerResultOgImage,
  customerResultUrl,
  isPublicCustomerResult,
  type CustomerResult
} from "@/content/customer-results";
import {faqs, seo, type FaqItem} from "@/content/copy";
import type {SeoLanding} from "@/content/seo-landings";
import {
  absolutePath,
  heroImages,
  locales,
  pathFor,
  site,
  type Locale,
  type PageKey
} from "@/content/site";

export function createMetadata(locale: Locale, pageKey: PageKey): Metadata {
  const copy = seo[pageKey][locale];
  const canonical = absolutePath(locale, pageKey);
  const languages = Object.fromEntries(
    locales.map((item) => [item, absolutePath(item, pageKey)])
  );
  const image = `${site.url}${heroImages[pageKey]}`;

  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: site.name,
      locale,
      alternateLocale: locales.filter((item) => item !== locale),
      type: "website",
      images: [
        {
          url: image,
          width: 1774,
          height: 887,
          alt: `${site.name} ${copy.title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function createSeoLandingMetadata(page: SeoLanding): Metadata {
  const canonical = `${site.url}/${page.locale}/${page.slug}`;
  const image = `${site.url}${page.heroImage}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        [page.locale]: canonical
      }
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      siteName: site.name,
      locale: page.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1774,
          height: 887,
          alt: `${site.name} ${page.seo.title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: [image]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function createBlogArticleMetadata(article: BlogArticle): Metadata {
  const canonical = blogArticleUrl(article);
  const image = `${site.url}${article.heroImage}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        [article.locale]: canonical
      }
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonical,
      siteName: site.name,
      locale: article.locale,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category,
      images: [
        {
          url: image,
          width: 1774,
          height: 887,
          alt: `${site.name} ${article.title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: [image]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function createCustomerResultMetadata(result: CustomerResult): Metadata {
  const canonical = customerResultUrl(result);
  const image = `${site.url}${customerResultOgImage(result)}`;
  const car = `${result.vehicleMake} ${result.vehicleModel}`;
  const hp = result.locale === "pl" ? "KM" : result.locale === "nl" ? "pk" : "hp";
  const title =
    result.metaTitle ??
    (result.locale === "nl"
      ? `${car} ${result.stage} | NoordTune klantresultaat`
      : result.locale === "en"
        ? `${car} ${result.stage} | NoordTune customer result`
        : `${car} ${result.stage} | Realizacja NoordTune`);
  const description =
    result.metaDescription ??
    (result.locale === "nl"
      ? `${car} ${result.vehicleEngine}: ${result.stockPowerHp} ${hp} naar ${result.tunedPowerHp} ${hp} en ${result.stockTorqueNm} Nm naar ${result.tunedTorqueNm} Nm. Resultaten blijven voertuigafhankelijk.`
      : result.locale === "en"
        ? `${car} ${result.vehicleEngine}: ${result.stockPowerHp} ${hp} to ${result.tunedPowerHp} ${hp} and ${result.stockTorqueNm} Nm to ${result.tunedTorqueNm} Nm. Results remain vehicle-specific.`
        : `${car} ${result.vehicleEngine}: ${result.stockPowerHp} ${hp} do ${result.tunedPowerHp} ${hp} oraz ${result.stockTorqueNm} Nm do ${result.tunedTorqueNm} Nm. Wynik zależy od konkretnego auta.`);
  const publicPage = isPublicCustomerResult(result);

  return {
    title,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: {
        [result.locale]: canonical
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: result.locale,
      type: "article",
      publishedTime: result.publishedAt,
      modifiedTime: result.updatedAt,
      section: "Customer results",
      images: [
        {
          url: image,
          width: 1774,
          height: 887,
          alt: result.imageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: {
      index: publicPage,
      follow: publicPage
    }
  };
}

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${site.url}${pathFor(locale, "home")}#business`,
    name: site.name,
    image: `${site.url}/brand/noordtune-logo.png`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "A. Vogelstraat 1",
      postalCode: "9406 XD",
      addressLocality: "Assen",
      addressRegion: "Drenthe",
      addressCountry: "NL"
    },
    areaServed: [
      "Assen",
      "Drenthe",
      "Groningen",
      "Noord-Nederland"
    ],
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00"
      }
    ],
    makesOffer: [
      "Chiptuning",
      "ECU remap",
      "Auto diagnose",
      "Loganalyse",
      "DSG tuning",
      "TCU tuning"
    ],
    sameAs: [site.catalogUrl]
  };
}

export function faqJsonLd(locale: Locale) {
  return faqItemsJsonLd(faqs[locale]);
}

export function faqItemsJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleJsonLd(article: BlogArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: `${site.url}${article.heroImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/noordtune-logo.png`
      }
    },
    mainEntityOfPage: blogArticleUrl(article)
  };
}

export function customerResultJsonLd(result: CustomerResult) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: result.title ?? `${result.vehicleMake} ${result.vehicleModel} ${result.stage}`,
    description: result.shortDescription,
    image: result.images.map((image) => `${site.url}${image}`),
    datePublished: result.publishedAt,
    dateModified: result.updatedAt,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/noordtune-logo.png`
      }
    },
    about: {
      "@type": "Vehicle",
      name: `${result.vehicleMake} ${result.vehicleModel} ${result.vehicleEngine}`,
      vehicleModelDate: result.vehicleYear
    },
    mainEntityOfPage: customerResultUrl(result)
  };
}

export function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}
