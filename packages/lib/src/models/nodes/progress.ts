import { Node, SerializedNode } from './node';

/**
 * Type of node that stores statistics of relations between nodes
 */
export class Progress extends Node {
  static serialize(node: Progress): SerializedProgress {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: SerializedProgress): Progress {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class SerializedProgress extends SerializedNode {}
