export interface Doday {
  id: string;
  type: 'action' | 'goal';
  name: string;
  parent?: Doday;
  date?: number;
  completed?: boolean;
  children?: Doday[];
}