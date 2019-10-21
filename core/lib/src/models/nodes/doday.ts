import { Node, DeserializedNode } from './node';

/**
 * Type of node that represents an activity in the app
 */
export class Doday extends Node {
  static serialize(node: DeserializedDoday): Doday {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: Doday): DeserializedDoday {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class DeserializedDoday extends DeserializedNode {}
