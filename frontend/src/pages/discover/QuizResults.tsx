import type { ReactNode } from "react"
import { Link } from "react-router"
import { quizResultsBody, quizResultsIntro, type QuizResult } from "../../data/quiz.ts"
import { Icon } from "../../components/icon/Icon.tsx"
import { rankAreas, type RankedArea } from "./match-label.ts"

const scoreClassName: Record<string, string> = {
  atendimento: "text-primary",
  admin: "text-secondary",
  tecnico: "text-primary-container",
  operacional: "text-tertiary",
}

const gridClassName: Record<number, string> = {
  1: "md:max-w-xl md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
}

type QuizResultsProps = {
  answers: Record<string, string>
  onRedo: () => void
}

export function QuizResults({ answers, onRedo }: QuizResultsProps) {
  const ranked = rankAreas(answers)
  const columns = gridClassName[ranked.length] ?? "md:grid-cols-3"

  return (
    <>
      <section
        id="diagnostico"
        aria-label="Resultado Vocacional Preliminar"
        className="defer-section flex scroll-mt-20 flex-col gap-space-lg pt-space-md"
      >
        <div className="flex flex-col flex-wrap items-start justify-between gap-space-md rounded-xl bg-surface-container p-space-md text-on-surface sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-space-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary">
              <Icon name="verified" className="text-[22px]" />
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                {quizResultsIntro.title}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {quizResultsBody(ranked.length)}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="pressable inline-flex min-h-11 shrink-0 items-center gap-space-xs self-end font-label-md text-label-md text-primary underline transition-colors hover:text-tertiary sm:self-center"
            onClick={onRedo}
          >
            <Icon name="replay" className="text-[16px]" />
            {quizResultsIntro.redo}
          </button>
        </div>

        <div className={`grid grid-cols-1 items-stretch gap-space-md ${columns}`}>
          {ranked.map((area, index) => {
            const primary = index === 0
            return (
              <ResultCard
                key={area.result.id}
                area={area}
                badge={<AreaBadge label={area.label} primary={primary} />}
                action={primary ? <PrincipalVacancyLink /> : <AffinityVacancyLink />}
              />
            )
          })}
        </div>
      </section>

      <aside
        aria-label="Orientações e Direitos"
        className="defer-section flex flex-col flex-wrap items-center justify-between gap-space-md rounded-xl bg-surface-container-high p-space-lg text-on-surface sm:flex-row"
      >
        <div className="flex min-w-0 items-center gap-space-md">
          <Icon name="info" className="shrink-0 text-[32px] text-primary" />
          <div className="flex min-w-0 flex-col">
            <span className="font-headline-sm text-headline-sm font-semibold">
              {quizResultsIntro.noExperienceTitle}
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {quizResultsIntro.noExperienceBody}
            </p>
          </div>
        </div>
        <Link
          to={quizResultsIntro.interviewTo}
          className="pressable inline-flex max-w-full flex-wrap items-center gap-space-xs rounded bg-surface-container-lowest px-space-md py-2 font-label-md text-label-md font-medium text-on-surface transition-colors hover:bg-surface"
        >
          {quizResultsIntro.interviewTips}
          <Icon name="open_in_new" className="text-[16px]" />
        </Link>
      </aside>
    </>
  )
}

function ResultCard({
  area,
  badge,
  action,
}: {
  area: RankedArea
  badge: ReactNode
  action: ReactNode
}) {
  const result: QuizResult = area.result
  const tone = scoreClassName[result.id] ?? "text-primary"

  return (
    <article className="flex min-w-0 flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          {badge}
          <span className={`font-headline-sm text-headline-sm font-bold ${tone}`}>
            {area.score}%
          </span>
        </div>
        <div className="flex flex-col gap-space-xs">
          <h3 className="text-wrap font-headline-md text-headline-md font-semibold text-on-surface">
            {result.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {result.description}
          </p>
        </div>
        <div className="flex flex-col gap-space-xs pt-space-xs">
          <span className="font-caption text-caption font-semibold tracking-wider text-on-surface-variant uppercase">
            Profissões de entrada:
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {result.roles.map((role) => (
              <li
                key={role}
                className="max-w-full rounded bg-surface-container px-2 py-0.5 font-caption text-caption break-words text-on-surface"
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-space-lg">{action}</div>
    </article>
  )
}

function AreaBadge({ label, primary }: { label: string; primary: boolean }) {
  const tone = primary
    ? "bg-primary-fixed font-semibold text-on-primary-fixed-variant"
    : "bg-surface-container font-medium text-on-surface"

  return (
    <span className={`rounded px-2 py-0.5 font-label-sm text-label-sm ${tone}`}>
      {label}
    </span>
  )
}

function PrincipalVacancyLink() {
  return (
    <Link
      to="/#vagas-secao"
      className="pressable inline-flex min-h-11 w-full items-center justify-center gap-space-xs rounded bg-primary-container px-space-md py-2.5 font-label-md text-label-md font-semibold text-on-primary transition-colors hover:bg-primary"
    >
      Ver vaga
      <Icon name="arrow_forward" className="text-[16px]" />
    </Link>
  )
}

function AffinityVacancyLink() {
  return (
    <Link
      to="/#vagas-secao"
      className="pressable inline-flex min-h-11 w-full items-center justify-center gap-space-xs rounded bg-surface-container px-space-md py-2.5 font-label-md text-label-md font-semibold text-on-surface transition-colors hover:bg-surface-container-high"
    >
      Ver vaga
      <Icon name="arrow_forward" className="text-[16px]" />
    </Link>
  )
}
