import type { QuizOption, QuizQuestion } from "../../data/quiz.ts"
import { Icon } from "../../components/icon/Icon.tsx"

type QuizStepProps = {
  question: QuizQuestion
  questionIndex: number
  total: number
  selectedOptionId: string | undefined
  onSelect: (optionId: string) => void
  onBack: () => void
  onContinue: () => void
}

const choiceLayout =
  "pressable group relative flex min-h-11 w-full min-w-0 cursor-pointer flex-col items-stretch gap-space-sm rounded-xl border p-space-md text-left transition-colors sm:flex-row sm:flex-wrap sm:items-start sm:gap-space-md"

export function QuizStep({
  question,
  questionIndex,
  total,
  selectedOptionId,
  onSelect,
  onBack,
  onContinue,
}: QuizStepProps) {
  const questionNumber = questionIndex + 1
  const percent = Math.round((questionNumber / total) * 100)
  const continueLabel =
    questionIndex < total - 1
      ? `Continuar para pergunta ${questionIndex + 2}`
      : "Ver áreas sugeridas"

  return (
    <section
      aria-label="Questionário de Aptidões"
      className="defer-section flex flex-col gap-space-lg rounded-xl bg-surface-container-lowest p-space-lg shadow-sm"
    >
      <div className="flex flex-col gap-space-xs">
        <div className="flex flex-wrap items-center justify-between gap-space-sm text-on-surface">
          <span className="font-label-md text-label-md font-semibold">
            Pergunta {questionNumber} de {total}
          </span>
          <span
            id="quiz-progress-value"
            className="font-label-sm text-label-sm text-on-surface-variant"
          >
            Progresso: {percent}%
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"
          role="progressbar"
          aria-labelledby="quiz-progress-value"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-primary-container"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-space-xs pt-space-xs">
        <span className="font-caption text-caption font-bold tracking-wide text-primary uppercase">
          {question.kicker}
        </span>
        <h2 className="text-wrap font-headline-lg text-headline-lg text-on-surface">
          {question.prompt}
        </h2>
      </div>

      <div
        className="flex flex-col gap-space-md"
        role="group"
        aria-label={`Alternativas da Pergunta ${questionNumber}`}
      >
        {question.options.map((option) =>
          option.id === selectedOptionId ? (
            <PressedChoice key={option.id} option={option} onSelect={onSelect} />
          ) : (
            <OpenChoice key={option.id} option={option} onSelect={onSelect} />
          ),
        )}
      </div>

      <div className="flex flex-col flex-wrap items-stretch justify-between gap-space-md pt-space-md sm:flex-row sm:items-center">
        {questionIndex > 0 ? (
          <button
            type="button"
            className="pressable inline-flex min-h-11 w-full items-center justify-center gap-space-xs rounded bg-surface-container px-space-md py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
            onClick={onBack}
          >
            <Icon name="arrow_back" className="text-[18px]" />
            Voltar à pergunta {questionIndex}
          </button>
        ) : null}
        <button
          type="button"
          className="pressable inline-flex min-h-11 w-full items-center justify-center gap-space-xs rounded bg-primary-container px-space-lg py-2.5 font-label-md text-label-md font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary-container sm:ml-auto sm:w-auto"
          disabled={selectedOptionId === undefined}
          onClick={onContinue}
        >
          {continueLabel}
          <Icon name="arrow_forward" className="text-[18px]" />
        </button>
      </div>
    </section>
  )
}

function ChoiceText({
  option,
  titleClassName,
}: {
  option: QuizOption
  titleClassName: string
}) {
  return (
    <span className="flex min-w-0 flex-col sm:flex-1">
      <span className={titleClassName}>{option.title}</span>
      <span className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
        {option.detail}
      </span>
    </span>
  )
}

function PressedChoice({
  option,
  onSelect,
}: {
  option: QuizOption
  onSelect: (optionId: string) => void
}) {
  return (
    <button
      type="button"
      className={`${choiceLayout} border-primary bg-secondary-container/40 shadow-sm`}
      aria-pressed="true"
      onClick={() => onSelect(option.id)}
    >
      <ChoiceText
        option={option}
        titleClassName="font-headline-sm text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary"
      />
      <span className="inline-flex w-fit shrink-0 items-center self-start rounded bg-primary px-2 py-0.5 font-caption text-caption font-medium text-on-primary sm:ml-auto">
        Selecionada
      </span>
    </button>
  )
}

function OpenChoice({
  option,
  onSelect,
}: {
  option: QuizOption
  onSelect: (optionId: string) => void
}) {
  return (
    <button
      type="button"
      className={`${choiceLayout} border-transparent bg-surface-container-low hover:bg-surface-container`}
      aria-pressed="false"
      onClick={() => onSelect(option.id)}
    >
      <ChoiceText
        option={option}
        titleClassName="font-headline-sm text-headline-sm font-medium text-on-surface transition-colors group-hover:text-primary"
      />
    </button>
  )
}
