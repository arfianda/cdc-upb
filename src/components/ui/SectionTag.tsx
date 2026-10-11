import React from 'react';

interface SectionTagProps {
  number: string;
  label: string;
  light?: boolean;
  className?: string;
}

export const SectionTag: React.FC<SectionTagProps> = ({
  number,
  label,
  light = false,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase ${
        light ? 'text-blue-600' : 'text-blue-300'
      } ${className}`}
    >
      <span className="font-mono text-[11px] opacity-75">{number}</span>
      <span className="opacity-40">/</span>
      <span>{label}</span>
    </div>
  );
};
