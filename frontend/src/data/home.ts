export const heroImage = {
  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIWc0ILKDX-FlTuknTss3nHncoPhNqglOlG-9cnbH9ld0Nhm6c_taJ8rUllagyZv7fBBPrZ9ke1lxS9MOnx-W3tQf2dVcGCny44h2PsAs3741PAk_h3zbTufIkvJzjre0bIkd_Xpdn5mUfKoKxWYIhyGpNiMYz8EENNbtttRS9wgRzO3u6HFoTukcGPLNXWSnmNOOOFUeT-wFO2uS-PIF-8s21obZ0loCnYAlvGFM",
  alt: "",
  caption: "Inclusão produtiva em foco",
  captionDetail:
    "Oportunidades mapeadas e auditadas em plataformas credenciadas.",
} as const

export const hero = {
  eyebrow: "Acesso público e gratuito às vagas de entrada",
  title: "Encontre oportunidades para começar sua carreira.",
  body: "Ajudamos jovens e profissionais sem experiência a descobrir vagas regulamentadas de jovem aprendiz, estágio e primeiro emprego formal. Sem taxas ocultas, sem formulários cansativos e sem exigência de cadastro prévio.",
  primary: { label: "Encontrar vagas", href: "#vagas-secao", icon: "arrow_downward" },
  secondary: { label: "Descobrir minha área", to: "/descubra", icon: "arrow_forward" },
  assurances: ["100% Gratuito", "Lei da Aprendizagem (10.097/00)", "Candidatura oficial"],
} as const

export const howItWorks = {
  kicker: "Metodologia simples",
  title: "Como funciona",
  body: "Conexão direta entre seu potencial e posições que aceitam candidatos sem vivência prévia de mercado.",
  steps: [
    {
      number: "01",
      title: "Escolha sua área ou descubra afinidades",
      body: "Informe a área em que quer atuar ou faça o questionário para identificar caminhos compatíveis com seu perfil.",
      note: "Orientação vocacional leve",
    },
    {
      number: "02",
      title: "Veja as oportunidades de entrada",
      body: "Vagas reais de jovem aprendiz, estágio e primeiro emprego CLT reunidas com requisitos claros e transparentes.",
      note: "Critérios objetivos de contratação",
    },
    {
      number: "03",
      title: "Candidate-se no canal oficial",
      body: "Encaminhamento seguro e direto para o anúncio no LinkedIn ou Gupy, sem intermediação, cobranças ou taxas.",
      note: "Redirecionamento seguro",
    },
  ],
} as const

export const allLocationsLabel = "Todas as regiões"

export const modalities = [
  "Todas as modalidades",
  "Presencial",
  "Híbrido",
  "100% Remoto",
] as const

export const platforms = ["Todas as plataformas", "LinkedIn", "Gupy"] as const

export type JobModality = Exclude<(typeof modalities)[number], "Todas as modalidades">
export type JobPlatform = Exclude<(typeof platforms)[number], "Todas as plataformas">

export type Job = {
  id: string
  title: string
  badge: string
  platform: JobPlatform
  href: string
  summary: string
  highlights: readonly string[]
  city: string | null
  state: string | null
  modality: JobModality
}

export const jobsIntro = {
  kicker: "Oportunidades em aberto",
  title: "Vagas para você",
  sectionId: "vagas-secao",
  dailyNote: "As vagas são atualizadas diariamente a partir das fontes oficiais.",
  freeNote: "Acesso livre a toda a base",
  emptyTitle: "Nenhuma oportunidade encontrada",
  emptyBody:
    'Tente remover alguns filtros ou buscar por termos mais amplos como "Suporte", "Aprendiz" ou "Atendimento".',
  clearLabel: "Limpar filtros de busca",
  loadingLabel: "Carregando vagas...",
  loadError: "Não foi possível carregar as vagas.",
  retryLabel: "Tentar novamente",
} as const

export function jobActionLabel(platform: JobPlatform) {
  return platform === "LinkedIn" ? "Ver vaga no LinkedIn" : "Ver vaga na Gupy"
}
