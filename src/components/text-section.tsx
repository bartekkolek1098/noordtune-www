import Image from "next/image";
import {SectionHeader} from "@/components/section-header";
import type {TextBlock} from "@/content/copy";

export function TextSection({block, reversed = false}: {block: TextBlock; reversed?: boolean}) {
  return (
    <section className="container py-10 md:py-16">
      <div
        className={`grid gap-8 ${
          block.image ? "lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : ""
        }`}
      >
        <div className={reversed ? "lg:order-2" : ""}>
          <SectionHeader kicker={block.kicker} text={block.text} title={block.title} />
          {block.bullets ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {block.bullets.map((item) => (
                <li className="flex items-start gap-3 text-sm leading-6 text-white/72" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {block.image ? (
          <div className={`panel-edge relative min-h-[250px] overflow-hidden rounded-[3px] md:min-h-[300px] ${reversed ? "lg:order-1" : ""}`}>
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={block.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(227,6,19,.17))]" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function TextGrid({blocks}: {blocks: TextBlock[]}) {
  return (
    <section className="container py-10 md:py-16">
      <div className="grid gap-5 lg:grid-cols-3">
        {blocks.map((block) => (
          <article className="panel-edge rounded-[3px] p-6" key={block.title}>
            {block.kicker ? <p className="racing-title mb-2 text-lg text-primary">{block.kicker}</p> : null}
            <h2 className="racing-title text-3xl leading-none text-white">{block.title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/68">{block.text}</p>
            {block.bullets ? (
              <ul className="mt-5 space-y-2">
                {block.bullets.map((item) => (
                  <li className="flex items-center gap-2 text-sm text-white/75" key={item}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
