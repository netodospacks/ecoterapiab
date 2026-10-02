"use client";

import { useEffect, useRef } from "react";
import { Target, Eye, Star, CheckCircle } from "lucide-react";

interface PropostoSectionProps {
  missao?: string;
  visao?: string;
  valores?: string[];
}

const defaultValores = [
  "Amor e respeito",
  "Inclusão",
  "Acolhimento",
  "Responsabilidade",
  "Compromisso com as pessoas e os animais",
];

export default function PropostoSection({
  missao = "Promover experiências de cuidado, desenvolvimento e inclusão por meio da conexão entre pessoas, cavalos e natureza.",
  visao = "Construir um espaço cada vez mais acolhedor, acessível e preparado para ampliar as oportunidades de desenvolvimento e bem-estar.",
  valores = defaultValores,
}: PropostoSectionProps) {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proposito"
      ref={sectionRef}
      aria-labelledby="proposito-title"
      className="section-padding relative overflow-hidden z-30 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]"
      style={{ background: "linear-gradient(135deg, #3D4D38 0%, #53664B 50%, #3D4D38 100%)" }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sage/5 blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-cream/5 blur-3xl translate-y-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="proposito-title"
            className="reveal reveal-delay-1 font-display font-light text-cream text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.15 }}
          >
            Cada vida merece a oportunidade de florescer.
          </h2>
        </div>

        {/* Video Placeholder */}
        <div className="reveal relative w-full aspect-video max-w-4xl mx-auto rounded-3xl overflow-hidden bg-cream/10 border border-cream/20 flex items-center justify-center shadow-[0_15px_50px_rgba(0,0,0,0.3)]">
          <div className="text-cream/50 text-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-sans text-sm sm:text-base">Espaço para Vídeo Institucional</p>
          </div>
        </div>
      </div>
    </section>
  );
}
