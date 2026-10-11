import React, { useState } from 'react';
import { ArrowUpRight, BarChart3, ShieldCheck, PieChart, Users } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DummyBadge } from '../components/ui/DummyBadge';
import { MagneticButton } from '../components/ui/MagneticButton';
import { mockTracerStats } from '../data/mockTracer';

export const HeroVariantB: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'sektor'>('status');

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans selection:bg-[#2F6BFF] selection:text-white">
      <Navbar />

      {/* Hero Section Varian B: Prinsip Deep Navy Prestige */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-white/10">
        {/* Background Grain & Ambient Haze */}
        <div className="absolute inset-0 bg-grain opacity-35 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Tag Penanda Varian untuk Pengujian */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-mono">
            <span className="font-bold">VARIAN B</span>
            <span>·</span>
            <span>Prinsip Deep Navy Prestige (Karakter Institusional Kampus)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Kolom Kiri: 6 Cols (Tipografi Raksasa & Satu Aksi Utama) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pill Badge Status */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#2F6BFF] animate-pulse" />
                <span>Pusat Karier & Tracer Study · Universitas Pelita Bangsa</span>
              </div>

              {/* Satu Headline Konkret Raksasa */}
              <div className="space-y-1">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-[66px] font-bold text-white leading-[1.04] tracking-[-0.025em]">
                  Akses langsung loker terkurasi dan
                </h1>
                <h1 className="font-serif italic text-4xl sm:text-6xl lg:text-[66px] font-bold text-blue-300 leading-[1.04] tracking-[-0.025em]">
                  pelacakan tracer study.
                </h1>
              </div>

              {/* Subjudul Tenang & Jujur Tanpa Kata Klise */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-sans">
                Portal resmi penjaringan talenta lulusan akademik UPB untuk menjamin ketercapaian
                kompetensi kerja di kawasan industri Cikarang dan akreditasi perguruan tinggi.
              </p>

              {/* Satu Aksi Utama */}
              <div className="pt-2 space-y-4 max-w-lg">
                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton
                    size="lg"
                    variant="primary"
                    href="#lowongan"
                    className="shadow-[0_10px_30px_rgba(47,107,255,0.4)]"
                  >
                    <span>Jelajahi Lowongan Kerja</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>

                  <a
                    href="#tracer-study"
                    className="text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4 transition-colors"
                  >
                    Buka Hasil Tracer Study
                  </a>
                </div>

                {/* Micro-Trust Line */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pl-1">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Terintegrasi pangkalan data alumni Dirmawa UPB · Privasi terlindungi</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 6 Cols (Komponen Visual Fungsional: Live Career Console) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[28px] bg-navy-900 border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(2,8,26,0.8)] overflow-hidden space-y-6">
                {/* Header Konsol Visual */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                      UPB
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        Console Mutu & Keterserapan
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Audit Data Tracer 2024
                      </span>
                    </div>
                  </div>

                  <DummyBadge label="Data contoh tracer" />
                </div>

                {/* Tab Switcher Interaktif di Dalam Komponen */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-navy-950 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('status')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'status'
                        ? 'bg-[#2F6BFF] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Status Lulusan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('sektor')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === 'sektor'
                        ? 'bg-[#2F6BFF] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <PieChart className="w-3.5 h-3.5" />
                    <span>Sektor Industri</span>
                  </button>
                </div>

                {/* Panel Konten Interaktif Fungsional */}
                {activeTab === 'status' ? (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-2xl font-bold font-serif text-white tabular-nums block">
                          {mockTracerStats.persentase_bekerja}%
                        </span>
                        <span className="text-xs text-slate-300 mt-0.5 block">
                          Bekerja Profesional
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-2xl font-bold font-serif text-white tabular-nums block">
                          {mockTracerStats.persentase_wirausaha}%
                        </span>
                        <span className="text-xs text-slate-300 mt-0.5 block">
                          Wirausaha Mandiri
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-2xl font-bold font-serif text-white tabular-nums block">
                          {mockTracerStats.persentase_studi_lanjut}%
                        </span>
                        <span className="text-xs text-slate-300 mt-0.5 block">
                          Studi Lanjut S2
                        </span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                        <span className="text-2xl font-bold font-serif text-white tabular-nums block">
                          {mockTracerStats.persentase_mencari_kerja}%
                        </span>
                        <span className="text-xs text-slate-300 mt-0.5 block">
                          Masa Transisi
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Rata-rata waktu tunggu kerja:</span>
                      <span className="font-bold text-blue-300 font-mono">
                        {mockTracerStats.rata_masa_tunggu_bulan} Bulan
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    {mockTracerStats.distribusi_sektor.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 truncate max-w-[200px]">{item.nama}</span>
                          <span className="font-mono font-bold text-white tabular-nums">{item.persentase}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-navy-950 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#2F6BFF]"
                            style={{ width: `${item.persentase}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3 Floating Glass Badges Navy Mengambang */}
                <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy-950/90 backdrop-blur-md border border-white/20 shadow-xl text-xs font-medium text-white">
                  <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Kesesuaian studi: {mockTracerStats.kesesuaian_bidang_persen}%</span>
                </div>

                <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy-950/90 backdrop-blur-md border border-white/20 shadow-xl text-xs font-medium text-white">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span>Responden: {mockTracerStats.total_responden} Lulusan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
