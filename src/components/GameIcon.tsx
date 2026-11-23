import React, { useState } from 'react';
import {
  Bike,
  Car,
  Compass,
  Crosshair,
  Flag,
  Gamepad2,
  Gauge,
  Rocket,
  Shield,
  Sparkles,
} from 'lucide-react';
import { GameIconKey } from '../types/assessment';

interface GameIconProps {
  iconKey: GameIconKey;
  customImageUrl?: string;
  title: string;
}

export const GAME_ICON_THEMES: Record<
  GameIconKey,
  { container: string; glow: string; genreText: string }
> = {
  bike: {
    container: 'from-amber-500 to-orange-600 text-white shadow-amber-500/30',
    glow: 'group-hover:border-amber-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(245,158,11,0.35)]',
    genreText: 'text-amber-300',
  },
  car: {
    container: 'from-blue-500 to-indigo-600 text-white shadow-blue-500/30',
    glow: 'group-hover:border-blue-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(59,130,246,0.38)]',
    genreText: 'text-sky-300',
  },
  crosshair: {
    container: 'from-rose-500 to-red-600 text-white shadow-rose-500/30',
    glow: 'group-hover:border-rose-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(244,63,94,0.36)]',
    genreText: 'text-rose-300',
  },
  'star-gamepad': {
    container: 'from-yellow-400 to-amber-500 text-[#0B1E47] shadow-yellow-400/30',
    glow: 'group-hover:border-yellow-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(250,204,21,0.35)]',
    genreText: 'text-yellow-300',
  },
  flag: {
    container: 'from-cyan-500 to-blue-600 text-white shadow-cyan-500/30',
    glow: 'group-hover:border-cyan-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(6,182,212,0.36)]',
    genreText: 'text-cyan-300',
  },
  snake: {
    container: 'from-emerald-500 to-teal-600 text-white shadow-emerald-500/30',
    glow: 'group-hover:border-emerald-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(16,185,129,0.38)]',
    genreText: 'text-emerald-300',
  },
  rocket: {
    container: 'from-indigo-500 to-sky-500 text-white shadow-indigo-500/30',
    glow: 'group-hover:border-sky-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(56,189,248,0.36)]',
    genreText: 'text-sky-300',
  },
  gauge: {
    container: 'from-orange-500 to-red-500 text-white shadow-orange-500/30',
    glow: 'group-hover:border-orange-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(249,115,22,0.36)]',
    genreText: 'text-orange-300',
  },
  compass: {
    container: 'from-teal-500 to-emerald-600 text-white shadow-teal-500/30',
    glow: 'group-hover:border-teal-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(20,184,166,0.36)]',
    genreText: 'text-teal-300',
  },
  shield: {
    container: 'from-slate-600 to-blue-700 text-amber-300 shadow-blue-500/30',
    glow: 'group-hover:border-amber-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(245,158,11,0.32)]',
    genreText: 'text-amber-300',
  },
  gamepad: {
    container: 'from-blue-600 to-indigo-700 text-white shadow-blue-500/30',
    glow: 'group-hover:border-blue-400/60 group-hover:shadow-[0_14px_34px_-8px_rgba(59,130,246,0.36)]',
    genreText: 'text-blue-300',
  },
};

function renderVectorIcon(iconKey: GameIconKey) {
  switch (iconKey) {
    case 'bike':
      return <Bike className="w-6 h-6" aria-hidden="true" />;
    case 'car':
      return <Car className="w-6 h-6" aria-hidden="true" />;
    case 'crosshair':
      return <Crosshair className="w-6 h-6" aria-hidden="true" />;
    case 'star-gamepad':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
          <path
            d="M12 2.5L14.7 8.1L20.9 9L16.4 13.3L17.5 19.5L12 16.5L6.5 19.5L7.6 13.3L3.1 9L9.3 8.1L12 2.5Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="9.8" cy="11.2" r="1" fill="#0B1E47" />
          <circle cx="14.2" cy="11.2" r="1" fill="#0B1E47" />
        </svg>
      );
    case 'flag':
      return <Flag className="w-6 h-6" aria-hidden="true" />;
    case 'snake':
      return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
          <path
            d="M5 17C5 14.8 6.8 13 9 13H14C16.2 13 18 11.2 18 9C18 6.8 16.2 5 14 5H10C8.3 5 7 6.3 7 8C7 9.1 7.9 10 9 10H12"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="18.5" cy="9" r="2.2" fill="currentColor" />
          <circle cx="19.3" cy="8.5" r="0.6" fill="#064E3B" />
          <path d="M20.7 9L22.5 8.2M20.7 9L22.5 9.8" stroke="#FCA5A5" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="5" cy="17" r="1.4" fill="currentColor" />
        </svg>
      );
    case 'rocket':
      return <Rocket className="w-6 h-6" aria-hidden="true" />;
    case 'gauge':
      return <Gauge className="w-6 h-6" aria-hidden="true" />;
    case 'compass':
      return <Compass className="w-6 h-6" aria-hidden="true" />;
    case 'shield':
      return <Shield className="w-6 h-6" aria-hidden="true" />;
    case 'gamepad':
    default:
      return <Gamepad2 className="w-6 h-6" aria-hidden="true" />;
  }
}

export const GameIcon: React.FC<GameIconProps> = ({ iconKey, customImageUrl, title }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const theme = GAME_ICON_THEMES[iconKey] ?? GAME_ICON_THEMES.gamepad;

  if (customImageUrl && !imgFailed) {
    return (
      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-slate-900 shadow-lg shrink-0">
        <img
          src={customImageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.container} shadow-lg flex items-center justify-center shrink-0 ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105`}
    >
      {renderVectorIcon(iconKey)}
    </div>
  );
};

export { Sparkles };
