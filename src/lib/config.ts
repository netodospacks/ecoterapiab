// Default site configuration — used when Supabase is not yet configured
// These values are displayed as placeholders and should be updated via the Admin Panel

export const defaultConfig = {
  // Hero
  heroTitle: "Pequenos passos.\nGrandes transformações.",
  heroSubtitle:
    "Acreditamos no poder da conexão entre pessoas, cavalos e natureza para transformar vidas.",

  // Nossa História
  historiaTitle: "O Bem Viver Centro de Equoterapia e Terapias Integradas",
  historiaText: `O Bem Viver Centro de Equoterapia e Terapias Integradas é uma instituição localizada na zona rural de Gurinhém, Paraíba, voltada ao desenvolvimento mental, motor e social de pessoas por meio da interação com cavalos.

Filiado à ANDE-Brasil (Associação Nacional de Equoterapia), o centro realiza um trabalho focado no acolhimento de praticantes neurodivergentes (como pessoas com TEA) e com necessidades especiais.

Por meio da ecoterapia, buscamos oferecer experiências que valorizem o desenvolvimento, a autonomia, a confiança e o bem-estar.`,

  // Missão / Visão / Valores
  missao:
    "Promover experiências de cuidado, desenvolvimento e inclusão por meio da conexão entre pessoas, cavalos e natureza.",
  visao:
    "Construir um espaço cada vez mais acolhedor, acessível e preparado para ampliar as oportunidades de desenvolvimento e bem-estar.",
  valores: [
    "Amor e respeito",
    "Inclusão",
    "Acolhimento",
    "Responsabilidade",
    "Compromisso com as pessoas e os animais",
  ],

  // Doações
  donationValues: [10, 25, 50, 100],
  pixKeyType: "cpf", // cpf, cnpj, email, telefone, aleatoria
  pixKey: "", // Configurar no painel admin
  pixName: "Bem Viver Ecoterapia",
  pixCity: "Brasil",

  // Transparência
  transparencyCategories: [
    { label: "Cuidados e alimentação dos cavalos", icon: "🐴" },
    { label: "Manutenção dos espaços", icon: "🌿" },
    { label: "Materiais e equipamentos", icon: "🔧" },
    { label: "Atividades e ações do projeto", icon: "❤️" },
  ],

  // Contato
  whatsapp: "", // ex: 5511999999999
  instagram: "", // ex: @bemviverecoterapia
  email: "", // ex: contato@bemviverecoterapia.com.br
  address: "",
};

export type SiteConfig = typeof defaultConfig;
