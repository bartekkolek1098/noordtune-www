"use client";

import {Gauge, Menu, MessageCircle, X} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {LanguageSwitcher} from "@/components/language-switcher";
import {navItems, pathFor, site, type Locale, type PageKey} from "@/content/site";

type MobileMenuProps = {
  locale: Locale;
  activeKey: PageKey;
  languagePaths?: Partial<Record<Locale, string>>;
};

const menuCopy = {
  nl: {
    open: "Menu openen",
    close: "Menu sluiten",
    dialog: "Mobiel navigatiemenu",
    eyebrow: "NoordTune.nl",
    subtitle: "Chiptuning & auto diagnostiek",
    whatsapp: "WhatsApp ons",
    catalog: "Vermogen berekenen",
    phoneLabel: "Bel NoordTune.nl"
  },
  en: {
    open: "Open menu",
    close: "Close menu",
    dialog: "Mobile navigation menu",
    eyebrow: "NoordTune.nl",
    subtitle: "Chiptuning & car diagnostics",
    whatsapp: "Message us",
    catalog: "Check tuning options",
    phoneLabel: "Call NoordTune.nl"
  },
  pl: {
    open: "Otwórz menu",
    close: "Zamknij menu",
    dialog: "Mobilne menu nawigacji",
    eyebrow: "NoordTune.nl",
    subtitle: "Chiptuning i diagnostyka",
    whatsapp: "Napisz na WhatsApp",
    catalog: "Sprawdź możliwości auta",
    phoneLabel: "Zadzwoń do NoordTune.nl"
  }
} satisfies Record<
  Locale,
  {
    open: string;
    close: string;
    dialog: string;
    eyebrow: string;
    subtitle: string;
    whatsapp: string;
    catalog: string;
    phoneLabel: string;
  }
>;

const mobileLanguageOrder: Record<Locale, Locale[]> = {
  nl: ["nl", "en", "pl"],
  en: ["en", "nl", "pl"],
  pl: ["pl", "nl", "en"]
};

export function MobileMenu({locale, activeKey, languagePaths}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const copy = menuCopy[locale];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const previous = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous.overflow;
      document.body.style.paddingRight = previous.paddingRight;
      document.body.style.position = previous.position;
      document.body.style.top = previous.top;
      document.body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="xl:hidden">
      <button
        aria-expanded={open}
        aria-label={copy.open}
        aria-controls="mobile-navigation"
        className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/15 bg-white/[0.04] text-white"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted && open
        ? createPortal(
            <div
              aria-label={copy.dialog}
              aria-modal="true"
              className="fixed inset-0 z-[120] overflow-y-auto bg-[#020303] text-white"
              id="mobile-navigation"
              onClick={closeMenu}
              role="dialog"
            >
              <div
                className="min-h-[100dvh] bg-[radial-gradient(circle_at_85%_8%,rgba(227,6,19,.22),transparent_18rem),linear-gradient(180deg,#090a0b_0%,#020303_58%,#050505_100%)] px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+18px)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mx-auto flex min-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-42px)] w-full max-w-md flex-col">
                  <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4">
                    <Link
                      className="flex min-w-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      href={pathFor(locale, "home")}
                      onClick={closeMenu}
                    >
                      <Image
                        alt="NoordTune.nl"
                        className="h-auto w-40 max-w-[58vw]"
                        height={75}
                        priority
                        src="/brand/noordtune-logo.png"
                        width={260}
                      />
                    </Link>
                    <button
                      aria-label={copy.close}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-white/20 bg-white/[0.04] text-white transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={closeMenu}
                      ref={closeButtonRef}
                      type="button"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="border-b border-white/10 py-4">
                    <p className="text-xs font-black uppercase text-primary">{copy.eyebrow}</p>
                    <p className="mt-1 text-sm text-white/70">{copy.subtitle}</p>
                    <LanguageSwitcher
                      className="mt-4 flex-wrap gap-2"
                      languagePaths={languagePaths}
                      locale={locale}
                      order={mobileLanguageOrder[locale]}
                      pageKey={activeKey}
                    />
                  </div>

                  <nav aria-label={copy.dialog} className="grid py-4">
                    {navItems.map((item) => {
                      const href = item.key === "catalog" ? site.catalogUrl : pathFor(locale, item.key);
                      const active = item.key === activeKey;
                      return (
                        <a
                          className={`flex items-center justify-between border-b border-white/8 py-3.5 text-base font-black uppercase tracking-normal transition hover:text-primary focus:outline-none focus-visible:text-primary ${
                            active ? "text-primary" : "text-white"
                          }`}
                          href={href}
                          key={item.key}
                          onClick={closeMenu}
                          rel={item.key === "catalog" ? "noreferrer" : undefined}
                          target={item.key === "catalog" ? "_blank" : undefined}
                        >
                          <span>{item.labels[locale]}</span>
                          <span className={active ? "h-1.5 w-1.5 rounded-full bg-primary" : "h-px w-5 bg-white/22"} />
                        </a>
                      );
                    })}
                  </nav>

                  <div className="mt-auto grid gap-3 border-t border-white/12 pt-5">
                    <a
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-primary bg-primary px-5 py-3 text-sm font-black uppercase text-white shadow-[0_0_32px_rgba(227,6,19,.25)] transition hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      href={site.whatsappUrl}
                      onClick={closeMenu}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {copy.whatsapp}
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <a
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[3px] border border-white/18 bg-white/[0.04] px-5 py-3 text-sm font-black uppercase text-white transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      href={site.catalogUrl}
                      onClick={closeMenu}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {copy.catalog}
                      <Gauge className="h-4 w-4" />
                    </a>
                    <a
                      aria-label={copy.phoneLabel}
                      className="text-center text-sm font-semibold text-white/68 hover:text-white"
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      onClick={closeMenu}
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
