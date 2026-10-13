import React, { useState, useEffect } from 'react';
import { mockAlumniStories } from '../../data/mockStories';
import { DummyBadge } from '../ui/DummyBadge';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const AlumniStoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = mockAlumniStories[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mockAlumniStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mockAlumniStories.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation untuk carousel (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="cerita-alumni"
      className="relative py-24 sm:py-32 bg-[#FAF9F5] text-slate-900 overflow-hidden border-b border-[#E8E5DD]"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Ribbon Pill Ala Gusto (Screenshot 3) */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#E8F5E9] text-[#1B5E20] border border-[#C8E6C9] font-medium text-xs sm:text-sm shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-sans font-bold">Karier Alumni</span>
            <span className="text-slate-400">·</span>
            <span>Dari Kampus Pelita Bangsa Menembus Panggung Profesional</span>
          </div>
        </div>

        {/* 2. Dua Kolom Layout Interaktif Ala Gusto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Kolom Kiri: Teks Kutipan, Indikator & Kontrol (6 Kolom Desktop) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Indeks Counter & Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                {String(currentIndex + 1).padStart(2, '0')} / {String(mockAlumniStories.length).padStart(2, '0')}
              </span>
              <DummyBadge label="Data contoh alumni" />
            </div>

            {/* Headline Editorial Besar */}
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-navy-950 tracking-tight leading-[1.08]">
              {current.headline || 'Membuka Peluang Karier Unggul di Dunia Industri'}
            </h2>

            {/* Kutipan Pengalaman Alumni */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
              "{current.kutipan}"
            </p>

            {/* Identitas Alumni & Link Profil */}
            <div className="pt-2 border-t border-[#E8E5DD] space-y-1">
              <span className="font-sans font-bold text-navy-950 text-base sm:text-lg block">
                {current.nama}
              </span>
              <span className="text-xs sm:text-sm font-mono text-slate-500 block">
                {current.jabatan} di {current.perusahaan}
              </span>
              <span className="text-xs font-mono text-emerald-700 font-semibold block pt-0.5">
                {current.prodi} · {current.angkatan}
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#tracer-study"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 hover:text-emerald-700 transition-colors group"
              >
                <span>Pelajari rekam jejak lulusan lainnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Pagination Dots & Navigation Buttons Ala Gusto */}
            <div className="pt-6 border-t border-[#E8E5DD] flex items-center justify-between gap-6">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {mockAlumniStories.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Buka cerita alumni ke ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx
                        ? 'w-8 bg-navy-950'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Tombol Bulat Navigasi Kiri & Kanan */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-slate-300 hover:border-navy-950 hover:bg-navy-950 hover:text-white flex items-center justify-center text-slate-800 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
                  aria-label="Cerita alumni sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-slate-300 hover:border-navy-950 hover:bg-navy-950 hover:text-white flex items-center justify-center text-slate-800 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
                  aria-label="Cerita alumni berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Kartu Profil Mengambang & Ilustrasi Ala Gusto (6 Kolom Desktop) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-white border border-[#E8E5DD] p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col justify-between min-h-[460px]">
              {/* Kartu Status Mengambang (Persis Screenshot 3 Gusto) */}
              <div className="relative z-20 max-w-[280px] sm:max-w-xs p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/90 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={current.avatar_url || '/images/alumni_engineer.jpg'}
                    alt={current.nama}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-navy-950 block truncate">
                      {current.nama}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block truncate">
                      {current.perusahaan}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                    {current.metric_label || 'WAKTU TUNGGU KERJA'}
                  </span>
                  <span className="font-serif text-2xl font-bold text-navy-950 block">
                    {current.metric || '1.5 Bulan'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium pt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Terverifikasi Kurasi CDC</span>
                  </div>
                </div>
              </div>

              {/* Ilustrasi Karakter & Shadow Ellipse Ala Gusto */}
              <div className="relative mt-2 sm:mt-4 flex flex-col items-center justify-center">
                <img
                  src="/images/alumni_illustration.jpg"
                  alt="Ilustrasi keberhasilan alumni UPB"
                  className="w-full max-w-[340px] sm:max-w-[400px] object-contain rounded-2xl transition-transform duration-500 hover:scale-102"
                />
                {/* Subtle soft ground shadow ellipse */}
                <div className="w-3/4 h-4 bg-slate-300/40 rounded-full blur-xs mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
