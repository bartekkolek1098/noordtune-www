import type {Metadata} from "next";
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

export function JsonLd({data}: {data: unknown}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}
