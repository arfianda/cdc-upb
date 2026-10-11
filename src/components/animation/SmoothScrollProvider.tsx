import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis, destroyLenis, scrollToElement, getLenis } from '../../lib/lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    initLenis();

    // Intersep link anchor internal seperti href="#lowongan"
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          scrollToElement(element as HTMLElement);
        }
      } else if (href && href.startsWith('/#') && href.length > 2 && window.location.pathname === '/') {
        e.preventDefault();
        const hash = href.substring(1);
        const element = document.querySelector(hash);
        if (element) {
          scrollToElement(element as HTMLElement);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger setelah window load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('load', handleLoad);
      destroyLenis();
    };
  }, []);

  // Tangani perpindahan rute: scroll ke atas atau ke hash target
  useEffect(() => {
    const lenis = getLenis();
    
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          scrollToElement(el as HTMLElement);
        }
        ScrollTrigger.refresh();
      }, 100);
    } else {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};
