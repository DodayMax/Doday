import { NodeLabel } from './types';
import { Hero } from './hero';
import { Progress } from './progress';
import { Resource } from './resource';
import { Tool } from './tool';

/**
 * Basic abstract class for all types of nodes
 */
export class Doday {
  did!: string;
  labels!: NodeLabel[];
  public!: boolean;
  createdAt!: string;
  updatedAt?: string;
  static serialize(node: DeserializedDoday): Doday {
    return {
      ...node,
      createdAt: node.createdAt.toISOString(),
      updatedAt: node.updatedAt ? node.updatedAt.toISOString() : undefined,
    };
  }
  static deserialize(node: Doday): DeserializedDoday {
    return {
      ...node,
      createdAt: new Date(node.createdAt),
      updatedAt: node.updatedAt ? new Date(node.updatedAt) : undefined,
    };
  }
  static isHero(node: Doday): node is Hero {
    return node.labels.includes(NodeLabel.Hero);
  }
  static isProgress(node: Doday): node is Progress {
    return node.labels.includes(NodeLabel.Progress);
  }
  static isResource(node: Doday): node is Resource {
    return node.labels.includes(NodeLabel.Resource);
  }
  static isTool(node: Doday): node is Tool {
    return node.labels.includes(NodeLabel.Tool);
  }
}

/**
 * Deserialized Doday node
 */
export class DeserializedDoday {
  did!: string;
  labels!: NodeLabel[];
  public!: boolean;
  createdAt!: Date;
  updatedAt?: Date;
}
