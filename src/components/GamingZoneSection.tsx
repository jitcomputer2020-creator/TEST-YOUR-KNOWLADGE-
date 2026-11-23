import React from 'react';
import { ArrowUpRight, Gamepad2, Play } from 'lucide-react';
import { GameCardItem } from '../types/assessment';
import { GAME_ICON_THEMES, GameIcon } from './GameIcon';

interface GamingZoneSectionProps {
  games: GameCardItem[];
}

export const GamingZoneSection: React.FC<GamingZoneSectionProps> = ({ games }) => {
  return (
    <section
      id="gaming-zone"
      aria-labelledby="gaming-zone-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#081736] via-[#0B1E47] to-[#071633] text-white border-t border-blue-900/70"
    >
      <div className="hero-grid-pattern absolute inset-0 opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-xs font-semibold tracking-wider text-amber-300 mb-3">
              <Gamepad2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>GAMING ZONE</span>
            </div>

            <h2
              id="gaming-zone-heading"
              className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              JIT Gaming Zone — Play &amp; Relax
            </h2>

            <p className="mt-2 text-sm sm:text-base text-blue-100/85 max-w-2xl">
              Take a break after your test and enjoy our interactive browser games!
            </p>
          </div>

          <div className="font-mono text-xs font-semibold tabular-nums text-blue-200/90 shrink-0">
            {games.length} {games.length === 1 ? 'Browser Game' : 'Browser Games'}
          </div>
        </div>

        {/* Games Grid */}
        {games.length === 0 ? (
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center text-sm text-blue-100/80">
            No games are currently listed. Add games anytime from the Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {games.map((game, index) => {
              const theme = GAME_ICON_THEMES[game.iconKey] ?? GAME_ICON_THEMES.gamepad;
              const paddedNum = String(index + 1).padStart(2, '0');

              return (
                <a
                  key={game.id}
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Play ${game.title} (${game.genre}) in a new tab`}
                  className={`game-card-hover group relative flex flex-col justify-between rounded-xl p-5 sm:p-6 bg-gradient-to-br from-[#0F275C]/95 via-[#0C1F4A] to-[#081534] border border-blue-700/50 shadow-[0_10px_28px_-10px_rgba(3,9,28,0.7)] ${theme.glow} focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <GameIcon
                        iconKey={game.iconKey}
                        customImageUrl={game.customImageUrl}
                        title={game.title}
                      />
                      <span className="font-mono text-xs font-semibold tabular-nums text-blue-300/70 group-hover:text-amber-300 transition-colors">
                        #{paddedNum}
                      </span>
                    </div>

                    <div className={`text-xs font-semibold tracking-wide mb-1 ${theme.genreText}`}>
                      {game.genre}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
                      {game.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] group-hover:from-amber-400 group-hover:to-amber-300 text-white group-hover:text-[#0A1A3F] font-display font-bold text-sm shadow-sm transition-colors whitespace-nowrap">
                      <Play className="w-3.5 h-3.5 fill-current shrink-0" aria-hidden="true" />
                      <span>Play Now</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
