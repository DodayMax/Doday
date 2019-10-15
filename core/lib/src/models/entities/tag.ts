import { DodayLike } from './common';

export interface Tag {
  label: string;
  value: string;
  dodays?: [DodayLike];
  weight?: number;
}

export interface SerializedTag {
  label: string;
  value: string;
}
