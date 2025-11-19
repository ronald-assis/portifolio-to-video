export type Category = 'Casamento' | 'Debutante' | 'Eventos' | 'Todos';

export interface Video {
  id: string;
  title: string;
  description: string;
  category: Category;
  url: string;
  thumbnail: string;
  orientation: 'horizontal' | 'vertical';
}