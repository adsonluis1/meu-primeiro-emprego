import { Icon } from "../../components/icon/Icon.tsx"
import { allLocationsLabel, modalities, platforms } from "../../data/home.ts"
import { readLocation, readModality, readPlatform } from "./filterJobs.ts"
import type { JobFilterState } from "./filterJobs.ts"

type JobFiltersProps = {
  cities: readonly string[]
  filters: JobFilterState
  onQueryChange: (query: string) => void
  onLocationChange: (location: JobFilterState["location"]) => void
  onModalityChange: (modality: JobFilterState["modality"]) => void
  onPlatformChange: (platform: JobFilterState["platform"]) => void
}

type SearchFilterProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

type SelectFilterProps = {
  id: string
  label: string
  icon: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
}

const controlClassName =
  "h-10 w-full min-w-0 max-w-full rounded-lg bg-surface font-body-sm text-body-sm text-on-surface"

function SearchFilter({ id, label, value, onChange }: SearchFilterProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        htmlFor={id}
        className="font-caption text-caption text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative flex min-w-0 items-center">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 text-[18px] text-outline"
        />
        <input
          id={id}
          type="text"
          value={value}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClassName} pr-3 pl-9`}
        />
      </div>
    </div>
  )
}

function SelectFilter({
  id,
  label,
  icon,
  value,
  options,
  onChange,
}: SelectFilterProps) {
  const allLabel = options[0]
  const choices = options.slice(1)

  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        htmlFor={id}
        className="font-caption text-caption text-on-surface-variant"
      >
        {label}
      </label>
      <div className="relative flex min-w-0 items-center">
        <Icon
          name={icon}
          className="pointer-events-none absolute left-3 text-[18px] text-outline"
        />
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${controlClassName} cursor-pointer appearance-none truncate pr-8 pl-9`}
        >
          <option value="">{allLabel}</option>
          {choices.map((choice) => (
            <option key={choice} value={choice}>
              {choice}
            </option>
          ))}
        </select>
        <Icon
          name="expand_more"
          className="pointer-events-none absolute right-2 text-[18px] text-outline"
        />
      </div>
    </div>
  )
}

export function JobFilters({
  cities,
  filters,
  onQueryChange,
  onLocationChange,
  onModalityChange,
  onPlatformChange,
}: JobFiltersProps) {
  return (
    <div className="flex min-w-0 flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
      <div className="grid w-full min-w-0 grid-cols-1 gap-space-sm sm:grid-cols-2 lg:grid-cols-4">
        <SearchFilter
          id="filter-search"
          label="Cargo ou área"
          value={filters.query}
          onChange={onQueryChange}
        />
        <SelectFilter
          id="filter-location"
          label="Localização"
          icon="location_on"
          value={filters.location}
          options={[allLocationsLabel, ...cities]}
          onChange={(value) => onLocationChange(readLocation(value, cities))}
        />
        <SelectFilter
          id="filter-mode"
          label="Modalidade"
          icon="work"
          value={filters.modality}
          options={modalities}
          onChange={(value) => onModalityChange(readModality(value))}
        />
        <SelectFilter
          id="filter-platform"
          label="Plataforma"
          icon="open_in_new"
          value={filters.platform}
          options={platforms}
          onChange={(value) => onPlatformChange(readPlatform(value))}
        />
      </div>
    </div>
  )
}
