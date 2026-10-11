import React from 'react';

interface PlaceholderImageProps {
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide';
  caption?: string;
  className?: string;
  badgeText?: string;
}

export const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  aspectRatio = 'video',
  caption = 'Fasilitas Kampus & Ruang Pengembangan Karier UPB',
  className = '',
  badgeText = 'GANTI DENGAN FOTO ASLI UPB',
}) => {
  const aspectClass = {
    video: 'aspect-[16/9]',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-navy-900 ${aspectClass} ${className}`}
    >
      {/* Background tekstur duotone arsitektur geometris */}
      <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-navy-900 to-navy-800 opacity-90" />
      
      {/* Grid lines arsitektural */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 stroke-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Siluet geometris kampus modern */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/80 border border-blue-400/30 text-blue-300 text-xs font-mono font-medium tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {badgeText}
          </div>
          <p className="text-sm text-slate-300 font-sans max-w-xs mx-auto leading-relaxed">
            {caption}
          </p>
        </div>
      </div>

      {/* Frame border halus */}
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />
    </div>
  );
};
