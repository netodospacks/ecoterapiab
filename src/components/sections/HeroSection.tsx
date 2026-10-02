"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({
  title = "Pequenos passos.\nGrandes transformações.",
  subtitle = "Acreditamos no poder da conexão entre pessoas, cavalos e natureza para transformar vidas.",
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger reveal animation on mount
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 150 + 100);
      });
    }
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Apresentação do Bem Viver Ecoterapia"
      className="relative min-h-[90dvh] lg:min-h-screen flex items-end lg:items-center justify-center lg:justify-start overflow-hidden pt-24 pb-12 lg:py-0"
    >
      {/* Background Image - Full Bleed */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-farm.jpg" 
          alt="Fazenda Bem Viver" 
          className="w-full h-full object-cover object-center lg:object-[center_60%]"
        />
        {/* Subtle Gradient for text readability without destroying the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/10 lg:to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="container-wide relative z-10 w-full flex flex-col items-center lg:items-start text-center lg:text-left mt-auto lg:mt-0 pt-32 lg:pt-0 lg:pl-16">
        
        {/* Content Box (Glassmorphism or subtle dark box for contrast) */}
        <div className="max-w-2xl bg-black/20 backdrop-blur-sm p-6 sm:p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl">
          {/* Logo */}
          <div className="reveal mb-6 lg:mb-8 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[340px] flex justify-center lg:justify-start mx-auto lg:mx-0">
            <img 
              src="/images/logo-hero.png" 
              alt="Bem Viver Centro de Equoterapia" 
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>

          <h1 className="sr-only">Bem Viver Ecoterapia</h1>

          {/* Subtitle */}
          <p 
            className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] text-white mb-5 reveal reveal-delay-1 leading-tight drop-shadow-lg" 
            style={{ letterSpacing: "-0.01em" }}
          >
            Onde a conexão transforma vidas.
          </p>

          {/* Text */}
          <p 
            className="font-sans text-base sm:text-lg lg:text-xl text-white/95 mb-8 reveal reveal-delay-2 leading-relaxed drop-shadow-md font-light max-w-xl mx-auto lg:mx-0"
          >
            Um espaço de acolhimento, desenvolvimento e novas possibilidades por meio da conexão entre pessoas, cavalos e natureza.
          </p>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start w-full reveal reveal-delay-3">
            <button
              onClick={() => handleScrollTo("doacoes")}
              className="inline-flex justify-center items-center px-10 py-4 lg:px-12 lg:py-4 bg-white text-moss-dark font-sans font-semibold text-base lg:text-lg rounded-full transition-all duration-300 hover:bg-moss hover:text-white hover:scale-105 active:scale-95 shadow-xl shadow-black/30"
            >
              Faça parte dessa história
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
