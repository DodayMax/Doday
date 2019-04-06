export interface Doday {
  id: string;
  type: 'action' | 'goal' | 'topic' | 'memo';
  name: string;
  parent?: Doday;
  date?: number;
  completed?: boolean;
  children?: Doday[];
}
