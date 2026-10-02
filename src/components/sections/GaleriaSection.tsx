"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Criança em sessão de ecoterapia com cavalo ao entardecer, guiada por profissional",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Paisagem serena com cavalo pastando ao amanhecer em campo verde",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Close-up do olho de um cavalo refletindo o campo verde ao redor",
  }
];

export default function GaleriaSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    lightboxRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        aria-labelledby="galeria-title"
        className="section-padding bg-cream"
      >
        <div className="container-wide">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2
              id="galeria-title"
              className="reveal reveal-delay-1 font-display font-light text-text-dark"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
            >
              Momentos que inspiram.
            </h2>
            <p className="reveal reveal-delay-2 font-sans text-body-md text-text-medium mt-4">
              Cada imagem conta uma história de cuidado, conexão e transformação.
            </p>
          </div>

          {/* Symmetrical Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`reveal reveal-delay-${Math.min(i, 4)} relative overflow-hidden rounded-2xl group cursor-zoom-in focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 w-full aspect-[4/5] shadow-sm hover:shadow-nature transition-shadow`}
                aria-label={`Ver imagem: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
                />
                <div className="absolute inset-0 bg-text-dark/0 group-hover:bg-text-dark/30 transition-colors duration-500" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-cream/90 rounded-full flex items-center justify-center">
                    <ZoomIn size={18} className="text-moss" aria-hidden="true" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal text-center mt-10">
            <p className="font-sans text-body-sm text-text-light italic">
              ✦ As imagens acima são placeholders — substitua com fotos reais do projeto pelo Painel Administrativo
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagem"
          onClick={closeLightbox}
          ref={lightboxRef}
          tabIndex={-1}
        >
          <div
            className="relative max-w-5xl w-full mx-4 max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-cream/70 hover:text-cream transition-colors p-2"
              aria-label="Fechar imagem"
            >
              <X size={28} />
            </button>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Alt text */}
            <p className="text-center text-cream/60 text-sm mt-4 font-sans px-4">
              {galleryImages[lightboxIndex].alt}
            </p>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-cream/10 hover:bg-cream/20 border border-cream/20 rounded-full flex items-center justify-center text-cream transition-all"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-cream/10 hover:bg-cream/20 border border-cream/20 rounded-full flex items-center justify-center text-cream transition-all"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5" role="list" aria-label="Navegação da galeria">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === lightboxIndex ? "bg-cream w-6" : "bg-cream/30"
                  }`}
                  aria-label={`Ir para imagem ${i + 1}`}
                  role="listitem"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
