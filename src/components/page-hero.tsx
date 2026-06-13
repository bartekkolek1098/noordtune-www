import Image from "next/image";
import {ButtonLink} from "@/components/button";
import type {PageHeroCopy} from "@/content/copy";
import {pathFor, site, type Locale, type PageKey} from "@/content/site";

type PageHeroProps = {
  copy: PageHeroCopy;
  image: string;
  locale: Locale;
  pageKey: PageKey;
};

function hrefForLabel(label: string, locale: Locale, pageKey: PageKey) {
  const value = label.toLowerCase();

  if (value.includes("whatsapp") || value.includes("message") || value.includes("napisz")) {
    return site.whatsappUrl;
  }

  if (
    value.includes("catalog") ||
    value.includes("catalogus") ||
    value.includes("katalog") ||
    value.includes("berekenen") ||
    value.includes("mogelijkheden") ||
    value.includes("możliwości") ||
    value.includes("controleer") ||
    value.includes("check") ||
    value.includes("sprawdz") ||
    value.includes("sprawdź")
  ) {
    return site.catalogUrl;
  }

  if (
    value.includes("afspraak") ||
    value.includes("book") ||
    value.includes("appointment") ||
    value.includes("wizyte") ||
    value.includes("wizyt") ||
    value.includes("umów") ||
    value.includes("umow") ||
    value.includes("termin")
  ) {
    return pathFor(locale, "appointment");
  }

  if (pageKey === "contact") {
    return "#contact";
  }

  return pathFor(locale, "contact");
}

export function PageHero({copy, image, locale, pageKey}: PageHeroProps) {
  const primaryHref = hrefForLabel(copy.primary, locale, pageKey);
  const secondaryHref = hrefForLabel(copy.secondary, locale, pageKey);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Image
          alt=""
          className="object-cover object-center"
          fill
          priority
          quality={90}
          sizes="100vw"
          src={image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.9)_36%,rgba(5,5,5,.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(227,6,19,.2),transparent_26rem)]" />
      </div>
      <div className="container relative z-10 flex min-h-[400px] items-end pb-10 pt-16 md:min-h-[560px] md:pb-12 md:pt-20">
        <div className="max-w-3xl">
          <p className="racing-title mb-4 text-lg text-primary md:text-xl">{copy.eyebrow}</p>
          <h1 className="racing-title text-4xl leading-[0.9] text-white sm:text-5xl md:text-8xl">
            {copy.title.map((line, index) => (
              <span className={index % 2 === 1 ? "block text-primary" : "block"} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 md:text-lg">{copy.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={primaryHref} icon={primaryHref === site.whatsappUrl ? "whatsapp" : "arrow"}>
              {copy.primary}
            </ButtonLink>
            <ButtonLink
              href={secondaryHref}
              icon={secondaryHref === site.whatsappUrl ? "whatsapp" : "arrow"}
              variant="outline"
            >
              {copy.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
