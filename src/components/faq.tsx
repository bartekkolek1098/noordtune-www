import type {FaqItem} from "@/content/copy";

type FAQProps = {
  items: FaqItem[];
};

export function FAQ({items}: FAQProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <details
          className="group panel-edge rounded-[3px] px-5 py-4 open:border-primary/55"
          key={item.question}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-semibold text-white">
            <span>{item.question}</span>
            <span className="text-2xl font-light text-white/70 transition group-open:rotate-45 group-open:text-primary">
              +
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-white/65">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
