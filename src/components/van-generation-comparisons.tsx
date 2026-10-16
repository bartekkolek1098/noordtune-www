import {ArrowUpRight,ChevronRight,ClipboardCheck,Truck} from "lucide-react";
import {ButtonLink} from "@/components/button";
import {TrackedLink} from "@/components/tracked-link";
import {businessVansPath} from "@/content/business-vans";
import {vanComparisonIndexUrl,vanComparisonUrl,vanGenerationComparisons} from "@/content/van-generation-comparisons";

/**
 * Pure navigation to distinct technical vehicle comparisons on the existing
 * Power Catalog. Commercial service information, prices and the actual form
 * stay on the NoordTune WWW landing page.
 */
export function VanGenerationComparisonSection(){
 return <section className="container py-10 md:py-14" aria-labelledby="van-generation-comparison-heading"
  data-testid="www-van-generation-comparisons">
  <div className="flex min-w-0 flex-wrap items-end justify-between gap-5">
   <div className="max-w-4xl">
    <p className="text-xs font-black uppercase tracking-[.17em] text-primary">Stage 1 vergelijken · RDW · bestelwagenmotoren</p>
    <h2 id="van-generation-comparison-heading" className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
     Zelfde busmodel. <span className="text-primary">Andere motor, andere ECU.</span>
    </h2>
    <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
     Een Transit Custom met 2.2 TDCi is niet dezelfde motor als een 2.0 EcoBlue.
     En een Sprinter 315 CDI hoeft niet dezelfde software te hebben als een 317 CDI.
     Vergelijk de oorspronkelijke RDW-kW, toelatingsjaren, ECU-generaties en externe
     Stage 1-indicaties voordat je een werkplaatsadvies aanvraagt.
    </p>
   </div>
   <div className="flex items-center gap-2 text-sm text-white/65">
    <Truck className="h-5 w-5 text-primary" aria-hidden="true"/>
    <span>9 gecontroleerde modelvergelijkingen</span>
   </div>
  </div>
  <nav className="mt-7 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3"
   aria-label="Vergelijk bedrijfswagenmotoren" data-testid="www-van-comparison-links">
   {vanGenerationComparisons.map(item=><TrackedLink
    key={item.slug} href={vanComparisonUrl(item)}
    analytics={{name:"power_catalog_click",properties:{locale:"nl",source:"business_van_compare"}}}
    data-comparison-slug={item.slug}
    className="group flex min-w-0 flex-col rounded-lg border border-white/15 bg-[#141719] p-5 transition-colors hover:border-primary/65 hover:bg-[#1b1d1f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
     <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-primary">
      <ClipboardCheck className="h-4 w-4 shrink-0" aria-hidden="true"/>{item.make} · {item.kind}
     </span>
     <span className="mt-3 flex min-w-0 items-start justify-between gap-3">
      <strong className="min-w-0 text-lg font-bold leading-6 text-white [overflow-wrap:anywhere]">{item.title}</strong>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true"/>
     </span>
     <span className="mt-3 flex-1 text-sm leading-6 text-white/65">{item.detail}</span>
     <span className="mt-5 inline-flex items-center gap-1 border-t border-white/10 pt-3 text-sm font-semibold text-white/85">
      Bekijk RDW, motorversies en Stage 1-bronnen
      <ChevronRight className="h-4 w-4 shrink-0 text-primary" aria-hidden="true"/>
     </span>
    </TrackedLink>)}
  </nav>
  <div className="mt-7 flex min-w-0 flex-wrap items-center gap-4">
   <TrackedLink href={vanComparisonIndexUrl} data-testid="www-van-comparison-directory"
    analytics={{name:"power_catalog_click",properties:{locale:"nl",source:"business_van_compare"}}}
    className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4 hover:text-primary">
    Bekijk alle motorvergelijkingen<ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true"/>
   </TrackedLink>
   <ButtonLink href={businessVansPath+"#offerte"} variant="outline"
    analytics={{name:"appointment_click",properties:{locale:"nl",source:"business_van_compare"}}}>
    Vraag een offerte voor jouw bus
   </ButtonLink>
  </div>
  <p className="mt-5 max-w-5xl text-xs leading-6 text-white/55">
   Alle motor- en Stage 1-gegevens zijn bronindicaties per gecontroleerde uitvoering, geen
   NoordTune-vermogensmeting of garantie. Voor weggebruik moeten DPF, SCR en AdBlue functioneren.
   Tijdens de intake beoordelen we de echte ECU, transmissie, motorconditie en dagelijkse belasting.
  </p>
 </section>;
}
