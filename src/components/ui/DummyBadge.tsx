import React from 'react';
import { siteConfig } from '../../config/site';

interface DummyBadgeProps {
  label?: string;
  className?: string;
}

/**
 * Komponen indikator data contoh.
 * Otomatis hilang secara global jika siteConfig.SHOW_DUMMY_BADGES disetel false.
 */
export const DummyBadge: React.FC<DummyBadgeProps> = ({
  label = 'Data contoh',
  className = '',
}) => {
  if (!siteConfig.SHOW_DUMMY_BADGES) {
    return null;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] tracking-wide uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300/80 select-none shadow-xs ${className}`}
      title="Data ini merupakan contoh ilustratif dan akan diganti dengan data resmi kampus"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      {label}
    </span>
  );
};
