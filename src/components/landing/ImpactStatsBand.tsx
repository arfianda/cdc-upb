import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { impactMetrics } from '../../data/mockTracer';
import { SectionTag } from '../ui/SectionTag';
import { DummyBadge } from '../ui/DummyBadge';

export const ImpactStatsBand: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return {
        'metric-1': 84.2,
        'metric-2': 2.7,
        'metric-3': 89.1,
        'metric-4': 350,
      };
    }
    return {
      'metric-1': 0,
      'metric-2': 0,
      'metric-3': 0,
      'metric-4': 0,
    };
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animasi self-drawing hairline borders
      gsap.fromTo(
        '.stat-hairline-h',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.stat-hairline-v',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      // Numeric count-up animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          impactMetrics.forEach((metric) => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: metric.value,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => ({
                  ...prev,
                  [metric.id]: counter.val,
                }));
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 bg-[#F8FAFC] text-slate-900 overflow-hidden border-y border-slate-200/80"
    >
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Band */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-3">
            <SectionTag number="02" label="Kinerja & Dampak Institusional" />
            <DummyBadge label="Data contoh metrik" />
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
            Audit Mutu & Tracer Study Lulusan UPB 2024
          </span>
        </div>

        {/* 4 Metrics Grid dengan Garis Hairline Arsitektural */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {/* Hairline Divider Horizontal di Desktop */}
          <div className="stat-hairline-h absolute top-0 left-0 right-0 h-[1px] bg-slate-200/90 origin-left hidden lg:block" />
          <div className="stat-hairline-h absolute bottom-0 left-0 right-0 h-[1px] bg-slate-200/90 origin-left hidden lg:block" />

          {impactMetrics.map((item, index) => {
            const displayVal =
              item.value % 1 === 0
                ? Math.round(counts[item.id] || 0)
                : (counts[item.id] || 0).toFixed(1);

            return (
              <div
                key={item.id}
                className={`relative lg:px-8 py-8 flex flex-col justify-between space-y-6 ${
                  index !== 0 ? 'lg:border-l lg:border-slate-200/70' : ''
                }`}
              >
                {/* Hairline Vertikal Animasi */}
                {index !== 0 && (
                  <div className="stat-hairline-v absolute top-0 bottom-0 left-0 w-[1px] bg-slate-200/90 origin-top hidden lg:block" />
                )}

                <div className="space-y-2">
                  <span className="text-xs font-mono font-medium uppercase tracking-[0.15em] text-blue-700 block">
                    0{index + 1} / METRIK
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-navy-950 tabular-nums">
                      {displayVal}
                    </span>
                    <span className="font-serif italic text-3xl sm:text-4xl text-blue-700 font-bold">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-200/60">
                  <h4 className="text-sm font-semibold text-slate-900 font-sans">
                    {item.label}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {item.keterangan}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
