export type VideoFilter =
  | "Todos os conteúdos"
  | "Currículo"
  | "Entrevistas"
  | "Primeiro emprego & Jovem Aprendiz"
  | "Plataformas de vagas"

export const videoFilters: readonly VideoFilter[] = [
  "Todos os conteúdos",
  "Currículo",
  "Entrevistas",
  "Primeiro emprego & Jovem Aprendiz",
  "Plataformas de vagas",
]

export const videosIntro = {
  eyebrow: "Capacitação Gratuita & Orientação",
  title: "Aprenda a se preparar para o mercado de trabalho",
  body: "Confira conteúdos que podem ajudar você a conquistar sua primeira oportunidade profissional.",
  helpTitle: "Precisa de auxílio para revisar seu currículo?",
  helpBody:
    "Explore nossa seção com modelos prontos para preencher e guias orientados às diretrizes do Ministério do Trabalho.",
  helpAction: "Acessar Links Úteis",
  helpTo: "/links",
} as const

export type Video = {
  id: string
  youtubeId: string
  title: string
  description: string
  tag: string
  source: string
  filter: Exclude<VideoFilter, "Todos os conteúdos">
}

export const videos: readonly Video[] = [
  {
    id: "curriculo-sem-experiencia",
    youtubeId: "IwoHGPmEFGQ",
    title:
      "Currículo de primeiro emprego: o que colocar quando você ainda não tem experiência",
    description:
      "O que valorizar no currículo quando ainda não há emprego formal: cursos, projetos e atividades.",
    tag: "Currículo",
    source: "Lucas Lozano",
    filter: "Currículo",
  },
  {
    id: "estrutura-curriculo",
    youtubeId: "4u4cHkBskzo",
    title: "Como fazer um currículo",
    description:
      "Estrutura do currículo, do nome e do objetivo ao perfil de quem busca o primeiro emprego.",
    tag: "Currículo",
    source: "Beatriz Fontele",
    filter: "Currículo",
  },
  {
    id: "perguntas-entrevista",
    youtubeId: "InZx4onJlO8",
    title: "Entrevista de emprego: 9 perguntas e como responder",
    description:
      "Perguntas frequentes e formas de responder com clareza na primeira entrevista.",
    tag: "Entrevistas",
    source: "Sala de Emprego",
    filter: "Entrevistas",
  },
  {
    id: "entrevista-online",
    youtubeId: "k_22VIihFyw",
    title: "Entrevista de emprego online: dicas para ser aprovado",
    description:
      "Luz, som, câmera aberta e o que o recrutador observa numa entrevista por vídeo.",
    tag: "Entrevistas",
    source: "Sala de Emprego",
    filter: "Entrevistas",
  },
  {
    id: "primeiro-emprego",
    youtubeId: "TypSUNUPVGA",
    title: "Como conseguir o primeiro emprego depois do ensino médio",
    description:
      "Quais cargos de entrada procurar e como adaptar o objetivo do currículo a cada vaga.",
    tag: "Primeiro Emprego",
    source: "Alexandre Custódio",
    filter: "Primeiro emprego & Jovem Aprendiz",
  },
  {
    id: "jovem-aprendiz",
    youtubeId: "H2ZQ3OGVavM",
    title: "Como funciona o Jovem Aprendiz e onde achar vagas",
    description:
      "Idade, contrato, formação teórica e prática, e como buscar vagas de aprendiz.",
    tag: "Jovem Aprendiz",
    source: "Lucas Lozano",
    filter: "Primeiro emprego & Jovem Aprendiz",
  },
  {
    id: "linkedin",
    youtubeId: "pJ9CO6erfJw",
    title: "Como fazer um currículo no LinkedIn",
    description:
      "Passo a passo para montar foto, título e texto do perfil mesmo sem experiência formal.",
    tag: "Plataformas",
    source: "SENAI Play",
    filter: "Plataformas de vagas",
  },
  {
    id: "gupy",
    youtubeId: "ESZYxuBOpn0",
    title: "Como se cadastrar na Gupy",
    description:
      "O que preencher no cadastro da plataforma para o recrutador encontrar seu perfil.",
    tag: "Plataformas",
    source: "Ric Ricarreira",
    filter: "Plataformas de vagas",
  },
]
