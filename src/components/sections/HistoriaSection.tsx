"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";

interface HistoriaSectionProps {
  title?: string;
  subtitle?: string;
  text?: string;
}

export default function HistoriaSection({
  subtitle,
}: HistoriaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 90);
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
      id="historia"
      ref={sectionRef}
      aria-labelledby="historia-title"
      className="relative bg-[#FAF9F6] py-14 sm:py-18 lg:py-20 xl:py-24 overflow-hidden text-[#30372F]"
    >
      <div className="container-wide relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center justify-between">
          
          {/* Lado Esquerdo: Área de Texto (~40% em desktop) */}
          <div className="w-full lg:w-[42%] xl:w-[41%] flex flex-col justify-center">
            
            {/* Tag / Identificador Superior */}
            <p className="reveal font-display text-[11px] sm:text-[12px] font-semibold tracking-[0.24em] uppercase text-[#7E8569] mb-2 sm:mb-2.5">
              NOSSA HISTÓRIA
            </p>

            {/* Título Principal com Destaque Tipográfico para BEM VIVER */}
            <h2
              id="historia-title"
              className="reveal reveal-delay-1 font-display text-[#6A3D12] text-balance mb-3 sm:mb-3.5 tracking-tight"
            >
              <span className="block text-xl sm:text-2xl lg:text-[1.85rem] xl:text-[2.1rem] font-normal leading-[1.18] uppercase tracking-[0.02em]">
                O CENTRO DE<br />
                EQUOTERAPIA E<br />
                TERAPIAS INTEGRADAS
              </span>
              <span className="block text-[1.85rem] sm:text-[2.35rem] lg:text-[2.65rem] xl:text-[3rem] font-extrabold tracking-wide uppercase leading-tight mt-0.5 sm:mt-1 text-[#6A3D12]">
                BEM VIVER
              </span>
            </h2>

            {/* Frase / Subtítulo em Itálico */}
            <p className="reveal reveal-delay-2 font-display text-[15px] sm:text-[16.5px] lg:text-[17.5px] text-[#846342] italic mb-4 sm:mb-4.5 leading-snug">
              {subtitle || "Uma história construída com amor, cuidado e propósito."}
            </p>

            {/* Texto Institucional de Apresentação */}
            <p className="reveal reveal-delay-2 font-sans text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#4F4B43] leading-[1.65] mb-4 sm:mb-5">
              O Centro Bem Viver é uma instituição localizada na zona rural de Gurinhém, na Paraíba. Promovemos o desenvolvimento integral e a inclusão social de pessoas neuroatípicas por meio da{" "}
              <strong className="font-semibold text-[#3A3C11]">Equoterapia</strong> e das{" "}
              <strong className="font-semibold text-[#3A3C11]">Terapias Integradas</strong>.
            </p>

            {/* Três Tópicos Informativos com Pequenos Ícones Discretos */}
            <div className="space-y-3 sm:space-y-3.5 mb-4 sm:mb-5">
              {/* Tópico 1 */}
              <div className="reveal reveal-delay-3 flex items-start gap-2.5 sm:gap-3">
                <span className="shrink-0 mt-0.5 text-[#7E8569]">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" aria-hidden="true" />
                </span>
                <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#4F4B43] leading-[1.58]">
                  <strong className="font-bold text-[#3A3C11]">O que somos:</strong>{" "}
                  Um centro especializado em Equoterapia e terapias integradas que une rigor técnico, ciência e o contato transformador com a natureza.
                </p>
              </div>

              {/* Tópico 2 */}
              <div className="reveal reveal-delay-3 flex items-start gap-2.5 sm:gap-3">
                <span className="shrink-0 mt-0.5 text-[#7E8569]">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" aria-hidden="true" />
                </span>
                <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#4F4B43] leading-[1.58]">
                  <strong className="font-bold text-[#3A3C11]">O que oferecemos:</strong>{" "}
                  Atendimento multidisciplinar voltado ao desenvolvimento de habilidades motoras, de comunicação, de regulação emocional e de autonomia (com foco no Transtorno do Espectro Autista e em outras condições do neurodesenvolvimento).
                </p>
              </div>

              {/* Tópico 3 */}
              <div className="reveal reveal-delay-4 flex items-start gap-2.5 sm:gap-3">
                <span className="shrink-0 mt-0.5 text-[#7E8569]">
                  <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75]" aria-hidden="true" />
                </span>
                <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#4F4B43] leading-[1.58]">
                  <strong className="font-bold text-[#3A3C11]">Nosso propósito:</strong>{" "}
                  Proporcionar um espaço de refúgio e acolhimento para crianças, jovens e famílias, promovendo o bem-estar e a inclusão em todas as fases da vida.
                </p>
              </div>
            </div>

            {/* Parágrafo de Credibilidade (sem linha divisória agressiva, exatamente como na referência) */}
            <div className="reveal reveal-delay-4 pt-1 sm:pt-1.5">
              <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] text-[#4F4B43] leading-[1.6]">
                <strong className="font-bold text-[#3A3C11]">Cuidado completo e seguro:</strong>{" "}
                contamos com uma equipe interdisciplinar especializada e filiada à ANDE-BRASIL (Associação Nacional de Equoterapia), incluindo acompanhamento médico dedicado.
              </p>
            </div>

          </div>

          {/* Lado Direito: Mosaico Fotográfico (~60% em desktop) */}
          <div className="w-full lg:w-[58%] xl:w-[59%] flex-shrink-0">
            {/* O container possui proporção calibrada para alinhar perfeitamente à área de texto */}
            <div className="reveal reveal-delay-2 w-full grid grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3 aspect-[1.31/1] max-w-[740px] mx-auto lg:mx-0">
              
              {/* Coluna Esquerda do Mosaico: Imagem 1 (topo) e Imagem 2 (baixo) */}
              <div className="flex flex-col gap-2 sm:gap-2.5 lg:gap-3 h-full">
                
                {/* Imagem 1: Horizontal superior (criança a cavalo sob árvore com terapeutas) */}
                <div className="relative flex-[1.32] w-full rounded-[3px] overflow-hidden bg-[#EAE9E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] group">
                  <Image
                    src="/images/mosaico-1.jpg"
                    alt="Criança praticando equoterapia sob a sombra das árvores com equipe multidisciplinar"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    priority
                  />
                </div>

                {/* Imagem 2: Horizontal inferior (equipe caminhando na estrada com cavalos) */}
                <div className="relative flex-1 w-full rounded-[3px] overflow-hidden bg-[#EAE9E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] group">
                  <Image
                    src="/images/mosaico-2.jpg"
                    alt="Equipe interdisciplinar caminhando com cavalos e praticantes na zona rural de Gurinhém"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    priority
                  />
                </div>

              </div>

              {/* Coluna Direita do Mosaico: Imagem 3 (vertical total) */}
              <div className="relative w-full h-full rounded-[3px] overflow-hidden bg-[#EAE9E5] shadow-[0_2px_8px_rgba(0,0,0,0.04)] group">
                <Image
                  src="/images/mosaico-3.jpg"
                  alt="Criança estendendo a mão para acariciar o cavalo com cabresto colorido em momento de afeto e conexão"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
