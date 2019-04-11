export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  startDate?: number;
  endDate?: number;
  children?: string[];
}
