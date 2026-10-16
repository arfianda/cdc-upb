import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { siteConfig } from '../../config/site';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Hitung progress scroll
      if (docHeight > 0) {
        setScrollProgress((currentScrollY / docHeight) * 100);
      }

      // Smart hide / show
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && !mobileMenuOpen) {
          // Scroll turun -> sembunyi
          setIsVisible(false);
        } else {
          // Scroll naik -> muncul
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Handle ESC key untuk menutup menu mobile (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar tipis 2px di puncak viewport dengan aksen navy */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-slate-200 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md border-b border-[#E0EDFD] shadow-[0_2px_15px_rgba(12,74,158,0.04)] py-3.5 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity dengan Aksen Biru Resmi CDC */}
            <a
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A3E0] rounded-md"
            >
              <img
                src="/images/logo_cdc_upb.png"
                alt="Logo Resmi CDC Pelita Bangsa"
                className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-sans text-base sm:text-lg tracking-tight text-[#071E4A] font-extrabold group-hover:text-[#0C4A9E] transition-colors leading-tight">
                  CDC Pelita Bangsa
                </span>
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#0C4A9E]/75 font-bold">
                  Career Development Center
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium text-slate-700 hover:text-[#0C4A9E] transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00A3E0] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons (CDC Blue Accent Pill) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/tracer-study"
                className="text-xs font-semibold tracking-wider uppercase text-[#071E4A] hover:text-[#0C4A9E] px-3 py-2 transition-colors"
              >
                Tracer Study
              </a>
              <a
                href="#lowongan"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0C4A9E] to-[#00A3E0] hover:from-[#093B80] hover:to-[#008FC5] text-white font-semibold text-xs tracking-wide transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20"
              >
                <span>Cari Lowongan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:text-navy-950 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-950"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-lg">
            <nav className="flex flex-col gap-3">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-slate-700 hover:text-navy-950 py-2 px-3 rounded-md hover:bg-slate-50 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <a
                  href="/tracer-study"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-medium text-slate-700 hover:text-navy-950 rounded-lg bg-slate-100"
                >
                  Isi Tracer Study
                </a>
                <MagneticButton
                  size="md"
                  variant="primary"
                  href="#lowongan"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center"
                >
                  Cari Lowongan Kerja
                </MagneticButton>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
