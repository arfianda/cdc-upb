import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Building2, Clock, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { cdcApi } from '../../lib/api';
import type { CdcJobPosting } from '../../types/database';
import { SectionTag } from '../ui/SectionTag';
import { DummyBadge } from '../ui/DummyBadge';
import { MagneticButton } from '../ui/MagneticButton';

export const FeaturedJobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<CdcJobPosting[]>([]);
  const [selectedBidang, setSelectedBidang] = useState<string>('Semua');
  const [selectedJobForModal, setSelectedJobForModal] = useState<CdcJobPosting | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    cdcApi.getPublishedJobs().then((data) => {
      setJobs(data);
    });
  }, []);

  const bidangList = ['Semua', 'Supply Chain & Manufaktur', 'Otomasi & Rekayasa Teknik', 'Perbankan & Analisis Data'];

  const filteredJobs =
    selectedBidang === 'Semua'
      ? jobs
      : jobs.filter((j) => j.bidang === selectedBidang);

  const featuredJob = filteredJobs[0] || jobs[0];
  const secondaryJobs = filteredJobs.slice(1, 3);

  useEffect(() => {
    if (jobs.length === 0) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.job-card-batch', {
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            { opacity: 0, y: 35, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out',
            }
          );
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [jobs, selectedBidang]);

  return (
    <section
      ref={containerRef}
      id="lowongan"
      className="relative py-28 bg-[#F8FAFC] text-slate-900 overflow-hidden border-b border-[#E0EDFD]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Asymmetric Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E0EDFD]">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <SectionTag label="Peluang Karier Unggulan" />
              <DummyBadge label="Data contoh lowongan" />
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071E4A] leading-tight">
              Kurasi Posisi Terverifikasi Minggu Ini
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Setiap lowongan telah divalidasi oleh tim Career Development Center UPB bersama
              departemen HRD mitra resmi di kawasan industri Jabodetabek.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              size="md"
              variant="outline"
              href="#tracer-study"
            >
              <span>Tracer Study Lulusan</span>
              <ChevronRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>

        {/* Filter Chips Sederhana */}
        <div className="py-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-sans uppercase tracking-wider text-[#0C4A9E] font-bold mr-2">
            Filter Bidang:
          </span>
          {bidangList.map((bidang) => (
            <button
              key={bidang}
              type="button"
              onClick={() => setSelectedBidang(bidang)}
              className={`px-4 py-2 rounded-full text-xs font-medium font-sans transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] ${
                selectedBidang === bidang
                  ? 'bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-[#BAE6FD] hover:border-[#0C4A9E] hover:bg-[#F0F7FF]'
              }`}
            >
              {bidang}
            </button>
          ))}
        </div>

        {/* Asymmetric Grid Layout (1 Big Highlight Card + 2 Stacked Cards) */}
        {featuredJob && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Kartu Utama Lebar (7 Cols) */}
            <div className="lg:col-span-7 job-card-batch">
              <div className="group relative p-8 sm:p-10 rounded-2xl bg-white border border-[#E0EDFD] hover:border-[#00A3E0] shadow-[0_4px_20px_rgba(12,74,158,0.04)] hover:shadow-[0_25px_45px_-12px_rgba(12,74,158,0.12)] transition-all duration-300 hover:-translate-y-1">
                {/* Header Kartu */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E0F2FE] text-[#0C4A9E] border border-[#BAE6FD]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E0]" />
                        Mitra Prioritas
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium text-slate-600 bg-slate-100">
                        {featuredJob.tipe}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#071E4A] group-hover:text-[#0C4A9E] transition-colors pt-2">
                      {featuredJob.judul}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>{featuredJob.company_name}</span>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center font-sans font-black text-[#0C4A9E] text-lg shrink-0">
                    {featuredJob.company_name.charAt(3) || 'P'}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-sans">
                  {featuredJob.deskripsi}
                </p>

                {/* Persyaratan Highlight */}
                {featuredJob.persyaratan && (
                  <div className="mb-6 p-4 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD]/80">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#0C4A9E] block mb-2">
                      Kualifikasi Kunci:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {featuredJob.persyaratan.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Footer Kartu & Meta */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{featuredJob.lokasi}</span>
                    </div>
                    <div className="text-sm font-bold text-[#071E4A] font-sans">
                      {featuredJob.gaji_display}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedJobForModal(featuredJob)}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#071E4A] bg-[#F0F7FF] hover:bg-[#E0F2FE] border border-[#BAE6FD] transition-colors"
                    >
                      Kriteria Lengkap
                    </button>
                    {featuredJob.tautan_lamaran && (
                      <a
                        href={featuredJob.tautan_lamaran}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] hover:from-[#093B80] hover:to-[#008FC5] transition-all inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                      >
                        <span>Lamar Posisi</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: 2 Kartu Sekunder Bertingkat (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {secondaryJobs.map((job) => (
                <div
                  key={job.id}
                  className="job-card-batch group p-6 sm:p-7 rounded-2xl bg-white border border-[#E0EDFD] hover:border-[#00A3E0] shadow-[0_4px_15px_rgba(12,74,158,0.03)] hover:shadow-[0_15px_30px_-8px_rgba(12,74,158,0.08)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium text-slate-600 bg-slate-100">
                        {job.tipe}
                      </span>
                      <span className="text-xs text-[#00A3E0] font-semibold">
                        {job.bidang}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-sans">
                      <Clock className="w-3 h-3" />
                      <span>Segera</span>
                    </div>
                  </div>

                  <h4 className="font-sans text-xl font-bold tracking-tight text-[#071E4A] group-hover:text-[#0C4A9E] transition-colors mb-1">
                    {job.judul}
                  </h4>
                  <p className="text-xs font-medium text-slate-600 mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.company_name}</span>
                  </p>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed font-sans">
                    {job.deskripsi}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-sans font-bold text-[#071E4A]">
                      {job.gaji_display}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedJobForModal(job)}
                      className="inline-flex items-center gap-1 text-[#0C4A9E] hover:text-[#00A3E0] font-semibold group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Lihat Rincian</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail Lowongan Interaktif (R-26 & R-32 Keyboard Accessible) */}
      {selectedJobForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedJobForModal(null)}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-white text-navy-950 shadow-2xl border border-navy-950/10 space-y-6 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-sans font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                  {selectedJobForModal.tipe} · {selectedJobForModal.bidang}
                </span>
                <h3 className="font-sans text-2xl font-bold tracking-tight text-navy-950">
                  {selectedJobForModal.judul}
                </h3>
                <p className="text-sm font-medium text-slate-600 flex items-center gap-1.5 mt-1">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{selectedJobForModal.company_name}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobForModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-navy-950 transition-colors"
                aria-label="Tutup detail lowongan"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div>
                <h5 className="font-semibold text-navy-950 mb-1">Deskripsi Tanggung Jawab</h5>
                <p className="leading-relaxed">{selectedJobForModal.deskripsi}</p>
              </div>

              {selectedJobForModal.persyaratan && (
                <div>
                  <h5 className="font-semibold text-navy-950 mb-1">Persyaratan Pelamar</h5>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {selectedJobForModal.persyaratan.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block font-sans">Lokasi Penempatan</span>
                  <span className="font-semibold text-navy-950 font-sans">{selectedJobForModal.lokasi}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-sans">Estimasi Kompensasi</span>
                  <span className="font-bold text-navy-950 font-sans">{selectedJobForModal.gaji_display}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedJobForModal(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Tutup
              </button>
              {selectedJobForModal.tautan_lamaran && (
                <a
                  href={selectedJobForModal.tautan_lamaran}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-navy-950 hover:bg-navy-900 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>Kirim Berkas Lamaran</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
