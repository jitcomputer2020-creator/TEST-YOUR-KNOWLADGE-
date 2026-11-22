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

export interface HeaderBranding {
  title: string;
  subtitle: string;
  logoUrl: string;
}

export interface PortalState {
  tests: TestCardItem[];
  branding: HeaderBranding;
}
