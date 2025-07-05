export interface Workshop {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Anfänger' | 'Fortgeschritten' | 'Experte';
  price: string;
  category: string;
  image: string;
  url: string;
  provider: string;
  features: string[];
  tags: string[];
  rating?: number;
  reviewCount?: number;
  nextDate?: string;
  isFeatured?: boolean;
  isOnline?: boolean;
  language: 'Deutsch' | 'Englisch';
}