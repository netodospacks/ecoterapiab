"use client";

import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Heart,
  Copy,
  CheckCheck,
  ChevronRight,
  FileText,
  Leaf,
  Wrench,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DoacaoSectionProps {
  donationValues?: number[];
  pixKey?: string;
  pixName?: string;
  pixCity?: string;
  transparencyCategories?: { label: string; icon: string }[];
}

// Generate a simple Pix BR Code payload (EMV spec)
function generatePixPayload(
  pixKey: string,
  pixName: string,
  pixCity: string,
  amount?: number
): string {
  const sanitize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 @_.+\-]/g, "")
      .substring(0, 25);

  const name = sanitize(pixName).padEnd(1, " ").substring(0, 25);
  const city = sanitize(pixCity).padEnd(1, " ").substring(0, 15);

  const merchantAccountInfo =
    "0014BR.GOV.BCB.PIX" +
    "01" + String(pixKey.length).padStart(2, "0") + pixKey;
  const merchantInfo =
    "26" +
    String(merchantAccountInfo.length).padStart(2, "0") +
    merchantAccountInfo;

  const amountStr =
    amount && amount > 0
      ? "54" + String(amount.toFixed(2).length).padStart(2, "0") + amount.toFixed(2)
      : "";

  const txid = "***";
  const additionalData =
    "62" +
    String(4 + txid.length).padStart(2, "0") +
    "05" +
    String(txid.length).padStart(2, "0") +
    txid;

  const payload =
    "000201" +
    "010212" +
    merchantInfo +
    "52040000" +
    "5303986" +
    amountStr +
    "5802BR" +
    "59" + String(name.length).padStart(2, "0") + name +
    "60" + String(city.length).padStart(2, "0") + city +
    additionalData +
    "6304";

  // CRC16-CCITT
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) crc = (crc << 1) ^ 0x1021;
      else crc <<= 1;
    }
    crc &= 0xffff;
  }

  return payload + crc.toString(16).toUpperCase().padStart(4, "0");
}

const defaultCategories = [
  { label: "Cuidados e alimentação dos cavalos", icon: "🐴" },
  { label: "Manutenção dos espaços", icon: "🌿" },
  { label: "Materiais e equipamentos", icon: "🔧" },
  { label: "Atividades e ações do projeto", icon: "❤️" },
];

export default function DoacaoSection({
  donationValues = [10, 25, 50, 100],
  pixKey = "",
  pixName = "Bem Viver Ecoterapia",
  pixCity = "Brasil",
  transparencyCategories = defaultCategories,
}: DoacaoSectionProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(25);
  const [customValue, setCustomValue] = useState<string>("");
  const [showPix, setShowPix] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const pixRef = useRef<HTMLDivElement>(null);

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

  const finalAmount = customValue
    ? parseFloat(customValue.replace(",", "."))
    : selectedValue || 0;

  const hasPixKey = pixKey && pixKey.trim() !== "";

  const pixPayload = hasPixKey
    ? generatePixPayload(pixKey, pixName, pixCity, finalAmount || undefined)
    : "";

  const handleCopy = async () => {
    if (!pixPayload) return;
    await navigator.clipboard.writeText(pixPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleContribute = () => {
    setShowPix(true);
    setTimeout(() => {
      pixRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <section
      id="doacoes"
      ref={sectionRef}
      aria-labelledby="doacoes-title"
      className="section-padding bg-sand/50 relative z-40 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2
            id="doacoes-title"
            className="reveal reveal-delay-1 font-display font-light text-text-dark text-balance"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
          >
            Faça parte dessa transformação.
          </h2>
          <p className="reveal reveal-delay-2 font-sans text-body-md text-text-medium mt-4 leading-relaxed">
            Sua contribuição pode ajudar o Bem Viver Ecoterapia a continuar construindo oportunidades,
            oferecendo cuidado e proporcionando novas experiências a quem mais precisa.
          </p>
        </div>

        {/* Donation widget */}
        <div className="reveal max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-nature-lg overflow-hidden">
            {/* Widget Header */}
            <div className="bg-moss p-8 text-center">
              <Heart size={32} className="text-cream/80 mx-auto mb-3" aria-hidden="true" />
              <p className="font-display text-2xl text-cream font-light">
                Escolha o valor da sua contribuição
              </p>
            </div>

            {/* Value selector */}
            <div className="p-8">
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"
                role="group"
                aria-label="Valores sugeridos para doação"
              >
                {donationValues.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setSelectedValue(value);
                      setCustomValue("");
                      setShowPix(false);
                    }}
                    className={cn(
                      "donation-value-btn",
                      selectedValue === value && !customValue && "selected"
                    )}
                    aria-pressed={selectedValue === value && !customValue}
                  >
                    <span className="font-sans text-xs opacity-70 mr-0.5">R$</span>
                    <span className="font-display text-xl">{value}</span>
                  </button>
                ))}
              </div>

              {/* Custom value */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-text-medium pointer-events-none">
                  R$
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Outro valor"
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.value);
                    setSelectedValue(null);
                    setShowPix(false);
                  }}
                  className="w-full h-12 pl-10 pr-4 border-2 border-sand rounded-xl font-sans text-sm text-text-dark placeholder:text-text-light focus:outline-none focus:border-moss transition-colors"
                  aria-label="Inserir valor personalizado para doação"
                />
              </div>

              {/* Selected amount display */}
              {(finalAmount > 0) && (
                <p className="text-center font-sans text-sm text-text-medium mt-3">
                  Valor selecionado:{" "}
                  <strong className="text-moss font-semibold">
                    {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(finalAmount)}
                  </strong>
                </p>
              )}

              {/* CTA Button */}
              <button
                onClick={handleContribute}
                disabled={!finalAmount || finalAmount <= 0}
                className="mt-6 w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <Heart size={18} aria-hidden="true" />
                Quero contribuir
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Pix Payment Flow */}
            {showPix && (
              <div
                ref={pixRef}
                className="border-t border-sand p-8"
                aria-live="polite"
                aria-label="Instruções de pagamento via Pix"
              >
                {hasPixKey ? (
                  <>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-moss/10 rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-moss animate-pulse" aria-hidden="true" />
                        <span className="font-sans text-sm text-moss font-medium">Pagamento via Pix</span>
                      </div>
                      <h3 className="font-display text-2xl text-text-dark">
                        Escaneie o QR Code
                      </h3>
                      <p className="font-sans text-sm text-text-medium mt-1">
                        ou copie o código para pagar pelo seu banco
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-white border-2 border-sand rounded-2xl inline-block">
                        <QRCodeSVG
                          value={pixPayload}
                          size={200}
                          level="M"
                          bgColor="#FFFFFF"
                          fgColor="#30372F"
                          includeMargin={false}
                        />
                      </div>
                    </div>

                    {/* Pix info */}
                    <div className="bg-cream rounded-2xl p-4 mb-4 text-center">
                      <p className="font-sans text-xs text-text-medium uppercase tracking-widest mb-1">Recebedor</p>
                      <p className="font-display text-lg text-text-dark">{pixName}</p>
                      {finalAmount > 0 && (
                        <p className="font-sans text-sm text-moss font-medium mt-1">
                          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(finalAmount)}
                        </p>
                      )}
                    </div>

                    {/* Copy code */}
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "w-full flex items-center justify-center gap-3 p-4 rounded-xl border-2 font-sans font-medium text-sm transition-all duration-300",
                        copied
                          ? "border-moss bg-moss text-cream"
                          : "border-sand hover:border-moss hover:text-moss text-text-medium"
                      )}
                      aria-live="polite"
                    >
                      {copied ? (
                        <>
                          <CheckCheck size={18} aria-hidden="true" />
                          Código copiado!
                        </>
                      ) : (
                        <>
                          <Copy size={18} aria-hidden="true" />
                          Copiar código Pix
                        </>
                      )}
                    </button>

                    {/* Disclaimer */}
                    <p className="font-sans text-xs text-text-light text-center mt-4 leading-relaxed">
                      ⚠️ O pagamento é processado pelo seu banco. Após pagar, a confirmação
                      aparecerá no aplicativo do seu banco. O projeto não confirma recebimentos automaticamente.
                    </p>

                    {/* Thank you */}
                    <div className="mt-6 p-5 bg-sage/10 border border-sage/20 rounded-2xl text-center">
                      <p className="font-display text-xl text-moss-dark">
                        ❤️ Obrigado pelo seu apoio!
                      </p>
                      <p className="font-sans text-sm text-text-medium mt-2">
                        Cada contribuição ajuda a construir novas possibilidades e fortalecer esse projeto.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 bg-sand/60 rounded-2xl">
                    <p className="font-display text-xl text-text-dark mb-2">🌿 Chave Pix não configurada</p>
                    <p className="font-sans text-sm text-text-medium">
                      O administrador do site precisa configurar a chave Pix no Painel Administrativo
                      para ativar o pagamento online.
                    </p>
                    <a
                      href="/admin"
                      className="inline-block mt-4 btn-primary"
                    >
                      Acessar Painel Admin
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Transparency Section */}
        <div className="reveal mt-20">
          <div className="text-center mb-10">
            <h3
              className="font-display font-light text-text-dark"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Como as doações ajudam o projeto
            </h3>
            <p className="font-sans text-body-md text-text-medium mt-3 max-w-xl mx-auto">
              Cada contribuição é investida diretamente na manutenção e no desenvolvimento do Bem Viver Ecoterapia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {transparencyCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 text-center shadow-nature transition-all duration-300 hover:shadow-nature-lg hover:-translate-y-1"
              >
                <span className="text-3xl block mb-3" role="img" aria-hidden="true">
                  {cat.icon}
                </span>
                <p className="font-sans text-sm text-text-medium leading-snug">{cat.label}</p>
              </div>
            ))}
          </div>

          {/* Reports placeholder */}
          <div className="bg-white rounded-3xl p-8 shadow-nature border border-sand/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-moss/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <FileText size={20} className="text-moss" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-display text-xl text-text-dark mb-2">Prestação de Contas</h4>
                <p className="font-sans text-sm text-text-medium leading-relaxed mb-4">
                  O Bem Viver Ecoterapia está comprometido com a transparência. Relatórios e documentos
                  de prestação de contas serão disponibilizados aqui pelo administrador do projeto.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sand/60 rounded-lg">
                  <span className="font-sans text-xs text-text-medium">
                    📄 Nenhum relatório disponível ainda — em breve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
