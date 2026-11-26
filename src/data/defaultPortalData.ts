import {
  GameCardItem,
  GameIconKey,
  HeaderBranding,
  PortalState,
  TestCardItem,
  WebAppCardItem,
  WebAppIconKey,
} from '../types/assessment';

export const STORAGE_KEY = 'jit_quiz_portal_v1';
export const ADMIN_PIN = '8017462677';

export const DEFAULT_BRANDING: HeaderBranding = {
  title: 'JIT Computer Training Institute',
  subtitle: 'Jharna Institute of Technology',
  logoUrl: '/src/assets/images/jit_institute_logo_1795330747046.jpg',
};

export const DEFAULT_TESTS: TestCardItem[] = [
  // Category 1: Interactive Quizzes
  {
    id: 'interactive-1',
    title: 'COMPUTER QUIZE',
    description:
      'Interactive timed computer quiz covering core IT fundamentals, hardware, software, and practical computing concepts.',
    category: 'interactive',
    url: 'https://glnnrdxl.gensparkspace.com/',
    iconKey: 'trophy',
  },
  {
    id: 'interactive-2',
    title: 'JIT MCQ CHALLENGE',
    description:
      'Dynamic multiple-choice challenge curated by JIT faculty to benchmark speed, accuracy, and exam readiness.',
    category: 'interactive',
    url: 'https://ntxmoume.gensparkspace.com/',
    iconKey: 'zap',
  },
  {
    id: 'interactive-3',
    title: 'JIT COMPUTER',
    description:
      'Comprehensive interactive computer assessment module designed for instant self-evaluation and concept mastery.',
    category: 'interactive',
    url: 'https://cvyctkzq.gensparkspace.com/',
    iconKey: 'monitor',
  },

  // Category 2: Topic-Wise Tests
  {
    id: 'topic-1',
    title: 'MS OFFICE',
    description:
      'Focused assessment on Microsoft Word, Excel formulas, PowerPoint presentations, and essential office productivity tools.',
    category: 'topic',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSf3bRKQxIdep2G5TX88P_6F8FvMJDqrrdlUZKvQIpRyGzEgAA/viewform',
    iconKey: 'file-spreadsheet',
  },
  {
    id: 'topic-2',
    title: 'ABOUT INTERNET',
    description:
      'Evaluate your knowledge of web browsers, networking protocols, email communication, and safe online practices.',
    category: 'topic',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSchfilYGwm_1K-Theb53vRyNgn3K-46mjQY0vSlhdnwzm8yDg/viewform',
    iconKey: 'globe',
  },
  {
    id: 'topic-3',
    title: 'ABOUT COMPUTER PARTS',
    description:
      'Identify input/output devices, CPU architecture, primary and secondary memory, and peripheral hardware components.',
    category: 'topic',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdoiUukkdnfAGDMOijeu3lpjxdnE55ykeuq_cakO8S1zRh1Qw/viewform',
    iconKey: 'cpu',
  },
  {
    id: 'topic-4',
    title: 'MCQ ABOUT BASIC',
    description:
      'Essential foundational questions on operating systems, file management, shortcuts, and introductory computing.',
    category: 'topic',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdMrBkoEYnihIOTAcbrLmMMZNTLZEtO9GJ-0WEm9KoWdAz0wA/viewform',
    iconKey: 'book-open',
  },

  // Category 3: Practice Sets (1-9)
  {
    id: 'practice-1',
    title: 'Test 1',
    description:
      'Practice Test Series Set 1 covering foundational computer awareness and objective exam-style questions.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSee-gY6Kh96EiF685Qh8VaAeooHS9jOgKXxk8AIbH0SAjpkuw/viewform?pli=1',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-2',
    title: 'Test 2',
    description:
      'Practice Test Series Set 2 focused on building problem-solving consistency across core computer syllabus topics.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSciXVxTkrfYmxU3jnrhwUrWk0ApZF04WH4qVzXPCPU6ztyhgw/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-3',
    title: 'Test 3',
    description:
      'Practice Test Series Set 3 featuring mixed-difficulty questions on software usage and system basics.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScQdK0C70UPhSR6KVk-n7WoxgqkaZaovts8h8IZeiOV2iTN2g/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-4',
    title: 'Test 4',
    description:
      'Practice Test Series Set 4 designed to reinforce keyboard shortcuts, office applications, and terminology.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScVQmZFpaFZwsaRyXHMFCdv_cmK1CH2kGKFWa6u5Y3E4thxiw/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-5',
    title: 'Test 5 "B"',
    description:
      'Practice Test Series Set 5 (Paper B) structured for mid-level proficiency verification and revision.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdZZ-YI9FyqhhS6GsM4KYMu6AS22SPxURJh-CJ43LZ-WtOUCw/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-6',
    title: 'Test 6',
    description:
      'Practice Test Series Set 6 targeting practical IT literacy, networking fundamentals, and data handling.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdpYgRd_xhPAGyk7hW84pvtGJnP8nzdXvAKwo0F9sEORnmCxg/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-7',
    title: 'Test 7',
    description:
      'Practice Test Series Set 7 offering timed-style objective questions for comprehensive course review.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdiNgwVSqqGXNDCOidDdosAHPNRtVqC38NLBxziA7TCzyeheg/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-8',
    title: 'Test 8',
    description:
      'Practice Test Series Set 8 evaluating conceptual clarity across hardware, internet, and productivity suites.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSdc-RI87nRh7Hni2jxcV0M3FfbzZhXIRzrMEleybNzkB4Nejw/viewform',
    iconKey: 'clipboard-check',
  },
  {
    id: 'practice-9',
    title: 'Test 9',
    description:
      'Practice Test Series Set 9 serving as a final mock evaluation before institute certification exams.',
    category: 'practice',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSesQppvbwk0CWxfpNJbD7bOjOlwNf787w6JKit7Mpe6iTMk0w/viewform',
    iconKey: 'clipboard-check',
  },
];

export const DEFAULT_GAMES: GameCardItem[] = [
  {
    id: 'game-1',
    title: 'JIT Bike Race',
    genre: '3D Bike Racing',
    url: 'https://jit-bike-raxe.vercel.app/',
    iconKey: 'bike',
  },
  {
    id: 'game-2',
    title: 'JIT Car Racing',
    genre: 'Racing',
    url: 'https://ctadlvid.gensparkspace.com/',
    iconKey: 'car',
  },
  {
    id: 'game-3',
    title: 'Shooting Game',
    genre: 'Action Shooter',
    url: 'https://uobxshlb.gensparkspace.com/',
    iconKey: 'crosshair',
  },
  {
    id: 'game-4',
    title: 'Super Mario Platform',
    genre: 'Classic Arcade',
    url: 'https://page.genspark.site/page/toolu_01FNwatmsTVEnekR9fypM2XL/super_mario_platform_game_fixed.html',
    iconKey: 'star-gamepad',
  },
  {
    id: 'game-5',
    title: 'Car Racing',
    genre: 'Speed Racing',
    url: 'https://tyyembxx.gensparkspace.com/',
    iconKey: 'flag',
  },
  {
    id: 'game-6',
    title: 'Snake Game',
    genre: 'Classic Arcade',
    url: 'https://gqwvnaqu.gensparkspace.com/',
    iconKey: 'snake',
  },
  {
    id: 'game-7',
    title: 'Space Battle',
    genre: 'Sci-Fi Shooter',
    url: 'https://rbifeexj.genspark.space/',
    iconKey: 'rocket',
  },
  {
    id: 'game-8',
    title: 'Car Racing 2',
    genre: 'Turbo Racing',
    url: 'https://txycruvo.gensparkspace.com/',
    iconKey: 'gauge',
  },
  {
    id: 'game-9',
    title: 'Adventure Quest',
    genre: 'Adventure',
    url: 'https://cuxgzmtk.gensparkspace.com/',
    iconKey: 'compass',
  },
  {
    id: 'game-10',
    title: 'War Strike',
    genre: 'Combat Action',
    url: 'https://iobqbtkz.gensparkspace.com/',
    iconKey: 'shield',
  },
];

export const GAME_ICON_OPTIONS: { value: GameIconKey; label: string }[] = [
  { value: 'bike', label: 'Bike / Motorcycle Racing' },
  { value: 'car', label: 'Sports Car Racing' },
  { value: 'flag', label: 'Checkered Flag / Speed Racing' },
  { value: 'gauge', label: 'Turbo / Speedometer' },
  { value: 'crosshair', label: 'Crosshair / Target Shooter' },
  { value: 'star-gamepad', label: 'Star / Platformer Arcade' },
  { value: 'snake', label: 'Retro Snake Arcade' },
  { value: 'rocket', label: 'Rocket / Space Shooter' },
  { value: 'compass', label: 'Compass / Adventure Quest' },
  { value: 'shield', label: 'Shield / Combat Strike' },
  { value: 'gamepad', label: 'Classic Gamepad' },
];

export const DEFAULT_WEB_APPS: WebAppCardItem[] = [
  {
    id: 'webapp-1',
    name: 'JIT VIDEO EDITOR',
    description:
      'Professional browser-based multi-track video editing studio with filters, effects, and overlays.',
    category: 'Media Studio',
    url: 'https://jit-video-editor.vercel.app/',
    iconKey: 'video-editor',
    ctaLabel: 'Open App',
  },
  {
    id: 'webapp-2',
    name: 'JIT 3D CARTOON STUDIO',
    description:
      'Create 3D animated stories, customize characters, and build interactive scenes directly in your browser.',
    category: '3D Animation Studio',
    url: 'https://jit-cartoon-studio.vercel.app/',
    iconKey: 'cartoon-studio',
    badgeTag: '3D Studio',
    ctaLabel: 'Launch Studio',
    isPermanent: true,
  },
];

export const WEB_APP_ICON_OPTIONS: { value: WebAppIconKey; label: string }[] = [
  { value: 'video-editor', label: 'Video Editor Studio (Filmstrip + Play)' },
  { value: 'cartoon-studio', label: '3D Cartoon Studio (3D Cube + Clapperboard)' },
  { value: 'code-studio', label: 'Code & Web IDE' },
  { value: 'design-canvas', label: 'Graphic Design Studio' },
  { value: 'cloud-docs', label: 'Cloud Office & Documents' },
  { value: 'presentation', label: 'Presentation & Slides' },
  { value: 'utility-tools', label: 'Student Utility Suite' },
  { value: 'globe-app', label: 'Web Portal / Browser Tool' },
  { value: 'app-grid', label: 'General Web App' },
];

export const DEFAULT_PORTAL_STATE: PortalState = {
  tests: DEFAULT_TESTS,
  games: DEFAULT_GAMES,
  webApps: DEFAULT_WEB_APPS,
  branding: DEFAULT_BRANDING,
};

export const CATEGORY_META: Record<
  'interactive' | 'topic' | 'practice',
  { label: string; shortLabel: string; subtitle: string }
> = {
  interactive: {
    label: 'Interactive Quizzes',
    shortLabel: 'Interactive Quiz',
    subtitle: 'Live web-based MCQ challenges with instant score feedback',
  },
  topic: {
    label: 'Topic-Wise Tests',
    shortLabel: 'Topic Assessment',
    subtitle: 'Subject-specific evaluations across essential computer modules',
  },
  practice: {
    label: 'Practice Sets (1–9)',
    shortLabel: 'Practice Series',
    subtitle: 'Sequential practice assessments for exam preparation',
  },
};
