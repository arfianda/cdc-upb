import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { SectionTag } from '../ui/SectionTag';

export const EmployerCtaBanner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailPic, setEmailPic] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setNamaPerusahaan('');
      setEmailPic('');
    }, 2500);
  };

  return (
    <section className="relative py-28 bg-[#F7F8FB] text-navy-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-navy-950 text-white p-10 sm:p-16 lg:p-20 overflow-hidden shadow-[0_25px_60px_rgba(4,11,31,0.3)] border border-navy-900">
          {/* Radial Ambient Accent */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-8">
            <SectionTag number="06" label="Kemitraan Industri" />

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Bermitra dengan CDC UPB untuk Menjaring Talenta Siap Kerja
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
              Publikasikan lowongan kerja terverifikasi, selenggarakan agenda rekrutmen khusus di kampus,
              dan jangkau ribuan mahasiswa tingkat akhir serta alumni potensial di kawasan industri
              Cikarang dan sekitarnya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Verifikasi Legalitas Cepat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Publikasi Multi Kanal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Tanpa Biaya Layanan Dasar</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => setModalOpen(true)}
              >
                <span>Daftarkan Perusahaan Mitra</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>

              <MagneticButton
                size="lg"
                variant="secondary"
                href="#beranda"
              >
                <span>Pelajari Alur Rekrutmen</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Pendaftaran Kemitraan (R-26 & R-32 Keyboard Accessible) */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white text-navy-950 shadow-2xl border border-navy-950/10 space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 block mb-1">
                  KEMITRAAN INDUSTRI RESMI
                </span>
                <h3 className="font-serif text-2xl font-bold text-navy-950">
                  Formulir Kemitraan Rekrutmen
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                aria-label="Tutup form mitra"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto" />
                <h4 className="font-semibold text-base">Permohonan Kemitraan Diterima</h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Tim Career Development Center UPB akan menghubungi narahubung Anda untuk proses verifikasi legalitas perusahaan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lengkapi data narahubung perusahaan Anda untuk memulai proses verifikasi kemitraan penayangan lowongan kerja di CDC UPB.
                </p>

                <div className="space-y-1">
                  <label htmlFor="company-name" className="text-xs font-semibold text-slate-700 block">
                    Nama Badan Usaha / Perusahaan
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    required
                    value={namaPerusahaan}
                    onChange={(e) => setNamaPerusahaan(e.target.value)}
                    placeholder="Contoh: PT Manufaktur Indonesia"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="company-email" className="text-xs font-semibold text-slate-700 block">
                    Email Resmi HRD / Narahubung
                  </label>
                  <input
                    id="company-email"
                    type="email"
                    required
                    value={emailPic}
                    onChange={(e) => setEmailPic(e.target.value)}
                    placeholder="hrd@perusahaan.co.id"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Data legalitas dilindungi dan hanya diverifikasi internal staf CDC UPB.</span>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#2F6BFF] hover:bg-blue-600 text-white shadow-sm transition-colors"
                  >
                    Kirim Permohonan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
