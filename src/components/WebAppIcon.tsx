import React, { useState } from 'react';
import {
  Code2,
  FileText,
  Globe,
  LayoutGrid,
  Palette,
  Presentation,
  Wrench,
} from 'lucide-react';
import { WebAppIconKey } from '../types/assessment';

interface WebAppIconProps {
  iconKey: WebAppIconKey;
  customImageUrl?: string;
  name: string;
}

export const WEB_APP_ICON_THEMES: Record<
  WebAppIconKey,
  { badgeGradient: string; categoryText: string }
> = {
  'video-editor': {
    badgeGradient: 'from-indigo-600 via-blue-600 to-cyan-500 shadow-blue-600/30',
    categoryText: 'text-indigo-700',
  },
  'cartoon-studio': {
    badgeGradient: 'from-violet-600 via-blue-600 to-indigo-700 shadow-violet-600/35',
    categoryText: 'text-violet-700',
  },
  'code-studio': {
    badgeGradient: 'from-slate-800 via-blue-800 to-blue-600 shadow-blue-900/25',
    categoryText: 'text-blue-700',
  },
  'design-canvas': {
    badgeGradient: 'from-blue-600 via-indigo-600 to-violet-600 shadow-indigo-600/30',
    categoryText: 'text-indigo-700',
  },
  'cloud-docs': {
    badgeGradient: 'from-sky-600 to-blue-700 shadow-sky-600/25',
    categoryText: 'text-sky-700',
  },
  presentation: {
    badgeGradient: 'from-amber-500 to-orange-600 shadow-amber-500/25',
    categoryText: 'text-amber-700',
  },
  'utility-tools': {
    badgeGradient: 'from-teal-600 to-emerald-600 shadow-teal-600/25',
    categoryText: 'text-teal-700',
  },
  'globe-app': {
    badgeGradient: 'from-cyan-600 to-blue-700 shadow-cyan-600/25',
    categoryText: 'text-cyan-700',
  },
  'app-grid': {
    badgeGradient: 'from-[#0B1E47] to-[#1D4ED8] shadow-blue-900/25',
    categoryText: 'text-blue-700',
  },
};

function renderVectorAppLogo(iconKey: WebAppIconKey) {
  if (iconKey === 'video-editor') {
    return (
      <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-hidden="true">
        {/* Outer sleek filmstrip / studio frame */}
        <rect
          x="4"
          y="7"
          width="28"
          height="19"
          rx="3.5"
          fill="rgba(255,255,255,0.14)"
          stroke="white"
          strokeWidth="1.9"
        />
        {/* Filmstrip side perforations */}
        <path
          d="M7.5 10.5V12.5M7.5 15.5V17.5M7.5 20.5V22.5M28.5 10.5V12.5M28.5 15.5V17.5M28.5 20.5V22.5"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Center play triangle */}
        <path
          d="M15.6 12.6L22.2 16.5L15.6 20.4V12.6Z"
          fill="white"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Multi-track timeline bar below frame */}
        <rect x="6" y="29" width="24" height="3" rx="1.5" fill="rgba(255,255,255,0.32)" />
        <rect x="6" y="29" width="14" height="3" rx="1.5" fill="#FDE047" />
        {/* Playhead cut marker */}
        <path d="M20 27.5V33.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        {/* Magic sparkle accent */}
        <path
          d="M29.5 3.5L30.2 5.4L32.1 6.1L30.2 6.8L29.5 8.7L28.8 6.8L26.9 6.1L28.8 5.4L29.5 3.5Z"
          fill="#FDE047"
        />
      </svg>
    );
  }

  if (iconKey === 'cartoon-studio') {
    return (
      <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="cubeTop" x1="8" y1="6" x2="26" y2="15" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="6" y1="12" x2="17" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="17" y1="12" x2="27" y2="27" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Subtle glossy stage ring behind 3D cube */}
        <ellipse
          cx="16.5"
          cy="28"
          rx="10.5"
          ry="2.5"
          fill="rgba(255,255,255,0.22)"
        />

        {/* 3D Isometric Studio Cube */}
        <path
          d="M16.5 6.8L25.5 11.8L16.5 16.8L7.5 11.8L16.5 6.8Z"
          fill="url(#cubeTop)"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 11.8L16.5 16.8V26.6L7.5 21.6V11.8Z"
          fill="url(#cubeLeft)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        <path
          d="M25.5 11.8L16.5 16.8V26.6L25.5 21.6V11.8Z"
          fill="url(#cubeRight)"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Glossy highlight bevel on cube */}
        <path
          d="M16.5 8.1L22.8 11.6L16.5 15.1"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Mini Film Clapperboard Overlay (bottom-right) */}
        <g transform="translate(18.5, 19.5)">
          <rect
            x="0"
            y="3.5"
            width="13"
            height="9.2"
            rx="1.8"
            fill="#0F172A"
            stroke="white"
            strokeWidth="1.2"
          />
          <path
            d="M0 3.5L12.5 0.6L13.2 3.2L0.6 5.6Z"
            fill="#FBBF24"
            stroke="white"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M3.2 2.9L4.6 4.7M7.2 2.0L8.6 3.8"
            stroke="#0F172A"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {/* Play icon inside clapperboard */}
          <path d="M5.2 6.4L8.8 8.2L5.2 10V6.4Z" fill="#38BDF8" />
        </g>

        {/* Sparkling Animation Stars */}
        <path
          d="M29.8 4.2L30.6 6.5L32.9 7.3L30.6 8.1L29.8 10.4L29 8.1L26.7 7.3L29 6.5L29.8 4.2Z"
          fill="url(#starGold)"
        />
        <path
          d="M5.2 5.2L5.7 6.6L7.1 7.1L5.7 7.6L5.2 9L4.7 7.6L3.3 7.1L4.7 6.6L5.2 5.2Z"
          fill="#FDE047"
        />
        <circle cx="29.5" cy="14" r="1.1" fill="#FEF08A" />
      </svg>
    );
  }

  switch (iconKey) {
    case 'code-studio':
      return <Code2 className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'design-canvas':
      return <Palette className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'cloud-docs':
      return <FileText className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'presentation':
      return <Presentation className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'utility-tools':
      return <Wrench className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'globe-app':
      return <Globe className="w-7 h-7 text-white" aria-hidden="true" />;
    case 'app-grid':
    default:
      return <LayoutGrid className="w-7 h-7 text-white" aria-hidden="true" />;
  }
}

export const WebAppIcon: React.FC<WebAppIconProps> = ({ iconKey, customImageUrl, name }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = WEB_APP_ICON_THEMES[iconKey] ?? WEB_APP_ICON_THEMES['app-grid'];

  if (customImageUrl && !imgFailed) {
    return (
      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md shrink-0">
        <img
          src={customImageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.badgeGradient} shadow-lg flex items-center justify-center shrink-0 ring-1 ring-white/25 transition-transform duration-200 group-hover:scale-105`}
    >
      {renderVectorAppLogo(iconKey)}
    </div>
  );
};
