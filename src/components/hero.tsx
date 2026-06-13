import Image from "next/image";
import {ButtonLink} from "@/components/button";
import {Icon} from "@/components/icon";
import type {IconName, PageHeroCopy} from "@/content/copy";
import {site} from "@/content/site";

type HeroProps = {
  copy: PageHeroCopy;
  image: string;
  trust: string[];
  features: Array<{title: string; text: string; icon: IconName}>;
};

export function Hero({copy, image, trust, features}: HeroProps) {
  return (
    <section className="noise relative overflow-hidden border-b border-white/10">
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
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.88)_34%,rgba(5,5,5,.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_34%,rgba(227,6,19,.18),transparent_28rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1320px] flex-col justify-end px-[clamp(1rem,4vw,2rem)] pb-8 pt-14 md:min-h-[680px] md:pb-10 md:pt-16">
        <div className="max-w-[720px]">
          <p className="racing-title mb-5 text-lg text-primary md:text-xl">{copy.eyebrow}</p>
          <h1 className="racing-title text-[3rem] leading-[0.88] text-white sm:text-6xl md:text-8xl">
            {copy.title.map((line, index) => (
              <span className={index === 2 ? "block text-primary" : "block"} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/82 md:text-lg">{copy.intro}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href={site.catalogUrl}>{copy.primary}</ButtonLink>
            <ButtonLink href={site.whatsappUrl} icon="whatsapp" variant="outline">
              {copy.secondary}
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {trust.map((item) => (
              <span
                className="rounded-[3px] border border-white/14 bg-black/42 px-3 py-2 text-xs font-black uppercase text-white/80"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#08090a]/92">
        <div className="container grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              className="flex min-h-24 items-center gap-4 border-b border-white/10 px-2 py-4 sm:border-r md:min-h-28 md:py-5 lg:border-b-0"
              key={feature.title}
            >
              <Icon className="h-10 w-10 shrink-0 text-white" name={feature.icon} />
              <div>
                <p className="racing-title text-lg text-white">{feature.title}</p>
                <p className="mt-1 text-sm text-white/60">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
