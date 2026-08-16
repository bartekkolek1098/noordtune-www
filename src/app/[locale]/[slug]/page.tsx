import {notFound} from "next/navigation";
import {BrandPageRenderer} from "@/components/brand-page-renderer";
import {PageRenderer} from "@/components/page-renderers";
import {SeoLandingRenderer} from "@/components/seo-landing-renderer";
import {brandPageFromSlug, brandPageStaticParams} from "@/content/brand-pages";
import {seoLandingFromSlug, seoLandingStaticParams} from "@/content/seo-landings";
import {
  defaultLocale,
  isLocale,
  locales,
  pageKeyFromSlug,
  pageRoutes,
  type Locale,
  type PageKey
} from "@/content/site";
import {
  brandPageBreadcrumbJsonLd,
  createBrandPageMetadata,
  createMetadata,
  createSeoLandingMetadata,
  faqItemsJsonLd,
  faqJsonLd,
  JsonLd,
  localBusinessJsonLd
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const keys = Object.keys(pageRoutes).filter((key) => key !== "home") as PageKey[];
  const mainPages = locales.flatMap((locale) =>
    keys.map((key) => ({
      locale,
      slug: pageRoutes[key][locale]
    }))
  );

  return [...mainPages, ...seoLandingStaticParams(), ...brandPageStaticParams()];
}

export async function generateMetadata({params}: PageProps) {
  const {locale, slug} = await params;
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const brandPage = brandPageFromSlug(safeLocale, slug);
  if (brandPage) {
    return createBrandPageMetadata(brandPage);
  }
  const seoLanding = seoLandingFromSlug(safeLocale, slug);
  if (seoLanding) {
    return createSeoLandingMetadata(seoLanding);
  }
  const pageKey = pageKeyFromSlug(safeLocale, slug) ?? "home";
  return createMetadata(safeLocale, pageKey);
}

export default async function LocalizedPage({params}: PageProps) {
  const {locale, slug} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;
  const pageKey = pageKeyFromSlug(safeLocale, slug);
  const seoLanding = seoLandingFromSlug(safeLocale, slug);
  const brandPage = brandPageFromSlug(safeLocale, slug);

  if (!pageKey && !seoLanding && !brandPage) {
    notFound();
  }

  return (
    <>
      <JsonLd data={localBusinessJsonLd(safeLocale)} />
      {brandPage ? <JsonLd data={brandPageBreadcrumbJsonLd(brandPage)} /> : null}
      {brandPage ? <JsonLd data={faqItemsJsonLd(brandPage.faq)} /> : null}
      {seoLanding ? <JsonLd data={faqItemsJsonLd(seoLanding.faqs)} /> : null}
      {pageKey && ["home", "chiptuning", "diagnose", "prijzen", "contact", "appointment"].includes(pageKey) ? (
        <JsonLd data={faqJsonLd(safeLocale)} />
      ) : null}
      {brandPage ? (
        <BrandPageRenderer page={brandPage} />
      ) : seoLanding ? (
        <SeoLandingRenderer page={seoLanding} />
      ) : (
        <PageRenderer locale={safeLocale} pageKey={pageKey as PageKey} />
      )}
    </>
  );
}
