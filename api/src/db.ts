import { randomUUID } from "node:crypto"
import { createClient, type Client, type InStatement, type Row } from "@libsql/client"

import type { Job, Modality, NewJob, Platform } from "./map-job.js"

const PAGE_SIZE = 12

export type Database = Client

export type JobCursor = {
  title: string
  id: string
}

export type JobPage = {
  jobs: Job[]
  total: number
  nextCursor: string | null
  cities: string[]
}

export type JobQuery = {
  city?: string
  modality?: Modality
  platform?: Platform
  q?: string
  cursor?: JobCursor
}

type JobRow = {
  id: string
  title: string
  badge: string
  platform: Platform
  href: string
  summary: string
  city: string | null
  state: string | null
  modality: Modality
  position: number | null
  text: string | null
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS jobs (
  id         TEXT PRIMARY KEY,
  source_id  TEXT NOT NULL,
  title      TEXT NOT NULL,
  badge      TEXT NOT NULL,
  platform   TEXT NOT NULL CHECK (platform IN ('LinkedIn', 'Gupy')),
  href       TEXT NOT NULL,
  summary    TEXT NOT NULL,
  city       TEXT,
  state      TEXT CHECK (state IS NULL OR length(state) = 2),
  modality   TEXT NOT NULL CHECK (modality IN ('Presencial', 'Híbrido', '100% Remoto')),
  synced_at  TEXT NOT NULL,
  UNIQUE (platform, source_id)
);

CREATE TABLE IF NOT EXISTS job_highlights (
  job_id    TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,
  text      TEXT NOT NULL,
  PRIMARY KEY (job_id, position)
);
`

const UPSERT_JOB = `
INSERT INTO jobs (
  id, source_id, title, badge, platform, href, summary, city, state, modality, synced_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(platform, source_id) DO UPDATE SET
  title = excluded.title,
  badge = excluded.badge,
  href = excluded.href,
  summary = excluded.summary,
  city = excluded.city,
  state = excluded.state,
  modality = excluded.modality,
  synced_at = excluded.synced_at
`

export async function openDatabase(): Promise<Database> {
  const url = process.env.TURSO_DATABASE_URL?.trim()
  const authToken = process.env.TURSO_AUTH_TOKEN?.trim()
  if (!url || !authToken) {
    throw new Error("Defina TURSO_DATABASE_URL e TURSO_AUTH_TOKEN para conectar ao banco remoto.")
  }

  const db = createClient({ url, authToken })
  await db.executeMultiple(SCHEMA)
  return db
}

export async function upsertJobs(
  db: Database,
  jobs: readonly NewJob[],
): Promise<{ inserted: number; updated: number }> {
  const unique = new Map<string, NewJob>()
  for (const job of jobs) unique.set(`${job.platform}:${job.sourceId}`, job)
  if (unique.size === 0) return { inserted: 0, updated: 0 }

  const existing = await db.execute("SELECT id, platform, source_id FROM jobs")
  const ids = new Map<string, string>()
  for (const row of existing.rows) {
    const id = readText(row, "id")
    const platform = readText(row, "platform")
    const sourceId = readText(row, "source_id")
    if (id && platform && sourceId) ids.set(`${platform}:${sourceId}`, id)
  }

  let inserted = 0
  let updated = 0
  const syncedAt = new Date().toISOString()
  const statements: InStatement[] = []

  for (const job of unique.values()) {
    const key = `${job.platform}:${job.sourceId}`
    const currentId = ids.get(key)
    const id = currentId ?? randomUUID()
    if (currentId) updated += 1
    else inserted += 1

    statements.push({
      sql: UPSERT_JOB,
      args: [
        id,
        text(job.sourceId),
        text(job.title),
        text(job.badge),
        job.platform,
        text(job.href),
        text(job.summary),
        text(job.city),
        text(job.state),
        job.modality,
        syncedAt,
      ],
    })
    statements.push({
      sql: "DELETE FROM job_highlights WHERE job_id = ?",
      args: [id],
    })
    job.highlights.forEach((highlight, position) => {
      statements.push({
        sql: "INSERT INTO job_highlights (job_id, position, text) VALUES (?, ?, ?)",
        args: [id, position, text(highlight)],
      })
    })
  }

  await db.batch(statements, "write")
  return { inserted, updated }
}

export function readJobCursor(value: string): JobCursor | undefined {
  try {
    const parsed: unknown = JSON.parse(Buffer.from(value, "base64url").toString("utf8"))
    if (!isJobCursor(parsed)) return undefined
    return parsed
  } catch {
    return undefined
  }
}

export async function listJobs(db: Database, query: JobQuery): Promise<JobPage> {
  const filtered = jobFilter(query)
  const page = jobFilter(query, query.cursor)
  const [total, result, cities] = await Promise.all([
    countJobs(db, filtered),
    db.execute({
      sql: `
        WITH page AS (
          SELECT j.id
          FROM jobs j
          ${page.where}
          ORDER BY j.title, j.id
          LIMIT ?
        )
        SELECT j.id, j.title, j.badge, j.platform, j.href, j.summary, j.city, j.state, j.modality,
               h.position, h.text
        FROM page p
        JOIN jobs j ON j.id = p.id
        LEFT JOIN job_highlights h ON h.job_id = j.id
        ORDER BY j.title, j.id, h.position
      `,
      args: [...page.params, PAGE_SIZE + 1],
    }),
    listCities(db),
  ])

  const folded = foldJobs(readJobRows(result.rows))
  const hasMore = folded.length > PAGE_SIZE
  const jobs = hasMore ? folded.slice(0, PAGE_SIZE) : folded
  const last = jobs.at(-1)

  return {
    jobs,
    total,
    nextCursor: hasMore && last ? writeJobCursor(last) : null,
    cities,
  }
}

export async function getJob(db: Database, id: string): Promise<Job | undefined> {
  const result = await db.execute({
    sql: `
      SELECT j.id, j.title, j.badge, j.platform, j.href, j.summary, j.city, j.state, j.modality,
             h.position, h.text
      FROM jobs j
      LEFT JOIN job_highlights h ON h.job_id = j.id
      WHERE j.id = ?
      ORDER BY h.position
    `,
    args: [id],
  })

  return foldJobs(readJobRows(result.rows))[0]
}

type SqlFilter = {
  where: string
  params: string[]
}

function jobFilter(query: JobQuery, cursor?: JobCursor): SqlFilter {
  const filters: string[] = []
  const params: string[] = []

  if (query.city) {
    filters.push("j.city = ? COLLATE NOCASE")
    params.push(query.city)
  }
  if (query.modality) {
    filters.push("j.modality = ?")
    params.push(query.modality)
  }
  if (query.platform) {
    filters.push("j.platform = ?")
    params.push(query.platform)
  }
  if (query.q) {
    filters.push(
      `(j.title LIKE ? ESCAPE '\\' COLLATE NOCASE OR j.summary LIKE ? ESCAPE '\\' COLLATE NOCASE OR j.badge LIKE ? ESCAPE '\\' COLLATE NOCASE OR j.city LIKE ? ESCAPE '\\' COLLATE NOCASE OR EXISTS (SELECT 1 FROM job_highlights hq WHERE hq.job_id = j.id AND hq.text LIKE ? ESCAPE '\\' COLLATE NOCASE))`,
    )
    const pattern = `%${escapeLike(query.q)}%`
    params.push(pattern, pattern, pattern, pattern, pattern)
  }
  if (cursor) {
    filters.push("(j.title > ? OR (j.title = ? AND j.id > ?))")
    params.push(cursor.title, cursor.title, cursor.id)
  }

  return {
    where: filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "",
    params,
  }
}

async function countJobs(db: Database, filter: SqlFilter): Promise<number> {
  const result = await db.execute({
    sql: `SELECT COUNT(*) AS total FROM jobs j ${filter.where}`,
    args: filter.params,
  })
  const total = result.rows[0]?.total
  if (typeof total === "number" && Number.isFinite(total)) return total
  if (typeof total === "bigint") return Number(total)
  return 0
}

async function listCities(db: Database): Promise<string[]> {
  const result = await db.execute(
    "SELECT DISTINCT city AS city FROM jobs WHERE city IS NOT NULL AND city <> ''",
  )

  const cities: string[] = []
  for (const row of result.rows) {
    const city = readText(row, "city")
    if (city && city.trim() !== "") cities.push(city)
  }
  cities.sort((left, right) => left.localeCompare(right, "pt-BR"))
  return cities
}

function writeJobCursor(job: Job): string {
  return Buffer.from(JSON.stringify({ title: job.title, id: job.id }), "utf8").toString("base64url")
}

function isJobCursor(value: unknown): value is JobCursor {
  if (typeof value !== "object" || value === null) return false
  if (!("title" in value) || !("id" in value)) return false
  const record = value as { title: unknown; id: unknown }
  return (
    typeof record.title === "string" &&
    record.title.length > 0 &&
    typeof record.id === "string" &&
    record.id.length > 0
  )
}

function readJobRows(rows: readonly Row[]): JobRow[] {
  const jobRows: JobRow[] = []
  for (const row of rows) {
    const jobRow = readJobRow(row)
    if (jobRow) jobRows.push(jobRow)
  }
  return jobRows
}

function readJobRow(row: Row): JobRow | undefined {
  const id = readText(row, "id")
  const title = readText(row, "title")
  const badge = readText(row, "badge")
  const platform = readPlatform(readText(row, "platform"))
  const href = readText(row, "href")
  const summary = readText(row, "summary")
  const modality = readModality(readText(row, "modality"))
  if (!id || !title || !badge || !platform || !href || !summary || !modality) return undefined

  return {
    id,
    title,
    badge,
    platform,
    href,
    summary,
    city: readText(row, "city"),
    state: readText(row, "state"),
    modality,
    position: readNumber(row, "position"),
    text: readText(row, "text"),
  }
}

function readText(row: Row, column: string): string | null {
  const value = row[column]
  return typeof value === "string" ? value : null
}

function readNumber(row: Row, column: string): number | null {
  const value = row[column]
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "bigint") return Number(value)
  return null
}

function readPlatform(value: string | null): Platform | null {
  if (value === "LinkedIn" || value === "Gupy") return value
  return null
}

function readModality(value: string | null): Modality | null {
  if (value === "Presencial" || value === "Híbrido" || value === "100% Remoto") return value
  return null
}

function foldJobs(rows: readonly JobRow[]): Job[] {
  const jobs: Job[] = []
  const byId = new Map<string, Job>()

  for (const row of rows) {
    let job = byId.get(row.id)
    if (!job) {
      job = {
        id: row.id,
        title: row.title,
        badge: row.badge,
        platform: row.platform,
        href: row.href,
        summary: row.summary,
        highlights: [],
        city: row.city,
        state: row.state,
        modality: row.modality,
      }
      byId.set(row.id, job)
      jobs.push(job)
    }
    if (row.text != null && row.position != null) job.highlights.push(row.text)
  }

  return jobs
}

function text(value: string): string
function text(value: string | null): string | null
function text(value: string | null): string | null {
  return (
    value?.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "\uFFFD") ??
    null
  )
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`)
}
