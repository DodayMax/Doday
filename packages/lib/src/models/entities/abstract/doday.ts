import { Node, SerializedNode } from './node';

/**
 * Type of node that represents an activity in the app
 */
export class Doday extends Node {
  static serialize(node: Doday): SerializedDoday {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: SerializedDoday): Doday {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class SerializedDoday extends SerializedNode {}
