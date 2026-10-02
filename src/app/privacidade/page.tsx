import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do site Bem Viver Ecoterapia.",
};

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-cream">
        <div className="container-narrow max-w-3xl">
          <h1 className="font-display font-light text-text-dark mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Política de Privacidade
          </h1>

          <div className="prose prose-slate max-w-none font-sans text-text-medium leading-relaxed space-y-6">
            <p>
              O Bem Viver Ecoterapia respeita a privacidade dos visitantes do seu site e está comprometido em proteger as informações pessoais compartilhadas conosco.
            </p>

            <h2 className="font-display text-2xl text-text-dark mt-8 mb-3">Coleta de informações</h2>
            <p>
              Coletamos apenas as informações fornecidas voluntariamente através do formulário de contato (nome e e-mail), utilizadas exclusivamente para responder à sua mensagem.
            </p>

            <h2 className="font-display text-2xl text-text-dark mt-8 mb-3">Uso das informações</h2>
            <p>
              As informações coletadas são utilizadas para entrar em contato com você em resposta às suas solicitações. Não compartilhamos, vendemos ou cedemos dados pessoais a terceiros.
            </p>

            <h2 className="font-display text-2xl text-text-dark mt-8 mb-3">Doações</h2>
            <p>
              O site exibe informações de pagamento via Pix (QR Code e código copia-e-cola). Nenhuma informação bancária ou financeira do doador é coletada ou armazenada pelo site.
            </p>

            <h2 className="font-display text-2xl text-text-dark mt-8 mb-3">Cookies</h2>
            <p>
              Este site utiliza cookies essenciais para funcionamento básico. Não utilizamos cookies de rastreamento ou publicidade.
            </p>

            <h2 className="font-display text-2xl text-text-dark mt-8 mb-3">Contato</h2>
            <p>
              Para dúvidas sobre esta política de privacidade, entre em contato conosco através da <Link href="/#contato" className="text-moss hover:text-moss-dark underline underline-offset-2">página de contato</Link>.
            </p>

            <p className="text-sm text-text-light mt-8 pt-6 border-t border-sand">
              Última atualização: outubro de 2025.
            </p>
          </div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
