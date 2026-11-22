import React from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ClipboardCheck,
  Cpu,
  FileSpreadsheet,
  Globe,
  Monitor,
  Trophy,
  Zap,
} from 'lucide-react';
import { CATEGORY_META } from '../data/defaultPortalData';
import { TestCardItem } from '../types/assessment';

interface AssessmentCardProps {
  item: TestCardItem;
  indexNumber: number;
}

function renderCardIcon(iconKey: string | undefined, isInteractive: boolean) {
  const iconClass = isInteractive ? 'w-5 h-5 text-amber-300' : 'w-5 h-5 text-[#1D4ED8]';

  switch (iconKey) {
    case 'trophy':
      return <Trophy className={iconClass} aria-hidden="true" />;
    case 'zap':
      return <Zap className={iconClass} aria-hidden="true" />;
    case 'monitor':
      return <Monitor className={iconClass} aria-hidden="true" />;
    case 'file-spreadsheet':
      return <FileSpreadsheet className={iconClass} aria-hidden="true" />;
    case 'globe':
      return <Globe className={iconClass} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={iconClass} aria-hidden="true" />;
    case 'book-open':
      return <BookOpen className={iconClass} aria-hidden="true" />;
    case 'clipboard-check':
    default:
      return <ClipboardCheck className={iconClass} aria-hidden="true" />;
  }
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({ item, indexNumber }) => {
  const isInteractive = item.category === 'interactive';
  const meta = CATEGORY_META[item.category];
  const paddedNumber = String(indexNumber).padStart(2, '0');

  if (isInteractive) {
    return (
      <article className="card-3d-lift flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#0A1A3F] via-[#102A63] to-[#163D8C] text-white border border-blue-700/60 shadow-[0_10px_28px_-8px_rgba(11,30,71,0.45)] hover:shadow-[0_18px_36px_-10px_rgba(11,30,71,0.55)] hover:border-amber-400/60">
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              {renderCardIcon(item.iconKey, true)}
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-amber-300/90">
              #{paddedNumber}
            </span>
          </div>

          <div className="text-xs font-medium text-amber-300/95 tracking-wide mb-1.5">
            {meta.shortLabel} <span aria-hidden="true">·</span> Live MCQ
          </div>

          <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
            {item.title}
          </h3>

          <p className="mt-2.5 text-sm text-blue-100/85 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-[#0A1A3F] font-display font-bold text-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Start Test</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="card-3d-lift flex flex-col justify-between rounded-xl p-6 bg-white text-slate-900 border border-slate-200 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_32px_-8px_rgba(29,78,216,0.16)] hover:border-blue-300">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            {renderCardIcon(item.iconKey, false)}
          </div>
          <span className="font-mono text-xs font-semibold tabular-nums text-slate-400">
            #{paddedNumber}
          </span>
        </div>

        <div className="text-xs font-medium text-blue-700 mb-1.5">
          {meta.shortLabel} <span aria-hidden="true">·</span> Online Form
        </div>

        <h3 className="font-display font-bold text-lg text-[#0B1E47] tracking-tight leading-snug">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-display font-semibold text-sm transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <span>Start Test</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};
