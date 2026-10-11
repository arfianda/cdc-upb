import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mockPartners } from '../../data/mockPartners';
import { DummyBadge } from '../ui/DummyBadge';

export const PartnerMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    // Duplikasi isi track untuk infinite loop mulus
    const trackWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: -trackWidth,
      ease: 'none',
      duration: 35,
      repeat: -1,
    });

    // Kecepatan bereaksi terhadap kecepatan gulir (scroll velocity)
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity());
        const speedMultiplier = 1 + Math.min(velocity / 300, 3.5);

        gsap.to(tween, {
          timeScale: speedMultiplier,
          duration: 0.3,
          overwrite: 'auto',
          onComplete: () => {
            gsap.to(tween, { timeScale: 1, duration: 1.2, ease: 'power2.out' });
          },
        });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, []);

  // Gandakan array mitra agar loop tidak terputus
  const items = [...mockPartners, ...mockPartners];

  return (
    <section
      id="mitra-industri"
      className="relative py-12 bg-navy-950 border-y border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
            Jejaring Mitra Rekrutmen Kawasan Industri
          </span>
          <DummyBadge label="Data contoh mitra" />
        </div>
        <span className="text-xs font-sans text-slate-500 hidden sm:inline">
          Kecepatan ticker dinamis mengikuti guliran mouse
        </span>
      </div>

      {/* Marquee Track Container */}
      <div ref={marqueeRef} className="relative w-full overflow-hidden select-none">
        {/* Gradient edge masks untuk fade halus di tepi kiri & kanan */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex items-center gap-6 whitespace-nowrap will-change-transform py-2"
        >
          {items.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-200 shrink-0 group cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-300 font-serif font-bold text-sm group-hover:bg-[#2F6BFF] group-hover:text-white transition-colors">
                {partner.nama.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {partner.nama}
                </span>
                <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                  {partner.kawasan}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
