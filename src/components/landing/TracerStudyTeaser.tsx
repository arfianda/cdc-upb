import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { mockTracerStats } from '../../data/mockTracer';
import { DummyBadge } from '../ui/DummyBadge';
import { ArrowUpRight, BarChart2, ShieldCheck, ChevronDown, ChevronUp, Award, TrendingUp, Clock, Building2 } from 'lucide-react';

export const TracerStudyTeaser: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Floating cards hover/entrance
      gsap.fromTo(
        '.tracer-floating-card',
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle ESC key untuk menutup modal (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <section
      ref={containerRef}
      id="tracer-study"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white via-[#F0F7FF] to-white text-slate-900 overflow-hidden border-b border-[#E0EDFD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Accolades & Social Proof Bar di Puncak (Persis Referensi Gusto) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-16 sm:pb-20 border-b border-[#E0EDFD] items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0C4A9E]">
              <Award className="w-5 h-5 text-[#0C4A9E]" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#0C4A9E]">
                KEMDIKBUDRISTEK
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#071E4A] leading-tight block">
                Standar Pelaporan Mutu Resmi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#00A3E0]">
              <TrendingUp className="w-5 h-5 text-[#00A3E0]" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#0C4A9E]">
                RELEVANSI 89.1%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#071E4A] leading-tight block">
                Sesuai Kebutuhan Industri
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#0C4A9E]">
              <Clock className="w-5 h-5 text-[#0C4A9E]" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#0C4A9E]">
                WAKTU TUNGGU
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#071E4A] leading-tight block">
                Rata-rata 2.7 Bulan Kerja
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 text-[#00A3E0]">
              <Building2 className="w-5 h-5 text-[#00A3E0]" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-[#0C4A9E]">
                JARINGAN KAWASAN
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#071E4A] leading-tight block">
                350+ Korporasi Terintegrasi
              </span>
            </div>
          </div>
        </div>

        {/* 2. Hero Centerpiece dengan Foto Mengambang (Persis Referensi Gusto) */}
        <div className="relative py-16 sm:py-24 my-4 flex flex-col items-center justify-center text-center">
          {/* Foto Mengambang 1: Top-Left (Software Engineer) */}
          <div className="tracer-floating-card hidden md:block absolute -top-4 left-2 lg:left-8 w-44 lg:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 bg-white">
            <img
              src="/images/alumni_engineer.jpg"
              alt="Alumni software engineer UPB"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white text-left truncate">
              Fajar · Frontend Engineer
            </div>
          </div>

          {/* Foto Mengambang 2: Top-Right (Industrial Engineer) */}
          <div className="tracer-floating-card hidden md:block absolute -top-4 right-2 lg:right-8 w-44 lg:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white rotate-[3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 bg-white">
            <img
              src="/images/alumni_industry.jpg"
              alt="Alumni manufacturing engineer UPB"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white text-left truncate">
              Riko · Automation MM2100
            </div>
          </div>

          {/* Foto Mengambang 3: Bottom-Left (Corporate / HR) */}
          <div className="tracer-floating-card hidden md:block absolute -bottom-6 left-2 lg:left-12 w-44 lg:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white rotate-[2deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 bg-white">
            <img
              src="/images/alumni_corporate.jpg"
              alt="Alumni corporate professional UPB"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white text-left truncate">
              Rina · People Operations
            </div>
          </div>

          {/* Foto Mengambang 4: Bottom-Right (Entrepreneur) */}
          <div className="tracer-floating-card hidden md:block absolute -bottom-6 right-2 lg:right-12 w-44 lg:w-56 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white rotate-[-3deg] hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 bg-white">
            <img
              src="/images/alumni_entrepreneur.jpg"
              alt="Alumni entrepreneur UPB"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white text-left truncate">
              Dimas · Wirausaha Mandiri
            </div>
          </div>

          {/* Konten Utama Headline Raksasa Gusto Style */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 py-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-sans font-semibold uppercase tracking-wide">
              <span>Tracer Study Resmi 2024</span>
              <DummyBadge label="Data contoh tracer" />
            </div>

            {/* Strip Foto Alumni untuk Mobile */}
            <div className="md:hidden flex items-center justify-center -space-x-3 my-4">
              <img
                src="/images/alumni_engineer.jpg"
                alt="Alumni UPB"
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <img
                src="/images/alumni_industry.jpg"
                alt="Alumni UPB"
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <img
                src="/images/alumni_corporate.jpg"
                alt="Alumni UPB"
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <img
                src="/images/alumni_entrepreneur.jpg"
                alt="Alumni UPB"
                className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <span className="w-11 h-11 rounded-full bg-[#0C4A9E] text-white font-sans text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                +1.2k
              </span>
            </div>

            <h2 className="font-sans text-4xl sm:text-6xl lg:text-[76px] font-extrabold text-[#071E4A] tracking-tight leading-[1.04]">
              1,248+ alumni memimpin masa depan industri.
            </h2>

            <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
              Pelacakan komprehensif mengukur keterserapan kerja, relevansi keilmuan, dan kesuksesan
              karier lulusan Universitas Pelita Bangsa di kancah nasional.
            </p>

            {/* Tombol Tindakan dengan href ke Tracer Study sesuai Permintaan Pengguna */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/tracer-study"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] hover:from-[#093B80] hover:to-[#008FC5] text-white font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
              >
                <span>Isi Kuesioner Tracer Study</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>

              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#F0F7FF] text-[#071E4A] font-semibold text-sm border border-[#BAE6FD] hover:border-[#0C4A9E] transition-all shadow-2xs"
                aria-expanded={showDetails}
              >
                <span>{showDetails ? 'Tutup Rincian Data' : 'Lihat Rincian Statistik'}</span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Panel Statistik & Distribusi Lulusan (Bisa Ditampilkan Langsung / Expandable) */}
        {showDetails && (
          <div id="tracer-study-detail" className="pt-12 animate-in fade-in slide-in-from-top-6 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sisi Kiri: Distribusi Sektor Industri (7 Cols) */}
              <div className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-7">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400 block">
                      DISTRIBUSI BIDANG KERJA
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">
                      Penyerapan Berdasarkan Klaster Industri
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-5">
                  {mockTracerStats.distribusi_sektor.map((sektor, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                        <span className="text-slate-800 font-sans">{sektor.nama}</span>
                        <span className="font-sans font-bold text-navy-950 tabular-nums">
                          {sektor.persentase}%
                        </span>
                      </div>

                      <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-[#114B3A]"
                          style={{ width: `${sektor.persentase}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
                  <span>Basis Responden: {mockTracerStats.total_responden} Lulusan</span>
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Agregat Publik Aman Privasi
                  </span>
                </div>
              </div>

              {/* Sisi Kanan: Status Lulusan (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-slate-400 block">
                      STATUS 6 BULAN PASCA KELULUSAN
                    </span>
                    <h4 className="font-serif text-xl font-bold text-navy-950 mt-1">
                      Aktivitas Utama Alumni
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD]">
                      <span className="font-sans text-3xl font-extrabold text-[#071E4A] tabular-nums block">
                        {mockTracerStats.persentase_bekerja}%
                      </span>
                      <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                        Bekerja Profesional
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD]">
                      <span className="font-sans text-3xl font-extrabold text-[#071E4A] tabular-nums block">
                        {mockTracerStats.persentase_wirausaha}%
                      </span>
                      <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                        Wirausaha Mandiri
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD]">
                      <span className="font-sans text-3xl font-extrabold text-[#071E4A] tabular-nums block">
                        {mockTracerStats.persentase_studi_lanjut}%
                      </span>
                      <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                        Studi Lanjut S2
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD]">
                      <span className="font-sans text-3xl font-extrabold text-[#071E4A] tabular-nums block">
                        {mockTracerStats.persentase_mencari_kerja}%
                      </span>
                      <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                        Masa Transisi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Kartu Relevansi Pendidikan */}
                <div className="p-7 rounded-3xl bg-[#071E4A] text-white space-y-3 relative overflow-hidden shadow-lg border border-[#0C4A9E]/40">
                  <span className="text-xs font-sans uppercase tracking-wider text-[#00A3E0] block font-bold">
                    RELEVANSI PENDIDIKAN
                  </span>

                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
                      {mockTracerStats.kesesuaian_bidang_persen}%
                    </span>
                    <span className="text-xs text-slate-300 font-sans">
                      Kesesuaian kurikulum dengan dunia kerja
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2 border-t border-white/10">
                    Data dihimpun secara berkala melalui modul tracer study terpadu dan dilaporkan ke pangkalan data perguruan tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Dialog Aksesibel Pengisian Tracer Study */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white text-navy-950 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  INSTRUMEN TRACER STUDY RESMI
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950">
                  Survei Penelusuran Lulusan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Tutup jendela informasi"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Pengisian instrumen survei Tracer Study dikhususkan bagi alumni Universitas Pelita Bangsa
              pada periode evaluasi transisi kerja (6 sampai 12 bulan pasca kelulusan) menggunakan NIM resmi.
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-xs text-navy-950 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kerahasiaan Data Terjamin</span>
              </div>
              <p className="text-slate-600">
                Setiap data responden diproses secara terenkripsi dan hanya disajikan dalam bentuk agregat
                statistik publik sesuai standar privasi institusi.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white text-sm font-medium transition-colors"
              >
                Mengerti & Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
