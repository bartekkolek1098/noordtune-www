import snapshot from './pricing-catalog-v2.json';

/** Pinned, reviewed public Price V2 tiers from Power Catalog. Never infer access method from a tier label. */
export const catalogPriceReference = snapshot;
export type PublicPricingTierId = 'stage1-standard'|'stage1-advanced'|'stage1-modern'|'stage2-standard'|'stage2-advanced'|'stage2-performance'|'stage3-standard'|'stage3-advanced'|'stage3-performance'|'tcu-standard';
export function publicPrice(id: PublicPricingTierId): number {
  const tier = snapshot.tiers.find(item => item.id === id);
  if (!tier || !Number.isFinite(tier.priceFrom) || tier.priceFrom <= 0) throw new Error('Missing approved public price: ' + id);
  return tier.priceFrom;
}
export function priceLabel(id: PublicPricingTierId): string {return '€' + publicPrice(id);}
export function priceCardLabel(id: PublicPricingTierId): string {return priceLabel(id) + ',-';}
export const stage1Tiers = ['stage1-standard','stage1-advanced','stage1-modern'] as const;
export const tierNames = { 'stage1-standard':'Standard', 'stage1-advanced':'Advanced', 'stage1-modern':'Modern' } as const;
