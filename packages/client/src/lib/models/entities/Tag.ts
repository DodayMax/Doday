import { Hero } from './Hero';
import { Doday } from './Doday';

export interface Tag {
  label: string;
  value: string;
  heroes?: [Hero];
  dodays?: [Doday];
  weight?: number;
}

export interface SerializedTag {
  label: string;
  value: string;
}
