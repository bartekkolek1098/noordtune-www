import {Icon} from "@/components/icon";
import type {IconName} from "@/content/copy";

type ProcessStepsProps = {
  steps: Array<{title: string; text: string; icon: IconName}>;
};

export function ProcessSteps({steps}: ProcessStepsProps) {
  return (
    <div className="panel-edge grid rounded-[3px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {steps.map((step, index) => (
        <div className="relative border-b border-white/10 p-5 xl:border-b-0 xl:border-r" key={step.title}>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary bg-primary/12 text-sm font-black text-primary">
              {index + 1}
            </span>
            <Icon className="h-7 w-7 text-white" name={step.icon} />
          </div>
          <h3 className="racing-title text-lg text-white">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/62">{step.text}</p>
        </div>
      ))}
    </div>
  );
}
