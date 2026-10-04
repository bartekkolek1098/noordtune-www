"use client";

import {track} from "@vercel/analytics";
import type {Locale} from "@/content/site";

export const conversionEventPropertyKeys = {
  whatsapp_click: ["locale", "source"],
  appointment_click: ["locale", "source"],
  appointment_enquiry_started: ["locale", "source"],
  appointment_whatsapp_handoff: ["locale", "source"],
  power_catalog_click: ["locale", "source"],
  customer_result_click: ["locale", "slug"],
  blog_article_click: ["locale", "slug"],
  brand_page_click: ["locale", "slug"],
  phone_click: ["locale", "source"],
  email_click: ["locale", "source"]
} as const;

export const conversionEventNames: ReadonlyArray<keyof typeof conversionEventPropertyKeys> = Object.freeze(
  Object.keys(conversionEventPropertyKeys) as Array<keyof typeof conversionEventPropertyKeys>
);

export const maxConversionEventProperties = 2 as const;

export type ConversionEventName = keyof typeof conversionEventPropertyKeys;

export type ConversionSource =
  | "header"
  | "footer"
  | "floating"
  | "homepage_hero"
  | "homepage_catalog"
  | "homepage_results"
  | "homepage_blog"
  | "contact_hero"
  | "contact_composer"
  | "contact_cards"
  | "appointment_composer"
  | "results_archive"
  | "blog_index"
  | "brand_index"
  | "brand_hero"
  | "brand_catalog"
  | "brand_results"
  | "site_cta";

type SourceProperties = Readonly<{locale: Locale; source: ConversionSource}>;
type SlugProperties = Readonly<{locale: Locale; slug: string}>;

export type ConversionEvent =
  | {name: "whatsapp_click"; properties: SourceProperties}
  | {name: "appointment_click"; properties: SourceProperties}
  | {name: "appointment_enquiry_started"; properties: SourceProperties}
  | {name: "appointment_whatsapp_handoff"; properties: SourceProperties}
  | {name: "power_catalog_click"; properties: SourceProperties}
  | {name: "customer_result_click"; properties: SlugProperties}
  | {name: "blog_article_click"; properties: SlugProperties}
  | {name: "brand_page_click"; properties: SlugProperties}
  | {name: "phone_click"; properties: SourceProperties}
  | {name: "email_click"; properties: SourceProperties};

type AnalyticsTransport = (name: ConversionEventName, properties: Record<string, string>) => void;

export function createConversionTracker(transport: AnalyticsTransport) {
  return (event: ConversionEvent): void => {
    const allowedKeys = conversionEventPropertyKeys[event.name] as readonly string[] | undefined;
    const entries = Object.entries(event.properties);
    if (
      !allowedKeys ||
      entries.length > maxConversionEventProperties ||
      entries.some(([key]) => !allowedKeys.includes(key))
    ) return;

    try {
      transport(event.name, Object.fromEntries(entries));
    } catch {
      // Analytics is best effort and must never interrupt the visitor's action.
    }
  };
}

export const trackConversion = createConversionTracker((name, properties) => {
  track(name, properties);
});
