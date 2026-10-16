import Link from "next/link";
import {ArrowRight,ClipboardList,MapPin,MessageCircle,ScanSearch,ShieldCheck} from "lucide-react";
import {ButtonLink} from "@/components/button";
import {TrackedLink} from "@/components/tracked-link";
import {site} from "@/content/site";
import {pricingPlans} from "@/content/copy";

/**
 * Informative Dutch service navigation for a single real workshop in Assen.
 * Search Console shows Dutch diagnosis intent for Groningen, but this is not
 * an invented second garage, an instant remote repair or a generic city page.
 */
const diagnosticSteps=[
 {
  title:"1. Klacht en voorgeschiedenis",
  detail:"Vertel wanneer de melding optreedt: bij koude start, accelereren, snelwegrit, regeneratie of schakelen. Noem eerdere reparaties of softwarewijzigingen. Zo richten we het onderzoek op de juiste situatie."
 },
 {
  title:"2. Foutcodes en freeze-framegegevens",
  detail:"Voor ondersteunde voertuigen bekijken we opgeslagen foutcodes en de omstandigheden waarin ze zijn ontstaan. Een melding over turbodruk, DPF of NOx identificeert niet automatisch het defecte onderdeel."
 },
 {
  title:"3. Meetwaarden en loganalyse waar nodig",
  detail:"We vergelijken bijvoorbeeld gevraagde en gemeten turbodruk, luchtmassa, temperatuur of brandstofdruk. Soms is gerichte controle of logging onder veilige omstandigheden nodig om een afwijking te begrijpen."
 },
 {
  title:"4. Bevindingen en vervolgstap",
  detail:"We bespreken wat de gegevens aanwijzen en of verder onderzoek of een reparatieofferte zinvol is. Diagnose is niet hetzelfde als directe reparatie; onderdelen en aanvullende werkzaamheden worden niet automatisch uitgevoerd."
 }
] as const;

const basicDiagnosisPrice=pricingPlans.nl.find(plan=>plan.name==="Basisdiagnose")?.price;
if(!basicDiagnosisPrice)throw new Error("Approved NL basic diagnosis price is missing");

const questions=[
 {
  question:"Kunnen jullie mijn auto uit Groningen op afstand uitlezen?",
  answer:"Een beschrijving van de klacht kun je vooraf via WhatsApp sturen. Een daadwerkelijke storingsdiagnose met uitleesapparatuur en meetgegevens gebeurt bij NoordTune in de werkplaats in Assen, op afspraak. Zonder voertuig en geschikte toegang kunnen we niet betrouwbaar vaststellen wat er defect is."
 },
 {
  question:"Wat kost auto uitlezen of storingsdiagnose?",
  answer:`De gepubliceerde basisdiagnose begint vanaf ${basicDiagnosisPrice} inclusief btw. Meer uitgebreide loganalyse of vervolgonderzoek kan extra tijd en kosten vragen. Vertel vooraf welke foutmelding je ziet, zodat we de passende aanpak en prijs kunnen bespreken. Uitlezen alleen omvat niet automatisch een reparatie.`
 },
 {
  question:"Lossen jullie een AdBlue-, EGR- of DPF-storing op door deze systemen uit te schakelen?",
  answer:"Nee, het uitschakelen van wettelijk vereiste emissiesystemen is geen weglegale oplossing die we aanbieden. We bespreken diagnose van sensoren, relevante foutcodes en mogelijke oorzaken. Welke reparatie passend en wettelijk toegestaan is, volgt pas na onderzoek van het betreffende voertuig."
 }
] as const;

export function NlDiagnosticsServiceGuide(){
 return (
  <section data-testid="nl-diagnostics-service-guide" id="storingsdiagnose-aanpak"
   className="container scroll-mt-28 py-10 md:py-14" aria-labelledby="nl-diagnostics-heading">
   <div className="rounded-xl border border-white/15 bg-[#141719] p-5 md:p-8">
    <p className="text-xs font-black uppercase tracking-[.14em] text-primary">
     Storingsdiagnose · auto uitlezen · loganalyse
    </p>
    <h2 id="nl-diagnostics-heading" className="racing-title mt-3 max-w-5xl break-words text-xl text-white min-[360px]:text-2xl sm:text-3xl md:text-4xl">
     Storingsdiagnose in Assen, ook voor auto&apos;s uit Groningen
    </h2>
    <p className="mt-5 max-w-5xl text-sm leading-8 text-white/75 md:text-base">
     Een motorlampje, vermogensverlies of terugkerende AdBlue-, DPF- of turbodrukmelding
     vertelt nog niet welke reparatie nodig is. NoordTune onderzoekt bij ondersteunde auto&apos;s
     de foutcode in samenhang met meetwaarden, eerdere werkzaamheden en het gedrag van de auto.
     <strong className="text-white"> Onze enige werkplaats is in Assen.</strong> Kom je uit Groningen
     of Drenthe, dan kun je de klacht vooraf bespreken en een diagnosebezoek in Assen afstemmen.
    </p>
    <div data-testid="nl-diagnostics-process" className="mt-7 grid min-w-0 gap-3 md:grid-cols-2">
     {diagnosticSteps.map(step=><article key={step.title}
      className="min-w-0 rounded-lg border border-white/15 bg-black/30 p-5">
      <h3 className="flex items-start gap-2 text-lg font-bold text-white">
       <ScanSearch aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary"/>
       {step.title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{step.detail}</p>
     </article>)}
    </div>
    <div className="mt-7 grid min-w-0 gap-5 lg:grid-cols-[1.05fr_.95fr]">
     <div className="rounded-lg border border-primary/25 bg-primary/[.055] p-5">
      <h3 className="flex items-center gap-2 text-xl font-bold text-white">
       <ClipboardList className="h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>
       Wat kun je vooraf doorgeven?
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/70">
       Geef merk, model, motorvariant, bouwjaar, foutcodes (als je die hebt),
       een korte omschrijving van de klacht en aan wanneer die optreedt.
       Vermeld relevante onderhoudsbeurten of eerdere softwarewijzigingen.
       Wij vragen niet om persoonsgegevens in de zoekfilters of statistieken.
      </p>
      <p className="mt-3 text-xs leading-6 text-white/55">
       Foutcodes zonder context zijn geen definitieve diagnose. Een proefrit,
       aanvullende meting of specialistische reparatie kan apart nodig zijn.
      </p>
     </div>
     <div className="rounded-lg border border-white/15 bg-black/30 p-5">
      <h3 className="flex items-center gap-2 text-xl font-bold text-white">
       <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>
       Werkplaats Assen · op afspraak
      </h3>
      <p className="mt-3 text-sm leading-7 text-white/70">
       Wij hebben geen vestiging in Groningen. Voor een fysieke diagnose bezoek je
       NoordTune in Assen. Basisdiagnose start vanaf <strong className="text-white">{basicDiagnosisPrice} incl. btw</strong>.
       Een uitgebreide diagnose of loganalyse wordt apart besproken.
      </p>
      <Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-primary underline-offset-4"
       href="/nl/prijzen">Bekijk de actuele vanaf-prijzen <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link>
     </div>
    </div>
    <div className="mt-7 flex flex-wrap gap-3">
     <ButtonLink href="/nl/afspraak"
      analytics={{name:"appointment_click",properties:{locale:"nl",source:"site_cta"}}}>
      Plan een diagnose-afspraak
     </ButtonLink>
     <TrackedLink href={site.whatsappUrl} target="_blank" rel="noopener noreferrer"
      analytics={{name:"whatsapp_click",properties:{locale:"nl",source:"site_cta"}}}
      className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 px-4 py-3 text-sm font-bold text-white hover:border-primary">
      <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true"/>
      Bespreek jouw storing via WhatsApp
     </TrackedLink>
    </div>
    <nav aria-label="Meer over diagnose en werkplaats" className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
     <Link href="/nl/auto-diagnose-assen" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white/80 underline decoration-primary underline-offset-4">
      Diagnose in Assen <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link>
     <Link href="/nl/blog/dpf-egr-of-adblue-storing-wat-nu" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white/80 underline decoration-primary underline-offset-4">
      DPF-, EGR- of AdBlue-storing: waar op letten? <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link>
     <Link href="/nl/contact" className="inline-flex min-h-11 items-center gap-2 font-semibold text-white/80 underline decoration-primary underline-offset-4">
      Contact met NoordTune <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true"/></Link>
    </nav>
    <div data-testid="nl-diagnostics-faq" className="mt-8 border-t border-white/10 pt-7">
     <h3 className="racing-title break-words text-lg text-white min-[360px]:text-xl sm:text-2xl md:text-3xl">Vragen over storingsdiagnose en auto uitlezen</h3>
     <div className="mt-5 space-y-3">
      {questions.map(item=><details key={item.question}
       className="rounded-lg border border-white/15 bg-black/25 p-5">
       <summary className="cursor-pointer text-sm font-bold leading-6 text-white">{item.question}</summary>
       <p className="mt-3 text-sm leading-7 text-white/70">{item.answer}</p>
      </details>)}
     </div>
    </div>
    <div className="mt-7 flex items-start gap-3 border-t border-white/10 pt-5">
     <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true"/>
     <p className="text-xs leading-6 text-white/60">
      Een storing moet eerst worden onderzocht; programmeren is geen vervanging voor
      een technisch noodzakelijke reparatie. Emissiesystemen die voor weggebruik
      verplicht zijn, zoals DPF en SCR/AdBlue, moeten correct blijven functioneren.
     </p>
    </div>
   </div>
  </section>
 );
}
