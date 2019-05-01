import { Hero } from './hero';
import { DodayLike } from './common';

export interface Tag {
  label: string;
  value: string;
  heroes?: [Hero];
  dodays?: [DodayLike];
  weight?: number;
}

export interface SerializedTag {
  label: string;
  value: string;
}
