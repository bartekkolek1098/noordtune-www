import Link from "next/link";
import {ArrowRight,Info,ShieldCheck} from "lucide-react";
import {ButtonLink} from "@/components/button";
import {isPublicCustomerResult,type CustomerResult} from "@/content/customer-results";

/**
 * Case-specific evidence context for the owner-approved 2008 Audi A4 B7
 * Stage 2+ project. Keep it attached only to this published NL case.
 *
 * Certificate means the service certificate in the owner-reviewed record;
 * it is NOT a dyno proof or independent road-emissions homologation.
 */
export function AudiA4B7Stage2Evidence({result}:{result:CustomerResult}){
 if(result.locale!=="nl"||result.slug!=="audi-a4-b7-20-tdi-stage-2-plus"||!isPublicCustomerResult(result)){
  return null;
 }
 if(result.stockPowerHp===undefined||result.tunedPowerHp===undefined||
    result.stockTorqueNm===undefined||result.tunedTorqueNm===undefined){
  return null;
 }
 const start=`${result.stockPowerHp} pk / ${result.stockTorqueNm} Nm`;
 const after=`${result.tunedPowerHp} pk / ${result.tunedTorqueNm} Nm`;
 const topics=[
  {
   question:"Welke hardware had deze Audi A4 B7 bij Stage 2+?",
   answer:"De gepubliceerde projectbeschrijving noemt een hybride turbo en downpipe bij een Audi A4 B7 2.0 TDI uit 2008 met handgeschakelde versnellingsbak. De ECU-remap is op deze specifieke configuratie afgestemd. Dit is geen standaard Stage 1- of Stage 2-bestand voor iedere 2.0 TDI."
  },
  {
   question:"Gelden de getoonde pk- en Nm-waarden ook voor mijn Audi?",
   answer:`Nee. In het goedgekeurde klantdossier staan voor dit voertuig ${start} vóór en ${after} na de werkzaamheden. Dat zijn de gepubliceerde projectwaarden voor deze combinatie van auto, software en hardware. Een andere motorcode, turbo, transmissie of technische staat kan een andere uitkomst geven. De pagina is geen garantie voor jouw Audi.`
  },
  {
   question:"Wat betekent het certificaat voor de wegtoelating?",
   answer:"Bij dit project is een certificaat van de uitgevoerde dienst vermeld. Dat is op zichzelf geen bewijs van een afzonderlijke rollenbankmeting of goedkeuring voor gebruik van alle aangepaste onderdelen op de openbare weg. Voor een eigen voertuig controleren we welke uitlaat- en emissieonderdelen wettelijk toegestaan zijn en of DPF, SCR en andere verplichte systemen conform blijven werken."
  }
 ] as const;
 return <section className="panel-edge min-w-0 rounded-[3px] p-6 md:p-8"
  aria-labelledby="audi-a4-b7-evidence-heading" data-testid="audi-a4-b7-stage2-evidence">
   <p className="text-xs font-black uppercase tracking-[.15em] text-primary">
    Wat deze praktijkcase laat zien
   </p>
   <h2 id="audi-a4-b7-evidence-heading" className="racing-title mt-3 text-2xl leading-tight text-white md:text-4xl">
    Audi A4 B7 2.0 TDI Stage 2+: hardware en resultaat in context
   </h2>
   <p className="mt-4 text-sm leading-7 text-white/70">
    Een Stage 2+-project hoort bij de exacte gemonteerde hardware, ECU-versie en technische conditie.
    Dit dossier documenteert één eerder uitgevoerd NoordTune-project en vormt geen algemene
    offerte of resultaatgarantie voor iedere Audi A4 2.0 TDI.
   </p>
   <div className="mt-6 space-y-4" data-testid="audi-stage2-technical-questions">
    {topics.map(({question,answer})=><div key={question} className="rounded-lg border border-white/15 bg-black/25 p-4">
     <h3 className="text-base font-bold leading-6 text-white">{question}</h3>
     <p className="mt-2 text-sm leading-7 text-white/70">{answer}</p>
    </div>)}
   </div>
   <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5">
    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>
    <p className="text-xs leading-6 text-white/65">
     <Info className="mr-1 inline h-3.5 w-3.5" aria-hidden="true"/>
     De genoemde waarden en het certificaat komen uit het gepubliceerde projectdossier.
     NoordTune beoordeelt veiligheid, diagnose, emissievoorzieningen en wettelijke toepasbaarheid
     voor een nieuwe auto altijd afzonderlijk.
    </p>
   </div>
   <div className="mt-6 flex flex-wrap items-center gap-3">
    <ButtonLink href="/nl/afspraak" analytics={{name:"appointment_click",properties:{locale:"nl",source:"site_cta"}}}>
     Vraag een persoonlijke Audi-beoordeling
    </ButtonLink>
    <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4"
     href="/nl/stage-2-tuning">
     Meer over Stage 2 en de voorwaarden <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/>
    </Link>
   </div>
  </section>;
}
