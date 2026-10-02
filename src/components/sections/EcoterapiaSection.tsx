"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Activity, Heart, Sparkles } from "lucide-react";

const cards = [
  {
    icon: Activity,
    title: "Desenvolvimento e movimento",
    text: "As experiências com cavalos podem favorecer estímulos motores, equilíbrio, coordenação e consciência corporal, de acordo com a abordagem terapêutica utilizada.",
    color: "bg-moss/8 border-moss/20",
    iconColor: "text-moss bg-moss/10",
    img: "/images/gallery-2.jpg",
    imgAlt: "Paisagem natural com cavalo ao amanhecer",
  },
  {
    icon: Heart,
    title: "Conexão e confiança",
    text: "O contato com o animal e o acompanhamento profissional podem contribuir para o fortalecimento da confiança, da comunicação e dos vínculos afetivos.",
    color: "bg-earth/5 border-earth/15",
    iconColor: "text-earth bg-earth/10",
    img: "/images/gallery-3.jpg",
    imgAlt: "Close-up do olho de um cavalo refletindo a natureza",
  },
  {
    icon: Sparkles,
    title: "Acolhimento e bem-estar",
    text: "O ambiente natural e a interação com os cavalos proporcionam experiências individualizadas, respeitando o ritmo e as necessidades de cada participante.",
    color: "bg-sage/10 border-sage/25",
    iconColor: "text-sage bg-sage/15",
    img: "/images/gallery-1.jpg",
    imgAlt: "Sessão de ecoterapia com criança e terapeuta",
  },
];

export default function EcoterapiaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 130);
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
      className="section-padding bg-cream-dark relative z-20 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="ecoterapia-title"
            className="reveal reveal-delay-1 font-display font-light text-text-dark text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
          >
            O poder da conexão com a natureza.
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-body-md text-text-medium mt-5 leading-relaxed hidden sm:block">
            A ecoterapia utiliza o ambiente natural e a interação com animais como elementos terapêuticos,
            promovendo desenvolvimento integral de maneira acolhedora e personalizada.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:gap-8">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className={`reveal reveal-delay-${i + 1} group relative bg-white rounded-xl sm:rounded-3xl overflow-hidden shadow-nature transition-all duration-500 hover:shadow-nature-lg hover:-translate-y-2`}
              >
                {/* Image */}
                <div className="relative h-20 sm:h-36 md:h-52 overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.imgAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="p-2 sm:p-5 lg:p-7 pt-2 sm:pt-4">
                  <div className={`inline-flex items-center justify-center w-6 h-6 sm:w-11 sm:h-11 rounded-lg sm:rounded-2xl mb-2 sm:mb-4 ${card.iconColor}`}>
                    <Icon className="w-3 h-3 sm:w-5 sm:h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-[10px] sm:text-base lg:text-xl text-text-dark mb-1 sm:mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[8px] sm:text-xs lg:text-body-sm text-text-medium leading-relaxed">
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
