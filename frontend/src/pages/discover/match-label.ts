import {
  quizQuestions,
  quizResults,
  type QuizResult,
  type QuizTrack,
} from "../../data/quiz.ts"

const primaryLabel = "Sua área de atuação"
const affinityLabel = "Alta afinidade"
const shownAreaLimit = 3

const trackByOptionId = new Map<string, QuizTrack>(
  quizQuestions.flatMap((question) =>
    question.options.map((option) => [option.id, option.track] as const),
  ),
)

export type RankedArea = {
  result: QuizResult
  score: number
  label: string
}

export function rankAreas(answers: Record<string, string>): RankedArea[] {
  const counts = new Map<QuizTrack, number>()
  let total = 0

  for (const optionId of Object.values(answers)) {
    const track = trackByOptionId.get(optionId)
    if (track === undefined) continue
    counts.set(track, (counts.get(track) ?? 0) + 1)
    total += 1
  }

  if (total === 0) return []

  return quizResults
    .map((result) => ({
      result,
      count: counts.get(result.track) ?? 0,
    }))
    .filter((item) => item.count > 0)
    .sort((left, right) => right.count - left.count)
    .slice(0, shownAreaLimit)
    .map((item, index) => ({
      result: item.result,
      score: Math.round((item.count / total) * 100),
      label: index === 0 ? primaryLabel : affinityLabel,
    }))
}
