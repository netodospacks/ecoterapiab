import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bem Viver Ecoterapia — Conexão entre pessoas, cavalos e natureza",
    template: "%s | Bem Viver Ecoterapia",
  },
  description:
    "O Bem Viver Ecoterapia promove desenvolvimento, acolhimento e bem-estar por meio da conexão entre pessoas, cavalos e natureza. Conheça nosso trabalho e faça parte dessa transformação.",
  keywords: [
    "ecoterapia",
    "terapia assistida por cavalos",
    "equoterapia",
    "bem viver",
    "desenvolvimento infantil",
    "terapia com animais",
    "saúde mental",
    "inclusão",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Bem Viver Ecoterapia",
    title: "Bem Viver Ecoterapia — Pequenos passos. Grandes transformações.",
    description:
      "Acreditamos no poder da conexão entre pessoas, cavalos e natureza para transformar vidas. Conheça o Bem Viver Ecoterapia.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bem Viver Ecoterapia — Sessão de ecoterapia com cavalo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bem Viver Ecoterapia",
    description: "Conexão entre pessoas, cavalos e natureza para transformar vidas.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#53664B" />
      </head>
      <body className="font-sans bg-cream text-text-dark antialiased">{children}</body>
    </html>
  );
}
