import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';
import { siteConfig } from '../../config/site';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

      // Deteksi scrolled melewati hero
      setIsScrolled(currentScrollY > 60);

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
      {/* Scroll Progress Bar tipis 1.5px di puncak viewport */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500/20 z-50 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-[#2F6BFF] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-navy-950/85 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_-10px_rgba(2,8,26,0.6)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <a
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2F6BFF] to-navy-900 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(47,107,255,0.3)]">
                <span className="font-serif italic font-bold text-lg text-white">C</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-tight text-white font-bold group-hover:text-blue-300 transition-colors">
                  CDC Pelita Bangsa
                </span>
                <span className="text-[10px] uppercase font-mono tracking-[0.16em] text-slate-400">
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
                  className="relative text-sm text-slate-300 hover:text-white transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#2F6BFF] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#tracer-study"
                className="text-xs font-semibold tracking-wider uppercase text-slate-300 hover:text-white px-3 py-2 transition-colors"
              >
                Tracer Study
              </a>
              <MagneticButton
                size="sm"
                variant="primary"
                href="#lowongan"
              >
                <span>Cari Lowongan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy-950/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-3">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-slate-200 hover:text-white py-2 px-3 rounded-md hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#tracer-study"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg bg-white/5"
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
