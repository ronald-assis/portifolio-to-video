export type Category = 'Casamento' | 'Debutante' | 'Institucional' | 'Todos';

export interface Video {
  id: string;
  title: string;
  description: string;
  category: Category;
  url: string;
  thumbnail: string;
}