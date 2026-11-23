export type AssessmentCategory = 'interactive' | 'topic' | 'practice';

export type FilterTab = 'all' | AssessmentCategory;

export interface TestCardItem {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  url: string;
  iconKey?: string;
}

export type GameIconKey =
  | 'bike'
  | 'car'
  | 'crosshair'
  | 'star-gamepad'
  | 'flag'
  | 'snake'
  | 'rocket'
  | 'gauge'
  | 'compass'
  | 'shield'
  | 'gamepad';

export interface GameCardItem {
  id: string;
  title: string;
  genre: string;
  url: string;
  iconKey: GameIconKey;
  customImageUrl?: string;
}

export interface HeaderBranding {
  title: string;
  subtitle: string;
  logoUrl: string;
}

export interface PortalState {
  tests: TestCardItem[];
  games: GameCardItem[];
  branding: HeaderBranding;
}
