export type Category = 'insider_threat' | 'outsider_threat' | 'other';

export interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  category: Category;
  description?: string;
  analysis?: string;
  createdAt: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  insider_threat: 'Insider Threat',
  outsider_threat: 'Outsider Threat',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  insider_threat: '#003C71',
  outsider_threat: '#003C71',
  other: '#003C71',
};
