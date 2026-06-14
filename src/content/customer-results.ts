import {pageRoutes, site, type Locale} from "./site";

export type CustomerResultSource = "manual" | "facebook";
export type CustomerResultStatus = "published" | "draft" | "demo";

export type CustomerResult = {
  id: string;
  locale: Locale;
  slug: string;
  source: CustomerResultSource;
  sourceUrl?: string;
  status: CustomerResultStatus;
  indexable: boolean;
  vehicleMake: string;
  vehicleModel: string;
  vehicleGeneration?: string;
  vehicleEngine: string;
  vehicleYear?: string;
  transmission?: string;
  ecu?: string;
  tcu?: string;
  serviceType: string;
  stage: string;
  fuelType?: string;
  stockPowerHp: number;
  stockTorqueNm: number;
  tunedPowerHp: number;
  tunedTorqueNm: number;
  gainPowerHp: number;
  gainTorqueNm: number;
  licensePlateVisible: boolean;
  images: string[];
  imageAlt: string;
  shortDescription: string;
  technicalNotes: string[];
  customerApproved: boolean;
  certificateAvailable: boolean;
  certificateNote?: string;
  publishedAt: string;
  updatedAt: string;
  disclaimer: string;
  relatedPowerCatalogUrl: string;
  whatsappCta: string;
  draftNotes?: string[];
  localizedDraftDescriptions?: Partial<Record<Locale, string>>;
};

type CustomerResultSeed = Omit<
  CustomerResult,
  | "id"
  | "locale"
  | "source"
  | "status"
  | "indexable"
  | "licensePlateVisible"
  | "customerApproved"
  | "certificateAvailable"
  | "publishedAt"
  | "updatedAt"
  | "disclaimer"
  | "relatedPowerCatalogUrl"
  | "whatsappCta"
>;

const demoDisclaimer = {
  nl: "Indicatief voorbeeld op basis van gangbare voertuigconfiguraties. Geen garantie voor identieke winst; definitieve resultaten zijn voertuigafhankelijk.",
  en: "Indicative example based on common vehicle configurations. Identical gains are not guaranteed; final results are vehicle-specific.",
  pl: "Przykład orientacyjny oparty na typowych konfiguracjach. Identyczny przyrost nie jest gwarantowany; wynik zależy od konkretnego auta."
} satisfies Record<Locale, string>;

const resultImages = {
  bmw330d: "/images/results/bmw-330d-g20.jpg",
  audiA4: "/images/results/audi-a4-b9-tdi.jpg",
  golfGti: "/images/results/volkswagen-golf-gti-mk7.jpg",
  mercedesC220d: "/images/results/mercedes-c220d-w206.jpg"
} as const;

function demoResult(locale: Locale, seed: CustomerResultSeed): CustomerResult {
  return {
    ...seed,
    id: `demo-${seed.slug}-${locale}`,
    locale,
    source: "manual",
    status: "demo",
    indexable: false,
    licensePlateVisible: false,
    customerApproved: false,
    certificateAvailable: false,
    publishedAt: "2026-06-13",
    updatedAt: "2026-06-13",
    disclaimer: demoDisclaimer[locale],
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  };
}

export function isPublicCustomerResult(result: CustomerResult) {
  return result.status === "published" && result.indexable;
}

export function publicCustomerResults(locale: Locale) {
  return customerResults.filter((result) => result.locale === locale && isPublicCustomerResult(result));
}

export function displayCustomerResults(locale: Locale) {
  return customerResults.filter((result) => result.locale === locale && result.status !== "draft");
}

export function customerResultPath(result: CustomerResult) {
  return `/${result.locale}/${pageRoutes.resultaten[result.locale]}/${result.slug}`;
}

export function customerResultUrl(result: CustomerResult) {
  return `${site.url}${customerResultPath(result)}`;
}

export function customerResultFromRoute(locale: Locale, resultsSlug: string, resultSlug: string) {
  if (resultsSlug !== pageRoutes.resultaten[locale]) {
    return undefined;
  }

  const result = customerResults.find((item) => item.locale === locale && item.slug === resultSlug);
  return result && isPublicCustomerResult(result) ? result : undefined;
}

export function customerResultStaticParams() {
  return customerResults.filter(isPublicCustomerResult).map((result) => ({
    locale: result.locale,
    resultsSlug: pageRoutes.resultaten[result.locale],
    resultSlug: result.slug
  }));
}

export const customerResults: CustomerResult[] = [
  demoResult("nl", {
    slug: "bmw-330d-stage-1",
    vehicleMake: "BMW",
    vehicleModel: "330d",
    vehicleGeneration: "G20 / G21",
    vehicleEngine: "3.0 diesel",
    vehicleYear: "G20 / G21",
    transmission: "ZF 8HP automaat, afhankelijk van uitvoering",
    ecu: "Bosch ECU, afhankelijk van uitvoering",
    tcu: "TCU controle afhankelijk van koppelwens",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 265,
    stockTorqueNm: 580,
    tunedPowerHp: 320,
    tunedTorqueNm: 680,
    gainPowerHp: 55,
    gainTorqueNm: 100,
    images: [resultImages.bmw330d],
    imageAlt: "BMW 330d Stage 1 indicatief voorbeeldresultaat",
    shortDescription: "Sterke diesel met brede koppelopbouw, ideaal voor dagelijks rijden en snelwegkilometers.",
    technicalNotes: ["Transmissielimieten blijven leidend", "Logcontrole aanbevolen bij hoge kilometerstand"]
  }),
  demoResult("nl", {
    slug: "audi-a4-20-tdi-stage-1",
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B9",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "B9",
    transmission: "S tronic of handgeschakeld, afhankelijk van uitvoering",
    ecu: "Bosch EDC, afhankelijk van bouwjaar",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 190,
    stockTorqueNm: 400,
    tunedPowerHp: 225,
    tunedTorqueNm: 470,
    gainPowerHp: 35,
    gainTorqueNm: 70,
    images: [resultImages.audiA4],
    imageAlt: "Audi A4 2.0 TDI Stage 1 indicatief voorbeeldresultaat",
    shortDescription: "Meer trekkracht in het middengebied met behoud van rustige, comfortabele rijeigenschappen.",
    technicalNotes: ["DPF- en EGR-status vooraf controleren", "Resultaat hangt af van softwareversie"]
  }),
  demoResult("nl", {
    slug: "volkswagen-golf-gti-stage-1",
    vehicleMake: "Volkswagen",
    vehicleModel: "Golf GTI",
    vehicleGeneration: "MQB",
    vehicleEngine: "2.0 TSI",
    vehicleYear: "MQB",
    transmission: "DSG of handgeschakeld",
    ecu: "Bosch MED / MG, afhankelijk van uitvoering",
    tcu: "DSG / TCU controle kan relevant zijn",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Benzine",
    stockPowerHp: 245,
    stockTorqueNm: 370,
    tunedPowerHp: 305,
    tunedTorqueNm: 450,
    gainPowerHp: 60,
    gainTorqueNm: 80,
    images: [resultImages.golfGti],
    imageAlt: "Volkswagen Golf GTI Stage 1 indicatief voorbeeldresultaat",
    shortDescription: "Snellere respons en duidelijk meer punch zonder harde of nerveuze vermogensafgifte.",
    technicalNotes: ["Brandstofkwaliteit is belangrijk", "DSG / TCU controle kan relevant zijn"]
  }),
  demoResult("nl", {
    slug: "mercedes-c-220d-stage-1",
    vehicleMake: "Mercedes",
    vehicleModel: "C 220d",
    vehicleGeneration: "W205 / W206",
    vehicleEngine: "2.0 diesel",
    vehicleYear: "W205 / W206",
    transmission: "9G-Tronic, afhankelijk van uitvoering",
    ecu: "Bosch ECU, afhankelijk van uitvoering",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 194,
    stockTorqueNm: 400,
    tunedPowerHp: 230,
    tunedTorqueNm: 500,
    gainPowerHp: 36,
    gainTorqueNm: 100,
    images: [resultImages.mercedesC220d],
    imageAlt: "Mercedes C 220d Stage 1 indicatief voorbeeldresultaat",
    shortDescription: "Comfortabel meer koppel voor inhalen, belading en soepel rijden op lage toeren.",
    technicalNotes: ["Automaatadaptatie en onderhoudsstaat tellen mee", "Diagnose vooraf aanbevolen"]
  }),
  demoResult("en", {
    slug: "bmw-330d-stage-1",
    vehicleMake: "BMW",
    vehicleModel: "330d",
    vehicleGeneration: "G20 / G21",
    vehicleEngine: "3.0 diesel",
    vehicleYear: "G20 / G21",
    transmission: "ZF 8HP automatic, depending on variant",
    ecu: "Bosch ECU, depending on variant",
    tcu: "TCU checks depend on torque target",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 265,
    stockTorqueNm: 580,
    tunedPowerHp: 320,
    tunedTorqueNm: 680,
    gainPowerHp: 55,
    gainTorqueNm: 100,
    images: [resultImages.bmw330d],
    imageAlt: "BMW 330d Stage 1 indicative example result",
    shortDescription: "Strong diesel tuning with broad torque for daily driving and motorway use.",
    technicalNotes: ["Gearbox torque limits remain leading", "Logging is advised at higher mileage"]
  }),
  demoResult("en", {
    slug: "audi-a4-20-tdi-stage-1",
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B9",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "B9",
    transmission: "S tronic or manual, depending on variant",
    ecu: "Bosch EDC, depending on year",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 190,
    stockTorqueNm: 400,
    tunedPowerHp: 225,
    tunedTorqueNm: 470,
    gainPowerHp: 35,
    gainTorqueNm: 70,
    images: [resultImages.audiA4],
    imageAlt: "Audi A4 2.0 TDI Stage 1 indicative example result",
    shortDescription: "More midrange torque while keeping a calm, factory-like driving feel.",
    technicalNotes: ["DPF and EGR state should be checked first", "Software version affects the final route"]
  }),
  demoResult("en", {
    slug: "volkswagen-golf-gti-stage-1",
    vehicleMake: "Volkswagen",
    vehicleModel: "Golf GTI",
    vehicleGeneration: "MQB",
    vehicleEngine: "2.0 TSI",
    vehicleYear: "MQB",
    transmission: "DSG or manual",
    ecu: "Bosch MED / MG, depending on variant",
    tcu: "DSG / TCU checks can be relevant",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Petrol",
    stockPowerHp: 245,
    stockTorqueNm: 370,
    tunedPowerHp: 305,
    tunedTorqueNm: 450,
    gainPowerHp: 60,
    gainTorqueNm: 80,
    images: [resultImages.golfGti],
    imageAlt: "Volkswagen Golf GTI Stage 1 indicative example result",
    shortDescription: "Sharper response and extra punch without nervous power delivery.",
    technicalNotes: ["Fuel quality matters", "DSG / TCU checks can be relevant"]
  }),
  demoResult("en", {
    slug: "mercedes-c-220d-stage-1",
    vehicleMake: "Mercedes",
    vehicleModel: "C 220d",
    vehicleGeneration: "W205 / W206",
    vehicleEngine: "2.0 diesel",
    vehicleYear: "W205 / W206",
    transmission: "9G-Tronic, depending on variant",
    ecu: "Bosch ECU, depending on variant",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 194,
    stockTorqueNm: 400,
    tunedPowerHp: 230,
    tunedTorqueNm: 500,
    gainPowerHp: 36,
    gainTorqueNm: 100,
    images: [resultImages.mercedesC220d],
    imageAlt: "Mercedes C 220d Stage 1 indicative example result",
    shortDescription: "Comfortable extra torque for overtaking, load and low-rpm driving.",
    technicalNotes: ["Automatic gearbox adaptation and maintenance matter", "Diagnostics are recommended first"]
  }),
  demoResult("pl", {
    slug: "bmw-330d-stage-1",
    vehicleMake: "BMW",
    vehicleModel: "330d",
    vehicleGeneration: "G20 / G21",
    vehicleEngine: "3.0 diesel",
    vehicleYear: "G20 / G21",
    transmission: "Automat ZF 8HP, zależnie od wersji",
    ecu: "Bosch ECU, zależnie od wersji",
    tcu: "Kontrola TCU zależna od docelowego momentu",
    serviceType: "Remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 265,
    stockTorqueNm: 580,
    tunedPowerHp: 320,
    tunedTorqueNm: 680,
    gainPowerHp: 55,
    gainTorqueNm: 100,
    images: [resultImages.bmw330d],
    imageAlt: "BMW 330d Stage 1 przykład orientacyjny",
    shortDescription: "Mocny diesel z szerokim momentem do jazdy codziennej i tras.",
    technicalNotes: ["Limity skrzyni są kluczowe", "Przy większym przebiegu zalecana analiza logów"]
  }),
  demoResult("pl", {
    slug: "audi-a4-20-tdi-stage-1",
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B9",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "B9",
    transmission: "S tronic lub manual, zależnie od wersji",
    ecu: "Bosch EDC, zależnie od rocznika",
    serviceType: "Remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 190,
    stockTorqueNm: 400,
    tunedPowerHp: 225,
    tunedTorqueNm: 470,
    gainPowerHp: 35,
    gainTorqueNm: 70,
    images: [resultImages.audiA4],
    imageAlt: "Audi A4 2.0 TDI Stage 1 przykład orientacyjny",
    shortDescription: "Więcej momentu w średnim zakresie i spokojny, fabryczny charakter jazdy.",
    technicalNotes: ["Warto sprawdzić DPF i EGR", "Wersja oprogramowania wpływa na finalny zakres"]
  }),
  demoResult("pl", {
    slug: "volkswagen-golf-gti-stage-1",
    vehicleMake: "Volkswagen",
    vehicleModel: "Golf GTI",
    vehicleGeneration: "MQB",
    vehicleEngine: "2.0 TSI",
    vehicleYear: "MQB",
    transmission: "DSG lub manual",
    ecu: "Bosch MED / MG, zależnie od wersji",
    tcu: "Kontrola DSG / TCU może być wskazana",
    serviceType: "Remap ECU",
    stage: "Stage 1",
    fuelType: "Benzyna",
    stockPowerHp: 245,
    stockTorqueNm: 370,
    tunedPowerHp: 305,
    tunedTorqueNm: 450,
    gainPowerHp: 60,
    gainTorqueNm: 80,
    images: [resultImages.golfGti],
    imageAlt: "Volkswagen Golf GTI Stage 1 przykład orientacyjny",
    shortDescription: "Lepsza reakcja i mocniejsze przyspieszenie bez nerwowego oddawania mocy.",
    technicalNotes: ["Jakość paliwa ma znaczenie", "Kontrola DSG / TCU może być wskazana"]
  }),
  demoResult("pl", {
    slug: "mercedes-c-220d-stage-1",
    vehicleMake: "Mercedes",
    vehicleModel: "C 220d",
    vehicleGeneration: "W205 / W206",
    vehicleEngine: "2.0 diesel",
    vehicleYear: "W205 / W206",
    transmission: "9G-Tronic, zależnie od wersji",
    ecu: "Bosch ECU, zależnie od wersji",
    serviceType: "Remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    stockPowerHp: 194,
    stockTorqueNm: 400,
    tunedPowerHp: 230,
    tunedTorqueNm: 500,
    gainPowerHp: 36,
    gainTorqueNm: 100,
    images: [resultImages.mercedesC220d],
    imageAlt: "Mercedes C 220d Stage 1 przykład orientacyjny",
    shortDescription: "Więcej momentu do wyprzedzania, jazdy z obciążeniem i spokojnej jazdy z niskich obrotów.",
    technicalNotes: ["Stan automatu i adaptacje są ważne", "Diagnostyka przed usługą jest zalecana"]
  }),
  {
    id: "draft-bmw-x3-e83-20d-stage-1-nl",
    locale: "nl",
    slug: "bmw-x3-e83-20d-stage-1",
    source: "manual",
    status: "draft",
    indexable: false,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "Automaat of handgeschakeld, te bevestigen",
    licensePlateVisible: false,
    images: [],
    imageAlt: "BMW X3 E83 2.0d Stage 1 resultaatfoto, nog te vervangen door eigenaar-goedgekeurde foto",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    tcu: "Te controleren indien automaat",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "Draft voor een BMW X3 E83 2.0d Stage 1 case. Niet publiceren voordat foto, klantgoedkeuring en definitieve beschrijving zijn bevestigd.",
    technicalNotes: [
      "Motor: N47",
      "ECU: Bosch EDC17",
      "Certificaat aan klant meegegeven",
      "Controleer onderhoudsstaat, DPF/EGR-status en transmissiegedrag voordat dit als case wordt gepubliceerd"
    ],
    customerApproved: false,
    certificateAvailable: true,
    certificateNote: "Certificaat aanwezig volgens eigenaar; bestand/referentie later toevoegen.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-14",
    disclaimer:
      "Draft en niet indexeerbaar. Resultaten zijn voertuigspecifiek en afhankelijk van onderhoudsstaat, ECU/TCU, softwareversie, brandstof, hardware en gebruik.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl,
    draftNotes: [
      "Eigenaar-goedgekeurde foto toevoegen",
      "Bron/Facebook-post URL toevoegen indien beschikbaar",
      "Klantgoedkeuring expliciet bevestigen",
      "Definitieve technische notities en certificaatreferentie aanvullen"
    ],
    localizedDraftDescriptions: {
      nl: "BMW X3 E83 2.0d met N47-motor en Bosch EDC17, voorbereid als Stage 1 klantcase. De bekende waarden zijn 177 pk / 350 Nm origineel en 214 pk / 420 Nm na tuning.",
      en: "BMW X3 E83 2.0d with N47 engine and Bosch EDC17, prepared as a Stage 1 customer-result draft. Known figures are 177 hp / 350 Nm stock and 214 hp / 420 Nm tuned.",
      pl: "BMW X3 E83 2.0d z silnikiem N47 i sterownikiem Bosch EDC17, przygotowany jako szkic realizacji Stage 1. Znane wartości to 177 KM / 350 Nm seryjnie i 214 KM / 420 Nm po tuningu."
    }
  },
  {
    id: "draft-bmw-x3-e83-20d-stage-1-en",
    locale: "en",
    slug: "bmw-x3-e83-20d-stage-1",
    source: "manual",
    status: "draft",
    indexable: false,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "Automatic or manual, to be confirmed",
    licensePlateVisible: false,
    images: [],
    imageAlt: "BMW X3 E83 2.0d Stage 1 result image placeholder pending owner approval",
    serviceType: "ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    tcu: "To be checked if automatic",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "Draft BMW X3 E83 2.0d Stage 1 case. Do not publish until image rights, customer approval and final copy are confirmed.",
    technicalNotes: [
      "Engine: N47",
      "ECU: Bosch EDC17",
      "Certificate given to the customer",
      "Confirm condition, DPF/EGR status and transmission behaviour before publishing"
    ],
    customerApproved: false,
    certificateAvailable: true,
    certificateNote: "Certificate exists according to owner; file/reference to be added later.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-14",
    disclaimer:
      "Draft and non-indexable. Results are vehicle-specific and depend on condition, ECU/TCU, software version, fuel, hardware and use.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl,
    draftNotes: [
      "Add owner-approved image",
      "Add source/Facebook post URL if available",
      "Confirm customer approval",
      "Complete final technical notes and certificate reference"
    ],
    localizedDraftDescriptions: {
      nl: "BMW X3 E83 2.0d met N47-motor en Bosch EDC17, voorbereid als Stage 1 klantcase. De bekende waarden zijn 177 pk / 350 Nm origineel en 214 pk / 420 Nm na tuning.",
      en: "BMW X3 E83 2.0d with N47 engine and Bosch EDC17, prepared as a Stage 1 customer-result draft. Known figures are 177 hp / 350 Nm stock and 214 hp / 420 Nm tuned.",
      pl: "BMW X3 E83 2.0d z silnikiem N47 i sterownikiem Bosch EDC17, przygotowany jako szkic realizacji Stage 1. Znane wartości to 177 KM / 350 Nm seryjnie i 214 KM / 420 Nm po tuningu."
    }
  },
  {
    id: "draft-bmw-x3-e83-20d-stage-1-pl",
    locale: "pl",
    slug: "bmw-x3-e83-20d-stage-1",
    source: "manual",
    status: "draft",
    indexable: false,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "Automat lub manual, do potwierdzenia",
    licensePlateVisible: false,
    images: [],
    imageAlt: "BMW X3 E83 2.0d Stage 1, zdjęcie realizacji do zastąpienia po akceptacji właściciela",
    serviceType: "Remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    tcu: "Do sprawdzenia przy automacie",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "Szkic realizacji BMW X3 E83 2.0d Stage 1. Nie publikować przed potwierdzeniem zdjęć, zgody klienta i finalnego opisu.",
    technicalNotes: [
      "Silnik: N47",
      "ECU: Bosch EDC17",
      "Certyfikat przekazany klientowi",
      "Przed publikacją potwierdzić stan auta, DPF/EGR i zachowanie skrzyni"
    ],
    customerApproved: false,
    certificateAvailable: true,
    certificateNote: "Certyfikat istnieje według właściciela; plik lub referencję dodać później.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-14",
    disclaimer:
      "Szkic, nieindeksowany. Wyniki zależą od konkretnego auta, ECU/TCU, wersji oprogramowania, paliwa, osprzętu i sposobu użytkowania.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl,
    draftNotes: [
      "Dodać zdjęcie zaakceptowane przez właściciela",
      "Dodać URL posta z Facebooka, jeśli będzie dostępny",
      "Potwierdzić zgodę klienta",
      "Uzupełnić finalne notatki techniczne i referencję certyfikatu"
    ],
    localizedDraftDescriptions: {
      nl: "BMW X3 E83 2.0d met N47-motor en Bosch EDC17, voorbereid als Stage 1 klantcase. De bekende waarden zijn 177 pk / 350 Nm origineel en 214 pk / 420 Nm na tuning.",
      en: "BMW X3 E83 2.0d with N47 engine and Bosch EDC17, prepared as a Stage 1 customer-result draft. Known figures are 177 hp / 350 Nm stock and 214 hp / 420 Nm tuned.",
      pl: "BMW X3 E83 2.0d z silnikiem N47 i sterownikiem Bosch EDC17, przygotowany jako szkic realizacji Stage 1. Znane wartości to 177 KM / 350 Nm seryjnie i 214 KM / 420 Nm po tuningu."
    }
  }
];
