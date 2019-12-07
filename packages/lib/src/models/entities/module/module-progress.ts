import { Progress, SerializedProgress } from '../abstract/progress';
import { Node } from '../abstract/node';

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
