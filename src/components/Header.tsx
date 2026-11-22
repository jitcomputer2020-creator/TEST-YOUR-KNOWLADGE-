import React, { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderBranding } from '../types/assessment';

interface HeaderProps {
  branding: HeaderBranding;
  onAdminTrigger: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: 'https://jitcomputer.ct.ws/', external: true, active: false },
  { label: 'Student Portal', href: 'https://jit-computer-portal-psi.vercel.app/', external: true, active: false },
  { label: 'JIT Group', href: 'https://jit-group-n.vercel.app/', external: true, active: false },
  { label: 'Test Your Knowledge', href: '#assessments', external: false, active: true },
];

export const Header: React.FC<HeaderProps> = ({ branding, onAdminTrigger }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  const handleLogoClick = () => {
    clickCountRef.current += 1;

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      resetTimerRef.current = null;
      onAdminTrigger();
      return;
    }

    resetTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
      resetTimerRef.current = null;
    }, 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-[0_1px_12px_rgba(11,30,71,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-16 sm:h-[72px]">
          {/* Left: Institute Logo + Title & Subtitle */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleLogoClick}
              aria-label="JIT Computer Training Institute Logo"
              className="relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#0B1E47] border border-blue-900/20 shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer transition-transform active:scale-95"
            >
              {!logoFailed && branding.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={branding.title}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8 text-white"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 4L34 10V20C34 28.5 27.9 34.8 20 37C12.1 34.8 6 28.5 6 20V10L20 4Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    fill="#1D4ED8"
                  />
                  <rect x="12" y="13" width="16" height="10" rx="1.5" fill="white" />
                  <path d="M16 26H24" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              )}
            </button>

            <div className="min-w-0">
              <div className="font-display font-bold text-[15px] sm:text-lg text-[#0B1E47] leading-tight truncate">
                {branding.title}
              </div>
              <div className="text-xs sm:text-[13px] font-medium text-blue-700 leading-tight truncate mt-0.5">
                {branding.subtitle}
              </div>
            </div>
          </div>

          {/* Right: Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-current={link.active ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm ${
                  link.active
                    ? 'text-[#1D4ED8]'
                    : 'text-slate-600 hover:text-[#0B1E47]'
                }`}
              >
                {link.label}
                {link.active && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#1D4ED8] rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 text-[#0B1E47] hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-current={link.active ? 'page' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  link.active
                    ? 'bg-blue-50 text-[#1D4ED8]'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B1E47]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
