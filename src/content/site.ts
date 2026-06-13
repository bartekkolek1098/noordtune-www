export const locales = ["nl", "en", "pl"] as const;

export type Locale = (typeof locales)[number];

export type PageKey =
  | "home"
  | "chiptuning"
  | "diagnose"
  | "diensten"
  | "prijzen"
  | "resultaten"
  | "blog"
  | "over"
  | "contact"
  | "appointment"
  | "privacy"
  | "terms";

export const defaultLocale: Locale = "nl";
export const localeCookieName = "noordtune_locale";

export const site = {
  name: "NoordTune.nl",
  description: "Chiptuning & Auto Diagnostiek in Assen",
  url: "https://www.noordtune.nl",
  catalogUrl: "https://power.noordtune.nl/",
  whatsappUrl: "https://wa.me/31685759600",
  phone: "+31 685 759 600",
  email: "info@noordtune.nl",
  city: "Assen",
  country: "Netherlands",
  address: "A. Vogelstraat 1, 9406 XD Assen",
  opening: "Ma - Za: 09:00 - 18:00"
} as const;

export const pageRoutes: Record<PageKey, Record<Locale, string>> = {
  home: {
    nl: "",
    en: "",
    pl: ""
  },
  chiptuning: {
    nl: "chiptuning",
    en: "chiptuning",
    pl: "chiptuning"
  },
  diagnose: {
    nl: "auto-diagnose",
    en: "car-diagnostics",
    pl: "diagnostyka-samochodowa"
  },
  diensten: {
    nl: "diensten",
    en: "services",
    pl: "uslugi"
  },
  prijzen: {
    nl: "prijzen",
    en: "pricing",
    pl: "cennik"
  },
  resultaten: {
    nl: "resultaten",
    en: "results",
    pl: "rezultaty"
  },
  blog: {
    nl: "blog",
    en: "news-blog",
    pl: "aktualnosci-blog"
  },
  over: {
    nl: "over-ons",
    en: "about",
    pl: "o-nas"
  },
  contact: {
    nl: "contact",
    en: "contact",
    pl: "kontakt"
  },
  appointment: {
    nl: "afspraak",
    en: "appointment",
    pl: "termin"
  },
  privacy: {
    nl: "privacybeleid",
    en: "privacy-policy",
    pl: "polityka-prywatnosci"
  },
  terms: {
    nl: "algemene-voorwaarden",
    en: "terms",
    pl: "regulamin"
  }
};

export const languageLabels: Record<Locale, {label: string; flag: string; name: string}> = {
  nl: {label: "NL", flag: "🇳🇱", name: "Nederlands"},
  en: {label: "EN", flag: "🇬🇧", name: "English"},
  pl: {label: "PL", flag: "🇵🇱", name: "Polski"}
};

export const navItems: Array<{key: PageKey | "catalog"; labels: Record<Locale, string>}> = [
  {key: "home", labels: {nl: "Home", en: "Home", pl: "Start"}},
  {key: "catalog", labels: {nl: "Catalogus", en: "Power Catalog", pl: "Katalog mocy"}},
  {key: "chiptuning", labels: {nl: "Chiptuning", en: "Chiptuning", pl: "Chiptuning"}},
  {key: "diagnose", labels: {nl: "Diagnose", en: "Diagnostics", pl: "Diagnostyka"}},
  {key: "diensten", labels: {nl: "Diensten", en: "Services", pl: "Usługi"}},
  {key: "prijzen", labels: {nl: "Prijzen", en: "Pricing", pl: "Cennik"}},
  {key: "resultaten", labels: {nl: "Resultaten", en: "Results", pl: "Rezultaty"}},
  {key: "blog", labels: {nl: "Nieuws & Blog", en: "News & Blog", pl: "Aktualności"}},
  {key: "over", labels: {nl: "Over ons", en: "About", pl: "O nas"}},
  {key: "contact", labels: {nl: "Contact", en: "Contact", pl: "Kontakt"}}
];

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function pathFor(locale: Locale, key: PageKey): string {
  const slug = pageRoutes[key][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function absolutePath(locale: Locale, key: PageKey): string {
  return `${site.url}${pathFor(locale, key)}`;
}

export function pageKeyFromSlug(locale: Locale, slug: string): PageKey | undefined {
  return (Object.keys(pageRoutes) as PageKey[]).find(
    (key) => key !== "home" && pageRoutes[key][locale] === slug
  );
}

export const heroImages: Record<PageKey, string> = {
  home: "/images/heroes/home.png",
  chiptuning: "/images/sections/obd-reprogramming.webp",
  diagnose: "/images/sections/obd-connector.jpg",
  diensten: "/images/sections/bench-ecu-service.webp",
  prijzen: "/images/sections/be-racing-turbo.webp",
  resultaten: "/images/sections/be-racing-turbo.webp",
  blog: "/images/sections/ecu-reading.webp",
  over: "/images/heroes/about.png",
  contact: "/images/heroes/contact.png",
  appointment: "/images/sections/tuning-laptop-b2.webp",
  privacy: "/images/sections/obd-connector.jpg",
  terms: "/images/sections/bench-ecu-service.webp"
};
