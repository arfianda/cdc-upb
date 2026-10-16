import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || typeof window === 'undefined') return;
    // Nonaktifkan magnetic pada layar sentuh/mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = btnRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle =
    'relative inline-flex items-center justify-center font-sans font-medium select-none overflow-hidden transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyle = {
    sm: 'text-xs px-4 py-2 rounded-full min-h-[40px]',
    md: 'text-sm px-6 py-3 rounded-full min-h-[46px]',
    lg: 'text-base px-8 py-3.5 rounded-full min-h-[52px]',
  }[size];

  const variantStyle = {
    primary:
      'bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] text-white hover:from-[#093B80] hover:to-[#008FC5] shadow-[0_10px_25px_-5px_rgba(12,74,158,0.35)] border border-[#0C4A9E] active:scale-[0.98]',
    secondary:
      'bg-white text-[#071E4A] border border-[#BAE6FD] hover:border-[#0C4A9E] hover:bg-[#F0F7FF] active:scale-[0.98] shadow-xs',
    outline:
      'bg-transparent text-[#071E4A] border border-[#BAE6FD] hover:border-[#0C4A9E] hover:bg-[#F0F7FF] active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-700 hover:text-[#0C4A9E] hover:bg-[#F0F7FF] active:scale-[0.98]',
  }[variant];

  const content = (
    <span
      className="relative z-10 flex items-center gap-2 transition-transform duration-200"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
    >
      {content}
    </button>
  );
};
