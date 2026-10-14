/**
 * Explicit NL-only links to already published, independently reviewed
 * NoordTune Power Catalog routes. These are not new SEO pages or tuning claims.
 * Every route is validated against the live catalog in the release QA.
 */
import type {BrandKey} from "./brand-pages";

export type CatalogTopic = Readonly<{
  title: string;
  detail: string;
  kind: "Modelvergelijking" | "Motorprofiel" | "Bedrijfswagen";
  path: `/nl/${string}`;
}>;

export const catalogTopics = {
  bmwF30: {title:"BMW 320i F30/F31",detail:"N20 of B48: twee motorfamilies vergelijken",kind:"Modelvergelijking",path:"/nl/modellen/bmw-320i-f30-f31"},
  bmwG20: {title:"BMW 320i G20 B48",detail:"Originele 135 kW, ECU en Stage 1-bronnen",kind:"Motorprofiel",path:"/nl/motoren/bmw-320i-g20-g21-b48-184"},
  bmw320d: {title:"BMW 320d B47",detail:"Een specifieke dieselgeneratie en werkplaatscheck",kind:"Motorprofiel",path:"/nl/vehicles/bmw-320d-b47"},
  audiA1: {title:"Audi A1 8X",detail:"1.0, 1.2 en 1.4 TFSI naast elkaar",kind:"Modelvergelijking",path:"/nl/modellen/audi-a1-8x"},
  audiA3: {title:"Audi A3 8P 1.4 TFSI",detail:"125 pk en de juiste EA111-generatie",kind:"Motorprofiel",path:"/nl/motoren/audi-a3-8p-14-tfsi-125"},
  audiA4: {title:"Audi A4 B9 2.0 TDI",detail:"Geselecteerd dieselprofiel met technische uitleg",kind:"Motorprofiel",path:"/nl/vehicles/audi-a4-b9-20-tdi-190"},
  vwGolf: {title:"Volkswagen Golf 7",detail:"1.0 TSI en GTI Performance vergelijken",kind:"Modelvergelijking",path:"/nl/modellen/volkswagen-golf-7"},
  vwPolo: {title:"Volkswagen Polo 6R/AW",detail:"1.2 TSI tegenover 1.0 TSI 95 en 115",kind:"Modelvergelijking",path:"/nl/modellen/volkswagen-polo-6r-aw"},
  vwCaddy: {title:"Volkswagen Caddy 2.0 TDI",detail:"Verschillende vermogens en generaties",kind:"Modelvergelijking",path:"/nl/modellen/volkswagen-caddy-20-tdi"},
  vwTransporter: {title:"Volkswagen Transporter",detail:"T5, T6 en T6.1 met afzonderlijke motoren",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/volkswagen-transporter"},
  vwTransporterT61: {title:"Transporter T6.1 2.0 TDI 150",detail:"Gecontroleerde 2020–2021 uitvoering",kind:"Motorprofiel",path:"/nl/bedrijfswagens/motoren/volkswagen-transporter-t61-20-tdi-150-2020-21"},
  fordFiesta: {title:"Ford Fiesta 1.0 EcoBoost",detail:"JA8 en JHH: beide 100 pk, andere bouwfase",kind:"Modelvergelijking",path:"/nl/modellen/ford-fiesta-ja8-jhh"},
  fordTransitConnect: {title:"Ford Transit Connect",detail:"1.5 TDCi en EcoBlue per uitvoering",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/ford-transit-connect"},
  fordTransitCustom: {title:"Ford Transit Custom",detail:"2.2 TDCi of 2.0 EcoBlue: zoek de juiste bus",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/ford-transit-custom"},
  fordEcoBlue: {title:"Transit Custom 2.0 EcoBlue 130",detail:"Geselecteerde ECU- en RDW-variant",kind:"Motorprofiel",path:"/nl/bedrijfswagens/motoren/ford-transit-custom-20-ecoblue-130"},
  toyotaProace: {title:"Toyota Proace",detail:"Toyota-specifieke D-4D varianten en bronnen",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/toyota-proace"},
  toyotaProaceCity: {title:"Toyota Proace City",detail:"Compacte bedrijfswagen met eigen motorprofielen",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/toyota-proace-city"},
  toyotaProace177: {title:"Toyota Proace 2.0 D-4D 177",detail:"De 2020–2024 2.0-diesel afzonderlijk bekeken",kind:"Motorprofiel",path:"/nl/bedrijfswagens/motoren/toyota-proace-20-d4d-177-2020-24"},
  peugeot308: {title:"Peugeot 308 II/III PureTech",detail:"110 en 130 pk: generatie en ECU bepalen de keuze",kind:"Modelvergelijking",path:"/nl/modellen/peugeot-308-ii-iii"},
  renaultClio: {title:"Renault Clio V 1.0 TCe",detail:"90 en 100 pk, inclusief de facelift",kind:"Modelvergelijking",path:"/nl/modellen/renault-clio-v-tce"},
  mercedesSprinter: {title:"Mercedes-Benz Sprinter",detail:"Bedrijfswagen, motorvermogen en ECU-fase",kind:"Bedrijfswagen",path:"/nl/bedrijfswagens/mercedes-sprinter"},
  nissanJuke: {title:"Nissan Juke F16 1.0 DIG-T",detail:"114 tegenover 117 pk: afzonderlijke motoren",kind:"Modelvergelijking",path:"/nl/modellen/nissan-juke-f16"}
} as const satisfies Record<string,CatalogTopic>;

export type CatalogTopicKey=keyof typeof catalogTopics;
const overviewKeys:readonly CatalogTopicKey[]=[
  "bmwF30","audiA1","vwGolf","fordFiesta","peugeot308","renaultClio",
  "vwTransporter","fordTransitCustom","toyotaProace"
];
const brandKeys:Record<BrandKey,readonly CatalogTopicKey[]>={
  bmw:["bmwF30","bmwG20","bmw320d"],
  audi:["audiA1","audiA3","audiA4"],
  volkswagen:["vwGolf","vwPolo","vwCaddy","vwTransporter","vwTransporterT61"],
  ford:["fordFiesta","fordTransitConnect","fordTransitCustom","fordEcoBlue"],
  toyota:["toyotaProace","toyotaProaceCity","toyotaProace177"]
};

export function catalogDiscoveryTopics(brand?:BrandKey):readonly CatalogTopic[]{
 const keys=brand?brandKeys[brand]:overviewKeys;
 return keys.map(id=>catalogTopics[id]);
}
export function catalogTopicUrl(topic:CatalogTopic):string{
 return `https://power.noordtune.nl${topic.path}`;
}
