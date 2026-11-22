import { useEffect, useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AssessmentCard } from './components/AssessmentCard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PinModal } from './components/PinModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import {
  CATEGORY_META,
  DEFAULT_BRANDING,
  DEFAULT_PORTAL_STATE,
  DEFAULT_TESTS,
  STORAGE_KEY,
} from './data/defaultPortalData';
import {
  AssessmentCategory,
  FilterTab,
  HeaderBranding,
  PortalState,
  TestCardItem,
} from './types/assessment';

function loadPortalState(): PortalState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTAL_STATE;
    const parsed = JSON.parse(raw) as Partial<PortalState>;
    const tests = Array.isArray(parsed.tests) ? parsed.tests : DEFAULT_TESTS;
    const branding =
      parsed.branding && typeof parsed.branding.title === 'string'
        ? {
            title: parsed.branding.title || DEFAULT_BRANDING.title,
            subtitle: parsed.branding.subtitle || DEFAULT_BRANDING.subtitle,
            logoUrl: parsed.branding.logoUrl || DEFAULT_BRANDING.logoUrl,
          }
        : DEFAULT_BRANDING;

    return { tests, branding };
  } catch {
    return DEFAULT_PORTAL_STATE;
  }
}

const ORDERED_CATEGORIES: AssessmentCategory[] = ['interactive', 'topic', 'practice'];

export function App() {
  const [portalState, setPortalState] = useState<PortalState>(() => loadPortalState());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(portalState));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [portalState]);

  const counts = useMemo(() => {
    const interactive = portalState.tests.filter((t) => t.category === 'interactive').length;
    const topic = portalState.tests.filter((t) => t.category === 'topic').length;
    const practice = portalState.tests.filter((t) => t.category === 'practice').length;
    return {
      all: portalState.tests.length,
      interactive,
      topic,
      practice,
    };
  }, [portalState.tests]);

  const filteredTests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return portalState.tests.filter((item) => {
      const matchesCategory = activeTab === 'all' || item.category === activeTab;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        CATEGORY_META[item.category].label.toLowerCase().includes(q)
      );
    });
  }, [portalState.tests, activeTab, searchQuery]);

  // Global sequential numbering lookup so cards retain consistent #01-#16 index
  const globalIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    portalState.tests.forEach((item, idx) => {
      map.set(item.id, idx + 1);
    });
    return map;
  }, [portalState.tests]);

  const handleAddTest = (newTest: Omit<TestCardItem, 'id'>) => {
    const created: TestCardItem = {
      ...newTest,
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    setPortalState((prev) => ({
      ...prev,
      tests: [...prev.tests, created],
    }));
  };

  const handleUpdateTest = (updated: TestCardItem) => {
    setPortalState((prev) => ({
      ...prev,
      tests: prev.tests.map((item) => (item.id === updated.id ? updated : item)),
    }));
  };

  const handleDeleteTest = (id: string) => {
    setPortalState((prev) => ({
      ...prev,
      tests: prev.tests.filter((item) => item.id !== id),
    }));
  };

  const handleUpdateBranding = (branding: HeaderBranding) => {
    setPortalState((prev) => ({
      ...prev,
      branding,
    }));
  };

  const handleResetDefaults = () => {
    setPortalState(DEFAULT_PORTAL_STATE);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PORTAL_STATE));
    } catch {
      // Ignore storage errors
    }
  };

  const showGroupedSections = activeTab === 'all' && searchQuery.trim() === '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header branding={portalState.branding} onAdminTrigger={() => setPinModalOpen(true)} />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
        />

        <section
          id="assessments"
          aria-label="Assessment Directory"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          {filteredTests.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-14 px-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-6 h-6" aria-hidden="true" />
              </div>
              <h2 className="font-display font-bold text-lg text-[#0B1E47]">
                No matching tests found
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                No assessments matched &ldquo;{searchQuery}&rdquo;. Try another keyword or clear
                your active filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-5 px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
              >
                Show All Tests
              </button>
            </div>
          ) : showGroupedSections ? (
            <div className="space-y-14">
              {ORDERED_CATEGORIES.map((categoryKey) => {
                const items = filteredTests.filter((t) => t.category === categoryKey);
                if (items.length === 0) return null;
                const meta = CATEGORY_META[categoryKey];

                return (
                  <div key={categoryKey}>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-slate-200">
                      <div>
                        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0B1E47] tracking-tight">
                          {meta.label}
                        </h2>
                        <p className="text-sm text-slate-600 mt-1">{meta.subtitle}</p>
                      </div>
                      <span className="font-mono text-xs font-semibold tabular-nums text-blue-700 shrink-0">
                        {items.length} {items.length === 1 ? 'Assessment' : 'Assessments'}
                      </span>
                    </div>

                    <div
                      className={`grid gap-6 ${
                        categoryKey === 'topic'
                          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                    >
                      {items.map((item) => (
                        <AssessmentCard
                          key={item.id}
                          item={item}
                          indexNumber={globalIndexMap.get(item.id) ?? 1}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 mb-6 border-b border-slate-200">
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0B1E47] tracking-tight">
                    {activeTab === 'all' ? 'Search Results' : CATEGORY_META[activeTab].label}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {activeTab === 'all'
                      ? `Showing assessments matching "${searchQuery.trim()}"`
                      : CATEGORY_META[activeTab].subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold tabular-nums text-blue-700 shrink-0">
                  {filteredTests.length}{' '}
                  {filteredTests.length === 1 ? 'Assessment' : 'Assessments'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTests.map((item) => (
                  <AssessmentCard
                    key={item.id}
                    item={item}
                    indexNumber={globalIndexMap.get(item.id) ?? 1}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer branding={portalState.branding} />
      <WhatsAppButton />

      <PinModal
        isOpen={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        onSuccess={() => {
          setPinModalOpen(false);
          setAdminPanelOpen(true);
        }}
      />

      <AdminPanelModal
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        tests={portalState.tests}
        branding={portalState.branding}
        onAddTest={handleAddTest}
        onUpdateTest={handleUpdateTest}
        onDeleteTest={handleDeleteTest}
        onUpdateBranding={handleUpdateBranding}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}

export default App;
