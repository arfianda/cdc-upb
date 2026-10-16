import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck, Award } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { scrollToElement } from '../../lib/lenis';

export const Footer: React.FC = () => {
  const handleBackToTop = () => {
    scrollToElement(document.body, 0);
  };

  return (
    <footer className="relative bg-[#F8FAFC] text-slate-600 border-t border-[#E0EDFD] pt-20 pb-12 overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E0EDFD]">
          {/* Kolom 1: Brand & Misi (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo_cdc_upb.png"
                alt="Logo Resmi CDC Pelita Bangsa"
                className="w-12 h-12 object-contain drop-shadow-xs"
              />
              <div>
                <span className="font-sans text-xl font-extrabold tracking-tight text-[#071E4A] block">
                  CDC Pelita Bangsa
                </span>
                <span className="text-xs font-sans uppercase tracking-wider text-[#0C4A9E]/80 font-bold">
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
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E0EDFD] shadow-2xs text-xs">
                <ShieldCheck className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-[10px] text-[#0C4A9E] block font-bold tracking-wider uppercase">
                    [STATUS KEBIJAKAN PRIVASI]
                  </span>
                  <span className="text-slate-600">
                    {siteConfig.legal.privacyNotice}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E0EDFD] shadow-2xs text-xs">
                <Award className="w-4 h-4 text-[#00A3E0] shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-[10px] text-[#0C4A9E] block font-bold tracking-wider uppercase">
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
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#071E4A] font-sans">
              Layanan Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#lowongan" className="text-slate-600 hover:text-[#0C4A9E] transition-colors">
                  Lowongan Kerja
                </a>
              </li>
              <li>
                <a href="#tracer-study" className="text-slate-600 hover:text-[#0C4A9E] transition-colors">
                  Tracer Study UPB
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-slate-600 hover:text-[#0C4A9E] transition-colors">
                  Klinik CV & Portofolio
                </a>
              </li>
              <li>
                <a href="#cerita-alumni" className="text-slate-600 hover:text-[#0C4A9E] transition-colors">
                  Profil Alumni
                </a>
              </li>
              <li>
                <a href="#mitra-industri" className="text-slate-600 hover:text-[#0C4A9E] transition-colors">
                  Verifikasi Perusahaan
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Ekosistem Kampus (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#071E4A] font-sans">
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
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#071E4A] font-sans">
              Sekretariat CDC
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0C4A9E] shrink-0 mt-1" />
                <span className="text-slate-600 leading-relaxed font-sans text-xs">
                  {siteConfig.contact.addressPlaceholder}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0C4A9E] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-slate-600 hover:text-[#0C4A9E] transition-colors text-xs font-sans font-medium"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0C4A9E] shrink-0" />
                <span className="text-slate-600 text-xs font-sans font-medium">
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
            className="group flex items-center gap-2 text-slate-600 hover:text-white hover:bg-[#0C4A9E] hover:border-[#0C4A9E] transition-all px-3.5 py-1.5 rounded-full border border-[#BAE6FD] bg-white shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
