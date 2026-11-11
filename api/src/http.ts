export const USER_AGENT = "extensionista/0.1 (vagas de entrada em Sergipe)"

const PAUSE_MS = 400

export function pause(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, PAUSE_MS)
  })
}

export async function getText(url: string, accept: string): Promise<string> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (attempt > 0) await wait(3_000 * attempt)

    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: accept,
        "Accept-Language": "pt-BR,pt;q=0.9",
      },
      signal: AbortSignal.timeout(20_000),
    })

    if (response.status === 429 && attempt < 2) continue
    if (!response.ok) throw new Error(`HTTP ${response.status} em ${url}`)
    return response.text()
  }

  throw new Error(`HTTP 429 em ${url}`)
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
