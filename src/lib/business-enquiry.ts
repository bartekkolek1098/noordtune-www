import {site} from '../content/site';
export const businessServices = ['Stage 1 / ECU tuning','Diagnose / vermogensverlies','TCU / transmissie','Meerdere bedrijfswagens','Advies over mijn motor'] as const;
export type BusinessEnquiryFields = {service:string;company:string;fleet:string;vehicle:string;use:string;question:string;preferred:string};
export const businessEnquiryLimits = {company:100,vehicle:160,use:300,question:1000,preferred:100} as const;
export const businessFleetOptions = ['1 voertuig','2–5 voertuigen','6 of meer voertuigen'] as const;
export function validateBusinessEnquiry(fields:BusinessEnquiryFields):Partial<Record<keyof BusinessEnquiryFields,string>> {
 const errors:Partial<Record<keyof BusinessEnquiryFields,string>>={};
 if(!businessServices.some(value=>value===fields.service))errors.service='Kies de gewenste dienst.';
 if(!businessFleetOptions.some(value=>value===fields.fleet))errors.fleet='Kies het aantal voertuigen.';
 if(!fields.question.trim())errors.question='Beschrijf kort je vraag of de klacht.';
 for(const [key,max] of Object.entries(businessEnquiryLimits) as [keyof typeof businessEnquiryLimits,number][]){if(fields[key].length>max)errors[key]='Gebruik maximaal '+max+' tekens.';}
 return errors;
}
export function buildBusinessEnquiryMessage(fields:BusinessEnquiryFields):string {
 const lines=['Hallo NoordTune, ik ontvang graag advies of een offerte voor mijn bedrijfswagen(s).'];
 const labels:Record<keyof BusinessEnquiryFields,string>={service:'Dienst',company:'Bedrijf',fleet:'Aantal voertuigen',vehicle:'Merk, model, motor en jaar',use:'Gebruik / belading',question:'Vraag / klacht',preferred:'Voorkeur voor overleg of afspraak'};
 for(const key of ['service','company','fleet','vehicle','use','preferred','question'] as const){const value=fields[key].replace(/\r\n?/g,'\n').trim();if(value)lines.push(labels[key]+': '+value);}
 lines.push('Graag eerst de werkzaamheden, totaalprijs inclusief btw en beschikbaarheid bevestigen.');return lines.join('\n');
}
export function businessEnquiryDestination(channel:'whatsapp'|'email',message:string):string {
 if(channel==='whatsapp'){const u=new URL(site.whatsappUrl);u.searchParams.set('text',message);return u.toString();}
 return 'mailto:'+site.email+'?subject='+encodeURIComponent('Offerte bedrijfswagen / NoordTune')+'&body='+encodeURIComponent(message);
}
