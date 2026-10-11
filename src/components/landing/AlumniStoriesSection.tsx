import React, { useState } from 'react';
import { mockAlumniStories } from '../../data/mockStories';
import { SectionTag } from '../ui/SectionTag';
import { DummyBadge } from '../ui/DummyBadge';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const AlumniStoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = mockAlumniStories[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mockAlumniStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mockAlumniStories.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="cerita-alumni"
      className="relative py-28 bg-navy-950 text-white overflow-hidden border-t border-white/10"
    >
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Band */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-3">
            <SectionTag number="05" label="Rekam Jejak Lulusan" />
            <DummyBadge label="Data contoh alumni" />
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
            Kisah Nyata Perjalanan Karier Alumni UPB
          </span>
        </div>

        {/* Editorial Split Quote Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Kolom Visual Foto Duotone (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-navy-900 border border-white/15 p-6 flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-transparent z-10" />

              {/* Graphic Silhouette / Monogram */}
              <div className="relative z-20 flex justify-between items-start">
                <span className="font-mono text-xs text-blue-300 font-semibold tracking-widest uppercase">
                  PROFIL {currentIndex + 1} DARI {mockAlumniStories.length}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/20">
                  GANTI FOTO ASLI
                </span>
              </div>

              <div className="relative z-20 space-y-2">
                <span className="font-serif italic text-4xl text-blue-400 block font-bold">
                  {current.nama.charAt(0)}
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">
                  {current.nama}
                </h4>
                <p className="text-xs font-mono text-slate-300">
                  {current.prodi} · {current.angkatan}
                </p>
                <p className="text-xs font-sans text-blue-300 font-medium pt-1">
                  {current.jabatan} di {current.perusahaan}
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kutipan Utama (8 Cols) */}
          <div className="lg:col-span-8 lg:pl-6 space-y-8">
            <Quote className="w-12 h-12 text-blue-500/40" />

            <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-slate-100 font-normal leading-relaxed tracking-tight">
              "{current.kutipan}"
            </blockquote>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-sans font-semibold text-white text-base block">
                  {current.nama}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {current.jabatan} · {current.perusahaan}
                </span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Kutipan alumni sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10 flex items-center justify-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label="Kutipan alumni berikutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
