import { NodeLabel } from '../node-labels';
import { Hero } from '../hero/hero';
import { Progress } from './progress';
import { Resource } from '../resource/resource';
import { Tool } from '../tool/tool';

/**
 * Basic abstract class for all types of nodes
 */
export class Node {
  did!: string;
  labels!: NodeLabel[];
  public!: boolean;
  createdAt!: Date;
  updatedAt?: Date;
  static serialize(node: Node): SerializedNode {
    return {
      ...node,
      createdAt: node.createdAt.toISOString(),
      updatedAt: node.updatedAt ? node.updatedAt.toISOString() : undefined,
    };
  }
  static deserialize(node: SerializedNode): Node {
    return {
      ...node,
      createdAt: new Date(node.createdAt),
      updatedAt: node.updatedAt ? new Date(node.updatedAt) : undefined,
    };
  }
  static isDoday(node: Node): node is Hero {
    return node.labels.includes(NodeLabel.Doday);
  }
  static isHero(node: Node): node is Hero {
    return node.labels.includes(NodeLabel.Hero);
  }
  static isProgress(node: Node): node is Progress {
    return node.labels.includes(NodeLabel.Progress);
  }
  static isResource(node: Node): node is Resource {
    return node.labels.includes(NodeLabel.Resource);
  }
  static isTool(node: Node): node is Tool {
    return node.labels.includes(NodeLabel.Tool);
  }
}

/**
 * Serialized Node node
 */
export class SerializedNode {
  did!: string;
  labels!: NodeLabel[];
  public!: boolean;
  createdAt!: string;
  updatedAt?: string;
}
