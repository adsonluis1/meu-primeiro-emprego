import { getText, pause } from "../http.js"
import { toJob, workplaceOf, type EntryKind, type NewJob } from "../map-job.js"

const ENDPOINT = "https://portal.gupy.io/api/job-search/jobs"
const PAGE_SIZE = 20
const MAX_PER_QUERY = 100

type GupyQuery = {
  kind: EntryKind
  type?: string
  jobName?: string
}

type GupyJob = {
  id: number
  name: string
  description?: string
  careerPageName?: string
  jobUrl?: string
  city?: string | null
  state?: string | null
  workplaceType?: string
}

type GupyPage = {
  data?: GupyJob[]
  pagination?: { total?: number }
}

const QUERIES: readonly GupyQuery[] = [
  { kind: "aprendiz", type: "vacancy_type_apprentice" },
  { kind: "estagio", type: "vacancy_type_internship" },
  { kind: "auxiliar", jobName: "auxiliar" },
  { kind: "primeiro-emprego", jobName: "primeiro emprego" },
]

export async function fetchGupyJobs(): Promise<NewJob[]> {
  const jobs = new Map<string, NewJob>()

  for (const [index, query] of QUERIES.entries()) {
    if (index > 0) await pause()
    for (const job of await fetchQuery(query)) jobs.set(job.sourceId, job)
  }

  return [...jobs.values()]
}

async function fetchQuery(query: GupyQuery): Promise<NewJob[]> {
  const jobs: NewJob[] = []
  let offset = 0
  let total = Number.POSITIVE_INFINITY

  while (offset < total && offset < MAX_PER_QUERY) {
    if (offset > 0) await pause()

    const params = new URLSearchParams({
      state: "Sergipe",
      limit: String(PAGE_SIZE),
      offset: String(offset),
    })
    if (query.type) params.set("type", query.type)
    if (query.jobName) params.set("jobName", query.jobName)

    const page = JSON.parse(await getText(`${ENDPOINT}?${params}`, "application/json")) as GupyPage
    const data = page.data ?? []
    total = page.pagination?.total ?? data.length

    for (const item of data) {
      const job = toJob({
        sourceId: String(item.id),
        title: item.name,
        platform: "Gupy",
        href: item.jobUrl ?? "",
        company: item.careerPageName ?? "",
        city: item.city ?? null,
        stateName: item.state ?? null,
        workplace: workplaceOf(item.workplaceType ?? ""),
        description: item.description,
        kind: query.kind,
        trustedKind: query.kind === "aprendiz" || query.kind === "estagio",
      })
      if (job) jobs.push(job)
    }

    if (data.length === 0) break
    offset += data.length
  }

  return jobs
}
