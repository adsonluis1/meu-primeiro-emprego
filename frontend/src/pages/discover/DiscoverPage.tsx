import { useEffect, useState } from "react"
import {
  quizIntro,
  quizIntroBody,
  quizQuestions,
} from "../../data/quiz.ts"
import { Icon } from "../../components/icon/Icon.tsx"
import { QuizResults } from "./QuizResults.tsx"
import { QuizStep } from "./QuizStep.tsx"

export function DiscoverPage() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)

  const question = quizQuestions[questionIndex] ?? quizQuestions[0]
  const selectedOptionId = answers[question.id]

  useEffect(() => {
    if (!finished) return
    document.getElementById("diagnostico")?.scrollIntoView({ block: "start" })
  }, [finished])

  function selectOption(optionId: string) {
    setAnswers((current) => ({ ...current, [question.id]: optionId }))
  }

  function goBack() {
    setQuestionIndex((current) => (current > 0 ? current - 1 : 0))
  }

  function continueQuiz() {
    const lastIndex = quizQuestions.length - 1
    if (questionIndex < lastIndex) {
      setQuestionIndex(questionIndex + 1)
      return
    }
    setFinished(true)
  }

  function resetQuiz() {
    setQuestionIndex(0)
    setAnswers({})
    setFinished(false)
  }

  return (
    <div className="flex w-full min-w-0 flex-col">
      <div className="mx-auto flex w-full max-w-[1040px] min-w-0 flex-col gap-space-xl px-margin py-space-xl">
        <DiscoverIntro />
        {finished ? null : (
          <QuizStep
            question={question}
            questionIndex={questionIndex}
            total={quizQuestions.length}
            selectedOptionId={selectedOptionId}
            onSelect={selectOption}
            onBack={goBack}
            onContinue={continueQuiz}
          />
        )}
        {finished ? <QuizResults answers={answers} onRedo={resetQuiz} /> : null}
      </div>
    </div>
  )
}

function DiscoverIntro() {
  return (
    <div className="defer-section flex max-w-3xl flex-col gap-space-sm">
      <div className="inline-flex items-center gap-space-xs self-start rounded bg-surface-container-high px-space-sm py-0.5 font-caption text-caption tracking-wider text-primary uppercase">
        <Icon name="psychology" className="text-[14px]" />
        {quizIntro.eyebrow}
      </div>
      <h1 className="text-wrap font-display-hero text-display-hero-mobile tracking-tight text-on-surface md:text-display-hero">
        {quizIntro.title}
      </h1>
      <p className="max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
        {quizIntroBody(quizQuestions.length)}
      </p>
    </div>
  )
}
