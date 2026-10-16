"use client";

import clsx from "clsx";
import {Check, ChevronDown, Globe2} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useId, useRef, useState} from "react";
import {
  languageLabels,
  localeCookieName,
  locales,
  pathFor,
  sharedLocaleCookieName,
  type Locale,
  type PageKey
} from "@/content/site";

type LanguageSwitcherProps = {
  locale: Locale;
  pageKey: PageKey;
  className?: string;
  compact?: boolean;
  expanded?: boolean;
  order?: Locale[];
  languagePaths?: Partial<Record<Locale, string>>;
};

const languagePrompt: Record<Locale, string> = {
  nl: "Taal",
  en: "Language",
  pl: "Język"
};

function storeLocaleCookie(locale: Locale) {
  const host = window.location.hostname;
  const sharedDomain = host === "noordtune.nl" || host.endsWith(".noordtune.nl")
    ? "; Domain=.noordtune.nl"
    : "";
  // A new, explicitly chosen preference is authoritative on both subdomains.
  // Separate name prevents stale host-only legacy cookies from overriding it.
  document.cookie = `${sharedLocaleCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${sharedDomain}`;
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher({
  compact = false,
  expanded = false,
  locale,
  pageKey,
  className,
  order = [...locales],
  languagePaths
}: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open || expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) setOpen(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [open, expanded]);

  const options = order.map((item) => {
    const href = languagePaths?.[item] ?? pathFor(item, pageKey);
    const active = item === locale;
    return (
      <Link
        aria-current={active ? "page" : undefined}
        aria-label={`Switch to ${languageLabels[item].name}`}
        className={clsx(
          "flex min-h-11 min-w-0 items-center gap-3 rounded-md border px-3 py-2 text-left text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          expanded ? "flex-col justify-center gap-1 text-center" : "w-full",
          active
            ? "border-primary/75 bg-primary/15 text-white"
            : "border-white/15 bg-white/[0.04] text-white/85 hover:border-primary/65 hover:bg-white/[0.09]"
        )}
        href={href}
        hrefLang={item}
        key={item}
        lang={item}
        onClick={() => {
          storeLocaleCookie(item);
          setOpen(false);
        }}
      >
        <span aria-hidden="true" className="text-lg">{languageLabels[item].flag}</span>
        <span className={clsx("min-w-0", expanded && "flex flex-col items-center")}>
          <span className="block text-xs font-black uppercase tracking-wide">{item.toUpperCase()}</span>
          <span className="block text-[0.7rem] font-medium text-white/75">{languageLabels[item].name}</span>
        </span>
        {!expanded && active ? <Check aria-hidden="true" className="ml-auto h-4 w-4 text-primary" /> : null}
      </Link>
    );
  });

  if (expanded) {
    return (
      <div aria-label="Language switcher" className={clsx("min-w-0", className)} data-testid="language-switcher-expanded">
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em] text-white">
          <Globe2 aria-hidden="true" className="h-4 w-4 text-primary" />
          Taal / Language / Język
        </p>
        <nav aria-label="Choose website language" className="grid min-w-0 grid-cols-3 gap-2">
          {options}
        </nav>
      </div>
    );
  }

  return (
    <div className={clsx("relative shrink-0", className)} ref={wrapper} data-testid="language-switcher">
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${languagePrompt[locale]}: ${languageLabels[locale].name} – change language`}
        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-md border border-primary/75 bg-[#191b1d] px-2.5 py-2 text-sm font-black text-white shadow-[0_0_12px_rgba(227,6,19,.16)] transition hover:bg-primary/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[420px]:px-3"
        data-testid="language-switcher-trigger"
        onClick={() => setOpen(current => !current)}
        ref={trigger}
        type="button"
      >
        <Globe2 aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
        <span className={clsx(compact ? "hidden min-[420px]:inline" : "inline", "text-xs")}>
          {languagePrompt[locale]}
        </span>
        <span className="text-xs">{locale.toUpperCase()}</span>
        <ChevronDown aria-hidden="true" className={clsx("h-3.5 w-3.5 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <nav
          aria-label="Choose website language"
          className="absolute right-0 top-full z-[100] mt-2 w-56 max-w-[calc(100vw-2rem)] space-y-1.5 rounded-lg border border-white/25 bg-[#111416] p-2 shadow-[0_16px_38px_rgba(0,0,0,.8)]"
          data-testid="language-switcher-options"
          id={menuId}
        >
          {options}
        </nav>
      ) : null}
    </div>
  );
}
