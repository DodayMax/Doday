export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  ownerDID: string;
  startDate?: number;
  endDate?: number;
  children?: string[];
}
