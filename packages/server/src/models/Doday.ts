import { Resource } from './Resource';

export interface SerializedDoday {
  did: string;
  activityType: string;
  type: number;
  name: string;
  duration: string;
  public: boolean;
  // Computed props by relations and from Progress node
  resource?: Resource;
  tags?: string[];
  created?: number;
  completed?: boolean;
  tookAt?: number;
  date?: number;
  dateIsLocked?: boolean;
  completedAt?: number;
  relatedGoal?: string;
}
