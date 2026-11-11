export const brand = {
  name: "Meu Primeiro Emprego",
  tagline: "Inclusão produtiva e vagas de entrada",
} as const

export const navItems = [
  { to: "/", label: "Início", end: true },
  { to: "/descubra", label: "Descubra sua área", end: false },
  { to: "/videos", label: "Vídeos", end: false },
  { to: "/links", label: "Links úteis", end: false },
] as const

export const footerColumns = [
  {
    title: "Conformidade Legal & Compromisso",
    body: "Plataforma orientada às diretrizes da Lei da Aprendizagem (Lei nº 10.097/2000) e Consolidação das Leis do Trabalho (CLT). Promovemos oportunidades regulares, dignas e formativas para jovens em início de trajetória profissional.",
  },
  {
    title: "Gratuidade & Transparência",
    body: "Serviço de utilidade pública 100% gratuito. Não cobramos taxas de seleção nem comercializamos cursos vinculados. As candidaturas são redirecionadas com segurança para canais oficiais e plataformas autorizadas (LinkedIn, Gupy e sites de empresas contratantes).",
  },
] as const

export const footerLinks = [
  { to: "/acessibilidade", label: "Acessibilidade" },
  { to: "/privacidade", label: "Privacidade" },
] as const

export const copyright =
  "© 2024 Meu Primeiro Emprego. Todos os direitos reservados."
