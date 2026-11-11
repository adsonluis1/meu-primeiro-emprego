import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { fetchJobs } from "../../api/jobs.ts"
import type { JobSearch } from "../../api/jobs.ts"
import { jobsIntro } from "../../data/home.ts"
import type { Job } from "../../data/home.ts"
import { EmptyJobs } from "./EmptyJobs.tsx"
import { initialJobFilters, jobsResultLabel } from "./filterJobs.ts"
import { JobFilters } from "./JobFilters.tsx"
import { JobList } from "./JobList.tsx"

type LoadStatus = "loading" | "ready" | "error"
type MoreStatus = "idle" | "loading" | "error"

type FeedSummary = {
  key: string
  status: LoadStatus
  total: number
  cities: readonly string[]
}

type FeedUpdate = {
  key: string
  status: LoadStatus
  total: number
  cities?: readonly string[]
}

const queryDelayMs = 300

export function JobsSection() {
  const [filters, setFilters] = useState(initialJobFilters)
  const query = useDebouncedQuery(filters.query, queryDelayMs)
  const search = useMemo<JobSearch>(
    () => ({
      query,
      location: filters.location,
      modality: filters.modality,
      platform: filters.platform,
    }),
    [query, filters.location, filters.modality, filters.platform],
  )
  const searchKey = JSON.stringify(search)
  const [summary, setSummary] = useState<FeedSummary>({
    key: searchKey,
    status: "loading",
    total: 0,
    cities: [],
  })
  const report = useCallback((update: FeedUpdate) => {
    setSummary((current) => ({
      key: update.key,
      status: update.status,
      total: update.total,
      cities: update.cities ?? current.cities,
    }))
  }, [])

  const visible =
    summary.key === searchKey
      ? summary
      : { status: "loading" as const, total: 0, cities: summary.cities }

  function clearFilters() {
    setFilters(initialJobFilters)
  }

  return (
    <section
      id={jobsIntro.sectionId}
      className="defer-section w-full min-w-0 scroll-mt-16 bg-surface-container-low py-space-xl"
    >
      <div className="mx-auto flex min-w-0 max-w-[1040px] flex-col gap-space-md px-margin">
        <div className="flex min-w-0 flex-col justify-between gap-space-xs sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-0">
            <span className="font-label-sm text-label-sm font-semibold tracking-wider text-primary uppercase">
              {jobsIntro.kicker}
            </span>
            <h2 className="font-headline-lg text-headline-lg break-words text-balance text-on-surface">
              {jobsIntro.title}
            </h2>
          </div>
          <div className="min-w-0 max-w-full sm:text-right">
            <p
              id="vagas-count"
              role="status"
              className="inline-block max-w-full rounded bg-surface-container px-space-sm py-1 font-caption text-caption text-on-surface-variant"
            >
              {statusLabel(visible.status, visible.total)}
            </p>
          </div>
        </div>
        <JobFilters
          cities={visible.cities}
          filters={filters}
          onQueryChange={(value) =>
            setFilters((current) => ({ ...current, query: value }))
          }
          onLocationChange={(location) =>
            setFilters((current) => ({ ...current, location }))
          }
          onModalityChange={(modality) =>
            setFilters((current) => ({ ...current, modality }))
          }
          onPlatformChange={(platform) =>
            setFilters((current) => ({ ...current, platform }))
          }
        />
        <JobsFeed
          key={searchKey}
          search={search}
          searchKey={searchKey}
          onSummary={report}
          onClear={clearFilters}
        />
        <div className="flex w-full min-w-0 flex-wrap items-start justify-between gap-x-space-md gap-y-space-xs pt-space-xs font-caption text-caption text-on-surface-variant">
          <span className="min-w-0 max-w-full break-words">
            {jobsIntro.dailyNote}
          </span>
          <span className="max-w-full break-words">{jobsIntro.freeNote}</span>
        </div>
      </div>
    </section>
  )
}

function JobsFeed({
  search,
  searchKey,
  onSummary,
  onClear,
}: {
  search: JobSearch
  searchKey: string
  onSummary: (update: FeedUpdate) => void
  onClear: () => void
}) {
  const [jobs, setJobs] = useState<readonly Job[]>([])
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [status, setStatus] = useState<LoadStatus>("loading")
  const [moreStatus, setMoreStatus] = useState<MoreStatus>("idle")
  const sentinelRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<AbortController | null>(null)
  const loadingMoreRef = useRef(false)
  const blockMoreRef = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    requestRef.current?.abort()
    requestRef.current = controller

    fetchJobs(search, controller.signal)
      .then((page) => {
        if (controller.signal.aborted) return
        setJobs(page.jobs)
        setNextCursor(page.nextCursor)
        setStatus("ready")
        onSummary({
          key: searchKey,
          status: "ready",
          total: page.total,
          cities: page.cities,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return
        setStatus("error")
        onSummary({ key: searchKey, status: "error", total: 0 })
      })

    return () => {
      controller.abort()
      requestRef.current?.abort()
    }
  }, [search, searchKey, onSummary])

  const loadMore = useCallback(() => {
    if (!nextCursor || loadingMoreRef.current || blockMoreRef.current) return

    const controller = new AbortController()
    requestRef.current?.abort()
    requestRef.current = controller
    loadingMoreRef.current = true
    setMoreStatus("loading")

    fetchJobs({ ...search, cursor: nextCursor }, controller.signal)
      .then((page) => {
        if (controller.signal.aborted) return
        setJobs((current) => appendJobs(current, page.jobs))
        setNextCursor(page.nextCursor)
        setMoreStatus("idle")
        onSummary({
          key: searchKey,
          status: "ready",
          total: page.total,
          cities: page.cities,
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return
        blockMoreRef.current = true
        setMoreStatus("error")
      })
      .finally(() => {
        if (controller.signal.aborted) return
        loadingMoreRef.current = false
      })
  }, [nextCursor, onSummary, search, searchKey])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || status !== "ready" || nextCursor === null || moreStatus !== "idle") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        loadMore()
      },
      { rootMargin: "200px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [status, nextCursor, moreStatus, loadMore])

  function retryMore() {
    blockMoreRef.current = false
    loadMore()
  }

  if (status === "loading") return null
  if (status === "error") {
    return (
      <p className="rounded-xl bg-surface-container-lowest p-space-xl text-center font-body-sm text-body-sm text-on-surface-variant shadow-sm">
        {jobsIntro.loadError}
      </p>
    )
  }
  if (jobs.length === 0) return <EmptyJobs onClear={onClear} />

  return (
    <div className="flex min-w-0 flex-col gap-space-sm">
      <JobList jobs={jobs} />
      {moreStatus === "loading" ? (
        <p
          role="status"
          className="text-center font-caption text-caption text-on-surface-variant"
        >
          {jobsIntro.loadingLabel}
        </p>
      ) : null}
      {moreStatus === "error" ? (
        <div className="flex flex-col items-center gap-space-xs rounded-xl bg-surface-container-lowest p-space-md text-center shadow-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {jobsIntro.loadError}
          </p>
          <button
            type="button"
            className="pressable font-label-sm text-label-sm text-primary underline"
            onClick={retryMore}
          >
            {jobsIntro.retryLabel}
          </button>
        </div>
      ) : null}
      {nextCursor !== null ? (
        <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      ) : null}
    </div>
  )
}

function useDebouncedQuery(value: string, delayMs: number) {
  const [debounced, setDebounced] = useState(value)
  if (value.trim() === "" && debounced !== "") setDebounced("")

  useEffect(() => {
    if (value.trim() === "") return
    const timeout = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return value.trim() === "" ? "" : debounced
}

function appendJobs(current: readonly Job[], incoming: readonly Job[]) {
  const seen = new Set(current.map((job) => job.id))
  const next = [...current]
  for (const job of incoming) {
    if (seen.has(job.id)) continue
    seen.add(job.id)
    next.push(job)
  }
  return next
}

function statusLabel(status: LoadStatus, count: number) {
  if (status === "loading") return jobsIntro.loadingLabel
  if (status === "error") return jobsIntro.loadError
  return jobsResultLabel(count)
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError"
}
