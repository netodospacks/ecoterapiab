"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Lock, Mail, AlertCircle, Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl === "https://placeholder.supabase.co") {
      // Demo mode — allow any login when Supabase is not configured
      if (email && password) {
        router.push("/admin/dashboard");
        return;
      }
      setError("Preencha e-mail e senha.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("E-mail ou senha incorretos. Tente novamente.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-moss rounded-2xl mb-4 shadow-nature-lg">
            <Leaf size={26} className="text-cream" aria-hidden="true" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-text-dark">Painel Administrativo</h1>
          <p className="font-sans text-sm text-text-medium mt-1">Bem Viver Ecoterapia</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-nature-lg p-8">
          <form onSubmit={handleLogin} noValidate aria-label="Formulário de login administrativo">
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="admin-email" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-light" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 border-2 border-sand rounded-xl font-sans text-sm text-text-dark focus:outline-none focus:border-moss transition-colors"
                  placeholder="admin@bemviver.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label htmlFor="admin-password" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-light" aria-hidden="true" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-10 pr-12 border-2 border-sand rounded-xl font-sans text-sm text-text-dark focus:outline-none focus:border-moss transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-light hover:text-text-medium transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2" role="alert">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" aria-hidden="true" />
                <p className="font-sans text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" aria-hidden="true" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Note for dev */}
          {process.env.NEXT_PUBLIC_SUPABASE_URL === "https://placeholder.supabase.co" && (
            <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="font-sans text-xs text-amber-700 text-center">
                🔧 Modo de desenvolvimento — qualquer e-mail e senha funcionam
              </p>
            </div>
          )}
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="font-sans text-sm text-text-medium hover:text-moss transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
