export interface SerializedGoal {
  did: string;
  type: number;
  name: string;
  ownerDID: string;
  color: string;
  startDate?: number;
  endDate?: number;
  children?: string[];
}
