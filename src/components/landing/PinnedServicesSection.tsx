import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, BarChart3, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { SectionTag } from '../ui/SectionTag';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 'service-1',
    number: '01',
    title: 'Portal Lowongan Terverifikasi',
    subtitle: 'Kemitraan Langsung Kawasan Industri',
    description:
      'Setiap posisi yang ditayangkan di kurasi langsung melalui koordinasi resmi dengan HRD industri manufaktur dan korporasi terpercaya. Menghilangkan risiko penipuan dan memberikan jalur peninjauan berkas yang tepercaya.',
    features: [
      'Prioritas peninjauan berkas lulusan UPB',
      'Integrasi kualifikasi prodi Teknik, Ekonomi, & Hukum',
      'Informasi rentang kompensasi dan fasilitas kerja transparan',
    ],
    icon: <Briefcase className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 'service-2',
    number: '02',
    title: 'Tracer Study Terstandarisasi',
    subtitle: 'Evaluasi Mutu & Akreditasi Program Studi',
    description:
      'Instrumen survei penelusuran lulusan yang mengacu pada standar resmi kementerian pendidikan tinggi. Menghasilkan data analitik agregat yang menjadi fondasi evaluasi kurikulum dan akreditasi universitas.',
    features: [
      'Survei daring satu pintu dengan autentikasi NIM resmi',
      'Dashboard statistik publik aman privasi (UU PDP)',
      'Laporan evaluasi transisi studi ke dunia kerja per angkatan',
    ],
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 'service-3',
    number: '03',
    title: 'Profil & Jejaring Alumni',
    subtitle: 'Kolaborasi Profesional Lintas Generasi',
    description:
      'Ruang terstruktur bagi alumni Universitas Pelita Bangsa untuk memperbarui rekam jejak profesional, membuka kesempatan mentoring satu lawan satu, dan memperkuat relasi lintas industri.',
    features: [
      'Pengaturan privasi visibilitas profil mandiri',
      'Peluang bimbingan karier bagi mahasiswa tingkat akhir',
      'Koneksi strategis alumni di kawasan Jabodetabek',
    ],
    icon: <Users className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 'service-4',
    number: '04',
    title: 'Klinik CV & Konseling Karier',
    subtitle: 'Pembekalan Kompetensi Siap Kerja',
    description:
      'Pendampingan intensif bagi calon lulusan mulai dari perancangan CV berstandar ATS, simulasi wawancara teknis, hingga sesi berbagi wawasan industri bersama praktisi HR senior.',
    features: [
      'Review mendalam berkas lamaran dan portofolio',
      'Simulasi wawancara kerja berbasis kompetensi nyata',
      'Jadwal rutin agenda rekrutmen langsung di kampus',
    ],
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
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
      className="relative bg-navy-950 text-white border-b border-white/10"
    >
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

      {/* DESKTOP VIEW (PINNED SCRUB) */}
      <div className="hidden lg:flex min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 items-center">
        <div className="grid grid-cols-12 gap-16 w-full items-center">
          {/* Sisi Kiri Sticky (5 Cols) */}
          <div className="col-span-5 space-y-8 pr-6">
            <div className="space-y-3">
              <SectionTag number="03" label="Ekosistem Layanan" />
              <h2 className="font-serif text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
                Empat Pilar Pengembangan Karier
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Dirancang khusus untuk mendukung siklus transisi mahasiswa tingkat akhir dan alumni
                menuju dunia industri profesional terkemuka.
              </p>
            </div>

            {/* Stepper Indikator Navigasi */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              {servicesData.map((service, idx) => (
                <div
                  key={service.id}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                    activeStep === idx
                      ? 'bg-white/10 border border-white/20 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                      activeStep === idx
                        ? 'bg-[#2F6BFF] text-white'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {service.number}
                  </span>
                  <span className="text-sm font-semibold">{service.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sisi Kanan Panel Berganti (7 Cols) */}
          <div
            ref={panelsContainerRef}
            className="col-span-7 relative h-[520px] rounded-3xl bg-navy-900 border border-white/10 p-10 overflow-hidden shadow-[0_25px_60px_rgba(2,8,26,0.8)]"
          >
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className="service-panel-item absolute inset-0 p-10 flex flex-col justify-between bg-navy-900"
                style={{ zIndex: idx + 1 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <span className="font-serif italic text-3xl font-bold text-slate-600">
                      {service.number}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-300">
                      {service.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-white/10 space-y-2.5">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Universitas Pelita Bangsa</span>
                  <span>Pilar Layanan {service.number} dari 04</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET VIEW (VERTICAL STACK TANPA PIN) */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 py-20 service-mobile-wrapper">
        <div className="space-y-3 mb-10">
          <SectionTag number="03" label="Ekosistem Layanan" />
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white leading-tight">
            Empat Pilar Pengembangan Karier
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Mendukung siklus transisi mahasiswa tingkat akhir dan alumni menuju dunia industri
            profesional terkemuka.
          </p>
        </div>

        <div className="space-y-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-panel-mobile p-6 rounded-2xl bg-navy-900 border border-white/10 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
                  {service.icon}
                </div>
                <span className="font-serif italic text-2xl font-bold text-slate-500">
                  {service.number}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-300">
                  {service.subtitle}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {service.description}
              </p>

              <div className="pt-3 border-t border-white/10 space-y-2">
                {service.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
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
