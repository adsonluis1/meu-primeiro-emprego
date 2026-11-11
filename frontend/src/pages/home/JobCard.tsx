import { Icon } from "../../components/icon/Icon.tsx"
import { jobActionLabel } from "../../data/home.ts"
import type { Job } from "../../data/home.ts"

function JobHighlights({ highlights }: { highlights: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1 pt-1 font-caption text-caption text-outline">
      {highlights.map((highlight, index) => (
        <span
          key={highlight}
          className="inline-flex max-w-full min-w-0 items-center gap-space-sm"
        >
          {index > 0 ? (
            <span aria-hidden="true" className="shrink-0">
              •
            </span>
          ) : null}
          <span className="min-w-0 break-words">{highlight}</span>
        </span>
      ))}
    </div>
  )
}

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="job-item flex min-w-0 flex-col justify-between gap-space-md p-space-md transition-colors hover:bg-surface sm:p-space-lg md:flex-row md:items-center">
      <div className="flex min-w-0 max-w-[650px] flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 max-w-full font-headline-sm text-headline-sm break-words text-balance text-on-surface">
            {job.title}
          </h3>
          <span className="max-w-full rounded bg-surface-container-high px-2 py-0.5 font-caption text-caption break-words text-primary">
            {job.badge}
          </span>
          <span className="rounded bg-surface-container px-2 py-0.5 font-caption text-caption text-on-surface-variant">
            {job.platform}
          </span>
        </div>
        <p className="font-body-sm text-body-sm break-words text-pretty text-on-surface-variant">
          {job.summary}
        </p>
        <JobHighlights highlights={job.highlights} />
      </div>
      <div className="flex w-full shrink-0 items-center sm:w-auto">
        <a
          href={job.href}
          target="_blank"
          rel="noreferrer"
          className="pressable inline-flex w-full min-w-0 max-w-full items-center justify-center gap-1 rounded-lg bg-surface-container px-space-md py-2.5 font-label-sm text-label-sm text-primary transition-colors hover:bg-primary hover:text-on-primary sm:w-auto"
        >
          <span className="min-w-0 break-words">
            {jobActionLabel(job.platform)}
          </span>
          <Icon name="north_east" className="shrink-0 text-[16px]" />
        </a>
      </div>
    </article>
  )
}
