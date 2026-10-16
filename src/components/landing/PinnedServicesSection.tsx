import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, BarChart3, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionTag } from '../ui/SectionTag';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 'service-1',
    title: 'Portal Lowongan Terverifikasi',
    subtitle: 'Kemitraan Langsung Kawasan Industri',
    description:
      'Setiap posisi yang ditayangkan di kurasi langsung melalui koordinasi resmi dengan HRD industri manufaktur dan korporasi terpercaya. Menghilangkan risiko penipuan dan memberikan jalur peninjauan berkas yang tepercaya.',
    features: [
      'Prioritas peninjauan berkas lulusan UPB',
      'Integrasi kualifikasi prodi Teknik, Ekonomi, & Hukum',
      'Informasi rentang kompensasi dan fasilitas kerja transparan',
    ],
    icon: <Briefcase className="w-6 h-6 text-[#0C4A9E]" />,
  },
  {
    id: 'service-2',
    title: 'Tracer Study Terstandarisasi',
    subtitle: 'Evaluasi Mutu & Akreditasi Program Studi',
    description:
      'Instrumen survei penelusuran lulusan yang mengacu pada standar resmi kementerian pendidikan tinggi. Menghasilkan data analitik agregat yang menjadi fondasi evaluasi kurikulum dan akreditasi universitas.',
    features: [
      'Survei daring satu pintu dengan autentikasi NIM resmi',
      'Dashboard statistik publik aman privasi (UU PDP)',
      'Laporan evaluasi transisi studi ke dunia kerja per angkatan',
    ],
    icon: <BarChart3 className="w-6 h-6 text-[#0C4A9E]" />,
  },
  {
    id: 'service-3',
    title: 'Profil & Jejaring Alumni',
    subtitle: 'Kolaborasi Profesional Lintas Generasi',
    description:
      'Ruang terstruktur bagi alumni Universitas Pelita Bangsa untuk memperbarui rekam jejak profesional, membuka kesempatan mentoring satu lawan satu, dan memperkuat relasi lintas industri.',
    features: [
      'Pengaturan privasi visibilitas profil mandiri',
      'Peluang bimbingan karier bagi mahasiswa tingkat akhir',
      'Koneksi strategis alumni di kawasan Jabodetabek',
    ],
    icon: <Users className="w-6 h-6 text-[#0C4A9E]" />,
  },
  {
    id: 'service-4',
    title: 'Klinik CV & Konseling Karier',
    subtitle: 'Pembekalan Kompetensi Siap Kerja',
    description:
      'Pendampingan intensif bagi calon lulusan mulai dari perancangan CV berstandar ATS, simulasi wawancara teknis, hingga sesi berbagi wawasan industri bersama praktisi HR senior.',
    features: [
      'Review mendalam berkas lamaran dan portofolio',
      'Simulasi wawancara kerja berbasis kompetensi nyata',
      'Jadwal rutin agenda rekrutmen langsung di kampus',
    ],
    icon: <GraduationCap className="w-6 h-6 text-[#0C4A9E]" />,
  },
];

export const PinnedServicesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const panelsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Gunakan gsap.matchMedia untuk memisahkan logika desktop (pin) dan mobile (stack)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // DESKTOP ONLY: Pinned scroll section
      const panels = gsap.utils.toArray<HTMLElement>('.service-panel-item');
      if (panels.length === 0 || !containerRef.current) return;

      const totalPanels = panels.length;

      // Pin container utama
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalPanels * 800}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * totalPanels),
            totalPanels - 1
          );
          setActiveStep(step);
        },
      });

      // Animasi pergantian panel kanan
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { yPercent: 100, opacity: 0 });
          gsap.to(panel, {
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top+=${(i - 0.3) * 800} top`,
              end: () => `top+=${i * 800} top`,
              scrub: true,
            },
          });
        }
      });

      return () => {
        pinTrigger.kill();
      };
    });

    mm.add('(max-width: 1023px)', () => {
      // MOBILE & TABLET: Stack vertikal biasa tanpa pin dengan reveal ringan
      gsap.fromTo(
        '.service-panel-mobile',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-mobile-wrapper',
            start: 'top 80%',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="layanan"
      className="relative bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* DESKTOP VIEW (PINNED SCRUB) */}
      <div className="hidden lg:flex min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 items-center">
        <div className="grid grid-cols-12 gap-16 w-full items-center">
          {/* Sisi Kiri Sticky (5 Cols) */}
          <div className="col-span-5 space-y-8 pr-6">
            <div className="space-y-3">
              <SectionTag label="Ekosistem Layanan" />
              <h2 className="font-sans text-4xl xl:text-5xl font-extrabold tracking-tight text-[#071E4A] leading-tight">
                Empat Pilar Pengembangan Karier
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Dirancang khusus untuk mendukung siklus transisi mahasiswa tingkat akhir dan alumni
                menuju dunia industri profesional terkemuka.
              </p>
            </div>

            {/* Stepper Indikator Navigasi */}
            <div className="space-y-3 pt-4 border-t border-slate-200/80">
              {servicesData.map((service, idx) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-3.5 p-3 rounded-xl transition-all duration-300 ${
                    activeStep === idx
                      ? 'bg-[#F0F7FF] border-2 border-[#0C4A9E] text-[#071E4A] shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all shrink-0 ${
                      activeStep === idx
                        ? 'bg-[#00A3E0] scale-125'
                        : 'bg-slate-300'
                    }`}
                  />
                  <span className="text-sm font-sans">{service.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sisi Kanan Panel Berganti (7 Cols) */}
          <div
            ref={panelsContainerRef}
            className="col-span-7 relative h-[520px] rounded-3xl bg-white border border-[#E0EDFD] p-10 overflow-hidden shadow-[0_20px_50px_rgba(12,74,158,0.06)]"
          >
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className="service-panel-item absolute inset-0 p-10 flex flex-col justify-between bg-white"
                style={{ zIndex: idx + 1 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#E0F2FE] text-[#0C4A9E]">
                      Layanan Terpadu
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-sans uppercase tracking-wider text-[#0C4A9E] font-bold">
                      {service.subtitle}
                    </span>
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[#071E4A]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00A3E0] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs text-slate-500 font-sans font-medium border-t border-slate-100">
                  <span>Universitas Pelita Bangsa</span>
                  <span>Pilar Layanan CDC UPB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET VIEW (VERTICAL STACK TANPA PIN) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 py-20 service-mobile-wrapper">
        <div className="space-y-3 mb-10">
          <SectionTag label="Ekosistem Layanan" />
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-[#071E4A] leading-tight">
            Empat Pilar Pengembangan Karier
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Mendukung siklus transisi mahasiswa tingkat akhir dan alumni menuju dunia industri
            profesional terkemuka.
          </p>
        </div>

        <div className="space-y-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-panel-mobile p-6 rounded-2xl bg-white border border-[#E0EDFD] shadow-[0_10px_30px_rgba(12,74,158,0.04)] space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#F0F7FF] border border-[#BAE6FD] flex items-center justify-center">
                  {service.icon}
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-semibold bg-[#E0F2FE] text-[#0C4A9E]">
                  Layanan Terpadu
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-sans uppercase tracking-wider text-[#0C4A9E] font-bold">
                  {service.subtitle}
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#071E4A]">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                {service.description}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
