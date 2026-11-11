import { useState } from "react"
import { Icon } from "../../components/icon/Icon.tsx"
import {
  careerGroups,
  careerLinks,
  linkFilters,
  linksIntro,
  registrationChecklist,
  safetyNote,
  type CareerGroup,
  type CareerLink,
  type LinkFilter,
} from "../../data/links.ts"

const linksByGroup = new Map<CareerGroup["id"], CareerLink[]>()

for (const link of careerLinks) {
  const bucket = linksByGroup.get(link.group)
  if (bucket) {
    bucket.push(link)
  } else {
    linksByGroup.set(link.group, [link])
  }
}

function chipClass(active: boolean) {
  const tone = active
    ? "bg-primary text-on-primary"
    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
  return `pressable rounded-full px-3 py-1.5 font-label-sm text-label-sm transition-colors ${tone}`
}

function CareerLinkCard({ link }: { link: CareerLink }) {
  return (
    <article className="group flex min-w-0 flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md">
      <div className="flex min-w-0 flex-col gap-space-xs">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-space-xs">
          <span className="flex min-w-0 max-w-full items-center gap-1 font-label-sm text-label-sm font-semibold text-primary">
            <Icon name={link.hostIcon} className="shrink-0 text-[16px]" />
            <span className="min-w-0 break-words">{link.host}</span>
          </span>
          <span className="shrink-0 rounded bg-surface-container-high px-2 py-0.5 text-[11px] font-medium text-on-surface-variant">
            {link.badge}
          </span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-wrap break-words text-on-surface transition-colors group-hover:text-primary">
          {link.title}
        </h3>
        <p className="font-body-sm text-body-sm text-wrap break-words text-on-surface-variant">
          {link.description}
        </p>
      </div>
      <div className="mt-space-lg flex min-w-0 flex-wrap items-center justify-between gap-space-sm pt-space-sm">
        <span className="min-w-0 flex-1 font-caption text-caption text-wrap break-words text-outline">
          {link.detail}
        </span>
        <a
          className="pressable inline-flex shrink-0 items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:text-tertiary"
          href={link.href}
          target="_blank"
          rel="noreferrer"
        >
          {link.action}
          <Icon name="north_east" className="text-[18px]" />
        </a>
      </div>
    </article>
  )
}

function CareerGroupSection({ group }: { group: CareerGroup }) {
  const links = linksByGroup.get(group.id) ?? []

  return (
    <section className="defer-section flex min-w-0 flex-col gap-space-md">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-space-sm pb-space-xs">
        <div className="flex min-w-0 flex-1 items-center gap-space-sm">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
            <Icon name={group.icon} className="text-[20px]" />
          </span>
          <div className="min-w-0">
            <h2 className="font-headline-md text-headline-md text-wrap break-words text-on-surface">
              {group.title}
            </h2>
            <p className="font-caption text-caption text-wrap break-words text-on-surface-variant">
              {group.description}
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded bg-surface-container px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant">
          {links.length} recursos
        </span>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-space-md md:grid-cols-2">
        {links.map((link) => (
          <CareerLinkCard key={link.id} link={link} />
        ))}
      </div>
    </section>
  )
}

export function LinksPage() {
  const [filter, setFilter] = useState<LinkFilter>("Todos")
  const groups =
    filter === "Todos"
      ? careerGroups
      : careerGroups.filter((group) => group.id === filter)

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-[1040px] flex-col gap-space-xl px-margin py-space-xl">
      <div className="flex min-w-0 flex-col justify-between gap-space-lg md:flex-row md:items-end">
        <div className="flex min-w-0 max-w-2xl flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
              <Icon name="verified" className="text-[16px]" />
            </span>
            <span className="font-label-sm text-label-sm tracking-wider text-primary uppercase">
              {linksIntro.eyebrow}
            </span>
          </div>
          <h1 className="font-display-hero text-display-hero-mobile tracking-tight text-wrap break-words text-on-surface md:text-display-hero">
            {linksIntro.title}
          </h1>
          <p className="font-body-lg text-body-lg text-wrap break-words text-on-surface-variant">
            {linksIntro.body}
          </p>
        </div>
        <div className="flex max-w-full items-center gap-space-sm self-start rounded-lg bg-surface-container-low px-space-md py-space-sm md:self-end">
          <Icon name="policy" className="shrink-0 text-[20px] text-primary" />
          <div className="flex min-w-0 flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-wrap break-words text-on-surface">
              {linksIntro.assurances[0]}
            </span>
            <span className="font-caption text-caption text-wrap break-words text-on-surface-variant">
              {linksIntro.assurances[1]}
            </span>
          </div>
        </div>
      </div>

      <section className="min-w-0 rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div
          className="flex min-w-0 flex-wrap items-center gap-space-xs"
          role="group"
          aria-label="Filtrar links"
        >
          {linkFilters.map((item) => {
            const active = filter === item.id
            const label =
              item.id === "Todos"
                ? `Todos (${careerLinks.length})`
                : item.label
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                className={chipClass(active)}
                onClick={() => {
                  setFilter(item.id)
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      <div className="flex min-w-0 flex-col gap-space-xl">
        {groups.map((group) => (
          <CareerGroupSection key={group.id} group={group} />
        ))}
      </div>

      <section className="flex min-w-0 flex-col items-center gap-space-lg rounded-xl bg-surface-container p-space-lg md:flex-row">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-sm">
          <Icon name="badge" className="text-[32px]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-space-xs self-stretch">
          <h2 className="font-headline-sm text-headline-sm text-wrap break-words text-on-surface">
            {registrationChecklist.title}
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {registrationChecklist.items.map((item) => (
              <span
                key={item}
                className="max-w-full rounded bg-surface-container-lowest px-2.5 py-1 font-label-sm text-label-sm text-wrap break-words text-on-surface shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <a
          className="pressable max-w-full shrink-0 rounded-lg bg-primary px-4 py-2.5 text-center font-label-md text-label-md text-on-primary shadow-sm transition-colors hover:bg-tertiary"
          href={registrationChecklist.href}
          target="_blank"
          rel="noreferrer"
        >
          {registrationChecklist.action}
        </a>
      </section>

      <aside className="flex min-w-0 flex-col items-start gap-space-md rounded-xl bg-surface-container-lowest p-space-lg shadow-sm sm:flex-row">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
          <Icon name="security" className="text-[24px]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-space-xs self-stretch">
          <span className="font-headline-sm text-headline-sm text-wrap break-words text-primary">
            {safetyNote.title}
          </span>
          <p className="font-body-md text-body-md text-wrap break-words text-on-surface">
            <strong>{safetyNote.lead}</strong> {safetyNote.body}
          </p>
          <p className="font-body-sm text-body-sm text-wrap break-words text-on-surface-variant">
            {safetyNote.warning}
          </p>
        </div>
      </aside>
    </div>
  )
}
