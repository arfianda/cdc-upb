import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight, Search, Sparkles, Building2 } from 'lucide-react';
import { mockJobs } from '../../data/mockJobs';

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

      // Stagger entrance untuk bento media cards di sisi kanan
      gsap.fromTo(
        '.hero-bento-card',
        { scale: 0.94, opacity: 0, y: 25 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
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

  const sampleJob = mockJobs[0];

  return (
    <section
      ref={containerRef}
      id="beranda"
      className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-center bg-[#FAF9F5] text-slate-900 overflow-hidden border-b border-[#E8E5DD]"
    >
      {/* Background ambient lighting halus ala Heyo */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />
      <div className="absolute top-20 right-1/4 w-[600px] h-[400px] bg-[#FFE500]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Two-Column Layout ala Heyo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Kolom Teks Kiri (5.5 Kolom Desktop) */}
          <div className="lg:col-span-5 space-y-7">
            {/* Tag Badge Institusi */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-white text-navy-950 border border-slate-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#114B3A] animate-pulse" />
                Pusat Karier & Tracer Study Resmi
              </span>
              <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">
                UPB Cikarang
              </span>
            </div>

            {/* Headline Display Besar ala Heyo dengan Signature Underline */}
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-sans text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-slate-950 leading-[1.06]">
                  Dari kampus ke industri,
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-sans text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-slate-950 leading-[1.06]">
                  kami siap{' '}
                  <span className="relative inline-block text-slate-950">
                    <span>mendampingimu.</span>
                    {/* Hand-drawn yellow underline curve ala Heyo */}
                    <svg
                      className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-3 sm:h-3.5 text-[#FFDE00]"
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

            {/* Narasi Subteks Bersih & Hangat */}
            <p className="hero-fade-in text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              CDC Universitas Pelita Bangsa adalah wadah inovasi karier yang membimbing mahasiswa
              dan alumni membangun reputasi profesional, portofolio unggul, dan akses kerja langsung
              ke kawasan industri Cikarang.
            </p>

            {/* Action Buttons ala Heyo */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#lowongan"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FFDE00] hover:bg-[#F0CF00] text-slate-950 font-bold text-sm tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-sm"
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Jelajahi Lowongan</span>
              </a>

              <a
                href="#layanan"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-300 hover:border-slate-900 transition-colors shadow-2xs hover:bg-slate-50"
              >
                <span>Layanan CDC</span>
              </a>
            </div>

            {/* Quick Search Capsule Pill */}
            <div className="hero-fade-in pt-1 max-w-lg">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs">
                <div className="absolute left-4.5 text-slate-400">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ketik posisi atau perusahaan impian..."
                  className="w-full h-12 pl-11 pr-12 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label="Cari lowongan"
                  className="absolute right-1.5 w-9 h-9 rounded-full bg-navy-950 hover:bg-navy-900 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-2xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Kolom Visual Kanan (7 Kolom Desktop): Bento Media Collage ala Heyo */}
          <div className="lg:col-span-7 hero-fade-in relative">
            <div className="grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
              {/* Baris 1: Card 1 (Pill Banner Hijau Krem) & Card 2 (Badge Event Berwarna) */}
              <div className="col-span-8 hero-bento-card rounded-[26px] bg-[#EAE8DF] border border-[#DDD9CE] p-4 sm:p-5 flex items-center justify-center shadow-xs">
                <div className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#114B3A] text-white flex items-center gap-3 shadow-xs">
                  <span className="font-sans font-black tracking-[0.25em] text-xs sm:text-base uppercase">
                    PELITA BANGSA
                  </span>
                </div>
              </div>

              <div className="col-span-4 hero-bento-card rounded-[26px] bg-[#0E1322] border border-slate-800 p-3 sm:p-4 text-white relative overflow-hidden flex flex-col justify-between shadow-xs">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                    CAMPUS EXPO
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFDE00]" />
                </div>
                <div className="pt-2">
                  <span className="block font-sans font-extrabold text-sm sm:text-base leading-tight bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    JOB FAIR 2026
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block pt-0.5">
                    350+ Mitra Kawasan
                  </span>
                </div>
              </div>

              {/* Baris 2: Card 3 (Mobile Career App Screen) & Card 4 (Automotive Banner) */}
              <div className="col-span-4 hero-bento-card rounded-[26px] bg-white border border-slate-200/90 p-3 sm:p-3.5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">
                      CDC APP
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="pt-2.5 space-y-1">
                    <span className="text-[9px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                      98% Match
                    </span>
                    <h2 className="text-xs font-bold text-slate-900 leading-tight">
                      {sampleJob.judul}
                    </h2>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Building2 className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{sampleJob.company_name}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-navy-950 font-mono">
                    {sampleJob.gaji_display}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#FFDE00] flex items-center justify-center text-slate-950">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <div className="col-span-8 hero-bento-card rounded-[26px] overflow-hidden bg-[#F5EFE6] border border-slate-200/90 shadow-sm relative group aspect-[16/8] sm:aspect-auto">
                <img
                  src="/images/hero_automotive.jpg"
                  alt="Modern automotive manufacturing showcase di kawasan Cikarang"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-[11px] font-semibold text-white drop-shadow-sm">
                    Episentrum Manufaktur & Otomasi Cikarang
                  </span>
                </div>
              </div>

              {/* Baris 3: Card 5 (Keyboard Macro Banner) & Card 6 (3D Character Art) */}
              <div className="col-span-8 hero-bento-card rounded-[26px] overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm relative group aspect-[16/7] sm:aspect-auto">
                <img
                  src="/images/hero_keyboard.jpg"
                  alt="Mechanical keyboard engineering craft"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3.5">
                  <span className="text-[11px] font-semibold text-white drop-shadow-sm font-mono">
                    Teknologi & Rekayasa Perangkat Lunak
                  </span>
                </div>
              </div>

              <div className="col-span-4 hero-bento-card rounded-[26px] overflow-hidden bg-[#060814] border border-slate-800 shadow-sm relative group aspect-square sm:aspect-auto">
                <img
                  src="/images/hero_avatar_3d.jpg"
                  alt="Futuristic tech alumni character"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-mono text-cyan-300">
                  AI Talent
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client & Partner Logos Strip di Bawah Hero (Persis seperti Heyo) */}
        <div className="hero-fade-in mt-16 pt-8 border-t border-[#E8E5DD]/80">
          <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">
            Dipercaya oleh 350+ Korporasi & Industri Multinasional
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-75 hover:opacity-100 transition-opacity">
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              TOYOTA
            </span>
            <span className="font-serif italic font-bold text-slate-400 hover:text-slate-800 transition-colors text-lg sm:text-xl">
              Astra Otoparts
            </span>
            <span className="font-sans font-extrabold text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-widest">
              EPSON
            </span>
            <span className="font-sans font-black text-slate-400 hover:text-slate-800 transition-colors text-base sm:text-lg tracking-wider">
              HYUNDAI
            </span>
            <span className="font-serif font-bold text-slate-400 hover:text-slate-800 transition-colors text-lg sm:text-xl">
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
