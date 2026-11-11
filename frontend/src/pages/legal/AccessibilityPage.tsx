export function AccessibilityPage() {
  return (
    <article className="mx-auto flex max-w-[1040px] flex-col gap-space-lg px-margin py-space-xl">
      <header className="flex flex-col gap-space-sm">
        <h1 className="font-display-hero text-display-hero-mobile text-on-surface md:text-display-hero">
          Acessibilidade
        </h1>
        <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
          O site é público e gratuito. Dá para percorrer as seções pelo teclado, e o
          menu em telas estreitas abre e fecha com o mesmo botão.
        </p>
      </header>
      <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-lg">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          O que o site respeita
        </h2>
        <ul className="flex list-disc flex-col gap-space-sm pl-space-lg font-body-md text-body-md text-on-surface-variant">
          <li>Foco visível em links e botões.</li>
          <li>Texto que acompanha o tamanho definido no navegador.</li>
          <li>
            Movimento reduzido: o destaque ao pressionar some quando o sistema pede
            menos movimento.
          </li>
          <li>
            Superfície do topo fica sólida quando o sistema pede menos transparência.
          </li>
        </ul>
      </section>
    </article>
  )
}
