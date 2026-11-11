export type LinkFilter = "Todos" | "Públicos & CLT" | "Vagas & Redes" | "Cursos Gratuitos"

export const linkFilters: readonly { id: LinkFilter; label: string }[] = [
  { id: "Todos", label: "Todos" },
  { id: "Públicos & CLT", label: "Públicos & CLT" },
  { id: "Vagas & Redes", label: "Vagas & Redes" },
  { id: "Cursos Gratuitos", label: "Cursos Gratuitos" },
]

export const linksIntro = {
  eyebrow: "Diretório Oficial & Certificado",
  title: "Links úteis para sua carreira",
  body: "Conheça ferramentas e serviços que podem ajudar na sua busca por emprego e qualificação profissional.",
  assurances: ["100% Gratuitos", "Fontes governamentais e certificadas"],
} as const

export type CareerGroup = {
  id: Exclude<LinkFilter, "Todos">
  title: string
  description: string
  icon: string
}

export const careerGroups: readonly CareerGroup[] = [
  {
    id: "Públicos & CLT",
    title: "Serviços Públicos e Documentação Trabalhista",
    description:
      "Acesso a registros formais, direitos legais e sistemas do Governo Federal",
    icon: "account_balance",
  },
  {
    id: "Vagas & Redes",
    title: "Plataformas de Emprego e Oportunidades",
    description:
      "Conexão com vagas de estágio, aprendiz e primeiros empregos em empresas de todo o país",
    icon: "business_center",
  },
  {
    id: "Cursos Gratuitos",
    title: "Qualificação Profissional e Cursos Gratuitos",
    description:
      "Capacitação chancelada com certificação sem custos para ampliar seu currículo",
    icon: "auto_stories",
  },
]

export type CareerLink = {
  id: string
  group: Exclude<LinkFilter, "Todos">
  title: string
  description: string
  host: string
  hostIcon: string
  badge: string
  detail: string
  action: string
  href: string
}

export const careerLinks: readonly CareerLink[] = [
  {
    id: "ctps",
    group: "Públicos & CLT",
    title: "Carteira de Trabalho Digital",
    description:
      "Emita e consulte seus vínculos trabalhistas, contratos e anotações diretamente no portal Gov.br.",
    host: "gov.br / MTE",
    hostIcon: "domain",
    badge: "Obrigatório CLT",
    detail: "Identificação civil pelo CPF",
    action: "Acessar portal",
    href: "https://www.gov.br/pt-br/temas/carteira-de-trabalho-digital",
  },
  {
    id: "sine",
    group: "Públicos & CLT",
    title: "Portal Emprega Brasil / SINE",
    description:
      "Acesse serviços públicos de intermediação de mão de obra e vagas registradas pelo Ministério do Trabalho e Emprego.",
    host: "empregabrasil.mte.gov.br",
    hostIcon: "public",
    badge: "Rede SINE",
    detail: "Intermediação pública nacional",
    action: "Acessar portal",
    href: "https://empregabrasil.mte.gov.br",
  },
  {
    id: "linkedin",
    group: "Vagas & Redes",
    title: "LinkedIn",
    description:
      "Crie sua rede de conexões profissionais, acompanhe empresas e filtre oportunidades para início de carreira.",
    host: "linkedin.com",
    hostIcon: "groups",
    badge: "Rede Social",
    detail: "Networking corporativo",
    action: "Visitar",
    href: "https://www.linkedin.com",
  },
  {
    id: "gupy",
    group: "Vagas & Redes",
    title: "Gupy — Portal de Carreiras",
    description:
      "Encontre vagas de estágio, jovem aprendiz e posições júnior em centenas de empresas nacionais.",
    host: "gupy.io",
    hostIcon: "travel_explore",
    badge: "Triagem Digital",
    detail: "Inscrição unificada",
    action: "Visitar",
    href: "https://www.gupy.io",
  },
  {
    id: "ciee",
    group: "Vagas & Redes",
    title: "CIEE",
    description:
      "Programas estruturados de estágio e aprendizagem para estudantes do ensino fundamental, médio e técnico.",
    host: "portal.ciee.org.br",
    hostIcon: "school",
    badge: "Lei da Aprendizagem",
    detail: "Estudantes e jovens",
    action: "Visitar",
    href: "https://portal.ciee.org.br",
  },
  {
    id: "gosergipe-vagas",
    group: "Vagas & Redes",
    title: "GO Sergipe — Vagas de emprego",
    description:
      "Vagas de emprego divulgadas pelo Governo de Sergipe para conectar trabalhadores e empresas do estado.",
    host: "gosergipe.se.gov.br",
    hostIcon: "work",
    badge: "Governo de Sergipe",
    detail: "Oportunidades no estado",
    action: "Ver vagas",
    href: "https://gosergipe.se.gov.br/oportunidades",
  },
  {
    id: "gosergipe-cursos",
    group: "Cursos Gratuitos",
    title: "GO Sergipe — Qualificação",
    description:
      "Cursos gratuitos de qualificação profissional do Qualifica Sergipe, com inscrição pela conta gov.br.",
    host: "gosergipe.se.gov.br",
    hostIcon: "school",
    badge: "Qualifica Sergipe",
    detail: "Formação gratuita no estado",
    action: "Ver cursos",
    href: "https://gosergipe.se.gov.br/cursos",
  },
  {
    id: "senai",
    group: "Cursos Gratuitos",
    title: "SENAI",
    description:
      "Cursos gratuitos de aprendizagem industrial e qualificação técnica em tecnologia, mecânica e indústria.",
    host: "portaldaindustria.com.br",
    hostIcon: "precision_manufacturing",
    badge: "Indústria & TI",
    detail: "Formação técnica",
    action: "Ver cursos",
    href: "https://www.portaldaindustria.com.br/senai/",
  },
  {
    id: "senac",
    group: "Cursos Gratuitos",
    title: "SENAC",
    description:
      "Programas de gratuidade regimental e formação profissional em comércio de bens, serviços, turismo e TI.",
    host: "senac.br",
    hostIcon: "storefront",
    badge: "Comércio & Serviços",
    detail: "Gratuidade regimental",
    action: "Ver cursos",
    href: "https://www.senac.br",
  },
  {
    id: "sesi",
    group: "Cursos Gratuitos",
    title: "SESI",
    description:
      "Educação básica, EJA e programas de qualificação do Serviço Social da Indústria para trabalhadores e suas famílias.",
    host: "sesi.portaldaindustria.com.br",
    hostIcon: "health_and_safety",
    badge: "Indústria",
    detail: "Educação e qualificação",
    action: "Ver cursos",
    href: "https://sesi.portaldaindustria.com.br/",
  },
  {
    id: "sesc",
    group: "Cursos Gratuitos",
    title: "SESC",
    description:
      "Cursos, oficinas e ações de educação do Serviço Social do Comércio, com programação nas unidades do estado.",
    host: "sesc.com.br",
    hostIcon: "diversity_3",
    badge: "Comércio",
    detail: "Educação e cultura",
    action: "Ver cursos",
    href: "https://www.sesc.com.br/",
  },
  {
    id: "sebrae",
    group: "Cursos Gratuitos",
    title: "SEBRAE",
    description:
      "Cursos gratuitos de empreendedorismo, gestão e negócios para quem quer abrir ou melhorar um pequeno negócio.",
    host: "sebrae.com.br",
    hostIcon: "store",
    badge: "Empreendedorismo",
    detail: "Pequenos negócios",
    action: "Ver cursos",
    href: "https://sebrae.com.br/",
  },
  {
    id: "senar",
    group: "Cursos Gratuitos",
    title: "SENAR",
    description:
      "Formação profissional rural gratuita no Senar Play, com cursos online para o campo e a agropecuária.",
    host: "ead.senar.org.br",
    hostIcon: "agriculture",
    badge: "Campo & Agro",
    detail: "Senar Play",
    action: "Ver cursos",
    href: "https://ead.senar.org.br/",
  },
  {
    id: "sest-senat",
    group: "Cursos Gratuitos",
    title: "SEST SENAT",
    description:
      "Cursos gratuitos de formação e qualificação para trabalhadores do transporte e seus dependentes.",
    host: "sestsenat.org.br",
    hostIcon: "local_shipping",
    badge: "Transporte",
    detail: "SEST e SENAT",
    action: "Ver cursos",
    href: "https://www.sestsenat.org.br/",
  },
  {
    id: "sescoop",
    group: "Cursos Gratuitos",
    title: "SESCOOP",
    description:
      "Cursos gratuitos da CapacitaCoop sobre cooperativismo, gestão e formação profissional para cooperativas.",
    host: "capacita.coop.br",
    hostIcon: "handshake",
    badge: "Cooperativismo",
    detail: "CapacitaCoop",
    action: "Ver cursos",
    href: "https://capacita.coop.br/",
  },
  {
    id: "escola",
    group: "Cursos Gratuitos",
    title: "Escola do Trabalhador 4.0",
    description:
      "Cursos online e gratuitos em parceria com o Ministério do Trabalho para habilidades digitais.",
    host: "escolatrabalhador40.com.br",
    hostIcon: "laptop_mac",
    badge: "MTE & Microsoft",
    detail: "Competências do futuro",
    action: "Ver cursos",
    href: "https://escolatrabalhador40.com.br",
  },
]

export const registrationChecklist = {
  title: "Primeira vez se cadastrando? Tenha em mãos:",
  items: [
    "Número de CPF",
    "Comprovante de residência",
    "Declaração de matrícula escolar",
    "Conta ativa gov.br (nível Prata ou Ouro)",
  ],
  action: "Criar conta Gov.br",
  href: "https://www.gov.br",
} as const

export const safetyNote = {
  title: "Nota de Segurança & Proteção ao Candidato",
  lead: "Nota de Segurança:",
  body: "Todas as plataformas listadas são canais oficiais gratuitos. Nunca pague taxas para se candidatar a vagas de emprego ou participar de processos seletivos.",
  warning:
    'Cobranças antecipadas sob pretexto de "taxas de exame admissional", "material didático para aprovação" ou "taxa de matrícula em processo seletivo" configuram fraude trabalhista. Denuncie irregularidades no Ministério Público do Trabalho.',
} as const
