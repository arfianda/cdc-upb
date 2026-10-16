import React, { useEffect, useState } from 'react';
import {
  Car,
  Cpu,
  Package,
  Zap,
  Factory,
  Cog,
  ShieldCheck,
  Printer,
  Building2,
  Heart,
  BatteryCharging,
  Smartphone,
  Truck,
  HardHat,
  Monitor,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  X,
  Briefcase,
} from 'lucide-react';
import { mockPartnersRow1, mockPartnersRow2 } from '../../data/mockPartners';
import type { PartnerCompany } from '../../types/database';
import { DummyBadge } from '../ui/DummyBadge';
import { SectionTag } from '../ui/SectionTag';

const renderIcon = (type?: string) => {
  const iconProps = { className: 'w-5 h-5 text-[#0C4A9E]' };
  switch (type) {
    case 'car':
      return <Car {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'factory':
      return <Factory {...iconProps} />;
    case 'cog':
      return <Cog {...iconProps} />;
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'printer':
      return <Printer {...iconProps} />;
    case 'building':
      return <Building2 {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} />;
    case 'battery-charging':
      return <BatteryCharging {...iconProps} />;
    case 'smartphone':
      return <Smartphone {...iconProps} />;
    case 'truck':
      return <Truck {...iconProps} />;
    case 'hard-hat':
      return <HardHat {...iconProps} />;
    case 'monitor':
      return <Monitor {...iconProps} />;
    default:
      return <Building2 {...iconProps} />;
  }
};

export const PartnerMarquee: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerCompany | null>(null);

  // Keyboard accessibility: ESC key to close modal (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPartner) {
        setSelectedPartner(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPartner]);

  // Gandakan array agar transisi looping tidak pernah terputus
  const row1Items = [...mockPartnersRow1, ...mockPartnersRow1];
  const row2Items = [...mockPartnersRow2, ...mockPartnersRow2];

  const renderPartnerCard = (partner: PartnerCompany, key: string) => (
    <div
      key={key}
      role="button"
      tabIndex={0}
      onClick={() => setSelectedPartner(partner)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedPartner(partner);
        }
      }}
      className="group relative w-[310px] sm:w-[350px] min-w-[310px] sm:min-w-[350px] h-[190px] sm:h-[205px] p-6 rounded-2xl bg-white border border-[#E0EDFD] hover:border-[#00A3E0] shadow-[0_4px_18px_rgba(12,74,158,0.03)] hover:shadow-[0_16px_36px_-8px_rgba(12,74,158,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shrink-0 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0]"
    >
      {/* Top: Ikon Industri di Kiri & Panah di Kanan */}
      <div className="flex items-center justify-between gap-3">
        <div className="w-11 h-11 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-[#E0F2FE] transition-all">
          {renderIcon(partner.icon_type)}
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-[#0C4A9E] group-hover:border-[#0C4A9E] transition-all">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* Tengah: Nama PT Tebal & Subjudul Kawasan */}
      <div className="space-y-1">
        <h3 className="font-sans font-bold text-base sm:text-lg text-[#071E4A] tracking-tight group-hover:text-[#0C4A9E] transition-colors line-clamp-1">
          {partner.nama}
        </h3>
        <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed font-sans">
          {partner.deskripsi}
        </p>
      </div>

      {/* Bawah: Kategori & Tag Badge */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <span className="text-[11px] font-sans font-medium text-slate-500 truncate max-w-[170px]">
          {partner.kawasan}
        </span>
        {partner.tag && (
          <span className="inline-flex items-center text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0C4A9E] border border-[#BAE6FD] font-semibold shrink-0">
            {partner.tag}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="mitra-industri"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-y border-[#E0EDFD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <SectionTag label="Jejaring Industri Terintegrasi" />
              <DummyBadge label="Data contoh mitra" />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071E4A] leading-tight">
              350+ Korporasi & Industri Multinasional
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              Ekosistem kemitraan rekrutmen terpadu kawasan industri Cikarang, MM2100, EJIP,
              Jababeka, dan GIIC yang membuka akses langsung kerja dan magang bagi talenta UPB.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#0C4A9E] bg-[#E0F2FE] px-3.5 py-2 rounded-full border border-[#BAE6FD] shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#00A3E0] animate-pulse" />
            <span>Arahkan kursor untuk menjeda putaran</span>
          </div>
        </div>
      </div>

      {/* Marquee Container 2 Baris Kartu Besar */}
      <div className="marquee-pause relative w-full overflow-hidden select-none space-y-6">
        {/* Gradient edge masks untuk efek fade halus di tepi kiri & kanan */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-20 pointer-events-none" />

        {/* Baris 1: Bergerak ke Kiri */}
        <div className="overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-5 sm:gap-6 whitespace-nowrap py-1 px-4">
            {row1Items.map((partner, idx) =>
              renderPartnerCard(partner, `row1-${partner.id}-${idx}`)
            )}
          </div>
        </div>

        {/* Baris 2: Bergerak ke Kanan (Arah Berlawanan) */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-5 sm:gap-6 whitespace-nowrap py-1 px-4">
            {row2Items.map((partner, idx) =>
              renderPartnerCard(partner, `row2-${partner.id}-${idx}`)
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Mitra saat Kartu Diklik (Aksesibel Keyboard & Escape) */}
      {selectedPartner && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071E4A]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white text-[#071E4A] shadow-2xl border border-[#BAE6FD] space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                  {renderIcon(selectedPartner.icon_type)}
                </div>
                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#071E4A]">
                    {selectedPartner.nama}
                  </h3>
                  <span className="text-xs font-sans text-[#00A3E0] font-semibold">
                    {selectedPartner.kategori}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-[#071E4A] hover:bg-slate-100 transition-colors"
                aria-label="Tutup rincian mitra"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 font-sans leading-relaxed">
              <p>{selectedPartner.deskripsi}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-[#0C4A9E] shrink-0" />
                <span className="font-medium">{selectedPartner.kawasan}</span>
              </div>
              <div className="flex items-center gap-2 text-[#0C4A9E]">
                <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>Terverifikasi sebagai mitra rekrutmen resmi CDC UPB</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <a
                href="#lowongan"
                onClick={() => setSelectedPartner(null)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] text-white font-semibold text-xs tracking-wide hover:from-[#093B80] hover:to-[#008FC5] transition-all shadow-md shadow-blue-500/20"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Cari Lowongan di Mitra Ini</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
