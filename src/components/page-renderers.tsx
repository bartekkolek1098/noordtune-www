import {BlogCard, PricingCard, ResultCardView, ServiceCard} from "@/components/cards";
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
import {
  faqs,
  homeContent,
  pageHeroes,
  pageSections,
  posts,
  pricingPlans,
  processSteps,
  results,
  services,
  whyItems
} from "@/content/copy";
import {heroImages, pathFor, site, type Locale, type PageKey} from "@/content/site";

const ui = {
  nl: {
    faq: "Veelgestelde vragen",
    services: "Onze diensten",
    contactKicker: "Stuur ons een bericht",
    contactTitle: "Contactformulier",
    firstName: "Voornaam",
    lastName: "Achternaam",
    email: "E-mailadres",
    phone: "Telefoonnummer",
    message: "Typ hier je bericht...",
    whatsappFast: "Sneller via WhatsApp",
    contactCards: ["Telefoon / WhatsApp", "E-mail", "Locatie", "Openingstijden"]
  },
  en: {
    faq: "Frequently asked questions",
    services: "Our services",
    contactKicker: "Send us a message",
    contactTitle: "Contact form",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    phone: "Phone number",
    message: "Type your message...",
    whatsappFast: "Faster via WhatsApp",
    contactCards: ["Phone / WhatsApp", "Email", "Location", "Opening hours"]
  },
  pl: {
    faq: "Najczęstsze pytania",
    services: "Nasze usługi",
    contactKicker: "Wyślij wiadomość",
    contactTitle: "Formularz kontaktowy",
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Adres e-mail",
    phone: "Telefon",
    message: "Wpisz wiadomość...",
    whatsappFast: "Szybciej przez WhatsApp",
    contactCards: ["Telefon / WhatsApp", "E-mail", "Lokalizacja", "Godziny otwarcia"]
  }
} satisfies Record<Locale, {
  faq: string;
  services: string;
  contactKicker: string;
  contactTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  whatsappFast: string;
  contactCards: string[];
}>;

export function HomeRenderer({locale}: {locale: Locale}) {
  const home = homeContent[locale];
  const labels = ui[locale];

  return (
    <>
      <Header activeKey="home" locale={locale} />
      <main>
        <Hero
          copy={pageHeroes.home[locale]}
          features={home.features}
          image={heroImages.home}
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
            kicker={locale === "nl" ? "Resultaten" : locale === "en" ? "Results" : "Rezultaty"}
            text={
              locale === "nl"
                ? "Voorbeeldcases met indicatieve resultaten. Definitieve waarden hangen altijd af van jouw exacte voertuig."
                : undefined
            }
            title={
              locale === "nl"
                ? "Populaire Stage 1 voorbeelden"
                : locale === "en"
                  ? "Popular Stage 1 examples"
                  : "Popularne przykłady Stage 1"
            }
          />
          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {results[locale].map((result) => (
              <ResultCardView key={result.car} locale={locale} result={result} />
            ))}
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
      <FloatingWhatsApp locale={locale} reduced={pageKey === "contact"} />
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
          image="/images/sections/dyno-logging.svg"
          kicker={pricingBlock.kicker}
          primaryHref={site.catalogUrl}
          primaryLabel={locale === "nl" ? "Open Power Catalog" : locale === "en" ? "Open Power Catalog" : "Otwórz katalog mocy"}
          secondaryHref={site.whatsappUrl}
          secondaryLabel={locale === "nl" ? "WhatsApp ons" : locale === "en" ? "Message us on WhatsApp" : "Napisz na WhatsApp"}
          stats={[
            {value: "€89", label: locale === "nl" ? "Diagnose vanaf" : locale === "en" ? "Diagnostics from" : "Diagnostyka od"},
            {value: "€649", label: "Stage 1"},
            {value: "€849", label: "Stage 2"},
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
    const resultsBlock = pageSections.resultaten[locale][0];

    return (
      <>
        <RichInfoSection
          bullets={
            locale === "nl"
              ? [
                  "Voorbeelden zijn indicatief per motorvariant",
                  "Onderhoudsstaat en softwareversie tellen mee",
                  "Transmissielimieten worden meegenomen",
                  "Definitief advies volgt na voertuigcheck"
                ]
              : locale === "en"
                ? ["Indicative examples", "Vehicle condition matters", "Final advice follows a check"]
                : ["Przykłady są orientacyjne", "Stan auta ma znaczenie", "Finalna porada po sprawdzeniu auta"]
          }
          image="/images/sections/customer-result.svg"
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
            {value: "4", label: locale === "nl" ? "Voorbeeldcases" : locale === "en" ? "Example cases" : "Przykłady"},
            {value: "Stage 1", label: locale === "nl" ? "Populairste basis" : locale === "en" ? "Popular base" : "Popularna baza"},
            {value: "100%", label: locale === "nl" ? "Voertuigafhankelijk" : locale === "en" ? "Vehicle dependent" : "Zależne od auta"},
            {value: "RDW", label: locale === "nl" ? "Cataloguscheck" : locale === "en" ? "Catalog check" : "Katalog"}
          ]}
          text={resultsBlock.text}
          title={resultsBlock.title}
        />
        <section className="container py-12 md:py-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {results[locale].map((result) => (
              <ResultCardView key={result.car} locale={locale} result={result} />
            ))}
          </div>
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
          image="/images/sections/workshop-lift.svg"
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
          stats={[
            {value: "Assen", label: locale === "nl" ? "Werkplaats" : locale === "en" ? "Workshop" : "Warsztat"},
            {value: "Drenthe", label: locale === "nl" ? "Regio" : locale === "en" ? "Region" : "Region"},
            {value: "Groningen", label: locale === "nl" ? "Servicegebied" : locale === "en" ? "Service area" : "Obszar usług"},
            {value: "WhatsApp", label: locale === "nl" ? "Snelste contact" : locale === "en" ? "Fast contact" : "Szybki kontakt"}
          ]}
          text={contactBlock.text}
          title={contactBlock.title}
        />
        <section className="container grid gap-6 py-12 md:grid-cols-[1fr_1fr] md:py-16" id="contact">
          <div className="panel-edge rounded-[3px] p-6">
            <p className="racing-title text-xl text-primary">{labels.contactKicker}</p>
            <h2 className="racing-title mt-2 text-4xl text-white">{labels.contactTitle}</h2>
            <form className="mt-6 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input aria-label={labels.firstName} className="rounded-[3px] border border-white/12 bg-black/32 px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder={labels.firstName} />
                <input aria-label={labels.lastName} className="rounded-[3px] border border-white/12 bg-black/32 px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder={labels.lastName} />
              </div>
              <input aria-label={labels.email} className="rounded-[3px] border border-white/12 bg-black/32 px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder={labels.email} />
              <input aria-label={labels.phone} className="rounded-[3px] border border-white/12 bg-black/32 px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder={labels.phone} />
              <textarea aria-label={labels.message} className="min-h-36 rounded-[3px] border border-white/12 bg-black/32 px-4 py-3 text-sm text-white outline-none focus:border-primary" placeholder={labels.message} />
              <a
                className="inline-flex min-h-11 items-center justify-center rounded-[3px] border border-primary bg-primary px-5 py-3 text-sm font-black uppercase"
                href={site.whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                {labels.whatsappFast}
              </a>
            </form>
          </div>
          <div className="grid gap-5">
            {[
              [labels.contactCards[0], site.phone],
              [labels.contactCards[1], site.email],
              [labels.contactCards[2], site.address],
              [labels.contactCards[3], site.opening]
            ].map(([title, value]) => (
              <div className="panel-edge rounded-[3px] p-6" key={title}>
                <p className="racing-title text-xl text-white">{title}</p>
                <p className="mt-3 text-lg text-white/78">{value}</p>
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
        {pageSections.appointment[locale].map((block) => (
          <TextSection block={block} key={block.title} />
        ))}
        <PowerCatalogSection locale={locale} />
        <CTASection
          locale={locale}
          text={
            locale === "nl"
              ? "Het volledige afsprakensysteem komt later. Voor nu plannen we sneller en persoonlijker via WhatsApp."
              : locale === "en"
                ? "The full booking system will follow later. For now, WhatsApp is the fastest way to plan."
                : "Pełny system rezerwacji pojawi się później. Na razie najszybszy jest WhatsApp."
          }
          title={
            locale === "nl"
              ? "Plan voorlopig via WhatsApp"
              : locale === "en"
                ? "Plan via WhatsApp for now"
                : "Na razie WhatsApp"
          }
        />
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
