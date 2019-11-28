import { Node, SerializedNode } from './node';
import { Progress, SerializedProgress } from './progress';
import { ModuleSysname } from '../../systems';
import { Module, SerializedModule } from './module';

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

/**
 * Type of node that store stats about relation
 * between Hero node and Tool node
 */
export class ToolProgress extends Progress {
  static serialize(node: ToolProgress): SerializedToolProgress {
    const serialized = Node.serialize(node) as SerializedToolProgress;
    return serialized;
  }
  static deserialize(node: SerializedToolProgress): ToolProgress {
    const deserialized = Node.deserialize(node) as ToolProgress;
    return deserialized;
  }
}

export class SerializedToolProgress extends SerializedProgress {}
