import type { VideoFilter } from "../../data/videos.ts"
import { videoFilters } from "../../data/videos.ts"

const chipClass =
  "pressable max-w-full rounded-full px-space-md py-space-xs text-left font-label-md text-label-md whitespace-normal transition-colors duration-150"

type FilterChipProps = {
  label: VideoFilter
  pressed: boolean
  onSelect: (filter: VideoFilter) => void
}

function FilterChip({ label, pressed, onSelect }: FilterChipProps) {
  const stateClass = pressed
    ? "bg-primary-container font-semibold text-on-primary"
    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"

  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={`${chipClass} ${stateClass}`}
      onClick={() => {
        onSelect(label)
      }}
    >
      {label}
    </button>
  )
}

type VideoFiltersProps = {
  active: VideoFilter
  onSelect: (filter: VideoFilter) => void
}

export function VideoFilters({ active, onSelect }: VideoFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar conteúdos por categoria"
      className="mb-space-xl flex flex-wrap gap-space-sm"
    >
      {videoFilters.map((label) => (
        <FilterChip
          key={label}
          label={label}
          pressed={label === active}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
