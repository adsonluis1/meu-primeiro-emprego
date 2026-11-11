export type QuizTrack = "atendimento" | "admin" | "tecnico" | "operacional"

export type QuizOption = {
  id: string
  title: string
  detail: string
  track: QuizTrack
}

export type QuizQuestion = {
  id: string
  kicker: string
  prompt: string
  options: readonly QuizOption[]
}

export const quizIntro = {
  eyebrow: "Orientação Vocacional Gratuita",
  title: "Descubra a área profissional que combina com você",
} as const

export function quizIntroBody(questionCount: number) {
  return `Responda a ${questionCount} perguntas simples sobre seus interesses, rotina e preferências do dia a dia. Não é necessário ter experiência anterior nem fazer cadastro.`
}

export const quizQuestions: readonly QuizQuestion[] = [
  {
    id: "q1",
    kicker: "Interesses",
    prompt: "Quando você imagina um dia de trabalho, o que te deixa mais à vontade?",
    options: [
      {
        id: "q1-conversar",
        title: "Conversar, explicar e ajudar alguém a resolver uma dúvida.",
        detail: "Empatia, escuta e comunicação no contato com outras pessoas.",
        track: "atendimento",
      },
      {
        id: "q1-organizar",
        title: "Deixar listas, pastas e informações no lugar certo.",
        detail: "Organização, rotina e cuidado com documentos.",
        track: "admin",
      },
      {
        id: "q1-sistema",
        title: "Entender um aplicativo, um erro de tela ou uma ferramenta digital.",
        detail: "Curiosidade técnica e paciência para investigar.",
        track: "tecnico",
      },
      {
        id: "q1-movimento",
        title: "Movimentar, conferir e organizar coisas no espaço físico.",
        detail: "Praticidade, ritmo e trabalho com as mãos.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q2",
    kicker: "Rotina de aprendizado",
    prompt: "Como você prefere aprender algo novo no trabalho?",
    options: [
      {
        id: "q2-junto",
        title: "Ao lado de alguém, ouvindo e praticando o atendimento.",
        detail: "Aprender no contato, com exemplo e conversa.",
        track: "atendimento",
      },
      {
        id: "q2-passo",
        title: "Com um passo a passo escrito e uma rotina clara.",
        detail: "Seguir uma lista, conferir e repetir com disciplina.",
        track: "admin",
      },
      {
        id: "q2-testar",
        title: "Testando a ferramenta até entender como ela funciona.",
        detail: "Explorar a interface e achar o caminho sozinho.",
        track: "tecnico",
      },
      {
        id: "q2-fazer",
        title: "Fazendo a tarefa no lugar, no ritmo de quem está ao redor.",
        detail: "Aprender fazendo, com movimento e repetição.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q3",
    kicker: "Foco & Preferências",
    prompt:
      "No seu dia a dia ou nos estudos, qual dessas atividades você realiza com mais facilidade e satisfação?",
    options: [
      {
        id: "q3-conversar",
        title:
          "Conversar com pessoas, ouvir necessidades, acolher e tirar dúvidas com paciência.",
        detail:
          "Habilidade social, empatia ativa, mediação de conflitos e suporte humanizado.",
        track: "atendimento",
      },
      {
        id: "q3-organizar",
        title:
          "Organizar pastas, conferir listas de informações, preencher dados e manter rotinas em ordem.",
        detail:
          "Atenção minuciosa aos detalhes, controle de planilhas e disciplina operacional.",
        track: "admin",
      },
      {
        id: "q3-logica",
        title:
          "Resolver problemas lógicos no computador, entender como aplicativos e ferramentas funcionam.",
        detail:
          "Curiosidade tecnológica, raciocínio investigativo e facilidade com interfaces digitais.",
        track: "tecnico",
      },
      {
        id: "q3-estoque",
        title:
          "Ajudar na conferência física de mercadorias, organizar estoques e realizar atividades manuais dinâmicas.",
        detail:
          "Praticidade física, agilidade espacial, controle de volumes e movimentação contínua.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q4",
    kicker: "Ambiente",
    prompt: "Qual ambiente combina mais com o seu jeito?",
    options: [
      {
        id: "q4-pessoas",
        title: "Balcão, telefone ou chat, falando com pessoas o dia todo.",
        detail: "Contato frequente e resposta rápida a quem precisa.",
        track: "atendimento",
      },
      {
        id: "q4-escritorio",
        title: "Escritório, com planilhas, arquivos e uma mesa organizada.",
        detail: "Rotina estável e tarefas que pedem conferência.",
        track: "admin",
      },
      {
        id: "q4-tela",
        title: "Computador, chamados e sistemas o dia inteiro.",
        detail: "Ferramentas digitais e problemas para investigar.",
        track: "tecnico",
      },
      {
        id: "q4-loja",
        title: "Loja, estoque ou rua, com movimento constante.",
        detail: "Espaço físico, deslocamento e tarefa visível.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q5",
    kicker: "Primeiro emprego",
    prompt: "O que você não abre mão em uma primeira oportunidade?",
    options: [
      {
        id: "q5-treino",
        title: "Treinamento e alguém por perto para tirar dúvidas.",
        detail: "Acolhimento no começo e chance de perguntar.",
        track: "atendimento",
      },
      {
        id: "q5-claro",
        title: "Horário combinado e tarefas bem explicadas.",
        detail: "Previsibilidade e um combinado claro do que fazer.",
        track: "admin",
      },
      {
        id: "q5-ferramenta",
        title: "Chance de aprender uma ferramenta digital de verdade.",
        detail: "Crescer no uso de sistemas, não só repetir tarefa.",
        track: "tecnico",
      },
      {
        id: "q5-pratica",
        title: "Atividade prática, sem ficar o dia inteiro parado.",
        detail: "Movimento, variedade e resultado visível.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q6",
    kicker: "Imprevisto",
    prompt: "Quando surge um imprevisto, o que você faz primeiro?",
    options: [
      {
        id: "q6-avisar",
        title: "Aviso a pessoa e combino o próximo passo.",
        detail: "Manter o contato claro enquanto a situação se resolve.",
        track: "atendimento",
      },
      {
        id: "q6-lista",
        title: "Anoto o que mudou e ajusto a lista do que falta fazer.",
        detail: "Reorganizar a rotina antes de seguir.",
        track: "admin",
      },
      {
        id: "q6-sistema",
        title: "Abro o sistema e tento achar onde travou.",
        detail: "Investigar a ferramenta até entender o erro.",
        track: "tecnico",
      },
      {
        id: "q6-lugar",
        title: "Vou até o lugar e resolvo no espaço físico.",
        detail: "Conferir com as mãos o que saiu do lugar.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q7",
    kicker: "Resultado do dia",
    prompt: "Qual resultado no fim do dia te deixa mais satisfeito?",
    options: [
      {
        id: "q7-duvida",
        title: "Alguém saiu com a dúvida resolvida.",
        detail: "Saber que a conversa ajudou de verdade.",
        track: "atendimento",
      },
      {
        id: "q7-ordem",
        title: "A mesa, a planilha e os prazos ficaram em ordem.",
        detail: "Encerrar o dia com tudo conferido.",
        track: "admin",
      },
      {
        id: "q7-chamado",
        title: "Um erro de tela ou um chamado foi encerrado.",
        detail: "Resolver um problema digital do começo ao fim.",
        track: "tecnico",
      },
      {
        id: "q7-estoque",
        title: "O estoque, a loja ou a entrega foram conferidos.",
        detail: "Ver o resultado no espaço, pronto para o próximo turno.",
        track: "operacional",
      },
    ],
  },
  {
    id: "q8",
    kicker: "Ritmo",
    prompt: "Em qual ritmo você rende melhor?",
    options: [
      {
        id: "q8-conversas",
        title: "Conversas curtas, uma depois da outra.",
        detail: "Atender várias pessoas ao longo do dia.",
        track: "atendimento",
      },
      {
        id: "q8-blocos",
        title: "Blocos quietos, com tempo para conferir.",
        detail: "Concentrar em uma lista sem interrupção constante.",
        track: "admin",
      },
      {
        id: "q8-foco",
        title: "Foco longo em um problema na tela.",
        detail: "Ficar no mesmo chamado até entender.",
        track: "tecnico",
      },
      {
        id: "q8-movimento",
        title: "Movimento o dia todo, com pouca tela.",
        detail: "Alternar tarefas físicas sem ficar parado.",
        track: "operacional",
      },
    ],
  },
]

export type QuizResult = {
  id: string
  track: QuizTrack
  title: string
  description: string
  roles: readonly string[]
}

export const quizResultsIntro = {
  title: "Diagnóstico Preliminar Concluído",
  redo: "Refazer questionário",
  noExperienceTitle: "Sem experiência? Não tem problema.",
  noExperienceBody:
    "Pela Lei da Aprendizagem e vagas de nível inicial, empregadores valorizam vontade de aprender e assiduidade acima de qualquer histórico formal.",
  interviewTips: "Dicas para entrevista",
  interviewTo: "/videos",
} as const

export function quizResultsBody(areaCount: number) {
  if (areaCount === 1) {
    return "Suas respostas apontam uma área de atuação compatível com seu perfil inicial."
  }
  return `Identificamos ${areaCount} áreas com maior compatibilidade para seu perfil inicial com base nas respostas enviadas.`
}

export const quizResults: readonly QuizResult[] = [
  {
    id: "atendimento",
    track: "atendimento",
    title: "Atendimento ao Cliente e Suporte",
    description:
      "Foco primordial em comunicação clara, empatia, escuta ativa e resolução ágil de problemas em canais digitais ou balcões.",
    roles: ["Operador de Atendimento", "Recepcionista", "Assistente de Suporte Jr."],
  },
  {
    id: "admin",
    track: "admin",
    title: "Administração e Rotinas de Escritório",
    description:
      "Foco em conferência criteriosa de documentos físicos e digitais, preenchimento de planilhas básicas e organização de arquivos.",
    roles: ["Jovem Aprendiz Administrativo", "Auxiliar de Escritório"],
  },
  {
    id: "tecnico",
    track: "tecnico",
    title: "Suporte técnico e sistemas",
    description:
      "Foco em investigar erros de tela, atender chamados e aprender as ferramentas digitais usadas no dia a dia.",
    roles: ["Assistente de Suporte Técnico Jr.", "Estagiário de Suporte e Operações"],
  },
  {
    id: "operacional",
    track: "operacional",
    title: "Operação, loja e logística",
    description:
      "Foco em conferência de estoque, organização de loja, movimentação e tarefas práticas com resultado visível.",
    roles: ["Aprendiz de Logística", "Auxiliar de Loja", "Atendente de Balcão"],
  },
]
