"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Activity, Heart, Sparkles } from "lucide-react";

interface EcoterapiaSectionProps {
  title?: string;
  subtitle?: string;
}

const cards = [
  {
    icon: Activity,
    title: "Desenvolvimento e Movimento Motor",
    text: "O movimento tridimensional do cavalo proporciona estímulos únicos que desenvolvem o equilíbrio, a coordenação motora, a força e a consciência corporal de forma dinâmica e prazerosa.",
    img: "/images/gallery-2.jpg",
    imgAlt: "Cavalo pastando em campo verdejante ao nascer do sol",
  },
  {
    icon: Heart,
    title: "Conexão, Confiança e Afeto",
    text: "A interação com o cavalo, aliada ao acompanhamento técnico especializado, fortalece a autoconfiança, estimula a comunicação e constrói laços afetivos profundos.",
    img: "/images/gallery-3.jpg",
    imgAlt: "Close-up do olho de cavalo refletindo a vegetação e o campo",
  },
  {
    icon: Sparkles,
    title: "Acolhimento e Bem-Estar Integral",
    text: "O contato direto com o campo oferece um ambiente calmo e seguro para vivências terapêuticas personalizadas, respeitando o tempo, o ritmo e a singularidade de cada praticante.",
    img: "/images/gallery-1.jpg",
    imgAlt: "Mulher e criança em momento acolhedor de carinho e afeto com o cavalo",
  },
];

export default function EcoterapiaSection({
  title = "O poder de conectar a natureza e a presença transformadora do cavalo.",
  subtitle = "A Equoterapia combina o ambiente natural e o vínculo com os cavalos como recursos terapêuticos, promovendo o desenvolvimento integral de forma acolhedora, humana e personalizada.",
}: EcoterapiaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 110);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ecoterapia"
      ref={sectionRef}
      aria-labelledby="ecoterapia-title"
      className="relative bg-[#EAE9E5] py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden text-[#30372F]"
    >
      <div className="container-wide relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Centralizado */}
        <div className="text-center max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <h2
            id="ecoterapia-title"
            className="reveal font-display font-bold text-[#6A3D12] text-balance tracking-tight leading-[1.2] sm:leading-[1.25] text-2xl sm:text-3xl lg:text-[2.45rem] xl:text-[2.75rem]"
          >
            {title}
          </h2>
          <p className="reveal reveal-delay-1 font-sans text-xs sm:text-[14px] lg:text-[15px] text-[#6A3D12]/85 sm:text-[#6A3D12]/90 mt-4 sm:mt-5 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed sm:leading-[1.7]">
            {subtitle}
          </p>
        </div>

        {/* Grade de 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`reveal reveal-delay-${i + 1} group flex flex-col bg-white rounded-[22px] sm:rounded-3xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(106,61,18,0.08)] transition-all duration-400 hover:-translate-y-1.5`}
              >
                {/* Imagem com Fade Suave em Gradiente para o Branco */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/10.5] overflow-hidden bg-[#FAF9F6]">
                  <Image
                    src={card.img}
                    alt={card.imgAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradiente de transição suave da foto para o fundo branco do card */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-28 sm:h-32 bg-gradient-to-t from-white via-white/80 via-35% to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="flex-1 flex flex-col px-6 pb-7 sm:px-7 sm:pb-8 pt-1 sm:pt-2">
                  {/* Ícone Discreto em Container Arredondado */}
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EAE9E5]/80 text-[#3A3C11] mb-3.5 sm:mb-4 group-hover:bg-[#EAE9E5] transition-colors"
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                  </div>

                  {/* Título do Card */}
                  <h3 className="font-display font-bold text-[#6A3D12] text-base sm:text-[1.125rem] lg:text-[1.18rem] leading-snug mb-2 sm:mb-2.5">
                    {card.title}
                  </h3>

                  {/* Descrição do Card */}
                  <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#605345] leading-[1.62]">
                    {card.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
