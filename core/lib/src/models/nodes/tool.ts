import { Doday, DeserializedDoday } from './doday';

/**
 * Type of node that represents a tool module
 */
export class Tool extends Doday {
  sysname!: string;
  static serialize(node: DeserializedTool): Tool {
    const serialized = Doday.serialize(node) as Tool;
    return serialized;
  }
  static deserialize(node: Tool): DeserializedTool {
    const deserialized = Doday.deserialize(node) as DeserializedTool;
    return deserialized;
  }
}

export class DeserializedTool extends DeserializedDoday {
  sysname!: string;
}
