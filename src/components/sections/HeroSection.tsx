"use client";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({
  title = "Onde o cuidado e a\nnatureza se unem para\ntransformar vidas!",
  subtitle = "Um espaço de acolhimento, desenvolvimento e novas possibilidades por meio da conexão entre pessoas, cavalos e natureza.",
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      aria-label="Apresentação do Bem Viver Ecoterapia"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#2D3319] via-[#3A3C11] to-[#232714] text-white py-20 sm:py-28 md:py-36 lg:py-40 xl:py-44"
    >
      {/* Container pronto para receber a imagem definitiva de fundo assim que enviada */}
      {/* 
        Quando a imagem for enviada, basta descomentar o bloco abaixo:
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-fundo-novo.jpg" alt="Fundo" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      */}

      <div className="container-wide relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="max-w-3xl text-left">
          {/* Título Principal com a fonte Gliker */}
          <h1 className="font-gliker font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] leading-[1.18] tracking-tight whitespace-pre-line drop-shadow-sm">
            {title}
          </h1>

          {/* Subtítulo */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed sm:leading-[1.7] mt-5 sm:mt-6 max-w-2xl drop-shadow-sm">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
