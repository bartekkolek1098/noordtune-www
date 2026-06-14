import Image from "next/image";
import Link from "next/link";
import {ButtonLink} from "@/components/button";
import {CTASection} from "@/components/cta-section";
import {FAQ} from "@/components/faq";
import {FloatingWhatsApp} from "@/components/floating-whatsapp";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {PowerCatalogSection} from "@/components/power-catalog-section";
import {SectionHeader} from "@/components/section-header";
import type {BlogArticle} from "@/content/blog-articles";
import {pathFor, site, type Locale} from "@/content/site";

const labels = {
  nl: {
    back: "Terug naar Nieuws & Blog",
    knowledge: "Kennisbank",
    readTime: "Leestijd",
    related: "Verder lezen",
    faq: "Veelgestelde vragen",
    catalog: "Controleer jouw auto in de Power Catalog",
    whatsapp: "Vraag advies via WhatsApp"
  },
  en: {
    back: "Back to News & Blog",
    knowledge: "Knowledge base",
    readTime: "Read time",
    related: "Continue reading",
    faq: "Frequently asked questions",
    catalog: "Check your vehicle in the Power Catalog",
    whatsapp: "Ask for advice on WhatsApp"
  },
  pl: {
    back: "Wróć do aktualności i bloga",
    knowledge: "Baza wiedzy",
    readTime: "Czas czytania",
    related: "Czytaj dalej",
    faq: "Najczęstsze pytania",
    catalog: "Sprawdź auto w katalogu mocy",
    whatsapp: "Zapytaj przez WhatsApp"
  }
} satisfies Record<Locale, Record<string, string>>;

export function BlogArticleRenderer({article}: {article: BlogArticle}) {
  const copy = labels[article.locale];

  return (
    <>
      <Header activeKey="blog" locale={article.locale} />
      <main>
        <article>
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="absolute inset-0">
              <Image
                alt=""
                className="object-cover object-center"
                fill
                priority
                quality={90}
                sizes="100vw"
                src={article.heroImage}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.92)_42%,rgba(5,5,5,.56)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(227,6,19,.28),transparent_18rem)]" />
            </div>

            <div className="container relative z-10 flex min-h-[460px] items-end pb-10 pt-20 md:min-h-[590px] md:pb-14">
              <div className="max-w-4xl">
                <Link
                  className="text-xs font-black uppercase text-white/58 transition hover:text-primary"
                  href={pathFor(article.locale, "blog")}
                >
                  {copy.back}
                </Link>
                <p className="racing-title mt-6 text-lg text-primary md:text-xl">{copy.knowledge}</p>
                <h1 className="racing-title mt-3 text-4xl leading-[0.9] text-white sm:text-5xl md:text-7xl">
                  {article.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">
                  {article.intro}
                </p>
                <div className="mt-7 flex flex-wrap gap-3 text-xs font-black uppercase text-white/58">
                  <span className="rounded-[3px] border border-primary/35 bg-primary/12 px-3 py-2 text-primary">
                    {article.category}
                  </span>
                  <span className="rounded-[3px] border border-white/12 bg-black/35 px-3 py-2">
                    {copy.readTime}: {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="container py-12 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="panel-edge rounded-[3px] p-6 md:p-8">
                <div className="space-y-10">
                  {article.sections.map((section) => (
                    <section key={section.heading}>
                      <h2 className="racing-title text-3xl leading-none text-white md:text-5xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-4">
                        {section.body.map((paragraph) => (
                          <p className="text-base leading-8 text-white/72" key={paragraph}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {section.bullets ? (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {section.bullets.map((item) => (
                            <li
                              className="flex items-center gap-3 border border-white/10 bg-black/35 px-4 py-3 text-sm text-white/74"
                              key={item}
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </div>

              <aside className="space-y-5">
                <div className="panel-edge rounded-[3px] p-5">
                  <p className="racing-title text-2xl text-white">{copy.related}</p>
                  <div className="mt-4 grid gap-2">
                    {article.relatedLinks.map((link) => (
                      <ButtonLink
                        className="justify-between"
                        href={link.href}
                        key={`${link.href}-${link.label}`}
                        variant={link.href.startsWith("http") ? "outline" : "ghost"}
                      >
                        {link.label}
                      </ButtonLink>
                    ))}
                  </div>
                </div>
                <div className="panel-edge rounded-[3px] p-5">
                  <p className="racing-title text-2xl text-white">NoordTune</p>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    {article.locale === "nl"
                      ? "Wil je weten wat er bij jouw auto mogelijk is? Gebruik de Power Catalog als eerste technische indicatie en stuur daarna kenteken, motorvariant of foutmelding via WhatsApp voor advies op maat."
                      : article.locale === "en"
                        ? "Want to know what is possible for your car? Use the Power Catalog as a first technical indication, then send your vehicle details or fault information on WhatsApp for tailored advice."
                        : "Chcesz wiedzieć, co jest możliwe w Twoim aucie? Użyj katalogu mocy jako pierwszej orientacji technicznej, a potem wyślij dane auta lub opis usterki przez WhatsApp."}
                  </p>
                  <div className="mt-5 grid gap-3">
                    <ButtonLink href={site.catalogUrl}>{copy.catalog}</ButtonLink>
                    <ButtonLink href={site.whatsappUrl} icon="whatsapp" variant="outline">
                      {copy.whatsapp}
                    </ButtonLink>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {article.faq.length > 0 ? (
            <section className="container py-12 md:py-16">
              <SectionHeader align="center" kicker="FAQ" title={copy.faq} />
              <div className="mx-auto mt-8 max-w-4xl">
                <FAQ items={article.faq} />
              </div>
            </section>
          ) : null}
        </article>

        <PowerCatalogSection compact locale={article.locale} />
        <CTASection locale={article.locale} />
      </main>
      <Footer locale={article.locale} />
      <FloatingWhatsApp locale={article.locale} />
    </>
  );
}
