export interface Highlight {
  text: string;
  text_pt: string;
  image: string;
}

export interface Tour {
  id: string;
  title: string;
  title_pt: string;
  slug: string;
  duration: string;
  duration_pt: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  difficulty_pt: string;
  price: number;
  description: string;
  description_pt: string;
  image: string;
  highlights: Highlight[];
  maxGroupSize?: number;
  ageRange?: string;
  ageRange_pt?: string;
}

export interface TransferService {
  id: string;
  route: string;
  route_pt: string;
  price: number;
  capacity: string;
  capacity_pt: string;
  description: string;
  description_pt: string;
}

export interface NavItem {
  label: string;
  path: string;
}