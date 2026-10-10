// Default site configuration — used when Supabase is not yet configured
// These values are displayed as placeholders and should be updated via the Admin Panel

export const defaultConfig = {
  // Hero
  heroTitle: "Onde o cuidado e a\nnatureza se unem para\ntransformar vidas!",
  heroSubtitle:
    "Um espaço de acolhimento, desenvolvimento e novas possibilidades por meio da conexão entre pessoas, cavalos e natureza.",

  // Nossa História
  historiaTitle: "O Centro de Equoterapia e Terapias Integradas Bem Viver",
  historiaSubtitle: "Uma história construída com amor, cuidado e propósito.",
  historiaText: `O Centro Bem Viver é uma instituição localizada na zona rural de Gurinhém, na Paraíba. Promovemos o desenvolvimento integral e a inclusão social de pessoas neuroatípicas por meio da Equoterapia e das Terapias Integradas.`,


  // Equoterapia
  ecoterapiaTitle: "O poder de conectar a natureza e a presença transformadora do cavalo.",
  ecoterapiaSubtitle:
    "A Equoterapia combina o ambiente natural e o vínculo com os cavalos como recursos terapêuticos, promovendo o desenvolvimento integral de forma acolhedora, humana e personalizada.",

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
