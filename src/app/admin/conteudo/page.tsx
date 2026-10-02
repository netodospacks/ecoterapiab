"use client";

import { useState } from "react";
import { Save, CheckCircle, Info } from "lucide-react";
import { defaultConfig } from "@/lib/config";

export default function AdminConteudoPage() {
  const [heroTitle, setHeroTitle] = useState(defaultConfig.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(defaultConfig.heroSubtitle);
  const [historiaTitle, setHistoriaTitle] = useState(defaultConfig.historiaTitle);
  const [historiaText, setHistoriaText] = useState(defaultConfig.historiaText);
  const [missao, setMissao] = useState(defaultConfig.missao);
  const [visao, setVisao] = useState(defaultConfig.visao);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save to Supabase
    // const supabase = createClient();
    // await supabase.from("site_config").upsert({ id: 1, heroTitle, heroSubtitle, ... });
    await new Promise((r) => setTimeout(r, 800)); // Simulate API call
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Conteúdo do Site</h1>
          <p className="font-sans text-sm text-text-medium mt-1">Edite os textos exibidos no site público.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saved ? (
            <><CheckCircle size={16} /> Salvo!</>
          ) : saving ? (
            <><span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" /> Salvando...</>
          ) : (
            <><Save size={16} /> Salvar alterações</>
          )}
        </button>
      </div>

      {/* Notice */}
      <div className="admin-card mb-6 flex items-start gap-3 bg-amber-50 border-amber-200">
        <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="font-sans text-sm text-amber-700">
          <strong>Modo de desenvolvimento:</strong> As alterações não são salvas permanentemente até que o Supabase seja configurado.
          Após configurar, os dados serão persistidos no banco de dados.
        </p>
      </div>

      <div className="space-y-6">
        {/* Hero */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-moss" aria-hidden="true" />
            Seção Hero (primeira dobra)
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="hero-title" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                Título principal <span className="text-text-light font-normal">(use \n para quebra de linha)</span>
              </label>
              <textarea
                id="hero-title"
                rows={2}
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors resize-none"
              />
            </div>
            <div>
              <label htmlFor="hero-subtitle" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Subtítulo</label>
              <textarea
                id="hero-subtitle"
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Nossa História */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-earth" aria-hidden="true" />
            Nossa História
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="historia-title" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Título</label>
              <input
                id="historia-title"
                type="text"
                value={historiaTitle}
                onChange={(e) => setHistoriaTitle(e.target.value)}
                className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
              />
            </div>
            <div>
              <label htmlFor="historia-text" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                Texto <span className="text-text-light font-normal">(separe parágrafos com linha em branco)</span>
              </label>
              <textarea
                id="historia-text"
                rows={8}
                value={historiaText}
                onChange={(e) => setHistoriaText(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors resize-y"
              />
            </div>
          </div>
        </div>

        {/* Missão e Visão */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" aria-hidden="true" />
            Missão e Visão
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="missao" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Missão</label>
              <textarea
                id="missao"
                rows={3}
                value={missao}
                onChange={(e) => setMissao(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors resize-none"
              />
            </div>
            <div>
              <label htmlFor="visao" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Visão</label>
              <textarea
                id="visao"
                rows={3}
                value={visao}
                onChange={(e) => setVisao(e.target.value)}
                className="w-full px-4 py-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Video placeholder */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-moss-light" aria-hidden="true" />
            Vídeo da Página Inicial
          </h2>
          <p className="font-sans text-sm text-text-medium mb-4">
            Coloque o arquivo de vídeo na pasta <code className="bg-sand px-1.5 py-0.5 rounded text-xs">public/videos/</code> com o nome <code className="bg-sand px-1.5 py-0.5 rounded text-xs">hero.mp4</code> (e/ou <code className="bg-sand px-1.5 py-0.5 rounded text-xs">hero.webm</code>).
          </p>
          <div className="p-4 bg-sand/50 rounded-xl border-2 border-dashed border-sand-dark text-center">
            <p className="font-sans text-sm text-text-light">
              📹 Upload de vídeo disponível após configurar o Supabase Storage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
