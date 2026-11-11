import { Icon } from "../../components/icon/Icon.tsx"
import { jobsIntro } from "../../data/home.ts"

export function EmptyJobs({ onClear }: { onClear: () => void }) {
  return (
    <div
      id="no-jobs-state"
      className="flex w-full min-w-0 flex-col items-center gap-space-sm rounded-xl bg-surface-container-lowest p-space-xl text-center shadow-sm"
    >
      <Icon name="manage_search" className="text-[32px] text-outline" />
      <h3 className="max-w-full font-headline-sm text-headline-sm break-words text-balance text-on-surface">
        {jobsIntro.emptyTitle}
      </h3>
      <p className="w-full max-w-[420px] font-body-sm text-body-sm text-pretty text-on-surface-variant">
        {jobsIntro.emptyBody}
      </p>
      <button
        id="reset-filters-btn"
        type="button"
        className="pressable mt-space-xs font-label-sm text-label-sm text-primary underline"
        onClick={onClear}
      >
        {jobsIntro.clearLabel}
      </button>
    </div>
  )
}
