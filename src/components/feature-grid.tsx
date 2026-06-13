import {Icon} from "@/components/icon";
import {SectionHeader} from "@/components/section-header";
import type {IconName} from "@/content/copy";

type FeatureGridProps = {
  kicker?: string;
  title: string;
  text?: string;
  items: Array<{title: string; text: string; icon: IconName}>;
};

export function FeatureGrid({kicker, title, text, items}: FeatureGridProps) {
  return (
    <section className="container py-12 md:py-16">
      <SectionHeader align="center" kicker={kicker} text={text} title={title} />
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <article className="border-r border-white/10 px-4 text-center last:border-r-0" key={item.title}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center text-white">
              <Icon className="h-9 w-9" name={item.icon} />
            </div>
            <h3 className="racing-title mt-4 text-xl text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
