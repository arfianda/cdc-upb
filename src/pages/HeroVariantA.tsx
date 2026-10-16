import React, { useState } from 'react';
import { ArrowRight, Search, ShieldCheck, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { DummyBadge } from '../components/ui/DummyBadge';
import { mockJobs } from '../data/mockJobs';

export const HeroVariantA: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Manufaktur' | 'IT' | 'Keuangan'>('Semua');
  const [selectedJobId, setSelectedJobId] = useState('job-001');

  // Filter jobs untuk komponen fungsional visual
  const filteredJobs = mockJobs.filter((j) => {
    const matchesSearch =
      searchTerm === '' ||
      j.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company_name.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Manufaktur') return j.bidang.includes('Manufaktur') || j.bidang.includes('Otomasi');
    if (activeCategory === 'IT') return j.bidang.includes('Teknologi') || j.bidang.includes('IoT');
    if (activeCategory === 'Keuangan') return j.bidang.includes('Perbankan') || j.bidang.includes('Data');
    return true;
  });

  const currentJob = mockJobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || mockJobs[0];

  return (
    <div className="min-h-screen bg-white text-[#1E2433] font-sans selection:bg-[#2F6BFF] selection:text-white">
      <Navbar />

      {/* Hero Section Varian A: Prinsip Clean White Focus dari Referensi */}
      <section className="relative pt-36 pb-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Tag Penanda Varian untuk Pengujian */}
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-sans font-semibold">
            <span className="font-bold">VARIAN A</span>
            <span>·</span>
            <span>Prinsip White Clean Focus (Gaya Referensi SquareDash)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Kolom Kiri: 5 Cols (Tipografi Raksasa & Satu Aksi Utama) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pill Badge Status */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Kurasi Lowongan Kerja Terverifikasi · Kampus Cikarang</span>
              </div>

              {/* Satu Headline Konkret Raksasa (Skala 72px, Leading 1.02, Tracking -0.03em) */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-[#111827] leading-[1.02] tracking-[-0.03em]">
                Temukan karier pertama di kawasan industri Cikarang.
              </h1>

              {/* Subjudul Tenang & Jujur Tanpa Kata Klise */}
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-xl">
                Jalur rekrutmen terverifikasi bagi mahasiswa dan alumni Universitas Pelita Bangsa bersama
                mitra industri terpercaya di kawasan Jababeka, MM2100, EJIP, dan GIIC.
              </p>

              {/* Satu Aksi Utama: Input Kapsul Pill dengan Tombol Lingkaran Terintegrasi */}
              <div className="pt-2 max-w-lg space-y-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const target = document.querySelector('#preview-detail');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative flex items-center"
                >
                  <div className="absolute left-4.5 text-slate-400">
                    <Search className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ketik posisi atau perusahaan impian..."
                    className="w-full h-14 pl-12 pr-14 rounded-full bg-[#F3F4F6] border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
                  />
                  <button
                    type="submit"
                    aria-label="Cari lowongan"
                    className="absolute right-2 w-10 h-10 rounded-full bg-[#2F6BFF] hover:bg-blue-600 text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Micro-Trust Line: Keterangan Jaminan Langsung di Bawah Input */}
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF] pl-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Khusus mahasiswa & alumni UPB · Validasi resmi CDC · Tanpa biaya</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 6 Cols (Komponen Fungsional Berbentuk Arsitektural Asimetris) */}
            <div className="lg:col-span-6 relative">
              {/* Komponen Visual Fungsional: Live Job Console Card */}
              <div className="relative rounded-[28px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-slate-200 p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden">
                {/* Header Konsol Visual */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-200/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2F6BFF] text-white flex items-center justify-center font-bold text-xs">
                      CDC
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-900 block">
                        Radar Lowongan Aktif
                      </span>
                      <span className="text-[10px] font-sans text-slate-500">
                        Sinkronisasi Terkurasi UPB
                      </span>
                    </div>
                  </div>

                  <DummyBadge label="Data contoh lowongan" />
                </div>

                {/* Filter Mini Fungsional di Dalam Komponen */}
                <div className="py-4 flex flex-wrap gap-1.5">
                  {(['Semua', 'Manufaktur', 'IT', 'Keuangan'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        activeCategory === cat
                          ? 'bg-[#1E293B] text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Kartu Lowongan Interaktif Aktif */}
                <div id="preview-detail" className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-blue-50 text-blue-700">
                          {currentJob.tipe}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {currentJob.bidang}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mt-1">
                        {currentJob.judul}
                      </h4>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{currentJob.company_name}</span>
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm shrink-0">
                      {currentJob.company_name.charAt(3) || 'P'}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {currentJob.deskripsi}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-sans font-bold text-slate-900">
                      {currentJob.gaji_display}
                    </span>
                    <a
                      href={currentJob.tautan_lamaran || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
                    >
                      <span>Lihat Syarat</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Daftar Selector Cepat Antar Lowongan Fungsional */}
                <div className="pt-4 space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block">
                    PILIH POSISI UNTUK MEMERIKSA RINCIAN:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredJobs.slice(0, 4).map((j) => (
                      <button
                        key={j.id}
                        type="button"
                        onClick={() => setSelectedJobId(j.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                          selectedJobId === j.id
                            ? 'bg-blue-50/80 border-blue-400 text-blue-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="truncate pr-2">{j.judul}</span>
                        {selectedJobId === j.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3 Floating Glass Badges (Sesuai Karakter Referensi SquareDash) */}
                <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs font-medium text-slate-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Kompensasi: {currentJob.gaji_display}</span>
                </div>

                <div className="absolute bottom-2 -left-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-md text-xs font-medium text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Lokasi: {currentJob.lokasi}</span>
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
