import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {BusinessVansPage} from '@/components/business-vans';
import {businessVanFaq,businessVansUrl} from '@/content/business-vans';
import {site} from '@/content/site';
import {priceLabel} from '@/content/pricing';
import {JsonLd} from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return [{locale:'nl'}];}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(locale!=='nl')return {robots:{index:false,follow:false}};
 return {title:'Chiptuning bedrijfswagens Assen | Offerte voor bus en wagenpark',description:'Chiptuning en diagnose voor bedrijfswagens in Assen. Stage 1 vanaf '+priceLabel('stage1-standard')+' incl. btw. Advies per motor, ECU, transmissie en dagelijks gebruik.',alternates:{canonical:businessVansUrl,languages:{nl:businessVansUrl}},openGraph:{title:'Bedrijfswagens: chiptuning en diagnose in Assen | NoordTune',description:'Eén bestelwagen of een klein wagenpark: voertuigcontrole, duidelijke vanaf-prijzen en een persoonlijke offerte.',url:businessVansUrl,type:'website',locale:'nl_NL',images:[{url:site.url+'/images/results/citroen-berlingo-15-bluehdi-workshop-hd.webp',alt:'NoordTune bedrijfswagenproject: Berlingo met geopende motorkap'}]}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=='nl')notFound();
 return <><JsonLd data={{'@context':'https://schema.org','@type':'Service',name:'Chiptuning en diagnose voor bedrijfswagens',serviceType:'Voertuigspecifieke ECU-kalibratie en diagnose',url:businessVansUrl,provider:{'@type':'AutoRepair',name:'NoordTune',url:site.url,telephone:site.phone,address:{'@type':'PostalAddress',addressLocality:'Assen',addressCountry:'NL'}},areaServed:{'@type':'City',name:'Assen'}}}/><JsonLd data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:site.url+'/nl'},{'@type':'ListItem',position:2,name:'Bedrijfswagens',item:businessVansUrl}]}}/><JsonLd data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:businessVanFaq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}}/><BusinessVansPage/></>;
}
