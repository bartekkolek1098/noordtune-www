import {pageRoutes, site, type Locale} from "./site";

export type CustomerResultSource = "manual" | "facebook";
export type CustomerResultStatus = "published" | "draft" | "demo";

export type CustomerResult = {
  id: string;
  locale: Locale;
  slug: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
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
  licensePlateApproved?: boolean;
  images: string[];
  ogImage?: string;
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
  bmwX3: "/images/results/bmw-x3-e83-20d-stage-1.webp",
  bmwX3Og: "/images/results/bmw-x3-e83-20d-stage-1-og.webp",
  audiA4: "/images/results/audi-a4-b9-tdi.jpg",
  audiA4B7: "/images/results/audi-a4-b7-20-tdi-stage-2-plus.webp",
  audiA4B7Og: "/images/results/audi-a4-b7-20-tdi-stage-2-plus-og.webp",
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
  return customerResults
    .filter((result) => result.locale === locale && isPublicCustomerResult(result))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function customerResultPath(result: CustomerResult) {
  return `/${result.locale}/${pageRoutes.resultaten[result.locale]}/${result.slug}`;
}

export function customerResultUrl(result: CustomerResult) {
  return `${site.url}${customerResultPath(result)}`;
}

const fallbackCustomerResultImage = "/images/sections/ford-sid212-obd.webp";

function normalizeCustomerResultImagePath(path: string | undefined, fallback = fallbackCustomerResultImage) {
  if (!path?.trim()) {
    return fallback;
  }

  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }

  return `/${path}`;
}

export function customerResultPrimaryImage(result: CustomerResult) {
  return normalizeCustomerResultImagePath(result.images[0]);
}

export function customerResultCardImage(result: CustomerResult) {
  return customerResultPrimaryImage(result);
}

export function customerResultOgImage(result: CustomerResult) {
  return normalizeCustomerResultImagePath(result.ogImage, customerResultPrimaryImage(result));
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
    id: "customer-bmw-x3-e83-20d-stage-1-nl",
    locale: "nl",
    slug: "bmw-x3-e83-20d-stage-1",
    title: "BMW X3 E83 2.0d Stage 1 chiptuning",
    metaTitle: "BMW X3 E83 2.0d Stage 1 chiptuning | NoordTune klantresultaat",
    metaDescription:
      "BMW X3 E83 2.0d Stage 1 ECU remap: 177 pk / 350 Nm naar 214 pk / 420 Nm. Klant uit Polen, maatwerk software en certificaat geleverd.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "Te bevestigen per voertuig",
    licensePlateVisible: true,
    images: [resultImages.bmwX3],
    ogImage: resultImages.bmwX3Og,
    imageAlt: "BMW X3 E83 2.0d Stage 1 chiptuning resultaat bij NoordTune.nl",
    serviceType: "Stage 1 / ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "Een klant uit Polen bezocht NoordTune.nl met zijn BMW X3 E83 2.0d voor een maatwerk Stage 1 ECU remap. De software is individueel afgestemd op dit voertuig, met aandacht voor betere trekkracht, soepelere vermogensopbouw en veilige marges.",
    technicalNotes: [
      "Voertuig: BMW X3 E83 2.0d",
      "Motor: N47",
      "ECU: Bosch EDC17",
      "Service: Stage 1 / custom ECU remap",
      "Kalibratie: maatwerk en voertuigspecifiek",
      "Certificaat aan de klant meegegeven",
      "Aanbevelingen na tuning aan de klant meegegeven"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Certificaat aanwezig volgens eigenaar; bestand/referentie later toevoegen.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-15",
    disclaimer:
      "De genoemde waarden horen bij dit specifieke voertuig en deze configuratie. Resultaten kunnen verschillen per auto, softwareversie, onderhoudsstaat, brandstof, transmissie en hardware.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  },
  {
    id: "customer-bmw-x3-e83-20d-stage-1-en",
    locale: "en",
    slug: "bmw-x3-e83-20d-stage-1",
    title: "BMW X3 E83 2.0d Stage 1 ECU remap",
    metaTitle: "BMW X3 E83 2.0d Stage 1 ECU remap | NoordTune customer result",
    metaDescription:
      "BMW X3 E83 2.0d Stage 1 ECU remap: 177 hp / 350 Nm to 214 hp / 420 Nm. Customer from Poland, custom calibration and certificate delivered.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "To be confirmed per vehicle",
    licensePlateVisible: true,
    images: [resultImages.bmwX3],
    ogImage: resultImages.bmwX3Og,
    imageAlt: "BMW X3 E83 2.0d Stage 1 ECU remap result at NoordTune.nl",
    serviceType: "Stage 1 / ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "A customer from Poland visited NoordTune.nl with a BMW X3 E83 2.0d for a custom Stage 1 ECU remap. The calibration was tailored to this specific vehicle, focusing on stronger torque delivery, smoother power build-up and responsible safety margins.",
    technicalNotes: [
      "Vehicle: BMW X3 E83 2.0d",
      "Engine: N47",
      "ECU: Bosch EDC17",
      "Service: Stage 1 / custom ECU remap",
      "Calibration: custom and vehicle-specific",
      "Certificate given to the customer",
      "Recommendations after tuning delivered to the customer"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Certificate exists according to owner; file/reference to be added later.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-15",
    disclaimer:
      "The stated figures apply to this specific vehicle and configuration. Results can vary depending on vehicle condition, software version, fuel, transmission and hardware.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  },
  {
    id: "customer-bmw-x3-e83-20d-stage-1-pl",
    locale: "pl",
    slug: "bmw-x3-e83-20d-stage-1",
    title: "BMW X3 E83 2.0d Stage 1 — indywidualny remap ECU",
    metaTitle: "BMW X3 E83 2.0d Stage 1 — indywidualny remap ECU | NoordTune",
    metaDescription:
      "BMW X3 E83 2.0d Stage 1: 177 KM / 350 Nm seryjnie i 214 KM / 420 Nm po remapie ECU. Klient z Polski, indywidualna kalibracja i certyfikat.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "BMW",
    vehicleModel: "X3",
    vehicleGeneration: "E83",
    vehicleEngine: "2.0d N47",
    vehicleYear: "E83",
    transmission: "Do potwierdzenia dla konkretnego auta",
    licensePlateVisible: true,
    images: [resultImages.bmwX3],
    ogImage: resultImages.bmwX3Og,
    imageAlt: "BMW X3 E83 2.0d Stage 1 — wynik indywidualnego remapu ECU w NoordTune.nl",
    serviceType: "Stage 1 / remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    ecu: "Bosch EDC17",
    stockPowerHp: 177,
    stockTorqueNm: 350,
    tunedPowerHp: 214,
    tunedTorqueNm: 420,
    gainPowerHp: 37,
    gainTorqueNm: 70,
    shortDescription:
      "Klient z Polski odwiedził NoordTune.nl swoim BMW X3 E83 2.0d, aby wykonać indywidualny Stage 1. Oryginalne oprogramowanie zostało przeanalizowane, a następnie przygotowaliśmy mapę dopasowaną do konkretnego samochodu, z naciskiem na lepszą elastyczność, wyższy moment obrotowy i bezpieczne marginesy pracy silnika.",
    technicalNotes: [
      "Pojazd: BMW X3 E83 2.0d",
      "Silnik: N47",
      "ECU: Bosch EDC17",
      "Usługa: Stage 1 / indywidualny remap ECU",
      "Kalibracja: dopasowana do konkretnego auta",
      "Certyfikat przekazany klientowi",
      "Zalecenia po tuningu przekazane klientowi"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Certyfikat istnieje według właściciela; plik lub referencję dodać później.",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-15",
    disclaimer:
      "Podane wartości dotyczą tego konkretnego egzemplarza i konfiguracji. Wyniki mogą różnić się w zależności od stanu auta, wersji oprogramowania, paliwa, skrzyni biegów i osprzętu.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  },
  {
    id: "customer-audi-a4-b7-20-tdi-stage-2-plus-nl",
    locale: "nl",
    slug: "audi-a4-b7-20-tdi-stage-2-plus",
    title: "Audi A4 B7 2.0 TDI Stage 2+ chiptuning",
    metaTitle: "Audi A4 B7 2.0 TDI Stage 2+ chiptuning | NoordTune klantresultaat",
    metaDescription:
      "Audi A4 B7 2.0 TDI Stage 2+ maatwerk ECU-remap: 170 pk / 350 Nm naar 235 pk / 470 Nm met downpipe, hybride turbo en certificaat.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B7",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "2008",
    transmission: "Handgeschakeld",
    ecu: "Gecontroleerd tijdens service; niet publiek vermeld",
    tcu: "Niet van toepassing",
    serviceType: "Stage 2+ / maatwerk ECU-remap",
    stage: "Stage 2+",
    fuelType: "Diesel",
    stockPowerHp: 170,
    stockTorqueNm: 350,
    tunedPowerHp: 235,
    tunedTorqueNm: 470,
    gainPowerHp: 65,
    gainTorqueNm: 120,
    licensePlateVisible: true,
    licensePlateApproved: true,
    images: [resultImages.audiA4B7],
    ogImage: resultImages.audiA4B7Og,
    imageAlt: "Audi A4 B7 2.0 TDI Stage 2+ chiptuning resultaat bij NoordTune.nl",
    shortDescription:
      "Deze Audi A4 B7 2.0 TDI kreeg bij NoordTune.nl een complete Stage 2+ setup, afgestemd op de aanwezige hardwareconfiguratie. De software is niet als standaard bestand toegepast, maar als maatwerk ECU-remap opgebouwd rond de hybride turbo, downpipe en de technische staat van deze auto.",
    technicalNotes: [
      "Voertuig: Audi A4 B7 2.0 TDI",
      "Bouwjaar: 2008",
      "Transmissie: handgeschakeld",
      "Hardwareconfiguratie: downpipe + hybride turbo",
      "Maatwerk ECU remap / Stage 2+",
      "Software afgestemd op hybride turbo en downpipe",
      "Optimalisatie van turbodruk, brandstof en inspuiting",
      "Scherpere gaspedaalrespons",
      "Meer koppel onderin en in het middengebied",
      "Soepelere vermogensopbouw",
      "Snellere doortrek en sportiever rijgevoel",
      "Certificaat van uitgevoerde dienst geleverd"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Certificaat van uitgevoerde dienst geleverd.",
    publishedAt: "2026-06-16",
    updatedAt: "2026-06-16",
    disclaimer:
      "De genoemde waarden horen bij deze specifieke Audi A4 B7 en deze hardwareconfiguratie. Resultaten kunnen verschillen per auto, softwareversie, onderhoudsstaat, brandstof, transmissie, hardware en gebruik. Controleer altijd welke aanpassingen wettelijk zijn toegestaan voor jouw situatie.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  },
  {
    id: "customer-audi-a4-b7-20-tdi-stage-2-plus-en",
    locale: "en",
    slug: "audi-a4-b7-20-tdi-stage-2-plus",
    title: "Audi A4 B7 2.0 TDI Stage 2+ ECU remap",
    metaTitle: "Audi A4 B7 2.0 TDI Stage 2+ ECU remap | NoordTune customer result",
    metaDescription:
      "Audi A4 B7 2.0 TDI Stage 2+ custom ECU remap: 170 hp / 350 Nm to 235 hp / 470 Nm with downpipe, hybrid turbo and certificate.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B7",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "2008",
    transmission: "Manual",
    ecu: "Verified during service; not publicly listed",
    tcu: "Not applicable",
    serviceType: "Stage 2+ / custom ECU remap",
    stage: "Stage 2+",
    fuelType: "Diesel",
    stockPowerHp: 170,
    stockTorqueNm: 350,
    tunedPowerHp: 235,
    tunedTorqueNm: 470,
    gainPowerHp: 65,
    gainTorqueNm: 120,
    licensePlateVisible: true,
    licensePlateApproved: true,
    images: [resultImages.audiA4B7],
    ogImage: resultImages.audiA4B7Og,
    imageAlt: "Audi A4 B7 2.0 TDI Stage 2+ ECU remap result at NoordTune.nl",
    shortDescription:
      "This Audi A4 B7 2.0 TDI received a complete Stage 2+ setup at NoordTune.nl, calibrated around its current hardware configuration. The software was not treated as a generic file, but as a custom ECU remap matched to the hybrid turbo, downpipe and vehicle condition.",
    technicalNotes: [
      "Vehicle: Audi A4 B7 2.0 TDI",
      "Year: 2008",
      "Transmission: manual",
      "Hardware configuration: downpipe + hybrid turbo",
      "Custom ECU remap / Stage 2+",
      "Software calibrated for hybrid turbo and downpipe",
      "Boost, fuel and injection optimization",
      "Sharper throttle response",
      "Stronger torque in the low and mid range",
      "Smoother power delivery",
      "Faster acceleration and sportier driving feel",
      "Service certificate delivered"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Service certificate delivered.",
    publishedAt: "2026-06-16",
    updatedAt: "2026-06-16",
    disclaimer:
      "The stated figures apply to this specific Audi A4 B7 and hardware configuration. Results can vary depending on vehicle condition, software version, fuel, transmission, hardware and use. Always check which modifications are legally permitted for your situation.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  },
  {
    id: "customer-audi-a4-b7-20-tdi-stage-2-plus-pl",
    locale: "pl",
    slug: "audi-a4-b7-20-tdi-stage-2-plus",
    title: "Audi A4 B7 2.0 TDI Stage 2+ — indywidualny remap ECU",
    metaTitle: "Audi A4 B7 2.0 TDI Stage 2+ — indywidualny remap ECU | NoordTune",
    metaDescription:
      "Audi A4 B7 2.0 TDI Stage 2+: 170 KM / 350 Nm seryjnie i 235 KM / 470 Nm po remapie ECU, z downpipe, hybrydową turbosprężarką i certyfikatem.",
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: "Audi",
    vehicleModel: "A4",
    vehicleGeneration: "B7",
    vehicleEngine: "2.0 TDI",
    vehicleYear: "2008",
    transmission: "Manualna",
    ecu: "Zweryfikowane podczas usługi; niepodawane publicznie",
    tcu: "Nie dotyczy",
    serviceType: "Stage 2+ / indywidualny remap ECU",
    stage: "Stage 2+",
    fuelType: "Diesel",
    stockPowerHp: 170,
    stockTorqueNm: 350,
    tunedPowerHp: 235,
    tunedTorqueNm: 470,
    gainPowerHp: 65,
    gainTorqueNm: 120,
    licensePlateVisible: true,
    licensePlateApproved: true,
    images: [resultImages.audiA4B7],
    ogImage: resultImages.audiA4B7Og,
    imageAlt: "Audi A4 B7 2.0 TDI Stage 2+ — wynik indywidualnego remapu ECU w NoordTune.nl",
    shortDescription:
      "Ten Audi A4 B7 2.0 TDI otrzymał w NoordTune.nl kompletną konfigurację Stage 2+, przygotowaną pod aktualny zestaw modyfikacji. Nie była to gotowa mapa, lecz indywidualny remap ECU dopasowany do hybrydowej turbosprężarki, downpipe oraz stanu technicznego konkretnego auta.",
    technicalNotes: [
      "Pojazd: Audi A4 B7 2.0 TDI",
      "Rok: 2008",
      "Skrzynia: manualna",
      "Konfiguracja sprzętowa: downpipe + hybrydowa turbosprężarka",
      "Indywidualny remap ECU / Stage 2+",
      "Oprogramowanie dopasowane do hybrydowej turbosprężarki i downpipe",
      "Optymalizacja doładowania, paliwa i wtrysku",
      "Lepsza reakcja na pedał gazu",
      "Większy moment w dolnym i średnim zakresie obrotów",
      "Płynniejsze oddawanie mocy",
      "Szybsze przyspieszanie i bardziej sportowe odczucie z jazdy",
      "Certyfikat wykonanej usługi przekazany klientowi"
    ],
    customerApproved: true,
    certificateAvailable: true,
    certificateNote: "Certyfikat wykonanej usługi przekazany klientowi.",
    publishedAt: "2026-06-16",
    updatedAt: "2026-06-16",
    disclaimer:
      "Podane wartości dotyczą tego konkretnego Audi A4 B7 i tej konfiguracji sprzętowej. Wyniki mogą różnić się w zależności od stanu auta, wersji oprogramowania, paliwa, skrzyni biegów, osprzętu i sposobu użytkowania. Zawsze należy sprawdzić, jakie modyfikacje są dozwolone w danej sytuacji.",
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  }
];
