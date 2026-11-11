import { getText, pause } from "../http.js"
import { parseLinkedInPlace, toJob, type EntryKind, type NewJob } from "../map-job.js"

const ENDPOINT = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"
const PAGE_SIZE = 10
const MAX_PAGES = 3

const QUERIES: readonly { kind: EntryKind; keywords: string }[] = [
  { kind: "aprendiz", keywords: "jovem aprendiz" },
  { kind: "estagio", keywords: "estagio" },
  { kind: "primeiro-emprego", keywords: "primeiro emprego" },
  { kind: "auxiliar", keywords: "auxiliar" },
]

export async function fetchLinkedInJobs(): Promise<NewJob[]> {
  const jobs = new Map<string, NewJob>()

  for (const [index, query] of QUERIES.entries()) {
    if (index > 0) await pause()
    for (const job of await fetchQuery(query.keywords, query.kind)) jobs.set(job.sourceId, job)
  }

  return [...jobs.values()]
}

async function fetchQuery(keywords: string, kind: EntryKind): Promise<NewJob[]> {
  const jobs: NewJob[] = []

  for (let page = 0; page < MAX_PAGES; page += 1) {
    if (page > 0) await pause()

    const params = new URLSearchParams({
      keywords,
      location: "Sergipe, Brasil",
      start: String(page * PAGE_SIZE),
    })
    const html = await getText(`${ENDPOINT}?${params}`, "text/html")
    const cards = parseCards(html)

    if (cards.length === 0) {
      if (page === 0 && /authwall|login-form|uas-consumer-login/i.test(html)) {
        throw new Error("LinkedIn não devolveu a lista pública de vagas")
      }
      break
    }

    for (const card of cards) {
      const place = parseLinkedInPlace(card.location)
      if (!place) continue

      const job = toJob({
        sourceId: card.sourceId,
        title: card.title,
        platform: "LinkedIn",
        href: card.href,
        company: card.company,
        city: place.city,
        stateName: place.stateName,
        workplace: place.workplace,
        kind,
        trustedKind: false,
      })
      if (job) jobs.push(job)
    }
  }

  return jobs
}

type LinkedInCard = {
  sourceId: string
  title: string
  company: string
  location: string
  href: string
}

function parseCards(html: string): LinkedInCard[] {
  const cards: LinkedInCard[] = []

  for (const chunk of html.split('data-entity-urn="').slice(1)) {
    const sourceId = chunk.match(/^urn:li:jobPosting:(\d+)/)?.[1]
    const href = decodeHtml(chunk.match(/href="(https:\/\/[^"]*linkedin\.com\/jobs\/view\/[^"]+)"/)?.[1] ?? "")
    const title = textOf(chunk, /base-search-card__title[^>]*>([\s\S]*?)<\/h3>/)
    const company = textOf(chunk, /base-search-card__subtitle[^>]*>([\s\S]*?)<\/h4>/)
    const location = textOf(chunk, /job-search-card__location[^>]*>([\s\S]*?)<\/span>/)

    if (!sourceId || !href || !title || !location) continue
    cards.push({ sourceId, title, company, location, href })
  }

  return cards
}

function textOf(chunk: string, pattern: RegExp): string {
  return decodeHtml(chunk.match(pattern)?.[1] ?? "")
}

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/\s+/g, " ")
    .trim()
}
