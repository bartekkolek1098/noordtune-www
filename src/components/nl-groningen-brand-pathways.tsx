import {ArrowUpRight, CalendarDays, MessageCircle} from "lucide-react";
import {TrackedLink} from "@/components/tracked-link";
import {site} from "@/content/site";
import type {ConversionEvent} from "@/lib/analytics";

type RegionBrandChoice = Readonly<{
  name: string;
  title: string;
  explanation: string;
  brandSlug: string;
  brandHref: string;
  resourceLabel: string;
  resourceHref: string;
  resourceAnalytics: ConversionEvent;
}>;

/**
 * Existing brands, reviewed sources and one real workshop, not a set of
 * invented Groningen service locations or duplicated city landing pages.
 */
const choices: ReadonlyArray<RegionBrandChoice> = [
  {
    name: "BMW",
    title: "BMW tuning vanuit Groningen",
    explanation:
      "Een BMW 320d met B47-motor is niet dezelfde uitvoering als een oudere N47. Motorcode, ECU-software, onderhoud en transmissie bepalen welke Stage 1-indicatie bij de auto hoort. De BMW X3-klantcase op onze merkpagina gaat over een andere uitvoering, niet over alle 320d's.",
    brandSlug: "bmw-chiptuning",
    brandHref: "/nl/bmw-chiptuning",
    resourceLabel: "Controleer BMW 320d B47",
    resourceHref: "https://power.noordtune.nl/nl/vehicles/bmw-320d-b47",
    resourceAnalytics: {name: "power_catalog_click", properties: {locale: "nl", source: "groningen_brand_guide"}}
  },
  {
    name: "Audi",
    title: "Audi tuning vanuit Groningen",
    explanation:
      "Bij Audi maakt de motor- en hardwareconfiguratie het verschil. Onze echte Audi A4 B7 2.0 TDI Stage 2+-case gebruikte een hybride turbo en downpipe. De gepubliceerde uitkomst hoort uitsluitend bij die auto: eerst de exacte Audi, ECU, transmissie en aanwezige hardware beoordelen.",
    brandSlug: "audi-chiptuning",
    brandHref: "/nl/audi-chiptuning",
    resourceLabel: "Bekijk echte Audi A4 Stage 2+-case",
    resourceHref: "/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus",
    resourceAnalytics: {name: "customer_result_click", properties: {locale: "nl", slug: "audi-a4-b7-20-tdi-stage-2-plus"}}
  },
  {
    name: "Volkswagen",
    title: "Volkswagen tuning vanuit Groningen",
    explanation:
      "Een Golf 7 GTI Performance is geen Golf R. Motorsoftware, turbo, aandrijving en DSG-uitvoering kunnen verschillen. Onze Nederlandse Volkswagen-uitleg en het afzonderlijke GTI-motorprofiel helpen je de juiste uitvoering te kiezen voordat je een afspraak aanvraagt.",
    brandSlug: "volkswagen-chiptuning",
    brandHref: "/nl/volkswagen-chiptuning",
    resourceLabel: "Bekijk Golf GTI-motorprofiel",
    resourceHref: "https://power.noordtune.nl/nl/vehicles/vw-golf-20-tsi-ea888",
    resourceAnalytics: {name: "power_catalog_click", properties: {locale: "nl", source: "groningen_brand_guide"}}
  }
];

export function NlGroningenBrandPathways() {
  return (
    <section
      className="border-y border-white/10 bg-[#0d1012] py-12 md:py-16"
      data-testid="nl-groningen-brand-pathways"
    >
      <div className="container min-w-0">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-primary">BMW, Audi en Volkswagen · regio Groningen</p>
        <h2 className="racing-title mt-3 max-w-4xl text-[clamp(2rem,4.5vw,3.8rem)] leading-[.98] text-white [overflow-wrap:anywhere]">
          Kies de juiste auto en motor voordat je laat tunen.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">
          Zoek je chiptuning vanuit Groningen? NoordTune heeft één werkplaats in Assen en geen vestiging in Groningen.
          Vergelijk de technische basis van jouw auto, bekijk gecontroleerde bronnen en bespreek de mogelijkheden vooraf.
        </p>
        <nav aria-label="BMW, Audi en Volkswagen chiptuning voor Groningen" className="mt-8 grid min-w-0 gap-4 lg:grid-cols-3">
          {choices.map((choice) => (
            <article className="flex min-w-0 flex-col rounded-lg border border-white/15 bg-black/35 p-5 sm:p-6" key={choice.brandSlug}>
              <p className="text-xs font-bold uppercase tracking-[.14em] text-primary">{choice.name}</p>
              <h3 className="mt-3 text-xl font-black leading-tight text-white [overflow-wrap:anywhere]">{choice.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-white/72">{choice.explanation}</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                <TrackedLink
                  analytics={{name: "brand_page_click", properties: {locale: "nl", slug: choice.brandSlug}}}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  href={choice.brandHref}
                >
                  Bekijk {choice.name}-chiptuning <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </TrackedLink>
                <TrackedLink
                  analytics={choice.resourceAnalytics}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/80 underline decoration-primary underline-offset-4 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  href={choice.resourceHref}
                >
                  {choice.resourceLabel} <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </TrackedLink>
              </div>
            </article>
          ))}
        </nav>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <TrackedLink
            analytics={{name: "appointment_click", properties: {locale: "nl", source: "groningen_brand_guide"}}}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-center text-sm font-bold text-white hover:brightness-110"
            href="/nl/afspraak"
          >
            <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" /> Vraag een afspraak in Assen aan
          </TrackedLink>
          <TrackedLink
            analytics={{name: "whatsapp_click", properties: {locale: "nl", source: "groningen_brand_guide"}}}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-center text-sm font-bold text-white hover:border-primary"
            href={site.whatsappUrl}
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" /> Bespreek jouw auto via WhatsApp
          </TrackedLink>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-white/55">
          Vermogen, koppel en prijs zijn afhankelijk van de exacte uitvoering en technische conditie. Cataloguscijfers uit externe bronnen zijn
          indicaties, geen door NoordTune gemeten of gegarandeerde resultaten.
        </p>
      </div>
    </section>
  );
}
