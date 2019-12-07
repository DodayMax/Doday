import { Node, SerializedNode } from '../abstract/node';
import { ModuleSysname } from '../../../systems';
import { Module, SerializedModule } from '../module/module';

/**
 * Type of node that represents an autonomous dynamic module with additional functionality for the app.
 */
export class Tool extends Node {
  sysname!: ModuleSysname;
  modules!: Module[];
  dependencies?: ModuleSysname[];
  static serialize(node: Tool): SerializedTool {
    const serialized = Node.serialize(node) as SerializedTool;
    return serialized;
  }
  static deserialize(node: SerializedTool): Tool {
    const deserialized = Node.deserialize(node) as Tool;
    return deserialized;
  }
}

export class SerializedTool extends SerializedNode {
  sysname!: string;
  modules!: SerializedModule[];
  dependencies?: string[];
}
