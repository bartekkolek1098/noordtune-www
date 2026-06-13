"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  languageLabels,
  localeCookieName,
  locales,
  pathFor,
  type Locale,
  type PageKey
} from "@/content/site";

type LanguageSwitcherProps = {
  locale: Locale;
  pageKey: PageKey;
  className?: string;
  languagePaths?: Partial<Record<Locale, string>>;
};

function storeLocaleCookie(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher({locale, pageKey, className, languagePaths}: LanguageSwitcherProps) {
  return (
    <div className={clsx("flex items-center gap-1", className)} aria-label="Language switcher">
      {locales.map((item) => {
        const href = languagePaths?.[item] ?? pathFor(item, pageKey);

        return (
          <Link
            aria-label={`Switch to ${languageLabels[item].name}`}
            className={clsx(
              "inline-flex h-9 items-center gap-1.5 rounded-[3px] border px-2.5 text-[0.72rem] font-black uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              item === locale
                ? "border-primary bg-primary/18 text-white shadow-[0_0_22px_rgba(227,6,19,.18)]"
                : "border-white/14 bg-white/[0.04] text-white/72 hover:border-white/34 hover:text-white"
            )}
            href={href}
            hrefLang={item}
            key={item}
            onClick={() => storeLocaleCookie(item)}
          >
            <span aria-hidden="true">{languageLabels[item].flag}</span>
            <span>{languageLabels[item].label}</span>
          </Link>
        );
      })}
    </div>
  );
}
