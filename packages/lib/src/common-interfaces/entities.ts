import { Doday, Progress } from '../models';

export class Entity<D = Doday, P = Progress> {
  doday!: D;
  progress!: P;
}

export enum Behavior {
  Creatable = 'creatable',
  Publishable = 'publishable',
}
