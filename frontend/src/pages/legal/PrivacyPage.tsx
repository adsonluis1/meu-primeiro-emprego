export function PrivacyPage() {
  return (
    <article className="mx-auto flex max-w-[1040px] flex-col gap-space-lg px-margin py-space-xl">
      <header className="flex flex-col gap-space-sm">
        <h1 className="font-display-hero text-display-hero-mobile text-on-surface md:text-display-hero">
          Privacidade
        </h1>
        <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
          Não pedimos cadastro para ver vagas, vídeos ou links. As respostas do
          questionário ficam só nesta visita, no seu navegador.
        </p>
      </header>
      <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Para onde os links levam
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Candidatura e portais abrem o site oficial da vaga ou do serviço, como
          LinkedIn, Gupy e Gov.br. Este site não cobra taxa e não vende curso.
        </p>
      </section>
    </article>
  )
}
