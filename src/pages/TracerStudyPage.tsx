import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Award,
  ChevronRight,
  Info,
  Lock,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { SectionTag } from '../components/ui/SectionTag';
import { DummyBadge } from '../components/ui/DummyBadge';

export const TracerStudyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kuesioner' | 'panduan' | 'faq'>('kuesioner');
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [tahunLulus, setTahunLulus] = useState('');
  const [prodi, setProdi] = useState('');
  const [statusKarier, setStatusKarier] = useState<'bekerja' | 'wirausaha' | 'studi' | 'mencari' | ''>('');
  const [simulasiSubmitted, setSimulasiSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Tracer Study Alumni · CDC Universitas Pelita Bangsa';
  }, []);

  const handleSimulasiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulasiSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#071E4A] font-sans selection:bg-[#0C4A9E] selection:text-white">
      {/* Header & Navigasi */}
      <Navbar />

      <main className="pt-28 sm:pt-36 pb-24">
        {/* 1. Header Hero Page Tracer Study */}
        <section className="relative overflow-hidden border-b border-[#E0EDFD] pb-16 sm:pb-20">
          {/* Ambient Lighting Biru & Cyan */}
          <div className="absolute top-10 right-1/4 w-[500px] h-[350px] bg-[#00A3E0]/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[300px] bg-[#0C4A9E]/10 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Sederhana */}
            <div className="flex items-center gap-2 text-xs font-sans text-slate-500 mb-6">
              <a href="/" className="hover:text-[#0C4A9E] transition-colors">
                Beranda
              </a>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#0C4A9E] font-semibold">Tracer Study</span>
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wide uppercase bg-white text-[#071E4A] border border-[#BAE6FD] shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] animate-pulse" />
                  Survei Resmi Kemdikbudristek & PDDikti
                </span>
                <DummyBadge label="Template Halaman Baru" />
              </div>

              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071E4A] leading-[1.08]">
                Tracer Study Alumni Universitas Pelita Bangsa
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Instrumen resmi penelusuran rekam jejak lulusan untuk mengukur masa tunggu kerja,
                relevansi kompetensi kurikulum, dan capaian karier alumni di kawasan industri serta
                korporasi nasional.
              </p>

              {/* Strip Informasi Singkat Periode & Privasi */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E0EDFD] shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0C4A9E] shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                      PERIODE AKTIF
                    </span>
                    <span className="text-xs font-bold text-[#071E4A]">
                      Tahun Lulusan 2021 - 2024
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E0EDFD] shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#00A3E0] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                      KERAHASIAAN DATA
                    </span>
                    <span className="text-xs font-bold text-[#071E4A]">
                      Sesuai UU No. 27/2022 (PDP)
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E0EDFD] shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0C4A9E] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                      MUTU AKREDITASI
                    </span>
                    <span className="text-xs font-bold text-[#071E4A]">
                      Indikator Kinerja Utama (IKU 1)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Tab Menu Navigasi Template Halaman */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex border-b border-[#E0EDFD] gap-8">
            <button
              type="button"
              onClick={() => setActiveTab('kuesioner')}
              className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${
                activeTab === 'kuesioner'
                  ? 'text-[#0C4A9E] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0C4A9E]'
                  : 'text-slate-500 hover:text-[#071E4A]'
              }`}
            >
              Formulir Kuesioner (Template)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('panduan')}
              className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${
                activeTab === 'panduan'
                  ? 'text-[#0C4A9E] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0C4A9E]'
                  : 'text-slate-500 hover:text-[#071E4A]'
              }`}
            >
              Alur & Panduan Pengisian
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`pb-4 text-sm font-semibold tracking-wide transition-colors relative ${
                activeTab === 'faq'
                  ? 'text-[#0C4A9E] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#0C4A9E]'
                  : 'text-slate-500 hover:text-[#071E4A]'
              }`}
            >
              Pusat Bantuan & FAQ
            </button>
          </div>
        </section>

        {/* 3. Konten Utama Berdasarkan Tab */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {activeTab === 'kuesioner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Kolom Kiri: Template Formulir Kuesioner (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Banner Pengingat Template */}
                <div className="p-4 rounded-2xl bg-[#E0F2FE] border border-[#BAE6FD] flex items-start gap-3 text-xs text-[#071E4A]">
                  <Info className="w-5 h-5 text-[#0C4A9E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm mb-0.5 text-[#0C4A9E]">
                      Template Halaman Kuesioner Siap Dikonfigurasi
                    </span>
                    <span>
                      Struktur formulir ini telah disiapkan untuk integrasi dengan form kuesioner resmi
                      Tracer Study UPB atau tautan PDDikti Kemdikbudristek.
                    </span>
                  </div>
                </div>

                {/* Kartu Formulir Template */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0EDFD] shadow-[0_10px_35px_rgba(12,74,158,0.04)] space-y-8">
                  {/* Stepper Indikator Formulir */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6 text-xs">
                    <div className="flex items-center gap-2 text-[#0C4A9E] font-bold">
                      <span className="w-6 h-6 rounded-full bg-[#0C4A9E] text-white flex items-center justify-center text-[11px]">
                        1
                      </span>
                      <span>Biodata Alumni</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[11px]">
                        2
                      </span>
                      <span className="hidden sm:inline">Status Karier</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[11px]">
                        3
                      </span>
                      <span className="hidden sm:inline">Relevansi Studi</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[11px]">
                        4
                      </span>
                      <span className="hidden sm:inline">Evaluasi Kampus</span>
                    </div>
                  </div>

                  {simulasiSubmitted ? (
                    <div className="p-8 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD] text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-sans text-xl font-bold text-[#071E4A]">
                          Simulasi Verifikasi Berhasil
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                          Data alumni terdaftar. Anda dapat melanjutkan ke instrumen kuesioner utama Tracer Study UPB.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSimulasiSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-white border border-[#BAE6FD] text-xs font-semibold text-[#0C4A9E] hover:bg-[#E0F2FE] transition-colors"
                      >
                        Reset Form Simulasi
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSimulasiSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="nim" className="text-xs font-semibold text-slate-700 block">
                            Nomor Induk Mahasiswa (NIM)
                          </label>
                          <input
                            id="nim"
                            type="text"
                            required
                            value={nim}
                            onChange={(e) => setNim(e.target.value)}
                            placeholder="Contoh: 312010001"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] bg-white text-sm text-[#071E4A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="nama" className="text-xs font-semibold text-slate-700 block">
                            Nama Lengkap Alumni
                          </label>
                          <input
                            id="nama"
                            type="text"
                            required
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            placeholder="Sesuai ijazah resmi"
                            className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] bg-white text-sm text-[#071E4A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="prodi" className="text-xs font-semibold text-slate-700 block">
                            Program Studi
                          </label>
                          <select
                            id="prodi"
                            required
                            value={prodi}
                            onChange={(e) => setProdi(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] bg-white text-sm text-[#071E4A] focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                          >
                            <option value="">Pilih Program Studi</option>
                            <option value="ti">Teknik Informatika</option>
                            <option value="tm">Teknik Mesin</option>
                            <option value="ts">Teknik Sipil</option>
                            <option value="mnj">Manajemen</option>
                            <option value="akt">Akuntansi</option>
                            <option value="hk">Ilmu Hukum</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="tahun-lulus" className="text-xs font-semibold text-slate-700 block">
                            Tahun Kelulusan
                          </label>
                          <select
                            id="tahun-lulus"
                            required
                            value={tahunLulus}
                            onChange={(e) => setTahunLulus(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] bg-white text-sm text-[#071E4A] focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                          >
                            <option value="">Pilih Tahun Lulus</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                          </select>
                        </div>
                      </div>

                      {/* Status Karier Utama */}
                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Status Utama Anda Saat Ini
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'bekerja', label: 'Bekerja (Full Time / Part Time)', desc: 'Di perusahaan, instansi, atau lembaga' },
                            { id: 'wirausaha', label: 'Wiraswasta / Enterpreneur', desc: 'Memiliki usaha mandiri atau kemitraan' },
                            { id: 'studi', label: 'Melanjutkan Studi (S2 / Profesi)', desc: 'Sedang menempuh pendidikan lanjut' },
                            { id: 'mencari', label: 'Sedang Mencari Pekerjaan', desc: 'Dalam masa transisi pencarian karier' },
                          ].map((item) => (
                            <div
                              key={item.id}
                              role="button"
                              tabIndex={0}
                              onClick={() => setStatusKarier(item.id as typeof statusKarier)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  setStatusKarier(item.id as typeof statusKarier);
                                }
                              }}
                              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                                statusKarier === item.id
                                  ? 'border-[#0C4A9E] bg-[#F0F7FF] ring-2 ring-[#00A3E0]/30'
                                  : 'border-[#E0EDFD] bg-white hover:border-[#BAE6FD] hover:bg-slate-50/50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs text-[#071E4A]">{item.label}</span>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    statusKarier === item.id
                                      ? 'border-[#0C4A9E] bg-[#0C4A9E]'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {statusKarier === item.id && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                              </div>
                              <span className="text-[11px] text-slate-500 mt-1 block font-sans">
                                {item.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Lock className="w-3.5 h-3.5 text-[#0C4A9E]" />
                          <span>Data tersimpan aman pada server UPB</span>
                        </div>

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] hover:from-[#093B80] hover:to-[#008FC5] text-white font-bold text-xs sm:text-sm tracking-wide transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20"
                        >
                          <span>Mulai Pengisian Kuesioner</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Kolom Kanan: Kartu Informasi & Panduan Singkat (4 Cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Kartu Manfaat Pengisian */}
                <div className="p-6 rounded-3xl bg-white border border-[#E0EDFD] shadow-[0_10px_30px_rgba(12,74,158,0.03)] space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center text-[#0C4A9E]">
                    <Sparkles className="w-5 h-5 text-[#00A3E0]" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-[#071E4A]">
                      Mengapa Tracer Study Penting?
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Partisipasi Anda memberikan dampak langsung bagi kemajuan kampus:
                    </p>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Mendukung nilai akreditasi institusi & program studi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Evaluasi relevansi kurikulum dengan industri Cikarang.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                      <span>Memperluas jejaring karier bagi adik tingkat Anda.</span>
                    </li>
                  </ul>
                </div>

                {/* Kartu Tautan Portal Kemdikbudristek */}
                <div className="p-6 rounded-3xl bg-[#071E4A] text-white space-y-4 border border-[#0C4A9E]/40 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
                    <span className="text-xs font-sans uppercase tracking-wider text-[#38BDF8] font-bold">
                      PORTAL NASIONAL
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-bold text-white">
                      Tracer Study Kemdikbudristek
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Lulusan juga dapat memverifikasi pengisian data melalui platform penelusuran nasional.
                    </p>
                  </div>
                  <a
                    href="https://tracerstudy.kemdikbud.go.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#071E4A] hover:bg-[#F0F7FF] text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>Buka Portal Kemdikbud</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0C4A9E]" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'panduan' && (
            <div className="max-w-4xl space-y-8">
              <div className="space-y-2">
                <SectionTag label="Tata Cara Partisipasi" />
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#071E4A]">
                  4 Tahapan Pengisian Tracer Study UPB
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  Ikuti langkah-langkah mudah di bawah ini untuk menyelesaikan survei pelacakan lulusan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  {
                    step: 'Tahap 1',
                    title: 'Autentikasi NIM & Data Diri',
                    desc: 'Masukkan NIM resmi dan data identitas kelulusan untuk memastikan data terverifikasi pada pangkalan PDDikti.',
                  },
                  {
                    step: 'Tahap 2',
                    title: 'Status Karier & Pekerjaan',
                    desc: 'Pilih status Anda saat ini, nama instansi/perusahaan, posisi jabatan, serta estimasi masa tunggu setelah lulus.',
                  },
                  {
                    step: 'Tahap 3',
                    title: 'Kesesuaian Ilmu & Kompetensi',
                    desc: 'Berikan evaluasi terhadap relevansi mata kuliah yang dipelajari selama kuliah dengan tugas pekerjaan di industri.',
                  },
                  {
                    step: 'Tahap 4',
                    title: 'Umpan Balik & Konfirmasi',
                    desc: 'Kirimkan kuesioner dan dapatkan konfirmasi bukti partisipasi resmi dari Career Development Center UPB.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="p-6 rounded-3xl bg-white border border-[#E0EDFD] shadow-[0_4px_20px_rgba(12,74,158,0.03)] space-y-3"
                  >
                    <span className="text-xs font-sans font-bold text-[#0C4A9E] bg-[#E0F2FE] px-2.5 py-1 rounded-md inline-block">
                      {item.step}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-[#071E4A]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="max-w-3xl space-y-6">
              <div className="space-y-2">
                <SectionTag label="Pertanyaan Sering Diajukan" />
                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#071E4A]">
                  Pusat Bantuan Tracer Study
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: 'Siapa saja yang wajib mengisi Tracer Study UPB?',
                    a: 'Alumni jenjang Sarjana (S1) dan Diploma yang telah menyelesaikan studi, terutama angkatan lulus 1 hingga 3 tahun terakhir.',
                  },
                  {
                    q: 'Apakah data penghasilan dan perusahaan saya aman?',
                    a: 'Ya, seluruh data yang Anda masukkan dilindungi dengan enkripsi dan hanya digunakan sebagai agregat statistik laporan akreditasi institusi.',
                  },
                  {
                    q: 'Bagaimana jika NIM saya tidak terdeteksi di sistem?',
                    a: 'Silakan hubungi helpdesk CDC UPB melalui WhatsApp atau email resmi cdc@pelitabangsa.ac.id untuk sinkronisasi data PDDikti.',
                  },
                  {
                    q: 'Berapa lama waktu yang dibutuhkan untuk mengisi survei?',
                    a: 'Pengisian kuesioner hanya memerlukan waktu sekitar 5 hingga 7 menit.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E0EDFD] shadow-2xs space-y-2"
                  >
                    <h3 className="font-sans font-bold text-sm sm:text-base text-[#071E4A] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#00A3E0] shrink-0" />
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed font-sans">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer Resmi */}
      <Footer />
    </div>
  );
};
