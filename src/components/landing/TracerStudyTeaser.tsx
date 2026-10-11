import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { mockTracerStats } from '../../data/mockTracer';
import { SectionTag } from '../ui/SectionTag';
import { DummyBadge } from '../ui/DummyBadge';
import { ArrowUpRight, BarChart2, ShieldCheck } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

export const TracerStudyTeaser: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Bar charts tumbuh saat masuk viewport
      gsap.fromTo(
        '.tracer-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      // Kartu statistik reveal
      gsap.fromTo(
        '.tracer-card-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="tracer-study"
      className="relative py-28 bg-white text-slate-900 overflow-hidden border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200/80">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <SectionTag number="04" label="Transparansi & Mutu" />
              <DummyBadge label="Data contoh tracer" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-navy-950 leading-tight">
              Laporan Ketercapaian Alumni Universitas Pelita Bangsa
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Data agregat penelusuran lulusan yang diolah untuk evaluasi kurikulum, akreditasi
              program studi, dan pertanggungjawaban publik yang aman privasi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <MagneticButton
              size="md"
              variant="primary"
              onClick={() => setModalOpen(true)}
            >
              <span>Isi Kuesioner Tracer</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Content Layout: Kiri Bar Chart Sektor (7 Cols), Kanan Status Lulusan (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
          {/* Sisi Kiri: Distribusi Sektor Industri (7 Cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-navy-950/10 shadow-[0_4px_25px_rgba(11,31,75,0.04)] space-y-8 tracer-card-reveal">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
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

            <div className="space-y-6">
              {mockTracerStats.distribusi_sektor.map((sektor, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                    <span className="text-slate-800">{sektor.nama}</span>
                    <span className="font-mono font-bold text-navy-950 tabular-nums">
                      {sektor.persentase}%
                    </span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="tracer-bar-fill h-full rounded-full bg-gradient-to-r from-blue-600 to-[#2F6BFF] origin-left"
                      style={{ width: `${sektor.persentase}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Basis Responden: {mockTracerStats.total_responden} Lulusan</span>
              <span className="inline-flex items-center gap-1 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Agregat Publik Aman Privasi
              </span>
            </div>
          </div>

          {/* Sisi Kanan: Status Lulusan & Metrik Cepat (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Kartu Status Lulusan */}
            <div className="p-8 rounded-3xl bg-white border border-navy-950/10 shadow-[0_4px_25px_rgba(11,31,75,0.04)] space-y-6 tracer-card-reveal">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block">
                  STATUS 6 BULAN PASCA KELULUSAN
                </span>
                <h4 className="font-serif text-xl font-bold text-navy-950 mt-1">
                  Aktivitas Utama Alumni
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-serif text-3xl font-bold text-navy-950 tabular-nums block">
                    {mockTracerStats.persentase_bekerja}%
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                    Bekerja Profesional
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-serif text-3xl font-bold text-navy-950 tabular-nums block">
                    {mockTracerStats.persentase_wirausaha}%
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                    Wirausaha Mandiri
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-serif text-3xl font-bold text-navy-950 tabular-nums block">
                    {mockTracerStats.persentase_studi_lanjut}%
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                    Studi Lanjut S2
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-serif text-3xl font-bold text-navy-950 tabular-nums block">
                    {mockTracerStats.persentase_mencari_kerja}%
                  </span>
                  <span className="text-xs font-sans font-medium text-slate-600 mt-1 block">
                    Masa Transisi
                  </span>
                </div>
              </div>
            </div>

            {/* Kartu Relevansi Kurikulum */}
            <div className="p-8 rounded-3xl bg-navy-950 text-white space-y-4 tracer-card-reveal relative overflow-hidden shadow-xl border border-navy-900">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-widest text-blue-300 block">
                RELEVANSI PENDIDIKAN
              </span>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white tabular-nums">
                  {mockTracerStats.kesesuaian_bidang_persen}%
                </span>
                <span className="text-xs text-blue-200 font-sans">
                  Kesesuaian kurikulum program studi dengan tugas kerja nyata
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-2 border-t border-white/10">
                Data dihimpun berkala melalui modul tracer study terpadu Dirmawa UPB dan dilaporkan
                ke pangkalan data pendidikan tinggi.
              </p>
            </div>
          </div>
        </div>
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
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 block mb-1">
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
              pada periode evaluasi transisi kerja (6–12 bulan pasca kelulusan) menggunakan NIM resmi.
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-navy-950 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Kerahasiaan Data Terjamin</span>
              </div>
              <p className="text-slate-600">
                Setiap data responden diproses secara terenkripsi dan hanya disajikan dalam bentuk agregat
                statistik publik sesuai standar privasi institusi.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
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
