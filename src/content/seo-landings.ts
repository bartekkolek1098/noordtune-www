import type {FaqItem, PageHeroCopy, SeoCopy, TextBlock} from "@/content/copy";
import {pathFor, type Locale, type PageKey} from "@/content/site";

export type SeoLanding = {
  key: string;
  locale: Locale;
  slug: string;
  parentKey: PageKey;
  heroImage: string;
  seo: SeoCopy;
  hero: PageHeroCopy;
  sections: TextBlock[];
  faqs: FaqItem[];
  related: Array<{label: string; href: string}>;
};

export type PreparedSeoPage = {
  slug: string;
  title: string;
  focus: string;
  status: "prepared";
};

export const seoLandings: SeoLanding[] = [
  {
    key: "chiptuning-assen",
    locale: "nl",
    slug: "chiptuning-assen",
    parentKey: "chiptuning",
    heroImage: "/images/sections/obd-reprogramming.webp",
    seo: {
      title: "Chiptuning Assen | ECU Remap op Maat | NoordTune.nl",
      description:
        "Chiptuning Assen door NoordTune.nl: ECU remap op maat, Stage 1 tuning, diagnose vooraf en advies voor auto's in Assen, Drenthe en Groningen."
    },
    hero: {
      eyebrow: "Chiptuning Assen",
      title: ["ECU remap", "op maat in Assen"],
      intro:
        "Voor meer vermogen, meer koppel en een auto die beter reageert zonder loze beloftes of standaardbestanden.",
      primary: "Controleer jouw auto",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Lokale specialist",
        title: "Chiptuning in Assen met diagnose als startpunt.",
        text:
          "NoordTune.nl werkt vanuit Assen voor klanten in Drenthe, Groningen en Noord-Nederland. Wij zien chiptuning niet als een snelle file-upload, maar als een technische aanpassing aan een specifiek voertuig. Daarom kijken we naar motorvariant, ECU type, transmissie, onderhoudsstaat, brandstofkwaliteit en het doel van de auto: dagelijks rijden, caravan trekken, zakelijk gebruik of sportiever rijden.",
        bullets: [
          "ECU remap Assen voor benzine- en dieselmotoren",
          "Stage 1 tuning voor standaard hardware",
          "Controle van foutcodes en technische basis",
          "Advies over DSG / TCU tuning wanneer relevant"
        ],
        image: "/images/sections/ecu-bench-red.png"
      },
      {
        kicker: "Veilige marges",
        title: "Meer vermogen moet logisch blijven voor motor en transmissie.",
        text:
          "Een nette tuning voelt krachtiger, maar blijft voorspelbaar. We vermijden extreme claims en stemmen software af op de grenzen van turbo, koppeling, automaat, koeling en injectiesysteem. Bij twijfel adviseren we eerst diagnose of loganalyse, zodat bestaande problemen niet worden gemaskeerd door nieuwe software.",
        bullets: ["Geen onnodig harde vermogensafgifte", "Aandacht voor koppelopbouw", "Realistische resultaten per motorvariant"]
      },
      {
        kicker: "Power Catalog",
        title: "Begin met een indicatie voor jouw exacte auto.",
        text:
          "Via de NoordTune Power Catalog kun je snel zien welke tuningmogelijkheden bekend zijn voor jouw voertuig. Nederlandse auto's kunnen via RDW-gegevens worden herkend; buitenlandse voertuigen kun je handmatig selecteren. Daarna geven we persoonlijk advies op basis van jouw situatie."
      }
    ],
    faqs: [
      {
        question: "Wat kost chiptuning in Assen?",
        answer:
          "Stage 1 tuning start bij NoordTune.nl vanaf €649 incl. btw. De definitieve prijs hangt af van ECU type, leesmethode, motorvariant, softwareversie en eventuele extra diagnose of loganalyse."
      },
      {
        question: "Is Stage 1 tuning geschikt voor mijn auto?",
        answer:
          "Vaak wel wanneer de auto technisch gezond is en standaard hardware heeft. We kijken naar foutcodes, onderhoudsstaat en motorvariant voordat we definitief adviseren."
      },
      {
        question: "Kan ik eerst mijn auto online controleren?",
        answer:
          "Ja. Gebruik de Power Catalog voor een eerste indicatie van vermogen, koppel en prijs. Definitief advies blijft afhankelijk van jouw exacte voertuig."
      }
    ],
    related: [
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Chiptuning Drenthe", href: "/nl/chiptuning-drenthe"},
      {label: "Prijzen bekijken", href: pathFor("nl", "prijzen")}
    ]
  },
  {
    key: "chiptuning-drenthe",
    locale: "nl",
    slug: "chiptuning-drenthe",
    parentKey: "chiptuning",
    heroImage: "/images/sections/ecu-bench-red.png",
    seo: {
      title: "Chiptuning Drenthe | Stage 1 & ECU Remap | NoordTune.nl",
      description:
        "Chiptuning Drenthe met maatwerk ECU remap, Stage 1 en Stage 2 advies vanuit Assen. NoordTune.nl helpt auto's uit heel Noord-Nederland."
    },
    hero: {
      eyebrow: "Chiptuning Drenthe",
      title: ["Maatwerk tuning", "voor Drenthe"],
      intro:
        "Van Assen tot Hoogeveen, Emmen en Beilen: software op maat met diagnose, uitleg en realistische verwachtingen.",
      primary: "Bekijk tuningmogelijkheden",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Noord-Nederland",
        title: "Een tuningadres in Drenthe dat verder kijkt dan pk's.",
        text:
          "Veel auto's hebben ruimte voor meer vermogen en koppel, maar niet iedere auto vraagt dezelfde aanpak. NoordTune.nl helpt bestuurders in Drenthe met een nuchtere combinatie van chiptuning, auto diagnose en loganalyse. We letten op bruikbaarheid, betrouwbaarheid en rijgevoel in plaats van alleen een hoog getal op papier.",
        bullets: ["Chiptuning Drenthe vanuit Assen", "Persoonlijk advies per voertuig", "Geschikt voor dagelijks en zakelijk gebruik"],
        image: "/images/sections/obd-reprogramming.webp"
      },
      {
        kicker: "Stage 1 en Stage 2",
        title: "Duidelijk verschil tussen standaard auto en aangepaste hardware.",
        text:
          "Stage 1 tuning is bedoeld voor auto's zonder hardware-aanpassingen. Stage 2 tuning kan interessant zijn wanneer er ondersteunende hardware aanwezig is, maar vraagt ook extra controle. Denk aan luchtmassa, turbodruk, temperaturen, brandstofdruk en transmissielimieten."
      },
      {
        kicker: "Diagnose vooraf",
        title: "Eerst zeker weten dat de technische basis klopt.",
        text:
          "Bij vermogensverlies, foutcodes, rook, noodloop of onrustig schakelgedrag adviseren we eerst diagnose of loganalyse. Dat voorkomt dat tuning een bestaand probleem verbergt en maakt de uiteindelijke softwarekeuze betrouwbaarder."
      }
    ],
    faqs: [
      {
        question: "Werkt NoordTune.nl voor heel Drenthe?",
        answer:
          "Ja. NoordTune.nl werkt vanuit Assen en helpt klanten uit onder andere Assen, Hoogeveen, Emmen, Beilen, Meppel en omliggende plaatsen."
      },
      {
        question: "Moet mijn auto eerst op de testbank?",
        answer:
          "Dat hangt af van voertuig en doel. Voor veel Stage 1 trajecten is diagnose en controle voldoende; bij complexere situaties kan loganalyse of extra meting zinvol zijn."
      },
      {
        question: "Kan ik ook alleen advies krijgen?",
        answer:
          "Ja. Je kunt via WhatsApp je kenteken, motorvariant of storing sturen voor een eerste richting."
      }
    ],
    related: [
      {label: "Chiptuning Assen", href: "/nl/chiptuning-assen"},
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Contact", href: pathFor("nl", "contact")}
    ]
  },
  {
    key: "chiptuning-groningen",
    locale: "nl",
    slug: "chiptuning-groningen",
    parentKey: "chiptuning",
    heroImage: "/images/sections/autotuner-bench.webp",
    seo: {
      title: "Chiptuning Groningen | ECU Remap vlakbij Groningen | NoordTune.nl",
      description:
        "Chiptuning voor Groningen en Noord-Nederland. NoordTune.nl in Assen levert ECU remap, Stage 1 tuning, Stage 2 advies en auto diagnose."
    },
    hero: {
      eyebrow: "Chiptuning Groningen",
      title: ["Meer respons", "vlakbij Groningen"],
      intro:
        "Voor bestuurders uit Groningen die een technische, zorgvuldige aanpak zoeken voor ECU remap en diagnose.",
      primary: "Controleer jouw auto",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Regio Groningen",
        title: "Een korte rit naar Assen voor tuning met aandacht.",
        text:
          "NoordTune.nl ligt praktisch voor klanten uit Groningen, Haren, Hoogezand, Veendam, Stadskanaal en omgeving. We combineren tuning met diagnose en duidelijke uitleg, zodat je weet wat er aan je auto gebeurt en waarom een bepaalde oplossing past.",
        bullets: ["ECU remap voor Groningen", "Diagnose en loganalyse mogelijk", "Power Catalog voor eerste indicatie"],
        image: "/images/sections/autotuner-bench.webp"
      },
      {
        kicker: "Rijgedrag",
        title: "Niet alleen sneller, vooral fijner rijden.",
        text:
          "Een goede remap geeft meer trekkracht in het bruikbare toerengebied, betere gaspedaalrespons en vaak meer rust bij normaal rijden. Dat maakt tuning interessant voor dagelijkse auto's, zakelijke rijders en liefhebbers die hun auto net scherper willen maken."
      },
      {
        kicker: "Zekerheid",
        title: "Realistisch advies als de auto eerst aandacht nodig heeft.",
        text:
          "Als diagnose laat zien dat sensoren, turbodruk, EGR, DPF, AdBlue of transmissiegedrag niet kloppen, bespreken we eerst de juiste vervolgstap. Een gezonde basis blijft belangrijker dan direct tunen."
      }
    ],
    faqs: [
      {
        question: "Is NoordTune.nl bereikbaar vanuit Groningen?",
        answer:
          "Ja. De werkplaats in Assen is goed bereikbaar vanuit Groningen en omliggende plaatsen in Noord-Nederland."
      },
      {
        question: "Kan ik mijn kenteken vooraf sturen?",
        answer:
          "Graag. Stuur je kenteken of motorcode via WhatsApp, of controleer de auto eerst in de Power Catalog."
      },
      {
        question: "Doen jullie ook diagnose bij storing?",
        answer:
          "Ja. Auto diagnose en loganalyse zijn juist belangrijk wanneer er storingen of twijfel over de technische staat zijn."
      }
    ],
    related: [
      {label: "Auto diagnose", href: pathFor("nl", "diagnose")},
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Prijzen", href: pathFor("nl", "prijzen")},
      {label: "Resultaten", href: pathFor("nl", "resultaten")}
    ]
  },
  {
    key: "auto-diagnose-assen",
    locale: "nl",
    slug: "auto-diagnose-assen",
    parentKey: "diagnose",
    heroImage: "/images/sections/bmw-diagnostics.jpg",
    seo: {
      title: "Auto Diagnose Assen | Foutcodes, Live Data & Loganalyse",
      description:
        "Auto diagnose Assen voor foutcodes, live data, loganalyse, DPF storing, EGR storing en AdBlue storing. NoordTune.nl zoekt gericht naar de oorzaak."
    },
    hero: {
      eyebrow: "Auto diagnose Assen",
      title: ["Storing zoeken", "met data"],
      intro:
        "Foutcodes uitlezen is pas het begin. Wij combineren diagnose met live data, context en technisch advies.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    sections: [
      {
        kicker: "Geen giswerk",
        title: "Een foutcode vertelt wat het systeem ziet, niet altijd wat de oorzaak is.",
        text:
          "Moderne auto's zitten vol sensoren, regelmodules en voorwaarden. Een DPF storing, EGR storing, AdBlue storing, turbodrukfout of vermogensverlies kan meerdere oorzaken hebben. NoordTune.nl gebruikt foutcodes, live data, freeze frames en rijgedrag om de klacht gericht te begrijpen.",
        bullets: ["Foutcodes uitlezen en interpreteren", "Live data en meetwaarden controleren", "Advies voordat onderdelen worden vervangen"],
        image: "/images/sections/bmw-diagnostics.jpg"
      },
      {
        kicker: "Loganalyse",
        title: "Meetwaarden onder belasting maken verborgen problemen zichtbaar.",
        text:
          "Sommige klachten zie je pas tijdens rijden of accelereren. Met loganalyse kijken we naar turbodruk, luchtmassa, brandstofdruk, lambda, injectiecorrecties, temperaturen en transmissiegedrag. Dat helpt bij diagnose, tuningvoorbereiding en controle na software-aanpassing."
      },
      {
        kicker: "Emissiesystemen",
        title: "DPF, EGR en AdBlue vragen zorgvuldige diagnose en correcte woorden.",
        text:
          "Wij adverteren geen generieke verwijdering van emissiesystemen. Wel helpen we met storing analyse, diagnose, advies op maat en software-oplossingen waar wettelijk toegestaan. De juiste aanpak hangt af van voertuig, gebruik, technische staat en regelgeving."
      }
    ],
    faqs: [
      {
        question: "Wat kost auto diagnose bij NoordTune.nl?",
        answer:
          "Diagnose start vanaf €89 incl. btw. De prijs kan hoger worden wanneer uitgebreide loganalyse, mobiele service of extra controle nodig is."
      },
      {
        question: "Kunnen jullie DPF, EGR of AdBlue storingen onderzoeken?",
        answer:
          "Ja. We voeren diagnose en storing analyse uit en bespreken alleen oplossingen die technisch passend en wettelijk toegestaan zijn."
      },
      {
        question: "Is diagnose nodig voor chiptuning?",
        answer:
          "Niet altijd, maar bij foutcodes, vermogensverlies, hoge kilometerstand of twijfel is diagnose vooraf verstandig."
      }
    ],
    related: [
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Chiptuning Assen", href: "/nl/chiptuning-assen"},
      {label: "Chiptuning Drenthe", href: "/nl/chiptuning-drenthe"},
      {label: "Contact opnemen", href: pathFor("nl", "contact")}
    ]
  },
  {
    key: "stage-1-tuning",
    locale: "nl",
    slug: "stage-1-tuning",
    parentKey: "chiptuning",
    heroImage: "/images/sections/datalog-road.webp",
    seo: {
      title: "Stage 1 Tuning | Meer Vermogen op Standaard Hardware",
      description:
        "Stage 1 tuning bij NoordTune.nl: ECU remap voor standaard auto's met veilige marges, diagnose waar nodig en een indicatie via de Power Catalog."
    },
    hero: {
      eyebrow: "Stage 1 tuning",
      title: ["Meer koppel", "op standaard hardware"],
      intro:
        "De populairste tuningvorm voor moderne turbo benzine- en dieselmotoren, met focus op souplesse en betrouwbaarheid.",
      primary: "Bekijk tuningmogelijkheden",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Wat is Stage 1?",
        title: "Stage 1 tuning optimaliseert de originele software zonder hardwareplicht.",
        text:
          "Bij Stage 1 tuning blijft de auto technisch standaard. De ECU software wordt aangepast binnen realistische marges voor turbodruk, injectie, ontsteking, koppelbegrenzing en gaspedaalrespons. Het resultaat is meestal meer trekkracht, betere respons en een rustiger gevoel bij inhalen of accelereren.",
        bullets: ["Voor standaard hardware", "Geschikt voor veel turbo motoren", "Focus op rijdbaarheid en veilige marges"],
        image: "/images/sections/ecu-bench-red.png"
      },
      {
        kicker: "Voor wie?",
        title: "Ideaal voor dagelijks gebruik, zakelijke kilometers en liefhebbers.",
        text:
          "Stage 1 tuning hoeft niet nerveus of extreem te zijn. Juist in dagelijks gebruik merk je het verschil in koppelopbouw en souplesse. Bij automaten kijken we ook naar transmissielimieten en bespreken we DSG / TCU tuning wanneer dat nuttig is."
      },
      {
        kicker: "Controle",
        title: "Een gezonde auto blijft de basis.",
        text:
          "Wanneer een auto foutcodes heeft, vermogen mist of onderhoud achterloopt, adviseren we eerst diagnose. Een goede Stage 1 remap moet bestaande problemen niet maskeren, maar op een betrouwbare basis worden gebouwd."
      }
    ],
    faqs: [
      {
        question: "Wat kost Stage 1 tuning?",
        answer:
          "Stage 1 tuning start vanaf €649 incl. btw. De definitieve prijs hangt af van ECU, motorvariant, softwareversie en benodigde controle."
      },
      {
        question: "Heb ik hardware nodig voor Stage 1?",
        answer:
          "Nee, Stage 1 is bedoeld voor standaard hardware. Wel moet de auto technisch gezond zijn."
      },
      {
        question: "Kan ik het verwachte resultaat vooraf zien?",
        answer:
          "Gebruik de NoordTune Power Catalog voor een indicatie. Definitieve waarden kunnen verschillen per auto en technische staat."
      }
    ],
    related: [
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Chiptuning Assen", href: "/nl/chiptuning-assen"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Prijzen", href: pathFor("nl", "prijzen")}
    ]
  },
  {
    key: "stage-2-tuning",
    locale: "nl",
    slug: "stage-2-tuning",
    parentKey: "chiptuning",
    heroImage: "/images/sections/datalog-road.webp",
    seo: {
      title: "Stage 2 Tuning | ECU Remap met Extra Controle | NoordTune.nl",
      description:
        "Stage 2 tuning voor auto's met ondersteunende hardware. NoordTune.nl adviseert over ECU remap, loganalyse, veiligheid en wettelijk toegestane oplossingen."
    },
    hero: {
      eyebrow: "Stage 2 tuning",
      title: ["Meer potentie", "meer controle"],
      intro:
        "Voor auto's met passende hardware en bestuurders die verder willen dan Stage 1, maar wel met technische onderbouwing.",
      primary: "Controleer jouw auto",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Verder dan Stage 1",
        title: "Stage 2 vraagt om hardware, data en duidelijke grenzen.",
        text:
          "Stage 2 tuning is geen standaard vervolgstap voor iedere auto. Het past bij voertuigen met ondersteunende hardware en vraagt extra aandacht voor turbodruk, luchtmassa, uitlaatgasstroming, temperaturen, brandstofdruk, koppeling en automaat. Daarom is loganalyse vaak belangrijker dan bij Stage 1.",
        bullets: ["Voor aangepaste hardware", "Loganalyse sterk aanbevolen", "Afstemming op motor en transmissie"],
        image: "/images/sections/datalog-road.webp"
      },
      {
        kicker: "Regelgeving",
        title: "Niet elke hardware- of softwarekeuze is geschikt voor straatgebruik.",
        text:
          "Wij formuleren advies zorgvuldig. Werk aan emissiegerelateerde systemen wordt alleen besproken waar technisch verantwoord en wettelijk toegestaan. De juiste keuze hangt af van voertuig, gebruik, APK-context en lokale regelgeving."
      },
      {
        kicker: "Maatwerk",
        title: "Het doel is een snelle auto die ook bruikbaar blijft.",
        text:
          "Een goede Stage 2 setup voelt krachtig, maar niet onrustig. We kijken naar de hele aandrijflijn en bespreken waar nodig onderhoud, koeling, transmissiesoftware of aanvullende diagnose voordat software definitief wordt afgestemd."
      }
    ],
    faqs: [
      {
        question: "Wat kost Stage 2 tuning?",
        answer:
          "Stage 2 tuning start vanaf €849 incl. btw. De prijs hangt af van hardware, ECU, softwareversie, loganalyse en benodigde controle."
      },
      {
        question: "Kan mijn standaard auto Stage 2 krijgen?",
        answer:
          "Meestal niet verstandig. Stage 2 is bedoeld voor auto's met passende hardware en extra controle."
      },
      {
        question: "Is Stage 2 altijd beter dan Stage 1?",
        answer:
          "Nee. Voor veel dagelijkse auto's is Stage 1 de beste balans. Stage 2 is alleen logisch wanneer de technische basis en het gebruik erbij passen."
      }
    ],
    related: [
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Chiptuning Drenthe", href: "/nl/chiptuning-drenthe"},
      {label: "Contact", href: pathFor("nl", "contact")}
    ]
  },
  {
    key: "ecu-remap",
    locale: "nl",
    slug: "ecu-remap",
    parentKey: "chiptuning",
    heroImage: "/images/sections/autotuner-bench.webp",
    seo: {
      title: "ECU Remap Assen | Motorsoftware op Maat | NoordTune.nl",
      description:
        "ECU remap in Assen met maatwerk motorsoftware, diagnose waar nodig en veilige marges voor motor, turbo en transmissie."
    },
    hero: {
      eyebrow: "ECU remap",
      title: ["Motorsoftware", "op maat"],
      intro:
        "Geen blind bestand, maar software die past bij jouw ECU, motorvariant, transmissie en gebruik.",
      primary: "Controleer jouw auto",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Motorcomputer",
        title: "Een ECU remap verandert hoe de motor vermogen opbouwt.",
        text:
          "Bij een ECU remap wordt de originele motorsoftware zorgvuldig aangepast. Denk aan koppelbegrenzing, turbodruk, inspuiting, ontsteking, gaspedaalrespons en beveiligingsstrategieën. NoordTune.nl gebruikt de Power Catalog als eerste indicatie, maar kijkt daarna altijd naar de exacte motorvariant, ECU, softwareversie en technische staat van de auto.",
        bullets: [
          "Maatwerk in plaats van generieke claims",
          "Afstemming op motor, transmissie en brandstof",
          "Originele software veiligstellen waar mogelijk",
          "Controle bij foutcodes of twijfel"
        ],
        image: "/images/sections/autotuner-bench.webp"
      },
      {
        kicker: "Veilige marges",
        title: "Een goede remap voelt sterker zonder onrustig te worden.",
        text:
          "Het doel is een auto die beter reageert, meer koppel levert en prettig blijft rijden. We vermijden extreme beloftes en houden rekening met turbo, koppeling, automaat, koeling en onderhoudsstaat. Bij moderne automaten kan DSG / TCU tuning relevant zijn wanneer extra koppel anders wordt begrensd."
      },
      {
        kicker: "Diagnose vooraf",
        title: "Soms is meten belangrijker dan direct schrijven.",
        text:
          "Wanneer er storingen, vermogensverlies, noodloop, rook of onbekend onderhoud zijn, adviseren we eerst auto diagnose of loganalyse. Daarmee voorkom je dat een ECU remap een bestaand probleem verbergt en wordt de uiteindelijke tuning betrouwbaarder."
      }
    ],
    faqs: [
      {
        question: "Is ECU remap hetzelfde als chiptuning?",
        answer:
          "In de praktijk worden de termen vaak door elkaar gebruikt. ECU remap beschrijft specifieker het aanpassen van de software in de motorcomputer."
      },
      {
        question: "Kan iedere auto een ECU remap krijgen?",
        answer:
          "Nee. De mogelijkheden hangen af van ECU, motor, softwareversie, technische staat en beschikbare leesmethode. De Power Catalog geeft een eerste indicatie."
      },
      {
        question: "Blijft mijn auto normaal rijden?",
        answer:
          "Dat is juist het doel. Een nette remap voelt sterker en soepeler, zonder nerveus of onvoorspelbaar gedrag."
      }
    ],
    related: [
      {label: "Chiptuning Assen", href: "/nl/chiptuning-assen"},
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Loganalyse", href: "/nl/loganalyse"},
      {label: "Prijzen", href: pathFor("nl", "prijzen")}
    ]
  },
  {
    key: "dsg-tcu-tuning",
    locale: "nl",
    slug: "dsg-tcu-tuning",
    parentKey: "diensten",
    heroImage: "/images/sections/datalog-road.webp",
    seo: {
      title: "DSG / TCU Tuning | Schakelgedrag & Koppellimieten | NoordTune.nl",
      description:
        "DSG tuning en TCU tuning voor beter schakelgedrag, passende koppellimieten en transmissiesoftware afgestemd op extra koppel."
    },
    hero: {
      eyebrow: "DSG / TCU tuning",
      title: ["Meer controle", "over schakelen"],
      intro:
        "Transmissiesoftware kan net zo belangrijk zijn als motorsoftware wanneer extra koppel bruikbaar moet blijven.",
      primary: "Bekijk tuningmogelijkheden",
      secondary: "WhatsApp ons"
    },
    sections: [
      {
        kicker: "Transmissiesoftware",
        title: "De TCU bepaalt hoe bruikbaar extra koppel echt voelt.",
        text:
          "Bij veel moderne auto's begrenst of stuurt de transmissie een groot deel van het rijgedrag. DSG tuning of TCU tuning kan schakelmomenten, koppelbegrenzers, launch- of drive-mode gedrag en reactie onder belasting beïnvloeden. NoordTune.nl bekijkt per voertuig of transmissiesoftware zinvol is of dat de originele instelling beter past.",
        bullets: [
          "Koppellimieten en schakelstrategie",
          "Afstemming op ECU remap of Stage 1 tuning",
          "Focus op dagelijks comfort en controle",
          "Geen onnodig harde of nerveuze schakelingen"
        ],
        image: "/images/sections/datalog-road.webp"
      },
      {
        kicker: "Wanneer zinvol?",
        title: "DSG / TCU tuning is niet voor iedere auto verplicht.",
        text:
          "Soms rijdt een auto na Stage 1 uitstekend met originele transmissiesoftware. In andere gevallen kan de automaat te vroeg opschakelen, koppel begrenzen of onlogisch reageren. Dan bespreken we of TCU tuning helpt voor betere samenwerking tussen motor en transmissie."
      },
      {
        kicker: "Controle",
        title: "Aandrijflijn, onderhoud en gebruik bepalen de juiste keuze.",
        text:
          "We kijken naar transmissietype, softwareversie, kilometerstand, onderhoud, koppelopbouw en gebruik. Het doel is niet de meest agressieve bak, maar een aandrijflijn die logisch, snel en betrouwbaar aanvoelt."
      }
    ],
    faqs: [
      {
        question: "Wat is het verschil tussen DSG en TCU tuning?",
        answer:
          "DSG is een type transmissie; TCU is de transmissieregelunit. In de praktijk bedoelt men met DSG tuning vaak het aanpassen van de TCU software."
      },
      {
        question: "Heb ik DSG tuning nodig bij Stage 1?",
        answer:
          "Niet altijd. Het hangt af van auto, transmissie, koppelwinst en rijgedrag. We adviseren dit per voertuig."
      },
      {
        question: "Wordt schakelen harder?",
        answer:
          "Dat hoeft niet. Onze voorkeur is een transmissie die sneller en logischer reageert, maar prettig blijft in dagelijks gebruik."
      }
    ],
    related: [
      {label: "ECU remap", href: "/nl/ecu-remap"},
      {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"},
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Diensten", href: pathFor("nl", "diensten")}
    ]
  },
  {
    key: "loganalyse",
    locale: "nl",
    slug: "loganalyse",
    parentKey: "diagnose",
    heroImage: "/images/sections/datalog-road.webp",
    seo: {
      title: "Loganalyse Auto | Data bij Tuning en Diagnose | NoordTune.nl",
      description:
        "Loganalyse voor turbodruk, luchtmassa, brandstofdruk, lambda, temperaturen en transmissiegedrag bij diagnose en tuning."
    },
    hero: {
      eyebrow: "Loganalyse",
      title: ["Meten", "onder belasting"],
      intro:
        "Rijlogs maken zichtbaar wat je tijdens accelereren, noodloop of vermogensverlies voelt.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    sections: [
      {
        kicker: "Data onder belasting",
        title: "Sommige problemen zie je pas tijdens rijden.",
        text:
          "Stationair uitlezen geeft niet altijd genoeg informatie. Met loganalyse kijken we naar meetwaarden terwijl de motor werkelijk belast wordt. Denk aan turbodruk, luchtmassa, brandstofdruk, lambda, ontsteking, injectiecorrecties, temperaturen, roetbelasting en transmissiegedrag.",
        bullets: [
          "Analyse bij vermogensverlies of noodloop",
          "Controle vóór of na chiptuning",
          "Data voor Stage 2 trajecten",
          "Gericht advies in plaats van onderdelen gokken"
        ],
        image: "/images/sections/datalog-road.webp"
      },
      {
        kicker: "Voor tuning",
        title: "Een goede log voorkomt verkeerde aannames.",
        text:
          "Bij Stage 2, aangepaste hardware of twijfel over de technische staat is loganalyse vaak verstandig. De data laat zien of de auto de gevraagde waarden haalt, waar begrenzing optreedt en of extra diagnose nodig is voordat software wordt aangepast."
      },
      {
        kicker: "Voor diagnose",
        title: "Loganalyse helpt bij klachten die niet constant aanwezig zijn.",
        text:
          "Onregelmatige turbodruk, brandstofdrukproblemen, EGR gedrag, DPF belasting of onrustige transmissieklachten zijn soms alleen zichtbaar in specifieke omstandigheden. Met een log kunnen we de klacht beter plaatsen."
      }
    ],
    faqs: [
      {
        question: "Wat kost loganalyse?",
        answer:
          "Loganalyse start vanaf €149 incl. btw. De exacte prijs hangt af van het aantal metingen, de klacht en de benodigde interpretatie."
      },
      {
        question: "Is loganalyse altijd nodig?",
        answer:
          "Nee. Bij veel standaard Stage 1 trajecten is basiscontrole voldoende. Bij klachten, Stage 2 of twijfel is loganalyse vaak waardevol."
      },
      {
        question: "Krijg ik uitleg van de data?",
        answer:
          "Ja. We leggen uit welke waarden relevant zijn en welke vervolgstap logisch is."
      }
    ],
    related: [
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "ECU remap", href: "/nl/ecu-remap"},
      {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
      {label: "Contact", href: pathFor("nl", "contact")}
    ]
  },
  {
    key: "dpf-storing",
    locale: "nl",
    slug: "dpf-storing",
    parentKey: "diagnose",
    heroImage: "/images/sections/bmw-diagnostics.jpg",
    seo: {
      title: "DPF Storing | Diagnose en Storing Analyse | NoordTune.nl",
      description:
        "DPF storing diagnose: foutcodes, roetbelasting, sensoren, regeneratievoorwaarden en advies op maat waar wettelijk toegestaan."
    },
    hero: {
      eyebrow: "DPF storing",
      title: ["Roetfilter", "storing analyse"],
      intro:
        "Een DPF melding vraagt om diagnose van sensoren, rijprofiel, roetbelasting en regeneratievoorwaarden.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    sections: [
      {
        kicker: "Diagnose eerst",
        title: "Een DPF storing heeft vaak meer dan een oorzaak.",
        text:
          "Een roetfiltermelding kan ontstaan door drukverschilsensoren, temperatuursensoren, rijprofiel, EGR gedrag, injectieproblemen, softwarestatus, onderhoud of een regeneratie die niet goed wordt afgerond. NoordTune.nl start daarom met foutcodes, live data en context voordat er advies wordt gegeven.",
        bullets: [
          "Foutcodes en freeze frames uitlezen",
          "Roetbelasting en drukwaarden beoordelen",
          "Regeneratievoorwaarden controleren",
          "Advies op maat en wettelijke context bespreken"
        ],
        image: "/images/sections/bmw-diagnostics.jpg"
      },
      {
        kicker: "Zorgvuldige woorden",
        title: "Wij adverteren geen generieke emissiesysteem-verwijdering.",
        text:
          "Publieke DPF-copy moet technisch en juridisch zorgvuldig blijven. Wij helpen met diagnose, storing analyse, advies op maat en software-oplossingen waar wettelijk toegestaan. Wat mogelijk en passend is, hangt af van voertuig, toepassing, technische staat en lokale regelgeving."
      },
      {
        kicker: "Voorkomen",
        title: "Het rijprofiel en onderhoud bepalen vaak of problemen terugkomen.",
        text:
          "Veel korte ritten, verkeerde olie, defecte sensoren of onderliggende motorproblemen kunnen DPF klachten versterken. Daarom kijken we verder dan alleen de melding op het dashboard."
      }
    ],
    faqs: [
      {
        question: "Kunnen jullie een DPF storing uitlezen?",
        answer:
          "Ja. We kunnen foutcodes, live data, drukwaarden en regeneratievoorwaarden controleren."
      },
      {
        question: "Is iedere DPF oplossing wettelijk toegestaan?",
        answer:
          "Nee. Daarom bespreken we alleen oplossingen die passen bij voertuig, gebruik en regelgeving."
      },
      {
        question: "Moet mijn auto eerst rijden voor een goede meting?",
        answer:
          "Soms wel. Bepaalde waarden zijn pas onder belasting of tijdens regeneratie goed te beoordelen."
      }
    ],
    related: [
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "EGR storing", href: "/nl/egr-storing"},
      {label: "AdBlue storing", href: "/nl/adblue-storing"},
      {label: "Loganalyse", href: "/nl/loganalyse"}
    ]
  },
  {
    key: "egr-storing",
    locale: "nl",
    slug: "egr-storing",
    parentKey: "diagnose",
    heroImage: "/images/sections/ecu-bench-red.png",
    seo: {
      title: "EGR Storing | Diagnose, Live Data en Advies | NoordTune.nl",
      description:
        "EGR storing diagnose voor foutcodes, live data, vervuiling, luchtmassa, turbodruk en wettelijk zorgvuldige vervolgstappen."
    },
    hero: {
      eyebrow: "EGR storing",
      title: ["Luchtstroom", "onder controle"],
      intro:
        "EGR klachten vragen om interpretatie van foutcodes, luchtmassa, turbodruk, vervuiling en rijgedrag.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    sections: [
      {
        kicker: "EGR diagnose",
        title: "De EGR klep staat nooit los van de rest van het motorsysteem.",
        text:
          "Een EGR storing kan te maken hebben met vervuiling, aansturing, luchtmassa, turbodruk, sensoren, DPF belasting of softwarestatus. Alleen een foutcode uitlezen is vaak te weinig. NoordTune.nl combineert foutcodes met live data en technische context.",
        bullets: [
          "Foutcode en live data interpretatie",
          "Luchtmassa en turbodruk controleren",
          "Samenhang met DPF en motorbelasting",
          "Advies op maat zonder onnodige onderdelen"
        ],
        image: "/images/sections/ecu-bench-red.png"
      },
      {
        kicker: "Regelgeving",
        title: "Emissiegerelateerde systemen vragen zorgvuldige keuzes.",
        text:
          "Wij formuleren EGR advies bewust voorzichtig. Diagnose, storing analyse en software-oplossingen worden alleen besproken waar technisch verantwoord en wettelijk toegestaan. De klant blijft verantwoordelijk voor gebruik van het voertuig volgens lokale regelgeving."
      },
      {
        kicker: "Rijgedrag",
        title: "Symptomen kunnen lijken op turbo- of brandstofproblemen.",
        text:
          "Inhouden, rook, noodloop of vermogensverlies komt niet altijd direct door de EGR zelf. Daarom kijken we naar meerdere meetwaarden voordat er een conclusie volgt."
      }
    ],
    faqs: [
      {
        question: "Wat merk ik bij een EGR storing?",
        answer:
          "Mogelijke klachten zijn foutmeldingen, vermogensverlies, rook, onrustig lopen of noodloop. De echte oorzaak moet met diagnose worden vastgesteld."
      },
      {
        question: "Kunnen jullie EGR live data beoordelen?",
        answer:
          "Ja. We kunnen relevante meetwaarden bekijken en uitleggen wat de data betekent."
      },
      {
        question: "Is software altijd de oplossing?",
        answer:
          "Nee. Soms is reparatie of onderhoud de juiste stap. Softwarematige oplossingen bespreken we alleen waar toegestaan en passend."
      }
    ],
    related: [
      {label: "DPF storing", href: "/nl/dpf-storing"},
      {label: "AdBlue storing", href: "/nl/adblue-storing"},
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "Contact", href: pathFor("nl", "contact")}
    ]
  },
  {
    key: "adblue-storing",
    locale: "nl",
    slug: "adblue-storing",
    parentKey: "diagnose",
    heroImage: "/images/sections/bmw-diagnostics.jpg",
    seo: {
      title: "AdBlue Storing | SCR Diagnose en Advies | NoordTune.nl",
      description:
        "AdBlue storing diagnose voor SCR systeem, NOx sensoren, tank, pomp, verwarming, foutcodes en toegestane oplossingen."
    },
    hero: {
      eyebrow: "AdBlue storing",
      title: ["SCR diagnose", "zonder giswerk"],
      intro:
        "AdBlue meldingen kunnen te maken hebben met sensoren, pomp, tank, verwarming, dosering of softwarestatus.",
      primary: "WhatsApp ons",
      secondary: "Controleer jouw auto"
    },
    sections: [
      {
        kicker: "SCR systeem",
        title: "AdBlue storingen vragen om systeemdiagnose, niet alleen wissen.",
        text:
          "Een AdBlue storing kan terugkomen wanneer de onderliggende oorzaak niet wordt gevonden. Denk aan NOx sensoren, AdBlue pomp, injector, tankverwarming, kristallisatie, bedrading, softwarestatus of rijprofiel. NoordTune.nl bekijkt foutcodes, live data en voorwaarden voordat we advies geven.",
        bullets: [
          "Foutcodes en SCR meetwaarden",
          "NOx sensor en dosering beoordelen",
          "Tank, pomp en verwarming als aandachtspunt",
          "Advies op maat binnen wettelijke kaders"
        ],
        image: "/images/sections/bmw-diagnostics.jpg"
      },
      {
        kicker: "Zorgvuldig advies",
        title: "Niet elke AdBlue oplossing is geschikt of toegestaan.",
        text:
          "Wij adverteren geen standaard verwijderingsdienst. We helpen met diagnose, storing analyse, uitleg en software-oplossingen waar wettelijk toegestaan. De juiste route hangt af van voertuig, gebruik, technische staat en regelgeving."
      },
      {
        kicker: "Snel handelen",
        title: "Sommige AdBlue meldingen tellen af naar startblokkering.",
        text:
          "Wacht niet te lang met diagnose wanneer het dashboard een resterende afstand of startbeperking meldt. Stuur een foto van de melding en je voertuiggegevens via WhatsApp voor een eerste inschatting."
      }
    ],
    faqs: [
      {
        question: "Kunnen jullie AdBlue storingen diagnosticeren?",
        answer:
          "Ja. We kunnen foutcodes, live data en SCR-gerelateerde waarden controleren en daarna een passende vervolgstap adviseren."
      },
      {
        question: "Kan ik blijven rijden met een AdBlue melding?",
        answer:
          "Dat hangt af van de melding. Sommige systemen tellen af naar een startbeperking, dus tijdige diagnose is verstandig."
      },
      {
        question: "Bespreken jullie software-oplossingen?",
        answer:
          "Alleen waar technisch passend en wettelijk toegestaan. We communiceren hier bewust zorgvuldig over."
      }
    ],
    related: [
      {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"},
      {label: "DPF storing", href: "/nl/dpf-storing"},
      {label: "EGR storing", href: "/nl/egr-storing"},
      {label: "Loganalyse", href: "/nl/loganalyse"}
    ]
  }
];

export const preparedSeoPages: PreparedSeoPage[] = [
  {slug: "bmw-chiptuning", title: "BMW chiptuning", focus: "BMW diesel en benzine tuning met aandacht voor automaat en koppel", status: "prepared"},
  {slug: "audi-chiptuning", title: "Audi chiptuning", focus: "TFSI/TDI tuning, Stage 1 en DSG aandachtspunten", status: "prepared"},
  {slug: "volkswagen-chiptuning", title: "Volkswagen chiptuning", focus: "TSI/TDI tuning, Golf GTI en dagelijkse rijbaarheid", status: "prepared"},
  {slug: "mercedes-chiptuning", title: "Mercedes chiptuning", focus: "CDI/d benzine modellen, comfort en transmissiemarges", status: "prepared"}
];

export function seoLandingFromSlug(locale: Locale, slug: string): SeoLanding | undefined {
  return seoLandings.find((page) => page.locale === locale && page.slug === slug);
}

export function seoLandingStaticParams() {
  return seoLandings.map((page) => ({
    locale: page.locale,
    slug: page.slug
  }));
}

export function seoLandingUrl(page: SeoLanding) {
  return `/${page.locale}/${page.slug}`;
}
