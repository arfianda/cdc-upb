import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck, Award } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { scrollToElement } from '../../lib/lenis';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    scrollToElement(document.body, 0);
  };

  return (
    <footer className="relative bg-[#F8FAFC] text-slate-600 border-t border-slate-200/90 pt-20 pb-12 overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80">
          {/* Kolom 1: Brand & Misi (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-navy-950 border border-navy-900 flex items-center justify-center shadow-xs">
                <span className="font-serif italic font-bold text-xl text-white">C</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-navy-950 block">
                  CDC Pelita Bangsa
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.16em] text-slate-500">
                  Career Development Center
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-md font-sans">
              Pusat pengembangan karier terpadu Universitas Pelita Bangsa. Menjembatani talenta
              lulusan akademik dengan kebutuhan strategis kawasan industri Cikarang, Bekasi, dan
              ekosistem bisnis nasional.
            </p>

            {/* Placeholder Kepatuhan Hukum & Standar Akreditasi (Berlabel Jelas) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-amber-800 block font-semibold tracking-wider uppercase">
                    [STATUS KEBIJAKAN PRIVASI]
                  </span>
                  <span className="text-slate-600">
                    {siteConfig.legal.privacyNotice}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs">
                <Award className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] text-amber-800 block font-semibold tracking-wider uppercase">
                    [STATUS AKREDITASI KAMPUS]
                  </span>
                  <span className="text-slate-600">
                    {siteConfig.legal.accreditationNotice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom 2: Navigasi Layanan (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-navy-950 font-mono">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#lowongan" className="text-slate-600 hover:text-navy-950 transition-colors">
                  Lowongan Kerja
                </a>
              </li>
              <li>
                <a href="#tracer-study" className="text-slate-600 hover:text-navy-950 transition-colors">
                  Tracer Study UPB
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-slate-600 hover:text-navy-950 transition-colors">
                  Klinik CV & Portofolio
                </a>
              </li>
              <li>
                <a href="#cerita-alumni" className="text-slate-600 hover:text-navy-950 transition-colors">
                  Profil Alumni
                </a>
              </li>
              <li>
                <a href="#mitra-industri" className="text-slate-600 hover:text-navy-950 transition-colors">
                  Verifikasi Perusahaan
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Ekosistem Kampus (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-navy-950 font-mono">
              Ekosistem UPB
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-500">Portal Dirmawa UPB</span>
              </li>
              <li>
                <span className="text-slate-500">SIAKAD Pelita Bangsa</span>
              </li>
              <li>
                <span className="text-slate-500">Perpustakaan Digital</span>
              </li>
              <li>
                <span className="text-slate-500">LPPM UPB</span>
              </li>
              <li>
                <span className="text-slate-500">Ikatan Alumni (IKA UPB)</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Lokasi Kampus (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-navy-950 font-mono">
              Sekretariat CDC
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-navy-950 shrink-0 mt-1" />
                <span className="text-slate-600 leading-relaxed font-sans text-xs">
                  {siteConfig.contact.addressPlaceholder}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-navy-950 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-slate-600 hover:text-navy-950 transition-colors text-xs font-mono"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-navy-950 shrink-0" />
                <span className="text-slate-600 text-xs font-mono">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>{siteConfig.legal.copyright}</p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group flex items-center gap-2 text-slate-600 hover:text-white hover:bg-navy-950 hover:border-navy-950 transition-colors px-3.5 py-1.5 rounded-full border border-slate-200 bg-white shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
