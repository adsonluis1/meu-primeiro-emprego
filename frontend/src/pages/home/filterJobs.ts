import { modalities, platforms } from "../../data/home.ts"

export type ModalityChoice = Exclude<
  (typeof modalities)[number],
  "Todas as modalidades"
>
export type PlatformChoice = Exclude<
  (typeof platforms)[number],
  "Todas as plataformas"
>

export type JobFilterState = {
  query: string
  location: string
  modality: "" | ModalityChoice
  platform: "" | PlatformChoice
}

export const initialJobFilters: JobFilterState = {
  query: "",
  location: "",
  modality: "",
  platform: "",
}

const modalityChoices: ReadonlySet<string> = new Set(modalities.slice(1))
const platformChoices: ReadonlySet<string> = new Set(platforms.slice(1))

export function readLocation(value: string, cities: readonly string[]): string {
  return cities.includes(value) ? value : ""
}

export function readModality(value: string): JobFilterState["modality"] {
  return isModalityChoice(value) ? value : ""
}

export function readPlatform(value: string): JobFilterState["platform"] {
  return isPlatformChoice(value) ? value : ""
}

export function jobsResultLabel(count: number) {
  return `Exibindo ${count} ${count === 1 ? "oportunidade verificada" : "oportunidades verificadas"} para primeiro emprego`
}

function isModalityChoice(value: string): value is ModalityChoice {
  return modalityChoices.has(value)
}

function isPlatformChoice(value: string): value is PlatformChoice {
  return platformChoices.has(value)
}
