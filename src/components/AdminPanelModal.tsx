import React, { useState } from 'react';
import {
  Check,
  Gamepad2,
  Image as ImageIcon,
  LayoutGrid,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  CATEGORY_META,
  GAME_ICON_OPTIONS,
  WEB_APP_ICON_OPTIONS,
} from '../data/defaultPortalData';
import {
  AssessmentCategory,
  GameCardItem,
  GameIconKey,
  HeaderBranding,
  TestCardItem,
  WebAppCardItem,
  WebAppIconKey,
} from '../types/assessment';
import { GameIcon } from './GameIcon';
import { WebAppIcon } from './WebAppIcon';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  tests: TestCardItem[];
  games: GameCardItem[];
  webApps: WebAppCardItem[];
  branding: HeaderBranding;
  onAddTest: (item: Omit<TestCardItem, 'id'>) => void;
  onUpdateTest: (item: TestCardItem) => void;
  onDeleteTest: (id: string) => void;
  onAddGame: (item: Omit<GameCardItem, 'id'>) => void;
  onUpdateGame: (item: GameCardItem) => void;
  onDeleteGame: (id: string) => void;
  onAddWebApp: (item: Omit<WebAppCardItem, 'id'>) => void;
  onUpdateWebApp: (item: WebAppCardItem) => void;
  onDeleteWebApp: (id: string) => void;
  onUpdateBranding: (branding: HeaderBranding) => void;
  onResetDefaults: () => void;
}

type AdminSectionTab = 'tests' | 'games' | 'webapps' | 'branding';

const CATEGORY_DEFAULT_ICON: Record<AssessmentCategory, string> = {
  interactive: 'trophy',
  topic: 'book-open',
  practice: 'clipboard-check',
};

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  tests,
  games,
  webApps,
  branding,
  onAddTest,
  onUpdateTest,
  onDeleteTest,
  onAddGame,
  onUpdateGame,
  onDeleteGame,
  onAddWebApp,
  onUpdateWebApp,
  onDeleteWebApp,
  onUpdateBranding,
  onResetDefaults,
}) => {
  const [sectionTab, setSectionTab] = useState<AdminSectionTab>('tests');

  // Add / Edit Test Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AssessmentCategory>('topic');
  const [url, setUrl] = useState('');
  const [formError, setFormError] = useState('');

  // Add / Edit Game Form State
  const [editingGameId, setEditingGameId] = useState<string | null>(null);
  const [gameTitle, setGameTitle] = useState('');
  const [gameGenre, setGameGenre] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [gameIconKey, setGameIconKey] = useState<GameIconKey>('gamepad');
  const [gameCustomImageUrl, setGameCustomImageUrl] = useState('');
  const [gameFormError, setGameFormError] = useState('');

  // Add / Edit Web App Form State
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [appName, setAppName] = useState('');
  const [appCategory, setAppCategory] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appIconKey, setAppIconKey] = useState<WebAppIconKey>('app-grid');
  const [appCustomImageUrl, setAppCustomImageUrl] = useState('');
  const [appFormError, setAppFormError] = useState('');

  // Branding Form State
  const [brandTitle, setBrandTitle] = useState(branding.title);
  const [brandSubtitle, setBrandSubtitle] = useState(branding.subtitle);
  const [brandLogoUrl, setBrandLogoUrl] = useState(branding.logoUrl);
  const [brandingSaved, setBrandingSaved] = useState(false);

  // Reset confirmation state (no window.confirm)
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const resetTestForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCategory('topic');
    setUrl('');
    setFormError('');
  };

  const resetGameForm = () => {
    setEditingGameId(null);
    setGameTitle('');
    setGameGenre('');
    setGameUrl('');
    setGameIconKey('gamepad');
    setGameCustomImageUrl('');
    setGameFormError('');
  };

  const resetAppForm = () => {
    setEditingAppId(null);
    setAppName('');
    setAppCategory('');
    setAppUrl('');
    setAppDescription('');
    setAppIconKey('app-grid');
    setAppCustomImageUrl('');
    setAppFormError('');
  };

  const handleEditClick = (item: TestCardItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setUrl(item.url);
    setFormError('');
  };

  const handleEditGameClick = (item: GameCardItem) => {
    setEditingGameId(item.id);
    setGameTitle(item.title);
    setGameGenre(item.genre);
    setGameUrl(item.url);
    setGameIconKey(item.iconKey);
    setGameCustomImageUrl(item.customImageUrl ?? '');
    setGameFormError('');
  };

  const handleEditAppClick = (item: WebAppCardItem) => {
    setEditingAppId(item.id);
    setAppName(item.name);
    setAppCategory(item.category);
    setAppUrl(item.url);
    setAppDescription(item.description);
    setAppIconKey(item.iconKey);
    setAppCustomImageUrl(item.customImageUrl ?? '');
    setAppFormError('');
  };

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanDesc = description.trim();
    const cleanUrl = url.trim();

    if (!cleanTitle || !cleanUrl) {
      setFormError('Please provide both a Test Title and a valid Assessment URL.');
      return;
    }

    if (!/^https?:\/\//i.test(cleanUrl)) {
      setFormError('URL must start with https:// or http://');
      return;
    }

    if (editingId) {
      const existing = tests.find((t) => t.id === editingId);
      onUpdateTest({
        id: editingId,
        title: cleanTitle,
        description:
          cleanDesc ||
          'Online computer assessment module from JIT Computer Training Institute.',
        category,
        url: cleanUrl,
        iconKey: existing?.iconKey ?? CATEGORY_DEFAULT_ICON[category],
      });
    } else {
      onAddTest({
        title: cleanTitle,
        description:
          cleanDesc ||
          'Online computer assessment module from JIT Computer Training Institute.',
        category,
        url: cleanUrl,
        iconKey: CATEGORY_DEFAULT_ICON[category],
      });
    }

    resetTestForm();
  };

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = gameTitle.trim();
    const cleanGenre = gameGenre.trim();
    const cleanUrl = gameUrl.trim();
    const cleanCustomImg = gameCustomImageUrl.trim();

    if (!cleanTitle || !cleanGenre || !cleanUrl) {
      setGameFormError('Please provide Game Title, Genre, and a valid Game URL.');
      return;
    }

    if (!/^https?:\/\//i.test(cleanUrl)) {
      setGameFormError('Game URL must start with https:// or http://');
      return;
    }

    const payload: Omit<GameCardItem, 'id'> = {
      title: cleanTitle,
      genre: cleanGenre,
      url: cleanUrl,
      iconKey: gameIconKey,
      customImageUrl: cleanCustomImg || undefined,
    };

    if (editingGameId) {
      onUpdateGame({
        id: editingGameId,
        ...payload,
      });
    } else {
      onAddGame(payload);
    }

    resetGameForm();
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = appName.trim();
    const cleanCategory = appCategory.trim() || 'Web App';
    const cleanUrl = appUrl.trim();
    const cleanDescription = appDescription.trim();
    const cleanCustomImg = appCustomImageUrl.trim();

    if (!cleanName || !cleanUrl) {
      setAppFormError('Please provide both an App Name and a valid App URL.');
      return;
    }

    if (!/^https?:\/\//i.test(cleanUrl)) {
      setAppFormError('App URL must start with https:// or http://');
      return;
    }

    const payload: Omit<WebAppCardItem, 'id'> = {
      name: cleanName,
      category: cleanCategory,
      url: cleanUrl,
      description:
        cleanDescription ||
        'Browser-based utility and creative tool for JIT Computer Training Institute students.',
      iconKey: appIconKey,
      customImageUrl: cleanCustomImg || undefined,
    };

    if (editingAppId) {
      onUpdateWebApp({
        id: editingAppId,
        ...payload,
      });
    } else {
      onAddWebApp(payload);
    }

    resetAppForm();
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBrandLogoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGameImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setGameCustomImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAppImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAppCustomImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBrandingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBranding({
      title: brandTitle.trim() || 'JIT Computer Training Institute',
      subtitle: brandSubtitle.trim() || 'Jharna Institute of Technology',
      logoUrl: brandLogoUrl.trim() || branding.logoUrl,
    });
    setBrandingSaved(true);
    window.setTimeout(() => setBrandingSaved(false), 2200);
  };

  const handleConfirmReset = () => {
    onResetDefaults();
    setConfirmReset(false);
    resetTestForm();
    resetGameForm();
    resetAppForm();
    setBrandTitle('JIT Computer Training Institute');
    setBrandSubtitle('Jharna Institute of Technology');
    setBrandLogoUrl('/src/assets/images/jit_institute_logo_1795330747046.jpg');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#071633]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
    >
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
        {/* Top Modal Header */}
        <div className="bg-gradient-to-r from-[#0B1E47] to-[#1D4ED8] px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div>
            <h2 id="admin-panel-title" className="font-display font-bold text-lg sm:text-xl">
              Admin Portal Manager
            </h2>
            <p className="text-xs text-blue-100/85">
              Changes save automatically in browser storage (jit_quiz_portal_v1)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Admin Panel"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white/85 hover:text-white hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sub-Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSectionTab('tests')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                sectionTab === 'tests'
                  ? 'bg-[#0B1E47] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Manage Tests ({tests.length})
            </button>
            <button
              type="button"
              onClick={() => setSectionTab('games')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                sectionTab === 'games'
                  ? 'bg-[#0B1E47] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Manage Games ({games.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setSectionTab('webapps')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                sectionTab === 'webapps'
                  ? 'bg-[#0B1E47] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Manage Web Apps ({webApps.length})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSectionTab('branding');
                setBrandTitle(branding.title);
                setBrandSubtitle(branding.subtitle);
                setBrandLogoUrl(branding.logoUrl);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                sectionTab === 'branding'
                  ? 'bg-[#0B1E47] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Logo &amp; Header Text
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset to Default</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1">
                <span className="text-xs font-semibold text-red-800">
                  Restore all defaults?
                </span>
                <button
                  type="button"
                  onClick={handleConfirmReset}
                  className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-1 rounded text-xs font-semibold text-slate-600 hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {sectionTab === 'tests' && (
            <>
              {/* Add / Edit Test Form */}
              <form
                onSubmit={handleTestSubmit}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#0B1E47]">
                    {editingId ? 'Edit Assessment Card' : 'Add New Test Card'}
                  </h3>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetTestForm}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="admin-test-title"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Test Title *
                    </label>
                    <input
                      id="admin-test-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., Tally Prime MCQ"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-test-category"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Category *
                    </label>
                    <select
                      id="admin-test-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as AssessmentCategory)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="interactive">Interactive Quizzes (Navy + Gold Card)</option>
                      <option value="topic">Topic-Wise Tests (White + Royal Blue Card)</option>
                      <option value="practice">Practice Sets (White + Royal Blue Card)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="admin-test-url"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Assessment Link (URL) *
                  </label>
                  <input
                    id="admin-test-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-test-desc"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="admin-test-desc"
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe topics covered in this test..."
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {formError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
                  >
                    {editingId ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Save Changes</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Add Test Card</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Existing Tests List */}
              <div>
                <h3 className="font-display font-bold text-sm text-[#0B1E47] mb-3">
                  Published Assessments ({tests.length})
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {tests.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No tests currently configured. Add a test above or reset to defaults.
                    </div>
                  ) : (
                    tests.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-blue-700 mb-0.5">
                            <span>{CATEGORY_META[item.category].label}</span>
                          </div>
                          <div className="font-display font-bold text-sm text-[#0B1E47] truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">{item.url}</div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditClick(item)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (editingId === item.id) resetTestForm();
                              onDeleteTest(item.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {sectionTab === 'games' && (
            <>
              {/* Add / Edit Game Form */}
              <form
                onSubmit={handleGameSubmit}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#0B1E47]">
                    {editingGameId ? 'Edit Game Card' : 'Add New Game Card'}
                  </h3>
                  {editingGameId && (
                    <button
                      type="button"
                      onClick={resetGameForm}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="admin-game-title"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Game Title *
                    </label>
                    <input
                      id="admin-game-title"
                      type="text"
                      value={gameTitle}
                      onChange={(e) => setGameTitle(e.target.value)}
                      placeholder="e.g., JIT Space Drift"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-game-genre"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Genre *
                    </label>
                    <input
                      id="admin-game-genre"
                      type="text"
                      value={gameGenre}
                      onChange={(e) => setGameGenre(e.target.value)}
                      placeholder="e.g., 3D Racing, Classic Arcade, Action Shooter"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="admin-game-url"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Game Link (URL) *
                  </label>
                  <input
                    id="admin-game-url"
                    type="url"
                    value={gameUrl}
                    onChange={(e) => setGameUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <label
                      htmlFor="admin-game-icon"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Select Gaming Icon
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-xl bg-[#0B1E47] shrink-0">
                        <GameIcon
                          iconKey={gameIconKey}
                          customImageUrl={gameCustomImageUrl || undefined}
                          title={gameTitle || 'Game Preview'}
                        />
                      </div>
                      <select
                        id="admin-game-icon"
                        value={gameIconKey}
                        onChange={(e) => setGameIconKey(e.target.value as GameIconKey)}
                        className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {GAME_ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="admin-game-custom-img"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Custom Icon Image URL (Optional)
                    </label>
                    <div className="space-y-2">
                      <input
                        id="admin-game-custom-img"
                        type="text"
                        value={gameCustomImageUrl}
                        onChange={(e) => setGameCustomImageUrl(e.target.value)}
                        placeholder="https://... or upload image below"
                        className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Upload Icon</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleGameImageFileChange}
                            className="sr-only"
                          />
                        </label>
                        {gameCustomImageUrl && (
                          <button
                            type="button"
                            onClick={() => setGameCustomImageUrl('')}
                            className="text-xs font-semibold text-slate-500 hover:text-red-600"
                          >
                            Clear Custom Image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {gameFormError && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {gameFormError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
                  >
                    {editingGameId ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Save Game Changes</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Add Game Card</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Existing Games List */}
              <div>
                <h3 className="font-display font-bold text-sm text-[#0B1E47] mb-3">
                  Published Games ({games.length})
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {games.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No games currently configured. Add a game above or reset to defaults.
                    </div>
                  ) : (
                    games.map((game) => (
                      <div
                        key={game.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="p-1 rounded-xl bg-[#0B1E47] shrink-0">
                            <GameIcon
                              iconKey={game.iconKey}
                              customImageUrl={game.customImageUrl}
                              title={game.title}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-blue-700 mb-0.5">
                              {game.genre}
                            </div>
                            <div className="font-display font-bold text-sm text-[#0B1E47] truncate">
                              {game.title}
                            </div>
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              {game.url}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditGameClick(game)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (editingGameId === game.id) resetGameForm();
                              onDeleteGame(game.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {sectionTab === 'webapps' && (
            <>
              {/* Add / Edit Web App Form */}
              <form
                onSubmit={handleAppSubmit}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#0B1E47]">
                    {editingAppId ? 'Edit Web App Card' : 'Add New Web App'}
                  </h3>
                  {editingAppId && (
                    <button
                      type="button"
                      onClick={resetAppForm}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="admin-app-name"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      App Name *
                    </label>
                    <input
                      id="admin-app-name"
                      type="text"
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                      placeholder="e.g., JIT VIDEO EDITOR"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-app-category"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Category / Tag
                    </label>
                    <input
                      id="admin-app-category"
                      type="text"
                      value={appCategory}
                      onChange={(e) => setAppCategory(e.target.value)}
                      placeholder="e.g., Media Studio, Code Tool, Utility"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="admin-app-url"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    App URL *
                  </label>
                  <input
                    id="admin-app-url"
                    type="url"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-app-desc"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Short Description
                  </label>
                  <textarea
                    id="admin-app-desc"
                    rows={2}
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="Briefly describe what this web app does..."
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div>
                    <label
                      htmlFor="admin-app-icon"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Icon Style
                    </label>
                    <div className="flex items-center gap-3">
                      <WebAppIcon
                        iconKey={appIconKey}
                        customImageUrl={appCustomImageUrl || undefined}
                        name={appName || 'App Preview'}
                      />
                      <select
                        id="admin-app-icon"
                        value={appIconKey}
                        onChange={(e) => setAppIconKey(e.target.value as WebAppIconKey)}
                        className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {WEB_APP_ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="admin-app-custom-img"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Custom Icon Image URL (Optional)
                    </label>
                    <div className="space-y-2">
                      <input
                        id="admin-app-custom-img"
                        type="text"
                        value={appCustomImageUrl}
                        onChange={(e) => setAppCustomImageUrl(e.target.value)}
                        placeholder="https://... or upload image below"
                        className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Upload Icon</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAppImageFileChange}
                            className="sr-only"
                          />
                        </label>
                        {appCustomImageUrl && (
                          <button
                            type="button"
                            onClick={() => setAppCustomImageUrl('')}
                            className="text-xs font-semibold text-slate-500 hover:text-red-600"
                          >
                            Clear Custom Image
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {appFormError && (
                  <p role="alert" className="text-xs font-semibold text-red-600">
                    {appFormError}
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
                  >
                    {editingAppId ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Save App Changes</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Add Web App</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Existing Web Apps List */}
              <div>
                <h3 className="font-display font-bold text-sm text-[#0B1E47] mb-3">
                  Published Web Apps ({webApps.length})
                </h3>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {webApps.length === 0 ? (
                    <div className="p-6 text-center text-sm text-slate-500">
                      No web apps currently configured. Add a web app above or reset to defaults.
                    </div>
                  ) : (
                    webApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <WebAppIcon
                            iconKey={app.iconKey}
                            customImageUrl={app.customImageUrl}
                            name={app.name}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-blue-700 mb-0.5">
                              {app.category || 'Web App'}
                            </div>
                            <div className="font-display font-bold text-sm text-[#0B1E47] truncate">
                              {app.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate mt-0.5">{app.url}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditAppClick(app)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (editingAppId === app.id) resetAppForm();
                              onDeleteWebApp(app.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {sectionTab === 'branding' && (
            <form onSubmit={handleBrandingSubmit} className="space-y-5 max-w-xl">
              <div>
                <label
                  htmlFor="brand-title-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Institute Header Title
                </label>
                <input
                  id="brand-title-input"
                  type="text"
                  value={brandTitle}
                  onChange={(e) => setBrandTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label
                  htmlFor="brand-subtitle-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Institute Subtitle
                </label>
                <input
                  id="brand-subtitle-input"
                  type="text"
                  value={brandSubtitle}
                  onChange={(e) => setBrandSubtitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="brand-logo-url"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Logo Image URL or Upload New Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                    {brandLogoUrl ? (
                      <img
                        src={brandLogoUrl}
                        alt="Logo Preview"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      id="brand-logo-url"
                      type="text"
                      value={brandLogoUrl}
                      onChange={(e) => setBrandLogoUrl(e.target.value)}
                      placeholder="Paste image URL or upload below"
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Upload Logo File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-sm font-semibold transition-colors"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Save Header &amp; Logo</span>
                </button>
                {brandingSaved && (
                  <span className="text-xs font-semibold text-emerald-700">
                    Branding updated
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
