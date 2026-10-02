"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#historia", label: "Nossa História" },
  { href: "#ecoterapia", label: "Ecoterapia" },
  { href: "#proposito", label: "Propósito" },
  { href: "#galeria", label: "Galeria" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-nature py-3"
            : "bg-cream/90 backdrop-blur-sm py-5"
        )}
        role="banner"
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Bem Viver Ecoterapia — Página inicial">
            <div className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 bg-moss">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z"
                  fill="#F9F7F1"
                  opacity="0.9"
                />
                <circle cx="12" cy="10" r="3" fill="#53664B" />
              </svg>
            </div>
            <div className="leading-tight">
              <span className="font-display font-semibold text-lg tracking-tight block transition-colors duration-300 text-moss-dark">
                Bem Viver
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] block transition-colors duration-300 text-text-medium">
                Ecoterapia
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans text-sm font-medium transition-colors duration-300 relative group text-text-medium hover:text-moss"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full bg-moss" />
              </a>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <a
              href="#doacoes"
              onClick={(e) => handleNavClick(e, "#doacoes")}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-all duration-300 bg-moss text-cream hover:bg-moss-dark shadow-nature"
            >
              <Heart size={14} aria-hidden="true" />
              Contribuir
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-text-dark hover:bg-sand"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navegação"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-text-dark/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-cream shadow-nature-xl flex flex-col transition-transform duration-500",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-sand">
            <span className="font-display font-semibold text-xl text-moss-dark">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-2 rounded-lg text-text-medium hover:bg-sand transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-6 flex flex-col gap-2" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3.5 font-sans font-medium text-text-medium hover:text-moss hover:bg-sage/10 rounded-xl transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="p-6 border-t border-sand">
            <a
              href="#doacoes"
              onClick={(e) => handleNavClick(e, "#doacoes")}
              className="btn-primary w-full justify-center"
            >
              <Heart size={16} aria-hidden="true" />
              Fazer uma doação
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
