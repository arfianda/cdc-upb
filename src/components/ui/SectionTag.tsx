import React from 'react';

interface SectionTagProps {
  number: string;
  label: string;
  light?: boolean;
  dark?: boolean;
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  number,
  label,
  light = true,
  dark = false,
  className = '',
}) => {
  const isDarkCanvas = dark || (!light && dark);
  const colorClass = isDarkCanvas ? 'text-blue-300' : 'text-blue-700';

  return (
    <div
      className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase ${colorClass} ${className}`}
    >
      <span className="font-mono text-[11px] opacity-75">{number}</span>
      <span className="opacity-40">/</span>
      <span className="text-navy-950/80 tracking-widest">{label}</span>
    </div>
  );
};
