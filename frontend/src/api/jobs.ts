import type { Job, JobModality, JobPlatform } from "../data/home.ts"

const platforms = new Set<string>(["LinkedIn", "Gupy"])
const modalities = new Set<string>(["Presencial", "Híbrido", "100% Remoto"])

export type JobSearch = {
  query: string
  location: string
  modality: string
  platform: string
  cursor?: string
}

export type JobPage = {
  jobs: Job[]
  total: number
  nextCursor: string | null
  cities: string[]
}

export async function fetchJobs(search: JobSearch, signal: AbortSignal): Promise<JobPage> {
  const response = await fetch(`/api/jobs${jobSearchParams(search)}`, { signal })
  if (!response.ok) throw new Error("Falha ao carregar vagas")

  const page = readPage(await response.json())
  if (!page) throw new Error("Falha ao carregar vagas")
  return page
}

function jobSearchParams(search: JobSearch): string {
  const params = new URLSearchParams()
  const query = search.query.trim()
  if (query) params.set("q", query)
  if (search.location) params.set("city", search.location)
  if (search.modality) params.set("modality", search.modality)
  if (search.platform) params.set("platform", search.platform)
  if (search.cursor) params.set("cursor", search.cursor)
  const text = params.toString()
  return text.length > 0 ? `?${text}` : ""
}

function readPage(value: unknown): JobPage | null {
  if (!isRecord(value) || !Array.isArray(value.jobs) || !Array.isArray(value.cities)) return null
  const nextCursor = readCursor(value.nextCursor)
  if (typeof value.total !== "number" || !Number.isInteger(value.total) || value.total < 0) return null
  if (nextCursor === undefined) return null

  const jobs: Job[] = []
  for (const item of value.jobs) {
    const job = readJob(item)
    if (job) jobs.push(job)
  }

  const cities: string[] = []
  for (const item of value.cities) {
    const city = readText(item)
    if (!city) return null
    cities.push(city)
  }

  return {
    jobs,
    total: value.total,
    nextCursor,
    cities,
  }
}

function readCursor(value: unknown): string | null | undefined {
  if (value === null) return null
  if (typeof value === "string" && value.length > 0) return value
  return undefined
}

function readJob(value: unknown): Job | null {
  if (!isRecord(value)) return null

  const id = readText(value.id)
  const title = readText(value.title)
  const badge = readText(value.badge)
  const href = readText(value.href)
  const summary = readText(value.summary)
  const platform = readPlatform(value.platform)
  const modality = readModality(value.modality)
  const highlights = readHighlights(value.highlights)
  if (
    !id ||
    !title ||
    !badge ||
    !href ||
    !summary ||
    !platform ||
    !modality ||
    !highlights
  ) {
    return null
  }

  return {
    id,
    title,
    badge,
    platform,
    href,
    summary,
    highlights,
    city: readOptionalText(value.city),
    state: readOptionalText(value.state),
    modality,
  }
}

function readPlatform(value: unknown): JobPlatform | null {
  return isPlatform(value) ? value : null
}

function readModality(value: unknown): JobModality | null {
  return isModality(value) ? value : null
}

function isPlatform(value: unknown): value is JobPlatform {
  return typeof value === "string" && platforms.has(value)
}

function isModality(value: unknown): value is JobModality {
  return typeof value === "string" && modalities.has(value)
}

function readHighlights(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null
  const highlights: string[] = []
  for (const item of value) {
    const text = readText(item)
    if (!text) return null
    highlights.push(text)
  }
  return highlights
}

function readText(value: unknown): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function readOptionalText(value: unknown): string | null {
  if (value == null) return null
  return readText(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}
