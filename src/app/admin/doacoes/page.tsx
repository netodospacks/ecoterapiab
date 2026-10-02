"use client";

import { useState } from "react";
import { Save, CheckCircle, Info, Plus, Trash2 } from "lucide-react";
import { defaultConfig } from "@/lib/config";

export default function AdminDoacoesPage() {
  const [pixKey, setPixKey] = useState(defaultConfig.pixKey);
  const [pixKeyType, setPixKeyType] = useState(defaultConfig.pixKeyType);
  const [pixName, setPixName] = useState(defaultConfig.pixName);
  const [pixCity, setPixCity] = useState(defaultConfig.pixCity);
  const [donationValues, setDonationValues] = useState<number[]>(defaultConfig.donationValues);
  const [categories, setCategories] = useState(defaultConfig.transparencyCategories);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addCategory = () => {
    setCategories([...categories, { label: "", icon: "🌿" }]);
  };

  const removeCategory = (i: number) => {
    setCategories(categories.filter((_, idx) => idx !== i));
  };

  const updateCategory = (i: number, field: "label" | "icon", value: string) => {
    const updated = [...categories];
    updated[i] = { ...updated[i], [field]: value };
    setCategories(updated);
  };

  const updateDonationValue = (i: number, value: string) => {
    const updated = [...donationValues];
    updated[i] = parseFloat(value) || 0;
    setDonationValues(updated);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Doações & Pix</h1>
          <p className="font-sans text-sm text-text-medium mt-1">Configure o sistema de doações e informações de transparência.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saved ? <><CheckCircle size={16} /> Salvo!</> :
           saving ? <><span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" /> Salvando...</> :
           <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Pix Config */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-1">Configuração da Chave Pix</h2>
          <p className="font-sans text-sm text-text-medium mb-5">
            Esses dados são usados para gerar o QR Code e o código copia-e-cola no site.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pix-key-type" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Tipo da chave</label>
              <select
                id="pix-key-type"
                value={pixKeyType}
                onChange={(e) => setPixKeyType(e.target.value)}
                className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors bg-white"
              >
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone</option>
                <option value="aleatoria">Chave aleatória</option>
              </select>
            </div>

            <div>
              <label htmlFor="pix-key" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Chave Pix</label>
              <input
                id="pix-key"
                type="text"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
                placeholder={pixKeyType === "cpf" ? "000.000.000-00" : pixKeyType === "email" ? "contato@email.com" : "Chave Pix"}
              />
            </div>

            <div>
              <label htmlFor="pix-name" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Nome do recebedor</label>
              <input
                id="pix-name"
                type="text"
                value={pixName}
                onChange={(e) => setPixName(e.target.value)}
                className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
                placeholder="Bem Viver Ecoterapia"
              />
            </div>

            <div>
              <label htmlFor="pix-city" className="block font-sans text-sm font-medium text-text-dark mb-1.5">Cidade</label>
              <input
                id="pix-city"
                type="text"
                value={pixCity}
                onChange={(e) => setPixCity(e.target.value)}
                className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
                placeholder="São Paulo"
              />
            </div>
          </div>
        </div>

        {/* Donation values */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-4">Valores Sugeridos de Doação</h2>
          <div className="grid grid-cols-4 gap-3">
            {donationValues.map((val, i) => (
              <div key={i}>
                <label htmlFor={`donation-val-${i}`} className="block font-sans text-xs text-text-light mb-1">
                  Opção {i + 1}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-sans text-xs text-text-medium">R$</span>
                  <input
                    id={`donation-val-${i}`}
                    type="number"
                    min="1"
                    value={val}
                    onChange={(e) => updateDonationValue(i, e.target.value)}
                    className="w-full h-12 pl-8 pr-3 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparency categories */}
        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans font-semibold text-text-dark">Categorias de Transparência</h2>
            <button
              onClick={addCategory}
              className="inline-flex items-center gap-1.5 text-sm text-moss hover:text-moss-dark font-medium"
            >
              <Plus size={15} aria-hidden="true" />
              Adicionar
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={cat.icon}
                  onChange={(e) => updateCategory(i, "icon", e.target.value)}
                  className="w-14 h-11 text-center border-2 border-sand rounded-xl font-sans text-lg focus:outline-none focus:border-moss transition-colors"
                  aria-label={`Emoji da categoria ${i + 1}`}
                  maxLength={2}
                />
                <input
                  type="text"
                  value={cat.label}
                  onChange={(e) => updateCategory(i, "label", e.target.value)}
                  className="flex-1 h-11 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
                  placeholder="Descrição da categoria"
                  aria-label={`Descrição da categoria ${i + 1}`}
                />
                <button
                  onClick={() => removeCategory(i)}
                  className="p-2.5 text-text-light hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label={`Remover categoria ${i + 1}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reports */}
        <div className="admin-card">
          <h2 className="font-sans font-semibold text-text-dark mb-3">Relatórios de Prestação de Contas</h2>
          <p className="font-sans text-sm text-text-medium mb-4">
            Faça upload de PDFs e documentos que serão exibidos publicamente na seção de transparência.
          </p>
          <div className="p-6 bg-sand/40 rounded-xl border-2 border-dashed border-sand-dark text-center">
            <p className="font-sans text-sm text-text-light">
              📄 Upload de documentos disponível após configurar o Supabase Storage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
