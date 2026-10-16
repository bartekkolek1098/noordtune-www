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

/**
 * Twelve further independently authored technical comparisons already
 * published by catalog PR #74. Rendered as compact links to keep the
 * commercial quote page readable on a phone.
 */
export const vanAdditionalComparisons=[
 {slug:"iveco-daily-23-30-euro6-euro6df",make:"Iveco",model:"Daily",
  title:"Daily 2.3 / 3.0 Euro 6 / Euro 6Df",detail:"136, 156, 160 en 180 pk; RDW-kW, chassis en ECU.",kind:"Grote werkbus"},
 {slug:"renault-master-23-dci-blue-dci",make:"Renault",model:"Master",
  title:"Master 2.3 dCi / Blue dCi",detail:"110 tot 145 pk met afzonderlijke 2019/2022 RDW-registraties.",kind:"Grote werkbus"},
 {slug:"peugeot-expert-20-bluehdi-120-180",make:"Peugeot",model:"Expert",
  title:"Expert 2.0 BlueHDi 120–180",detail:"120, 145, 177 en 180 pk; motorcode, ECU en toelating.",kind:"Bedrijfsbus"},
 {slug:"toyota-proace-city-15-d4d-75-130",make:"Toyota",model:"Proace City",
  title:"Proace City 1.5 D-4D 75–130",detail:"75, 100 en 130 pk; aparte softwarefase in 2024.",kind:"Servicebus"},
 {slug:"opel-vivaro-b-16-cdti-biturbo",make:"Opel",model:"Vivaro B",
  title:"Vivaro B CDTI / BiTurbo",detail:"1.6 diesel 95–145; onderscheid BiTurbo en originele kW.",kind:"Servicebus"},
 {slug:"opel-movano-b-c-23-cdti-22-diesel",make:"Opel",model:"Movano",
  title:"Movano B 2.3 / C 2.2 diesel",detail:"Oude 2.3 CDTI tegenover nieuwe 2.2; andere ECU-generaties.",kind:"Grote werkbus"},
 {slug:"citroen-jumpy-15-20-bluehdi",make:"Citroën",model:"Jumpy",
  title:"Jumpy 1.5 / 2.0 BlueHDi",detail:"100–177 pk; gescheiden dieselinhouden en emissiefases.",kind:"Bedrijfsbus"},
 {slug:"citroen-berlingo-ii-iii-hdi-bluehdi",make:"Citroën",model:"Berlingo",
  title:"Berlingo II HDi / III BlueHDi",detail:"Oude 1.6 HDi tegenover 1.5 BlueHDi; RDW-type en kW.",kind:"Servicebus"},
 {slug:"peugeot-partner-ii-iii-hdi-bluehdi",make:"Peugeot",model:"Partner",
  title:"Partner II / III HDi en BlueHDi",detail:"75, 100 en 130; meerdere 1.5-softwarecohorten.",kind:"Servicebus"},
 {slug:"fiat-doblo-16-multijet-100-120",make:"Fiat",model:"Doblò",
  title:"Doblò 1.6 MultiJet 100–120",detail:"100, 105 en 120; onderscheid originele kW en bouwfase.",kind:"Servicebus"},
 {slug:"opel-combo-e-15-diesel-75-130",make:"Opel",model:"Combo E",
  title:"Combo E 1.5 diesel 75–130",detail:"75, 102 en 130 pk; controle per originele RDW-kW.",kind:"Servicebus"},
 {slug:"renault-kangoo-15-dci-75-110",make:"Renault",model:"Kangoo II",
  title:"Kangoo II 1.5 dCi 75–110",detail:"75, 90 en 110; afzonderlijke bronjaren voor dCi 90.",kind:"Servicebus"}
] as const;

export const allVanGenerationComparisons=[
 ...vanGenerationComparisons,
 ...vanAdditionalComparisons
] as const;

export type VanGenerationComparison=typeof allVanGenerationComparisons[number];
export function vanComparisonUrl(item:VanGenerationComparison){
 return `${vanComparisonIndexUrl}/${item.slug}` as const;
}
