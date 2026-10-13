import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { PartnerMarquee } from '../components/landing/PartnerMarquee';
import { FeaturedJobsSection } from '../components/landing/FeaturedJobsSection';
import { ImpactStatsBand } from '../components/landing/ImpactStatsBand';
import { PinnedServicesSection } from '../components/landing/PinnedServicesSection';
import { TracerStudyTeaser } from '../components/landing/TracerStudyTeaser';
import { AlumniStoriesSection } from '../components/landing/AlumniStoriesSection';
import { EmployerCtaBanner } from '../components/landing/EmployerCtaBanner';
import { Footer } from '../components/layout/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-slate-900 font-sans selection:bg-navy-950 selection:text-white">
      {/* Header & Navigasi */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Partner Logos Marquee (bereaksi dinamis terhadap scroll) */}
        <PartnerMarquee />

        {/* 3. Kurasi Lowongan Unggulan (Kanvas Terang Editorial Asimetris) */}
        <FeaturedJobsSection />

        {/* 4. Impact Statistics Band (Kanvas Gelap, Angka Tabular Raksasa, Self-Drawing Hairline) */}
        <ImpactStatsBand />

        {/* 5. Empat Pilar Layanan (Desktop Pinned Scrub, Mobile Stack) */}
        <PinnedServicesSection />

        {/* 6. Tracer Study Teaser (Kanvas Terang dengan Bar Chart Tumbuh) */}
        <TracerStudyTeaser />

        {/* 7. Rekam Jejak Alumni (Editorial Quote Switcher & Duotone) */}
        <AlumniStoriesSection />

        {/* 8. Banner Kemitraan Perusahaan */}
        <EmployerCtaBanner />
      </main>

      {/* Footer Arsitektural */}
      <Footer />
    </div>
  );
};
