import { Doday, DeserializedDoday } from './doday';

/**
 * Type of node that stores statistics of relations between nodes
 */
export class Progress extends Doday {
  static serialize(node: DeserializedProgress): Progress {
    const serialized = Doday.serialize(node);
    return serialized;
  }
  static deserialize(node: Progress): DeserializedProgress {
    const deserialized = Doday.deserialize(node);
    return deserialized;
  }
}

export class DeserializedProgress extends DeserializedDoday {}
