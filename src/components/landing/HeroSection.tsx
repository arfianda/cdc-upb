import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Search, MapPin, ArrowUpRight, ArrowRight, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { DummyBadge } from '../ui/DummyBadge';
import { mockJobs } from '../../data/mockJobs';

interface HeroSectionProps {
  onSearch?: (query: string, lokasi: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLFormElement | null>(null);

  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Manufaktur' | 'IT' | 'Keuangan'>('Semua');
  const [selectedJobId, setSelectedJobId] = useState('job-001');

  // Filter lowongan untuk konsol radar fungsional di sisi kanan
  const filteredJobs = mockJobs.filter((j) => {
    const matchesSearch =
      keyword === '' ||
      j.judul.toLowerCase().includes(keyword.toLowerCase()) ||
      j.company_name.toLowerCase().includes(keyword.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Manufaktur') return j.bidang.includes('Manufaktur') || j.bidang.includes('Otomasi');
    if (activeCategory === 'IT') return j.bidang.includes('Teknologi') || j.bidang.includes('IoT');
    if (activeCategory === 'Keuangan') return j.bidang.includes('Perbankan') || j.bidang.includes('Data');
    return true;
  });

  const currentJob = mockJobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || mockJobs[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal headline per baris dengan masking translateY
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

      // Reveal subteks dan elemen hero lainnya
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

      // Search capsule entrance
      if (searchRef.current) {
        gsap.fromTo(
          searchRef.current,
          { scale: 0.96, opacity: 0, y: 20 },
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
      className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center bg-white text-slate-900 overflow-hidden border-b border-slate-200/80"
    >
      {/* Background ambient lighting halus & noise grain 2% */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-50/70 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-slate-100/60 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Kolom Teks Kiri (6 Kolom) */}
          <div className="lg:col-span-6 space-y-7">
            {/* Tag Badge Institusi */}
            <div className="hero-fade-in flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-slate-50 text-navy-950 border border-slate-200 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-950 animate-pulse" />
                Pusat Karier & Tracer Study Resmi
              </span>
              <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">
                Universitas Pelita Bangsa
              </span>
            </div>

            {/* Headline Display Besar dengan Masking Per Baris */}
            <div ref={headlineRef} className="space-y-1">
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-serif text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight text-navy-950 leading-[1.02]">
                  Langkah Awal Menuju
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h1 className="hero-line font-serif italic text-4xl sm:text-6xl lg:text-[70px] font-bold tracking-tight text-navy-900 leading-[1.02]">
                  Karier Berkelas Dunia
                </h1>
              </div>
              <div className="overflow-hidden py-1">
                <h2 className="hero-line font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-800 leading-[1.15] pt-2">
                  di Episentrum Industri Cikarang
                </h2>
              </div>
            </div>

            {/* Narasi Subteks Editorial */}
            <p className="hero-fade-in text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-sans">
              Menghubungkan mahasiswa dan alumni Universitas Pelita Bangsa langsung dengan mitra
              industri terverifikasi di kawasan Jababeka, MM2100, EJIP, dan GIIC. Dilengkapi pelacakan
              tracer study berkala untuk jaminan mutu kurikulum.
            </p>

            {/* Single Capsule Search Pill (SquareDash Reference Principle) */}
            <div className="hero-fade-in pt-2 max-w-lg space-y-3">
              <form
                ref={searchRef}
                onSubmit={handleSearchSubmit}
                className="relative flex items-center shadow-xs"
              >
                <div className="absolute left-4.5 text-slate-400">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Ketik posisi atau perusahaan impian..."
                  className="w-full h-14 pl-12 pr-14 rounded-full bg-[#F3F4F6] border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-950 focus:bg-white transition-all shadow-inner"
                />
                <button
                  type="submit"
                  aria-label="Cari lowongan"
                  className="absolute right-2 w-10 h-10 rounded-full bg-navy-950 hover:bg-navy-900 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Micro-Trust Line */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Khusus mahasiswa & alumni UPB · Validasi resmi CDC · Tanpa biaya</span>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="hero-fade-in flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton
                size="md"
                variant="primary"
                href="#lowongan"
              >
                <span>Jelajahi Lowongan Kerja</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                size="md"
                variant="secondary"
                href="#tracer-study"
              >
                <span>Tracer Study Lulusan</span>
              </MagneticButton>
            </div>
          </div>

          {/* Kolom Visual Fungsional Kanan (6 Kolom): Radar Lowongan Aktif */}
          <div className="lg:col-span-6 hero-fade-in relative">
            <div className="relative rounded-[28px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-slate-200 p-6 sm:p-8 shadow-[0_20px_50px_rgba(4,11,31,0.06)] overflow-hidden">
              {/* Header Konsol Visual */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-navy-950 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    CDC
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-navy-950 block">
                      Radar Lowongan Aktif
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Sinkronisasi Terkurasi UPB
                    </span>
                  </div>
                </div>

                <DummyBadge label="Data contoh lowongan" />
              </div>

              {/* Filter Kategori Mini Fungsional */}
              <div className="py-4 flex flex-wrap gap-1.5">
                {(['Semua', 'Manufaktur', 'IT', 'Keuangan'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? 'bg-navy-950 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Daftar Interaktif Mini */}
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {filteredJobs.slice(0, 3).map((job) => {
                  const isSelected = job.id === currentJob.id;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-white border-navy-950/40 shadow-sm'
                          : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="text-xs font-bold text-navy-950">
                              {job.judul}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                              {job.tipe}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{job.company_name}</span>
                            <span>·</span>
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{job.lokasi}</span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0 pt-1 sm:pt-0">
                          <span className="text-xs font-bold text-navy-950 block">
                            {job.gaji_display || 'Kompetitif'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono hidden sm:block">
                            {job.lokasi}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Panel Detail Terpilih */}
              <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Mitra Terverifikasi: <strong className="text-navy-950">{currentJob.company_name}</strong>
                  </span>
                </div>
                <a
                  href="#lowongan"
                  className="inline-flex items-center gap-1 font-semibold text-navy-950 hover:underline"
                >
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
