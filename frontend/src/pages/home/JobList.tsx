import { Fragment } from "react"
import type { Job } from "../../data/home.ts"
import { JobCard } from "./JobCard.tsx"

export function JobList({ jobs }: { jobs: readonly Job[] }) {
  return (
    <div
      id="jobs-container"
      className="flex min-w-0 flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm"
    >
      {jobs.map((job, index) => (
        <Fragment key={job.id}>
          {index > 0 ? (
            <div className="h-[1px] w-full bg-surface-container" />
          ) : null}
          <JobCard job={job} />
        </Fragment>
      ))}
    </div>
  )
}
