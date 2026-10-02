"use client";

import Link from "next/link";
import { Heart, Mail, MessageCircle, ArrowUp } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface FooterSectionProps {
  whatsapp?: string;
  instagram?: string;
  email?: string;
}

const footerLinks = [
  { href: "#historia", label: "Nossa História" },
  { href: "#ecoterapia", label: "O que é Ecoterapia" },
  { href: "#proposito", label: "Nosso Propósito" },
  { href: "#galeria", label: "Galeria" },
  { href: "#doacoes", label: "Faça uma Doação" },
  { href: "#contato", label: "Contato" },
];

export default function FooterSection({
  whatsapp = "",
  instagram = "",
  email = "",
}: FooterSectionProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      role="contentinfo"
      className="bg-text-dark text-cream"
    >
      {/* Main footer */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-moss flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" fill="#F9F7F1" opacity="0.9" />
                  <circle cx="12" cy="10" r="3" fill="#53664B" />
                </svg>
              </div>
              <div>
                <span className="font-display font-semibold text-xl block text-cream">Bem Viver</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-cream/50">Ecoterapia</span>
              </div>
            </div>
            <p className="font-sans text-sm text-cream/65 leading-relaxed max-w-xs">
              Promovendo desenvolvimento, acolhimento e bem-estar por meio da conexão entre pessoas, cavalos e natureza.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {instagram && (
                <a
                  href={`https://instagram.com/${instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-moss transition-colors duration-300"
                  aria-label="Siga-nos no Instagram"
                >
                  <InstagramIcon width={16} height={16} aria-hidden="true" />
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-moss transition-colors duration-300"
                  aria-label="Contate-nos pelo WhatsApp"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center hover:bg-moss transition-colors duration-300"
                  aria-label="Envie-nos um e-mail"
                >
                  <Mail size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Links do rodapé">
            <h3 className="font-sans text-xs uppercase tracking-widest text-cream/50 mb-5">Navegação</h3>
            <ul className="space-y-3" role="list">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-sans text-sm text-cream/65 hover:text-cream transition-colors duration-200 hover:pl-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Donation CTA */}
          <div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-cream/50 mb-5">Apoie o projeto</h3>
            <p className="font-sans text-sm text-cream/65 leading-relaxed mb-5">
              Sua contribuição ajuda a manter e ampliar o Bem Viver Ecoterapia.
            </p>
            <a
              href="#doacoes"
              onClick={(e) => handleNavClick(e, "#doacoes")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-cream text-sm font-sans font-medium rounded-full hover:bg-moss-dark transition-all duration-300 hover:-translate-y-0.5 shadow-nature"
            >
              <Heart size={14} aria-hidden="true" />
              Fazer uma doação
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <p className="font-sans text-xs text-cream/40">
              © {new Date().getFullYear()} Bem Viver Ecoterapia. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacidade"
              className="font-sans text-xs text-cream/40 hover:text-cream/70 transition-colors"
            >
              Política de Privacidade
            </Link>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-cream/10 hover:bg-moss rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
