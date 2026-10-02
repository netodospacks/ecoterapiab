"use client";

import { useEffect, useRef, useState } from "react";
import { Leaf } from "lucide-react";

interface HistoriaSectionProps {
  title?: string;
  subtitle?: string;
  text?: string;
}

export default function HistoriaSection({
  title = "O Bem Viver",
  subtitle = "Uma história construída com amor, cuidado e propósito.",
  text = `Localizada na zona rural de Gurinhém, Paraíba, nossa instituição é voltada ao desenvolvimento mental, motor e social de pessoas por meio da interação com cavalos.

Filiado à ANDE-Brasil, o centro realiza um trabalho focado no acolhimento de praticantes neurodivergentes e com necessidades especiais.

Acreditamos que cada pessoa tem seu próprio ritmo, sua própria história e seu potencial para descobrir novas possibilidades.`,
}: HistoriaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);

  // Animation refs for smooth scrolling
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  // Intersection Observer for text reveal animation
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

  // Smooth Scroll scrubbing for video playback
  useEffect(() => {
    // Hack for iOS Safari to ensure the first frame is loaded for scrubbing
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          videoRef.current?.pause();
        }).catch(() => {});
      }
    }

    const handleScroll = () => {
      if (!sectionRef.current || !duration) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress from 0 (section entering viewport from bottom) 
      // to 1 (section completely leaving viewport at top)
      const scrolled = windowHeight - rect.top;
      const totalDistance = windowHeight + rect.height;

      let progress = scrolled / totalDistance;
      progress = Math.max(0, Math.min(1, progress)); // clamp between 0 and 1

      if (isFinite(duration) && duration > 0) {
        targetTimeRef.current = progress * duration;
      }
    };

    const tick = () => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        // Linear interpolation (lerp) for smooth scrubbing
        currentTimeRef.current += (targetTimeRef.current - currentTimeRef.current) * 0.08;
        
        // Update video time only if there's a noticeable difference
        if (Math.abs(targetTimeRef.current - currentTimeRef.current) > 0.01) {
          videoRef.current.currentTime = currentTimeRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Trigger once on mount
    handleScroll();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <section
      id="historia"
      ref={sectionRef}
      aria-labelledby="historia-title"
      className="relative bg-cream section-padding overflow-hidden"
    >
      <div className="container-wide relative z-10 w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        
        {/* Text Content (Left side on Desktop, Top on Mobile) */}
        <div className="w-full lg:w-5/12 flex flex-col z-20">
          <p className="reveal font-sans text-moss font-semibold tracking-widest uppercase text-sm mb-3">
            Nossa História
          </p>
          <h2
            id="historia-title"
            className="reveal reveal-delay-1 font-display font-semibold text-text-dark text-balance mb-4 text-3xl sm:text-4xl lg:text-[2.75rem]"
            style={{ lineHeight: 1.15 }}
          >
            {title}
          </h2>
          
          <p className="reveal reveal-delay-2 font-display text-lg lg:text-2xl text-sage mb-6 lg:mb-8 italic">
            {subtitle}
          </p>

          <div className="space-y-4 lg:space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 2, 4)} font-sans text-base lg:text-body-md text-text-medium leading-relaxed`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Decorative line */}
          <div className="reveal mt-8 lg:mt-12 flex items-center gap-3">
            <div className="h-px w-12 bg-sage/50" />
            <Leaf size={14} className="text-sage" />
            <div className="h-px flex-1 bg-sage/50 max-w-[150px]" />
          </div>
        </div>

        {/* Video Content (Right side on Desktop, Bottom on Mobile) */}
        <div className="w-full lg:w-7/12 relative rounded-3xl overflow-hidden shadow-nature-lg aspect-square sm:aspect-video lg:aspect-[4/3] reveal reveal-delay-3 flex-shrink-0">
          <video
            ref={videoRef}
            src="/videos/gemini_generated_video_A2F7FD28.mov"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            onLoadedMetadata={handleLoadedMetadata}
            muted
            playsInline
            preload="auto"
          />
        </div>
        
      </div>
    </section>
  );
}
