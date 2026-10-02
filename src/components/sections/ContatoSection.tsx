"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContatoSectionProps {
  whatsapp?: string;
  instagram?: string;
  email?: string;
  address?: string;
}

export default function ContatoSection({
  whatsapp = "",
  instagram = "",
  email = "",
  address = "",
}: ContatoSectionProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

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

  const onSubmit = async (data: ContactForm) => {
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
    setTimeout(() => setSubmitStatus("idle"), 6000);
  };

  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre o Bem Viver Ecoterapia.")}`
    : "#";
  const instagramUrl = instagram
    ? `https://instagram.com/${instagram.replace("@", "")}`
    : "#";

  const contactItems = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: whatsapp || "A ser configurado",
      href: whatsapp ? whatsappUrl : undefined,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: instagram || "A ser configurado",
      href: instagram ? instagramUrl : undefined,
      color: "bg-pink-50 text-pink-600",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: email || "A ser configurado",
      href: email ? `mailto:${email}` : undefined,
      color: "bg-blue-50 text-blue-600",
    },
    ...(address
      ? [{
          icon: MapPin,
          label: "Localização",
          value: address,
          href: undefined,
          color: "bg-amber-50 text-amber-600",
        }]
      : []),
  ];

  return (
    <section
      id="contato"
      ref={sectionRef}
      aria-labelledby="contato-title"
      className="section-padding bg-cream"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Contact info */}
          <div>
            <div className="reveal mb-3">
              <span className="tag">Contato</span>
            </div>
            <h2
              id="contato-title"
              className="reveal reveal-delay-1 font-display font-light text-text-dark text-balance"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.15 }}
            >
              Vamos conversar?
            </h2>
            <p className="reveal reveal-delay-2 font-sans text-body-md text-text-medium mt-4 mb-8 leading-relaxed">
              Estamos aqui para responder suas dúvidas, agendar uma visita ou simplesmente trocar uma ideia.
            </p>

            {/* Contact items */}
            <div className="space-y-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={`reveal reveal-delay-${Math.min(i + 2, 4)} flex items-center gap-4 p-4 bg-white rounded-2xl shadow-nature transition-all duration-300 hover:shadow-nature-lg hover:-translate-y-0.5`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-text-light uppercase tracking-widest">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-sm text-text-dark hover:text-moss transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-sans text-sm text-text-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Formulário de contato"
              className="bg-white rounded-3xl p-8 shadow-nature"
            >
              <h3 className="font-display text-2xl text-text-dark mb-6">Envie uma mensagem</h3>

              {/* Name */}
              <div className="mb-5">
                <label htmlFor="contact-name" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                  Nome <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className={`w-full h-12 px-4 border-2 rounded-xl font-sans text-sm text-text-dark focus:outline-none transition-colors ${
                    errors.name ? "border-red-300 focus:border-red-400" : "border-sand focus:border-moss"
                  }`}
                  placeholder="Seu nome completo"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                  E-mail <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className={`w-full h-12 px-4 border-2 rounded-xl font-sans text-sm text-text-dark focus:outline-none transition-colors ${
                    errors.email ? "border-red-300 focus:border-red-400" : "border-sand focus:border-moss"
                  }`}
                  placeholder="seu@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="contact-message" className="block font-sans text-sm font-medium text-text-dark mb-1.5">
                  Mensagem <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  {...register("message")}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-sans text-sm text-text-dark focus:outline-none transition-colors resize-none ${
                    errors.message ? "border-red-300 focus:border-red-400" : "border-sand focus:border-moss"
                  }`}
                  placeholder="Como podemos ajudar?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                aria-busy={submitStatus === "loading"}
              >
                {submitStatus === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" />
                    Enviar mensagem
                  </>
                )}
              </button>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3" role="alert">
                  <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="font-sans text-sm text-green-700">
                    Mensagem enviada com sucesso! Entraremos em contato em breve. Obrigado!
                  </p>
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3" role="alert">
                  <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="font-sans text-sm text-red-600">
                    Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
