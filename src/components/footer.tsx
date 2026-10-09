import {Facebook, Instagram, Mail, MapPin, MessageCircle, Phone} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {TrackedLink} from "@/components/tracked-link";
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
      area: "Ons werkgebied",
      areaText: "Assen, Drenthe, Groningen en Noord-Nederland.",
      legal: "Alle rechten voorbehouden",
      credit: "Website ontwikkeld en onderhouden door"
    },
    en: {
      intro:
        "Chiptuning & Vehicle Diagnostics in Assen. Custom software, diagnostics, log analysis and clear advice for the northern Netherlands.",
      quick: "Quick links",
      contact: "Contact",
      area: "Service area",
      areaText: "Assen, Drenthe, Groningen and the northern Netherlands.",
      legal: "All rights reserved",
      credit: "Website developed and maintained by"
    },
    pl: {
      intro:
        "Chiptuning i diagnostyka samochodowa w Assen. Indywidualne oprogramowanie, diagnostyka, logi i jasne doradztwo.",
      quick: "Szybkie linki",
      contact: "Kontakt",
      area: "Region",
      areaText: "Assen, Drenthe, Groningen i północna Holandia.",
      legal: "Wszelkie prawa zastrzeżone",
      credit: "Strona stworzona i utrzymywana przez"
    }
  }[locale];

  return (
    <footer className="bg-black">
      <div className="container grid gap-8 border-t border-white/10 py-9 md:grid-cols-2 md:py-11 lg:grid-cols-[1.35fr_0.85fr_0.9fr_1fr]">
        <div className="max-w-md">
          <Image
            alt="NoordTune.nl"
            className="h-auto w-56"
            height={184}
            src="/brand/noordtune-logo-dark.svg"
            width={600}
          />
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/58">
            {labels.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              {label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590085682134", Icon: Facebook},
              {label: "Instagram", href: "https://www.instagram.com/noordtune.nl", Icon: Instagram}
            ].map(({label, href, Icon}) => (
              <a
                key={label}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:border-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon aria-hidden="true" className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="racing-title text-xl text-white">{labels.contact}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/68">
            <li className="flex items-center gap-2">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
              <TrackedLink analytics={{name: "phone_click", properties: {locale, source: "footer"}}} className="py-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</TrackedLink>
            </li>
            <li className="flex items-center gap-2">
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
              <TrackedLink analytics={{name: "email_click", properties: {locale, source: "footer"}}} className="break-all py-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={`mailto:${site.email}`}>{site.email}</TrackedLink>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> {site.city},{" "}
              {locale === "nl" ? "Nederland" : locale === "en" ? site.country : "Holandia"}
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
              <TrackedLink analytics={{name: "whatsapp_click", properties: {locale, source: "footer"}}} className="py-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href={site.whatsappUrl} rel="noreferrer" target="_blank">WhatsApp</TrackedLink>
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
              <a
                className="py-2 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                href={site.googleMapsUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {locale === "nl" ? "Bekijk ons op Google Maps" : locale === "en" ? "Find us on Google Maps" : "Zobacz nas w Google Maps"}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="racing-title text-xl text-white">{labels.quick}</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/68">
            <li>
              <TrackedLink analytics={{name: "power_catalog_click", properties: {locale, source: "footer"}}} className="hover:text-primary" href={site.catalogUrl} rel="noreferrer" target="_blank">
                {locale === "pl" ? "Katalog mocy" : "Power Catalog"}
              </TrackedLink>
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
        <div className="container grid min-w-0 gap-x-6 gap-y-3 text-xs text-white/45 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-3">
            <p>© 2026 NoordTune.nl - {labels.legal}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link className="hover:text-primary" href={pathFor(locale, "terms")}>
                {locale === "nl" ? "Algemene voorwaarden" : locale === "en" ? "Terms" : "Regulamin"}
              </Link>
              <Link className="hover:text-primary" href={pathFor(locale, "privacy")}>
                {locale === "nl" ? "Privacybeleid" : locale === "en" ? "Privacy policy" : "Polityka prywatności"}
              </Link>
            </div>
          </div>
          <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 pr-16" data-site-credit>
            <span>{labels.credit}</span>
            <a className="inline-flex min-h-11 items-center gap-1.5 py-2 font-semibold text-white/65 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" href="https://zichtgroei.nl/" rel="nofollow noopener noreferrer" target="_blank">
              <Image alt="" aria-hidden="true" className="h-6 w-6 shrink-0 opacity-90" height={64} src="/brand/zichtgroei-mark-white.svg" width={64} />
              ZICHTGROEI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
