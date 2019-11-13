import { NodeLabel, Node } from './nodes';

export class EntityConfig {
  doday!: NodeLabel;
  progress!: NodeLabel;
  behavior!: Behavior[];
}

export class Entity {
  doday!: Node;
  progress!: Node;
}

export enum Behavior {
  Creatable = 'creatable',
  Publishable = 'publishable',
}
