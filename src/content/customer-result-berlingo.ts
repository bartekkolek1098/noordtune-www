import type {CustomerResult} from './customer-results';
import type {Locale} from './site';
import {berlingoCaseSlug} from './business-vans';

/** Editorial workshop story. Numerical calibration targets remain in the service dossier, not the public case. */
const text = {
 nl: {
  title:'Citroën Berlingo 1.5 BlueHDi: onderhoud en ECU',
  meta:'Bekijk deze Berlingo-realisatie bij NoordTune in Assen: distributieriem, waterpomp, onderhoud en Bosch MD1CS003 ECU-werk, met originele werkplaatsfoto’s.',
  summary:'Van mechanisch onderhoud tot werk aan de motorcomputer. Bij deze Citroën Berlingo combineerden we de distributieservice met onderhoud en werkzaamheden aan de Bosch MD1CS003 ECU. Bekijk de aanpak en de foto’s uit onze werkplaats.',
  service:'Onderhoud en ECU-kalibratie',
  alt:'Citroën Berlingo 1.5 BlueHDi met geopende motorkap bij NoordTune in Assen',
  captions:['Citroën Berlingo bij NoordTune: aanzicht met geopende motorkap.','Bosch MD1CS003 ECU en de motorruimte van de Berlingo.','Vooraanzicht van de Berlingo tijdens het werkplaatsproject.','ECU-werkstation met laptop, interfaces en aangesloten bekabeling.','Overzicht van de werkbank en de apparatuur voor ECU-werk.'],
  notes:[
   'De hoofd-distributieriem en de waterpomp zijn vervangen.',
   'De complete multiriemset is vernieuwd, inclusief de bijbehorende rollen, lagers en span- en geleidingsdelen.',
   'De filters binnen de onderhoudsbeurt en de koelvloeistof zijn vervangen.',
   'De Bosch MD1CS003 ECU is geïdentificeerd en met de KT200 op de werkbank uitgelezen.',
   'De ECU-kalibratie is aangepast en de beschikbare motorgegevens zijn beoordeeld.',
   'De uitgevoerde werkzaamheden en het vervolgadvies zijn vastgelegd in het servicerapport.'
  ],
  contact:'Een vergelijkbare vraag voor jouw Berlingo of bedrijfswagen? Vertel ons welke motor je hebt en waarvoor je de auto gebruikt. We bespreken de werkzaamheden en prijs vooraf.'
 },
 en: {
  title:'Citroën Berlingo 1.5 BlueHDi: maintenance and ECU work',
  meta:'A Berlingo workshop project at NoordTune in Assen: timing belt, water pump, maintenance and Bosch MD1CS003 ECU work, with original workshop photographs.',
  summary:'From mechanical maintenance to work on the engine control unit. This Citroën Berlingo project combined timing-belt service, routine maintenance and work on the Bosch MD1CS003 ECU. Explore the work completed and our workshop photographs.',
  service:'Maintenance and ECU calibration',
  alt:'Citroën Berlingo 1.5 BlueHDi with its bonnet open at NoordTune in Assen',
  captions:['Citroën Berlingo at NoordTune with its bonnet open.','Bosch MD1CS003 ECU and the Berlingo engine bay.','Front view of the Berlingo during the workshop project.','ECU workstation with laptop, interfaces and connected wiring.','The workbench and equipment used for ECU work.'],
  notes:[
   'The main engine timing belt and the coolant pump were replaced.',
   'The complete auxiliary drive-belt kit was renewed, including its pulleys, bearings and tensioning and guidance components.',
   'The filters within the service scope and the coolant were replaced.',
   'The Bosch MD1CS003 ECU was identified and bench-read using the KT200.',
   'The ECU calibration was revised and available engine data was reviewed.',
   'The completed work and follow-up recommendations were recorded in the service report.'
  ],
  contact:'Have a similar request for your Berlingo or work van? Tell us about the engine and how you use the vehicle. We discuss the scope and price before carrying out the work.'
 },
 pl: {
  title:'Citroën Berlingo 1.5 BlueHDi: serwis i prace przy ECU',
  meta:'Realizacja NoordTune w Assen: wymiana rozrządu i pompy wody, obsługa serwisowa oraz prace przy Bosch MD1CS003. Zobacz oryginalne zdjęcia z warsztatu.',
  summary:'Od obsługi mechanicznej po prace przy sterowniku silnika. W tym Citroënie Berlingo połączyliśmy serwis rozrządu i obsługę eksploatacyjną z pracami przy Bosch MD1CS003. Zobacz zakres realizacji i zdjęcia z naszego warsztatu.',
  service:'Serwis i kalibracja ECU',
  alt:'Citroën Berlingo 1.5 BlueHDi z otwartą maską przy warsztacie NoordTune w Assen',
  captions:['Citroën Berlingo przy NoordTune, widok z otwartą maską.','Sterownik Bosch MD1CS003 i komora silnika Berlingo.','Berlingo od przodu podczas realizacji warsztatowej.','Stanowisko ECU z laptopem, interfejsami i podłączonym okablowaniem.','Stół warsztatowy oraz wyposażenie do prac przy sterownikach.'],
  notes:[
   'Wymieniono główny pasek rozrządu oraz pompę wody.',
   'Wymieniono kompletny zestaw napędu paska osprzętu, w tym rolki, łożyska oraz elementy prowadzenia i napinania.',
   'Wymieniono filtry objęte obsługą serwisową oraz płyn chłodniczy.',
   'Zidentyfikowano sterownik Bosch MD1CS003 i wykonano odczyt bench przy użyciu KT200.',
   'Zmieniono kalibrację ECU i przeanalizowano dostępne dane pracy silnika.',
   'Wykonane prace i dalsze zalecenia zapisano w raporcie serwisowym.'
  ],
  contact:'Potrzebujesz podobnych prac przy Berlingo lub innym aucie firmowym? Podaj wersję silnika i sposób użytkowania. Zakres oraz cenę uzgadniamy przed realizacją.'
 }
};
const images=[
 '/images/results/citroen-berlingo-15-bluehdi-workshop-hd.webp',
 '/images/results/citroen-berlingo-md1cs003-engine-hd.webp',
 '/images/results/citroen-berlingo-front-workshop-hd.webp',
 '/images/results/citroen-berlingo-ecu-workstation-hd.webp',
 '/images/results/citroen-berlingo-workbench-overview-hd.webp'
];
export const berlingoCustomerResults:CustomerResult[]=(['nl','en','pl'] as const).map((locale:Locale)=>{
 const t=text[locale];
 return {
  id:'customer-berlingo-maintenance-ecu-'+locale,locale,slug:berlingoCaseSlug,title:t.title,metaTitle:t.title+' | NoordTune',metaDescription:t.meta,
  source:'manual',status:'published',indexable:true,presentation:'workshop',vehicleMake:'Citroën',vehicleModel:'Berlingo',vehicleGeneration:'K9',vehicleEngine:'1.5 BlueHDi DV5',vehicleYear:'2021',ecu:'Bosch MD1CS003',serviceType:t.service,stage:'Stage 1',category:'ecu-remap',serviceTags:[locale==='nl'?'Onderhoud':locale==='pl'?'Serwis':'Maintenance','ECU','Stage 1'],fuelType:'Diesel',
  featuredOnHome:true,featuredOrder:0,licensePlateVisible:false,customerApproved:false,ownerPublicationApproved:true,certificateAvailable:false,
  images:[...images],imageAlt:t.alt,imageCaptions:t.captions,shortDescription:t.summary,technicalNotes:t.notes,
  verificationNote:'Owner-approved anonymized workshop story; completed maintenance and ECU work checked against the service report. Full technical follow-up remains in the project dossier.',
  publishedAt:'2026-10-11',updatedAt:'2026-10-11',disclaimer:t.contact,
  relatedPowerCatalogUrl:locale==='nl'?'https://power.noordtune.nl/nl/bedrijfswagens/citroen-berlingo':'https://power.noordtune.nl/'+locale,whatsappCta:'https://wa.me/31685759600'
 };
});
