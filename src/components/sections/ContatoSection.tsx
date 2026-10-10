"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface ContatoSectionProps {
  whatsapp?: string;
  instagram?: string;
  email?: string;
  address?: string;
}

export default function ContatoSection({
  whatsapp = "",
  instagram = "",
  email = "",
  address = "",
}: ContatoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre o Bem Viver Ecoterapia.")}`
    : "#";
  const instagramUrl = instagram
    ? `https://instagram.com/${instagram.replace("@", "")}`
    : "#";

  const contactItems = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsapp || "(83) 99999-9999",
      href: whatsapp ? whatsappUrl : undefined,
      color: "bg-green-50 text-green-700 border-green-200",
      cta: "Conversar no WhatsApp",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: instagram || "@bemviverecoterapia",
      href: instagram ? instagramUrl : undefined,
      color: "bg-pink-50 text-pink-700 border-pink-200",
      cta: "Seguir no Instagram",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: email || "contato@bemviverecoterapia.com.br",
      href: email ? `mailto:${email}` : undefined,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      cta: "Enviar um e-mail",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: address || "Zona rural de Gurinhém, PB",
      href: undefined,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      cta: "Gurinhém - Paraíba",
    },
  ];

  return (
    <section
      id="contato"
      ref={sectionRef}
      aria-labelledby="contato-title"
      className="section-padding bg-[#FAF9F6] border-t border-[#EAE9E5]"
    >
      <div className="container-wide max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Centralizado */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="reveal font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#7E8569] mb-2">
            FALE CONOSCO
          </p>
          <h2
            id="contato-title"
            className="reveal reveal-delay-1 font-display font-bold text-[#6A3D12] text-balance text-2xl sm:text-3xl lg:text-4xl"
          >
            Vamos conversar?
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-sm sm:text-base text-[#605345] mt-4 leading-relaxed">
            Estamos aqui para tirar dúvidas, agendar visitas ou apresentar nossos atendimentos. Entre em contato pelos nossos canais oficiais:
          </p>
        </div>

        {/* Grade de Contatos Diretos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const CardContent = (
              <>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 border ${item.color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-6 h-6 stroke-[1.8]" aria-hidden="true" />
                </div>
                <p className="font-sans text-[11px] font-semibold tracking-wider text-text-light uppercase mb-1">
                  {item.label}
                </p>
                <p className="font-sans text-sm text-[#30372F] font-medium mb-3 truncate w-full">
                  {item.value}
                </p>
                {item.href ? (
                  <span className="font-sans text-xs text-[#6A3D12] font-semibold flex items-center gap-1 group-hover:underline mt-auto">
                    {item.cta} &rarr;
                  </span>
                ) : (
                  <span className="font-sans text-xs text-text-medium mt-auto">
                    {item.cta}
                  </span>
                )}
              </>
            );

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal reveal-delay-${i + 1} group flex flex-col p-6 bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(106,61,18,0.08)] border border-[#EAE9E5] hover:border-[#6A3D12]/30 transition-all duration-300 hover:-translate-y-1`}
              >
                {CardContent}
              </a>
            ) : (
              <div
                key={item.label}
                className={`reveal reveal-delay-${i + 1} group flex flex-col p-6 bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#EAE9E5] transition-all`}
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
