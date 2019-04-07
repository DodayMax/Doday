import { Hero } from './Hero';
import { Doday } from './Doday';

export interface Tag {
  did: string;
  label: string;
  value: string;
  heroes?: [Hero];
  dodays?: [Doday];
  weight?: number;
}

export interface SerializedTag {
  did: string;
  label: string;
  value: string;
}
