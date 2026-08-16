import type {FaqItem} from "./copy";
import {pageRoutes, pathFor, site, type Locale} from "./site";

export type BrandKey = "bmw" | "audi" | "volkswagen" | "ford" | "toyota";

export type BrandPageSection = {
  eyebrow: string;
  title: string;
  body: string[];
  bullets?: string[];
  links?: Array<{label: string; href: string}>;
};

export type BrandPage = {
  brand: BrandKey;
  brandName: string;
  locale: Locale;
  slug: string;
  status: "published";
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  introTitle: string;
  intro: string[];
  sections: BrandPageSection[];
  resultSlugs: string[];
  resultSummaries: Record<string, string>;
  resultsTitle: string;
  resultsIntro: string;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: Array<{label: string; href: string}>;
  catalogTitle: string;
  catalogIntro: string;
  catalogBullets: string[];
  catalogCta: string;
  whatsappCta: string;
  faq: FaqItem[];
  disclaimer: string;
};

const sharedImages = {
  bmw: "/images/results/bmw-x3-e83-20d-stage-1.webp",
  audi: "/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp",
  volkswagen: "/images/results/vw-caddy-20-tdi-2020-stage-1.webp",
  ford: "/images/results/ford-transit-connect-15-ecoblue-2019-stage-1.webp",
  toyota: "/images/results/toyota-proace-verso-vip-20d-2023-stage-1.webp"
} satisfies Record<BrandKey, string>;

const resultSlugs = {
  bmw: ["bmw-x3-e83-20d-stage-1", "bmw-f40-118i-7dct300-tcu-tuning"],
  audi: ["audi-a4-b7-20-tdi-stage-2-plus"],
  volkswagen: ["vw-caddy-20-tdi-2020-stage-1", "vw-transporter-20-tdi-2013-ecu-cloning-stage-1"],
  ford: ["ford-transit-connect-15-ecoblue-2019-stage-1"],
  toyota: ["toyota-proace-verso-vip-20d-2023-stage-1"]
} satisfies Record<BrandKey, string[]>;

function serviceLinks(locale: Locale, options: {transmission?: boolean; stage2?: boolean} = {}) {
  const links = [
    {
      label: locale === "nl" ? "Chiptuning" : locale === "en" ? "Chiptuning" : "Chiptuning",
      href: pathFor(locale, "chiptuning")
    },
    {
      label: locale === "nl" ? "Auto diagnose" : locale === "en" ? "Car diagnostics" : "Diagnostyka samochodowa",
      href: pathFor(locale, "diagnose")
    }
  ];

  if (locale === "nl") {
    links.push({label: "Stage 1 tuning", href: "/nl/stage-1-tuning"});
    if (options.stage2) {
      links.push({label: "Stage 2 tuning", href: "/nl/stage-2-tuning"});
    }
    if (options.transmission) {
      links.push({label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"});
    }
  } else {
    links.push({
      label: locale === "en" ? "Services" : "Usługi",
      href: pathFor(locale, "diensten")
    });
  }

  links.push({
    label: locale === "nl" ? "Klantresultaten" : locale === "en" ? "Customer results" : "Realizacje klientów",
    href: pathFor(locale, "resultaten")
  });

  return links;
}

export const brandPages: BrandPage[] = [
  {
    brand: "bmw",
    brandName: "BMW",
    locale: "nl",
    slug: "bmw-chiptuning",
    status: "published",
    metaTitle: "BMW chiptuning op maat | ECU & TCU | NoordTune.nl",
    metaDescription:
      "BMW chiptuning met diagnose, voertuigspecifieke ECU-remap en aandacht voor TCU en koppelmanagement. Bekijk echte BMW-resultaten en controleer jouw auto.",
    heroTitle: "BMW chiptuning met ECU- en TCU-afstemming",
    heroIntro:
      "Meer trekkracht en een betere respons beginnen bij de juiste combinatie van motorsoftware, transmissie, onderhoudsstaat en gebruik. NoordTune stemt het advies af op jouw exacte BMW.",
    heroImage: sharedImages.bmw,
    heroImageAlt: "BMW X3 E83 Stage 1 klantresultaat als voorbeeld van BMW chiptuning bij NoordTune.nl",
    introTitle: "BMW tuning is meer dan alleen motorsoftware aanpassen.",
    intro: [
      "BMW combineert in veel modellen een sterk motorkarakter met uitgebreid koppelmanagement en een transmissie die actief meebeslist over de vermogensafgifte. Daardoor is een goede remap geen losstaand bestand voor een modelnaam. De exacte motorvariant, softwareversie, ECU, transmissie, onderhoudsstaat en eerdere aanpassingen bepalen welke route technisch logisch is. NoordTune begint daarom met voertuiggegevens en verwachtingen, niet met een algemeen vermogensgetal.",
      "Voor de ene BMW is een rustige Stage 1 op standaard hardware de beste verbetering. Bij een andere auto is eerst diagnose nodig, of vraagt de transmissie om controle voordat extra koppel verantwoord kan worden benut. Het doel blijft een BMW die sterker en voorspelbaarder rijdt zonder zijn dagelijkse bruikbaarheid te verliezen. Waarden in de Power Catalog en in onze klantcases zijn een indicatie of een specifiek gemeten resultaat, nooit een garantie voor iedere BMW."
    ],
    sections: [
      {
        eyebrow: "Vooraf controleren",
        title: "Wat controleren wij vóór BMW chiptuning?",
        body: [
          "We verzamelen eerst kenteken of voertuiggegevens, motorvariant, bouwjaar, kilometerstand en informatie over onderhoud of eerdere software. Ook klachten zoals onrustig schakelen, vermogensverlies, foutmeldingen of afwijkend verbruik horen bij de intake. Daarmee bepalen we of direct tunen logisch is of dat diagnose eerst meer duidelijkheid moet geven.",
          "Bij twijfel kijken we naar foutcodes en relevante meetwaarden. Denk aan gevraagde en gemeten druk, lucht- en brandstofdata, temperaturen en de manier waarop koppel door ECU en transmissie wordt aangevraagd of begrensd. We publiceren geen lijst met veronderstelde ECU-families: de werkelijke regelunit en software worden bij de auto vastgesteld."
        ],
        bullets: [
          "Exacte BMW-uitvoering en motorvariant",
          "Onderhoudsstaat, foutcodes en eerdere software",
          "Transmissietype en bruikbare koppelgrenzen",
          "Doel: dagelijks gebruik, trekkracht of sportiever rijden"
        ],
        links: [
          {label: "Auto diagnose", href: "/nl/auto-diagnose"},
          {label: "Waarom diagnose vóór tuning belangrijk is", href: "/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is"}
        ]
      },
      {
        eyebrow: "Stage 1",
        title: "Een nette BMW Stage 1 bouwt koppel beheerst op.",
        body: [
          "Stage 1 is bedoeld voor een technisch gezonde BMW met standaard hardware. De calibratie wordt afgestemd op de beschikbare marges en op de manier waarop het voertuig koppel vraagt en verwerkt. Een sterke middentoerenrespons is in dagelijks verkeer vaak waardevoller dan een agressieve piek. Daarom letten we op een geleidelijke opbouw, voorspelbare gaspedaalreactie en samenhang met de transmissie.",
          "Ook bij dezelfde modelnaam kunnen software, motoruitvoering en transmissie verschillen. Een cataloguswaarde is daarom het begin van het gesprek. De uiteindelijke keuze volgt nadat duidelijk is welke auto voor ons staat en hoe die gebruikt wordt. Bij hoge kilometerstand, twijfel over onderhoud of bestaande klachten kan eerst een technische controle nodig zijn."
        ],
        links: [{label: "Lees meer over Stage 1", href: "/nl/stage-1-tuning"}]
      },
      {
        eyebrow: "Stage 2",
        title: "Stage 2 vraagt aantoonbaar passende hardware en controle.",
        body: [
          "Stage 2 is niet automatisch de betere keuze. Deze route hoort bij een BMW waarvan de hardwareconfiguratie aantoonbaar afwijkt en technisch geschikt is. Koeling, luchttoevoer, uitlaatdelen waar wettelijk toegestaan, brandstofkwaliteit en de staat van turbo en aandrijflijn kunnen allemaal relevant zijn. De software moet rond de werkelijke configuratie worden opgebouwd, niet rond een populaire claim op internet.",
          "Loganalyse helpt om onder belasting te zien of gevraagde en gemeten waarden bij elkaar passen. Als de technische basis onvoldoende is, adviseren we herstel of een rustiger doel. We doen geen algemene uitspraak dat een bepaalde wijziging altijd geschikt of wettelijk toegestaan is; voertuig, gebruik en regelgeving blijven bepalend."
        ],
        links: [
          {label: "Stage 2 tuning", href: "/nl/stage-2-tuning"},
          {label: "Loganalyse", href: "/nl/loganalyse"}
        ]
      },
      {
        eyebrow: "Aandrijflijn",
        title: "ECU en TCU moeten hetzelfde koppelverhaal vertellen.",
        body: [
          "Bij BMW kan de transmissie een groot deel van het rijgevoel bepalen. Koppelaanvraag, toegestane limieten, koppelonderbreking en schakelstrategie werken samen met de motorsoftware. Extra motorkoppel zonder aandacht voor de transmissie kan leiden tot onlogische ingrepen, minder vloeiende schakelmomenten of een resultaat dat op papier sterker is maar in de praktijk niet prettig rijdt.",
          "TCU-aanpassing is niet bij iedere BMW nodig en wordt niet als standaard extra verkocht. We beoordelen eerst de aanwezige transmissie, software en het gewenste koppel. De BMW F40-klantcase op deze pagina is een echt voorbeeld van transmissiewerk aan een GETRAG 7DCT300; het is nadrukkelijk geen algemene belofte voor alle BMW-versnellingsbakken."
        ],
        links: [
          {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"},
          {label: "Koppelbegrenzers in ECU en TCU", href: "/nl/blog/koppelbegrenzers-in-ecu-en-tcu"}
        ]
      },
      {
        eyebrow: "Diagnose en logs",
        title: "Meten voorkomt dat software een bestaand probleem maskeert.",
        body: [
          "Een auto kan nog normaal aanvoelen terwijl meetwaarden al laten zien dat een sensor, drukregeling, brandstoftoevoer of transmissie niet goed binnen verwachting werkt. Tuning vergroot de belasting en hoort daarom niet als oplossing over een onbekend probleem heen te worden gelegd. Foutcodes, live data en waar nodig rijlogs geven context voordat een calibratie wordt gekozen.",
          "Na aanpassing kunnen logs eveneens nuttig zijn om de respons onder realistische belasting te beoordelen. Dat betekent niet dat ieder traject identiek verloopt, maar wel dat beslissingen op gegevens kunnen worden gebaseerd. De aanpak blijft passend bij de complexiteit van de auto en het doel van de klant."
        ]
      },
      {
        eyebrow: "Advies aanvragen",
        title: "Stuur de gegevens waarmee we jouw BMW echt kunnen beoordelen.",
        body: [
          "Voor een bruikbare eerste reactie ontvangen we graag het kenteken of de volledige model- en motoromschrijving, bouwjaar, transmissietype, huidige kilometerstand en bekende hardwarewijzigingen. Meld ook storingen, eerdere tuning en het gewenste gebruik. Een foto van een foutmelding of een duidelijke beschrijving van het rijgedrag kan helpen, maar deel geen volledig VIN of privégegevens via openbare kanalen.",
          "Gebruik de Power Catalog voor de eerste indicatie. Stuur daarna de voertuiggegevens via WhatsApp als je wilt weten welke vervolgstap past. We beloven geen identieke winst als een andere BMW; we leggen uit wat voor jouw uitvoering realistisch en verantwoord lijkt."
        ]
      }
    ],
    resultSlugs: resultSlugs.bmw,
    resultSummaries: {
      "bmw-x3-e83-20d-stage-1": "Maatwerk Stage 1 voor een BMW X3 E83 2.0d, met voertuigspecifieke calibratie en een vastgelegd resultaat.",
      "bmw-f40-118i-7dct300-tcu-tuning": "TCU-optimalisatie voor de GETRAG 7DCT300 in een BMW F40 118i, afgestemd op de aanwezige motorcalibratie."
    },
    resultsTitle: "Echte BMW-klantresultaten bij NoordTune",
    resultsIntro: "Deze cases tonen twee verschillende BMW-trajecten: ECU-remap en transmissiecalibratie. Open de case voor alle geverifieerde gegevens en voertuigspecifieke nuance.",
    relatedTitle: "BMW tuning verder onderzoeken",
    relatedIntro: "Verdiep je in de relevante service, diagnose of transmissie voordat je een keuze maakt.",
    relatedLinks: serviceLinks("nl", {transmission: true, stage2: true}),
    catalogTitle: "Controleer jouw BMW in de NoordTune Power Catalog.",
    catalogIntro: "Nederlandse BMW's kun je op kenteken controleren via RDW. Voor buitenlandse voertuigen kies je merk, model en motor handmatig. De getoonde prijzen en winsten zijn indicatief; definitief advies volgt op basis van de exacte BMW en configuratie.",
    catalogBullets: ["RDW-kentekencheck voor Nederlandse auto's", "Handmatige selectie voor buitenlandse BMW's", "Indicatieve Stage- en transmissieopties", "Definitieve beoordeling op voertuig en software"],
    catalogCta: "Controleer jouw BMW in de NoordTune Power Catalog",
    whatsappCta: "Vraag BMW-advies via WhatsApp",
    faq: [
      {question: "Is Stage 1 geschikt voor iedere BMW?", answer: "Nee. Geschiktheid hangt af van motorvariant, software, onderhoud, transmissie en technische staat. De Power Catalog geeft een indicatie; de auto bepaalt het definitieve advies."},
      {question: "Is TCU tuning altijd nodig na BMW chiptuning?", answer: "Nee. TCU-werk is alleen relevant wanneer transmissietype, koppellimieten, schakelgedrag en het gekozen koppel daar aanleiding toe geven."},
      {question: "Waarom kan het resultaat afwijken van een klantcase?", answer: "Een klantcase hoort bij één voertuig. Softwareversie, onderhoud, brandstof, hardware, transmissie en gebruik kunnen bij jouw BMW anders zijn."},
      {question: "Welke gegevens moet ik sturen?", answer: "Stuur kenteken of exacte uitvoering, motor, bouwjaar, transmissie, kilometerstand, bekende wijzigingen, klachten en je gewenste gebruik via WhatsApp."}
    ],
    disclaimer: "Resultaten zijn voertuigspecifiek. Motorvariant, ECU/TCU, softwareversie, onderhoud, brandstof, transmissie, hardware en gebruik bepalen wat bij jouw BMW verantwoord en haalbaar is."
  },
  {
    brand: "audi",
    brandName: "Audi",
    locale: "nl",
    slug: "audi-chiptuning",
    status: "published",
    metaTitle: "Audi chiptuning | Stage 1, Stage 2 & diagnose | NoordTune.nl",
    metaDescription: "Audi chiptuning met diagnose, loganalyse en hardwarebewuste ECU-remap. Bekijk de echte Audi A4 Stage 2+ case en controleer jouw Audi.",
    heroTitle: "Audi chiptuning met hardwarebewuste calibratie",
    heroIntro: "Van een rustige Stage 1 tot een complexer hardwaretraject: bij Audi moet software aansluiten op motor, turbo, transmissie en de werkelijke technische staat.",
    heroImage: sharedImages.audi,
    heroImageAlt: "Audi A4 B7 2.0 TDI Stage 2+ klantresultaat bij NoordTune.nl",
    introTitle: "Audi tuning vraagt om samenhang tussen software, hardware en aandrijflijn.",
    intro: [
      "Een Audi kan met de juiste calibratie merkbaar sterker en soepeler rijden, maar de merknaam alleen zegt weinig over de technische mogelijkheden. De exacte motor, ECU-software, turbo, brandstofvoorziening, transmissie, aandrijfvorm en onderhoudsstaat bepalen samen hoeveel ruimte er is. NoordTune behandelt een standaard Stage 1 daarom anders dan een auto met aangepaste hardware.",
      "We gebruiken de Power Catalog als eerste indicatie en beoordelen daarna wat bij de concrete Audi past. De echte Audi A4 B7 Stage 2+ case op deze pagina laat zien hoe een calibratie rond een aanwezige hybride turbo en downpipe is opgebouwd. Dat resultaat is bewijs van dat specifieke project, geen belofte dat iedere Audi A4 of 2.0 TDI dezelfde waarden haalt."
    ],
    sections: [
      {
        eyebrow: "Vooraf controleren",
        title: "Wat controleren wij vóór Audi chiptuning?",
        body: [
          "De intake begint met kenteken of volledige voertuigomschrijving, motor, bouwjaar, transmissie, onderhoud en eventuele hardwarewijzigingen. We willen ook weten of er storingen, rook, vermogensverlies, afwijkende regeneratie, noodloop of onrustig schakelen voorkomt. Zulke signalen veranderen de volgorde: eerst oorzaak en data, daarna pas tuningadvies.",
          "De werkelijke ECU, TCU en softwareversie worden tijdens het traject vastgesteld. We gokken geen regelunit op basis van alleen model of bouwjaar. Waar relevant controleren we foutcodes en meetwaarden van lucht, druk, brandstof en temperatuur, zodat een calibratie niet over een bestaand technisch probleem heen wordt gezet."
        ],
        bullets: ["Exacte motor- en softwarevariant", "Turbo- en hardwareconfiguratie", "Transmissie en koppelverwerking", "Foutcodes, onderhoud en rijgedrag"],
        links: [{label: "Auto diagnose", href: "/nl/auto-diagnose"}, {label: "Loganalyse", href: "/nl/loganalyse"}]
      },
      {
        eyebrow: "Stage 1",
        title: "Stage 1 houdt de standaard hardware als uitgangspunt.",
        body: [
          "Voor een technisch gezonde Audi zonder relevante hardwarewijzigingen is Stage 1 vaak de meest logische keuze. De calibratie richt zich op bruikbaar koppel, heldere respons en een opbouw die past bij turbo, brandstofsysteem en transmissie. Een goede dagelijkse setup hoeft niet hard of nerveus aan te voelen.",
          "Cataloguswaarden blijven indicatief. Zelfs binnen hetzelfde Audi-model kunnen software, emissieklasse, transmissie en motorvariant verschillen. De uiteindelijke calibratie en verwachte waarden worden daarom pas gekoppeld aan de werkelijk aanwezige uitvoering."
        ],
        links: [{label: "Stage 1 tuning", href: "/nl/stage-1-tuning"}]
      },
      {
        eyebrow: "Stage 2 en hardware",
        title: "Stage 2 wordt rond de aanwezige hardware gebouwd.",
        body: [
          "Stage 2 is relevant wanneer ondersteunende hardware aanwezig en technisch passend is. Dan beoordelen we onder meer turbo, luchttoevoer, koeling, brandstofzijde, transmissie en uitlaatdelen waar wettelijk toegestaan. Een generiek bestand is hier onvoldoende: de software moet rekening houden met de concrete configuratie en de grenzen die in logs zichtbaar worden.",
          "De Audi A4 B7 Stage 2+ klantcase gebruikt een hybride turbo en downpipe. De openbare pagina benoemt alleen geverifieerde projectgegevens en bevat een juridische nuance. We trekken dat resultaat niet door naar andere Audi's, ook niet wanneer model of cilinderinhoud vergelijkbaar lijkt."
        ],
        links: [{label: "Wanneer is Stage 2 verstandig?", href: "/nl/blog/wanneer-is-stage-2-tuning-verstandig"}, {label: "Audi A4 Stage 2+ case", href: "/nl/resultaten/audi-a4-b7-20-tdi-stage-2-plus"}]
      },
      {
        eyebrow: "ECU en transmissie",
        title: "Koppelmanagement moet passen bij de Audi-aandrijflijn.",
        body: [
          "De motor-ECU berekent niet los van de rest van de auto. Koppelaanvraag, tractieregeling en transmissiestrategie beïnvloeden hoe extra vermogen wordt vrijgegeven. Bij een automatische of dubbelkoppelingsbak kan controle van TCU-limieten en schakelgedrag relevant zijn, maar TCU tuning is niet automatisch nodig voor iedere Audi.",
          "We kijken naar de aanwezige transmissie en het doel van de auto. Een comfortabele dagelijkse Audi vraagt een andere respons dan een hardwareproject. Het advies blijft gericht op samenhang, niet op het verwijderen van alle begrenzing."
        ],
        links: [{label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"}, {label: "Chiptuning met automaat", href: "/nl/blog/chiptuning-met-automaat"}]
      },
      {
        eyebrow: "Diagnose en logs",
        title: "Turbo- en temperatuurgedrag moeten onder belasting kloppen.",
        body: [
          "Loganalyse laat zien of gevraagde en gemeten waarden bij elkaar blijven wanneer de motor belast wordt. Dat is belangrijk bij hardwarewijzigingen, maar ook wanneer een standaard Audi klachten of twijfelachtige historie heeft. Alleen meer turbodruk vragen is geen professionele calibratie; lucht, brandstof, temperatuur, koppel en bescherming moeten als geheel worden beoordeeld.",
          "Bij dieselmodellen worden DPF-, EGR- en AdBlue-gerelateerde klachten eerst als diagnosevraag behandeld. We adverteren geen generieke verwijdering. Software-oplossingen worden alleen besproken waar wettelijk toegestaan en passend bij voertuig, gebruik en regelgeving."
        ],
        links: [{label: "Turbo, brandstof en EGT uitgelegd", href: "/nl/blog/turbo-brandstof-en-egt-uitgelegd"}, {label: "DPF, EGR of AdBlue storing", href: "/nl/blog/dpf-egr-of-adblue-storing-wat-nu"}]
      },
      {
        eyebrow: "Advies aanvragen",
        title: "Geef de Audi-configuratie volledig door.",
        body: [
          "Stuur kenteken of model, motor, bouwjaar, transmissie, kilometerstand en bekende wijzigingen. Vermeld welke brandstof je gebruikt, of de auto eerder getuned is en welke klachten of doelen er zijn. Bij Stage 2 horen ook duidelijke gegevens over de gemonteerde hardware.",
          "De Power Catalog helpt bij de eerste selectie. Daarna kan WhatsApp worden gebruikt voor een gerichte intake. We geven liever een voorwaardelijk, eerlijk antwoord dan een exact getal zonder de auto en softwareversie te kennen."
        ]
      }
    ],
    resultSlugs: resultSlugs.audi,
    resultSummaries: {"audi-a4-b7-20-tdi-stage-2-plus": "Een echte hardwarebewuste Stage 2+ calibratie voor een Audi A4 B7 2.0 TDI met hybride turbo en downpipe."},
    resultsTitle: "Echt Audi-klantresultaat bij NoordTune",
    resultsIntro: "De Audi A4-case laat zien hoe voertuigdata, hardware en calibratie samenkomen. De volledige case bevat de geverifieerde waarden en disclaimer.",
    relatedTitle: "Van Audi-vraag naar passend traject",
    relatedIntro: "Lees verder over Stage 1, Stage 2, diagnose en transmissie voordat je een keuze maakt.",
    relatedLinks: serviceLinks("nl", {transmission: true, stage2: true}),
    catalogTitle: "Controleer jouw Audi in de NoordTune Power Catalog.",
    catalogIntro: "Gebruik voor Nederlandse auto's de RDW-kentekencheck of selecteer een buitenlandse Audi handmatig. Vermogens- en prijsindicaties zijn een startpunt; motor, software, hardware en transmissie bepalen het definitieve advies.",
    catalogBullets: ["RDW-check voor Nederlandse Audi's", "Handmatige model- en motorselectie", "Indicatieve Stage 1, Stage 2 en TCU-opties", "Persoonlijke controle van hardware en software"],
    catalogCta: "Controleer jouw Audi in de NoordTune Power Catalog",
    whatsappCta: "Vraag Audi-advies via WhatsApp",
    faq: [
      {question: "Is Stage 1 de beste keuze voor iedere Audi?", answer: "Niet altijd, maar voor een technisch gezonde auto met standaard hardware is Stage 1 vaak de logische basis. Uitvoering, software en gebruik blijven bepalend."},
      {question: "Wat maakt Audi Stage 2 anders?", answer: "Stage 2 hoort bij een passende hardwareconfiguratie en vraagt extra controle van turbo, lucht, brandstof, temperatuur en transmissie. Het is geen universele upgrade."},
      {question: "Heb ik TCU tuning nodig?", answer: "Alleen wanneer de aanwezige transmissie, koppellimieten en het gekozen koppel daar aanleiding toe geven. Dit wordt per Audi beoordeeld."},
      {question: "Is de Audi A4-klantcase representatief voor mijn auto?", answer: "De case toont een specifiek voertuig met specifieke hardware. Gebruik de waarden niet als garantie voor een andere Audi."}
    ],
    disclaimer: "De haalbare Audi-calibratie hangt af van motor, ECU/TCU, software, onderhoud, turbo, transmissie, brandstof, hardware en gebruik. Controleer ook welke hardwarewijzigingen wettelijk zijn toegestaan."
  },
  {
    brand: "volkswagen",
    brandName: "Volkswagen",
    locale: "nl",
    slug: "volkswagen-chiptuning",
    status: "published",
    metaTitle: "Volkswagen chiptuning & ECU-service | NoordTune.nl",
    metaDescription: "Volkswagen chiptuning voor personenauto en bedrijfswagen, plus diagnose en ECU cloning. Bekijk echte Caddy- en Transporter-resultaten.",
    heroTitle: "Volkswagen chiptuning voor auto en bedrijfswagen",
    heroIntro: "ECU-remap, transmissiecontrole en ECU-service vragen per Volkswagen om een andere technische route. NoordTune koppelt software aan het exacte voertuig en gebruik.",
    heroImage: sharedImages.volkswagen,
    heroImageAlt: "Volkswagen Caddy 2.0 TDI Stage 1 klantresultaat bij NoordTune.nl",
    introTitle: "Volkswagen vraagt om onderscheid tussen tuning, diagnose en ECU-herstel.",
    intro: [
      "Binnen Volkswagen lopen personenauto's, sportieve modellen en bedrijfswagens technisch en praktisch sterk uiteen. Een dagelijkse Caddy met standaard hardware vraagt een ander doel dan een auto met aangepaste onderdelen. Een Transporter met een defecte ECU vraagt eerst betrouwbare data-overdracht en regelunitherstel voordat software-optimalisatie überhaupt aan de orde is. Daarom biedt NoordTune geen enkele standaardroute voor het hele merk.",
      "We bepalen aan de hand van voertuig, motor, software, transmissie, onderhoud en gebruik of Stage 1, hardwarebewuste tuning, TCU-werk, diagnose of ECU cloning relevant is. De twee echte Volkswagen-cases op deze pagina laten dat verschil zien. Bij de Caddy publiceren we geen niet-aangeleverde koppelwaarde; bij de Transporter publiceren we geen verzonnen vermogensresultaat."
    ],
    sections: [
      {
        eyebrow: "Vooraf controleren",
        title: "Wat controleren wij vóór Volkswagen chiptuning?",
        body: [
          "We vragen kenteken of volledige uitvoering, motor, bouwjaar, transmissie, kilometerstand, onderhoud en gebruik. Voor een bedrijfswagen zijn belading, lange ritten en trekwerk relevant. Ook foutmeldingen, noodloop, regeneratieklachten, eerdere software en bekende hardwarewijzigingen moeten vooraf worden genoemd.",
          "ECU- en TCU-type worden bij het voertuig gecontroleerd en niet op basis van een modelnaam gegokt. Foutcodes en live data kunnen nodig zijn om vast te stellen of de basis gezond is. Bij een beschadigde of vervangen regelunit wordt tuning gescheiden van cloning en dataherstel: eerst moet de regelunit technisch correct functioneren."
        ],
        bullets: ["Personenauto of bedrijfswagen en werkelijk gebruik", "Motor-, software- en transmissievariant", "Foutcodes, onderhoud en regeneratiegedrag", "Originele of vervangen ECU en eerdere software"],
        links: [{label: "Auto diagnose", href: "/nl/auto-diagnose"}, {label: "ECU remap uitgelegd", href: "/nl/blog/wat-is-ecu-remap"}]
      },
      {
        eyebrow: "Stage 1",
        title: "Stage 1 moet dagelijks bruikbaar blijven.",
        body: [
          "Bij een Volkswagen met standaard hardware richt Stage 1 zich op een bruikbare koppelopbouw, betere respons en minder inspanning bij accelereren of belading. Voor bedrijfswagens is een gecontroleerde middentoerenrespons vaak belangrijker dan een hoog piekgetal. De calibratie moet passen bij koppeling of automaat en bij de thermische belasting van het werk dat de auto doet.",
          "De Volkswagen Caddy-case toont een geverifieerde vermogensverandering, maar er was geen betrouwbare koppelwaarde aangeleverd. Daarom staat die ook niet op de openbare pagina. Die transparantie geldt eveneens voor nieuwe aanvragen: we communiceren alleen gegevens die bij het concrete voertuig en traject horen."
        ],
        links: [{label: "Volkswagen Caddy Stage 1", href: "/nl/resultaten/vw-caddy-20-tdi-2020-stage-1"}, {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"}]
      },
      {
        eyebrow: "Stage 2 en hardware",
        title: "Meer hardware betekent meer controle, niet automatisch meer kwaliteit.",
        body: [
          "Stage 2 kan passend zijn wanneer ondersteunende hardware correct is gemonteerd en het voertuig technisch gezond is. Dan tellen turbo, luchttoevoer, koeling, brandstof, uitlaatconfiguratie waar wettelijk toegestaan en transmissiegrenzen mee. De software hoort op de aanwezige configuratie te worden afgestemd.",
          "Zonder meetgegevens en duidelijke herkomst van onderdelen is een exact resultaat niet professioneel te voorspellen. We controleren liever eerst dan dat we een algemene Stage 2-claim overnemen. Voor emissiegerelateerde systemen gebruiken we diagnose en zorgvuldige, juridisch verantwoorde taal."
        ],
        links: [{label: "Stage 2 tuning", href: "/nl/stage-2-tuning"}, {label: "Loganalyse vóór tuning", href: "/nl/blog/waarom-loganalyse-belangrijk-is-voor-tuning"}]
      },
      {
        eyebrow: "ECU, TCU en cloning",
        title: "ECU cloning is herstelwerk, geen synoniem voor chiptuning.",
        body: [
          "Bij ECU cloning worden beschikbare gegevens uit een beschadigde regelunit veilig gelezen en naar een passende vervangende unit overgezet. Identiteit, voertuigdata en compatibiliteit moeten kloppen voordat de auto weer correct kan functioneren. Een eventuele Stage 1-optimalisatie is een afzonderlijke stap en wordt pas beoordeeld wanneer de regelunitbasis op orde is.",
          "Bij automatische Volkswagens kan daarnaast transmissiecontrole relevant zijn. Koppellimieten en schakelstrategie moeten passen bij de motorcalibratie, maar TCU tuning is geen verplicht onderdeel van iedere remap. De Volkswagen Transporter-case laat ECU cloning en software-optimalisatie zien zonder niet-geverifieerde pk- of Nm-waarden te verzinnen."
        ],
        links: [{label: "Volkswagen Transporter ECU cloning", href: "/nl/resultaten/vw-transporter-20-tdi-2013-ecu-cloning-stage-1"}, {label: "DSG / TCU tuning", href: "/nl/dsg-tcu-tuning"}]
      },
      {
        eyebrow: "Diagnose en logs",
        title: "Diagnose bepaalt of tuning nu de juiste stap is.",
        body: [
          "Vermogensverlies, noodloop, rook, drukafwijkingen of emissiegerelateerde meldingen vragen eerst om analyse. Een foutcode is het begin, niet automatisch de oorzaak. Live data en logs kunnen laten zien of luchtmassa, turbodruk, brandstof en temperatuur zich gedragen zoals verwacht.",
          "Bij een gezonde basis kan tuning gericht worden voorbereid. Als data op een technisch probleem wijst, bespreken we herstel of aanvullend onderzoek. Zo blijft ECU-software een verbetering van een werkende auto en geen poging om een defect te verbergen."
        ]
      },
      {
        eyebrow: "Advies aanvragen",
        title: "Beschrijf wat jouw Volkswagen doet en waarvoor je hem gebruikt.",
        body: [
          "Stuur kenteken of exacte uitvoering, motor, bouwjaar, transmissie, kilometerstand en onderhoudsinformatie. Benoem belading of trekgebruik, aanwezige hardware, storingen, eerdere tuning en of de ECU ooit vervangen is. Voor cloning is informatie over de originele en vervangende unit nodig, maar publiceer of verstuur geen volledig VIN in openbare communicatie.",
          "Controleer de auto eerst in de Power Catalog en stuur daarna de gegevens via WhatsApp. We maken duidelijk onderscheid tussen prijsindicatie, verwachte mogelijkheid en een geverifieerd eindresultaat."
        ]
      }
    ],
    resultSlugs: resultSlugs.volkswagen,
    resultSummaries: {
      "vw-caddy-20-tdi-2020-stage-1": "Stage 1 software-optimalisatie voor een Volkswagen Caddy 2.0 TDI; alleen de aangeleverde vermogenswaarden zijn gepubliceerd.",
      "vw-transporter-20-tdi-2013-ecu-cloning-stage-1": "Cloning van een beschadigde ECU, correcte data-overdracht en afzonderlijke Stage 1-voorbereiding voor een Volkswagen Transporter."
    },
    resultsTitle: "Echte Volkswagen-klantresultaten",
    resultsIntro: "De Caddy en Transporter tonen twee verschillende diensten: voertuigspecifieke ECU-remap en regelunit-cloning. Open de cases voor de gecontroleerde details.",
    relatedTitle: "Volkswagen tuning en ECU-service verder bekijken",
    relatedIntro: "Kies de inhoud die past bij tuning, transmissie, diagnose of regelunitherstel.",
    relatedLinks: serviceLinks("nl", {transmission: true, stage2: true}),
    catalogTitle: "Controleer jouw Volkswagen in de NoordTune Power Catalog.",
    catalogIntro: "Nederlandse Volkswagens kunnen via RDW worden opgezocht; buitenlandse auto's kunnen handmatig worden geselecteerd. Getoonde waarden en prijzen zijn indicatief. Bedrijfsgebruik, software, transmissie en technische staat bepalen het definitieve advies.",
    catalogBullets: ["RDW-kentekencheck", "Handmatige selectie voor buitenlandse voertuigen", "Indicatieve ECU- en TCU-mogelijkheden", "Persoonlijk advies voor auto of bedrijfswagen"],
    catalogCta: "Controleer jouw Volkswagen in de NoordTune Power Catalog",
    whatsappCta: "Vraag Volkswagen-advies via WhatsApp",
    faq: [
      {question: "Is Volkswagen Stage 1 geschikt voor bedrijfswagens?", answer: "Dat kan, maar gebruik, belading, onderhoud, motorvariant en transmissie bepalen de aanpak. Dagelijkse bruikbaarheid blijft leidend."},
      {question: "Is ECU cloning hetzelfde als ECU remap?", answer: "Nee. Cloning zet noodzakelijke voertuigdata over naar een vervangende regelunit. Tuning is een aparte calibratiestap."},
      {question: "Waarom staat er geen koppel bij de Caddy-case?", answer: "Omdat geen geverifieerde koppelwaarde is aangeleverd. NoordTune publiceert geen verzonnen technische gegevens."},
      {question: "Zijn software-oplossingen voor emissiesystemen altijd toegestaan?", answer: "Nee. Diagnose, voertuiggebruik en regelgeving bepalen wat technisch en wettelijk passend is. We adverteren geen generieke verwijdering."}
    ],
    disclaimer: "Volkswagen-resultaten verschillen per motor, ECU/TCU, software, onderhoud, brandstof, transmissie, hardware, belading en gebruik. Niet-aangeleverde waarden worden niet ingevuld."
  },
  {
    brand: "ford",
    brandName: "Ford",
    locale: "nl",
    slug: "ford-chiptuning",
    status: "published",
    metaTitle: "Ford chiptuning | EcoBlue ECU-remap & diagnose | NoordTune.nl",
    metaDescription: "Ford chiptuning met dagelijkse trekkracht, diagnose en zorgvuldige EcoBlue-calibratie. Bekijk de echte Transit Connect Stage 1 case.",
    heroTitle: "Ford chiptuning voor betere dagelijkse trekkracht",
    heroIntro: "Een moderne Ford vraagt om calibratie die past bij motor, software, gebruik en emissiesystemen. NoordTune kiest voor controle, soepele koppelopbouw en heldere grenzen.",
    heroImage: sharedImages.ford,
    heroImageAlt: "Ford Transit Connect 1.5 EcoBlue Stage 1 klantresultaat bij NoordTune.nl",
    introTitle: "Ford EcoBlue tuning begint bij gebruik en technische staat.",
    intro: [
      "Ford-personenauto's en bedrijfswagens worden vaak dagelijks intensief gebruikt. Juist dan moet extra trekkracht voorspelbaar beschikbaar zijn zonder dat de calibratie alleen op een piekgetal is gericht. Bij moderne EcoBlue-toepassingen werken turbodruk, brandstof, koppelmanagement en emissiestrategieën samen. Daarom wordt de exacte ECU en software bij de auto gecontroleerd in plaats van vooraf gegokt.",
      "NoordTune gebruikt kenteken- of voertuiggegevens voor een eerste indicatie en bespreekt daarna onderhoud, storingen, transmissie en gebruik. De Ford Transit Connect-klantcase op deze pagina is een echt Stage 1-resultaat voor één specifieke auto. De getoonde winst is niet automatisch van toepassing op iedere Transit Connect of EcoBlue-uitvoering."
    ],
    sections: [
      {
        eyebrow: "Vooraf controleren",
        title: "Wat controleren wij vóór Ford chiptuning?",
        body: [
          "We vragen model, motor, bouwjaar, transmissie, kilometerstand, onderhoud en dagelijks gebruik. Voor een bestelauto horen belading, korte ritten, snelweggebruik en trekwerk bij de context. Foutmeldingen, regeneratieproblemen, noodloop of een wisselende vermogensafgifte moeten vóór tuning worden genoemd.",
          "De regelunit en software worden tijdens het traject vastgesteld. Waar nodig gebruiken we diagnose en meetwaarden om te beoordelen of lucht, druk, brandstof en temperatuur logisch reageren. Bij een storing is software-optimalisatie niet de eerste stap; dan zoeken we eerst naar de oorzaak."
        ],
        bullets: ["Exacte EcoBlue-uitvoering en software", "Onderhoud, foutcodes en rijprofiel", "Belading, trekwerk en dagelijks gebruik", "Transmissie zonder aannames"],
        links: [{label: "Auto diagnose", href: "/nl/auto-diagnose"}, {label: "Waarom diagnose vóór tuning?", href: "/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is"}]
      },
      {
        eyebrow: "Stage 1",
        title: "Stage 1 richt zich op bruikbaar koppel, niet alleen pk's.",
        body: [
          "Een Stage 1-remap voor een technisch gezonde Ford met standaard hardware kan de respons en trekkracht in het dagelijkse toerentalgebied verbeteren. De calibratie wordt afgestemd op de werkelijke motor- en softwarevariant. Vooral bij bedrijfswagens is een soepele opbouw belangrijk, zodat de auto met belading of bij inhalen sterker maar voorspelbaar blijft reageren.",
          "De Transit Connect-case toont de geverifieerde waarden van dat project. Andere bouwjaren, vermogensvarianten, softwareversies of transmissies kunnen een andere uitkomst vragen. De Power Catalog geeft daarom een indicatie, waarna de concrete auto wordt beoordeeld."
        ],
        links: [{label: "Ford Transit Connect Stage 1", href: "/nl/resultaten/ford-transit-connect-15-ecoblue-2019-stage-1"}, {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"}]
      },
      {
        eyebrow: "Stage 2 en hardware",
        title: "Stage 2 is alleen relevant met passende, gecontroleerde hardware.",
        body: [
          "Niet iedere Ford heeft baat bij Stage 2. Wanneer hardware is aangepast, moeten turbo, luchttoevoer, koeling, brandstofvoorziening, transmissie en uitlaatconfiguratie waar wettelijk toegestaan als geheel worden beoordeeld. Een dagelijkse bedrijfswagen kan meer hebben aan een beheerste Stage 1 dan aan een agressiever doel.",
          "We gebruiken geen standaard Stage 2-belofte op basis van merk of motorinhoud. Meetgegevens, onderdeelkwaliteit en gebruik bepalen of de route technisch verantwoord is. Als de basis niet klopt, is herstel de betere investering."
        ],
        links: [{label: "Wanneer is Stage 2 verstandig?", href: "/nl/blog/wanneer-is-stage-2-tuning-verstandig"}, {label: "Loganalyse", href: "/nl/loganalyse"}]
      },
      {
        eyebrow: "ECU en transmissie",
        title: "Koppel moet passen bij de aanwezige aandrijflijn.",
        body: [
          "De ECU verdeelt niet onbeperkt vermogen; koppelvraag en bescherming zijn onderdeel van het totale regelsysteem. De transmissie en koppeling moeten het gevraagde koppel kunnen verwerken. Omdat het transmissietype van een aanvraag niet altijd uit alleen model en bouwjaar volgt, publiceren of adviseren we geen gok.",
          "Stuur daarom altijd door of de Ford handgeschakeld of automatisch is en of er eerder transmissiewerk is uitgevoerd. Pas daarna kan worden beoordeeld of alleen ECU-calibratie of aanvullende aandacht voor de aandrijflijn nodig is."
        ]
      },
      {
        eyebrow: "Emissies en diagnose",
        title: "EcoBlue-storingen vragen analyse en juridisch zorgvuldige keuzes.",
        body: [
          "DPF-, EGR- of AdBlue-meldingen worden eerst als storings- en diagnosevraag behandeld. We kijken naar foutcodes, omstandigheden en technische oorzaak. Tuning hoort een bestaande storing niet te verbergen. Openbare informatie beschrijft daarom diagnose en software-oplossingen uitsluitend waar wettelijk toegestaan en afhankelijk van voertuig, gebruik en regelgeving.",
          "De door de eigenaar goedgekeurde marketinggraphic van de Transit Connect bevat historische projecttekst. De websitecopy formuleert de dienst bewust voorzichtiger en doet geen algemene belofte over emissiesysteemwijzigingen of toelating op de openbare weg."
        ],
        links: [{label: "DPF, EGR of AdBlue storing: wat nu?", href: "/nl/blog/dpf-egr-of-adblue-storing-wat-nu"}, {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"}]
      },
      {
        eyebrow: "Advies aanvragen",
        title: "Stuur rijprofiel en voertuiggegevens mee.",
        body: [
          "Voor gericht advies ontvangen we kenteken of exacte Ford-uitvoering, motor, bouwjaar, transmissie, kilometerstand en onderhoud. Vermeld belading, trekgebruik, ritlengte, storingen, eerdere software en hardwarewijzigingen. Daarmee kunnen we onderscheid maken tussen een tuningvraag en een diagnosevraag.",
          "Begin in de Power Catalog en stuur daarna via WhatsApp wat je van de auto verwacht. We geven geen gegarandeerde besparing of exact vermogen zonder de concrete auto te beoordelen."
        ]
      }
    ],
    resultSlugs: resultSlugs.ford,
    resultSummaries: {"ford-transit-connect-15-ecoblue-2019-stage-1": "Maatwerk Stage 1 voor een Ford Transit Connect 1.5 EcoBlue, gericht op respons en bruikbare trekkracht in dagelijks gebruik."},
    resultsTitle: "Echt Ford-klantresultaat",
    resultsIntro: "Bekijk het geverifieerde Transit Connect-project als voorbeeld van een voertuigspecifieke EcoBlue-calibratie, niet als universele vermogensbelofte.",
    relatedTitle: "Ford tuning en diagnose verder bekijken",
    relatedIntro: "Gebruik deze routes om Stage 1, diagnose en de praktische gevolgen van tuning beter te begrijpen.",
    relatedLinks: serviceLinks("nl", {stage2: true}),
    catalogTitle: "Controleer jouw Ford in de NoordTune Power Catalog.",
    catalogIntro: "Nederlandse Fords kunnen via kenteken/RDW worden opgezocht. Internationale voertuigen selecteer je handmatig. De getoonde winst en prijs zijn indicatief; software, transmissie, staat en gebruik bepalen het uiteindelijke advies.",
    catalogBullets: ["RDW-kentekencheck", "Handmatige selectie voor buitenlandse Fords", "Indicatieve Stage-opties en prijzen", "Definitieve beoordeling per voertuig"],
    catalogCta: "Controleer jouw Ford in de NoordTune Power Catalog",
    whatsappCta: "Vraag Ford-advies via WhatsApp",
    faq: [
      {question: "Is Ford EcoBlue geschikt voor Stage 1?", answer: "Dat hangt af van de exacte uitvoering, software, onderhoud en storingsstatus. Een gezonde technische basis is noodzakelijk."},
      {question: "Levert chiptuning altijd brandstofbesparing op?", answer: "Nee. Meer koppel kan rustiger rijden ondersteunen, maar verbruik wordt vooral bepaald door rijstijl, belasting, route en gebruik van het extra vermogen."},
      {question: "Kunnen jullie een AdBlue- of DPF-melding eerst onderzoeken?", answer: "Ja. We behandelen dit als diagnosevraag en bespreken alleen technisch passende oplossingen waar wettelijk toegestaan."},
      {question: "Gelden de Transit Connect-waarden voor mijn Ford?", answer: "Nee. Die waarden horen bij één specifieke auto. Controleer jouw uitvoering in de catalogus en stuur de voertuiggegevens voor advies."}
    ],
    disclaimer: "Ford-resultaten verschillen per motor, ECU-software, onderhoud, transmissie, brandstof, belading, hardware en gebruik. Emissiegerelateerde oplossingen worden alleen beoordeeld waar wettelijk toegestaan."
  },
  {
    brand: "toyota",
    brandName: "Toyota",
    locale: "nl",
    slug: "toyota-chiptuning",
    status: "published",
    metaTitle: "Toyota chiptuning | Comfort Power op maat | NoordTune.nl",
    metaDescription: "Toyota chiptuning met een rustige Comfort Power-aanpak, diagnose en voertuigspecifieke ECU-remap. Bekijk de echte ProAce Verso VIP case.",
    heroTitle: "Toyota chiptuning met Comfort Power",
    heroIntro: "Meer souplesse en inhaalreserve zonder het comfortabele karakter te verliezen. NoordTune stemt Toyota-software af op voertuig, gebruik en actieve systemen.",
    heroImage: sharedImages.toyota,
    heroImageAlt: "Toyota ProAce Verso VIP Stage 1 Comfort Power klantresultaat bij NoordTune.nl",
    introTitle: "Toyota tuning hoeft niet agressief te zijn om duidelijk verschil te maken.",
    intro: [
      "Bij een ruime personenbus of dagelijkse Toyota draait een goede calibratie vaak om rust, souplesse en bruikbare trekkracht. Extra vermogen is dan geen doel op zichzelf. De respons moet passen bij passagiers, lange ritten, belading en de manier waarop de transmissie het koppel verwerkt. NoordTune gebruikt daarom de term Comfort Power voor een beheerste Stage 1 die bewust niet als sportieve maximaalaanpak wordt gepositioneerd.",
      "De Toyota ProAce Verso VIP-klantcase op deze pagina is een geverifieerd project waarbij DPF, EGR en AdBlue actief bleven. Dat is informatie over die specifieke auto. Ook bij andere Toyota's controleren we eerst de exacte motor, ECU-software, transmissie, onderhoud en storingsstatus voordat een verwachting wordt bevestigd."
    ],
    sections: [
      {
        eyebrow: "Vooraf controleren",
        title: "Wat controleren wij vóór Toyota chiptuning?",
        body: [
          "We verzamelen kenteken of exacte uitvoering, motor, bouwjaar, transmissie, kilometerstand, onderhoud en gebruik. Voor een ProAce Verso zijn passagiers, bagage, lange afstanden en trekgebruik relevant. Foutmeldingen, regeneratiegedrag, eerdere software of een wisselende vermogensafgifte worden vooraf besproken.",
          "De ECU en softwareversie worden aan de auto vastgesteld. We gokken geen regelunit op basis van een modelnaam. Foutcodes en live data kunnen nodig zijn om te controleren of druk, lucht, brandstof, temperatuur en emissiesystemen logisch functioneren."
        ],
        bullets: ["Exacte Toyota-uitvoering en software", "Transmissie en dagelijks gebruik", "Onderhoud en storingsstatus", "DPF, EGR en AdBlue als actieve systemen"],
        links: [{label: "Auto diagnose", href: "/nl/auto-diagnose"}, {label: "Diagnose vóór tuning", href: "/nl/blog/waarom-diagnose-voor-tuning-belangrijk-is"}]
      },
      {
        eyebrow: "Stage 1 Comfort Power",
        title: "Meer reserve met een rustige vermogensopbouw.",
        body: [
          "Comfort Power is een Stage 1-benadering voor klanten die vooral soepeler willen accelereren, makkelijker willen inhalen en minder vaak diep het gaspedaal willen gebruiken. De calibratie blijft afgestemd op standaard hardware en de technische staat. Een gelijkmatige koppelopbouw helpt om het comfortabele karakter van de auto te behouden.",
          "De ProAce Verso VIP-case laat een concrete verandering zien van 177 pk en 400 Nm naar 205 pk en 450 Nm. Die cijfers horen bij dat voertuig. Andere Toyota-uitvoeringen kunnen een ander vertrekpunt, andere software of andere marges hebben."
        ],
        links: [{label: "Toyota ProAce Comfort Power case", href: "/nl/resultaten/toyota-proace-verso-vip-20d-2023-stage-1"}, {label: "Stage 1 tuning", href: "/nl/stage-1-tuning"}]
      },
      {
        eyebrow: "Stage 2 en hardware",
        title: "Stage 2 past niet automatisch bij een comfortgerichte Toyota.",
        body: [
          "Wanneer hardware is aangepast kan een vervolgstap technisch mogelijk zijn, maar dat maakt Stage 2 nog niet vanzelf de juiste keuze. Koeling, turbo, lucht- en brandstofvoorziening, transmissie en uitlaatdelen waar wettelijk toegestaan moeten bij het doel passen. Voor een lange-afstandsauto of personenbus kan betrouwbaarheid en voorspelbaarheid belangrijker zijn dan een hoger maximum.",
          "NoordTune bespreekt daarom eerst gebruik en verwachtingen. Als een hardwaretraject geen duidelijke meerwaarde heeft of onvoldoende onderbouwd is, adviseren we een rustigere calibratie of aanvullende controle."
        ],
        links: [{label: "Wanneer is Stage 2 verstandig?", href: "/nl/blog/wanneer-is-stage-2-tuning-verstandig"}]
      },
      {
        eyebrow: "ECU en transmissie",
        title: "Comfort ontstaat wanneer motor en aandrijflijn logisch samenwerken.",
        body: [
          "De ECU stuurt de koppelopbouw aan, maar de transmissie bepaalt mede hoe dat koppel voelbaar wordt. Daarom vragen we altijd welk transmissietype aanwezig is en hoe de auto schakelt. We nemen geen TCU-details aan die niet bij de auto zijn vastgesteld.",
          "Bij een comfortgerichte calibratie zoeken we geen harde ingrepen of nerveuze respons. De vermogensvraag moet voorspelbaar blijven bij wegrijden, inhalen en rijden met passagiers of bagage."
        ]
      },
      {
        eyebrow: "Diagnose en actieve systemen",
        title: "DPF, EGR en AdBlue bleven actief in de Toyota-klantcase.",
        body: [
          "Bij de gepubliceerde ProAce Verso VIP bleven DPF, EGR en AdBlue actief. Dat sluit aan op het comfort- en betrouwbaarheidsdoel van dat project. Bij een storing wordt eerst onderzocht welke technische oorzaak aanwezig is; tuning is geen vervanging voor diagnose.",
          "We adverteren geen generieke verwijdering van emissiesystemen. Advies en software-oplossingen worden alleen besproken waar wettelijk toegestaan en afhankelijk van voertuig, gebruik en regelgeving."
        ],
        links: [{label: "DPF, EGR of AdBlue storing: wat nu?", href: "/nl/blog/dpf-egr-of-adblue-storing-wat-nu"}, {label: "Auto diagnose Assen", href: "/nl/auto-diagnose-assen"}]
      },
      {
        eyebrow: "Advies aanvragen",
        title: "Vertel hoe jouw Toyota dagelijks wordt gebruikt.",
        body: [
          "Stuur kenteken of exacte uitvoering, motor, bouwjaar, transmissie, kilometerstand en onderhoud. Benoem passagiers- of bedrijfsgebruik, belading, trekwerk, storingen, eerdere tuning en je gewenste rijgevoel. Zo kunnen we comfort, trekkracht en technische marges op een realistische manier wegen.",
          "Gebruik de Power Catalog voor een eerste indicatie en WhatsApp voor persoonlijk advies. De uiteindelijke calibratie wordt niet gebaseerd op alleen een modelnaam of op het resultaat van een andere Toyota."
        ]
      }
    ],
    resultSlugs: resultSlugs.toyota,
    resultSummaries: {"toyota-proace-verso-vip-20d-2023-stage-1": "Stage 1 Comfort Power voor een Toyota ProAce Verso VIP 2.0D, met actieve DPF-, EGR- en AdBlue-systemen."},
    resultsTitle: "Echt Toyota-klantresultaat",
    resultsIntro: "De ProAce Verso VIP-case laat een comfortgerichte calibratie met geverifieerde waarden en actieve emissiesystemen zien.",
    relatedTitle: "Toyota tuning verder bekijken",
    relatedIntro: "Lees hoe Stage 1, diagnose en voertuigspecifieke calibratie samenkomen.",
    relatedLinks: serviceLinks("nl", {stage2: true}),
    catalogTitle: "Controleer jouw Toyota in de NoordTune Power Catalog.",
    catalogIntro: "Controleer een Nederlandse Toyota via RDW of selecteer een buitenlands voertuig handmatig. De prijs en winst zijn indicatief. De exacte uitvoering, software, transmissie, staat en gebruik bepalen het persoonlijke advies.",
    catalogBullets: ["RDW-kentekencheck", "Handmatige selectie voor internationale Toyota's", "Indicatieve Stage 1- en Comfort Power-mogelijkheden", "Definitieve afstemming op voertuig en gebruik"],
    catalogCta: "Controleer jouw Toyota in de NoordTune Power Catalog",
    whatsappCta: "Vraag Toyota-advies via WhatsApp",
    faq: [
      {question: "Wat betekent Comfort Power?", answer: "Een beheerste Stage 1-benadering met focus op souplesse, inhaalreserve en dagelijks comfort in plaats van een agressieve vermogensafgifte."},
      {question: "Blijven DPF, EGR en AdBlue actief?", answer: "In de gepubliceerde ProAce Verso VIP-case bleven deze systemen actief. De aanpak wordt voor ieder voertuig afzonderlijk beoordeeld."},
      {question: "Is Stage 2 geschikt voor een Toyota personenbus?", answer: "Niet automatisch. Gebruik, hardware, koeling, transmissie en technische staat bepalen of Stage 2 zinvol is."},
      {question: "Zijn de ProAce-resultaten gegarandeerd voor mijn Toyota?", answer: "Nee. De waarden horen bij één specifieke auto en configuratie. De catalogus en voertuigcontrole geven een eigen indicatie."}
    ],
    disclaimer: "Toyota-resultaten zijn voertuigspecifiek en hangen af van motor, ECU-software, onderhoud, transmissie, brandstof, hardware, belading en gebruik. Comfort en betrouwbaarheid blijven onderdeel van het advies."
  },
  {
    brand: "bmw",
    brandName: "BMW",
    locale: "en",
    slug: "bmw-chiptuning",
    status: "published",
    metaTitle: "BMW chiptuning and ECU/TCU calibration | NoordTune.nl",
    metaDescription: "BMW chiptuning with diagnostics, vehicle-specific ECU remapping and gearbox-aware torque management. See verified BMW customer results.",
    heroTitle: "BMW chiptuning with ECU and TCU coordination",
    heroIntro: "Useful torque and better response depend on the engine software, transmission, maintenance and intended use of the exact BMW.",
    heroImage: sharedImages.bmw,
    heroImageAlt: "BMW X3 E83 Stage 1 customer result used for BMW chiptuning at NoordTune.nl",
    introTitle: "A BMW calibration must work with the complete drivetrain.",
    intro: [
      "BMW engine management and transmission torque strategies are closely connected. A remap should therefore start with the exact model, engine, software version, gearbox, maintenance history and intended use rather than a generic power figure. NoordTune uses the Power Catalog for an initial indication, then checks which technical route fits the actual car.",
      "For one BMW, a controlled Stage 1 on standard hardware may be the right choice. Another may need diagnostics first, or a review of transmission limits before additional torque is requested. The two published cases on this page show genuine ECU and TCU work, but their figures and settings apply only to those vehicles."
    ],
    sections: [
      {eyebrow: "Pre-tuning checks", title: "What do we check before tuning a BMW?", body: ["We ask for registration or full vehicle details, engine, year, gearbox, mileage, maintenance, previous software and any symptoms. Faults, power loss or inconsistent shifting can make diagnostics the first step.", "The installed ECU, TCU and software are verified at the vehicle. Fault codes and relevant pressure, air, fuel, temperature and torque data may be checked rather than assuming a control-unit family from the model name."], bullets: ["Exact engine and software variant", "Maintenance and existing faults", "Transmission and realistic torque limits", "Daily, towing or performance use"], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}, {label: "Why diagnostics before tuning matter", href: "/en/news-blog/why-diagnostics-before-tuning-matter"}]},
      {eyebrow: "Stage 1", title: "BMW Stage 1 should deliver torque progressively.", body: ["Stage 1 is designed for a technically healthy BMW on standard hardware. The aim is usable mid-range response and predictable throttle behaviour within sensible margins, not a single peak number.", "Vehicles with the same badge can use different software and transmissions. Catalog figures remain indicative until the exact car has been identified and its condition is understood."], links: [{label: "Chiptuning service", href: "/en/chiptuning"}]},
      {eyebrow: "Stage 2", title: "Stage 2 requires proven, suitable hardware.", body: ["A hardware-aware setup may involve cooling, airflow, fuel quality, turbo condition, transmission limits and exhaust components where legally permitted. The calibration must be built around what is actually installed.", "Logs can confirm whether requested and measured values agree under load. If the technical basis is weak, repair or a more conservative target is the responsible recommendation."], links: [{label: "When does Stage 2 make sense?", href: "/en/news-blog/when-does-stage-2-tuning-make-sense"}, {label: "Why log analysis matters", href: "/en/news-blog/why-log-analysis-matters-before-tuning"}]},
      {eyebrow: "Drivetrain", title: "ECU and TCU must tell the same torque story.", body: ["Torque requests, interventions and shift strategies affect how the added output reaches the road. Ignoring the gearbox can produce a result that looks strong on paper but feels inconsistent in use.", "TCU work is not automatically required. The published BMW F40 project is a verified GETRAG 7DCT300 calibration and should not be treated as a promise for every BMW gearbox."], links: [{label: "BMW F40 TCU result", href: "/en/results/bmw-f40-118i-7dct300-tcu-tuning"}, {label: "Torque limiters in ECU and TCU", href: "/en/news-blog/torque-limiters-in-ecu-and-tcu"}]},
      {eyebrow: "Diagnostics and logs", title: "Data prevents software from masking an existing fault.", body: ["A car can feel acceptable while sensor, boost, fuel or transmission data already show a problem. Tuning increases load and should not be layered over an unknown fault.", "Fault codes, live values and road logs are used when the vehicle or target requires them. The level of testing remains proportional to the complexity of the project."], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}]},
      {eyebrow: "Requesting advice", title: "Send the details needed to assess your BMW.", body: ["Provide registration or exact model, engine, year, gearbox, mileage, modifications, faults, previous tuning and intended use. Avoid sending a full VIN through public channels.", "Start with the Power Catalog, then use WhatsApp for a vehicle-specific discussion. We do not promise the same gain as another BMW result." ]}
    ],
    resultSlugs: resultSlugs.bmw,
    resultSummaries: {"bmw-x3-e83-20d-stage-1": "A custom Stage 1 calibration for a BMW X3 E83 2.0d with verified vehicle-specific figures.", "bmw-f40-118i-7dct300-tcu-tuning": "GETRAG 7DCT300 transmission calibration for a BMW F40 118i, matched to its engine setup."},
    resultsTitle: "Verified BMW customer results",
    resultsIntro: "These cases show two different disciplines: engine calibration and transmission control. Open each case for the verified data and limitations.",
    relatedTitle: "Explore BMW tuning services",
    relatedIntro: "Use the relevant service, diagnostic and customer-result pages to prepare an informed request.",
    relatedLinks: serviceLinks("en", {transmission: true, stage2: true}),
    catalogTitle: "Check your BMW in the NoordTune Power Catalog.",
    catalogIntro: "Dutch vehicles can use RDW registration lookup; international cars can be selected manually. Displayed gains and prices are indicative. Final advice depends on the exact BMW, software, drivetrain and condition.",
    catalogBullets: ["RDW lookup for Dutch registrations", "Manual selection for international BMWs", "Indicative engine and transmission options", "Final review of the exact vehicle"],
    catalogCta: "Check your BMW in the NoordTune Power Catalog",
    whatsappCta: "Ask for BMW advice on WhatsApp",
    faq: [
      {question: "Is Stage 1 suitable for every BMW?", answer: "No. Engine variant, software, maintenance, transmission and condition determine whether Stage 1 is suitable."},
      {question: "Is TCU tuning always needed?", answer: "No. It is considered only when the gearbox, torque limits, shift behaviour and target make it relevant."},
      {question: "Why can my result differ from the case study?", answer: "Each case belongs to one vehicle. Software, maintenance, fuel, hardware and transmission may differ on yours."},
      {question: "What information should I send?", answer: "Send the exact model, engine, year, gearbox, mileage, modifications, faults and intended use through WhatsApp."}
    ],
    disclaimer: "BMW results are vehicle-specific. Engine, ECU/TCU, software, maintenance, fuel, transmission, hardware and use determine the responsible outcome."
  },
  {
    brand: "audi",
    brandName: "Audi",
    locale: "en",
    slug: "audi-chiptuning",
    status: "published",
    metaTitle: "Audi chiptuning, Stage 1 and Stage 2 | NoordTune.nl",
    metaDescription: "Audi chiptuning with diagnostics, log analysis and hardware-aware ECU calibration. View the verified Audi A4 Stage 2+ customer result.",
    heroTitle: "Audi chiptuning matched to the hardware",
    heroIntro: "From a controlled Stage 1 to a more complex hardware project, Audi software must match the engine, turbo, transmission and real vehicle condition.",
    heroImage: sharedImages.audi,
    heroImageAlt: "Audi A4 B7 2.0 TDI Stage 2+ customer result at NoordTune.nl",
    introTitle: "Audi tuning depends on how software, hardware and drivetrain work together.",
    intro: ["An Audi can become stronger and smoother with the right calibration, but the badge alone does not define the available margin. Engine, ECU software, turbo, fuel system, gearbox, maintenance and installed hardware all matter.", "The published A4 B7 Stage 2+ case shows a calibration built around a hybrid turbo and downpipe. It proves that specific project; it does not promise the same figures for every A4 or 2.0 TDI."],
    sections: [
      {eyebrow: "Pre-tuning checks", title: "What do we check before tuning an Audi?", body: ["We collect registration or full vehicle details, engine, year, gearbox, maintenance, faults and hardware changes. Smoke, limp mode, regeneration issues or unstable shifting require diagnosis before tuning.", "The ECU, TCU and software are verified at the car. Relevant air, pressure, fuel and temperature data can be checked instead of guessing a control unit from model and year."], bullets: ["Exact engine and software", "Turbo and hardware condition", "Transmission and torque management", "Fault codes and maintenance"], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}, {label: "Why log analysis matters", href: "/en/news-blog/why-log-analysis-matters-before-tuning"}]},
      {eyebrow: "Stage 1", title: "Stage 1 uses standard hardware as its baseline.", body: ["For a healthy Audi on standard hardware, Stage 1 is often the sensible route. The goal is usable torque, predictable response and suitable margins for the turbo, fuel system and gearbox.", "Catalog figures remain indicative because software and drivetrain details can vary within the same model."], links: [{label: "Chiptuning service", href: "/en/chiptuning"}]},
      {eyebrow: "Stage 2 and hardware", title: "Stage 2 must be calibrated around what is installed.", body: ["A Stage 2 project can involve turbo, intake, cooling, fuel delivery, transmission and exhaust hardware where legally permitted. A generic file is not enough for a configuration that differs from standard.", "The A4 Stage 2+ case uses verified hardware and project data. Its result must not be applied to another Audi without inspection."], links: [{label: "Audi A4 Stage 2+ result", href: "/en/results/audi-a4-b7-20-tdi-stage-2-plus"}, {label: "When does Stage 2 make sense?", href: "/en/news-blog/when-does-stage-2-tuning-make-sense"}]},
      {eyebrow: "ECU and transmission", title: "Torque management must suit the Audi drivetrain.", body: ["The ECU, traction systems and transmission influence how torque is delivered. Automatic or dual-clutch transmissions may require a review of limits and shift behaviour, but TCU tuning is not automatically needed.", "The intended use matters: a daily Audi and a hardware project need different response and calibration priorities."], links: [{label: "Chiptuning with an automatic transmission", href: "/en/news-blog/chiptuning-with-automatic-transmission"}]},
      {eyebrow: "Diagnostics and logs", title: "Boost and temperature behaviour should be verified under load.", body: ["Logging checks whether requested and measured values stay aligned. More boost alone is not a complete tune; air, fuel, heat, torque and protection strategies must remain coherent.", "DPF, EGR and AdBlue faults are treated as diagnostic issues first. Software solutions are discussed only where legally permitted and appropriate for vehicle and use."], links: [{label: "Turbo, fuel and EGT explained", href: "/en/news-blog/turbo-fuel-and-egt-explained"}]},
      {eyebrow: "Requesting advice", title: "Describe the complete Audi configuration.", body: ["Send the exact vehicle, engine, year, gearbox, mileage, maintenance, modifications, fuel, faults and previous tuning. Hardware details are essential for Stage 2 enquiries.", "Use the Power Catalog first, then WhatsApp for a precise intake. We prefer a conditional answer over an unsupported exact promise."]}
    ],
    resultSlugs: resultSlugs.audi,
    resultSummaries: {"audi-a4-b7-20-tdi-stage-2-plus": "A genuine hardware-aware Stage 2+ Audi A4 B7 project with a hybrid turbo and downpipe."},
    resultsTitle: "Verified Audi customer result",
    resultsIntro: "The A4 project shows how vehicle data, hardware and calibration are combined. Open it for verified figures and the vehicle-specific disclaimer.",
    relatedTitle: "Explore the right Audi tuning route",
    relatedIntro: "Read about calibration, diagnostics and transmission considerations before choosing a service.",
    relatedLinks: serviceLinks("en", {transmission: true, stage2: true}),
    catalogTitle: "Check your Audi in the NoordTune Power Catalog.",
    catalogIntro: "Use RDW registration lookup for Dutch cars or select an international Audi manually. Power and price figures are indicative; the exact engine, software, hardware and gearbox determine final advice.",
    catalogBullets: ["RDW lookup for Dutch Audis", "Manual international vehicle selection", "Indicative Stage 1, Stage 2 and TCU options", "Personal hardware and software review"],
    catalogCta: "Check your Audi in the NoordTune Power Catalog",
    whatsappCta: "Ask for Audi advice on WhatsApp",
    faq: [
      {question: "Is Stage 1 the best option for every Audi?", answer: "Not always, although it is often suitable for a healthy standard car. The exact variant and intended use remain decisive."},
      {question: "What makes Audi Stage 2 different?", answer: "It requires suitable hardware and additional checks of boost, airflow, fuel, temperature and drivetrain."},
      {question: "Do I need TCU tuning?", answer: "Only when the installed gearbox, torque limits and calibration target make it relevant."},
      {question: "Will my Audi match the A4 result?", answer: "Not necessarily. That result belongs to one car with a specific hardware configuration."}
    ],
    disclaimer: "Audi results vary with engine, ECU/TCU, software, maintenance, turbo, transmission, fuel, hardware and use. Always check which hardware modifications are legally permitted."
  },
  {
    brand: "volkswagen",
    brandName: "Volkswagen",
    locale: "en",
    slug: "volkswagen-chiptuning",
    status: "published",
    metaTitle: "Volkswagen chiptuning and ECU services | NoordTune.nl",
    metaDescription: "Volkswagen chiptuning for cars and vans, with diagnostics and ECU cloning kept as distinct services. See verified Caddy and Transporter cases.",
    heroTitle: "Volkswagen chiptuning for cars and commercial vehicles",
    heroIntro: "ECU remapping, transmission checks and ECU repair each require a different route. NoordTune matches the work to the exact Volkswagen and its use.",
    heroImage: sharedImages.volkswagen,
    heroImageAlt: "Volkswagen Caddy 2.0 TDI Stage 1 customer result at NoordTune.nl",
    introTitle: "Volkswagen tuning and ECU recovery are not the same service.",
    intro: ["Passenger cars, performance models and commercial Volkswagens have very different requirements. A daily Caddy on standard hardware needs a different target from a modified car, while a Transporter with a damaged ECU first needs correct data recovery and replacement-unit preparation.", "NoordTune distinguishes Stage 1, hardware-aware tuning, transmission work, diagnostics and ECU cloning. The Caddy case does not invent missing torque data, and the Transporter case does not claim unverified power figures."],
    sections: [
      {eyebrow: "Pre-tuning checks", title: "What do we check before tuning a Volkswagen?", body: ["We ask for the exact vehicle, engine, year, gearbox, mileage, maintenance, usage and any symptoms. Load, towing and long-distance use matter for commercial vehicles.", "The ECU and TCU are verified rather than guessed. If a control unit is damaged or replaced, correct cloning and data transfer come before any tuning decision."], bullets: ["Passenger or commercial use", "Engine, software and transmission", "Faults and regeneration behaviour", "Original or replacement ECU"], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}]},
      {eyebrow: "Stage 1", title: "Stage 1 should remain practical in daily use.", body: ["A healthy standard Volkswagen can benefit from more usable response and torque. For vans, controlled mid-range performance and thermal responsibility are often more valuable than a peak number.", "The Caddy case publishes only the supplied power figures. No torque value is shown because it was not verified."], links: [{label: "Volkswagen Caddy result", href: "/en/results/vw-caddy-20-tdi-2020-stage-1"}]},
      {eyebrow: "Stage 2 and hardware", title: "Hardware changes require additional evidence and logging.", body: ["Turbo, intake, cooling, fuel, gearbox and legally permitted exhaust hardware must work together. A generic Stage 2 promise is not a substitute for inspection.", "If logs or maintenance show a weak technical basis, repair or a conservative target is the better route."], links: [{label: "Why log analysis matters", href: "/en/news-blog/why-log-analysis-matters-before-tuning"}]},
      {eyebrow: "ECU, TCU and cloning", title: "ECU cloning restores vehicle data before calibration.", body: ["Cloning transfers the required original vehicle data to a suitable replacement control unit. It is recovery work, not another name for remapping.", "Transmission limits can also matter, but TCU tuning is assessed separately. The Transporter case documents cloning and Stage 1 work without inventing power or torque values."], links: [{label: "Volkswagen Transporter ECU cloning", href: "/en/results/vw-transporter-20-tdi-2013-ecu-cloning-stage-1"}, {label: "Torque limiters in ECU and TCU", href: "/en/news-blog/torque-limiters-in-ecu-and-tcu"}]},
      {eyebrow: "Diagnostics and logs", title: "A fault should be diagnosed before software is optimized.", body: ["Power loss, limp mode, smoke, pressure faults or emissions warnings need analysis first. A fault code describes what the system noticed, not necessarily the root cause.", "Live values and logs help decide whether tuning is appropriate now or whether repair should come first." ]},
      {eyebrow: "Requesting advice", title: "Explain how your Volkswagen is used.", body: ["Send registration or exact variant, engine, year, gearbox, mileage, maintenance, load or towing use, hardware, faults and previous software. For cloning, information about the original and replacement unit is needed without sharing a full VIN publicly.", "Use the Power Catalog as the first indication, then WhatsApp for a technical intake."]}
    ],
    resultSlugs: resultSlugs.volkswagen,
    resultSummaries: {"vw-caddy-20-tdi-2020-stage-1": "Custom Stage 1 for a Volkswagen Caddy 2.0 TDI, publishing only the verified power figures.", "vw-transporter-20-tdi-2013-ecu-cloning-stage-1": "Damaged-ECU cloning, vehicle-data transfer and separate Stage 1 preparation for a Volkswagen Transporter."},
    resultsTitle: "Verified Volkswagen customer results",
    resultsIntro: "The Caddy and Transporter demonstrate two distinct services: ECU calibration and control-unit cloning.",
    relatedTitle: "Explore Volkswagen tuning and ECU services",
    relatedIntro: "Choose the service information that matches calibration, diagnostics, transmission or ECU recovery.",
    relatedLinks: serviceLinks("en", {transmission: true, stage2: true}),
    catalogTitle: "Check your Volkswagen in the NoordTune Power Catalog.",
    catalogIntro: "Dutch vehicles can use RDW lookup; international vehicles can be selected manually. Prices and results are indicative. Software, gearbox, condition and commercial use determine final advice.",
    catalogBullets: ["RDW registration lookup", "Manual international selection", "Indicative ECU and TCU options", "Advice for passenger or commercial use"],
    catalogCta: "Check your Volkswagen in the NoordTune Power Catalog",
    whatsappCta: "Ask for Volkswagen advice on WhatsApp",
    faq: [
      {question: "Can Stage 1 suit a Volkswagen van?", answer: "Yes in some cases, but use, load, maintenance, engine and gearbox determine the responsible approach."},
      {question: "Is ECU cloning the same as remapping?", answer: "No. Cloning transfers required data to a replacement unit; remapping is a separate calibration step."},
      {question: "Why is no torque shown for the Caddy?", answer: "No verified torque figure was supplied, so NoordTune does not publish one."},
      {question: "Are emissions-related software solutions always road legal?", answer: "No. Vehicle, use and regulations determine what is permitted. Diagnosis comes first."}
    ],
    disclaimer: "Volkswagen results vary with engine, ECU/TCU, software, maintenance, fuel, gearbox, hardware, load and use. Unverified figures are not published."
  },
  {
    brand: "ford",
    brandName: "Ford",
    locale: "en",
    slug: "ford-chiptuning",
    status: "published",
    metaTitle: "Ford chiptuning and EcoBlue ECU remap | NoordTune.nl",
    metaDescription: "Ford chiptuning focused on daily torque, diagnostics and careful EcoBlue calibration. View the verified Transit Connect Stage 1 result.",
    heroTitle: "Ford chiptuning for useful daily torque",
    heroIntro: "A modern Ford needs calibration matched to engine, software, use and active vehicle systems. NoordTune prioritizes control and smooth delivery.",
    heroImage: sharedImages.ford,
    heroImageAlt: "Ford Transit Connect 1.5 EcoBlue Stage 1 customer result at NoordTune.nl",
    introTitle: "Ford EcoBlue tuning starts with use and condition.",
    intro: ["Ford cars and vans often work hard every day. Added performance should be predictable under load rather than focused on a peak number. Modern EcoBlue control combines boost, fuel, torque management and emissions strategies, so the installed ECU and software must be verified.", "The Transit Connect case is a genuine Stage 1 result for one vehicle. Its figures do not automatically apply to every EcoBlue version, model year or transmission."],
    sections: [
      {eyebrow: "Pre-tuning checks", title: "What do we check before tuning a Ford?", body: ["We collect the exact model, engine, year, gearbox, mileage, maintenance and driving profile. Load, towing, short journeys and motorway use all affect the advice for a van.", "Faults, regeneration problems or limp mode are diagnosed first. Air, boost, fuel and temperature data may be checked instead of guessing an ECU or transmission type."], bullets: ["Exact EcoBlue and software variant", "Maintenance and fault status", "Load, towing and daily use", "Verified transmission details"], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}]},
      {eyebrow: "Stage 1", title: "Stage 1 focuses on usable response and torque.", body: ["For a healthy Ford on standard hardware, Stage 1 can improve response and everyday flexibility. A van should remain progressive and predictable with load or during overtaking.", "The Transit Connect result contains verified project figures, but another software or power variant may require different margins."], links: [{label: "Ford Transit Connect result", href: "/en/results/ford-transit-connect-15-ecoblue-2019-stage-1"}]},
      {eyebrow: "Stage 2 and hardware", title: "Stage 2 is not automatically the better choice.", body: ["Modified turbo, intake, cooling, fuel, transmission and legally permitted exhaust hardware must be assessed together. For a daily commercial vehicle, controlled Stage 1 may be more appropriate.", "NoordTune does not promise a Stage 2 number from brand and engine capacity alone." ]},
      {eyebrow: "ECU and transmission", title: "Requested torque must suit the drivetrain.", body: ["The ECU manages torque as part of a wider vehicle strategy. Gearbox and clutch capacity influence what can be used responsibly.", "Always provide the transmission type and previous drivetrain work. We do not guess missing details." ]},
      {eyebrow: "Emissions and diagnostics", title: "EcoBlue warnings require diagnosis and careful legal choices.", body: ["DPF, EGR or AdBlue warnings are treated as diagnostic problems first. Tuning should not hide a fault.", "Software solutions are discussed only where legally permitted and appropriate for the exact vehicle, use and regulations. The website does not advertise generic emissions-system removal."], links: [{label: "DPF, EGR or AdBlue fault: what now?", href: "/en/news-blog/dpf-egr-adblue-fault-what-now"}]},
      {eyebrow: "Requesting advice", title: "Send the vehicle data and working profile.", body: ["Provide registration or exact Ford, engine, year, gearbox, mileage, maintenance, loads, towing, faults, previous software and hardware changes.", "Check the Power Catalog first, then use WhatsApp. Fuel saving and exact output are never guaranteed without assessing the actual car." ]}
    ],
    resultSlugs: resultSlugs.ford,
    resultSummaries: {"ford-transit-connect-15-ecoblue-2019-stage-1": "Custom Stage 1 for a Ford Transit Connect 1.5 EcoBlue, focused on response and usable daily torque."},
    resultsTitle: "Verified Ford customer result",
    resultsIntro: "The Transit Connect case is a vehicle-specific EcoBlue example, not a universal output promise.",
    relatedTitle: "Explore Ford tuning and diagnostics",
    relatedIntro: "Review the supporting service and knowledge pages before choosing a route.",
    relatedLinks: serviceLinks("en", {stage2: true}),
    catalogTitle: "Check your Ford in the NoordTune Power Catalog.",
    catalogIntro: "Dutch Fords can use RDW registration lookup; international vehicles can be selected manually. Gains and prices are indicative. Software, transmission, condition and use determine final advice.",
    catalogBullets: ["RDW registration lookup", "Manual international Ford selection", "Indicative Stage options and prices", "Final vehicle-specific assessment"],
    catalogCta: "Check your Ford in the NoordTune Power Catalog",
    whatsappCta: "Ask for Ford advice on WhatsApp",
    faq: [
      {question: "Is Ford EcoBlue suitable for Stage 1?", answer: "It depends on the exact version, software, maintenance and fault status. A healthy technical basis is essential."},
      {question: "Will chiptuning always save fuel?", answer: "No. Driving style, load, route and use of the extra performance determine consumption."},
      {question: "Can you diagnose an AdBlue or DPF warning first?", answer: "Yes. It is treated as a diagnostic issue, with solutions discussed only where legally permitted."},
      {question: "Will my Ford match the Transit Connect result?", answer: "Not necessarily. Those figures belong to one vehicle. Check the exact version before forming an expectation."}
    ],
    disclaimer: "Ford results vary with engine, ECU software, maintenance, gearbox, fuel, load, hardware and use. Emissions-related solutions are assessed only where legally permitted."
  },
  {
    brand: "toyota",
    brandName: "Toyota",
    locale: "en",
    slug: "toyota-chiptuning",
    status: "published",
    metaTitle: "Toyota chiptuning and Comfort Power | NoordTune.nl",
    metaDescription: "Toyota chiptuning with a smooth Comfort Power approach, diagnostics and vehicle-specific ECU calibration. View the verified ProAce Verso case.",
    heroTitle: "Toyota chiptuning with Comfort Power",
    heroIntro: "More flexibility and overtaking reserve without losing comfort. NoordTune matches Toyota calibration to the vehicle, use and active systems.",
    heroImage: sharedImages.toyota,
    heroImageAlt: "Toyota ProAce Verso VIP Stage 1 Comfort Power customer result at NoordTune.nl",
    introTitle: "Toyota tuning can be effective without becoming aggressive.",
    intro: ["For a spacious passenger van or daily Toyota, smooth torque and useful reserve can matter more than peak output. Comfort Power describes a controlled Stage 1 approach that protects the calm character of the vehicle.", "The ProAce Verso VIP case is a verified project where DPF, EGR and AdBlue remained active. Other Toyotas still require verification of engine, software, transmission, maintenance and fault status."],
    sections: [
      {eyebrow: "Pre-tuning checks", title: "What do we check before tuning a Toyota?", body: ["We collect the exact variant, engine, year, gearbox, mileage, maintenance and use. Passenger load, luggage, long journeys and towing matter for a ProAce Verso.", "The installed ECU and software are verified. Fault codes and live data may be used to confirm that boost, air, fuel, temperature and emissions systems operate correctly."], bullets: ["Exact vehicle and software", "Transmission and daily use", "Maintenance and fault status", "DPF, EGR and AdBlue operation"], links: [{label: "Car diagnostics", href: "/en/car-diagnostics"}]},
      {eyebrow: "Stage 1 Comfort Power", title: "A calm delivery with more usable reserve.", body: ["Comfort Power targets smoother acceleration, overtaking and flexibility on standard hardware. The calibration avoids an unnecessarily sharp response.", "The published ProAce changed from 177 hp and 400 Nm to 205 hp and 450 Nm. Those verified figures belong to that vehicle, not every Toyota."], links: [{label: "Toyota ProAce result", href: "/en/results/toyota-proace-verso-vip-20d-2023-stage-1"}]},
      {eyebrow: "Stage 2 and hardware", title: "Stage 2 may not suit a comfort-focused Toyota.", body: ["Modified hardware must be assessed for cooling, turbo, airflow, fuel, transmission and legal use. More output is not automatically the right target for a passenger or long-distance vehicle.", "NoordTune weighs reliability, comfort and actual benefit before suggesting a hardware-aware route." ]},
      {eyebrow: "ECU and transmission", title: "Comfort depends on coordinated torque delivery.", body: ["The gearbox influences how engine torque is felt. We ask for the exact transmission and its behaviour instead of assuming TCU details.", "A comfort calibration should remain predictable when moving off, overtaking or carrying passengers." ]},
      {eyebrow: "Diagnostics and active systems", title: "DPF, EGR and AdBlue remained active in the published case.", body: ["The systems remained active on the ProAce Verso VIP project. A warning or fault is diagnosed before tuning is considered.", "NoordTune does not advertise generic emissions-system removal. Advice and software solutions are discussed only where legally permitted."], links: [{label: "DPF, EGR or AdBlue fault: what now?", href: "/en/news-blog/dpf-egr-adblue-fault-what-now"}]},
      {eyebrow: "Requesting advice", title: "Explain how your Toyota is used.", body: ["Send the exact model, engine, year, gearbox, mileage, maintenance, passenger or commercial use, load, towing, faults and previous tuning.", "Use the Power Catalog first, then WhatsApp for personal advice. Another Toyota result is never used as a guarantee." ]}
    ],
    resultSlugs: resultSlugs.toyota,
    resultSummaries: {"toyota-proace-verso-vip-20d-2023-stage-1": "Stage 1 Comfort Power for a Toyota ProAce Verso VIP 2.0D with DPF, EGR and AdBlue remaining active."},
    resultsTitle: "Verified Toyota customer result",
    resultsIntro: "The ProAce Verso VIP case shows a comfort-oriented calibration with verified figures and active emissions systems.",
    relatedTitle: "Explore Toyota tuning",
    relatedIntro: "Review Stage 1, diagnostics and vehicle-specific calibration before requesting advice.",
    relatedLinks: serviceLinks("en", {stage2: true}),
    catalogTitle: "Check your Toyota in the NoordTune Power Catalog.",
    catalogIntro: "Use RDW lookup for a Dutch Toyota or select an international vehicle manually. Prices and gains are indicative; exact specification, software, gearbox, condition and use determine advice.",
    catalogBullets: ["RDW registration lookup", "Manual international Toyota selection", "Indicative Stage 1 and Comfort Power options", "Final vehicle and use assessment"],
    catalogCta: "Check your Toyota in the NoordTune Power Catalog",
    whatsappCta: "Ask for Toyota advice on WhatsApp",
    faq: [
      {question: "What does Comfort Power mean?", answer: "A controlled Stage 1 approach focused on flexibility, overtaking reserve and comfort rather than aggressive delivery."},
      {question: "Do DPF, EGR and AdBlue remain active?", answer: "They remained active in the published ProAce case. Every vehicle is assessed separately."},
      {question: "Is Stage 2 suitable for a Toyota passenger van?", answer: "Not automatically. Use, hardware, cooling, gearbox and condition determine whether it makes sense."},
      {question: "Are the ProAce figures guaranteed for my Toyota?", answer: "No. They belong to one vehicle and configuration. Use the catalog and vehicle review for your own indication."}
    ],
    disclaimer: "Toyota results are vehicle-specific and depend on engine, ECU software, maintenance, gearbox, fuel, hardware, load and use. Comfort and reliability remain part of the advice."
  },
  {
    brand: "bmw",
    brandName: "BMW",
    locale: "pl",
    slug: "chiptuning-bmw",
    status: "published",
    metaTitle: "Chiptuning BMW i tuning ECU/TCU | NoordTune.nl",
    metaDescription: "Chiptuning BMW z diagnostyką, indywidualnym remapem ECU i uwzględnieniem skrzyni. Zobacz prawdziwe realizacje BMW NoordTune.",
    heroTitle: "Chiptuning BMW z dopasowaniem ECU i TCU",
    heroIntro: "Lepsza elastyczność i reakcja wymagają zgodności oprogramowania silnika, skrzyni, stanu technicznego i sposobu użytkowania konkretnego BMW.",
    heroImage: sharedImages.bmw,
    heroImageAlt: "BMW X3 E83 Stage 1 jako realizacja chiptuningu BMW w NoordTune.nl",
    introTitle: "W BMW kalibracja silnika musi współpracować z całym układem napędowym.",
    intro: ["Sterownik silnika i strategie momentu w skrzyni BMW są ze sobą powiązane. Dlatego remap zaczyna się od dokładnej wersji auta, silnika, softu, skrzyni, historii serwisowej i oczekiwanego zastosowania, a nie od ogólnej obietnicy mocy.", "W jednym BMW właściwym wyborem będzie spokojny Stage 1 na seryjnym osprzęcie. Inne auto wymaga najpierw diagnostyki albo kontroli limitów skrzyni. Dwie opublikowane realizacje pokazują prawdziwą pracę ECU i TCU, lecz ich wyniki dotyczą wyłącznie tych egzemplarzy."],
    sections: [
      {eyebrow: "Kontrola wstępna", title: "Co sprawdzamy przed chiptuningiem BMW?", body: ["Potrzebujemy danych auta, silnika, roku, skrzyni, przebiegu, serwisu, wcześniejszego softu i informacji o objawach. Błędy, spadki mocy lub nierówne zmiany biegów mogą oznaczać, że pierwszym krokiem będzie diagnostyka.", "Rzeczywiste ECU, TCU i wersja oprogramowania są sprawdzane w aucie. W razie potrzeby analizujemy ciśnienie, powietrze, paliwo, temperatury i żądany moment, zamiast zgadywać rodzinę sterownika."], bullets: ["Dokładna wersja silnika i softu", "Stan techniczny i błędy", "Skrzynia oraz realne limity momentu", "Codzienna jazda, holowanie lub sport"], links: [{label: "Diagnostyka samochodowa", href: "/pl/diagnostyka-samochodowa"}, {label: "Dlaczego diagnostyka przed tuningiem jest ważna", href: "/pl/aktualnosci-blog/dlaczego-diagnostyka-przed-tuningiem-jest-wazna"}]},
      {eyebrow: "Stage 1", title: "Stage 1 w BMW powinien płynnie budować moment.", body: ["Stage 1 jest przeznaczony dla sprawnego BMW z seryjnym osprzętem. Liczy się użyteczny środkowy zakres, przewidywalna reakcja i rozsądne marginesy, a nie tylko maksymalna liczba.", "Auta z podobnym oznaczeniem mogą mieć inny soft lub skrzynię. Dane katalogowe są orientacyjne do czasu identyfikacji konkretnego egzemplarza."], links: [{label: "Chiptuning", href: "/pl/chiptuning"}]},
      {eyebrow: "Stage 2", title: "Stage 2 wymaga sprawdzonego, odpowiedniego osprzętu.", body: ["Konfiguracja sprzętowa może wymagać oceny chłodzenia, dolotu, paliwa, turbiny, skrzyni i elementów wydechu tam, gdzie jest to prawnie dopuszczalne. Mapa musi odpowiadać temu, co faktycznie zamontowano.", "Logi pokazują, czy wartości zadane i zmierzone są zgodne pod obciążeniem. Gdy baza techniczna jest słaba, rozsądniejsza jest naprawa lub łagodniejszy cel."], links: [{label: "Kiedy Stage 2 ma sens?", href: "/pl/aktualnosci-blog/kiedy-stage-2-ma-sens"}, {label: "Dlaczego logi są ważne", href: "/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem"}]},
      {eyebrow: "Układ napędowy", title: "ECU i TCU muszą spójnie zarządzać momentem.", body: ["Żądania momentu, interwencje i strategia zmiany biegów decydują o tym, jak moc trafia na koła. Pominięcie skrzyni może dać wynik dobry na papierze, ale niespójny podczas jazdy.", "Tuning TCU nie jest zawsze potrzebny. Realizacja BMW F40 dotyczy konkretnej skrzyni GETRAG 7DCT300 i nie jest obietnicą dla każdej skrzyni BMW."], links: [{label: "BMW F40 - tuning TCU", href: "/pl/rezultaty/bmw-f40-118i-7dct300-tcu-tuning"}, {label: "Limitery momentu w ECU i TCU", href: "/pl/aktualnosci-blog/limitery-momentu-w-ecu-i-tcu"}]},
      {eyebrow: "Diagnostyka i logi", title: "Dane chronią przed ukrywaniem istniejącej usterki.", body: ["Auto może jeździć pozornie poprawnie, chociaż dane czujników, doładowania, paliwa lub skrzyni pokazują problem. Tuning zwiększa obciążenie i nie powinien być nakładany na nieznaną usterkę.", "Kody błędów, wartości live i logi drogowe stosujemy wtedy, gdy wymaga tego auto lub cel modyfikacji."], links: [{label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}]},
      {eyebrow: "Zapytanie", title: "Wyślij dane potrzebne do oceny Twojego BMW.", body: ["Podaj dokładny model, silnik, rok, skrzynię, przebieg, modyfikacje, błędy, wcześniejszy tuning i sposób użytkowania. Nie wysyłaj pełnego VIN w publicznych kanałach.", "Najpierw sprawdź katalog mocy, a potem napisz przez WhatsApp. Nie obiecujemy takiego samego przyrostu jak w innej realizacji BMW."]}
    ],
    resultSlugs: resultSlugs.bmw,
    resultSummaries: {"bmw-x3-e83-20d-stage-1": "Indywidualny Stage 1 dla BMW X3 E83 2.0d z potwierdzonymi wartościami tego egzemplarza.", "bmw-f40-118i-7dct300-tcu-tuning": "Kalibracja skrzyni GETRAG 7DCT300 w BMW F40 118i, dopasowana do konfiguracji silnika."},
    resultsTitle: "Prawdziwe realizacje BMW",
    resultsIntro: "Te przypadki pokazują dwie dziedziny: kalibrację silnika i sterownika skrzyni. Pełne strony zawierają potwierdzone dane i ograniczenia.",
    relatedTitle: "Sprawdź usługi dla BMW",
    relatedIntro: "Zobacz chiptuning, diagnostykę i realizacje przed wysłaniem zapytania.",
    relatedLinks: serviceLinks("pl", {transmission: true, stage2: true}),
    catalogTitle: "Sprawdź swoje BMW w katalogu mocy NoordTune.",
    catalogIntro: "Auta holenderskie można sprawdzić po rejestracji RDW, a zagraniczne wybrać ręcznie. Wyniki i ceny są orientacyjne. Ostateczna porada zależy od konkretnego BMW, softu, skrzyni i stanu technicznego.",
    catalogBullets: ["Wyszukiwanie RDW dla aut holenderskich", "Ręczny wybór zagranicznego BMW", "Orientacyjne opcje ECU i TCU", "Ocena konkretnego egzemplarza"],
    catalogCta: "Sprawdź swoje BMW w katalogu mocy NoordTune",
    whatsappCta: "Zapytaj o BMW przez WhatsApp",
    faq: [
      {question: "Czy Stage 1 pasuje do każdego BMW?", answer: "Nie. Decydują silnik, soft, serwis, skrzynia i stan techniczny."},
      {question: "Czy tuning TCU jest zawsze potrzebny?", answer: "Nie. Rozważa się go tylko wtedy, gdy skrzynia, limity momentu i cel tego wymagają."},
      {question: "Dlaczego mój wynik może być inny niż w realizacji?", answer: "Każda realizacja dotyczy jednego auta. Soft, paliwo, osprzęt, serwis i skrzynia mogą się różnić."},
      {question: "Jakie dane wysłać?", answer: "Podaj model, silnik, rok, skrzynię, przebieg, modyfikacje, błędy i sposób użytkowania."}
    ],
    disclaimer: "Wyniki BMW zależą od konkretnego auta: silnika, ECU/TCU, softu, serwisu, paliwa, skrzyni, osprzętu i użytkowania."
  },
  {
    brand: "audi",
    brandName: "Audi",
    locale: "pl",
    slug: "chiptuning-audi",
    status: "published",
    metaTitle: "Chiptuning Audi | Stage 1, Stage 2 i diagnostyka",
    metaDescription: "Chiptuning Audi z diagnostyką, logami i mapą dopasowaną do osprzętu. Zobacz prawdziwą realizację Audi A4 Stage 2+.",
    heroTitle: "Chiptuning Audi dopasowany do osprzętu",
    heroIntro: "Od spokojnego Stage 1 po rozbudowany projekt sprzętowy: mapa Audi musi odpowiadać silnikowi, turbinie, skrzyni i stanowi auta.",
    heroImage: sharedImages.audi,
    heroImageAlt: "Audi A4 B7 2.0 TDI Stage 2+ jako realizacja NoordTune.nl",
    introTitle: "W Audi soft, osprzęt i układ napędowy muszą działać razem.",
    intro: ["Prawidłowa kalibracja może poprawić elastyczność Audi, ale sama nazwa modelu nie określa marginesu. Liczą się silnik, wersja ECU, turbo, paliwo, skrzynia, serwis i zamontowany osprzęt.", "Realizacja A4 B7 Stage 2+ pokazuje mapę zbudowaną pod hybrydową turbosprężarkę i downpipe. Jest dowodem konkretnego projektu, a nie obietnicą takich samych wartości dla każdego A4 lub 2.0 TDI."],
    sections: [
      {eyebrow: "Kontrola wstępna", title: "Co sprawdzamy przed chiptuningiem Audi?", body: ["Zbieramy dane auta, silnika, roku, skrzyni, serwisu, usterek i zmian sprzętowych. Dymienie, tryb awaryjny, problemy z regeneracją lub zmianą biegów oznaczają najpierw diagnostykę.", "ECU, TCU i wersja softu są identyfikowane w aucie. W razie potrzeby sprawdzamy powietrze, ciśnienie, paliwo i temperatury zamiast zgadywać sterownik."], bullets: ["Dokładny silnik i soft", "Stan turbiny i osprzętu", "Skrzynia oraz zarządzanie momentem", "Błędy i historia serwisowa"], links: [{label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}, {label: "Znaczenie logów", href: "/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem"}]},
      {eyebrow: "Stage 1", title: "Stage 1 bazuje na seryjnym osprzęcie.", body: ["W sprawnym Audi Stage 1 często jest rozsądną drogą. Celem jest użyteczny moment, przewidywalna reakcja i margines odpowiedni dla turbiny, paliwa i skrzyni.", "Wartości katalogowe są orientacyjne, ponieważ ten sam model może mieć inną wersję oprogramowania i napędu."], links: [{label: "Chiptuning", href: "/pl/chiptuning"}]},
      {eyebrow: "Stage 2 i osprzęt", title: "Stage 2 musi być zbudowany pod zamontowane części.", body: ["Projekt może wymagać oceny turbiny, dolotu, chłodzenia, paliwa, skrzyni i elementów wydechu tam, gdzie są prawnie dopuszczalne. Gotowy uniwersalny plik nie wystarcza.", "Realizacja A4 wykorzystuje potwierdzony osprzęt i dane. Nie przenosimy jej wyniku na inne Audi bez kontroli."], links: [{label: "Audi A4 Stage 2+", href: "/pl/rezultaty/audi-a4-b7-20-tdi-stage-2-plus"}, {label: "Kiedy Stage 2 ma sens?", href: "/pl/aktualnosci-blog/kiedy-stage-2-ma-sens"}]},
      {eyebrow: "ECU i skrzynia", title: "Zarządzanie momentem musi pasować do napędu Audi.", body: ["ECU, systemy trakcji i skrzynia wpływają na sposób oddawania momentu. Automat może wymagać sprawdzenia limitów, ale tuning TCU nie jest zawsze potrzebny.", "Priorytety zależą od zastosowania: codzienne Audi i projekt sprzętowy wymagają innej reakcji."], links: [{label: "Chiptuning z automatyczną skrzynią", href: "/pl/aktualnosci-blog/chiptuning-z-automatyczna-skrzynia"}]},
      {eyebrow: "Diagnostyka i logi", title: "Doładowanie i temperatury trzeba ocenić pod obciążeniem.", body: ["Logi pokazują zgodność wartości zadanych i zmierzonych. Samo zwiększenie ciśnienia nie jest dobrą mapą; powietrze, paliwo, ciepło, moment i zabezpieczenia muszą być spójne.", "Usterki DPF, EGR i AdBlue są najpierw diagnozowane. Rozwiązania programowe omawiamy tylko tam, gdzie są prawnie dopuszczalne."], links: [{label: "Turbo, paliwo i EGT", href: "/pl/aktualnosci-blog/turbo-paliwo-i-egt-wyjasnienie"}]},
      {eyebrow: "Zapytanie", title: "Opisz pełną konfigurację Audi.", body: ["Wyślij model, silnik, rok, skrzynię, przebieg, serwis, modyfikacje, paliwo, błędy i poprzedni tuning. Przy Stage 2 dane osprzętu są konieczne.", "Najpierw użyj katalogu mocy, potem WhatsApp. Uczciwa odpowiedź warunkowa jest lepsza niż niepoparta obietnica liczby."]}
    ],
    resultSlugs: resultSlugs.audi,
    resultSummaries: {"audi-a4-b7-20-tdi-stage-2-plus": "Prawdziwy projekt Audi A4 B7 Stage 2+ z hybrydową turbosprężarką i downpipe."},
    resultsTitle: "Prawdziwa realizacja Audi",
    resultsIntro: "Projekt A4 pokazuje połączenie danych auta, osprzętu i kalibracji. Pełna strona zawiera potwierdzone wartości oraz zastrzeżenie.",
    relatedTitle: "Wybierz właściwą drogę dla Audi",
    relatedIntro: "Poznaj kalibrację, diagnostykę i znaczenie skrzyni przed wyborem usługi.",
    relatedLinks: serviceLinks("pl", {transmission: true, stage2: true}),
    catalogTitle: "Sprawdź swoje Audi w katalogu mocy NoordTune.",
    catalogIntro: "Dla aut holenderskich użyj RDW, a zagraniczne Audi wybierz ręcznie. Moc i ceny są orientacyjne; silnik, soft, osprzęt i skrzynia określają finalną poradę.",
    catalogBullets: ["Wyszukiwanie RDW", "Ręczny wybór zagranicznego Audi", "Orientacyjne opcje Stage 1, Stage 2 i TCU", "Ocena osprzętu i softu"],
    catalogCta: "Sprawdź swoje Audi w katalogu mocy NoordTune",
    whatsappCta: "Zapytaj o Audi przez WhatsApp",
    faq: [
      {question: "Czy Stage 1 jest najlepszy dla każdego Audi?", answer: "Nie zawsze, choć często pasuje do sprawnego auta seryjnego. Decydują dokładna wersja i zastosowanie."},
      {question: "Czym różni się Stage 2?", answer: "Wymaga odpowiedniego osprzętu i dodatkowej kontroli doładowania, powietrza, paliwa, temperatur i napędu."},
      {question: "Czy potrzebuję tuningu TCU?", answer: "Tylko gdy konkretna skrzynia, limity momentu i cel tego wymagają."},
      {question: "Czy moje Audi osiągnie wynik A4?", answer: "Nie ma takiej gwarancji. Wynik dotyczy jednego auta i konfiguracji."}
    ],
    disclaimer: "Wyniki Audi zależą od silnika, ECU/TCU, softu, serwisu, turbiny, skrzyni, paliwa, osprzętu i użytkowania. Należy też sprawdzić legalność modyfikacji."
  },
  {
    brand: "volkswagen",
    brandName: "Volkswagen",
    locale: "pl",
    slug: "chiptuning-volkswagen",
    status: "published",
    metaTitle: "Chiptuning Volkswagen i serwis ECU | NoordTune.nl",
    metaDescription: "Chiptuning Volkswagen dla aut osobowych i dostawczych, diagnostyka oraz klonowanie ECU. Zobacz realizacje Caddy i Transportera.",
    heroTitle: "Chiptuning Volkswagen dla auta i busa",
    heroIntro: "Remap ECU, kontrola skrzyni i naprawa sterownika to różne ścieżki. NoordTune dopasowuje usługę do konkretnego Volkswagena i jego pracy.",
    heroImage: sharedImages.volkswagen,
    heroImageAlt: "Volkswagen Caddy 2.0 TDI Stage 1 jako realizacja NoordTune.nl",
    introTitle: "Tuning Volkswagen i odzyskiwanie ECU to nie ta sama usługa.",
    intro: ["Auta osobowe, sportowe i dostawcze Volkswagen mają różne wymagania. Caddy na seryjnym osprzęcie potrzebuje innego celu niż zmodyfikowane auto, a Transporter z uszkodzonym ECU najpierw wymaga poprawnego przeniesienia danych.", "NoordTune rozdziela Stage 1, tuning sprzętowy, TCU, diagnostykę i klonowanie ECU. W realizacji Caddy nie dopisujemy brakującego momentu, a przy Transporterze nie wymyślamy mocy."],
    sections: [
      {eyebrow: "Kontrola wstępna", title: "Co sprawdzamy przed tuningiem Volkswagena?", body: ["Pytamy o auto, silnik, rok, skrzynię, przebieg, serwis, zastosowanie i objawy. W busie znaczenie mają ładunek, holowanie i długie trasy.", "ECU i TCU są identyfikowane, nie zgadywane. Przy uszkodzonym lub wymienionym sterowniku poprawne klonowanie poprzedza decyzję o tuningu."], bullets: ["Auto osobowe lub dostawcze", "Silnik, soft i skrzynia", "Błędy oraz regeneracja", "Oryginalne lub wymienione ECU"], links: [{label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}]},
      {eyebrow: "Stage 1", title: "Stage 1 powinien pozostać praktyczny.", body: ["Sprawny seryjny Volkswagen może zyskać lepszą reakcję i użyteczny moment. W busie ważniejszy bywa kontrolowany środkowy zakres niż wartość szczytowa.", "Realizacja Caddy pokazuje tylko dostarczone wartości mocy. Moment nie został potwierdzony, więc go nie publikujemy."], links: [{label: "Volkswagen Caddy Stage 1", href: "/pl/rezultaty/vw-caddy-20-tdi-2020-stage-1"}]},
      {eyebrow: "Stage 2 i osprzęt", title: "Zmiany sprzętowe wymagają danych i logów.", body: ["Turbo, dolot, chłodzenie, paliwo, skrzynia i prawnie dopuszczalne elementy wydechu muszą działać razem. Ogólna obietnica Stage 2 nie zastępuje kontroli.", "Gdy logi lub serwis pokazują słabą bazę, lepsza jest naprawa albo spokojniejszy cel."], links: [{label: "Dlaczego logi są ważne", href: "/pl/aktualnosci-blog/dlaczego-logi-sa-wazne-przed-tuningiem"}]},
      {eyebrow: "ECU, TCU i klonowanie", title: "Klonowanie ECU najpierw przywraca dane auta.", body: ["Klonowanie przenosi potrzebne dane oryginalnego pojazdu do zgodnego sterownika zastępczego. To naprawa, a nie inna nazwa remapu.", "Limity skrzyni mogą mieć znaczenie, ale TCU oceniamy osobno. Realizacja Transportera opisuje klonowanie i Stage 1 bez niepotwierdzonych pk lub Nm."], links: [{label: "Volkswagen Transporter - klonowanie ECU", href: "/pl/rezultaty/vw-transporter-20-tdi-2013-ecu-cloning-stage-1"}, {label: "Limitery ECU i TCU", href: "/pl/aktualnosci-blog/limitery-momentu-w-ecu-i-tcu"}]},
      {eyebrow: "Diagnostyka i logi", title: "Usterkę diagnozujemy przed optymalizacją softu.", body: ["Spadek mocy, tryb awaryjny, dymienie, błędy ciśnienia lub emisji wymagają najpierw analizy. Kod błędu nie zawsze wskazuje przyczynę.", "Dane live i logi pomagają ustalić, czy można bezpiecznie przejść do tuningu." ]},
      {eyebrow: "Zapytanie", title: "Opisz sposób użytkowania Volkswagena.", body: ["Wyślij model, silnik, rok, skrzynię, przebieg, serwis, ładunki, holowanie, osprzęt, błędy i wcześniejszy soft. Przy klonowaniu potrzebne są dane sterowników bez publikowania pełnego VIN.", "Katalog mocy daje orientację, a WhatsApp służy do technicznej rozmowy." ]}
    ],
    resultSlugs: resultSlugs.volkswagen,
    resultSummaries: {"vw-caddy-20-tdi-2020-stage-1": "Indywidualny Stage 1 dla Volkswagena Caddy 2.0 TDI z publikacją wyłącznie potwierdzonej mocy.", "vw-transporter-20-tdi-2013-ecu-cloning-stage-1": "Klonowanie uszkodzonego ECU, przeniesienie danych i oddzielna optymalizacja Stage 1 w Volkswagenie Transporterze."},
    resultsTitle: "Prawdziwe realizacje Volkswagen",
    resultsIntro: "Caddy i Transporter pokazują dwie różne usługi: kalibrację ECU i klonowanie sterownika.",
    relatedTitle: "Sprawdź tuning i serwis ECU Volkswagen",
    relatedIntro: "Wybierz informacje o kalibracji, diagnostyce, skrzyni lub odzyskiwaniu ECU.",
    relatedLinks: serviceLinks("pl", {transmission: true, stage2: true}),
    catalogTitle: "Sprawdź swojego Volkswagena w katalogu mocy NoordTune.",
    catalogIntro: "Auta holenderskie można wyszukać przez RDW, a zagraniczne wybrać ręcznie. Ceny i wyniki są orientacyjne. Soft, skrzynia, stan i zastosowanie określają finalną poradę.",
    catalogBullets: ["Wyszukiwanie RDW", "Ręczny wybór auta zagranicznego", "Orientacyjne możliwości ECU i TCU", "Porada dla auta osobowego lub dostawczego"],
    catalogCta: "Sprawdź swojego Volkswagena w katalogu mocy NoordTune",
    whatsappCta: "Zapytaj o Volkswagena przez WhatsApp",
    faq: [
      {question: "Czy Stage 1 pasuje do dostawczego Volkswagena?", answer: "Może pasować, ale zastosowanie, ładunek, serwis, silnik i skrzynia określają bezpieczną drogę."},
      {question: "Czy klonowanie ECU to remap?", answer: "Nie. Klonowanie przenosi dane do sterownika zastępczego, a remap jest osobnym etapem kalibracji."},
      {question: "Dlaczego przy Caddy nie ma momentu?", answer: "Nie dostarczono potwierdzonej wartości, więc NoordTune jej nie publikuje."},
      {question: "Czy rozwiązania dotyczące emisji są zawsze legalne?", answer: "Nie. Decydują auto, zastosowanie i przepisy. Najpierw wykonuje się diagnostykę."}
    ],
    disclaimer: "Wyniki Volkswagena zależą od silnika, ECU/TCU, softu, serwisu, paliwa, skrzyni, osprzętu, ładunku i użytkowania. Niepotwierdzone dane nie są publikowane."
  },
  {
    brand: "ford",
    brandName: "Ford",
    locale: "pl",
    slug: "chiptuning-ford",
    status: "published",
    metaTitle: "Chiptuning Ford i remap EcoBlue | NoordTune.nl",
    metaDescription: "Chiptuning Ford z naciskiem na codzienny moment, diagnostykę i ostrożną kalibrację EcoBlue. Zobacz realizację Transit Connect.",
    heroTitle: "Chiptuning Ford dla lepszej elastyczności",
    heroIntro: "Nowoczesny Ford wymaga mapy dopasowanej do silnika, softu, zastosowania i aktywnych systemów. NoordTune stawia na kontrolę i płynność.",
    heroImage: sharedImages.ford,
    heroImageAlt: "Ford Transit Connect 1.5 EcoBlue Stage 1 jako realizacja NoordTune.nl",
    introTitle: "Tuning Ford EcoBlue zaczyna się od zastosowania i stanu auta.",
    intro: ["Fordy osobowe i dostawcze często intensywnie pracują każdego dnia. Dodatkowa siła powinna być przewidywalna pod obciążeniem, a nie skupiona na jednej liczbie. EcoBlue łączy doładowanie, paliwo, moment i strategie emisji, więc ECU i soft trzeba potwierdzić.", "Transit Connect jest prawdziwą realizacją jednego auta. Jego wartości nie dotyczą automatycznie każdej wersji EcoBlue, roku ani skrzyni."],
    sections: [
      {eyebrow: "Kontrola wstępna", title: "Co sprawdzamy przed tuningiem Forda?", body: ["Zbieramy model, silnik, rok, skrzynię, przebieg, serwis i profil jazdy. W busie liczą się ładunek, holowanie, krótkie trasy i autostrada.", "Usterki, problemy z regeneracją i tryb awaryjny diagnozujemy najpierw. W razie potrzeby sprawdzamy powietrze, ciśnienie, paliwo i temperatury bez zgadywania ECU lub skrzyni."], bullets: ["Dokładna wersja EcoBlue i softu", "Serwis i błędy", "Ładunek, holowanie i codzienna praca", "Potwierdzona skrzynia"], links: [{label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}]},
      {eyebrow: "Stage 1", title: "Stage 1 koncentruje się na użytecznym momencie.", body: ["W sprawnym Fordzie na seryjnym osprzęcie Stage 1 może poprawić reakcję i elastyczność. Bus powinien zachować płynną, przewidywalną reakcję z ładunkiem.", "Wynik Transit Connect jest potwierdzony dla tego projektu. Inny soft lub wariant mocy może wymagać innych marginesów."], links: [{label: "Ford Transit Connect Stage 1", href: "/pl/rezultaty/ford-transit-connect-15-ecoblue-2019-stage-1"}]},
      {eyebrow: "Stage 2 i osprzęt", title: "Stage 2 nie zawsze jest lepszym wyborem.", body: ["Turbo, dolot, chłodzenie, paliwo, skrzynia i prawnie dopuszczalne elementy wydechu trzeba ocenić razem. W codziennym aucie dostawczym spokojny Stage 1 może mieć więcej sensu.", "NoordTune nie obiecuje Stage 2 na podstawie samej marki i pojemności." ]},
      {eyebrow: "ECU i skrzynia", title: "Żądany moment musi pasować do napędu.", body: ["ECU zarządza momentem w ramach całego pojazdu. Skrzynia i sprzęgło określają, co można wykorzystać odpowiedzialnie.", "Zawsze podaj typ skrzyni i wcześniejsze prace. Nie uzupełniamy brakujących danych zgadywaniem." ]},
      {eyebrow: "Emisje i diagnostyka", title: "Komunikaty EcoBlue wymagają diagnozy i ostrożnych decyzji prawnych.", body: ["Błędy DPF, EGR lub AdBlue są najpierw problemem diagnostycznym. Tuning nie powinien ukrywać usterki.", "Rozwiązania programowe omawiamy tylko tam, gdzie są prawnie dopuszczalne dla danego auta i zastosowania. Strona nie reklamuje ogólnego usuwania systemów emisji."], links: [{label: "DPF, EGR lub AdBlue - co dalej?", href: "/pl/aktualnosci-blog/dpf-egr-adblue-usterka-co-dalej"}]},
      {eyebrow: "Zapytanie", title: "Wyślij dane auta i profil pracy.", body: ["Podaj model, silnik, rok, skrzynię, przebieg, serwis, ładunki, holowanie, błędy, wcześniejszy soft i zmiany sprzętowe.", "Najpierw sprawdź katalog mocy, potem napisz przez WhatsApp. Nie gwarantujemy spalania ani dokładnej mocy bez oceny auta." ]}
    ],
    resultSlugs: resultSlugs.ford,
    resultSummaries: {"ford-transit-connect-15-ecoblue-2019-stage-1": "Indywidualny Stage 1 dla Forda Transit Connect 1.5 EcoBlue z naciskiem na reakcję i codzienną elastyczność."},
    resultsTitle: "Prawdziwa realizacja Ford",
    resultsIntro: "Transit Connect jest przykładem kalibracji konkretnego EcoBlue, a nie uniwersalną obietnicą wyniku.",
    relatedTitle: "Sprawdź tuning i diagnostykę Ford",
    relatedIntro: "Poznaj usługi i wiedzę techniczną przed wyborem rozwiązania.",
    relatedLinks: serviceLinks("pl", {stage2: true}),
    catalogTitle: "Sprawdź swojego Forda w katalogu mocy NoordTune.",
    catalogIntro: "Fordy holenderskie można wyszukać przez RDW, a zagraniczne wybrać ręcznie. Wyniki i ceny są orientacyjne. Soft, skrzynia, stan i zastosowanie określają poradę.",
    catalogBullets: ["Wyszukiwanie RDW", "Ręczny wybór zagranicznego Forda", "Orientacyjne opcje Stage i ceny", "Ocena konkretnego auta"],
    catalogCta: "Sprawdź swojego Forda w katalogu mocy NoordTune",
    whatsappCta: "Zapytaj o Forda przez WhatsApp",
    faq: [
      {question: "Czy Ford EcoBlue nadaje się do Stage 1?", answer: "Zależy to od wersji, softu, serwisu i błędów. Zdrowa baza techniczna jest konieczna."},
      {question: "Czy chiptuning zawsze zmniejszy spalanie?", answer: "Nie. Spalanie zależy od stylu jazdy, obciążenia, trasy i wykorzystania dodatkowej mocy."},
      {question: "Czy najpierw sprawdzicie błąd AdBlue lub DPF?", answer: "Tak. Traktujemy go jako problem diagnostyczny, a rozwiązania omawiamy tylko tam, gdzie są prawnie dopuszczalne."},
      {question: "Czy mój Ford osiągnie wynik Transit Connect?", answer: "Nie ma takiej gwarancji. Wartości dotyczą jednego auta; najpierw trzeba sprawdzić dokładną wersję."}
    ],
    disclaimer: "Wyniki Forda zależą od silnika, softu ECU, serwisu, skrzyni, paliwa, ładunku, osprzętu i użytkowania. Rozwiązania emisyjne oceniamy tylko tam, gdzie są prawnie dopuszczalne."
  },
  {
    brand: "toyota",
    brandName: "Toyota",
    locale: "pl",
    slug: "chiptuning-toyota",
    status: "published",
    metaTitle: "Chiptuning Toyota i Comfort Power | NoordTune.nl",
    metaDescription: "Chiptuning Toyota w spokojnym stylu Comfort Power, z diagnostyką i indywidualnym remapem ECU. Zobacz realizację ProAce Verso.",
    heroTitle: "Chiptuning Toyota w stylu Comfort Power",
    heroIntro: "Lepsza elastyczność i zapas przy wyprzedzaniu bez utraty komfortu. NoordTune dopasowuje mapę do auta, zastosowania i aktywnych systemów.",
    heroImage: sharedImages.toyota,
    heroImageAlt: "Toyota ProAce Verso VIP Stage 1 Comfort Power jako realizacja NoordTune.nl",
    introTitle: "Tuning Toyoty może być skuteczny bez agresywnej reakcji.",
    intro: ["W przestronnym vanie lub codziennej Toyocie płynny moment i użyteczny zapas są często ważniejsze niż moc szczytowa. Comfort Power oznacza spokojny Stage 1, który zachowuje komfortowy charakter auta.", "ProAce Verso VIP jest potwierdzoną realizacją, w której DPF, EGR i AdBlue pozostały aktywne. Inne Toyoty nadal wymagają sprawdzenia silnika, softu, skrzyni, serwisu i błędów."],
    sections: [
      {eyebrow: "Kontrola wstępna", title: "Co sprawdzamy przed tuningiem Toyoty?", body: ["Zbieramy dokładną wersję, silnik, rok, skrzynię, przebieg, serwis i sposób użytkowania. W ProAce znaczenie mają pasażerowie, bagaż, długie trasy i holowanie.", "ECU i soft są identyfikowane w aucie. Błędy i live data mogą potwierdzić poprawne działanie doładowania, powietrza, paliwa, temperatur i systemów emisji."], bullets: ["Dokładne auto i soft", "Skrzynia oraz użytkowanie", "Serwis i błędy", "Działanie DPF, EGR i AdBlue"], links: [{label: "Diagnostyka", href: "/pl/diagnostyka-samochodowa"}]},
      {eyebrow: "Stage 1 Comfort Power", title: "Spokojne oddawanie mocy z większym zapasem.", body: ["Comfort Power poprawia przyspieszanie, wyprzedzanie i elastyczność na seryjnym osprzęcie bez niepotrzebnie ostrej reakcji.", "Opublikowane ProAce zmieniło wartości ze 177 KM i 400 Nm na 205 KM i 450 Nm. Te dane dotyczą tylko tego egzemplarza."], links: [{label: "Toyota ProAce Comfort Power", href: "/pl/rezultaty/toyota-proace-verso-vip-20d-2023-stage-1"}]},
      {eyebrow: "Stage 2 i osprzęt", title: "Stage 2 nie musi pasować do komfortowej Toyoty.", body: ["Zmodyfikowany osprzęt wymaga oceny chłodzenia, turbiny, powietrza, paliwa, skrzyni i legalności zmian. Więcej mocy nie zawsze jest właściwym celem dla auta pasażerskiego.", "NoordTune ocenia niezawodność, komfort i realną korzyść przed zaproponowaniem dalszego etapu." ]},
      {eyebrow: "ECU i skrzynia", title: "Komfort zależy od spójnego momentu.", body: ["Skrzynia wpływa na to, jak odczuwany jest moment silnika. Pytamy o dokładny typ i zachowanie, zamiast zakładać dane TCU.", "Mapa komfortowa powinna być przewidywalna przy ruszaniu, wyprzedzaniu i jeździe z pasażerami." ]},
      {eyebrow: "Diagnostyka i aktywne systemy", title: "DPF, EGR i AdBlue pozostały aktywne w realizacji.", body: ["W ProAce Verso VIP systemy pozostały aktywne. Błąd lub komunikat jest diagnozowany przed rozważeniem tuningu.", "NoordTune nie reklamuje ogólnego usuwania systemów emisji. Rozwiązania omawiamy tylko tam, gdzie są prawnie dopuszczalne."], links: [{label: "DPF, EGR lub AdBlue - co dalej?", href: "/pl/aktualnosci-blog/dpf-egr-adblue-usterka-co-dalej"}]},
      {eyebrow: "Zapytanie", title: "Opisz sposób użytkowania Toyoty.", body: ["Wyślij model, silnik, rok, skrzynię, przebieg, serwis, zastosowanie pasażerskie lub firmowe, ładunek, holowanie, błędy i wcześniejszy tuning.", "Najpierw użyj katalogu mocy, potem WhatsApp. Wynik innej Toyoty nigdy nie jest gwarancją." ]}
    ],
    resultSlugs: resultSlugs.toyota,
    resultSummaries: {"toyota-proace-verso-vip-20d-2023-stage-1": "Stage 1 Comfort Power dla Toyoty ProAce Verso VIP 2.0D z aktywnymi DPF, EGR i AdBlue."},
    resultsTitle: "Prawdziwa realizacja Toyota",
    resultsIntro: "ProAce Verso VIP pokazuje komfortową kalibrację z potwierdzonymi wartościami i aktywnymi systemami emisji.",
    relatedTitle: "Sprawdź tuning Toyoty",
    relatedIntro: "Poznaj Stage 1, diagnostykę i indywidualne podejście przed wysłaniem zapytania.",
    relatedLinks: serviceLinks("pl", {stage2: true}),
    catalogTitle: "Sprawdź swoją Toyotę w katalogu mocy NoordTune.",
    catalogIntro: "Toyotę z Holandii sprawdzisz przez RDW, a zagraniczne auto wybierzesz ręcznie. Ceny i wyniki są orientacyjne; specyfikacja, soft, skrzynia, stan i zastosowanie określają poradę.",
    catalogBullets: ["Wyszukiwanie RDW", "Ręczny wybór zagranicznej Toyoty", "Orientacyjne opcje Stage 1 i Comfort Power", "Ocena auta oraz zastosowania"],
    catalogCta: "Sprawdź swoją Toyotę w katalogu mocy NoordTune",
    whatsappCta: "Zapytaj o Toyotę przez WhatsApp",
    faq: [
      {question: "Co oznacza Comfort Power?", answer: "To spokojny Stage 1 nastawiony na elastyczność, zapas przy wyprzedzaniu i komfort zamiast agresywnej reakcji."},
      {question: "Czy DPF, EGR i AdBlue pozostają aktywne?", answer: "W opublikowanej realizacji ProAce pozostały aktywne. Każde auto jest oceniane osobno."},
      {question: "Czy Stage 2 pasuje do osobowej Toyoty?", answer: "Nie zawsze. Decydują zastosowanie, osprzęt, chłodzenie, skrzynia i stan techniczny."},
      {question: "Czy wynik ProAce jest gwarantowany dla mojej Toyoty?", answer: "Nie. Dotyczy jednego auta i konfiguracji. Katalog oraz kontrola dają orientację dla Twojego egzemplarza."}
    ],
    disclaimer: "Wyniki Toyoty zależą od silnika, softu ECU, serwisu, skrzyni, paliwa, osprzętu, obciążenia i użytkowania. Komfort oraz niezawodność pozostają częścią porady."
  }
];

export function brandPagePath(page: BrandPage) {
  return `/${page.locale}/${page.slug}`;
}

export function brandPageUrl(page: BrandPage) {
  return `${site.url}${brandPagePath(page)}`;
}

export function brandPageFromSlug(locale: Locale, slug: string) {
  return brandPages.find((page) => page.locale === locale && page.slug === slug && page.status === "published");
}

export function brandPageForBrand(locale: Locale, brand: BrandKey) {
  return brandPages.find((page) => page.locale === locale && page.brand === brand && page.status === "published");
}

export function brandPageForVehicleMake(locale: Locale, vehicleMake: string) {
  const normalized = vehicleMake.toLowerCase();
  const brand = (["bmw", "audi", "volkswagen", "ford", "toyota"] as BrandKey[]).find(
    (item) => item === normalized
  );
  return brand ? brandPageForBrand(locale, brand) : undefined;
}

export function brandPageStaticParams() {
  return brandPages.filter((page) => page.status === "published").map((page) => ({
    locale: page.locale,
    slug: page.slug
  }));
}

export function brandLanguagePaths(brand: BrandKey) {
  return Object.fromEntries(
    (["nl", "en", "pl"] as Locale[]).map((locale) => {
      const page = brandPageForBrand(locale, brand);
      return [locale, page ? brandPagePath(page) : pathFor(locale, "chiptuning")];
    })
  ) as Record<Locale, string>;
}

export function brandNavigationLinks(locale: Locale) {
  return (["bmw", "audi", "volkswagen", "ford", "toyota"] as BrandKey[]).flatMap((brand) => {
    const page = brandPageForBrand(locale, brand);
    return page ? [{label: page.brandName, href: brandPagePath(page)}] : [];
  });
}

export function articleBrandLinks(article: {locale: Locale; relatedLinks: Array<{href: string}>}) {
  const matched = new Set<BrandKey>();

  for (const link of article.relatedLinks) {
    for (const [brand, slugs] of Object.entries(resultSlugs) as Array<[BrandKey, string[]]>) {
      if (slugs.some((slug) => link.href.includes(slug))) {
        matched.add(brand);
      }
    }
  }

  return [...matched].slice(0, 2).flatMap((brand) => {
    const page = brandPageForBrand(article.locale, brand);
    if (!page) {
      return [];
    }
    return [{
      label:
        article.locale === "nl"
          ? `${page.brandName} chiptuning`
          : article.locale === "en"
            ? `${page.brandName} chiptuning`
            : `Chiptuning ${page.brandName}`,
      href: brandPagePath(page)
    }];
  });
}

export const brandPageParentPath = (locale: Locale) => pathFor(locale, "chiptuning");
export const brandPageResultsPath = (locale: Locale) => pathFor(locale, "resultaten");
export const brandPageCatalogUrl = site.catalogUrl;
export const brandPageWhatsappUrl = site.whatsappUrl;
export const brandPageRouteSlugs = Object.fromEntries(
  (["nl", "en", "pl"] as Locale[]).map((locale) => [
    locale,
    brandPages.filter((page) => page.locale === locale).map((page) => page.slug)
  ])
) as Record<Locale, string[]>;
export const brandPageMainRoute = pageRoutes.chiptuning;
