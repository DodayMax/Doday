import { NodeLabel } from './nodes';

export class Entity {
  doday!: NodeLabel;
  progress!: NodeLabel;
  behavior!: Behavior[];
}

export enum Behavior {
  Creatable = 'creatable',
  Publishable = 'publishable',
}
