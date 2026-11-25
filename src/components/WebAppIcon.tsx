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
      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.badgeGradient} shadow-lg flex items-center justify-center shrink-0 ring-1 ring-white/25`}
    >
      {renderVectorAppLogo(iconKey)}
    </div>
  );
};
