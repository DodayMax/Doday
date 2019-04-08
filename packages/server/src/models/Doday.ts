import { Resource } from './Resource';

export interface SerializedDoday {
  did: string;
  activityType: string;
  type: number;
  name: string;
  tags: string[];
  public: boolean;
  resource?: Resource;
  goalDID?: string;
  date?: number;
  created?: number;
}
