import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Icon} from "@/components/icon";
import type {BlogPost, PricingPlan, ServiceCardCopy} from "@/content/copy";
import {blogArticlePathForPost} from "@/content/blog-articles";
import type {CustomerResult} from "@/content/customer-results";
import {pathFor, type Locale} from "@/content/site";

const labels = {
  nl: {
    more: "Meer info",
    featured: "Meest gekozen",
    vat: "incl. btw",
    stock: "Origineel",
    tuned: "Getuned",
    read: "Lees artikel",
    demo: "Indicatief voorbeeld",
    hp: "pk"
  },
  en: {
    more: "More info",
    featured: "Most chosen",
    vat: "incl. VAT",
    stock: "Stock",
    tuned: "Tuned",
    read: "Read article",
    demo: "Indicative example",
    hp: "hp"
  },
  pl: {
    more: "Więcej info",
    featured: "Najczęściej wybierane",
    vat: "z VAT",
    stock: "Seryjnie",
    tuned: "Po tuningu",
    read: "Czytaj",
    demo: "Przykład orientacyjny",
    hp: "KM"
  }
} satisfies Record<Locale, Record<string, string>>;

export function ServiceCard({service, locale}: {service: ServiceCardCopy; locale: Locale}) {
  const href = service.page ? pathFor(locale, service.page) : "#";
  const copy = labels[locale];
  return (
    <article className="group panel-edge overflow-hidden rounded-[3px] transition hover:border-primary/70 hover:shadow-glow">
      <div className="relative h-40 overflow-hidden">
        <Image
          alt=""
          className="object-cover transition duration-500 group-hover:scale-105"
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          src={service.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/28 to-transparent" />
      </div>
      <div className="relative p-5">
        <div className="-mt-12 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[3px] border border-primary/60 bg-primary text-white shadow-glow">
          <Icon className="h-6 w-6" name={service.icon} />
        </div>
        <h3 className="racing-title text-2xl text-white">{service.title}</h3>
        <p className="mt-2 min-h-16 text-sm leading-6 text-white/68">{service.text}</p>
        <ul className="mt-4 space-y-2">
          {service.bullets.map((item) => (
            <li className="flex items-center gap-2 text-sm text-white/75" key={item}>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
        <Link
          className="mt-5 inline-flex items-center gap-2 border-b border-primary/70 pb-1 text-sm font-black uppercase text-white transition group-hover:text-primary"
          href={href}
        >
          {copy.more} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function PricingCard({plan, locale}: {plan: PricingPlan; locale: Locale}) {
  const copy = labels[locale];
  return (
    <article
      className={`panel-edge relative flex min-h-full flex-col rounded-[3px] p-6 ${
        plan.highlighted ? "border-primary/70 shadow-glow" : ""
      }`}
    >
      {plan.highlighted ? (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-primary px-3 py-1 text-[0.65rem] font-black uppercase">
          {copy.featured}
        </span>
      ) : null}
      <h3 className="racing-title text-2xl text-white">{plan.name}</h3>
      <p className="mt-4 text-sm text-white/58">{plan.note}</p>
      <p className="racing-title mt-1 text-5xl text-white">{plan.price}</p>
      <p className="mt-1 text-xs text-white/50">{copy.vat}</p>
      <p className="mt-5 text-sm leading-6 text-white/68">{plan.text}</p>
      <ul className="mt-5 space-y-2">
        {plan.features.map((feature) => (
          <li className="flex items-center gap-2 text-sm text-white/75" key={feature}>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ResultCardView({result, locale}: {result: CustomerResult; locale: Locale}) {
  const copy = labels[locale];
  const image = result.images[0] ?? "/images/sections/ford-sid212-obd.webp";
  const car = `${result.vehicleMake} ${result.vehicleModel}`;
  const stock = `${result.stockPowerHp} ${copy.hp} / ${result.stockTorqueNm} Nm`;
  const tuned = `${result.tunedPowerHp} ${copy.hp} / ${result.tunedTorqueNm} Nm`;
  const gain = `+${result.gainPowerHp} ${copy.hp}`;

  return (
    <article className="panel-edge overflow-hidden rounded-[3px]">
      <div className="relative h-36 border-b border-white/10 bg-black/35">
        <Image
          alt=""
          className="object-cover opacity-85"
          fill
          sizes="(min-width:1024px) 25vw, 100vw"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0b] via-black/25 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-[3px] border border-white/15 bg-black/60 px-3 py-1 text-[0.65rem] font-black uppercase text-white/70">
          {result.customerApproved ? result.serviceType : copy.demo}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase text-primary">{result.stage}</p>
            <h3 className="racing-title mt-1 text-3xl text-white">{car}</h3>
            <p className="mt-1 text-xs font-semibold uppercase text-white/45">{result.vehicleEngine}</p>
          </div>
          <span className="rounded-[3px] border border-primary/50 bg-primary/15 px-3 py-2 text-sm font-black text-primary">
            {gain}
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="border border-white/10 bg-black/28 p-3">
            <p className="text-xs uppercase text-white/45">{copy.stock}</p>
            <p className="mt-1 font-semibold text-white">{stock}</p>
          </div>
          <div className="border border-primary/25 bg-primary/10 p-3">
            <p className="text-xs uppercase text-white/45">{copy.tuned}</p>
            <p className="mt-1 font-semibold text-white">{tuned}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-white/65">{result.shortDescription}</p>
        <p className="mt-3 text-xs leading-5 text-white/42">{result.disclaimer}</p>
      </div>
    </article>
  );
}

export function BlogCard({post, locale}: {post: BlogPost; locale: Locale}) {
  const copy = labels[locale];
  return (
    <Link
      aria-label={`${copy.read}: ${post.title}`}
      className="group panel-edge flex min-h-full flex-col rounded-[3px] p-5 transition hover:border-primary/70 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      data-article-slug={post.slug}
      href={blogArticlePathForPost(locale, post.slug)}
    >
      <div className="flex items-center justify-between gap-3 text-xs uppercase text-white/45">
        <span className="font-black text-primary">{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="racing-title mt-4 text-2xl leading-none text-white transition group-hover:text-primary">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-white/66">{post.excerpt}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase text-white">
        {copy.read} <ArrowRight className="h-4 w-4 text-primary" />
      </span>
    </Link>
  );
}
