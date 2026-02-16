export interface Highlight {
  text: string;
  image: string;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
  price: number;
  description: string;
  image: string;
  highlights: Highlight[];
  maxGroupSize?: number;
  ageRange?: string;
}

export interface TransferService {
  id: string;
  route: string;
  price: number;
  capacity: string;
  description: string;
}

export interface NavItem {
  label: string;
  path: string;
}