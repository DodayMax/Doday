import { Node, SerializedNode } from './node';
import { NodeLabel } from './types';
import { ModuleSysname, AnySpot } from '../../systems';
import { Progress, SerializedProgress } from './progress';

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

/**
 * Progress node for Module
 */
export class ModuleProgress extends Progress {
  active!: boolean;
  static serialize(node: ModuleProgress): SerializedModuleProgress {
    const serialized = Node.serialize(node);
    return serialized as SerializedModuleProgress;
  }
  static deserialize(node: SerializedModuleProgress): ModuleProgress {
    const deserialized = Node.deserialize(node);
    return deserialized as ModuleProgress;
  }
}

export class SerializedModuleProgress extends SerializedProgress {
  active!: boolean;
}
