import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight, Search } from 'lucide-react';

interface HeroSectionProps {
  onSearch?: (query: string, lokasi: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal headline per baris dengan masking translateY
      const lines = headlineRef.current?.querySelectorAll('.hero-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.1,
          }
        );
      }

      // Reveal subteks dan elemen hero lainnya
      gsap.fromTo(
        '.hero-fade-in',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.35,
        }
      );

      // Entrance untuk kartu visual gedung di sisi kanan
      gsap.fromTo(
        '.hero-visual-card',
        { scale: 0.95, opacity: 0, y: 25 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.45,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(keyword, '');
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
      className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-center bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white text-slate-900 overflow-hidden border-b border-[#E0EDFD]"
    >
      {/* Background ambient lighting biru segar selaras logo */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[400px] bg-[#00A3E0]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-[#0C4A9E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-Column Layout Seimbang (6 - 6 Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Kolom Teks Kiri (6 Kolom Desktop) */}
          <div className="lg:col-span-6 space-y-7">
            {/* Tag Badge Institusi */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide uppercase bg-white text-[#071E4A] border border-[#BAE6FD] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] animate-pulse" />
                Pusat Karier & Tracer Study Resmi
              </span>
              <span className="text-xs text-[#0C4A9E]/80 font-sans tracking-wide uppercase font-semibold">
                UPB Cikarang
              </span>
            </div>

            {/* Headline Display Besar dengan Signature Underline Cyan Logo */}
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-sans text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#071E4A] leading-[1.06]">
                  Dari kampus ke industri,
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-sans text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#071E4A] leading-[1.06]">
                  kami siap{' '}
                  <span className="relative inline-block text-[#071E4A]">
                    <span>mendampingimu.</span>
                    {/* Hand-drawn cyan underline curve selaras logo */}
                    <svg
                      className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-3 sm:h-3.5 text-[#00A3E0]"
                      viewBox="0 0 240 14"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 10.5C65 3.5 175 3.5 237 10.5"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
              </div>
            </div>

            {/* Narasi Subteks Bersih & Terpercaya */}
            <p className="hero-fade-in text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              CDC Universitas Pelita Bangsa adalah wadah inovasi karier yang membimbing mahasiswa
              dan alumni membangun reputasi profesional, portofolio unggul, dan akses kerja langsung
              ke kawasan industri Cikarang.
            </p>

            {/* Action Buttons Selaras Brand Blue CDC */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#lowongan"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] hover:from-[#093B80] hover:to-[#008FC5] text-white font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/25"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Jelajahi Lowongan</span>
              </a>

              <a
                href="#layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#071E4A] font-semibold text-sm border border-[#BAE6FD] hover:border-[#0C4A9E] transition-all shadow-2xs hover:bg-[#F0F7FF]"
              >
                <span>Layanan CDC</span>
              </a>
            </div>

            {/* Quick Search Capsule Pill */}
            <div className="hero-fade-in pt-1 max-w-lg">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs">
                <div className="absolute left-4.5 text-slate-400">
                  <Search className="w-4 h-4 text-[#00A3E0]" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ketik posisi atau perusahaan impian..."
                  className="w-full h-12 pl-11 pr-12 rounded-full bg-white border border-[#BAE6FD] text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A3E0] transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label="Cari lowongan"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-[#0C4A9E] hover:bg-[#071E4A] text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Visual Kanan (6 Kolom Desktop): Single Square Semi-Round Gambar Gedung UPB */}
          <div className="lg:col-span-6 hero-fade-in relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] xl:max-w-[520px] aspect-square rounded-[36px] sm:rounded-[44px] overflow-hidden bg-slate-100 border border-[#BAE6FD] shadow-[0_20px_50px_rgba(12,74,158,0.08)] group hero-visual-card">
              {/* Gambar Gedung UPB */}
              <img
                src="/images/gedung_upb.jpg"
                alt="Gedung Kampus Utama Universitas Pelita Bangsa Cikarang"
                className="w-full h-full object-cover object-[62%_center] group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />

              {/* Lencana Kampus di Sudut Atas */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 px-3.5 sm:px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#BAE6FD] shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                <span className="text-xs font-sans font-bold text-[#071E4A]">Kampus Utama UPB</span>
                <span className="text-[10px] font-sans text-[#0C4A9E]/80 uppercase tracking-wide font-semibold">Cikarang</span>
              </div>

              {/* Kartu Informasi di Bawah Gambar */}
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs sm:text-sm font-sans font-bold text-[#071E4A] block truncate">
                    Universitas Pelita Bangsa
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#0C4A9E]/80 font-sans font-medium block truncate">
                    Pusat Pengembangan Karier & Tracer Study
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] text-white text-[10px] sm:text-[11px] font-sans font-semibold shrink-0">
                  Episentrum Industri
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Client & Partner Logos Strip di Bawah Hero */}
        <div className="hero-fade-in mt-16 pt-8 border-t border-[#E0EDFD]">
          <p className="text-center text-xs font-sans font-bold uppercase tracking-wider text-slate-400 mb-6">
            Dipercaya oleh 350+ Korporasi & Industri Multinasional
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-75 hover:opacity-100 transition-opacity">
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              TOYOTA
            </span>
            <span className="font-sans font-bold text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg">
              Astra Otoparts
            </span>
            <span className="font-sans font-extrabold text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-widest">
              EPSON
            </span>
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              HYUNDAI
            </span>
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              DANONE
            </span>
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-widest">
              BCA
            </span>
            <span className="font-sans font-extrabold text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              UNILEVER
            </span>
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-widest">
              OMRON
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
