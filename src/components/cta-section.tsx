import {ButtonLink} from "@/components/button";
import {site, type Locale} from "@/content/site";

type CTASectionProps = {
  title?: string;
  text?: string;
  locale: Locale;
};

const finalCta = {
  nl: {
    title: "Klaar voor meer vermogen en zekerheid?",
    text:
      "Controleer je auto in de NoordTune Power Catalog of stuur je kenteken, motorvariant en vraag direct via WhatsApp.",
    catalog: "Open Power Catalog",
    whatsapp: "WhatsApp ons"
  },
  en: {
    title: "Ready for more power and confidence?",
    text: "Check your vehicle in the NoordTune Power Catalog or send us your vehicle details on WhatsApp.",
    catalog: "Open Power Catalog",
    whatsapp: "Message us"
  },
  pl: {
    title: "Gotowy na lepsze osiągi i pewność?",
    text: "Sprawdź swoje auto w katalogu mocy NoordTune albo wyślij nam dane pojazdu przez WhatsApp.",
    catalog: "Otwórz katalog mocy",
    whatsapp: "Napisz na WhatsApp"
  }
} satisfies Record<Locale, {title: string; text: string; catalog: string; whatsapp: string}>;

export function CTASection({locale}: CTASectionProps) {
  const labels = finalCta[locale];
  const titleWords = labels.title.split(" ");

  return (
    <section className="border-y border-white/10 bg-[#090a0b]">
      <div className="container grid gap-6 py-9 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="racing-title text-3xl leading-none text-white md:text-5xl">
            {titleWords.slice(0, -2).join(" ")}{" "}
            <span className="text-primary">{titleWords.slice(-2).join(" ")}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">{labels.text}</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <ButtonLink href={site.catalogUrl}>{labels.catalog}</ButtonLink>
          <ButtonLink href={site.whatsappUrl} icon="whatsapp" variant="outline">
            {labels.whatsapp}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
