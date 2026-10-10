"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Heart, ChevronDown, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  highlightWord?: string;
  isLojinha?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navLinks: NavItem[] = [
  {
    label: "Quem somos",
    href: "#historia",
    hasDropdown: true,
    dropdownItems: [
      { label: "Nossa História", href: "#historia" },
      { label: "Propósito & Valores", href: "#proposito" },
    ],
  },
  { label: "Equoterapia", href: "#ecoterapia" },
  { label: "Lojinha Bem Viver", href: "#lojinha", isLojinha: true },
  { label: "Fale conosco", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [lojinhaModalOpen, setLojinhaModalOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || lojinhaModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lojinhaModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLojinhaModalOpen(false);
    };
    if (lojinhaModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lojinhaModalOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isLojinha?: boolean
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    setDropdownOpen(false);

    if (isLojinha) {
      setLojinhaModalOpen(true);
      return;
    }

    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (href === "#contato") {
        const fallback = document.querySelector("#contato");
        fallback?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-[#EAE9E5]",
          scrolled
            ? "py-3 shadow-[0_4px_20px_-4px_rgba(58,60,17,0.12)] border-b border-[#3A3C11]/10"
            : "py-3.5 sm:py-4 border-b border-[#3A3C11]/5"
        )}
        role="banner"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* 1. Logotipo à esquerda com proporção fiel */}
          <Link
            href="/"
            className="flex items-center shrink-0 group transition-transform duration-200 hover:scale-[1.01]"
            aria-label="Bem Viver Ecoterapia — Página inicial"
          >
            <Image
              src="/images/logo-header.png"
              alt="Bem Viver - Centro de Equoterapia e Terapias Integradas"
              width={268}
              height={44}
              priority
              className="h-9 sm:h-10 md:h-[43px] lg:h-[46px] w-auto object-contain"
            />
          </Link>

          {/* 2. Menu horizontal alinhado ao centro */}
          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-8 justify-center flex-1 mx-4"
          >
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "font-display text-[14px] xl:text-[14.5px] font-medium tracking-tight text-[#3A3C11] hover:text-[#6A3D12] transition-colors duration-200 flex items-center gap-1 py-1 group",
                        dropdownOpen && "text-[#6A3D12]"
                      )}
                    >
                      <span>{item.label}</span>
                      <span className="text-[13px] leading-none font-semibold text-[#3A3C11]/70 group-hover:text-[#6A3D12] transition-colors select-none">
                        ›
                      </span>
                    </a>

                    {/* Dropdown Menu */}
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-200",
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                    >
                      <div className="bg-[#EAE9E5] border border-[#3A3C11]/15 rounded-xl shadow-[0_8px_30px_rgba(58,60,17,0.12)] py-2 min-w-[190px]">
                        {item.dropdownItems?.map((drop) => (
                          <a
                            key={drop.href}
                            href={drop.href}
                            onClick={(e) => handleNavClick(e, drop.href)}
                            className="block px-4 py-2 font-display text-[13.5px] font-medium text-[#3A3C11] hover:text-[#6A3D12] hover:bg-[#3A3C11]/5 transition-colors"
                          >
                            {drop.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isLojinha)}
                  className="font-display text-[14px] xl:text-[14.5px] font-medium tracking-tight text-[#3A3C11] hover:text-[#6A3D12] transition-colors duration-200 relative group py-1"
                >
                  <span>{item.label}</span>
                  {item.highlightWord && (
                    <span className="font-bold uppercase ml-1">{item.highlightWord}</span>
                  )}
                  {/* Subtle hover indicator */}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#6A3D12] transition-all duration-300 group-hover:w-full opacity-80" />
                </a>
              );
            })}
          </nav>

          {/* 3. Botão marrom 'Contribuir' à direita + Menu Mobile */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Botão Contribuir Desktop e Tablet */}
            <a
              href="#doacoes"
              onClick={(e) => handleNavClick(e, "#doacoes")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-display text-[13.5px] sm:text-[14.5px] font-semibold text-white bg-[#6A3D12] hover:bg-[#54300E] active:scale-95 shadow-[0_2px_10px_rgba(106,61,18,0.25)] hover:shadow-[0_4px_16px_rgba(106,61,18,0.35)] transition-all duration-300"
            >
              <Heart size={14} className="fill-white text-white shrink-0" aria-hidden="true" />
              <span>Contribuir</span>
            </a>

            {/* Botão Hambúrguer Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 rounded-lg text-[#3A3C11] hover:bg-[#3A3C11]/10 transition-colors duration-200"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 4. Menu Lateral Mobile Responsivo */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navegação móvel"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#3A3C11]/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer Lateral */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#EAE9E5] shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-[#3A3C11]/15",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Topo do Drawer */}
          <div className="flex items-center justify-between p-5 border-b border-[#3A3C11]/10">
            <Image
              src="/images/logo-header.png"
              alt="Bem Viver"
              width={160}
              height={28}
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-1.5 rounded-lg text-[#3A3C11] hover:bg-[#3A3C11]/10 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Links do Menu Mobile */}
          <nav className="flex-1 p-5 flex flex-col gap-1 overflow-y-auto" aria-label="Navegação mobile">
            {navLinks.map((item) => (
              <div key={item.label} className="flex flex-col">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.isLojinha)}
                  className="px-4 py-3 rounded-xl font-display text-[15px] font-medium text-[#3A3C11] hover:text-[#6A3D12] hover:bg-[#3A3C11]/5 transition-all flex items-center justify-between"
                >
                  <span>
                    {item.label}
                    {item.highlightWord && (
                      <span className="font-bold uppercase ml-1">{item.highlightWord}</span>
                    )}
                  </span>
                  {item.hasDropdown && <span className="text-sm font-semibold opacity-60">›</span>}
                </a>

                {/* Subitens mobile se houver dropdown */}
                {item.hasDropdown && (
                  <div className="pl-6 flex flex-col gap-1 pb-1">
                    {item.dropdownItems?.map((drop) => (
                      <a
                        key={drop.href}
                        href={drop.href}
                        onClick={(e) => handleNavClick(e, drop.href)}
                        className="px-4 py-2 rounded-lg font-display text-[13.5px] text-[#3A3C11]/80 hover:text-[#6A3D12] hover:bg-[#3A3C11]/5 transition-all"
                      >
                        {drop.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Rodapé do Menu com Botão de Ação */}
          <div className="p-5 border-t border-[#3A3C11]/10 bg-[#EAE9E5]">
            <a
              href="#doacoes"
              onClick={(e) => handleNavClick(e, "#doacoes")}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-display text-[15px] font-semibold text-white bg-[#6A3D12] hover:bg-[#54300E] active:scale-95 shadow-md transition-all"
            >
              <Heart size={16} className="fill-white text-white" aria-hidden="true" />
              <span>Contribuir</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal Carinhoso da Lojinha Bem Viver */}
      {lojinhaModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lojinha-modal-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop com desfoque e clique para fechar */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setLojinhaModalOpen(false)}
            aria-hidden="true"
          />

          {/* Card do Modal */}
          <div className="relative w-full max-w-md bg-[#FAF9F6] border border-[#EAE9E5] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(58,60,17,0.25)] text-center animate-fade-up z-10">
            {/* Botão de Fechar */}
            <button
              onClick={() => setLojinhaModalOpen(false)}
              aria-label="Fechar aviso"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#EAE9E5] text-[#3A3C11] hover:bg-[#6A3D12] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Ícone Delicado */}
            <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-3xl bg-[#EAE9E5] text-[#6A3D12] flex items-center justify-center mb-4 sm:mb-5 shadow-inner">
              <ShoppingBag className="w-8 h-8 sm:w-9 sm:h-9 stroke-[1.75]" />
            </div>

            {/* Tag / Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A3D12]/10 text-[#6A3D12] font-sans text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} />
              Em breve com muito amor
            </span>

            {/* Título com a fonte Gliker */}
            <h3
              id="lojinha-modal-title"
              className="font-gliker font-bold text-[#6A3D12] text-xl sm:text-2xl leading-snug mb-3.5"
            >
              Nossa Lojinha está sendo preparada com muito carinho!
            </h3>

            {/* Mensagem Carinhosa */}
            <p className="font-sans text-xs sm:text-sm text-[#605345] leading-relaxed mb-5">
              Estamos organizando produtos e lembrancinhas especiais feitas com todo o afeto para apoiar nosso Centro de Equoterapia. Muito em breve a <strong>Lojinha Bem Viver</strong> estará disponível para você!
            </p>

            {/* Caixa de Agradecimento */}
            <div className="p-3 rounded-2xl bg-[#EAE9E5]/70 text-xs text-[#3A3C11] font-sans mb-6">
              🐴 <em>Agradecemos imensamente pelo seu carinho e por fazer parte da nossa história!</em>
            </div>

            {/* Botão de Fechar Carinhoso */}
            <button
              onClick={() => setLojinhaModalOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-display font-semibold text-sm sm:text-base text-white bg-[#6A3D12] hover:bg-[#54300E] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Heart size={15} className="fill-white text-white" />
              <span>Aguardar com carinho</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
