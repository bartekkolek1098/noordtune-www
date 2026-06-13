import {Facebook, Instagram, Mail, MapPin, MessageCircle, Music2, Phone, Youtube} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {pathFor, site, type Locale} from "@/content/site";

type FooterProps = {
  locale: Locale;
};

export function Footer({locale}: FooterProps) {
  const labels = {
    nl: {
      intro:
        "Chiptuning & Auto Diagnostiek in Assen. Maatwerk software, diagnose, loganalyse en eerlijk advies voor auto's in Drenthe, Groningen en Noord-Nederland.",
      quick: "Snel naar",
      contact: "Contact",
      social: "Volg ons",
      area: "Ons werkgebied",
      areaText: "Assen, Drenthe, Groningen en Noord-Nederland.",
      legal: "Alle rechten voorbehouden"
    },
    en: {
      intro:
        "Chiptuning & Vehicle Diagnostics in Assen. Custom software, diagnostics, log analysis and clear advice for the northern Netherlands.",
      quick: "Quick links",
      contact: "Contact",
      social: "Follow us",
      area: "Service area",
      areaText: "Assen, Drenthe, Groningen and the northern Netherlands.",
      legal: "All rights reserved"
    },
    pl: {
      intro:
        "Chiptuning i diagnostyka samochodowa w Assen. Indywidualne oprogramowanie, diagnostyka, logi i jasne doradztwo.",
      quick: "Szybkie linki",
      contact: "Kontakt",
      social: "Media społecznościowe",
      area: "Region",
      areaText: "Assen, Drenthe, Groningen i północna Holandia.",
      legal: "Wszelkie prawa zastrzeżone"
    }
  }[locale];
  const socialItems = [
    {label: "Facebook", Icon: Facebook},
    {label: "Instagram", Icon: Instagram},
    {label: "TikTok", Icon: Music2},
    {label: "YouTube", Icon: Youtube}
  ];

  return (
    <footer className="bg-black">
      <div className="container grid gap-8 border-t border-white/10 py-9 md:grid-cols-2 md:py-11 lg:grid-cols-[1.35fr_0.85fr_0.9fr_1fr]">
        <div className="max-w-md">
          <Image
            alt="NoordTune.nl"
            className="h-auto w-56"
            height={75}
            src="/brand/noordtune-logo.png"
            width={260}
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/58">
            {labels.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3" aria-label={labels.social}>
            {socialItems.map(({Icon, label}) => (
              <span
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/[0.03] text-white/78 transition hover:border-primary/60 hover:text-white"
                key={label}
                role="img"
                title={label}
              >
                <Icon className="h-4 w-4" />
                <span className="sr-only">{label}</span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="racing-title text-xl text-white">{labels.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/68">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> {site.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> {site.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {site.city},{" "}
              {locale === "nl" ? "Nederland" : locale === "en" ? site.country : "Holandia"}
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp
            </li>
          </ul>
        </div>

        <div>
          <h3 className="racing-title text-xl text-white">{labels.quick}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/68">
            <li>
              <a className="hover:text-primary" href={site.catalogUrl} rel="noreferrer" target="_blank">
                {locale === "pl" ? "Katalog mocy" : "Power Catalog"}
              </a>
            </li>
            <li>
              <Link className="hover:text-primary" href={pathFor(locale, "chiptuning")}>
                Chiptuning
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={pathFor(locale, "diagnose")}>
                {locale === "pl" ? "Diagnostyka" : locale === "en" ? "Diagnostics" : "Auto diagnose"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={pathFor(locale, "prijzen")}>
                {locale === "nl" ? "Prijzen" : locale === "en" ? "Pricing" : "Cennik"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={pathFor(locale, "appointment")}>
                {locale === "nl" ? "Afspraak" : locale === "en" ? "Appointment" : "Termin"}
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={pathFor(locale, "contact")}>
                {locale === "pl" ? "Kontakt" : "Contact"}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="racing-title text-xl text-white">{labels.area}</h3>
          <div className="mt-4 rounded-[3px] border border-white/10 bg-[radial-gradient(circle_at_65%_35%,rgba(227,6,19,.30),transparent_4.5rem),linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,.01)),#08090a] p-5">
            <div className="flex items-center justify-between gap-4">
              <MapPin className="h-9 w-9 text-primary" />
              <span className="racing-title text-2xl text-white">Assen</span>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">{labels.areaText}</p>
            <div className="mt-5 grid grid-cols-2 gap-2 text-xs uppercase text-white/45">
              <span>Drenthe</span>
              <span>Groningen</span>
              <span>Beilen</span>
              <span>Hoogeveen</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-3 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 NoordTune.nl - {labels.legal}</p>
          <div className="flex gap-5">
            <Link className="hover:text-primary" href={pathFor(locale, "terms")}>
              {locale === "nl" ? "Algemene voorwaarden" : locale === "en" ? "Terms" : "Regulamin"}
            </Link>
            <Link className="hover:text-primary" href={pathFor(locale, "privacy")}>
              {locale === "nl" ? "Privacybeleid" : locale === "en" ? "Privacy policy" : "Polityka prywatności"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
