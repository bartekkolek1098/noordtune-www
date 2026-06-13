import {FAQ} from "@/components/faq";
import {FloatingWhatsApp} from "@/components/floating-whatsapp";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {PageHero} from "@/components/page-hero";
import {PowerCatalogSection} from "@/components/power-catalog-section";
import {RichInfoSection} from "@/components/rich-info-section";
import {SectionHeader} from "@/components/section-header";
import {TextSection} from "@/components/text-section";
import type {SeoLanding} from "@/content/seo-landings";
import {pathFor, site, type Locale} from "@/content/site";

const labels = {
  nl: {
    related: "Gerelateerde onderwerpen",
    relatedTitle: "Verder lezen of direct advies vragen",
    relatedText:
      "Deze onderwerpen sluiten aan op je zoekvraag. Gebruik de Power Catalog voor een indicatie of stuur je voertuiggegevens via WhatsApp voor persoonlijk advies.",
    faq: "Veelgestelde vragen",
    finalTitle: "Klaar voor gericht advies?",
    finalText:
      "Stuur je kenteken, motorvariant of storing via WhatsApp. Dan kijken we mee en verwijzen we je naar de juiste catalogusindicatie of vervolgstap."
  },
  en: {
    related: "Related topics",
    relatedTitle: "Read more or ask for advice",
    relatedText: "Use the Power Catalog for an indication or send your vehicle details via WhatsApp.",
    faq: "Frequently asked questions",
    finalTitle: "Ready for advice?",
    finalText: "Send your vehicle details via WhatsApp and we will help with the right next step."
  },
  pl: {
    related: "Powiązane tematy",
    relatedTitle: "Czytaj dalej lub zapytaj",
    relatedText: "Użyj katalogu mocy albo wyślij dane auta przez WhatsApp.",
    faq: "Najczęstsze pytania",
    finalTitle: "Potrzebujesz porady?",
    finalText: "Wyślij dane auta przez WhatsApp, a doradzimy kolejny krok."
  }
} satisfies Record<Locale, {
  related: string;
  relatedTitle: string;
  relatedText: string;
  faq: string;
  finalTitle: string;
  finalText: string;
}>;

export function SeoLandingRenderer({page}: {page: SeoLanding}) {
  const copy = labels[page.locale];
  const languagePaths: Partial<Record<Locale, string>> = {
    [page.locale]: `/${page.locale}/${page.slug}`,
    en: pathFor("en", "home"),
    pl: pathFor("pl", "home"),
    nl: pathFor("nl", "home")
  };
  languagePaths[page.locale] = `/${page.locale}/${page.slug}`;

  const [firstSection, ...restSections] = page.sections;

  return (
    <>
      <Header activeKey={page.parentKey} languagePaths={languagePaths} locale={page.locale} />
      <main>
        <PageHero copy={page.hero} image={page.heroImage} locale={page.locale} pageKey={page.parentKey} />
        {firstSection ? (
          <RichInfoSection
            bullets={firstSection.bullets}
            image={firstSection.image ?? page.heroImage}
            kicker={firstSection.kicker}
            primaryHref={site.catalogUrl}
            primaryLabel="Open Power Catalog"
            secondaryHref={site.whatsappUrl}
            secondaryLabel="WhatsApp ons"
            text={firstSection.text}
            title={firstSection.title}
          />
        ) : null}
        {restSections.map((section, index) => (
          <TextSection block={section} key={section.title} reversed={index % 2 === 1} />
        ))}
        <PowerCatalogSection locale={page.locale} />
        <RichInfoSection
          image="/images/heroes/blog.png"
          kicker={copy.related}
          links={page.related}
          primaryHref={site.catalogUrl}
          primaryLabel="Controleer jouw auto"
          secondaryHref={site.whatsappUrl}
          secondaryLabel="WhatsApp ons"
          text={copy.relatedText}
          title={copy.relatedTitle}
          reversed
        />
        <section className="container py-10 md:py-14">
          <SectionHeader align="center" kicker="FAQ" title={copy.faq} />
          <div className="mx-auto mt-8 max-w-4xl">
            <FAQ items={page.faqs} />
          </div>
        </section>
      </main>
      <Footer locale={page.locale} />
      <FloatingWhatsApp locale={page.locale} />
    </>
  );
}
