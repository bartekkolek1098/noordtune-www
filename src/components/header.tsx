import clsx from "clsx";
import {MessageCircle} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {LanguageSwitcher} from "@/components/language-switcher";
import {MobileMenu} from "@/components/mobile-menu";
import {navItems, pathFor, site, type Locale, type PageKey} from "@/content/site";

type HeaderProps = {
  locale: Locale;
  activeKey: PageKey;
  languagePaths?: Partial<Record<Locale, string>>;
};

export function Header({locale, activeKey, languagePaths}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/86 backdrop-blur-xl">
      <div className="container flex min-h-[72px] items-center justify-between gap-2 xl:min-h-[86px] xl:gap-3">
        <Link
          aria-label="NoordTune.nl home"
          className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          href={pathFor(locale, "home")}
        >
          <Image
            alt="NoordTune.nl Chiptuning & Auto Diagnostiek"
            className="h-auto w-28 min-[360px]:w-32 min-[420px]:w-36 sm:w-48 xl:w-52 2xl:w-56"
            height={75}
            priority
            src="/brand/noordtune-logo.png"
            width={260}
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-4">
          {navItems.map((item) => {
            const href = item.key === "catalog" ? site.catalogUrl : pathFor(locale, item.key);
            const active = item.key === activeKey;
            return (
              <a
                className={clsx(
                  "whitespace-nowrap text-[0.62rem] font-black uppercase tracking-normal transition hover:text-primary focus:outline-none focus-visible:text-primary 2xl:text-[0.72rem]",
                  active ? "text-primary" : "text-white"
                )}
                href={href}
                key={item.key}
                rel={item.key === "catalog" ? "noreferrer" : undefined}
                target={item.key === "catalog" ? "_blank" : undefined}
              >
                {item.labels[locale]}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 xl:hidden">
          <LanguageSwitcher compact languagePaths={languagePaths} locale={locale} pageKey={activeKey} />
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <LanguageSwitcher languagePaths={languagePaths} locale={locale} pageKey={activeKey} />
          <a
            className="hidden h-11 items-center gap-2 whitespace-nowrap rounded-[3px] border border-white/24 bg-black/35 px-4 text-sm font-semibold text-white transition hover:border-primary hover:text-white 2xl:inline-flex"
            href={site.whatsappUrl}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle className="h-4 w-4" />
            {site.phone}
          </a>
        </div>

        <MobileMenu activeKey={activeKey} languagePaths={languagePaths} locale={locale} />
      </div>
    </header>
  );
}
