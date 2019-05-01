import { Resource } from './resource';

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
  resource?: Resource;
  memos?: string[];
  owner: string;
  ownerDID: string;
  created?: number;
}
