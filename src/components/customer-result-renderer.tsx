import Image from "next/image";
import Link from "next/link";
import {ButtonLink} from "@/components/button";
import {CTASection} from "@/components/cta-section";
import {FloatingWhatsApp} from "@/components/floating-whatsapp";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {PowerCatalogSection} from "@/components/power-catalog-section";
import {SectionHeader} from "@/components/section-header";
import type {CustomerResult} from "@/content/customer-results";
import {pathFor, type Locale} from "@/content/site";

const labels = {
  nl: {
    back: "Terug naar resultaten",
    caseLabel: "Klantresultaat",
    stock: "Origineel",
    tuned: "Na tuning",
    gain: "Winst",
    vehicle: "Voertuig",
    service: "Service",
    technical: "Technische notities",
    disclaimer: "Belangrijke nuance",
    catalog: "Controleer jouw auto in de Power Catalog",
    whatsapp: "Stuur je kenteken of motorgegevens via WhatsApp",
    generation: "Generatie",
    engine: "Motor",
    transmission: "Transmissie",
    fuel: "Brandstof",
    ecu: "ECU",
    tcu: "TCU",
    certificate: "Certificaat",
    certificateYes: "Beschikbaar"
  },
  en: {
    back: "Back to results",
    caseLabel: "Customer result",
    stock: "Stock",
    tuned: "Tuned",
    gain: "Gain",
    vehicle: "Vehicle",
    service: "Service",
    technical: "Technical notes",
    disclaimer: "Important nuance",
    catalog: "Check your vehicle in the Power Catalog",
    whatsapp: "Send us your vehicle details on WhatsApp",
    generation: "Generation",
    engine: "Engine",
    transmission: "Transmission",
    fuel: "Fuel",
    ecu: "ECU",
    tcu: "TCU",
    certificate: "Certificate",
    certificateYes: "Available"
  },
  pl: {
    back: "Wróć do rezultatów",
    caseLabel: "Realizacja klienta",
    stock: "Seria",
    tuned: "Po modyfikacji",
    gain: "Przyrost",
    vehicle: "Pojazd",
    service: "Usługa",
    technical: "Notatki techniczne",
    disclaimer: "Ważna informacja",
    catalog: "Sprawdź swoje auto w katalogu mocy",
    whatsapp: "Wyślij nam dane auta przez WhatsApp",
    generation: "Generacja",
    engine: "Silnik",
    transmission: "Skrzynia",
    fuel: "Paliwo",
    ecu: "ECU",
    tcu: "TCU",
    certificate: "Certyfikat",
    certificateYes: "Dostępny"
  }
} satisfies Record<Locale, Record<string, string>>;

function Fact({label, value}: {label: string; value?: string}) {
  if (!value) {
    return null;
  }

  return (
    <div className="border border-white/10 bg-black/30 p-4">
      <p className="text-xs font-black uppercase text-white/42">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

export function CustomerResultRenderer({result}: {result: CustomerResult}) {
  const copy = labels[result.locale];
  const image = result.images[0] ?? "/images/sections/tuning-laptop-b2.webp";
  const title =
    result.title ?? `${result.vehicleMake} ${result.vehicleModel} ${result.vehicleGeneration ?? ""} ${result.vehicleEngine} ${result.stage}`.replace(/\s+/g, " ").trim();
  const hpUnit = result.locale === "pl" ? "KM" : result.locale === "nl" ? "pk" : "hp";
  const stock = `${result.stockPowerHp} ${hpUnit} / ${result.stockTorqueNm} Nm`;
  const tuned = `${result.tunedPowerHp} ${hpUnit} / ${result.tunedTorqueNm} Nm`;
  const gain = `+${result.gainPowerHp} ${hpUnit} / +${result.gainTorqueNm} Nm`;

  return (
    <>
      <Header activeKey="resultaten" locale={result.locale} />
      <main>
        <article>
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
              <Image
                alt={result.imageAlt}
                className="object-cover object-center"
                fill
                priority
                quality={90}
                sizes="100vw"
                src={image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.9)_40%,rgba(5,5,5,.55)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(227,6,19,.28),transparent_18rem)]" />
            </div>

            <div className="container relative z-10 flex min-h-[460px] items-end pb-10 pt-20 md:min-h-[590px] md:pb-14">
              <div className="max-w-4xl">
                <Link
                  className="text-xs font-black uppercase text-white/58 transition hover:text-primary"
                  href={pathFor(result.locale, "resultaten")}
                >
                  {copy.back}
                </Link>
                <p className="racing-title mt-6 text-lg text-primary md:text-xl">{copy.caseLabel}</p>
                <h1 className="racing-title mt-3 text-4xl leading-[0.9] text-white sm:text-5xl md:text-7xl">
                  {title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                  {result.shortDescription}
                </p>
                <div className="mt-7 flex flex-wrap gap-3 text-xs font-black uppercase text-white/58">
                  <span className="rounded-[3px] border border-primary/35 bg-primary/12 px-3 py-2 text-primary">
                    {result.serviceType}
                  </span>
                  <span className="rounded-[3px] border border-white/12 bg-black/35 px-3 py-2">
                    {result.vehicleEngine}
                  </span>
                  {result.ecu ? (
                    <span className="rounded-[3px] border border-white/12 bg-black/35 px-3 py-2">
                      {result.ecu}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          <section className="container py-12 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-8">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="panel-edge rounded-[3px] p-5">
                    <p className="text-xs font-black uppercase text-white/42">{copy.stock}</p>
                    <p className="racing-title mt-3 text-3xl text-white">{stock}</p>
                  </div>
                  <div className="panel-edge rounded-[3px] border-primary/50 bg-primary/10 p-5">
                    <p className="text-xs font-black uppercase text-white/42">{copy.tuned}</p>
                    <p className="racing-title mt-3 text-3xl text-white">{tuned}</p>
                  </div>
                  <div className="panel-edge rounded-[3px] p-5">
                    <p className="text-xs font-black uppercase text-white/42">{copy.gain}</p>
                    <p className="racing-title mt-3 text-3xl text-primary">{gain}</p>
                  </div>
                </div>

                <div className="panel-edge rounded-[3px] p-6 md:p-8">
                  <SectionHeader align="left" kicker={copy.vehicle} title={title} />
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <Fact label={copy.generation} value={result.vehicleGeneration ?? result.vehicleYear} />
                    <Fact label={copy.engine} value={result.vehicleEngine} />
                    <Fact label={copy.transmission} value={result.transmission} />
                    <Fact label={copy.fuel} value={result.fuelType} />
                    <Fact label={copy.ecu} value={result.ecu} />
                    <Fact label={copy.tcu} value={result.tcu} />
                    <Fact label={copy.service} value={`${result.stage} - ${result.serviceType}`} />
                    <Fact
                      label={copy.certificate}
                      value={result.certificateAvailable ? copy.certificateYes : undefined}
                    />
                  </div>
                </div>

                <div className="panel-edge rounded-[3px] p-6 md:p-8">
                  <h2 className="racing-title text-3xl text-white md:text-5xl">{copy.technical}</h2>
                  <ul className="mt-6 grid gap-3">
                    {result.technicalNotes.map((note) => (
                      <li className="flex gap-3 border border-white/10 bg-black/32 px-4 py-3 text-sm leading-6 text-white/72" key={note}>
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="space-y-5">
                <div className="panel-edge rounded-[3px] p-5">
                  <p className="racing-title text-2xl text-white">NoordTune</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">{result.disclaimer}</p>
                  <div className="mt-5 grid gap-3">
                    <ButtonLink href={result.relatedPowerCatalogUrl}>{copy.catalog}</ButtonLink>
                    <ButtonLink href={result.whatsappCta} icon="whatsapp" variant="outline">
                      {copy.whatsapp}
                    </ButtonLink>
                  </div>
                </div>
                <div className="panel-edge rounded-[3px] p-5">
                  <p className="racing-title text-2xl text-white">{copy.disclaimer}</p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {result.locale === "nl"
                      ? "Vermogenswaarden blijven voertuigafhankelijk. Onderhoudsstaat, softwareversie, brandstof, hardware en gebruik bepalen het uiteindelijke resultaat."
                      : result.locale === "en"
                        ? "Power figures remain vehicle-specific. Maintenance, software version, fuel, hardware and use determine the final result."
                        : "Wartości mocy są zależne od konkretnego auta. Stan techniczny, wersja oprogramowania, paliwo, osprzęt i sposób użytkowania wpływają na końcowy wynik."}
                  </p>
                </div>
              </aside>
            </div>
          </section>
        </article>

        <PowerCatalogSection compact locale={result.locale} />
        <CTASection locale={result.locale} />
      </main>
      <Footer locale={result.locale} />
      <FloatingWhatsApp locale={result.locale} />
    </>
  );
}
