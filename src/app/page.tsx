import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HistoriaSection from "@/components/sections/HistoriaSection";
import EcoterapiaSection from "@/components/sections/EcoterapiaSection";
import PropostoSection from "@/components/sections/PropostoSection";
import DoacaoSection from "@/components/sections/DoacaoSection";
import ContatoSection from "@/components/sections/ContatoSection";
import FooterSection from "@/components/sections/FooterSection";
import { defaultConfig } from "@/lib/config";

// In production, this would fetch from Supabase
// For now, we use the default config values
async function getSiteConfig() {
  return defaultConfig;
}

export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection
          title={config.heroTitle}
          subtitle={config.heroSubtitle}
        />
        <HistoriaSection
          title={config.historiaTitle}
          subtitle={config.historiaSubtitle}
          text={config.historiaText}
        />

        <EcoterapiaSection
          title={config.ecoterapiaTitle}
          subtitle={config.ecoterapiaSubtitle}
        />
        <PropostoSection
          missao={config.missao}
          visao={config.visao}
          valores={config.valores}
        />
        <Suspense fallback={<div className="section-padding bg-sand/50" />}>
          <DoacaoSection
            donationValues={config.donationValues}
            pixKey={config.pixKey}
            pixName={config.pixName}
            pixCity={config.pixCity}
            transparencyCategories={config.transparencyCategories}
          />
        </Suspense>
        <ContatoSection
          whatsapp={config.whatsapp}
          instagram={config.instagram}
          email={config.email}
          address={config.address}
        />
      </main>
      <FooterSection
        whatsapp={config.whatsapp}
        instagram={config.instagram}
        email={config.email}
      />
    </>
  );
}
