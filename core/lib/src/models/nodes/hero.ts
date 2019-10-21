import { Node, DeserializedNode } from './node';

/**
 * Type of node that represents a person in the app
 */
export class Hero extends Node {
  name?: string;
  picture?: string;
  email?: string;
  static serialize(node: DeserializedHero): Hero {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: Hero): DeserializedHero {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class DeserializedHero extends DeserializedNode {
  name?: string;
  picture?: string;
  email?: string;
}
