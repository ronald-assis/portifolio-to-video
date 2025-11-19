export type Category = 'Casamento' | 'Debutante' | 'Eventos' | 'Todos';

export interface Video {
  id: number;
  title: string;
  category: Category;
  thumbnail: string;
  url: string;
  orientation: 'horizontal' | 'vertical';
}

