import React from 'react';
import { Search, X } from 'lucide-react';
import { FilterTab } from '../types/assessment';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeTab: FilterTab;
  onTabChange: (tab: FilterTab) => void;
  counts: {
    all: number;
    interactive: number;
    topic: number;
    practice: number;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: `All Tests (${counts.all})` },
    { id: 'interactive', label: 'Interactive Quizzes' },
    { id: 'topic', label: 'Topic-Wise Tests' },
    { id: 'practice', label: 'Practice Sets (1–9)' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#071633] via-[#0F2C6B] to-[#1D4ED8] text-white">
      <div className="hero-grid-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#071633]/35 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block px-3.5 py-1.5 rounded-md bg-white/10 border border-white/20 text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-blue-100 mb-5">
            ONLINE ASSESSMENT &amp; PRACTICE PORTAL
          </div>

          <h1
            className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[54px] tracking-tight text-white leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            TEST YOUR KNOWLEDGE
          </h1>

          <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-blue-100/95 leading-relaxed max-w-2xl mx-auto">
            Evaluate your computer skills with our interactive MCQ challenges, topic-wise
            assessments, and practice test series. Click any test below to launch in a new window.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <label htmlFor="assessment-search" className="sr-only">
              Search assessments by name
            </label>
            <div className="relative flex items-center">
              <Search
                className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="assessment-search"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search assessments (e.g., MS Office, Internet, Test 5)..."
                className="w-full h-12 sm:h-[52px] pl-11 pr-11 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium shadow-lg shadow-blue-950/30 border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute right-3 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Assessment Categories"
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    isActive
                      ? 'bg-white text-[#0B1E47] shadow-md'
                      : 'bg-white/10 text-blue-50 border border-white/15 hover:bg-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
