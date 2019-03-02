export interface Doday {
  id: string;
  type: 'action' | 'folder';
  name: string;
  date?: number;
  completed?: boolean;
  children?: Doday[];
}