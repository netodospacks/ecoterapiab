"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  BookOpen,
  ImageIcon,
  Heart,
  Phone,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/conteudo", label: "Conteúdo", icon: BookOpen },
  { href: "/admin/galeria", label: "Galeria", icon: ImageIcon },
  { href: "/admin/doacoes", label: "Doações & Pix", icon: Heart },
  { href: "/admin/contato", label: "Contato", icon: Phone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl !== "https://placeholder.supabase.co") {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-cream/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-moss rounded-lg flex items-center justify-center">
            <Leaf size={16} className="text-cream" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display font-semibold text-cream text-sm leading-tight">Bem Viver</p>
            <p className="font-sans text-[10px] text-cream/50 uppercase tracking-widest">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4" aria-label="Navegação administrativa">
        <ul className="space-y-1" role="list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-moss text-cream"
                      : "text-cream/60 hover:text-cream hover:bg-cream/8"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 space-y-1 border-t border-cream/10 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm text-cream/60 hover:text-cream hover:bg-cream/8 transition-all duration-200"
        >
          <ExternalLink size={17} aria-hidden="true" />
          Ver site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm text-cream/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={17} aria-hidden="true" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 min-h-screen admin-sidebar flex-shrink-0"
        aria-label="Painel lateral administrativo"
      >
        <SidebarContent />
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-text-dark text-cream rounded-xl flex items-center justify-center shadow-nature-lg"
        aria-label="Abrir menu administrativo"
        aria-expanded={mobileOpen}
        aria-controls="admin-mobile-menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          id="admin-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu administrativo"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 h-full w-56 admin-sidebar">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-cream/50 hover:text-cream"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
