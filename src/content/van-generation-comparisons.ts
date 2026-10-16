/**
 * Links to the nine explicitly reviewed, published Dutch commercial-van
 * comparison pages on Power Catalog (PR #73). No generated URLs from raw
 * RDW vehicles, no stage estimates and no thin WWW duplicate SEO pages.
 */
export const vanComparisonIndexUrl="https://power.noordtune.nl/nl/bedrijfswagens/vergelijken" as const;

export const vanGenerationComparisons=[
 {slug:"mercedes-sprinter-313-317-cdi",make:"Mercedes-Benz",model:"Sprinter",
  title:"Sprinter 313–317 CDI",detail:"2.1 en 2.0 CDI: vergelijk originele kW, bouwfase en ECU.",kind:"Grote werkbus"},
 {slug:"mercedes-vito-114-119-cdi",make:"Mercedes-Benz",model:"Vito",
  title:"Vito 114–119 CDI",detail:"2020, 2023 en Euro 6e 2024: motorsoftware en transmissie.",kind:"Servicebus"},
 {slug:"volkswagen-transporter-t5-t6-t61",make:"Volkswagen",model:"Transporter",
  title:"Transporter T5 / T6 / T6.1",detail:"2.0 TDI en BiTDI: onderscheid generaties en fabrieks-kW.",kind:"Bedrijfsbus"},
 {slug:"ford-transit-custom-22-tdci-20-ecoblue",make:"Ford",model:"Transit Custom",
  title:"Transit Custom TDCi / EcoBlue",detail:"2.2 tegenover 2.0 diesel, ECU, DPF en werklast.",kind:"Servicebus"},
 {slug:"ford-transit-ecoblue-130-165-170",make:"Ford",model:"Transit",
  title:"Transit EcoBlue 130–170",detail:"Oorspronkelijke 130, 165 en 170 pk; verschillende RDW-jaren.",kind:"Grote werkbus"},
 {slug:"volkswagen-crafter-20-tdi-102-140",make:"Volkswagen",model:"Crafter",
  title:"Crafter 2.0 TDI 102 / 140",detail:"Euro 6 en Euro 6d: type, ECU en fabrieksafstelling.",kind:"Grote werkbus"},
 {slug:"toyota-proace-15-20-d4d",make:"Toyota",model:"Proace",
  title:"Proace 1.5 / 2.0 D-4D",detail:"100 tot 177 pk: gescheiden RDW- en dieselmotorprofielen.",kind:"Bedrijfsbus"},
 {slug:"peugeot-boxer-20-22-bluehdi",make:"Peugeot",model:"Boxer",
  title:"Boxer 2.0 / 2.2 BlueHDi",detail:"120 tot 165 pk: controleer cc, bouwjaar en emissiefase.",kind:"Grote werkbus"},
 {slug:"fiat-ducato-23-multijet-euro6",make:"Fiat",model:"Ducato",
  title:"Ducato 2.3 MultiJet",detail:"120/130 pk: Euro 6-bouwfases, ECU en camperbelasting.",kind:"Grote werkbus"}
] as const;

export type VanGenerationComparison=typeof vanGenerationComparisons[number];
export function vanComparisonUrl(item:VanGenerationComparison){
 return `${vanComparisonIndexUrl}/${item.slug}` as const;
}
