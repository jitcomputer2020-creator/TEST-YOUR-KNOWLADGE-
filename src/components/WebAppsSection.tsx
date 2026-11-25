import React from 'react';
import { ArrowUpRight, LayoutGrid } from 'lucide-react';
import { WebAppCardItem } from '../types/assessment';
import { WEB_APP_ICON_THEMES, WebAppIcon } from './WebAppIcon';

interface WebAppsSectionProps {
  webApps: WebAppCardItem[];
}

export const WebAppsSection: React.FC<WebAppsSectionProps> = ({ webApps }) => {
  return (
    <section
      id="web-apps"
      aria-labelledby="web-apps-heading"
      className="bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-xs font-semibold tracking-wider text-[#1D4ED8] mb-3">
              <LayoutGrid className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>PRODUCTIVITY &amp; CREATIVE TOOLS</span>
            </div>

            <h2
              id="web-apps-heading"
              className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0B1E47] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              JIT Web Apps
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Launch powerful browser-based creative studios and student productivity applications
              built for JIT learners.
            </p>
          </div>

          <div className="font-mono text-xs font-semibold tabular-nums text-blue-700 shrink-0">
            {webApps.length} {webApps.length === 1 ? 'Web App' : 'Web Apps'}
          </div>
        </div>

        {/* Web Apps Grid */}
        {webApps.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
            No web apps are currently listed. Add apps anytime from the Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webApps.map((app, index) => {
              const theme =
                WEB_APP_ICON_THEMES[app.iconKey] ?? WEB_APP_ICON_THEMES['app-grid'];
              const paddedNum = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={app.id}
                  className="card-3d-lift flex flex-col justify-between rounded-2xl p-6 bg-white border border-slate-200 shadow-[0_6px_20px_-6px_rgba(11,30,71,0.08)] hover:shadow-[0_18px_36px_-10px_rgba(29,78,216,0.18)] hover:border-blue-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <WebAppIcon
                        iconKey={app.iconKey}
                        customImageUrl={app.customImageUrl}
                        name={app.name}
                      />
                      <span className="font-mono text-xs font-semibold tabular-nums text-slate-400">
                        #{paddedNum}
                      </span>
                    </div>

                    <div className={`text-xs font-semibold tracking-wide mb-1.5 ${theme.categoryText}`}>
                      {app.category || 'Web App'} <span aria-hidden="true">·</span> Browser Studio
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#0B1E47] tracking-tight leading-snug">
                      {app.name}
                    </h3>

                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#0B1E47] to-[#1D4ED8] hover:from-[#102A63] hover:to-[#1E40AF] text-white font-display font-semibold text-sm shadow-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      <span>Open App</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
