import { howItWorks } from "../../data/home.ts"

type Step = (typeof howItWorks.steps)[number]

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex min-w-0 flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-col gap-space-sm">
        <span className="font-display-hero text-display-hero text-primary/30">
          {step.number}
        </span>
        <h3 className="font-headline-sm text-headline-sm break-words text-balance text-on-surface">
          {step.title}
        </h3>
        <p className="font-body-sm text-body-sm text-pretty text-on-surface-variant">
          {step.body}
        </p>
      </div>
      <div className="mt-space-md flex items-center pt-space-sm font-caption text-caption text-primary">
        <span className="min-w-0 break-words">{step.note}</span>
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section className="defer-section w-full min-w-0 bg-surface py-space-xl">
      <div className="mx-auto min-w-0 max-w-[1040px] px-margin">
        <div className="flex flex-col gap-space-xs pb-space-lg">
          <span className="font-label-sm text-label-sm font-semibold tracking-wider text-primary uppercase">
            {howItWorks.kicker}
          </span>
          <h2 className="font-headline-lg text-headline-lg break-words text-balance text-on-surface">
            {howItWorks.title}
          </h2>
          <p className="max-w-[680px] font-body-md text-body-md text-pretty text-on-surface-variant">
            {howItWorks.body}
          </p>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-space-lg md:grid-cols-3">
          {howItWorks.steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}
