export type Platform = "LinkedIn" | "Gupy"
export type Modality = "Presencial" | "Híbrido" | "100% Remoto"
export type EntryKind = "aprendiz" | "estagio" | "primeiro-emprego" | "auxiliar"

export type NewJob = {
  sourceId: string
  title: string
  badge: string
  platform: Platform
  href: string
  summary: string
  highlights: string[]
  city: string | null
  state: string | null
  modality: Modality
}

export type Job = {
  id: string
  title: string
  badge: string
  platform: Platform
  href: string
  summary: string
  highlights: string[]
  city: string | null
  state: string | null
  modality: Modality
}

export type JobDraft = {
  sourceId: string
  title: string
  platform: Platform
  href: string
  company: string
  city: string | null
  stateName: string | null
  workplace: "on-site" | "hybrid" | "remote" | "unknown"
  description?: string
  kind: EntryKind
  trustedKind: boolean
}

const SENIORITY =
  /\b(s[eê]niors?|seniors?|pleno|especialistas?|coordenadores?|coordenadoras?|gerentes?|supervisores?|supervisoras?)\b/i

export function toJob(draft: JobDraft): NewJob | null {
  const title = clean(draft.title)
  const href = draft.href.trim()
  const badge = entryBadge(title, draft.kind, draft.trustedKind)
  const state = toUf(draft.stateName)

  if (!title || !href || !badge || !state) return null

  const city = normalizeCity(clean(draft.city))
  const modality = modalityOf(draft.workplace)
  const company = clean(draft.company) || "Empresa não informada"

  return {
    sourceId: draft.sourceId,
    title,
    badge,
    platform: draft.platform,
    href,
    summary: `${company} • ${city ? `${city}, ${state}` : modality === "100% Remoto" ? "Remoto" : state}`,
    highlights: highlightsFrom(draft.description),
    city: city || null,
    state,
    modality,
  }
}

export function parseLinkedInPlace(location: string): {
  city: string | null
  stateName: string
  workplace: "on-site" | "remote"
} | null {
  const text = location.replace(/\s+/g, " ").trim()
  const match = text.match(/^(.*?),\s*([A-Za-z]{2})$/)
  if (!match) return null

  const uf = match[2]?.toUpperCase()
  if (uf !== "SE") return null

  const remote = /remoto|remote/i.test(text)
  const city = match[1]
    ?.replace(/\b(remoto|remote)\b/gi, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  return {
    city: city ? city : null,
    stateName: "SE",
    workplace: remote ? "remote" : "on-site",
  }
}

export function workplaceOf(value: string): JobDraft["workplace"] {
  if (value === "remote" || value === "hybrid" || value === "on-site") return value
  return "unknown"
}

function entryBadge(title: string, kind: EntryKind, trustedKind: boolean): string | null {
  if (SENIORITY.test(title)) return null

  const normalized = fold(title)
  if (normalized.includes("aprendiz") || (trustedKind && kind === "aprendiz")) return "Jovem Aprendiz"
  if (normalized.includes("estagi") || (trustedKind && kind === "estagio")) return "Estágio"
  if (normalized.includes("primeiro emprego") || normalized.includes("sem experiencia")) {
    return "Primeiro emprego"
  }
  if (normalized.includes("auxiliar")) return "Auxiliar"
  return null
}

function toUf(state: string | null): "SE" | null {
  if (!state) return null
  const normalized = fold(state)
  if (normalized === "se" || normalized === "sergipe") return "SE"
  return null
}

function modalityOf(workplace: JobDraft["workplace"]): Modality {
  if (workplace === "remote") return "100% Remoto"
  if (workplace === "hybrid") return "Híbrido"
  return "Presencial"
}

const CITY_FIXES: Record<string, string> = {
  "Sæo Cristovæo": "São Cristóvão",
}

function normalizeCity(city: string): string {
  return CITY_FIXES[city] ?? city
}

function highlightsFrom(description: string | undefined): string[] {
  if (!description) return []

  const plain = decodeHtml(description).replace(/\s+/g, " ").trim()
  if (!plain) return []

  const parts = plain
    .split(/(?<=\.)\s*(?=\p{L})/u)
    .map((part) => part.trim())
    .filter((part) => part.length >= 12)

  return parts.slice(0, 3).map((part) => clip(part, 120))
}

function clip(value: string, max: number): string {
  const chars = Array.from(value)
  if (chars.length <= max) return value
  return `${chars.slice(0, max - 3).join("").trimEnd()}…`
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
}

function clean(value: string | null | undefined): string {
  return value?.replace(/\s+/g, " ").trim() ?? ""
}

function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
}
