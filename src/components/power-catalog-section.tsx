import {Car, Database, Euro, Gauge, MessageCircle, Settings} from "lucide-react";
import Image from "next/image";
import {ButtonLink} from "@/components/button";
import {site, type Locale} from "@/content/site";

type PowerCatalogSectionProps = {
  locale: Locale;
  compact?: boolean;
};

const copy = {
  nl: {
    kicker: "NoordTune Power Catalog",
    title: "Controleer direct de tuningmogelijkheden van jouw auto.",
    text:
      "Zoek je Nederlandse kenteken of kies merk, model, jaar en motor. De Power Catalog toont originele voertuiggegevens en beschikbare Stage 1-indicaties met bronvermelding. Een indicatie is geen meting of garantie; de prijs en verdere mogelijkheden bevestigen we na controle van jouw voertuig.",
    bullets: [
      "RDW-gegevens voor Nederlandse voertuigen",
      "Handmatige selectie voor buitenlandse voertuigen",
      "Beschikbare Stage 1-bronwaarden",
      "DSG / TCU tuning",
      "Indicatieve prijs en resultaat",
      "Advies op maat via NoordTune"
    ],
    catalog: "Open Power Catalog",
    whatsapp: "Vraag advies via WhatsApp",
    stats: ["RDW", "Stage 1", "DSG / TCU", "Advies"]
  },
  en: {
    kicker: "NoordTune Power Catalog",
    title: "Check what is possible for your car.",
    text:
      "Search a Dutch plate or select make, model, year and engine. The Power Catalog shows original vehicle data and available source-linked Stage 1 indications, not guaranteed or measured output. We confirm price and further options after checking your vehicle.",
    bullets: [
      "RDW data for Dutch vehicles",
      "Manual selection for international vehicles",
      "Available source-linked Stage 1",
      "DSG / TCU tuning",
      "Indicative price and result",
      "Tailored advice from NoordTune"
    ],
    catalog: "Open Power Catalog",
    whatsapp: "Message us on WhatsApp",
    stats: ["RDW", "Stage 1", "DSG / TCU", "Advice"]
  },
  pl: {
    kicker: "Katalog mocy NoordTune",
    title: "Sprawdź, jakie możliwości ma Twoje auto.",
    text:
      "Wpisz holenderską tablicę lub wybierz markę, model, rok i silnik. Katalog pokazuje dane seryjne i dostępne wskazania Stage 1 ze źródłami, nie pomiar ani gwarancję. Cenę i dalsze możliwości potwierdzamy po sprawdzeniu konkretnego auta.",
    bullets: [
      "Dane RDW dla aut z Holandii",
      "Ręczny wybór auta dla klientów spoza Holandii",
      "Dostępne wskazania Stage 1 ze źródeł",
      "DSG / TCU tuning",
      "Orientacyjna cena i wynik",
      "Indywidualna konsultacja z NoordTune"
    ],
    catalog: "Otwórz katalog mocy",
    whatsapp: "Napisz na WhatsApp",
    stats: ["RDW", "Stage 1", "DSG / TCU", "Konsultacja"]
  }
} satisfies Record<Locale, {
  kicker: string;
  title: string;
  text: string;
  bullets: string[];
  catalog: string;
  whatsapp: string;
  stats: string[];
}>;

const icons = [Database, Car, Gauge, Settings, Euro, MessageCircle];

export function PowerCatalogSection({locale, compact = false}: PowerCatalogSectionProps) {
  const content = copy[locale];

  return (
    <section className="container min-w-0 overflow-x-hidden py-10 md:py-14">
      <div className="panel-edge relative min-w-0 overflow-hidden rounded-[3px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            aria-hidden="true"
            alt=""
            className="block object-cover opacity-65 md:hidden xl:block"
            fill
            sizes="100vw"
            src="/images/sections/power-catalog-visual.svg"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.96)_52%,rgba(5,5,5,.72)_100%)] xl:bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.91)_48%,rgba(5,5,5,.5)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(227,6,19,.24),transparent_15rem)] xl:bg-[radial-gradient(circle_at_78%_18%,rgba(227,6,19,.35),transparent_17rem)]" />
        </div>

        <div className="relative grid min-w-0 gap-8 p-5 sm:p-7 md:p-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:p-9">
          <div className="min-w-0">
            <p className="racing-title text-lg text-primary">{content.kicker}</p>
            <h2 className="racing-title mt-2 max-w-3xl min-w-0 text-[clamp(2rem,6vw,3.75rem)] leading-[0.95] text-white [overflow-wrap:anywhere]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-3xl min-w-0 text-sm leading-7 text-white/72 [overflow-wrap:anywhere] md:text-base">
              {content.text}
            </p>
            <div className="mt-6 flex min-w-0 flex-wrap gap-3">
              <ButtonLink href={site.catalogUrl}>{content.catalog}</ButtonLink>
              <ButtonLink href={site.whatsappUrl} icon="whatsapp" variant="outline">
                {content.whatsapp}
              </ButtonLink>
            </div>
          </div>

          <div className="grid min-w-0 content-start gap-4">
            <div className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
              {content.stats.map((stat) => (
                <div className="min-w-0 overflow-hidden border border-white/10 bg-black/42 p-3 sm:p-4" key={stat}>
                  <p className="racing-title text-[clamp(1rem,3.2vw,1.5rem)] leading-tight text-white [overflow-wrap:anywhere]">
                    {stat}
                  </p>
                  <span className="mt-2 block h-px w-10 max-w-full bg-primary" />
                </div>
              ))}
            </div>
            {!compact ? (
              <ul className="grid min-w-0 gap-2 sm:grid-cols-2">
                {content.bullets.map((item, index) => {
                  const Icon = icons[index] ?? Gauge;
                  return (
                    <li
                      className="flex min-w-0 items-center gap-3 border border-white/10 bg-black/35 px-3 py-2 text-sm text-white/74"
                      key={item}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
