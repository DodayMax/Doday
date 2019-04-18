import { Resource } from './Resource';

export interface SerializedDoday {
  did: string;
  activityType: string;
  type: number;
  name: string;
  duration: string;
  tags: string[];
  public: boolean;
  resource?: Resource;
  date?: number;
  dateIsLocked?: boolean;
  created?: number;
  relatedGoal?: string;
}
