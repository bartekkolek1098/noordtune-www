import Link from "next/link";
import {ArrowRight, MapPin, MessageCircle} from "lucide-react";
import {TrackedLink} from "@/components/tracked-link";
import {site} from "@/content/site";

const serviceAreaLinks=[
  {
    href:"/nl/chiptuning-assen",
    label:"Chiptuning in Assen",
    text:"Stage 1 en ECU-remap met diagnose, softwarecontrole en een persoonlijke offerte in onze werkplaats."
  },
  {
    href:"/nl/chiptuning-groningen",
    label:"Chiptuning voor klanten uit Groningen",
    text:"Vanuit Groningen eerst je motor en ECU bespreken en daarna een afspraak maken bij NoordTune in Assen."
  },
  {
    href:"/nl/auto-diagnose-assen",
    label:"Storingsdiagnose & auto uitlezen in Assen",
    text:"Ook voor klanten uit Groningen: onderzoek van foutcodes, live data en loganalyse bij onze werkplaats in Assen."
  }
] as const;

/**
 * One physical Assen workshop, discoverable navigation for the nearby region.
 * Not a fabricated Groningen branch or a duplicated location doorway.
 */
export function NlLocalServiceArea(){
 return (
  <section className="container py-10 md:py-14" aria-labelledby="nl-workshop-region-title"
    data-testid="nl-local-workshop-region">
   <div className="min-w-0 rounded-xl border border-white/15 bg-[#141719] p-5 md:p-8">
    <div className="flex items-start gap-3">
     <MapPin aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-primary"/>
     <div className="max-w-4xl">
      <p className="text-xs font-black uppercase tracking-[.14em] text-primary">
       Werkplaats in Assen · Drenthe · Noord-Nederland
      </p>
      <h2 id="nl-workshop-region-title" className="mt-3 text-2xl font-black leading-tight text-white md:text-4xl">
       Chiptuning en diagnose in Assen, ook voor klanten uit Groningen
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
       NoordTune heeft één werkplaats in <strong className="text-white">Assen</strong>,
       geen vestiging in Groningen. Voor bestuurders uit Assen, Drenthe en Groningen
       controleren we de exacte motorvariant, ECU-software, onderhoud en transmissie
       voordat we een Stage 1-remap of diagnose adviseren. Je kunt de mogelijkheden
       vooraf bespreken; het werk wordt op afspraak in Assen uitgevoerd.
      </p>
     </div>
    </div>
    <nav aria-label="Chiptuning en diagnose per regio"
      className="mt-6 grid min-w-0 gap-3 md:grid-cols-3">
     {serviceAreaLinks.map(item=>(
      <Link key={item.href} href={item.href}
       className="group flex min-w-0 flex-col gap-2 rounded-lg border border-white/15 bg-black/30 p-4 transition-colors hover:border-primary/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
       <span className="flex items-start justify-between gap-3 text-base font-bold text-white">
        {item.label}
        <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-primary"/>
       </span>
       <span className="text-sm leading-6 text-white/65">{item.text}</span>
      </Link>
     ))}
    </nav>
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
     <Link className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-primary underline-offset-4" href="/nl/resultaten">
      Bekijk echte klantprojecten <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/>
     </Link>
     <TrackedLink analytics={{name:"appointment_click",properties:{locale:"nl",source:"site_cta"}}}
      className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-primary underline-offset-4" href="/nl/afspraak">
      Afspraak of offerte aanvragen <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/>
     </TrackedLink>
     <TrackedLink analytics={{name:"whatsapp_click",properties:{locale:"nl",source:"site_cta"}}}
      className="inline-flex min-h-11 items-center gap-2 font-semibold text-white underline decoration-primary underline-offset-4"
      href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
      Vraag eerst advies via WhatsApp <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true"/>
     </TrackedLink>
    </div>
   </div>
  </section>
 );
}
