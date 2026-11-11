import type { ReactNode } from "react"
import { SiteFooter } from "./SiteFooter.tsx"
import { SiteHeader } from "./SiteHeader.tsx"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main
        id="conteudo"
        className="min-h-[calc(100vh-16rem)] w-full bg-surface pt-16"
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
