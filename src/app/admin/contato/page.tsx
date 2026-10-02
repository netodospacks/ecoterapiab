"use client";

import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { defaultConfig } from "@/lib/config";

export default function AdminContatoPage() {
  const [whatsapp, setWhatsapp] = useState(defaultConfig.whatsapp);
  const [instagram, setInstagram] = useState(defaultConfig.instagram);
  const [email, setEmail] = useState(defaultConfig.email);
  const [address, setAddress] = useState(defaultConfig.address);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-text-dark">Contato & Redes Sociais</h1>
          <p className="font-sans text-sm text-text-medium mt-1">Atualize os links de contato exibidos no site.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-60">
          {saved ? <><CheckCircle size={16} /> Salvo!</> :
           saving ? <><span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" /> Salvando...</> :
           <><Save size={16} /> Salvar</>}
        </button>
      </div>

      <div className="admin-card space-y-5">
        <div>
          <label htmlFor="whatsapp" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
            WhatsApp <span className="text-text-light font-normal">(com DDI e DDD, apenas números)</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-text-medium">+</span>
            <input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
              className="w-full h-12 pl-8 pr-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
              placeholder="5511999999999"
            />
          </div>
          <p className="font-sans text-xs text-text-light mt-1">Exemplo: 5511999999999 (55 = Brasil, 11 = DDD, número)</p>
        </div>

        <div>
          <label htmlFor="instagram" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
            Instagram
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-text-medium">@</span>
            <input
              id="instagram"
              type="text"
              value={instagram.replace("@", "")}
              onChange={(e) => setInstagram(e.target.value.replace("@", ""))}
              className="w-full h-12 pl-8 pr-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
              placeholder="bemviverecoterapia"
            />
          </div>
        </div>

        <div>
          <label htmlFor="admin-email" className="block font-sans text-sm font-medium text-text-dark mb-1.5">E-mail de contato</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
            placeholder="contato@bemviverecoterapia.com.br"
          />
        </div>

        <div>
          <label htmlFor="address" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
            Endereço <span className="text-text-light font-normal">(opcional)</span>
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-12 px-4 border-2 border-sand rounded-xl font-sans text-sm focus:outline-none focus:border-moss transition-colors"
            placeholder="Rua Exemplo, 123 — Cidade, Estado"
          />
        </div>
      </div>
    </div>
  );
}
