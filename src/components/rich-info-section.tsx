import {ArrowRight, CheckCircle2} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {ButtonLink} from "@/components/button";
import {site} from "@/content/site";

type Stat = {
  value: string;
  label: string;
};

type LinkItem = {
  label: string;
  href: string;
};

type RichInfoSectionProps = {
  kicker?: string;
  title: string;
  text: string;
  bullets?: string[];
  stats?: Stat[];
  image: string;
  imageAlt?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  links?: LinkItem[];
  reversed?: boolean;
};

export function RichInfoSection({
  kicker,
  title,
  text,
  bullets,
  stats,
  image,
  imageAlt = "",
  primaryLabel,
  primaryHref = site.whatsappUrl,
  secondaryLabel,
  secondaryHref = site.catalogUrl,
  links,
  reversed = false
}: RichInfoSectionProps) {
  return (
    <section className="container py-9 md:py-14">
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <div className={`panel-edge rounded-[3px] p-6 md:p-8 ${reversed ? "lg:order-2" : ""}`}>
          {kicker ? <p className="racing-title text-lg text-primary">{kicker}</p> : null}
          <h2 className="racing-title mt-2 text-3xl leading-[0.93] text-white sm:text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 text-sm leading-7 text-white/70 md:text-base">{text}</p>

          {bullets ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <li className="flex items-start gap-3 text-sm leading-6 text-white/75" key={item}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {stats ? (
            <div className="mt-7 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div className="border border-white/10 bg-black/36 p-4" key={stat.label}>
                  <p className="racing-title text-3xl text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}

          {links ? (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {links.map((item) => (
                <Link
                  className="group inline-flex items-center justify-between gap-3 border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold text-white/78 transition hover:border-primary/60 hover:text-white"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          ) : null}

          {primaryLabel || secondaryLabel ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {primaryLabel ? <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink> : null}
              {secondaryLabel ? (
                <ButtonLink href={secondaryHref} icon={secondaryHref === site.whatsappUrl ? "whatsapp" : "arrow"} variant="outline">
                  {secondaryLabel}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className={`panel-edge relative min-h-[260px] overflow-hidden rounded-[3px] md:min-h-[460px] ${reversed ? "lg:order-1" : ""}`}>
          <Image
            alt={imageAlt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            src={image}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,5,5,.12),rgba(227,6,19,.22))]" />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
