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
  compact?: boolean;
  order?: Locale[];
  languagePaths?: Partial<Record<Locale, string>>;
};

function storeLocaleCookie(locale: Locale) {
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

export function LanguageSwitcher({
  compact = false,
  locale,
  pageKey,
  className,
  order = [...locales],
  languagePaths
}: LanguageSwitcherProps) {
  return (
    <div className={clsx("flex items-center gap-1", className)} aria-label="Language switcher">
      {order.map((item) => {
        const href = languagePaths?.[item] ?? pathFor(item, pageKey);

        return (
          <Link
            aria-label={`Switch to ${languageLabels[item].name}`}
            className={clsx(
              "inline-flex items-center rounded-[3px] border font-black uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              compact
                ? "h-8 gap-1 px-1.5 text-[0.66rem] min-[380px]:px-2"
                : "h-9 gap-1.5 px-2.5 text-[0.72rem]",
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
            <span className={compact ? "hidden min-[380px]:inline" : undefined}>
              {languageLabels[item].label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
