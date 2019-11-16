import { NodeLabel, Progress } from './nodes';
import { Doday } from '../../dist/src';

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
