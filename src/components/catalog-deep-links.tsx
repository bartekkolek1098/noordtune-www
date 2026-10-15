import {ArrowUpRight,ChevronRight} from "lucide-react";
import {TrackedLink} from "@/components/tracked-link";
import {catalogDiscoveryTopics,catalogTopicUrl} from "@/content/catalog-discovery";
import type {BrandKey} from "@/content/brand-pages";
import type {Locale} from "@/content/site";

/**
 * Hand-reviewed cross-domain navigation. Shown only on pages where the
 * user is actively exploring vehicles; not repeated on every blog post.
 */
export function CatalogDeepLinks({locale,brand}:{locale:Locale;brand?:BrandKey}){
 if(locale!=="nl")return null;
 const topics=catalogDiscoveryTopics(brand);
 const label=brand?"Motorvarianten per merk":"Populaire motoren en bedrijfswagens";
 return (
  <section className="container py-9 md:py-12" data-testid={brand?"nl-brand-catalog-links":"nl-home-catalog-links"}>
   <div className="flex min-w-0 flex-wrap items-end justify-between gap-5">
    <div className="min-w-0 max-w-3xl">
     <p className="text-xs font-bold uppercase tracking-[.16em] text-primary">NoordTune Power Catalog · NL</p>
     <h2 className="racing-title mt-3 text-[clamp(1.9rem,4vw,3.4rem)] leading-[.98] text-white [overflow-wrap:anywhere]">
      {brand?"Kies de juiste motor van jouw auto.":"Vergelijk jouw model en motor."}
     </h2>
     <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
      {brand?
       "Motoren van hetzelfde merk kunnen verschillen in ECU, fabrieksvermogen en versnellingsbak. Deze links openen passende, afzonderlijk gecontroleerde NoordTune-profielen.":
       "Ga direct naar een modelvergelijking of bedrijfswagen in onze catalogus. Bekijk de originele RDW-gegevens en beschikbare externe Stage 1-indicaties per uitvoering."}
     </p>
    </div>
    <div className="flex flex-wrap items-center gap-5">
     <TrackedLink analytics={{name:"power_catalog_click",properties:{locale:"nl",source:brand?"catalog_discovery_brand":"catalog_discovery_home"}}}
      data-testid="nl-technical-brand-directory-link"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4 transition hover:text-primary"
      href="https://power.noordtune.nl/nl/merken">Alle 15 automerken <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true"/></TrackedLink>
     <TrackedLink analytics={{name:"power_catalog_click",properties:{locale:"nl",source:brand?"catalog_discovery_brand":"catalog_discovery_home"}}}
     className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4 transition hover:text-primary"
     href="https://power.noordtune.nl/nl/motoren">
     Alle onderzochte motoren <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true"/>
    </TrackedLink>
    </div>
   </div>
   <nav aria-label={label} className="mt-7 grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {topics.map(topic=>(
     <TrackedLink
      analytics={{name:"power_catalog_click",properties:{locale:"nl",source:brand?"catalog_discovery_brand":"catalog_discovery_home"}}}
      className="group flex min-w-0 flex-col gap-2 rounded-md border border-white/12 bg-[#141719] p-5 transition-colors hover:border-primary/65 hover:bg-[#1c1e20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      data-catalog-path={topic.path}
      href={catalogTopicUrl(topic)}
      key={topic.path}>
      <span className="text-xs font-bold uppercase tracking-[.13em] text-primary">{topic.kind}</span>
      <span className="flex min-w-0 items-start justify-between gap-3">
       <strong className="min-w-0 text-base font-bold leading-6 text-white [overflow-wrap:anywhere]">{topic.title}</strong>
       <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true"/>
      </span>
      <span className="text-sm leading-6 text-white/65">{topic.detail}</span>
     </TrackedLink>
    ))}
   </nav>
   <p className="mt-4 text-xs leading-6 text-white/50">De getoonde Stage 1-gegevens komen uit externe bronnen en zijn geen meting of gegarandeerd resultaat van NoordTune. Voor advies controleren we jouw exacte motor, ECU en transmissie.</p>
  </section>
 );
}
