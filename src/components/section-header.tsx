type SectionHeaderProps = {
  kicker?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeader({kicker, title, text, align = "left"}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {kicker ? (
        <p className="racing-title mb-2 text-lg text-primary md:text-xl">{kicker}</p>
      ) : null}
      <h2 className="racing-title text-3xl leading-[0.95] text-white md:text-5xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-8 text-white/68">{text}</p> : null}
    </div>
  );
}
