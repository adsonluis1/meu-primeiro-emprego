import type { Database } from "./db.js"
import { syncJobs } from "./sync.js"

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000

export function startJobSync(db: Database): void {
  void run()
  setInterval(() => {
    void run()
  }, TWELVE_HOURS_MS)

  async function run(): Promise<void> {
    console.log("Sincronizando vagas de entrada em Sergipe...")
    try {
      const report = await syncJobs(db)
      console.log(JSON.stringify(report))
    } catch (error) {
      const message = error instanceof Error ? error.message : "Falha ao sincronizar vagas"
      console.error(message)
    }
  }
}
