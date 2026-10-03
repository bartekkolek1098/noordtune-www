import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {BlogCard, PricingCard, ResultCardView, ServiceCard} from "@/components/cards";
import {ButtonLink} from "@/components/button";
import {CTASection} from "@/components/cta-section";
import {FAQ} from "@/components/faq";
import {FeatureGrid} from "@/components/feature-grid";
import {FloatingWhatsApp} from "@/components/floating-whatsapp";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {Hero} from "@/components/hero";
import {PageHero} from "@/components/page-hero";
import {PowerCatalogSection} from "@/components/power-catalog-section";
import {ProcessSteps} from "@/components/process-steps";
import {RichInfoSection} from "@/components/rich-info-section";
import {SectionHeader} from "@/components/section-header";
import {TextGrid, TextSection} from "@/components/text-section";
import {WhatsAppEnquiry} from "@/components/whatsapp-enquiry";
import {
  faqs,
  homeContent,
  pageHeroes,
  pageSections,
  posts,
  pricingPlans,
  processSteps,
  services,
  whyItems
} from "@/content/copy";
import {brandNavigationLinks} from "@/content/brand-pages";
import {
  blogArticleForTranslationKey,
  blogArticlePath,
  latestBlogArticles
} from "@/content/blog-articles";
import {
  customerResultPath,
  displayCustomerResults,
  featuredCustomerResults
} from "@/content/customer-results";
import {heroImages, pathFor, site, type Locale, type PageKey} from "@/content/site";

const ui = {
  nl: {
    faq: "Veelgestelde vragen",
    services: "Onze diensten",
    contactCards: ["Telefoon / WhatsApp", "E-mail", "Locatie", "Openingstijden"]
  },
  en: {
    faq: "Frequently asked questions",
    services: "Our services",
    contactCards: ["Phone / WhatsApp", "Email", "Location", "Opening hours"]
  },
  pl: {
    faq: "Najczęstsze pytania",
    services: "Nasze usługi",
    contactCards: ["Telefon / WhatsApp", "E-mail", "Lokalizacja", "Godziny otwarcia"]
  }
} satisfies Record<Locale, {
  faq: string;
  services: string;
  contactCards: string[];
}>;

const brandSectionCopy = {
  nl: {
    kicker: "Per merk",
    title: "Verdiep je in chiptuning voor jouw merk.",
    text: "Bekijk onze aanpak, aandachtspunten en echte klantresultaten voor vijf veelvoorkomende merken. De exacte uitvoering en technische staat blijven altijd bepalend."
  },
  en: {
    kicker: "By brand",
    title: "Explore chiptuning for your vehicle brand.",
    text: "See our approach, technical considerations and real customer results for five common brands. The exact version and vehicle condition always remain decisive."
  },
  pl: {
    kicker: "Według marki",
    title: "Sprawdź podejście do chiptuningu Twojej marki.",
    text: "Poznaj sposób pracy, ważne kwestie techniczne i prawdziwe realizacje dla pięciu popularnych marek. Ostateczna ocena zawsze zależy od wersji i stanu auta."
  }
} satisfies Record<Locale, {kicker: string; title: string; text: string}>;

function BrandNavigationSection({locale}: {locale: Locale}) {
  const copy = brandSectionCopy[locale];
  const links = brandNavigationLinks(locale);

  return (
    <section className="border-y border-white/8 bg-white/[0.025]">
      <div className="container min-w-0 py-12 md:py-16">
        <SectionHeader align="left" kicker={copy.kicker} text={copy.text} title={copy.title} />
        <nav aria-label={copy.title} className="mt-7 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link) => (
            <Link
              className="group flex min-w-0 items-center justify-between gap-3 border border-white/12 bg-black/35 px-4 py-4 text-sm font-black uppercase text-white transition hover:border-primary hover:bg-primary/10"
              href={link.href}
              key={link.href}
            >
              <span className="[overflow-wrap:anywhere]">{link.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

const resultsIntro = {
  nl: {
    kicker: "Klantresultaten",
    title: "Het volledige portfolio van NoordTune klantprojecten.",
    text:
      "Bekijk alle gepubliceerde NoordTune projecten met voertuigspecifieke context. Resultaten hangen af van onderhoudsstaat, softwareversie, brandstof, ECU/TCU, transmissie, hardware en gebruik. Controleer jouw auto in de Power Catalog voor een persoonlijke indicatie."
  },
  en: {
    kicker: "Customer results",
    title: "The complete portfolio of published NoordTune projects.",
    text:
      "Explore all published NoordTune projects with vehicle-specific context. Results vary with vehicle condition, software version, fuel, ECU/TCU, transmission, hardware and use. Use the Power Catalog for a tailored indication."
  },
  pl: {
    kicker: "Realizacje klientów",
    title: "Pełne portfolio opublikowanych realizacji NoordTune.",
    text:
      "Zobacz wszystkie opublikowane realizacje NoordTune z opisem konkretnego auta. Wyniki zależą od stanu samochodu, wersji oprogramowania, paliwa, skrzyni biegów, ECU/TCU, osprzętu i sposobu użytkowania. W katalogu mocy sprawdzisz orientacyjne możliwości swojego auta."
  }
} satisfies Record<Locale, {kicker: string; title: string; text: string}>;

const resultsFutureNote = {
  nl: "Meer klantresultaten worden binnenkort toegevoegd.",
  en: "More customer results will be added soon.",
  pl: "Kolejne realizacje klientów zostaną dodane wkrótce."
} satisfies Record<Locale, string>;

const homeResultsCopy = {
  nl: {
    kicker: "Actueel portfolio",
    title: "Recente klantprojecten",
    text: "Een selectie van recent toegevoegde NoordTune klantprojecten.",
    cta: "Bekijk alle klantresultaten"
  },
  en: {
    kicker: "Current portfolio",
    title: "Recent customer projects",
    text: "A selection of recently added NoordTune customer projects.",
    cta: "View all customer results"
  },
  pl: {
    kicker: "Aktualne portfolio",
    title: "Najnowsze realizacje klientów",
    text: "Wybrane, ostatnio dodane realizacje NoordTune.",
    cta: "Zobacz wszystkie realizacje"
  }
} satisfies Record<Locale, {kicker: string; title: string; text: string; cta: string}>;

const homeLatestCopy = {
  nl: {
    kicker: "Nieuw bij NoordTune",
    title: "Praktische kennis, uitleg en recente updates.",
    cta: "Bekijk alle artikelen"
  },
  en: {
    kicker: "Latest from NoordTune",
    title: "Practical knowledge, explanations and recent updates.",
    cta: "View all articles"
  },
  pl: {
    kicker: "Nowości w NoordTune",
    title: "Praktyczna wiedza, poradniki i najnowsze aktualizacje.",
    cta: "Zobacz wszystkie artykuły"
  }
} satisfies Record<Locale, {kicker: string; title: string; cta: string}>;

const chiptuningProofCopy = {
  nl: {
    kicker: "Bewijs en uitleg",
    title: "Bekijk echte resultaten en verdiep je in de techniek.",
    results: "Recente klantprojecten",
    guides: "Gerelateerde artikelen",
    appointment: "Vraag een afspraak aan"
  },
  en: {
    kicker: "Proof and guidance",
    title: "See real results and learn about the technical choices.",
    results: "Recent customer projects",
    guides: "Related articles",
    appointment: "Request an appointment"
  },
  pl: {
    kicker: "Realizacje i wiedza",
    title: "Zobacz prawdziwe wyniki i poznaj techniczne podstawy.",
    results: "Najnowsze realizacje klientów",
    guides: "Powiązane artykuły",
    appointment: "Zapytaj o termin"
  }
} satisfies Record<Locale, {kicker: string; title: string; results: string; guides: string; appointment: string}>;

function ChiptuningProofSection({locale}: {locale: Locale}) {
  const copy = chiptuningProofCopy[locale];
  const results = featuredCustomerResults(locale);
  const guides = (["what-is-chiptuning", "chiptuning-cost"] as const)
    .map((key) => blogArticleForTranslationKey(key, locale))
    .filter((article) => article !== undefined);

  return (
    <section className="border-y border-white/8 bg-white/[0.025]">
      <div className="container py-10 md:py-14">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeader align="left" kicker={copy.kicker} title={copy.title} />
          <ButtonLink href={pathFor(locale, "appointment")} variant="outline">{copy.appointment}</ButtonLink>
        </div>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <nav aria-label={copy.results} className="panel-edge rounded-[3px] p-5">
            <h3 className="racing-title text-2xl text-white">{copy.results}</h3>
            <div className="mt-4 grid gap-2">
              {results.map((result) => (
                <Link className="group flex items-center justify-between gap-4 border-t border-white/10 py-3 text-sm text-white/78 first:border-t-0 hover:text-white" href={customerResultPath(result)} key={result.id}>
                  <span>{result.vehicleMake} {result.vehicleModel} · {result.stage}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </nav>
          <nav aria-label={copy.guides} className="panel-edge rounded-[3px] p-5">
            <h3 className="racing-title text-2xl text-white">{copy.guides}</h3>
            <div className="mt-4 grid gap-2">
              {guides.map((article) => (
                <Link className="group flex items-center justify-between gap-4 border-t border-white/10 py-3 text-sm text-white/78 first:border-t-0 hover:text-white" href={blogArticlePath(article.locale, article.slug)} key={article.slug}>
                  <span>{article.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}

const archiveCategoryLabels = {
  nl: ["Alle resultaten", "ECU remap", "TCU tuning", "ECU cloning", "Stage 1", "Stage 2+"],
  en: ["All results", "ECU remap", "TCU tuning", "ECU cloning", "Stage 1", "Stage 2+"],
  pl: ["Wszystkie realizacje", "Remap ECU", "Tuning TCU", "Klonowanie ECU", "Stage 1", "Stage 2+"]
} satisfies Record<Locale, string[]>;

const archiveCountLabel = {
  nl: "gepubliceerde klantresultaten",
  en: "published customer results",
  pl: "opublikowanych realizacji klientów"
} satisfies Record<Locale, string>;

export function HomeRenderer({locale}: {locale: Locale}) {
  const home = homeContent[locale];
  const labels = ui[locale];
  const featuredResults = featuredCustomerResults(locale);
  const resultsCopy = homeResultsCopy[locale];
  const latestCopy = homeLatestCopy[locale];
  const latestArticles = latestBlogArticles(locale);

  return (
    <>
      <Header activeKey="home" locale={locale} />
      <main>
        <Hero
          copy={pageHeroes.home[locale]}
          features={home.features}
          image={heroImages.home}
          secondaryHref={pathFor(locale, "appointment")}
          trust={home.trust}
        />
        <TextSection block={home.intro} />
        <PowerCatalogSection locale={locale} />

        <section className="container py-12 md:py-16">
          <SectionHeader
            align="center"
            kicker={locale === "nl" ? "Onze diensten" : locale === "en" ? "Services" : "Usługi"}
            title={
              locale === "nl"
                ? "Prestaties, diagnose en controle onder een dak"
                : locale === "en"
                  ? "Performance, diagnostics and control in one place"
                  : "Osiągi, diagnostyka i kontrola w jednym miejscu"
            }
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services[locale].slice(0, 6).map((service) => (
              <ServiceCard key={service.title} locale={locale} service={service} />
            ))}
          </div>
        </section>

        {home.highlights.map((block, index) => (
          <TextSection block={block} key={block.title} reversed={index % 2 === 1} />
        ))}

        <section className="container py-12 md:py-16">
          <SectionHeader
            align="center"
            kicker={locale === "nl" ? "Hoe wij werken" : locale === "en" ? "Process" : "Proces"}
            title={
              locale === "nl"
                ? "Van intake naar betrouwbare prestatie"
                : locale === "en"
                  ? "From intake to reliable performance"
                  : "Od rozmowy do pewnych osiągów"
            }
          />
          <div className="mt-9">
            <ProcessSteps steps={processSteps[locale]} />
          </div>
        </section>

        <FeatureGrid
          items={whyItems[locale]}
          kicker={locale === "nl" ? "Waarom kiezen voor" : locale === "en" ? "Why choose" : "Dlaczego"}
          title={
            locale === "nl"
              ? "NoordTune.nl?"
              : locale === "en"
                ? "NoordTune.nl?"
                : "NoordTune.nl?"
          }
        />

        <section className="container py-12 md:py-16">
          <SectionHeader
            align="center"
            kicker={resultsCopy.kicker}
            text={resultsCopy.text}
            title={resultsCopy.title}
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredResults.map((result) => (
              <ResultCardView key={result.id} locale={locale} result={result} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ButtonLink href={pathFor(locale, "resultaten")} variant="outline">
              {resultsCopy.cta}
            </ButtonLink>
          </div>
          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="racing-title text-lg text-primary">{latestCopy.kicker}</p>
                <h2 className="racing-title mt-2 text-3xl text-white md:text-4xl">{latestCopy.title}</h2>
              </div>
              <ButtonLink href={pathFor(locale, "blog")} variant="outline">{latestCopy.cta}</ButtonLink>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {latestArticles.map((article) => (
                <Link className="group flex min-w-0 items-center justify-between gap-4 border border-white/10 bg-black/35 p-4 transition hover:border-primary/60" href={blogArticlePath(article.locale, article.slug)} key={article.slug}>
                  <span className="min-w-0">
                    <span className="block text-xs font-black uppercase text-primary">{article.category} · {article.readTime}</span>
                    <span className="racing-title mt-1 block text-xl text-white [overflow-wrap:anywhere]">{article.title}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-primary transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <SectionHeader align="center" kicker="FAQ" title={labels.faq} />
          <div className="mx-auto mt-8 max-w-4xl">
            <FAQ items={faqs[locale]} />
          </div>
        </section>

        <CTASection locale={locale} text={home.finalText} title={home.finalTitle} />
      </main>
      <Footer locale={locale} />
      <FloatingWhatsApp locale={locale} />
    </>
  );
}

export function PageRenderer({locale, pageKey}: {locale: Locale; pageKey: PageKey}) {
  if (pageKey === "home") {
    return <HomeRenderer locale={locale} />;
  }

  return (
    <>
      <Header activeKey={pageKey} locale={locale} />
      <main>
        <PageHero copy={pageHeroes[pageKey][locale]} image={heroImages[pageKey]} locale={locale} pageKey={pageKey} />
        <PageBody locale={locale} pageKey={pageKey} />
      </main>
      <Footer locale={locale} />
      {pageKey !== "contact" && pageKey !== "appointment" ? <FloatingWhatsApp locale={locale} /> : null}
    </>
  );
}

function PageBody({locale, pageKey}: {locale: Locale; pageKey: PageKey}) {
  const labels = ui[locale];

  if (pageKey === "diensten") {
    return (
      <>
        <section className="container py-12 md:py-16">
          <SectionHeader
            align="center"
            kicker={pageHeroes.diensten[locale].eyebrow}
            text={pageHeroes.diensten[locale].intro}
            title={labels.services}
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services[locale].map((service) => (
              <ServiceCard key={service.title} locale={locale} service={service} />
            ))}
          </div>
        </section>
        <PowerCatalogSection locale={locale} />
        <section className="container py-12 md:py-16">
          <SectionHeader
            align="center"
            kicker={locale === "nl" ? "Hoe wij werken" : locale === "en" ? "Process" : "Proces"}
            title={
              locale === "nl"
                ? "Duidelijk, meetbaar en persoonlijk"
                : locale === "en"
                  ? "Clear, measured and personal"
                  : "Przejrzyście, technicznie i osobiście"
            }
          />
          <div className="mt-9">
            <ProcessSteps steps={processSteps[locale]} />
          </div>
        </section>
        <FeatureGrid
          items={whyItems[locale]}
          kicker={locale === "nl" ? "Waarom NoordTune.nl" : locale === "en" ? "Why NoordTune.nl" : "Dlaczego NoordTune.nl"}
          title={
            locale === "nl"
              ? "Kwaliteit die je voelt"
              : locale === "en"
                ? "Quality you can feel"
                : "Jakość, którą czuć podczas jazdy"
          }
        />
        <CTASection locale={locale} text={homeContent[locale].finalText} title={homeContent[locale].finalTitle} />
      </>
    );
  }

  if (pageKey === "prijzen") {
    const pricingBlock = pageSections.prijzen[locale][0];

    return (
      <>
        <section className="container py-12 md:py-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pricingPlans[locale].map((plan) => (
              <PricingCard key={plan.name} locale={locale} plan={plan} />
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-white/55">
            {locale === "nl"
              ? "Prijzen zijn incl. btw. De vanaf-prijzen zijn indicatief en kunnen varieren afhankelijk van merk, model, ECU type, motorvariant, softwareversie, leesmethode en technische staat."
              : locale === "en"
                ? "Prices include VAT. Starting prices are indicative and depend on vehicle, ECU, software version, access method and condition."
              : "Ceny zawierają VAT. Kwoty od są orientacyjne i zależą od auta, ECU, metody odczytu, wersji oprogramowania oraz stanu technicznego."}
          </p>
        </section>
        <RichInfoSection
          bullets={
            locale === "nl"
              ? [
                  "ECU type en leesmethode bepalen de technische route",
                  "Stage 2 en DSG / TCU vragen vaak extra controle",
                  "Loganalyse voorkomt verkeerde aannames",
                  "Je krijgt vooraf duidelijk advies over de beste stap"
                ]
              : locale === "en"
                ? ["ECU access matters", "Extra checks can be needed", "Clear advice before work"]
                : ["Dostęp do ECU ma znaczenie", "Czasem potrzebna jest dodatkowa kontrola", "Najpierw jasna porada"]
          }
          image="/images/sections/tuning-laptop-b2.webp"
          kicker={pricingBlock.kicker}
          primaryHref={site.catalogUrl}
          primaryLabel={locale === "nl" ? "Open Power Catalog" : locale === "en" ? "Open Power Catalog" : "Otwórz katalog mocy"}
          secondaryHref={site.whatsappUrl}
          secondaryLabel={locale === "nl" ? "WhatsApp ons" : locale === "en" ? "Message us on WhatsApp" : "Napisz na WhatsApp"}
          stats={[
            {value: "€89", label: locale === "nl" ? "Diagnose vanaf" : locale === "en" ? "Diagnostics from" : "Diagnostyka od"},
            {value: "€150", label: "Stage 1"},
            {value: "€250", label: "Stage 2"},
            {value: "€149", label: locale === "nl" ? "Loganalyse" : locale === "en" ? "Log analysis" : "Analiza logów"}
          ]}
          text={pricingBlock.text}
          title={pricingBlock.title}
        />
        <PowerCatalogSection compact locale={locale} />
        <section className="container py-12 md:py-16">
          <SectionHeader align="center" kicker="FAQ" title={labels.faq} />
          <div className="mx-auto mt-8 max-w-4xl">
            <FAQ items={faqs[locale].slice(0, 4)} />
          </div>
        </section>
        <CTASection locale={locale} text={homeContent[locale].finalText} title={homeContent[locale].finalTitle} />
      </>
    );
  }

  if (pageKey === "resultaten") {
    const resultsBlock = resultsIntro[locale];
    const publishedResults = displayCustomerResults(locale);

    return (
      <>
        <RichInfoSection
          bullets={
            locale === "nl"
              ? [
                  "Alle gepubliceerde klantresultaten",
                  "Resultaten hangen af van onderhoud, ECU/TCU en softwareversie",
                  "Brandstof, hardware en transmissielimieten tellen mee",
                  "Gebruik de Power Catalog voor een voertuigspecifieke indicatie"
                ]
              : locale === "en"
                ? [
                    "All published customer results",
                    "Vehicle condition, ECU, TCU and software version matter",
                    "Fuel, hardware and gearbox limits influence the result",
                    "Use the Power Catalog for a vehicle-specific indication"
                  ]
                : [
                    "Wszystkie opublikowane realizacje klientów",
                    "Stan auta, ECU, TCU i wersja oprogramowania mają znaczenie",
                    "Paliwo, osprzęt i limity skrzyni wpływają na wynik",
                    "Użyj katalogu mocy, aby sprawdzić konkretne auto"
                  ]
          }
          image="/images/sections/be-racing-turbo.webp"
          kicker={resultsBlock.kicker}
          links={[
            {label: "Stage 1 tuning", href: locale === "nl" ? "/nl/stage-1-tuning" : pathFor(locale, "chiptuning")},
            {label: "Stage 2 tuning", href: locale === "nl" ? "/nl/stage-2-tuning" : pathFor(locale, "chiptuning")},
            {label: locale === "pl" ? "Chiptuning" : locale === "en" ? "Chiptuning" : "Chiptuning Assen", href: locale === "nl" ? "/nl/chiptuning-assen" : pathFor(locale, "chiptuning")},
            {label: locale === "nl" ? "Prijzen bekijken" : locale === "en" ? "Pricing" : "Cennik", href: pathFor(locale, "prijzen")}
          ]}
          primaryHref={site.catalogUrl}
          primaryLabel={locale === "pl" ? "Otwórz katalog mocy" : "Open Power Catalog"}
          secondaryHref={site.whatsappUrl}
          secondaryLabel={locale === "nl" ? "WhatsApp ons" : locale === "en" ? "Message us on WhatsApp" : "Napisz na WhatsApp"}
          stats={[
            {value: String(publishedResults.length), label: locale === "nl" ? "Gepubliceerde cases" : locale === "en" ? "Published cases" : "Opublikowane realizacje"},
            {value: "ECU / TCU", label: locale === "nl" ? "Software en transmissie" : locale === "en" ? "Engine and transmission" : "Silnik i skrzynia"},
            {value: "100%", label: locale === "nl" ? "Voertuigafhankelijk" : locale === "en" ? "Vehicle dependent" : "Zależne od auta"},
            {value: "RDW", label: locale === "nl" ? "Cataloguscheck" : locale === "en" ? "Catalog check" : "Katalog"}
          ]}
          text={resultsBlock.text}
          title={resultsBlock.title}
        />
        <section className="container py-12 md:py-16">
          <div className="mb-7 border-y border-white/10 py-4">
            <p className="text-sm font-black uppercase text-white">
              <span className="text-primary">{publishedResults.length}</span> {archiveCountLabel[locale]}
            </p>
            <div
              aria-label={locale === "nl" ? "Resultaatcategorieën" : locale === "en" ? "Result categories" : "Kategorie realizacji"}
              className="mt-3 flex min-w-0 flex-wrap gap-2"
            >
              {archiveCategoryLabels[locale].map((label, index) => (
                <span
                  className={`max-w-full rounded-[3px] border px-3 py-1.5 text-xs font-black uppercase [overflow-wrap:anywhere] ${
                    index === 0
                      ? "border-primary/55 bg-primary/12 text-white"
                      : "border-white/12 bg-black/25 text-white/55"
                  }`}
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {publishedResults.map((result) => (
              <ResultCardView key={result.id} locale={locale} result={result} showTags />
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
            {resultsFutureNote[locale]}
          </p>
        </section>
        <PowerCatalogSection compact locale={locale} />
        <CTASection locale={locale} text={homeContent[locale].finalText} title={homeContent[locale].finalTitle} />
      </>
    );
  }

  if (pageKey === "blog") {
    return (
      <>
        <TextGrid blocks={pageSections.blog[locale]} />
        <section className="container py-12 md:py-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {posts[locale].map((post) => (
              <BlogCard key={post.title} locale={locale} post={post} />
            ))}
          </div>
        </section>
        <CTASection locale={locale} text={homeContent[locale].finalText} title={homeContent[locale].finalTitle} />
      </>
    );
  }

  if (pageKey === "contact") {
    const contactBlock = pageSections.contact[locale][0];

    return (
      <>
        <RichInfoSection
          bullets={contactBlock.bullets}
          image="/images/sections/tuning-laptop-b2.webp"
          kicker={contactBlock.kicker}
          links={[
            {label: locale === "nl" ? "Chiptuning Assen" : "Chiptuning", href: locale === "nl" ? "/nl/chiptuning-assen" : pathFor(locale, "chiptuning")},
            {label: locale === "nl" ? "Auto diagnose Assen" : locale === "en" ? "Car diagnostics" : "Diagnostyka samochodowa", href: locale === "nl" ? "/nl/auto-diagnose-assen" : pathFor(locale, "diagnose")},
            {label: locale === "nl" ? "Prijzen & pakketten" : locale === "en" ? "Pricing" : "Cennik", href: pathFor(locale, "prijzen")},
            {label: locale === "nl" ? "Afspraak" : locale === "en" ? "Appointment" : "Termin", href: pathFor(locale, "appointment")}
          ]}
          primaryHref={site.whatsappUrl}
          primaryLabel={locale === "nl" ? "WhatsApp ons" : locale === "en" ? "Message us on WhatsApp" : "Napisz na WhatsApp"}
          secondaryHref={site.catalogUrl}
          secondaryLabel={locale === "nl" ? "Open Power Catalog" : locale === "en" ? "Open Power Catalog" : "Otwórz katalog mocy"}
          statValueClassName="text-base [overflow-wrap:anywhere] sm:text-3xl"
          stats={[
            {value: "Assen", label: locale === "nl" ? "Werkplaats" : locale === "en" ? "Workshop" : "Warsztat"},
            {value: "Drenthe", label: locale === "nl" ? "Regio" : locale === "en" ? "Region" : "Region"},
            {value: "Groningen", label: locale === "nl" ? "Servicegebied" : locale === "en" ? "Service area" : "Obszar usług"},
            {value: "WhatsApp", label: locale === "nl" ? "Snelste contact" : locale === "en" ? "Fast contact" : "Szybki kontakt"}
          ]}
          text={contactBlock.text}
          title={contactBlock.title}
        />
        <section className="container grid scroll-mt-28 items-start gap-6 py-12 md:py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]" id="contact">
          <WhatsAppEnquiry kind="contact" locale={locale} />
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {[
              [labels.contactCards[0], site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
              [labels.contactCards[1], site.email, `mailto:${site.email}`],
              [labels.contactCards[2], site.address, undefined],
              [labels.contactCards[3], site.opening, undefined]
            ].map(([title, value, href], index) => (
              <div className="panel-edge min-w-0 rounded-[3px] p-6" key={title}>
                <p className="racing-title text-xl text-white">{title}</p>
                <p className="mt-3 break-words text-lg text-white/78">
                  {href ? <a className="inline-block min-h-11 py-2 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={href}>{value}</a> : value}
                </p>
                {index === 0 ? <a className="inline-block min-h-11 py-2 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={site.whatsappUrl} rel="noreferrer" target="_blank">WhatsApp</a> : null}
              </div>
            ))}
          </div>
        </section>
        <PowerCatalogSection compact locale={locale} />
        <section className="container py-12 md:py-16">
          <SectionHeader align="center" kicker="FAQ" title={labels.faq} />
          <div className="mx-auto mt-8 max-w-4xl">
            <FAQ items={faqs[locale]} />
          </div>
        </section>
        <CTASection locale={locale} />
      </>
    );
  }

  if (pageKey === "appointment") {
    return (
      <>
        <section className="container grid scroll-mt-28 items-start gap-6 py-12 md:py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]" id="enquiry">
          <WhatsAppEnquiry kind="appointment" locale={locale} />
          {pageSections.appointment[locale].map((block) => (
            <aside className="panel-edge min-w-0 rounded-[3px] p-6" key={block.title}>
              <h2 className="racing-title text-2xl text-white">{block.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/75">{block.text}</p>
              <ol className="mt-5 list-decimal space-y-4 pl-5 text-sm leading-7 text-white/85">
                {block.bullets?.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </aside>
          ))}
        </section>
        <PowerCatalogSection locale={locale} />
      </>
    );
  }

  if (pageKey === "privacy" || pageKey === "terms") {
    return <TextGrid blocks={pageSections[pageKey][locale]} />;
  }

  return (
    <>
      {pageSections[pageKey][locale].map((block, index) => (
        <TextSection block={block} key={block.title} reversed={index % 2 === 1} />
      ))}
      {pageKey === "chiptuning" ? <ChiptuningProofSection locale={locale} /> : null}
      {pageKey === "chiptuning" ? <BrandNavigationSection locale={locale} /> : null}
      {pageKey === "chiptuning" ? <PowerCatalogSection locale={locale} /> : null}
      <section className="container py-12 md:py-16">
        <SectionHeader
          align="center"
          kicker={locale === "nl" ? "Hoe wij werken" : locale === "en" ? "Process" : "Proces"}
          title={
            locale === "nl"
              ? "Zorgvuldige stappen, helder resultaat"
              : locale === "en"
                ? "Careful steps, clear result"
                : "Uważne kroki, jasny rezultat"
          }
        />
        <div className="mt-9">
          <ProcessSteps steps={processSteps[locale]} />
        </div>
      </section>
      <section className="container py-12 md:py-16">
        <SectionHeader align="center" kicker="FAQ" title={labels.faq} />
        <div className="mx-auto mt-8 max-w-4xl">
          <FAQ items={faqs[locale]} />
        </div>
      </section>
      <CTASection locale={locale} text={homeContent[locale].finalText} title={homeContent[locale].finalTitle} />
    </>
  );
}
