import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, MapPin, Briefcase, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { PlaceholderImage } from '../ui/PlaceholderImage';

interface HeroSectionProps {
  onSearch?: (query: string, lokasi: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLFormElement | null>(null);

  const [keyword, setKeyword] = React.useState('');
  const [lokasi, setLokasi] = React.useState('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal headline per baris dengan masking translateY 110% -> 0%
      const lines = headlineRef.current?.querySelectorAll('.hero-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.1,
          }
        );
      }

      // Reveal subteks dan badges
      gsap.fromTo(
        '.hero-fade-in',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.45,
        }
      );

      // Search capsule scale & entrance
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { scale: 0.96, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.65,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword, lokasi);
    }
    const target = document.querySelector('#lowongan');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative min-h-screen pt-32 pb-24 flex flex-col justify-center bg-navy-950 text-white overflow-hidden"
    >
      {/* Background radial glow halus & noise grain */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-blue-400/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Kolom Teks Kiri (7 Kolom) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Tag Badge Institusi */}
            <div className="hero-fade-in flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-white/10 text-blue-300 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6BFF]" />
                Pusat Karier & Tracer Study Resmi
              </span>
              <span className="text-xs text-slate-400 font-mono tracking-wider uppercase">
                Universitas Pelita Bangsa
              </span>
            </div>

            {/* Headline Display Besar dengan Masking Per Baris */}
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                  Langkah Awal Menuju
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-serif italic text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-blue-300 leading-[1.05]">
                  Karier Berkelas Dunia
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-200 leading-[1.15] pt-2">
                  di Episentrum Industri Cikarang
                </h1>
              </div>
            </div>

            {/* Narasi Subteks Editorial */}
            <p className="hero-fade-in text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
              Menghubungkan mahasiswa dan alumni Universitas Pelita Bangsa langsung dengan ratusan
              perusahaan terverifikasi di kawasan industri terpadu. Dilengkapi pelacakan tracer
              study berkala untuk jaminan mutu kurikulum.
            </p>

            {/* Quick Action Buttons */}
            <div className="hero-fade-in flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                size="lg"
                variant="primary"
                href="#lowongan"
              >
                <span>Jelajahi Lowongan Kerja</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="secondary"
                href="#tracer-study"
              >
                <span>Isi Tracer Study</span>
              </MagneticButton>
            </div>
          </div>

          {/* Kolom Visual Kanan (5 Kolom): Slot Foto Arsitektural */}
          <div className="lg:col-span-5 hero-fade-in">
            <div className="relative">
              {/* Frame decorative hairline offset */}
              <div className="absolute -inset-2 rounded-2xl border border-white/10 -z-10 translate-x-3 translate-y-3 hidden sm:block" />
              
              <PlaceholderImage
                aspectRatio="portrait"
                caption="Gedung Kampus & Ruang Konseling Career Development Center Universitas Pelita Bangsa"
                badgeText="GANTI DENGAN FOTO ASLI UPB"
                className="shadow-[0_20px_50px_rgba(2,8,26,0.8)]"
              />

              {/* Float Mini Badge: Kawasan Industri */}
              <div className="absolute -bottom-5 -left-5 p-4 rounded-xl bg-navy-900/90 backdrop-blur-md border border-white/15 shadow-xl max-w-xs hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Akses Langsung Mitra
                  </span>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    MM2100 · Jababeka · EJIP · GIIC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Composite Search Capsule (Floating Bar di Bawah Grid) */}
        <div className="mt-16">
          <form
            ref={searchRef}
            onSubmit={handleSearchSubmit}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-full bg-white/95 text-slate-900 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Input 1: Kata Kunci (5 Cols) */}
              <div className="sm:col-span-5 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="w-full">
                  <label htmlFor="search-keyword" className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Posisi atau Perusahaan
                  </label>
                  <input
                    id="search-keyword"
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Contoh: Supply Chain, Automation, QC"
                    className="w-full bg-transparent text-sm font-sans font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Divider vertikal desktop */}
              <div className="hidden sm:block sm:col-span-1 h-8 border-r border-slate-200" />

              {/* Input 2: Kawasan / Lokasi (3 Cols) */}
              <div className="sm:col-span-3 flex items-center gap-3 px-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="w-full">
                  <label htmlFor="search-lokasi" className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                    Kawasan Kerja
                  </label>
                  <input
                    id="search-lokasi"
                    type="text"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                    placeholder="Semua Kawasan Cikarang"
                    className="w-full bg-transparent text-sm font-sans font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tombol Aksi Submit (3 Cols) */}
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#2F6BFF] hover:bg-blue-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(47,107,255,0.4)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <Search className="w-4 h-4" />
                  <span>Cari Posisi</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
