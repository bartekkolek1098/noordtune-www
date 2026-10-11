import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {catalogPriceReference} from '../src/content/pricing';
async function main(){
 const local=resolve(process.cwd(),'../noordtune-power-catalog/src/data/pricing.ts');
 const live=process.argv.includes('--live');
 const url=`https://raw.githubusercontent.com/${catalogPriceReference.sourceRepository}/${live?'main':catalogPriceReference.sourceCommit}/${catalogPriceReference.sourcePath}`;
 const source=!live&&existsSync(local)?await readFile(local,'utf8'):await fetch(url).then(r=>{if(!r.ok)throw new Error('Catalog price source unavailable: '+r.status);return r.text();});
 const start=source.indexOf('export const pricingTiers');assert.ok(start>=0,'Reviewed tier array is missing');
 const end=source.indexOf('] as const',start);assert.ok(end>start,'Reviewed tier array end is missing');
 const tiers=[...source.slice(start,end).matchAll(/\{([\s\S]*?)\}/g)].map(m=>m[1]).filter(s=>/visible:\s*true/.test(s)).map(s=>{
  const id=s.match(/id:\s*"([^"]+)"/)?.[1],label=s.match(/label:\s*"([^"]+)"/)?.[1],price=s.match(/priceFrom:\s*(\d+)/)?.[1];
  assert.ok(id&&label&&price,'Unexpected public price tier shape');return {id,label,priceFrom:Number(price),currency:'EUR'};
 });
 assert.deepEqual(tiers,catalogPriceReference.tiers,'Website snapshot differs from active public catalog prices');
 console.log(JSON.stringify({ok:true,tiers:tiers.length,source:live?'current remote main':existsSync(local)?'local catalog source':'pinned remote source',reviewedCommit:catalogPriceReference.sourceCommit}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
