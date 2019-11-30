import { Node, SerializedNode } from '../abstract/node';
import { NodeLabel } from '../node-labels';
import { ModuleSysname, AnySpot } from '../../../systems';

/**
 * Type of node that represents an autonomous dynamic module with additional functionality for the app.
 */
export class Module extends Node {
  sysname!: ModuleSysname;
  spot?: AnySpot;
  node?: NodeLabel;
  dependencies?: ModuleSysname[];
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
  spot?: string;
  node?: string;
  dependencies?: string[];
}
