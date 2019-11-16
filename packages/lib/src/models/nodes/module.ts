import { Node, SerializedNode } from './node';
import { ModuleType } from '../../systems';
import { ModuleSysname } from '../../../dist/src';

/**
 * Type of node that represents an autonomous dynamic module with additional functionality for the app.
 */
export class Module extends Node {
  sysname!: ModuleSysname;
  type!: ModuleType;
  dependencies?: string[];
  static serialize(node: Module): SerializedModule {
    const serialized = Node.serialize(node) as SerializedModule;
    return serialized;
  }
  static deserialize(node: SerializedModule): Module {
    const deserialized = Node.deserialize(node) as Module;
    return deserialized;
  }
}

export class SerializedModule extends SerializedNode {
  sysname!: string;
  type!: string;
  dependencies?: string[];
}
