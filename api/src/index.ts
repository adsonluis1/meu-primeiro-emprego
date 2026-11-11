import { serve } from "@hono/node-server"
import { Hono } from "hono"

import { getJob, listJobs, openDatabase, readJobCursor } from "./db.js"
import type { Modality, Platform } from "./map-job.js"
import { startJobSync } from "./schedule.js"

const db = await openDatabase().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Falha ao abrir o banco")
  process.exit(1)
})
const app = new Hono()

const MODALITIES = new Set<Modality>(["Presencial", "Híbrido", "100% Remoto"])
const PLATFORMS = new Set<Platform>(["LinkedIn", "Gupy"])

app.get("/jobs", async (c) => {
  const city = blankToUndefined(c.req.query("city"))
  const modality = blankToUndefined(c.req.query("modality"))
  const platform = blankToUndefined(c.req.query("platform"))
  const q = blankToUndefined(c.req.query("q"))
  const cursorValue = blankToUndefined(c.req.query("cursor"))
  const cursor = cursorValue ? readJobCursor(cursorValue) : undefined

  if (modality && !MODALITIES.has(modality as Modality)) {
    return c.json({ error: "Modalidade inválida" }, 400)
  }
  if (platform && !PLATFORMS.has(platform as Platform)) {
    return c.json({ error: "Plataforma inválida" }, 400)
  }
  if (cursorValue && !cursor) return c.json({ error: "Cursor inválido" }, 400)

  return c.json(
    await listJobs(db, {
      city,
      modality: modality as Modality | undefined,
      platform: platform as Platform | undefined,
      q,
      cursor,
    }),
  )
})

app.get("/jobs/:id", async (c) => {
  const job = await getJob(db, c.req.param("id"))
  if (!job) return c.json({ error: "Vaga não encontrada" }, 404)
  return c.json(job)
})

const port = Number(process.env.PORT ?? 3001)

serve({ fetch: app.fetch, port }, () => {
  console.log(`API em http://localhost:${port}`)
})

startJobSync(db)

function blankToUndefined(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}
