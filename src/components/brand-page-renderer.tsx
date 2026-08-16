import Image from "next/image";
import Link from "next/link";
import {ArrowRight, CheckCircle2} from "lucide-react";
import {ButtonLink} from "@/components/button";
import {FAQ} from "@/components/faq";
import {FloatingWhatsApp} from "@/components/floating-whatsapp";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {SectionHeader} from "@/components/section-header";
import {
  brandLanguagePaths,
  brandPageCatalogUrl,
  brandPageParentPath,
  brandPageResultsPath,
  brandPageWhatsappUrl,
  type BrandPage
} from "@/content/brand-pages";
import {
  customerResultDisplayMetrics,
  customerResultPath,
  customerResultPrimaryImage,
  customerResults,
  isPublicCustomerResult,
  type CustomerResult
} from "@/content/customer-results";
import {pathFor, type Locale} from "@/content/site";

const ui = {
  nl: {
    home: "Home",
    parent: "Chiptuning",
    proof: "Klantresultaat",
    viewCase: "Bekijk de volledige case",
    stock: "Origineel",
    tuned: "Na tuning",
    gain: "Winst",
    hp: "pk",
    faq: "Veelgestelde vragen",
    catalogKicker: "Power Catalog",
    relatedKicker: "Verder onderzoeken",
    allResults: "Bekijk alle klantresultaten"
  },
  en: {
    home: "Home",
    parent: "Chiptuning",
    proof: "Customer result",
    viewCase: "View the complete case",
    stock: "Stock",
    tuned: "Tuned",
    gain: "Gain",
    hp: "hp",
    faq: "Frequently asked questions",
    catalogKicker: "Power Catalog",
    relatedKicker: "Explore further",
    allResults: "View all customer results"
  },
  pl: {
    home: "Start",
    parent: "Chiptuning",
    proof: "Realizacja klienta",
    viewCase: "Zobacz pełną realizację",
    stock: "Seria",
    tuned: "Po modyfikacji",
    gain: "Przyrost",
    hp: "KM",
    faq: "Najczęstsze pytania",
    catalogKicker: "Katalog mocy",
    relatedKicker: "Sprawdź również",
    allResults: "Zobacz wszystkie realizacje"
  }
} satisfies Record<Locale, Record<string, string>>;

function findBrandResults(page: BrandPage) {
  return page.resultSlugs.flatMap((slug) => {
    const result = customerResults.find(
      (item) => item.locale === page.locale && item.slug === slug && isPublicCustomerResult(item)
    );
    return result ? [result] : [];
  });
}

function ResultProofCard({page, result}: {page: BrandPage; result: CustomerResult}) {
  const copy = ui[page.locale];
  const metrics = customerResultDisplayMetrics(result, copy, copy.hp).slice(0, 3);

  return (
    <article className="panel-edge min-w-0 overflow-hidden rounded-[3px]">
      <div className="relative aspect-[4/3] min-h-[220px] border-b border-white/10 bg-black/60">
        <Image
          alt={result.imageAlt}
          className="object-contain p-2"
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          src={customerResultPrimaryImage(result)}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-[3px] border border-primary/60 bg-primary/90 px-3 py-1 text-[0.65rem] font-black uppercase text-white shadow-glow">
          {copy.proof}
        </span>
      </div>
      <div className="min-w-0 p-5 md:p-6">
        <p className="text-xs font-black uppercase text-primary">{result.stage}</p>
        <h3 className="racing-title mt-2 text-3xl leading-none text-white [overflow-wrap:anywhere]">
          {result.vehicleMake} {result.vehicleModel} {result.vehicleEngine}
        </h3>
        <p className="mt-4 text-sm leading-6 text-white/68">
          {page.resultSummaries[result.slug] ?? result.shortDescription}
        </p>
        {metrics.length > 0 ? (
          <dl className="mt-5 grid gap-2 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                className={metric.accent ? "border border-primary/35 bg-primary/10 p-3" : "border border-white/10 bg-black/28 p-3"}
                key={`${metric.label}-${metric.value}`}
              >
                <dt className="text-[0.65rem] font-black uppercase text-white/42">{metric.label}</dt>
                <dd className={metric.accent ? "mt-1 font-bold text-primary" : "mt-1 font-bold text-white"}>
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <Link
          className="mt-5 inline-flex items-center gap-2 border-b border-primary/70 pb-1 text-xs font-black uppercase text-white transition hover:text-primary"
          href={customerResultPath(result)}
        >
          {copy.viewCase} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function BrandPageRenderer({page}: {page: BrandPage}) {
  const copy = ui[page.locale];
  const results = findBrandResults(page);

  return (
    <>
      <Header
        activeKey="chiptuning"
        languagePaths={brandLanguagePaths(page.brand)}
        locale={page.locale}
      />
      <main>
        <section className="relative min-w-0 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <Image
              alt={page.heroImageAlt}
              className="object-cover object-center"
              fill
              priority
              quality={90}
              sizes="100vw"
              src={page.heroImage}
              unoptimized
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.94)_46%,rgba(5,5,5,.58)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(227,6,19,.30),transparent_19rem)]" />
          </div>
          <div className="container relative z-10 flex min-h-[500px] items-end pb-11 pt-24 md:min-h-[620px] md:pb-16">
            <div className="min-w-0 max-w-4xl">
              <nav aria-label="Breadcrumb" className="flex min-w-0 flex-wrap items-center gap-2 text-xs font-black uppercase text-white/55">
                <Link className="transition hover:text-primary" href={pathFor(page.locale, "home")}>{copy.home}</Link>
                <span aria-hidden="true">/</span>
                <Link className="transition hover:text-primary" href={brandPageParentPath(page.locale)}>{copy.parent}</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-primary">{page.brandName}</span>
              </nav>
              <p className="racing-title mt-7 text-lg text-primary md:text-xl">{page.brandName} Performance</p>
              <h1 className="racing-title mt-3 max-w-full text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.88] text-white [overflow-wrap:anywhere]">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 md:text-lg">{page.heroIntro}</p>
              <div className="mt-7 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink className="min-w-0" href={brandPageCatalogUrl}>{page.catalogCta}</ButtonLink>
                <ButtonLink className="min-w-0" href={brandPageWhatsappUrl} icon="whatsapp" variant="outline">
                  {page.whatsappCta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-18">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-primary">{page.brandName} chiptuning</p>
              <h2 className="racing-title mt-3 text-4xl leading-none text-white md:text-6xl">{page.introTitle}</h2>
              <div className="mt-6 space-y-4">
                {page.intro.map((paragraph) => (
                  <p className="text-base leading-8 text-white/70" key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="border-l-2 border-primary bg-black/35 p-5 md:p-6">
              <p className="racing-title text-2xl text-white">NoordTune.nl</p>
              <p className="mt-3 text-sm leading-6 text-white/62">{page.disclaimer}</p>
            </aside>
          </div>
        </section>

        {page.sections.map((section, index) => (
          <section className={index % 2 === 0 ? "border-y border-white/8 bg-white/[0.025]" : ""} key={`${section.eyebrow}-${section.title}`}>
            <div className="container grid min-w-0 gap-7 py-12 md:py-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-primary">{section.eyebrow}</p>
                <h2 className="racing-title mt-3 text-3xl leading-none text-white md:text-5xl [overflow-wrap:anywhere]">{section.title}</h2>
              </div>
              <div className="min-w-0">
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p className="text-base leading-8 text-white/70" key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
                    {section.bullets.map((item) => (
                      <li className="flex min-w-0 gap-3 border border-white/10 bg-black/28 p-4 text-sm leading-6 text-white/74 [overflow-wrap:anywhere]" key={item}>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.links?.length ? (
                  <div className="mt-6 flex min-w-0 flex-wrap gap-3">
                    {section.links.map((link) => (
                      <ButtonLink href={link.href} key={`${link.href}-${link.label}`} variant="outline">{link.label}</ButtonLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}

        <section className="container py-12 md:py-18">
          <SectionHeader align="left" kicker={copy.proof} text={page.resultsIntro} title={page.resultsTitle} />
          <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-2">
            {results.map((result) => <ResultProofCard key={result.id} page={page} result={result} />)}
          </div>
          <div className="mt-7">
            <ButtonLink href={brandPageResultsPath(page.locale)} variant="outline">{copy.allResults}</ButtonLink>
          </div>
        </section>

        <section className="relative min-w-0 overflow-hidden border-y border-primary/25 bg-[#090909]">
          <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(227,6,19,.18),transparent_42%)]" />
          <div className="container relative grid min-w-0 gap-9 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-primary">{copy.catalogKicker}</p>
              <h2 className="racing-title mt-3 text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.92] text-white [overflow-wrap:anywhere]">{page.catalogTitle}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/68">{page.catalogIntro}</p>
              <div className="mt-7 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={brandPageCatalogUrl}>{page.catalogCta}</ButtonLink>
                <ButtonLink href={brandPageWhatsappUrl} icon="whatsapp" variant="outline">{page.whatsappCta}</ButtonLink>
              </div>
            </div>
            <ul className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {page.catalogBullets.map((item) => (
                <li className="flex min-w-0 gap-3 border border-white/10 bg-black/45 p-4 text-sm leading-6 text-white/75 [overflow-wrap:anywhere]" key={item}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <SectionHeader align="left" kicker={copy.relatedKicker} text={page.relatedIntro} title={page.relatedTitle} />
          <div className="mt-7 flex min-w-0 flex-wrap gap-3">
            {page.relatedLinks.map((link) => (
              <ButtonLink href={link.href} key={`${link.href}-${link.label}`} variant="outline">{link.label}</ButtonLink>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <SectionHeader align="center" kicker="FAQ" title={copy.faq} />
          <div className="mx-auto mt-8 max-w-4xl"><FAQ items={page.faq} /></div>
          <p className="mx-auto mt-8 max-w-4xl border-l-2 border-primary pl-5 text-sm leading-7 text-white/55">{page.disclaimer}</p>
        </section>
      </main>
      <Footer locale={page.locale} />
      <FloatingWhatsApp locale={page.locale} />
    </>
  );
}
