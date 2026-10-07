import {workshopCopy, workshopEquipment} from "@/content/workshop";
import type {Locale} from "@/content/site";

export function WorkshopEquipment({locale}: {locale: Locale}) {
  const copy = workshopCopy[locale];

  return (
    <section aria-labelledby="workshop-equipment-title" className="container min-w-0 py-8 md:py-12" data-workshop-equipment>
      <div className="panel-edge grid min-w-0 gap-7 rounded-[3px] border-t-2 border-t-primary bg-[#08090a] p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-widest text-primary">{copy.kicker}</p>
          <h2 className="racing-title mt-3 text-2xl leading-tight text-white [overflow-wrap:anywhere] sm:text-3xl xl:text-4xl" id="workshop-equipment-title">{copy.title}</h2>
          <p className="mt-5 text-sm leading-7 text-white/75">{copy.description}</p>
          <p className="mt-4 border-l-2 border-primary/50 pl-4 text-sm leading-7 text-white/65">{copy.value}</p>
        </div>
        <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <ul className="flex min-w-0 flex-wrap gap-2">
            {workshopEquipment.map((name) => (
              <li className="max-w-full rounded-[3px] border border-white/15 bg-white/[0.035] px-3 py-2 text-sm font-semibold text-white/90" key={name}>{name}</li>
            ))}
          </ul>
          <p className="mt-5 text-sm leading-7 text-white/65">{copy.equipment}</p>
        </div>
      </div>
    </section>
  );
}
