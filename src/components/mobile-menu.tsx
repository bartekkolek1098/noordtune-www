"use client";

import {Menu, MessageCircle, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {LanguageSwitcher} from "@/components/language-switcher";
import {navItems, pathFor, site, type Locale, type PageKey} from "@/content/site";

type MobileMenuProps = {
  locale: Locale;
  activeKey: PageKey;
  languagePaths?: Partial<Record<Locale, string>>;
};

export function MobileMenu({locale, activeKey, languagePaths}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden">
      <button
        aria-expanded={open}
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.04] text-white"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/86 backdrop-blur-md" role="dialog" aria-modal="true">
          <div className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-white/12 bg-[#070808] p-5 shadow-panel">
            <div className="flex items-center justify-between gap-4">
              <Link href={pathFor(locale, "home")} onClick={() => setOpen(false)}>
                <Image
                  alt="NoordTune.nl"
                  className="h-auto w-48"
                  height={75}
                  priority
                  src="/brand/noordtune-logo.png"
                  width={260}
                />
              </Link>
              <button
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/15 text-white"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <LanguageSwitcher
              className="mt-6"
              languagePaths={languagePaths}
              locale={locale}
              pageKey={activeKey}
            />

            <nav className="mt-7 grid gap-1">
              {navItems.map((item) => {
                const href = item.key === "catalog" ? site.catalogUrl : pathFor(locale, item.key);
                const active = item.key === activeKey;
                return (
                  <a
                    className={`border-b border-white/8 py-3 text-sm font-black uppercase tracking-normal transition ${
                      active ? "text-primary" : "text-white"
                    }`}
                    href={href}
                    key={item.key}
                    onClick={() => setOpen(false)}
                    rel={item.key === "catalog" ? "noreferrer" : undefined}
                    target={item.key === "catalog" ? "_blank" : undefined}
                  >
                    {item.labels[locale]}
                  </a>
                );
              })}
            </nav>

            <div className="mt-auto grid gap-3 pt-7">
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[3px] border border-primary bg-primary px-5 py-3 text-sm font-black uppercase"
                href={site.whatsappUrl}
                rel="noreferrer"
                target="_blank"
              >
                {locale === "pl" ? "Napisz na WhatsApp" : locale === "en" ? "Message us" : "WhatsApp ons"}{" "}
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                className="text-center text-sm font-semibold text-white/75"
                href={`tel:${site.phone.replace(/\s/g, "")}`}
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
