export interface SerializedDoday {
  did: string;
  type: number;
  public: boolean;
  activityType: string;
  name: string;
  description?: string;
  image?: string;
  duration?: string;
  tags?: string[];
  memos?: string[];
  owner: string;
  ownerDID: string;
  created?: number;
}
