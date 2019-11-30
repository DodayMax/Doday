import { Progress, SerializedProgress } from '../abstract/progress';
import { Node } from '../abstract/node';

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
