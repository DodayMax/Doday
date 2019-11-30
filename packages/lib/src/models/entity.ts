import { NodeLabel, Progress, Doday } from './nodes';

export class EntityConfig {
  doday!: NodeLabel;
  progress!: NodeLabel;
  behavior!: Behavior[];
}

export class Entity<D = Doday, P = Progress> {
  doday!: D;
  progress!: P;
}

export enum Behavior {
  Creatable = 'creatable',
  Publishable = 'publishable',
}
