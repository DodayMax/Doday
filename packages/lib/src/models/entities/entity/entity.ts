import { NodeLabel } from '../node-labels';
import { Behavior } from '../../../common-interfaces';
import { SerializedNode, Node } from '../abstract';

export class EntityConfig extends Node {
  doday!: NodeLabel;
  progress!: NodeLabel;
  behavior!: Behavior[];
  static serialize(node: EntityConfig): SerializedEntityConfig {
    const serialized = Node.serialize(node);
    return serialized as SerializedEntityConfig;
  }
  static deserialize(node: SerializedEntityConfig): EntityConfig {
    const deserialized = Node.deserialize(node);
    return deserialized as EntityConfig;
  }
}

export class SerializedEntityConfig extends SerializedNode {
  doday!: NodeLabel;
  progress!: NodeLabel;
  behavior!: Behavior[];
}
