import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { HeaderBranding } from '../types/assessment';

interface FooterProps {
  branding: HeaderBranding;
}

export const Footer: React.FC<FooterProps> = ({ branding }) => {
  return (
    <footer className="bg-[#071633] text-blue-100 border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Institute Identity */}
          <div>
            <div className="font-display font-bold text-lg text-white">
              {branding.title}
            </div>
            <div className="text-sm text-blue-300 mt-1">{branding.subtitle}</div>
            <p className="mt-3 text-sm text-blue-200/75 leading-relaxed max-w-sm">
              Dedicated to practical computer literacy, certification training, and interactive
              skill assessments for students.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-white tracking-wide">
              Institute Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-blue-100/85">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>Barasat, Kolkata</span>
              </li>
              <li>
                <a
                  href="tel:8961260151"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span className="font-mono tabular-nums">8961260151</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:jitcomputer2020@gmail.com"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>jitcomputer2020@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Portal Links */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-white tracking-wide">
              Quick Portals
            </h3>
            <ul className="space-y-2 text-sm text-blue-100/85">
              <li>
                <a
                  href="https://jitcomputer.ct.ws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  JIT Main Website
                </a>
              </li>
              <li>
                <a
                  href="https://jit-computer-portal-psi.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  Student Portal
                </a>
              </li>
              <li>
                <a
                  href="https://jit-group-n.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline underline-offset-4 transition-colors"
                >
                  JIT Group
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-200/70">
          <p>
            &copy; {new Date().getFullYear()} {branding.title} ({branding.subtitle}). All rights
            reserved.
          </p>
          <p>Barasat, Kolkata · Phone: 8961260151</p>
        </div>
      </div>
    </footer>
  );
};
