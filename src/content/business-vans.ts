import {site} from './site';
import {priceLabel} from './pricing';
export const businessVansPath='/nl/bedrijfswagens';
export const businessVansUrl=site.url+businessVansPath;
export const berlingoCaseSlug='citroen-berlingo-15-bluehdi-onderhoud-ecu';
export const berlingoCasePath='/nl/resultaten/'+berlingoCaseSlug;
export const businessVanModels=[
 {name:'Ford Transit',slug:'ford-transit',detail:'Transit, Custom en Connect: controle per motor en transmissie.'},
 {name:'Volkswagen Transporter',slug:'volkswagen-transporter',detail:'T5, T6 en T6.1 niet op één hoop: originele kW en generatie tellen.'},
 {name:'Mercedes-Benz Sprinter',slug:'mercedes-sprinter',detail:'Bestelbus of chassis: motorvariant, belading en versnellingsbak bepalen de aanpak.'},
 {name:'Citroën Berlingo',slug:'citroen-berlingo',detail:'HDi en BlueHDi apart beoordeeld, van fabrieksgegevens naar advies.'},
 {name:'Toyota Proace',slug:'toyota-proace',detail:'Toyota-specifieke motorbronnen; Proace City blijft een aparte versie.'},
 {name:'Iveco Daily',slug:'iveco-daily',detail:'2.3 en 3.0, Euro-fase en Hi-Matic of handbak individueel controleren.'}
] as const;
export const businessVanFaq=[
 {question:'Wat kost chiptuning van mijn bedrijfswagen?',answer:`Stage 1 start bij ${priceLabel('stage1-standard')} inclusief btw, gelijk aan de Power Catalog. De prijsgroepen Standard, Advanced en Modern starten bij ${priceLabel('stage1-standard')}, ${priceLabel('stage1-advanced')} en ${priceLabel('stage1-modern')}. Dit zijn vanaf-prijzen, geen maximumprijzen. De definitieve offerte hangt af van motor, ECU-toegang, softwareversie, transmissie en eventuele extra diagnose of werkzaamheden. We bevestigen het totaal vóór uitvoering.`},
 {question:'Kan ik ook meerdere bedrijfswagens aanmelden?',answer:'Ja. Geef het aantal voertuigen, de motorvarianten, je gebruik en gewenste planning door. We beoordelen ieder voertuig afzonderlijk en bespreken hoe het werk past bij jouw bedrijfsvoering. Een vaste vlootkorting, vervangend vervoer of gegarandeerde doorlooptijd wordt niet vooraf beloofd.'},
 {question:'Krijgt een zwaar beladen bus dezelfde afstelling als een personenauto?',answer:'Niet automatisch. Aanhangergebruik, belading, koeling, staat van koppeling of automaat en onderhoud bepalen welke aanpak verantwoord is. Een hoog extern cataloguscijfer is geen aanbevolen permanent koppel. Het toegestane laad- en trekgewicht verandert niet door chiptuning.'},
 {question:'Wat gebeurt er als mijn motor nog geen Stage 1-cijfer in de catalogus heeft?',answer:'Je kunt gewoon advies aanvragen. We bekijken eerst de motoridentiteit en ECU-software. Een ontbrekende bronvermelde waarde betekent niet dat tuning onmogelijk is, maar ook niet dat een vergelijkbare motor automatisch hetzelfde resultaat krijgt.'},
 {question:'Kunnen jullie een AdBlue-, DPF- of EGR-storing onderzoeken?',answer:'We bespreken diagnose en hersteladvies op basis van de storing en technische toestand. Voor gebruik op de openbare weg horen de voorgeschreven emissiesystemen te functioneren. Deze bedrijfswagenofferte biedt geen uitschakeling van SCR/AdBlue, DPF of EGR aan.'},
 {question:'Waar vind ik informatie over mijn motor en eerdere projecten?',answer:'In de Power Catalog vind je fabrieksgegevens en beschikbare Stage 1-indicaties per motorvariant. Onze werkplaatsprojecten laten zien welke werkzaamheden we bij specifieke voertuigen hebben uitgevoerd. Voor jouw bedrijfswagen bespreken we de passende aanpak en prijs persoonlijk.'}
];
