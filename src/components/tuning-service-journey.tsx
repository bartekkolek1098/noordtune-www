import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {ButtonLink} from "@/components/button";
import {TrackedLink} from "@/components/tracked-link";
import {customerResultFromRoute, customerResultPath} from "@/content/customer-results";
import {pageRoutes, pathFor, site} from "@/content/site";

const services = [
  {slug: "stage-1-tuning", label: "Stage 1 tuning", text: "Softwareafstemming op de standaard hardware, met aandacht voor bruikbaar koppel en de aandrijflijn."},
  {slug: "stage-2-tuning", label: "Stage 2 tuning", text: "Maatwerk rond aangepaste hardware. Eerst beoordelen we of de combinatie technisch en voor jouw gebruik geschikt is."},
  {slug: "ecu-remap", label: "ECU remap", text: "Voertuigspecifieke motorsoftware, afgestemd op je motorvariant, ECU en gewenste rijgedrag."},
  {slug: "dsg-tcu-tuning", label: "DSG / TCU tuning", text: "Transmissiesoftware voor passend schakelgedrag en koppelmanagement, wanneer jouw versnellingsbak dit ondersteunt."}
];

function EnquiryLinks() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <ButtonLink href={pathFor("nl", "prijzen")} variant="outline">Bekijk vanaf-prijzen</ButtonLink>
      <ButtonLink analytics={{name: "appointment_click", properties: {locale: "nl", source: "site_cta"}}} href={pathFor("nl", "appointment")}>Vraag een offerte of afspraak aan</ButtonLink>
      <ButtonLink analytics={{name: "power_catalog_click", properties: {locale: "nl", source: "site_cta"}}} href={site.catalogUrl} variant="outline">Controleer jouw auto</ButtonLink>
      <ButtonLink analytics={{name: "whatsapp_click", properties: {locale: "nl", source: "site_cta"}}} href={site.whatsappUrl} icon="whatsapp" variant="outline">Vraag tuningadvies via WhatsApp</ButtonLink>
    </div>
  );
}

export function TuningServiceNavigation() {
  return (
    <section className="container py-8 md:py-10" data-service-journey aria-labelledby="tuning-service-title">
      <h2 className="racing-title text-3xl text-white md:text-4xl" id="tuning-service-title">Welke tuning past bij jouw auto?</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-white/68">Kies de uitleg die bij je vraag past. We beoordelen de mogelijkheden en de definitieve prijs voor jouw specifieke auto.</p>
      <nav aria-label="Kies jouw tuningdienst" className="mt-5 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <Link className="group panel-edge flex min-w-0 items-start justify-between gap-4 rounded-[3px] p-4 transition hover:border-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={`/nl/${service.slug}`} key={service.slug}>
            <span className="min-w-0">
              <span className="racing-title block text-xl text-white">{service.label}</span>
              <span className="mt-2 block text-sm leading-6 text-white/68">{service.text}</span>
            </span>
            <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary" />
          </Link>
        ))}
      </nav>
      <EnquiryLinks />
    </section>
  );
}

const proofByService = {
  "stage-2-tuning": {
    slug: "audi-a4-b7-20-tdi-stage-2-plus",
    text: "Dit echte Stage 2+ klantproject werd afgestemd op een hybride turbo en downpipe. De gepubliceerde vermogens- en koppelwaarden gelden alleen voor deze Audi en deze hardwareconfiguratie. Welke aanpassingen wettelijk geschikt zijn, hangt af van het voertuig en de eisen voor gebruik op de openbare weg."
  },
  "dsg-tcu-tuning": {
    slug: "bmw-f40-118i-7dct300-tcu-tuning",
    text: "Bij deze BMW F40 118i is de software van de GETRAG 7DCT300 aangepast voor schakelgedrag en koppelmanagement. Dit is een BMW TCU-project, geen Volkswagen DSG-project. De aanpak en gepubliceerde ervaringen horen bij deze specifieke auto en transmissie."
  }
} as const;

export function TuningCustomerProof({slug}: {slug: string}) {
  const proof = proofByService[slug as keyof typeof proofByService];
  if (!proof) return null;
  const result = customerResultFromRoute("nl", pageRoutes.resultaten.nl, proof.slug);
  if (!result) return null;

  return (
    <section className="container py-8 md:py-10" data-tuning-proof={slug} aria-labelledby="tuning-proof-title">
      <div className="panel-edge min-w-0 rounded-[3px] p-5 md:p-6">
        <p className="text-xs font-black uppercase text-primary">Gepubliceerd klantproject</p>
        <h2 className="racing-title mt-2 text-3xl text-white" id="tuning-proof-title">Bekijk de aanpak bij een echte klantauto</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68">{proof.text}</p>
        <TrackedLink analytics={{name: "customer_result_click", properties: {locale: "nl", slug: result.slug}}} className="mt-4 inline-flex items-center gap-3 text-sm font-bold text-white underline decoration-primary underline-offset-4 hover:text-primary" href={customerResultPath(result)}>
          <span>{result.title ?? `${result.vehicleMake} ${result.vehicleModel} · ${result.stage}`}</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
        </TrackedLink>
        <EnquiryLinks />
      </div>
    </section>
  );
}
