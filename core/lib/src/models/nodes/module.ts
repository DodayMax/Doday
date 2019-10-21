import { Node, DeserializedNode } from './node';

/**
 * Type of node that represents an autonomous dynamic module with additional functionality for the app.
 */
export class Module extends Node {
  sysname!: string;
  static serialize(node: DeserializedModule): Module {
    const serialized = Node.serialize(node) as Module;
    return serialized;
  }
  static deserialize(node: Module): DeserializedModule {
    const deserialized = Node.deserialize(node) as DeserializedModule;
    return deserialized;
  }
}

export class DeserializedModule extends DeserializedNode {
  sysname!: string;
}
