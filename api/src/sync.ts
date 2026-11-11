import { upsertJobs, type Database } from "./db.js"
import { fetchGupyJobs } from "./sources/gupy.js"
import { fetchLinkedInJobs } from "./sources/linkedin.js"

export type SourceReport = { ok: true; fetched: number } | { ok: false; error: string }

export type SyncReport = {
  inserted: number
  updated: number
  sources: {
    gupy: SourceReport
    linkedin: SourceReport
  }
}

let current: Promise<SyncReport> | null = null

export function syncJobs(db: Database): Promise<SyncReport> {
  if (current) return current
  current = runSync(db).finally(() => {
    current = null
  })
  return current
}

async function runSync(db: Database): Promise<SyncReport> {
  const report: SyncReport = {
    inserted: 0,
    updated: 0,
    sources: {
      gupy: { ok: false, error: "Fonte não consultada" },
      linkedin: { ok: false, error: "Fonte não consultada" },
    },
  }

  await collect(db, report, "gupy", fetchGupyJobs)
  await collect(db, report, "linkedin", fetchLinkedInJobs)
  return report
}

async function collect(
  db: Database,
  report: SyncReport,
  source: "gupy" | "linkedin",
  fetchJobs: () => Promise<Parameters<typeof upsertJobs>[1]>,
): Promise<void> {
  try {
    const jobs = await fetchJobs()
    const counts = await upsertJobs(db, jobs)
    report.inserted += counts.inserted
    report.updated += counts.updated
    report.sources[source] = { ok: true, fetched: jobs.length }
  } catch (error) {
    report.sources[source] = {
      ok: false,
      error: error instanceof Error ? error.message : "Falha ao buscar vagas",
    }
  }
}
