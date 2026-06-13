import {notFound} from "next/navigation";
import {HomeRenderer} from "@/components/page-renderers";
import {defaultLocale, isLocale, locales, type Locale} from "@/content/site";
import {createMetadata, faqJsonLd, JsonLd, localBusinessJsonLd} from "@/lib/seo";

type PageProps = {
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: PageProps) {
  const {locale} = await params;
  return createMetadata(isLocale(locale) ? locale : defaultLocale, "home");
}

export default async function LocaleHomePage({params}: PageProps) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const safeLocale = locale as Locale;

  return (
    <>
      <JsonLd data={localBusinessJsonLd(safeLocale)} />
      <JsonLd data={faqJsonLd(safeLocale)} />
      <HomeRenderer locale={safeLocale} />
    </>
  );
}
