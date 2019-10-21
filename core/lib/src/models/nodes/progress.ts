import { Node, DeserializedNode } from './node';

/**
 * Type of node that stores statistics of relations between nodes
 */
export class Progress extends Node {
  static serialize(node: DeserializedProgress): Progress {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: Progress): DeserializedProgress {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class DeserializedProgress extends DeserializedNode {}
