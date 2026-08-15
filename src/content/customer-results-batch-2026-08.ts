import type {CustomerResult, CustomerResultMetric} from "./customer-results";
import {site, type Locale} from "./site";

type ResultBase = Pick<
  CustomerResult,
  | "slug"
  | "vehicleMake"
  | "vehicleModel"
  | "vehicleGeneration"
  | "vehicleEngine"
  | "vehicleYear"
  | "stockPowerHp"
  | "stockTorqueNm"
  | "tunedPowerHp"
  | "tunedTorqueNm"
  | "gainPowerHp"
  | "gainTorqueNm"
  | "featuredOnHome"
  | "featuredOrder"
  | "category"
  | "licensePlateVisible"
  | "licensePlateApproved"
  | "certificateAvailable"
> & {
  image: string;
  ogImage: string;
};

type LocalizedResult = {
  locale: Locale;
  title: string;
  metaTitle: string;
  metaDescription: string;
  imageAlt: string;
  transmission?: string;
  ecu?: string;
  tcu?: string;
  serviceType: string;
  stage: string;
  fuelType?: string;
  shortDescription: string;
  technicalNotes: string[];
  serviceTags?: string[];
  resultMetrics?: CustomerResultMetric[];
  certificateNote?: string;
  disclaimer: string;
};

const publishedAt = "2026-08-16";

function publishedResult(base: ResultBase, copy: LocalizedResult): CustomerResult {
  return {
    id: `customer-${base.slug}-${copy.locale}`,
    locale: copy.locale,
    slug: base.slug,
    title: copy.title,
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    source: "manual",
    status: "published",
    indexable: true,
    vehicleMake: base.vehicleMake,
    vehicleModel: base.vehicleModel,
    vehicleGeneration: base.vehicleGeneration,
    vehicleEngine: base.vehicleEngine,
    vehicleYear: base.vehicleYear,
    transmission: copy.transmission,
    ecu: copy.ecu,
    tcu: copy.tcu,
    serviceType: copy.serviceType,
    stage: copy.stage,
    featuredOnHome: base.featuredOnHome,
    featuredOrder: base.featuredOrder,
    category: base.category,
    serviceTags: copy.serviceTags ?? [copy.stage, copy.fuelType].filter((tag): tag is string => Boolean(tag)),
    fuelType: copy.fuelType,
    stockPowerHp: base.stockPowerHp,
    stockTorqueNm: base.stockTorqueNm,
    tunedPowerHp: base.tunedPowerHp,
    tunedTorqueNm: base.tunedTorqueNm,
    gainPowerHp: base.gainPowerHp,
    gainTorqueNm: base.gainTorqueNm,
    resultMetrics: copy.resultMetrics,
    licensePlateVisible: base.licensePlateVisible,
    licensePlateApproved: base.licensePlateApproved,
    images: [base.image],
    ogImage: base.ogImage,
    imageAlt: copy.imageAlt,
    shortDescription: copy.shortDescription,
    technicalNotes: copy.technicalNotes,
    customerApproved: true,
    certificateAvailable: base.certificateAvailable,
    certificateNote: copy.certificateNote,
    publishedAt,
    updatedAt: publishedAt,
    disclaimer: copy.disclaimer,
    relatedPowerCatalogUrl: site.catalogUrl,
    whatsappCta: site.whatsappUrl
  };
}

const fordTransit: ResultBase = {
  slug: "ford-transit-connect-15-ecoblue-2019-stage-1",
  vehicleMake: "Ford",
  vehicleModel: "Transit Connect",
  vehicleEngine: "1.5 EcoBlue",
  vehicleYear: "2019",
  stockPowerHp: 100,
  stockTorqueNm: 250,
  tunedPowerHp: 145,
  tunedTorqueNm: 320,
  gainPowerHp: 45,
  gainTorqueNm: 70,
  category: "ecu-tuning",
  licensePlateVisible: true,
  licensePlateApproved: true,
  certificateAvailable: false,
  image: "/images/results/ford-transit-connect-15-ecoblue-2019-stage-1.webp",
  ogImage: "/images/results/ford-transit-connect-15-ecoblue-2019-stage-1-og.webp"
};

const toyotaProAce: ResultBase = {
  slug: "toyota-proace-verso-vip-20d-2023-stage-1",
  vehicleMake: "Toyota",
  vehicleModel: "ProAce Verso VIP",
  vehicleEngine: "2.0D",
  vehicleYear: "2023",
  stockPowerHp: 177,
  stockTorqueNm: 400,
  tunedPowerHp: 205,
  tunedTorqueNm: 450,
  gainPowerHp: 28,
  gainTorqueNm: 50,
  featuredOnHome: true,
  featuredOrder: 3,
  category: "ecu-tuning",
  licensePlateVisible: true,
  licensePlateApproved: true,
  certificateAvailable: false,
  image: "/images/results/toyota-proace-verso-vip-20d-2023-stage-1.webp",
  ogImage: "/images/results/toyota-proace-verso-vip-20d-2023-stage-1-og.webp"
};

const bmwF40: ResultBase = {
  slug: "bmw-f40-118i-7dct300-tcu-tuning",
  vehicleMake: "BMW",
  vehicleModel: "118i",
  vehicleGeneration: "F40",
  vehicleEngine: "B38",
  category: "tcu-tuning",
  licensePlateVisible: false,
  licensePlateApproved: false,
  certificateAvailable: false,
  image: "/images/results/bmw-f40-118i-7dct300-tcu-tuning.webp",
  ogImage: "/images/results/bmw-f40-118i-7dct300-tcu-tuning-og.webp"
};

const vwCaddy: ResultBase = {
  slug: "vw-caddy-20-tdi-2020-stage-1",
  vehicleMake: "Volkswagen",
  vehicleModel: "Caddy",
  vehicleEngine: "2.0 TDI",
  vehicleYear: "2020",
  stockPowerHp: 102,
  tunedPowerHp: 185,
  gainPowerHp: 83,
  category: "ecu-tuning",
  licensePlateVisible: false,
  licensePlateApproved: false,
  certificateAvailable: false,
  image: "/images/results/vw-caddy-20-tdi-2020-stage-1.webp",
  ogImage: "/images/results/vw-caddy-20-tdi-2020-stage-1-og.webp"
};

const vwTransporter: ResultBase = {
  slug: "vw-transporter-20-tdi-2013-ecu-cloning-stage-1",
  vehicleMake: "Volkswagen",
  vehicleModel: "Transporter",
  vehicleEngine: "2.0 TDI",
  vehicleYear: "2013",
  category: "ecu-cloning",
  licensePlateVisible: false,
  licensePlateApproved: false,
  certificateAvailable: false,
  image: "/images/results/vw-transporter-20-tdi-2013-ecu-cloning-stage-1.webp",
  ogImage: "/images/results/vw-transporter-20-tdi-2013-ecu-cloning-stage-1-og.webp"
};

export const customerResultsBatch202608: CustomerResult[] = [
  publishedResult(fordTransit, {
    locale: "nl",
    title: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 chiptuning",
    metaTitle: "Ford Transit Connect 1.5 EcoBlue Stage 1 | NoordTune resultaat",
    metaDescription: "Ford Transit Connect 1.5 EcoBlue Stage 1: 100 pk / 250 Nm naar 145 pk / 320 Nm met een voertuigspecifieke ECU-remap.",
    imageAlt: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 chiptuning resultaat bij NoordTune.nl",
    ecu: "Gecontroleerd tijdens service; niet publiek vermeld",
    serviceType: "Stage 1 / maatwerk ECU-remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "Deze Ford Transit Connect 1.5 EcoBlue kreeg bij NoordTune.nl een maatwerk Stage 1 ECU-remap, afgestemd op soepel dagelijks gebruik, betere trekkracht en meer rijplezier. De software is aangepast met aandacht voor turbodruk, brandstof, koppelopbouw en een directere gaspedaalrespons.",
    technicalNotes: [
      "Maatwerk ECU-remap / Stage 1",
      "Brandstof-, turbodruk- en koppelafstelling geoptimaliseerd",
      "Snellere gaspedaalrespons",
      "Meer trekkracht onderin en in het middengebied",
      "Soepelere vermogensopbouw",
      "Software-oplossing afgestemd op deze configuratie waar wettelijk toegestaan"
    ],
    disclaimer: "De genoemde waarden horen bij deze specifieke Ford Transit Connect. Resultaten kunnen verschillen per auto, softwareversie, onderhoudsstaat, brandstof, transmissie, hardware en gebruik. Systeemgerelateerde software-oplossingen worden uitsluitend beoordeeld waar wettelijk toegestaan en afhankelijk van voertuig, gebruik en regelgeving."
  }),
  publishedResult(fordTransit, {
    locale: "en",
    title: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 ECU remap",
    metaTitle: "Ford Transit Connect 1.5 EcoBlue Stage 1 | NoordTune result",
    metaDescription: "Ford Transit Connect 1.5 EcoBlue Stage 1: 100 hp / 250 Nm to 145 hp / 320 Nm with a vehicle-specific ECU remap.",
    imageAlt: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 ECU remap result at NoordTune.nl",
    ecu: "Verified during service; not publicly listed",
    serviceType: "Stage 1 / custom ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "This Ford Transit Connect 1.5 EcoBlue received a custom Stage 1 ECU remap at NoordTune.nl, calibrated for daily driving, stronger torque delivery and better response. The calibration focused on boost, fuel, torque delivery and smoother drivability.",
    technicalNotes: [
      "Custom ECU remap / Stage 1",
      "Fuel, boost and torque calibration optimized",
      "Sharper throttle response",
      "Stronger low and mid-range torque",
      "Smoother power delivery",
      "Software solution matched to this configuration where legally permitted"
    ],
    disclaimer: "The stated figures apply to this specific Ford Transit Connect. Results can vary with vehicle condition, software version, fuel, transmission, hardware and use. System-related software solutions are only considered where legally permitted and depend on the vehicle, its use and applicable regulations."
  }),
  publishedResult(fordTransit, {
    locale: "pl",
    title: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 — indywidualny remap ECU",
    metaTitle: "Ford Transit Connect 1.5 EcoBlue Stage 1 | Realizacja NoordTune",
    metaDescription: "Ford Transit Connect 1.5 EcoBlue Stage 1: ze 100 KM / 250 Nm do 145 KM / 320 Nm po indywidualnym remapie ECU.",
    imageAlt: "Ford Transit Connect 1.5 EcoBlue 2019 Stage 1 — wynik indywidualnego remapu ECU w NoordTune.nl",
    ecu: "Zweryfikowane podczas usługi; niepodawane publicznie",
    serviceType: "Stage 1 / indywidualny remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "Ten Ford Transit Connect 1.5 EcoBlue otrzymał w NoordTune.nl indywidualny Stage 1 ECU remap, przygotowany z myślą o codziennej jeździe, lepszej elastyczności i wyższym momencie obrotowym. Kalibracja została dopasowana do konkretnego auta, z naciskiem na płynne oddawanie mocy i lepszą reakcję na gaz.",
    technicalNotes: [
      "Indywidualny remap ECU / Stage 1",
      "Optymalizacja paliwa, doładowania i przebiegu momentu",
      "Lepsza reakcja na pedał gazu",
      "Większa elastyczność w dolnym i średnim zakresie",
      "Płynniejsze oddawanie mocy",
      "Rozwiązanie programowe dopasowane do tej konfiguracji, tam gdzie jest to prawnie dopuszczalne"
    ],
    disclaimer: "Podane wartości dotyczą tego konkretnego Forda Transit Connect. Wyniki mogą różnić się zależnie od stanu auta, wersji oprogramowania, paliwa, skrzyni biegów, osprzętu i sposobu użytkowania. Rozwiązania programowe związane z systemami pojazdu są rozpatrywane wyłącznie tam, gdzie jest to prawnie dopuszczalne, zależnie od auta, zastosowania i przepisów."
  }),

  publishedResult(toyotaProAce, {
    locale: "nl",
    title: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power",
    metaTitle: "Toyota ProAce Verso VIP Stage 1 Comfort Power | NoordTune",
    metaDescription: "Toyota ProAce Verso VIP 2.0D Stage 1 Comfort Power: 177 pk / 400 Nm naar 205 pk / 450 Nm, met DPF, EGR en AdBlue actief.",
    imageAlt: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power resultaat bij NoordTune.nl",
    ecu: "Gecontroleerd tijdens service; niet publiek vermeld",
    serviceType: "Stage 1 Comfort Power / maatwerk ECU-remap",
    stage: "Stage 1 Comfort Power",
    fuelType: "Diesel",
    shortDescription: "Deze Toyota ProAce Verso VIP 2.0D is gebouwd voor comfort, ruimte en lange afstanden. NoordTune.nl koos voor een nette Stage 1 Comfort Power-calibratie met focus op souplesse, meer koppel en een rustige vermogensopbouw, passend bij een luxe personenbus.",
    technicalNotes: [
      "Maatwerk ECU-remap / Stage 1 Comfort Power",
      "Meer koppel in het middengebied",
      "Betere acceleratie en inhaalvermogen",
      "Soepelere en comfortabelere rit",
      "DPF, EGR en AdBlue blijven actief",
      "Betrouwbare en nette setup voor dagelijks gebruik"
    ],
    disclaimer: "De genoemde waarden horen bij deze specifieke Toyota ProAce Verso VIP. Resultaten kunnen verschillen per auto, softwareversie, onderhoudsstaat, brandstof, transmissie, hardware en gebruik. De calibratie is uitgevoerd met de aanwezige DPF-, EGR- en AdBlue-systemen actief."
  }),
  publishedResult(toyotaProAce, {
    locale: "en",
    title: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power",
    metaTitle: "Toyota ProAce Verso VIP Stage 1 Comfort Power | NoordTune",
    metaDescription: "Toyota ProAce Verso VIP 2.0D Stage 1 Comfort Power: 177 hp / 400 Nm to 205 hp / 450 Nm, with DPF, EGR and AdBlue active.",
    imageAlt: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power result at NoordTune.nl",
    ecu: "Verified during service; not publicly listed",
    serviceType: "Stage 1 Comfort Power / custom ECU remap",
    stage: "Stage 1 Comfort Power",
    fuelType: "Diesel",
    shortDescription: "This Toyota ProAce Verso VIP 2.0D is built for comfort, space and long-distance driving. NoordTune.nl prepared a Stage 1 Comfort Power calibration focused on smoother torque delivery, better flexibility and relaxed drivability for a premium passenger van.",
    technicalNotes: [
      "Custom ECU remap / Stage 1 Comfort Power",
      "More mid-range torque",
      "Better acceleration and overtaking response",
      "Smoother and more comfortable drive",
      "DPF, EGR and AdBlue remain active",
      "Reliable setup for daily driving"
    ],
    disclaimer: "The stated figures apply to this specific Toyota ProAce Verso VIP. Results can vary with vehicle condition, software version, fuel, transmission, hardware and use. The calibration was completed with the existing DPF, EGR and AdBlue systems active."
  }),
  publishedResult(toyotaProAce, {
    locale: "pl",
    title: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power",
    metaTitle: "Toyota ProAce Verso VIP Stage 1 Comfort Power | NoordTune",
    metaDescription: "Toyota ProAce Verso VIP 2.0D Stage 1 Comfort Power: ze 177 KM / 400 Nm do 205 KM / 450 Nm, z aktywnymi systemami DPF, EGR i AdBlue.",
    imageAlt: "Toyota ProAce Verso VIP 2.0D 2023 Stage 1 Comfort Power — realizacja NoordTune.nl",
    ecu: "Zweryfikowane podczas usługi; niepodawane publicznie",
    serviceType: "Stage 1 Comfort Power / indywidualny remap ECU",
    stage: "Stage 1 Comfort Power",
    fuelType: "Diesel",
    shortDescription: "Toyota ProAce Verso VIP 2.0D to auto stworzone do komfortu, przestrzeni i dłuższych tras. W NoordTune.nl przygotowaliśmy spokojny Stage 1 Comfort Power, nastawiony na lepszą elastyczność, wyższy moment obrotowy i płynne oddawanie mocy, bez przesadnie agresywnej konfiguracji.",
    technicalNotes: [
      "Indywidualny remap ECU / Stage 1 Comfort Power",
      "Większy moment w średnim zakresie",
      "Lepsza reakcja przy przyspieszaniu i wyprzedzaniu",
      "Płynniejsza i bardziej komfortowa jazda",
      "DPF, EGR i AdBlue pozostają aktywne",
      "Bezpieczna konfiguracja do codziennego użytku"
    ],
    disclaimer: "Podane wartości dotyczą tej konkretnej Toyoty ProAce Verso VIP. Wyniki mogą różnić się zależnie od stanu auta, wersji oprogramowania, paliwa, skrzyni biegów, osprzętu i sposobu użytkowania. Kalibrację wykonano z aktywnymi systemami DPF, EGR i AdBlue."
  }),

  publishedResult(bmwF40, {
    locale: "nl",
    title: "BMW F40 118i 7DCT300 TCU tuning",
    metaTitle: "BMW F40 118i 7DCT300 TCU tuning | NoordTune klantresultaat",
    metaDescription: "BMW F40 118i met GETRAG 7DCT300: TCU uitgelezen via interne flash en voertuigspecifiek afgestemd op een Stage 1 motorupdate.",
    imageAlt: "BMW F40 118i 7DCT300 TCU tuning resultaat bij NoordTune.nl",
    transmission: "GETRAG 7DCT300",
    tcu: "GETRAG 7DCT300",
    serviceType: "TCU tuning / transmissiekalibratie",
    stage: "TCU tuning",
    fuelType: "Benzine",
    shortDescription: "Voor deze BMW F40 118i hebben wij de GETRAG 7DCT300 transmissiecomputer uitgelezen en geoptimaliseerd. De calibratie is afgestemd op een Stage 1 motorupdate, met behoud van belangrijke beveiligingen en focus op soepelere, snellere en beter voorspelbare schakelreacties.",
    resultMetrics: [
      {label: "TCU", value: "7DCT300"},
      {label: "Uitleesmethode", value: "Interne flash"},
      {label: "Koppelcontext", value: "ca. 300 Nm", accent: true}
    ],
    technicalNotes: [
      "7DCT300 TCU uitgelezen via interne flash",
      "Bench mode met HEXPROG II",
      "Koppellimieten afgestemd op ongeveer 300 Nm",
      "Snellere en soepelere schakelovergangen",
      "Aangepaste koppelonderbreking",
      "D- en S-modus verfijnd",
      "Originele software en coding intact",
      "Veiligheidslimieten en bescherming behouden",
      "Softwareversie: 1695D07_300BM_BE540Z0_PR_BC1__20211007_102728",
      "Motorcontext: Stage 1 rond 190–195 pk / 290–300 Nm; dit zijn contextwaarden en geen afzonderlijk gemeten TCU-resultaat"
    ],
    disclaimer: "Dit is een transmissiekalibratie voor deze specifieke BMW F40 118i en GETRAG 7DCT300. De genoemde motor- en koppelcontext is geen zelfstandig vermogensresultaat. Geschiktheid en instellingen hangen af van softwareversie, transmissiestaat, motorcalibratie, gebruik en onderhoud."
  }),
  publishedResult(bmwF40, {
    locale: "en",
    title: "BMW F40 118i 7DCT300 TCU tuning",
    metaTitle: "BMW F40 118i 7DCT300 TCU tuning | NoordTune customer result",
    metaDescription: "BMW F40 118i with GETRAG 7DCT300: TCU read through internal flash and calibrated for a Stage 1 engine setup.",
    imageAlt: "BMW F40 118i 7DCT300 TCU tuning result at NoordTune.nl",
    transmission: "GETRAG 7DCT300",
    tcu: "GETRAG 7DCT300",
    serviceType: "TCU tuning / gearbox calibration",
    stage: "TCU tuning",
    fuelType: "Petrol",
    shortDescription: "For this BMW F40 118i, the GETRAG 7DCT300 transmission control unit was read and optimized. The calibration was matched to a Stage 1 engine setup, while keeping key safety strategies and focusing on smoother, faster and more predictable shift behavior.",
    resultMetrics: [
      {label: "TCU", value: "7DCT300"},
      {label: "Read method", value: "Internal flash"},
      {label: "Torque context", value: "approx. 300 Nm", accent: true}
    ],
    technicalNotes: [
      "7DCT300 TCU read via internal flash",
      "Bench mode with HEXPROG II",
      "Torque limits adjusted around 300 Nm",
      "Faster and smoother gear changes",
      "Refined torque intervention",
      "D and S mode optimized",
      "Original coding and software structure kept intact",
      "Safety limits and protection retained",
      "Software version: 1695D07_300BM_BE540Z0_PR_BC1__20211007_102728",
      "Engine context: Stage 1 around 190–195 hp / 290–300 Nm; these are context figures, not a separately measured TCU result"
    ],
    disclaimer: "This is a transmission calibration for this specific BMW F40 118i and GETRAG 7DCT300. The engine and torque context is not a standalone power result. Suitability and settings depend on software version, gearbox condition, engine calibration, use and maintenance."
  }),
  publishedResult(bmwF40, {
    locale: "pl",
    title: "BMW F40 118i 7DCT300 — tuning TCU skrzyni biegów",
    metaTitle: "BMW F40 118i 7DCT300 — tuning TCU | Realizacja NoordTune",
    metaDescription: "BMW F40 118i z GETRAG 7DCT300: odczyt TCU przez internal flash i kalibracja dopasowana do Stage 1 silnika.",
    imageAlt: "BMW F40 118i 7DCT300 — wynik tuningu TCU skrzyni biegów w NoordTune.nl",
    transmission: "GETRAG 7DCT300",
    tcu: "GETRAG 7DCT300",
    serviceType: "Tuning TCU / kalibracja skrzyni",
    stage: "Tuning TCU",
    fuelType: "Benzyna",
    shortDescription: "W tym BMW F40 118i wykonaliśmy odczyt i optymalizację sterownika skrzyni GETRAG 7DCT300. Kalibracja została przygotowana pod Stage 1 silnika, z zachowaniem najważniejszych zabezpieczeń i naciskiem na płynniejsze, szybsze oraz bardziej przewidywalne zmiany biegów.",
    resultMetrics: [
      {label: "TCU", value: "7DCT300"},
      {label: "Metoda odczytu", value: "Internal flash"},
      {label: "Kontekst momentu", value: "około 300 Nm", accent: true}
    ],
    technicalNotes: [
      "Odczyt TCU 7DCT300 przez internal flash",
      "Bench mode z użyciem HEXPROG II",
      "Limity momentu dopasowane w okolice 300 Nm",
      "Szybsze i płynniejsze zmiany biegów",
      "Dopasowana redukcja momentu podczas zmiany",
      "Usprawniony tryb D i S",
      "Oryginalne kodowanie i struktura oprogramowania zachowane",
      "Zabezpieczenia skrzyni pozostawione aktywne",
      "Wersja oprogramowania: 1695D07_300BM_BE540Z0_PR_BC1__20211007_102728",
      "Kontekst silnika: Stage 1 około 190–195 KM / 290–300 Nm; są to wartości kontekstowe, a nie osobno zmierzony wynik TCU"
    ],
    disclaimer: "To kalibracja skrzyni dla tego konkretnego BMW F40 118i i GETRAG 7DCT300. Podany kontekst mocy i momentu nie jest osobnym wynikiem pomiaru. Dobór ustawień zależy od wersji oprogramowania, stanu skrzyni, kalibracji silnika, sposobu użytkowania i serwisu."
  }),

  publishedResult(vwCaddy, {
    locale: "nl",
    title: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 chiptuning",
    metaTitle: "Volkswagen Caddy 2.0 TDI Stage 1 | NoordTune resultaat",
    metaDescription: "Volkswagen Caddy 2.0 TDI 2020 Stage 1: van 102 pk naar 185 pk. Het koppel is niet publiek vermeld en wordt niet geschat.",
    imageAlt: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 chiptuning resultaat bij NoordTune.nl",
    ecu: "Gecontroleerd tijdens service; niet publiek vermeld",
    serviceType: "Stage 1 / maatwerk ECU-remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "Deze Volkswagen Caddy 2.0 TDI kwam binnen met 102 pk en kreeg bij NoordTune.nl een maatwerk software-optimalisatie. Het resultaat is een duidelijk sterkere Caddy met betere respons, meer trekkracht en een heel ander rijgevoel in dagelijks gebruik.",
    technicalNotes: [
      "Maatwerk ECU-remap / Stage 1",
      "Vermogensoptimalisatie van 102 pk naar 185 pk",
      "Betere respons",
      "Meer trekkracht",
      "Koppelwaarden zijn niet publiek vermeld en worden niet geschat",
      "Software-oplossing voor deze configuratie waar wettelijk toegestaan",
      "Nette en praktische setup voor dagelijks gebruik"
    ],
    disclaimer: "De genoemde vermogenswaarden horen bij deze specifieke Volkswagen Caddy. Koppelwaarden zijn niet aangeleverd en daarom niet ingevuld. Resultaten kunnen verschillen per auto, softwareversie, onderhoudsstaat, brandstof, transmissie, hardware en gebruik. Systeemgerelateerde software-oplossingen worden uitsluitend beoordeeld waar wettelijk toegestaan."
  }),
  publishedResult(vwCaddy, {
    locale: "en",
    title: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 ECU remap",
    metaTitle: "Volkswagen Caddy 2.0 TDI Stage 1 | NoordTune result",
    metaDescription: "Volkswagen Caddy 2.0 TDI 2020 Stage 1: from 102 hp to 185 hp. Torque figures are not publicly listed and are not estimated.",
    imageAlt: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 ECU remap result at NoordTune.nl",
    ecu: "Verified during service; not publicly listed",
    serviceType: "Stage 1 / custom ECU remap",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "This Volkswagen Caddy 2.0 TDI arrived with 102 hp and received a custom software optimization at NoordTune.nl. The result is a much stronger Caddy with better response, more usable pull and a completely different driving feel for daily use.",
    technicalNotes: [
      "Custom ECU remap / Stage 1",
      "Power optimization from 102 hp to 185 hp",
      "Better response",
      "Stronger pull",
      "Torque figures are not publicly listed and are not estimated",
      "Software solution for this configuration where legally permitted",
      "Practical setup for daily driving"
    ],
    disclaimer: "The stated power figures apply to this specific Volkswagen Caddy. Torque figures were not supplied and have therefore not been added. Results can vary with vehicle condition, software version, fuel, transmission, hardware and use. System-related software solutions are only considered where legally permitted."
  }),
  publishedResult(vwCaddy, {
    locale: "pl",
    title: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 — indywidualny remap ECU",
    metaTitle: "Volkswagen Caddy 2.0 TDI Stage 1 | Realizacja NoordTune",
    metaDescription: "Volkswagen Caddy 2.0 TDI 2020 Stage 1: ze 102 KM do 185 KM. Wartości momentu nie podano publicznie i nie są szacowane.",
    imageAlt: "Volkswagen Caddy 2.0 TDI 2020 Stage 1 — wynik indywidualnego remapu ECU w NoordTune.nl",
    ecu: "Zweryfikowane podczas usługi; niepodawane publicznie",
    serviceType: "Stage 1 / indywidualny remap ECU",
    stage: "Stage 1",
    fuelType: "Diesel",
    shortDescription: "Ten Volkswagen Caddy 2.0 TDI przyjechał do NoordTune.nl w wersji 102 KM i otrzymał indywidualną optymalizację oprogramowania. Efekt to znacznie mocniejsza reakcja na gaz, lepsza elastyczność i dużo przyjemniejsze odczucie z jazdy na co dzień.",
    technicalNotes: [
      "Indywidualny remap ECU / Stage 1",
      "Optymalizacja mocy ze 102 KM do 185 KM",
      "Lepsza reakcja na gaz",
      "Większa elastyczność",
      "Wartości momentu nie podano publicznie i nie są szacowane",
      "Rozwiązanie programowe dla tej konfiguracji, tam gdzie jest to prawnie dopuszczalne",
      "Praktyczna konfiguracja do codziennej jazdy"
    ],
    disclaimer: "Podane wartości mocy dotyczą tego konkretnego Volkswagena Caddy. Wartości momentu nie zostały dostarczone, dlatego ich nie uzupełniamy. Wyniki mogą różnić się zależnie od stanu auta, wersji oprogramowania, paliwa, skrzyni biegów, osprzętu i sposobu użytkowania. Rozwiązania związane z systemami pojazdu są rozpatrywane wyłącznie tam, gdzie jest to prawnie dopuszczalne."
  }),

  publishedResult(vwTransporter, {
    locale: "nl",
    title: "Volkswagen Transporter 2.0 TDI 2013 ECU cloning & Stage 1",
    metaTitle: "Volkswagen Transporter ECU cloning & Stage 1 | NoordTune",
    metaDescription: "Volkswagen Transporter 2.0 TDI met beschadigde ECU: voertuigdata veilig overgezet naar een vervangende regelunit en Stage 1 voorbereid.",
    imageAlt: "Volkswagen Transporter 2.0 TDI 2013 ECU cloning en Stage 1 resultaat bij NoordTune.nl",
    ecu: "Gecontroleerd tijdens service; niet publiek vermeld",
    serviceType: "ECU cloning + software-optimalisatie",
    stage: "ECU cloning + Stage 1",
    fuelType: "Diesel",
    shortDescription: "Bij deze Volkswagen Transporter 2.0 TDI was de originele ECU beschadigd. NoordTune.nl heeft de beschikbare data veilig uitgelezen, correct overgezet naar een vervangende regelunit en de softwareoplossing voorbereid voor montage en gebruik.",
    resultMetrics: [
      {label: "Originele ECU", value: "Beschadigd"},
      {label: "Resultaat", value: "Data veilig gekloond"},
      {label: "Software", value: "Stage 1", accent: true}
    ],
    technicalNotes: [
      "Defecte ECU professioneel gekloond",
      "Originele voertuigdata veilig overgezet",
      "Vervangende regelunit voorbereid",
      "Stage 1 software-optimalisatie",
      "Software-oplossing voor deze configuratie waar wettelijk toegestaan",
      "Klaar voor montage en gebruik",
      "Vermogens- en koppelwaarden zijn niet aangeleverd en worden niet geschat"
    ],
    disclaimer: "Deze case beschrijft ECU cloning en een voertuigspecifieke software-optimalisatie voor deze Volkswagen Transporter. Vermogens- en koppelwaarden zijn niet aangeleverd. Systeemgerelateerde software-oplossingen worden uitsluitend beoordeeld waar wettelijk toegestaan en afhankelijk van voertuig, gebruik en regelgeving."
  }),
  publishedResult(vwTransporter, {
    locale: "en",
    title: "Volkswagen Transporter 2.0 TDI 2013 ECU cloning & Stage 1",
    metaTitle: "Volkswagen Transporter ECU cloning & Stage 1 | NoordTune",
    metaDescription: "Volkswagen Transporter 2.0 TDI with a damaged ECU: vehicle data safely transferred to a replacement control unit and Stage 1 prepared.",
    imageAlt: "Volkswagen Transporter 2.0 TDI 2013 ECU cloning and Stage 1 result at NoordTune.nl",
    ecu: "Verified during service; not publicly listed",
    serviceType: "ECU cloning + software optimization",
    stage: "ECU cloning + Stage 1",
    fuelType: "Diesel",
    shortDescription: "This Volkswagen Transporter 2.0 TDI had a damaged original ECU. NoordTune.nl safely read the available data, transferred it to a replacement control unit and prepared the software solution for installation and use.",
    resultMetrics: [
      {label: "Original ECU", value: "Damaged"},
      {label: "Result", value: "Data safely cloned"},
      {label: "Software", value: "Stage 1", accent: true}
    ],
    technicalNotes: [
      "Damaged ECU professionally cloned",
      "Original vehicle data safely transferred",
      "Replacement control unit prepared",
      "Stage 1 software optimization",
      "Software solution for this configuration where legally permitted",
      "Ready for installation and use",
      "Power and torque figures were not supplied and are not estimated"
    ],
    disclaimer: "This case describes ECU cloning and vehicle-specific software optimization for this Volkswagen Transporter. Power and torque figures were not supplied. System-related software solutions are only considered where legally permitted and depend on the vehicle, its use and applicable regulations."
  }),
  publishedResult(vwTransporter, {
    locale: "pl",
    title: "Volkswagen Transporter 2.0 TDI 2013 — klonowanie ECU i Stage 1",
    metaTitle: "Volkswagen Transporter — klonowanie ECU i Stage 1 | NoordTune",
    metaDescription: "Volkswagen Transporter 2.0 TDI z uszkodzonym ECU: bezpieczne przeniesienie danych do sterownika zastępczego i przygotowanie Stage 1.",
    imageAlt: "Volkswagen Transporter 2.0 TDI 2013 — klonowanie ECU i Stage 1 w NoordTune.nl",
    ecu: "Zweryfikowane podczas usługi; niepodawane publicznie",
    serviceType: "Klonowanie ECU + optymalizacja oprogramowania",
    stage: "Klonowanie ECU + Stage 1",
    fuelType: "Diesel",
    shortDescription: "W tym Volkswagenie Transporterze 2.0 TDI oryginalny sterownik ECU był uszkodzony. W NoordTune.nl bezpiecznie odczytaliśmy dostępne dane, przenieśliśmy je do sprawnego sterownika zastępczego i przygotowaliśmy kompletne rozwiązanie programowe do montażu i dalszego użytkowania.",
    resultMetrics: [
      {label: "Oryginalne ECU", value: "Uszkodzone"},
      {label: "Rezultat", value: "Dane bezpiecznie sklonowane"},
      {label: "Oprogramowanie", value: "Stage 1", accent: true}
    ],
    technicalNotes: [
      "Profesjonalne sklonowanie uszkodzonego ECU",
      "Bezpieczne przeniesienie oryginalnych danych pojazdu",
      "Przygotowanie sterownika zastępczego",
      "Optymalizacja oprogramowania Stage 1",
      "Rozwiązanie programowe dla tej konfiguracji, tam gdzie jest to prawnie dopuszczalne",
      "Gotowe do montażu i użytkowania",
      "Wartości mocy i momentu nie zostały dostarczone i nie są szacowane"
    ],
    disclaimer: "Ta realizacja opisuje klonowanie ECU i indywidualną optymalizację oprogramowania dla tego Volkswagena Transportera. Wartości mocy i momentu nie zostały dostarczone. Rozwiązania związane z systemami pojazdu są rozpatrywane wyłącznie tam, gdzie jest to prawnie dopuszczalne, zależnie od auta, zastosowania i przepisów."
  })
];
