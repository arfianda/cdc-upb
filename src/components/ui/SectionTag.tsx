import React from 'react';

interface SectionTagProps {
  number?: string;
  label: string;
  light?: boolean;
  dark?: boolean;
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  label,
  light = true,
  dark = false,
  className = '',
}) => {
  const isDarkCanvas = dark || (!light && dark);
  const dotClass = isDarkCanvas ? 'bg-[#38BDF8]' : 'bg-[#00A3E0]';
  const labelClass = isDarkCanvas ? 'text-white/90' : 'text-[#071E4A]';

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase font-sans ${labelClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{label}</span>
    </div>
  );
};
