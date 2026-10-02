"use client";

import { useEffect, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

interface ApoiadorSectionProps {
  whatsapp?: string;
}

export default function ApoiadorSection({ whatsapp = "" }: ApoiadorSectionProps) {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre o Bem Viver Ecoterapia.")}`
    : "#contato";

  const scrollToDoacoes = () => {
    document.getElementById("doacoes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="apoiadores"
      ref={sectionRef}
      aria-labelledby="apoiadores-title"
      className="section-padding relative overflow-hidden bg-cream-dark"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/gallery-2.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-15"
          sizes="100vw"
        />
      </div>

      <div className="container-narrow relative z-10 text-center">
        {/* Icon */}
        <div className="reveal inline-flex items-center justify-center w-16 h-16 bg-moss rounded-full mb-8 shadow-nature-lg mx-auto">
          <Heart size={28} className="text-cream" aria-hidden="true" />
        </div>

        {/* Title */}
        <h2
          id="apoiadores-title"
          className="reveal reveal-delay-1 font-display font-light text-text-dark text-balance"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}
        >
          Juntos, podemos ir mais longe.
        </h2>

        {/* Text */}
        <p className="reveal reveal-delay-2 font-sans text-body-lg text-text-medium mt-6 max-w-xl mx-auto leading-relaxed">
          Existem muitas formas de ajudar o Bem Viver Ecoterapia. Uma doação, o compartilhamento da
          nossa história ou uma parceria podem fazer a diferença.
        </p>

        <p className="reveal reveal-delay-3 font-sans text-body-md text-text-medium mt-2 max-w-lg mx-auto">
          Cada gesto de apoio contribui para fortalecer esse propósito.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-4 flex flex-wrap justify-center gap-4 mt-10">
          <button
            onClick={scrollToDoacoes}
            className="btn-primary px-8 py-4 text-base"
          >
            <Heart size={18} aria-hidden="true" />
            Fazer uma doação
          </button>
          <a
            href={whatsappUrl}
            target={whatsapp ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-moss/50 text-moss bg-white rounded-full font-sans font-medium text-base transition-all duration-300 hover:bg-moss hover:text-cream hover:border-moss hover:-translate-y-0.5 shadow-nature"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Falar pelo WhatsApp
          </a>
        </div>

        {/* Decorative divider */}
        <div className="reveal mt-16 flex items-center gap-6 max-w-xs mx-auto" aria-hidden="true">
          <div className="h-px flex-1 bg-sand" />
          <span className="text-sage text-lg">✦</span>
          <div className="h-px flex-1 bg-sand" />
        </div>
      </div>
    </section>
  );
}
