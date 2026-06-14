import type {FaqItem} from "./copy";
import {site, type Locale} from "./site";

type DraftSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type DraftLink = {
  label: string;
  href: string;
};

export type BrandSeoDraft = {
  locale: "nl";
  slug: string;
  status: "draft";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: DraftSection[];
  faq: FaqItem[];
  internalLinks: DraftLink[];
  primaryCta: DraftLink;
  secondaryCta: DraftLink;
  disclaimer: string;
};

export type SeoArticleDraft = {
  locale: Locale;
  slug: string;
  status: "draft";
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  intent: string;
  sections: DraftSection[];
  faq: FaqItem[];
  internalLinks: DraftLink[];
  primaryCta: DraftLink;
  secondaryCta: DraftLink;
};

const vehicleSpecificDisclaimer =
  "Resultaten verschillen per voertuig en hangen af van onderhoudsstaat, ECU/TCU, softwareversie, brandstof, hardware, transmissie en gebruik.";

export const brandSeoDrafts: BrandSeoDraft[] = [
  {
    locale: "nl",
    slug: "bmw-chiptuning",
    status: "draft",
    h1: "BMW chiptuning op maat",
    metaTitle: "BMW chiptuning | Stage 1, ECU remap en diagnose | NoordTune.nl",
    metaDescription:
      "BMW chiptuning door NoordTune.nl: ECU remap, Stage 1, Stage 2 advies, N47/B47/B58/N57 aandachtspunten en diagnose vooraf.",
    intro:
      "BMW-motoren reageren vaak sterk op een nette ECU remap, maar juist bij BMW is de combinatie van motor, automaat, onderhoud en softwareversie belangrijk. Deze draftpagina is voorbereid voor een toekomstige, sterke merkpagina en blijft ongepubliceerd totdat de content definitief is.",
    sections: [
      {
        heading: "BMW tuning begint bij motorvariant en transmissie",
        body: [
          "Een 320d, 330d, 530d, X3 2.0d of B58-benzinemotor vraagt niet dezelfde aanpak. NoordTune kijkt naar motorcode, ECU, kilometerstand, onderhoud, automaatlimieten en het doel van de bestuurder.",
          "Bij dieselmotoren zoals N47, B47, N57 en B57 speelt koppelopbouw een grote rol. Bij benzinemotoren zoals N20, B48, N55 en B58 zijn brandstofkwaliteit, temperatuur en turbodrukstrategie belangrijk."
        ],
        bullets: ["N47 / B47 / N57 / B57 diesel", "N20 / B48 / N55 / B58 benzine", "ZF automaat en koppelgrenzen", "Diagnose en loganalyse waar nodig"]
      },
      {
        heading: "Stage 1 en Stage 2 voor BMW",
        body: [
          "Stage 1 is meestal de beste keuze voor een BMW met standaard hardware. Stage 2 kan interessant zijn bij aangepaste koeling, luchttoevoer of uitlaatdelen waar wettelijk toegestaan, maar vraagt extra controle.",
          "Voor automaten kan TCU-gedrag bepalend zijn voor hoe soepel en betrouwbaar het extra koppel wordt verwerkt."
        ]
      },
      {
        heading: "Diagnose voorkomt verkeerde aannames",
        body: [
          "BMW's kunnen gevoelig zijn voor sensorwaarden, turbodrukregeling, EGR/DPF-status, injectiecorrecties en transmissieadaptaties. Daarom is een diagnose-first aanpak belangrijk voordat een tuningadvies definitief wordt."
        ]
      },
      {
        heading: "Power Catalog als startpunt",
        body: [
          "Via de NoordTune Power Catalog kan de eigenaar snel een eerste indicatie krijgen van Stage 1, Stage 2, DSG/TCU-achtige transmissieopties en prijsindicatie. Daarna volgt advies op basis van het exacte voertuig."
        ]
      }
    ],
    faq: [
      {question: "Is BMW chiptuning veilig?", answer: "Dat hangt af van staat, motorvariant, software en marges. Diagnose en realistische koppelopbouw zijn belangrijk."},
      {question: "Kan een ZF automaat extra koppel aan?", answer: "Vaak wel binnen grenzen, maar uitvoering, onderhoud en adaptaties tellen mee."},
      {question: "Is Stage 2 altijd verstandig?", answer: "Nee. Stage 2 vraagt passende hardware, controle en een wettelijke/technisch correcte toepassing."}
    ],
    internalLinks: [
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"}
    ],
    primaryCta: {label: "Controleer jouw BMW in de Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "WhatsApp ons voor BMW advies", href: site.whatsappUrl},
    disclaimer: vehicleSpecificDisclaimer
  },
  {
    locale: "nl",
    slug: "audi-chiptuning",
    status: "draft",
    h1: "Audi chiptuning met diagnose en maatwerk",
    metaTitle: "Audi chiptuning | 2.0 TDI, TFSI, quattro en DSG | NoordTune.nl",
    metaDescription:
      "Audi chiptuning met ECU remap, Stage 1, Stage 2 advies, DSG/TCU aandachtspunten en diagnose voor TDI en TFSI modellen.",
    intro:
      "Audi tuning vraagt aandacht voor motorfamilie, quattro of voorwielaandrijving, S tronic/DSG en emissiesystemen. Deze draft blijft voorbereid maar ongepubliceerd tot de merkcontent volledig is afgestemd.",
    sections: [
      {
        heading: "TDI, TFSI en aandrijflijn bepalen de aanpak",
        body: [
          "Een Audi A3 2.0 TDI, A4 2.0 TDI, A5 TFSI of Q5 diesel vraagt per uitvoering andere softwaremarges. NoordTune kijkt naar ECU, turbolader, injectiesysteem, koeling en transmissie.",
          "Bij S tronic / DSG kan TCU tuning of controle relevant zijn om schakellogica en koppellimieten goed te laten aansluiten op de motorsoftware."
        ],
        bullets: ["2.0 TDI en 3.0 TDI", "TFSI motoren met turbo", "S tronic / DSG controle", "quattro en voorwielaandrijving"]
      },
      {
        heading: "Stage 1 als nette basis",
        body: [
          "Voor veel Audi's met standaard hardware is Stage 1 de meest logische stap. De focus ligt op bruikbaar koppel, voorspelbare respons en behoud van nette marges."
        ]
      },
      {
        heading: "DPF, EGR en AdBlue zorgvuldig benaderen",
        body: [
          "Bij moderne diesels hoort zorgvuldige diagnose van DPF, EGR en AdBlue-systemen bij het advies. Software-oplossingen worden alleen besproken waar wettelijk toegestaan en passend bij voertuig en gebruik."
        ]
      },
      {
        heading: "Van catalogus naar advies",
        body: [
          "De Power Catalog geeft een snelle indicatie. Definitieve softwarekeuze volgt pas na controle van motorvariant, softwareversie en technische staat."
        ]
      }
    ],
    faq: [
      {question: "Doen jullie Audi S tronic / DSG tuning?", answer: "Waar relevant adviseren we over TCU/DSG tuning of controle, afhankelijk van uitvoering en doel."},
      {question: "Is Audi 2.0 TDI geschikt voor Stage 1?", answer: "Vaak wel, mits de auto technisch gezond is en DPF/EGR/AdBlue-status klopt."},
      {question: "Kunnen jullie eerst diagnose doen?", answer: "Ja. Diagnose en loganalyse zijn juist belangrijk voor een betrouwbaar advies."}
    ],
    internalLinks: [
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "DPF storing", href: "/nl/dpf-storing"},
      {label: "EGR storing", href: "/nl/egr-storing"},
      {label: "Chiptuning Assen", href: "/nl/chiptuning-assen"}
    ],
    primaryCta: {label: "Controleer jouw Audi in de Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Vraag Audi advies via WhatsApp", href: site.whatsappUrl},
    disclaimer: vehicleSpecificDisclaimer
  },
  {
    locale: "nl",
    slug: "volkswagen-chiptuning",
    status: "draft",
    h1: "Volkswagen chiptuning voor TDI, TSI en GTI",
    metaTitle: "Volkswagen chiptuning | TDI, TSI, GTI en DSG | NoordTune.nl",
    metaDescription:
      "Volkswagen chiptuning met Stage 1, Stage 2 advies, ECU remap, DSG/TCU controle en diagnose voor Golf, Passat, Tiguan en meer.",
    intro:
      "Volkswagen-modellen hebben vaak veel potentie, maar de juiste tuning hangt af van motorfamilie, DSG, onderhoud en softwareversie. Deze draftpagina is klaargezet voor latere publicatie.",
    sections: [
      {
        heading: "Van 2.0 TDI tot Golf GTI",
        body: [
          "Volkswagen TDI-motoren profiteren vaak van meer koppel in het middengebied. TSI- en GTI-motoren vragen extra aandacht voor brandstofkwaliteit, ontsteking, turbodruk en temperatuurbeheer.",
          "Bij DSG-modellen kijken we naar koppelbegrenzers, schakelmomenten en de staat van de transmissie."
        ],
        bullets: ["Golf GTI / R en 2.0 TSI", "Golf, Passat, Tiguan en Transporter TDI", "DSG / TCU afstemming", "Diagnose voor tuning"]
      },
      {
        heading: "Stage 1 voor dagelijkse bruikbaarheid",
        body: [
          "Stage 1 tuning op standaard hardware is vaak de meest verstandige keuze voor dagelijks gebruik. De software moet niet alleen krachtiger zijn, maar ook rustig en voorspelbaar rijden."
        ]
      },
      {
        heading: "Stage 2 alleen met passende hardware",
        body: [
          "Bij Stage 2 beoordelen we of koeling, luchttoevoer, uitlaatdelen waar wettelijk toegestaan en transmissie geschikt zijn. Zonder die basis is meer vermogen niet automatisch beter."
        ]
      },
      {
        heading: "Controleer je Volkswagen eerst online",
        body: [
          "De Power Catalog helpt om snel te zien welke mogelijkheden bekend zijn voor jouw motorvariant. Daarna kan NoordTune gericht adviseren."
        ]
      }
    ],
    faq: [
      {question: "Is DSG tuning nodig bij Volkswagen?", answer: "Niet altijd. Het hangt af van motor, koppel, DSG-type en gewenste rijervaring."},
      {question: "Kan een Golf GTI Stage 1 op standaard hardware?", answer: "Vaak wel, mits de technische staat en brandstofkwaliteit passen bij de gekozen software."},
      {question: "Zijn cataloguswaarden gegarandeerd?", answer: "Nee. Ze zijn indicatief en worden pas definitief na voertuigcontrole."}
    ],
    internalLinks: [
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "Power Catalog", href: site.catalogUrl}
    ],
    primaryCta: {label: "Controleer jouw Volkswagen in de Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "WhatsApp ons voor Volkswagen advies", href: site.whatsappUrl},
    disclaimer: vehicleSpecificDisclaimer
  },
  {
    locale: "nl",
    slug: "mercedes-chiptuning",
    status: "draft",
    h1: "Mercedes chiptuning met rustige krachtopbouw",
    metaTitle: "Mercedes chiptuning | CDI, BlueTEC, AMG-line en automaat | NoordTune.nl",
    metaDescription:
      "Mercedes chiptuning met ECU remap, Stage 1, diagnose, automaat-aandachtspunten en zorgvuldig advies voor diesel en benzine.",
    intro:
      "Mercedes tuning draait vaak om extra koppel, comfort en soepelheid. Deze draftpagina bereidt een toekomstige merkpagina voor zonder deze al publiek te maken.",
    sections: [
      {
        heading: "Comfort en koppel moeten samen kloppen",
        body: [
          "Bij Mercedes-modellen zoals C 220d, E 220d, C 300, GLC en Vito is het doel vaak meer trekkracht zonder het comfortabele karakter te verliezen.",
          "De software moet passen bij automaat, emissiesystemen, koeling, kilometerstand en het gebruik van de auto."
        ],
        bullets: ["CDI / BlueTEC diesel", "benzine turbo-uitvoeringen", "automaat en koppelopbouw", "diagnose en live data"]
      },
      {
        heading: "Stage 1 als betrouwbare basis",
        body: [
          "Stage 1 kan bij veel Mercedes-modellen zorgen voor meer souplesse en betere respons. We houden rekening met transmissielimieten en vermijden overdreven agressieve vermogensafgifte."
        ]
      },
      {
        heading: "Storingen eerst analyseren",
        body: [
          "DPF-, EGR-, AdBlue- of NOx-meldingen vragen diagnose voordat tuningadvies verantwoord is. Oplossingen moeten technisch en juridisch passen bij voertuig, gebruik en regelgeving."
        ]
      },
      {
        heading: "Power Catalog en persoonlijk advies",
        body: [
          "Gebruik de Power Catalog voor een eerste indicatie. Stuur daarna voertuiggegevens via WhatsApp voor advies op maat."
        ]
      }
    ],
    faq: [
      {question: "Is Mercedes diesel tuning geschikt voor dagelijks rijden?", answer: "Vaak wel wanneer de auto technisch gezond is en de software rustig wordt opgebouwd."},
      {question: "Kijken jullie naar AdBlue en NOx-storingen?", answer: "Ja, als diagnose en advies op maat. Software-oplossingen alleen waar wettelijk toegestaan."},
      {question: "Heeft de automaat invloed op het advies?", answer: "Ja. Automaatgedrag, adaptaties en koppelgrenzen zijn belangrijk bij Mercedes tuning."}
    ],
    internalLinks: [
      {label: "AdBlue storing", href: "/nl/adblue-storing"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "ECU remap", href: "/nl/ecu-remap"},
      {label: "Contact", href: "/nl/contact"}
    ],
    primaryCta: {label: "Controleer jouw Mercedes in de Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Vraag Mercedes advies via WhatsApp", href: site.whatsappUrl},
    disclaimer: vehicleSpecificDisclaimer
  }
];

export const seoArticleDrafts: SeoArticleDraft[] = [
  {
    locale: "nl",
    slug: "wat-is-ecu-remap",
    status: "draft",
    title: "Wat is ECU remap?",
    metaTitle: "Wat is ECU remap? Software aanpassen zonder giswerk",
    metaDescription: "ECU remap uitgelegd: wat verandert er in de motorsoftware, waarom diagnose telt en wanneer maatwerk belangrijk is.",
    category: "Kennisbank",
    intent: "Educatief artikel voor klanten die chiptuning en ECU remap vergelijken.",
    sections: [
      {heading: "ECU remap in gewone taal", body: ["Een ECU remap is het aanpassen van de software in de motorcomputer. Denk aan koppelvraag, turbodruk, inspuiting, ontsteking, begrenzers en beveiligingsstrategieën.", "De beste remap voelt niet kunstmatig hard, maar maakt de motor sterker en voorspelbaarder in het gebied waar je daadwerkelijk rijdt."]},
      {heading: "Waarom diagnose vooraf telt", body: ["Software aanpassen zonder te weten hoe de auto technisch reageert is niet verstandig. Foutcodes, live data en onderhoudsstaat bepalen of tuning verantwoord is."], bullets: ["controle van foutcodes", "live data bij twijfel", "advies op basis van motorvariant", "Power Catalog als eerste indicatie"]},
      {heading: "Wanneer is maatwerk echt nodig?", body: ["Bij afwijkende hardware, automaat/DSG, eerdere tuning, storingen of Stage 2 is maatwerk en loganalyse belangrijker dan een standaardbestand."]}
    ],
    faq: [
      {question: "Is ECU remap hetzelfde als chiptuning?", answer: "In de praktijk vaak wel. ECU remap beschrijft specifieker dat de motorsoftware wordt aangepast."},
      {question: "Kan elke auto geremapt worden?", answer: "Niet elke ECU of technische staat is geschikt. Controleer eerst de Power Catalog en vraag advies."}
    ],
    internalLinks: [
      {label: "ECU remap", href: "/nl/ecu-remap"},
      {label: "Chiptuning", href: "/nl/chiptuning"},
      {label: "Auto diagnose", href: "/nl/auto-diagnose"}
    ],
    primaryCta: {label: "Open Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "WhatsApp ons", href: site.whatsappUrl}
  },
  {
    locale: "nl",
    slug: "chiptuning-met-automaat-waar-moet-je-op-letten",
    status: "draft",
    title: "Chiptuning met automaat: waar moet je op letten?",
    metaTitle: "Chiptuning met automaat | Koppel, TCU en rijgedrag",
    metaDescription: "Waar moet je op letten bij chiptuning met automaat, DSG of ZF? Lees over koppelgrenzen, TCU tuning en diagnose.",
    category: "Transmissie",
    intent: "Klanten met automaat of DSG helpen begrijpen waarom transmissiecontrole belangrijk is.",
    sections: [
      {heading: "Extra koppel komt ook bij de transmissie terecht", body: ["Bij automaten, DSG en ZF-transmissies moet de software rekening houden met koppelgrenzen, slip, temperatuur en schakellogica.", "Een sterke tuning die niet prettig schakelt, is geen goede tuning. Motorsoftware en transmissiegedrag moeten samenwerken."]},
      {heading: "Wanneer TCU tuning relevant wordt", body: ["TCU tuning kan relevant zijn als de transmissie begrenst, traag reageert of niet logisch schakelt met de nieuwe koppelopbouw. Niet elke auto heeft dit nodig."], bullets: ["DSG / S tronic", "ZF automaat", "koppelbegrenzers", "schakelmomenten en adaptaties"]},
      {heading: "Diagnose en proefrit", body: ["Vooral bij hogere kilometerstanden of zware belasting is controle op slip, foutcodes en onderhoudsgeschiedenis verstandig."]}
    ],
    faq: [
      {question: "Is tuning slecht voor een automaat?", answer: "Niet wanneer de software binnen realistische grenzen blijft en de transmissie gezond is."},
      {question: "Moet mijn DSG altijd getuned worden?", answer: "Nee. Het hangt af van DSG-type, koppel en gewenste rijervaring."}
    ],
    internalLinks: [
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Loganalyse", href: "/nl/loganalyse"}
    ],
    primaryCta: {label: "Controleer jouw auto", href: site.catalogUrl},
    secondaryCta: {label: "Vraag advies via WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "nl",
    slug: "wanneer-is-stage-2-tuning-verstandig",
    status: "draft",
    title: "Wanneer is Stage 2 tuning verstandig?",
    metaTitle: "Wanneer Stage 2 tuning verstandig is | Hardware en controle",
    metaDescription: "Stage 2 tuning vraagt meer dan software. Lees wanneer hardware, loganalyse en wettelijke zorgvuldigheid belangrijk zijn.",
    category: "Stage 2",
    intent: "Uitleg voor klanten die twijfelen tussen Stage 1 en Stage 2.",
    sections: [
      {heading: "Stage 2 is geen standaard upgrade", body: ["Stage 2 hoort bij een auto met passende ondersteunende hardware en een technische basis die de extra belasting aankan.", "Zonder goede koeling, luchttoevoer, brandstofvoorziening of transmissiecontrole kan Stage 2 juist minder betrouwbaar worden."]},
      {heading: "Meetwaarden bepalen de veilige marge", body: ["Loganalyse laat zien hoe turbodruk, luchtmassa, temperaturen, brandstofdruk en correcties zich gedragen onder belasting. Dat voorkomt tuning op aannames."], bullets: ["hardware passend bij doel", "logcontrole", "realistische koppelopbouw", "juridisch zorgvuldige emissiewording"]},
      {heading: "Wanneer Stage 1 slimmer is", body: ["Bij dagelijks gebruik, standaard hardware of twijfel over onderhoud is Stage 1 vaak de betere keuze. Eerlijk advies is belangrijker dan een hoger getal."]}
    ],
    faq: [
      {question: "Kan Stage 2 zonder hardware?", answer: "Meestal niet verstandig. Stage 2 moet passen bij de hardware en technische staat."},
      {question: "Is Stage 2 legaal?", answer: "Dat hangt af van onderdelen, voertuiggebruik en regelgeving. Emissiegerelateerde wijzigingen vragen extra zorgvuldigheid."}
    ],
    internalLinks: [
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Stage 1 vs Stage 2", href: "/nl/blog/stage-1-vs-stage-2"}
    ],
    primaryCta: {label: "Bekijk tuningmogelijkheden", href: site.catalogUrl},
    secondaryCta: {label: "WhatsApp ons", href: site.whatsappUrl}
  },
  {
    locale: "nl",
    slug: "waarom-loganalyse-belangrijk-is-voor-tuning",
    status: "draft",
    title: "Waarom loganalyse belangrijk is vóór tuning",
    metaTitle: "Waarom loganalyse belangrijk is voor tuning | NoordTune.nl",
    metaDescription: "Loganalyse maakt verborgen problemen zichtbaar en helpt veilige softwaremarges kiezen voor Stage 1, Stage 2 en diagnose.",
    category: "Diagnose",
    intent: "Loganalyse positioneren als technisch vertrouwen en niet als overbodige extra.",
    sections: [
      {heading: "Rijdende data vertelt meer dan stationair uitlezen", body: ["Sommige problemen zie je pas onder belasting. Loganalyse toont hoe de motor reageert bij accelereren, schakelen en temperatuurontwikkeling."]},
      {heading: "Welke waarden tellen?", body: ["Afhankelijk van voertuig kijken we naar turbodruk, luchtmassa, brandstofdruk, ontsteking, injectiecorrecties, temperaturen en transmissiewaarden."], bullets: ["turbodruk versus gevraagd", "brandstofdruk", "temperaturen", "koppel- en transmissielimieten"]},
      {heading: "Eerst meten, dan tunen", body: ["Een nette log voorkomt dat software een bestaand probleem verbergt. Dat maakt de uiteindelijke tuning beter en eerlijker."]}
    ],
    faq: [
      {question: "Is loganalyse altijd nodig?", answer: "Niet altijd uitgebreid, maar bij twijfel, Stage 2 of klachten is het sterk aan te raden."},
      {question: "Kan loganalyse ook na tuning?", answer: "Ja. Het is nuttig om het resultaat te controleren of afwijkingen te onderzoeken."}
    ],
    internalLinks: [
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Diagnose vóór tuning", href: "/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is"}
    ],
    primaryCta: {label: "Open Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Plan diagnose via WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "nl",
    slug: "dsg-tcu-tuning-uitgelegd",
    status: "draft",
    title: "DSG / TCU tuning uitgelegd",
    metaTitle: "DSG / TCU tuning uitgelegd | Schakelen en koppelgrenzen",
    metaDescription: "Wat doet DSG of TCU tuning? Lees over schakelmomenten, koppelbegrenzers, rijgedrag en wanneer het zinvol is.",
    category: "Transmissie",
    intent: "Klanten uitleggen dat transmissiesoftware de motorremap kan ondersteunen.",
    sections: [
      {heading: "De TCU bepaalt hoe de transmissie reageert", body: ["Bij veel automaten en DSG-systemen bepaalt de transmissiecomputer hoe snel, wanneer en met welk koppel er geschakeld wordt."]},
      {heading: "Waarom dit bij tuning telt", body: ["Als de motor meer koppel levert, moet de transmissie daar logisch mee omgaan. Soms blijven fabriekslimieten actief of voelt schakelen minder passend."], bullets: ["koppelbegrenzers", "schakellogica", "launch/drive modes waar relevant", "temperatuur en slipcontrole"]},
      {heading: "Niet altijd nodig, wel vaak relevant", body: ["NoordTune adviseert TCU tuning alleen wanneer het iets toevoegt aan betrouwbaarheid, comfort of prestaties."]}
    ],
    faq: [
      {question: "Is DSG tuning verplicht bij Stage 1?", answer: "Nee, maar het kan relevant zijn afhankelijk van motor, DSG-type en koppel."},
      {question: "Verandert het comfort?", answer: "Goede TCU tuning moet juist beter passen bij het voertuig en gebruik."}
    ],
    internalLinks: [
      {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
      {label: "Chiptuning met automaat", href: "/nl/blog/chiptuning-met-automaat-waar-moet-je-op-letten"},
      {label: "Prijzen", href: "/nl/prijzen"}
    ],
    primaryCta: {label: "Controleer jouw auto", href: site.catalogUrl},
    secondaryCta: {label: "Vraag transmissieadvies", href: site.whatsappUrl}
  },
  {
    locale: "nl",
    slug: "dpf-egr-of-adblue-storing-wat-nu",
    status: "draft",
    title: "DPF, EGR of AdBlue storing: wat nu?",
    metaTitle: "DPF, EGR of AdBlue storing | Diagnose en advies",
    metaDescription: "Wat kun je doen bij een DPF, EGR of AdBlue storing? Lees waarom diagnose, live data en wettelijke zorgvuldigheid belangrijk zijn.",
    category: "Diagnose",
    intent: "Klanten met emissiesysteemstoringen helpen zonder illegale beloftes.",
    sections: [
      {heading: "Een melding is nog geen diagnose", body: ["DPF-, EGR- en AdBlue-storingen kunnen veel oorzaken hebben: sensoren, drukverschil, NOx-waarden, temperatuur, vervuiling, softwarecondities of mechanische problemen."]},
      {heading: "Zorgvuldig en wettelijk toegestaan", body: ["NoordTune bespreekt diagnose, storing analyse, advies en software-oplossingen alleen waar wettelijk toegestaan. De juiste route hangt af van voertuig, gebruik en lokale regelgeving."], bullets: ["foutcodes uitlezen", "live data controleren", "oorzaak bepalen", "advies op maat"]},
      {heading: "Niet te lang doorrijden", body: ["Sommige meldingen leiden tot noodloop of startbeperking. Vroege diagnose voorkomt vaak onnodige kosten."]}
    ],
    faq: [
      {question: "Kunnen jullie DPF/EGR/AdBlue storingen oplossen?", answer: "We starten met diagnose en advies. Oplossingen hangen af van voertuig en wettelijke mogelijkheden."},
      {question: "Is software altijd de juiste oplossing?", answer: "Nee. Vaak is mechanische of elektrische controle eerst nodig."}
    ],
    internalLinks: [
      {label: "DPF storing", href: "/nl/dpf-storing"},
      {label: "EGR storing", href: "/nl/egr-storing"},
      {label: "AdBlue storing", href: "/nl/adblue-storing"}
    ],
    primaryCta: {label: "Controleer jouw auto", href: site.catalogUrl},
    secondaryCta: {label: "WhatsApp storing door", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "what-is-ecu-remap",
    status: "draft",
    title: "What is ECU remap?",
    metaTitle: "What is ECU remap? Engine software explained",
    metaDescription: "A clear explanation of ECU remap, diagnostics, realistic margins and vehicle-specific tuning advice.",
    category: "Knowledge base",
    intent: "English translation structure for future publication.",
    sections: [
      {heading: "ECU remap in simple terms", body: ["An ECU remap adjusts the engine control software: torque request, boost, fuel, ignition and protection strategies."]},
      {heading: "Diagnostics first", body: ["Fault codes, live data and condition help decide whether tuning is responsible."]},
      {heading: "Custom advice", body: ["Final tuning depends on the exact vehicle, engine, ECU, gearbox and use."]}
    ],
    faq: [
      {question: "Is ECU remap the same as chiptuning?", answer: "They are often used together; ECU remap is the more technical description."}
    ],
    internalLinks: [
      {label: "Chiptuning", href: "/en/chiptuning"},
      {label: "Diagnostics", href: "/en/car-diagnostics"}
    ],
    primaryCta: {label: "Open Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "chiptuning-with-automatic-gearbox",
    status: "draft",
    title: "Chiptuning with an automatic gearbox",
    metaTitle: "Chiptuning with automatic gearbox | TCU and torque limits",
    metaDescription: "What to check before tuning an automatic, DSG or ZF gearbox vehicle.",
    category: "Transmission",
    intent: "English translation structure for automatic/TCU article.",
    sections: [
      {heading: "Torque also reaches the gearbox", body: ["More engine torque must stay within sensible gearbox limits."]},
      {heading: "TCU tuning can matter", body: ["Some cars benefit from gearbox software checks or TCU tuning, but not every car needs it."]},
      {heading: "Measure before deciding", body: ["Fault codes, shift behaviour and temperature history should guide the advice."]}
    ],
    faq: [
      {question: "Is tuning bad for an automatic?", answer: "Not when condition, torque and calibration are handled responsibly."}
    ],
    internalLinks: [
      {label: "Services", href: "/en/services"},
      {label: "Pricing", href: "/en/pricing"}
    ],
    primaryCta: {label: "Check tuning options", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "when-is-stage-2-tuning-sensible",
    status: "draft",
    title: "When is Stage 2 tuning sensible?",
    metaTitle: "When Stage 2 tuning makes sense | Hardware and logging",
    metaDescription: "Stage 2 tuning requires supporting hardware, logging and realistic advice.",
    category: "Stage 2",
    intent: "English translation structure for Stage 2 decision article.",
    sections: [
      {heading: "Stage 2 is not just software", body: ["It should match the hardware, cooling, fuel and transmission limits."]},
      {heading: "Logging protects the result", body: ["Boost, fuel pressure and temperatures show whether the setup is ready."]},
      {heading: "Stage 1 can be the better answer", body: ["For many daily cars, Stage 1 remains the best balance."]}
    ],
    faq: [
      {question: "Can Stage 2 be done on standard hardware?", answer: "Usually that is not the responsible route."}
    ],
    internalLinks: [
      {label: "Stage 1 vs Stage 2", href: "/en/news-blog/stage-1-vs-stage-2"},
      {label: "Chiptuning", href: "/en/chiptuning"}
    ],
    primaryCta: {label: "Open Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "why-log-analysis-matters-before-tuning",
    status: "draft",
    title: "Why log analysis matters before tuning",
    metaTitle: "Why log analysis matters before tuning | NoordTune.nl",
    metaDescription: "Logging helps find hidden issues and choose safe software margins.",
    category: "Diagnostics",
    intent: "English translation structure for log analysis article.",
    sections: [
      {heading: "Road data shows real behaviour", body: ["Some problems only appear under load, not at idle."]},
      {heading: "Useful values", body: ["Boost, air mass, fuel pressure, temperatures and gearbox values all help."]},
      {heading: "Measure first, tune second", body: ["Better data leads to better advice."]}
    ],
    faq: [
      {question: "Is logging always required?", answer: "Not always, but it is valuable for Stage 2, complaints or complex setups."}
    ],
    internalLinks: [
      {label: "Diagnostics", href: "/en/car-diagnostics"},
      {label: "Why diagnostics matter", href: "/en/news-blog/why-diagnostics-before-tuning-matter"}
    ],
    primaryCta: {label: "Check tuning options", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "dsg-tcu-tuning-explained",
    status: "draft",
    title: "DSG / TCU tuning explained",
    metaTitle: "DSG / TCU tuning explained | Shift logic and torque limits",
    metaDescription: "How gearbox software can support ECU remap and drivability.",
    category: "Transmission",
    intent: "English translation structure for DSG/TCU article.",
    sections: [
      {heading: "The TCU controls gearbox behaviour", body: ["Shift points, torque limits and clutch logic can influence the result."]},
      {heading: "Why it matters after tuning", body: ["The gearbox should match the new torque delivery."]},
      {heading: "Advice only when useful", body: ["TCU tuning is recommended when it improves reliability, comfort or performance."]}
    ],
    faq: [
      {question: "Does every DSG need tuning?", answer: "No. It depends on the gearbox type, torque and goal."}
    ],
    internalLinks: [
      {label: "Services", href: "/en/services"},
      {label: "Chiptuning", href: "/en/chiptuning"}
    ],
    primaryCta: {label: "Open Power Catalog", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "en",
    slug: "dpf-egr-or-adblue-fault-what-now",
    status: "draft",
    title: "DPF, EGR or AdBlue fault: what now?",
    metaTitle: "DPF, EGR or AdBlue fault | Diagnostics and legal advice",
    metaDescription: "A careful route for emissions-related faults: diagnostics, live data and legal advice.",
    category: "Diagnostics",
    intent: "English translation structure for emissions-fault article.",
    sections: [
      {heading: "A warning is not a full diagnosis", body: ["DPF, EGR and AdBlue warnings can have many different causes."]},
      {heading: "Legal and careful wording", body: ["Software solutions are discussed only where legally permitted and vehicle-appropriate."]},
      {heading: "Do not wait too long", body: ["Some warnings can lead to limp mode or start restrictions."]}
    ],
    faq: [
      {question: "Is software always the answer?", answer: "No. Mechanical and electrical diagnosis often comes first."}
    ],
    internalLinks: [
      {label: "Diagnostics", href: "/en/car-diagnostics"},
      {label: "AdBlue fault explained", href: "/en/news-blog/adblue-fault-explained"}
    ],
    primaryCta: {label: "Check tuning options", href: site.catalogUrl},
    secondaryCta: {label: "Message us on WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "co-to-jest-remap-ecu",
    status: "draft",
    title: "Co to jest remap ECU?",
    metaTitle: "Co to jest remap ECU? Oprogramowanie silnika bez zgadywania",
    metaDescription: "Wyjaśnienie remapu ECU, diagnostyki, rozsądnych marginesów i indywidualnego doradztwa.",
    category: "Baza wiedzy",
    intent: "Polska struktura przyszłego artykułu o remapie ECU.",
    sections: [
      {heading: "Remap ECU prostym językiem", body: ["Remap ECU to zmiana oprogramowania sterownika silnika: momentu, doładowania, paliwa, zapłonu i strategii ochronnych."]},
      {heading: "Najpierw diagnostyka", body: ["Kody błędów, live data i stan auta pomagają ocenić, czy tuning jest rozsądny."]},
      {heading: "Indywidualna porada", body: ["Finalna decyzja zależy od konkretnego auta, silnika, ECU, skrzyni i sposobu jazdy."]}
    ],
    faq: [
      {question: "Czy remap ECU to chiptuning?", answer: "W praktyce często tak. Remap ECU dokładniej opisuje zmianę programu sterownika."}
    ],
    internalLinks: [
      {label: "Chiptuning", href: "/pl/chiptuning"},
      {label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}
    ],
    primaryCta: {label: "Otwórz katalog mocy", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "chiptuning-z-automatem-na-co-uwazac",
    status: "draft",
    title: "Chiptuning z automatem: na co uważać?",
    metaTitle: "Chiptuning z automatem | TCU, DSG i limity momentu",
    metaDescription: "Co sprawdzić przed tuningiem auta z automatem, DSG lub ZF.",
    category: "Skrzynia biegów",
    intent: "Polska struktura artykułu o automacie i TCU.",
    sections: [
      {heading: "Moment trafia też do skrzyni", body: ["Większy moment musi mieścić się w rozsądnych limitach skrzyni."]},
      {heading: "TCU może mieć znaczenie", body: ["Nie każde auto tego wymaga, ale czasem kontrola lub tuning TCU poprawia współpracę z silnikiem."]},
      {heading: "Decyzja po sprawdzeniu", body: ["Błędy, zachowanie skrzyni i temperatura pracy powinny prowadzić poradę."]}
    ],
    faq: [
      {question: "Czy tuning szkodzi automatowi?", answer: "Nie, jeśli stan auta, moment i kalibracja są dobrane odpowiedzialnie."}
    ],
    internalLinks: [
      {label: "Usługi", href: "/pl/uslugi"},
      {label: "Cennik", href: "/pl/cennik"}
    ],
    primaryCta: {label: "Sprawdź możliwości auta", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "kiedy-stage-2-ma-sens",
    status: "draft",
    title: "Kiedy Stage 2 tuning ma sens?",
    metaTitle: "Kiedy Stage 2 ma sens | Osprzęt i logi",
    metaDescription: "Stage 2 wymaga osprzętu, logów i rozsądnej porady.",
    category: "Stage 2",
    intent: "Polska struktura artykułu pomagającego wybrać Stage 1 lub Stage 2.",
    sections: [
      {heading: "Stage 2 to nie tylko program", body: ["Musi pasować do osprzętu, chłodzenia, paliwa i limitów skrzyni."]},
      {heading: "Logi chronią efekt", body: ["Doładowanie, paliwo i temperatury pokazują, czy zestaw jest gotowy."]},
      {heading: "Stage 1 bywa lepszy", body: ["Dla wielu aut codziennych Stage 1 pozostaje najlepszym kompromisem."]}
    ],
    faq: [
      {question: "Czy Stage 2 można zrobić na serii?", answer: "Zwykle nie jest to odpowiedzialna droga."}
    ],
    internalLinks: [
      {label: "Stage 1 vs Stage 2", href: "/pl/aktualnosci-blog/stage-1-vs-stage-2"},
      {label: "Chiptuning", href: "/pl/chiptuning"}
    ],
    primaryCta: {label: "Otwórz katalog mocy", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "dlaczego-analiza-logow-przed-tuningiem-jest-wazna",
    status: "draft",
    title: "Dlaczego analiza logów przed tuningiem jest ważna?",
    metaTitle: "Analiza logów przed tuningiem | NoordTune.nl",
    metaDescription: "Logi pomagają znaleźć ukryte problemy i dobrać bezpieczne marginesy programu.",
    category: "Diagnostyka",
    intent: "Polska struktura artykułu o logach.",
    sections: [
      {heading: "Dane z jazdy pokazują realne zachowanie", body: ["Niektóre problemy widać dopiero pod obciążeniem."]},
      {heading: "Wartości, które mają znaczenie", body: ["Doładowanie, przepływ powietrza, paliwo, temperatury i skrzynia pomagają w ocenie."]},
      {heading: "Najpierw mierzymy, potem modyfikujemy", body: ["Lepsze dane dają lepszą poradę."]}
    ],
    faq: [
      {question: "Czy logi są zawsze konieczne?", answer: "Nie zawsze, ale są bardzo pomocne przy Stage 2, usterkach i nietypowych konfiguracjach."}
    ],
    internalLinks: [
      {label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"},
      {label: "Diagnostyka przed tuningiem", href: "/pl/aktualnosci-blog/dlaczego-diagnostyka-przed-tuningiem-jest-wazna"}
    ],
    primaryCta: {label: "Sprawdź możliwości auta", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "dsg-tcu-tuning-wyjasnienie",
    status: "draft",
    title: "DSG / TCU tuning wyjaśniony",
    metaTitle: "DSG / TCU tuning | Zmiana biegów i limity momentu",
    metaDescription: "Jak oprogramowanie skrzyni może wspierać remap ECU i komfort jazdy.",
    category: "Skrzynia biegów",
    intent: "Polska struktura artykułu o DSG/TCU.",
    sections: [
      {heading: "TCU steruje zachowaniem skrzyni", body: ["Punkty zmiany biegów, limity momentu i praca sprzęgieł wpływają na efekt."]},
      {heading: "Dlaczego to ważne po tuningu", body: ["Skrzynia powinna pasować do nowego przebiegu momentu."]},
      {heading: "Tylko gdy ma sens", body: ["TCU tuning ma wartość wtedy, gdy poprawia trwałość, komfort lub osiągi."]}
    ],
    faq: [
      {question: "Czy każde DSG wymaga tuningu?", answer: "Nie. Zależy od typu skrzyni, momentu i celu."}
    ],
    internalLinks: [
      {label: "Usługi", href: "/pl/uslugi"},
      {label: "Chiptuning", href: "/pl/chiptuning"}
    ],
    primaryCta: {label: "Otwórz katalog mocy", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  },
  {
    locale: "pl",
    slug: "dpf-egr-lub-adblue-co-teraz",
    status: "draft",
    title: "DPF, EGR lub AdBlue: co teraz?",
    metaTitle: "DPF, EGR lub AdBlue | Diagnostyka i legalna porada",
    metaDescription: "Ostrożna ścieżka przy usterkach emisji: diagnostyka, live data i legalne doradztwo.",
    category: "Diagnostyka",
    intent: "Polska struktura artykułu o usterkach emisji bez nielegalnych obietnic.",
    sections: [
      {heading: "Komunikat to nie pełna diagnoza", body: ["DPF, EGR i AdBlue mogą mieć wiele różnych przyczyn."]},
      {heading: "Ostrożnie i zgodnie z przepisami", body: ["Rozwiązania programowe omawiamy tylko tam, gdzie jest to prawnie dozwolone i pasuje do auta."]},
      {heading: "Nie zwlekaj z kontrolą", body: ["Niektóre komunikaty prowadzą do trybu awaryjnego lub ograniczeń rozruchu."]}
    ],
    faq: [
      {question: "Czy program zawsze rozwiązuje problem?", answer: "Nie. Często najpierw potrzebna jest diagnostyka mechaniczna lub elektryczna."}
    ],
    internalLinks: [
      {label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"},
      {label: "Usterka AdBlue", href: "/pl/aktualnosci-blog/usterka-adblue-wyjasnienie"}
    ],
    primaryCta: {label: "Sprawdź możliwości auta", href: site.catalogUrl},
    secondaryCta: {label: "Napisz na WhatsApp", href: site.whatsappUrl}
  }
];
