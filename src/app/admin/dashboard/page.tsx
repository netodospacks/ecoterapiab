import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ImageIcon, Heart, Phone, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

const cards = [
  {
    href: "/admin/conteudo",
    icon: BookOpen,
    title: "Conteúdo",
    description: "Edite textos, títulos, história do projeto e vídeo da página inicial.",
    color: "bg-moss/10 text-moss",
  },
  {
    href: "/admin/galeria",
    icon: ImageIcon,
    title: "Galeria",
    description: "Adicione, reordene ou remova imagens da galeria do site.",
    color: "bg-earth/10 text-earth",
  },
  {
    href: "/admin/doacoes",
    icon: Heart,
    title: "Doações & Pix",
    description: "Configure a chave Pix, valores sugeridos e seção de transparência.",
    color: "bg-sage/20 text-moss",
  },
  {
    href: "/admin/contato",
    icon: Phone,
    title: "Contato & Redes",
    description: "Atualize WhatsApp, e-mail, Instagram e endereço.",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-text-dark">Bem-vindo ao Painel</h1>
        <p className="font-sans text-sm text-text-medium mt-1">
          Gerencie o conteúdo do site Bem Viver Ecoterapia sem precisar de programação.
        </p>
      </div>

      {/* Quick access cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="admin-card group hover:border-moss/30 hover:shadow-nature transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.color}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="font-sans font-semibold text-text-dark">{card.title}</h2>
                    <ArrowRight
                      size={16}
                      className="text-text-light group-hover:text-moss group-hover:translate-x-1 transition-all duration-200"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="font-sans text-sm text-text-medium mt-1 leading-snug">{card.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Status panel */}
      <div className="admin-card">
        <h2 className="font-sans font-semibold text-text-dark mb-4">Status do site</h2>
        <div className="space-y-3">
          <StatusItem label="Supabase" status={isSupabaseConfigured() ? "ok" : "warn"} okText="Conectado" warnText="Não configurado — usando dados padrão" />
          <StatusItem label="Chave Pix" status="warn" warnText="Configure em Doações & Pix" />
          <StatusItem label="E-mail (Resend)" status={isResendConfigured() ? "ok" : "warn"} okText="Configurado" warnText="Configure o RESEND_API_KEY no .env.local" />
          <StatusItem label="WhatsApp" status="warn" warnText="Configure em Contato & Redes" />
        </div>

        <div className="mt-5 pt-5 border-t border-sand">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-moss hover:text-moss-dark font-medium transition-colors"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Visualizar site público
          </a>
        </div>
      </div>
    </div>
  );
}

function isSupabaseConfigured() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
  );
}

function isResendConfigured() {
  return (
    process.env.RESEND_API_KEY &&
    process.env.RESEND_API_KEY !== "re_placeholder"
  );
}

function StatusItem({
  label,
  status,
  okText,
  warnText,
}: {
  label: string;
  status: "ok" | "warn" | "error";
  okText?: string;
  warnText?: string;
}) {
  const colors = {
    ok: "bg-green-100 text-green-700",
    warn: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-600",
  };
  const texts = {
    ok: okText || "OK",
    warn: warnText || "Atenção",
    error: "Erro",
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-sans text-sm text-text-medium">{label}</span>
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium font-sans ${colors[status]}`}>
        {texts[status]}
      </span>
    </div>
  );
}
