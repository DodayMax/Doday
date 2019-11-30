import { Node, SerializedNode } from './node';
import { Entity } from '../entity';
import { Module, ModuleProgress } from './module';

/**
 * Type of node that represents a person in the app
 */
export class Hero extends Node {
  name?: string;
  picture?: string;
  email?: string;
  activeModules?: Entity<Module, ModuleProgress>[];
  static serialize(node: Hero): SerializedHero {
    const serialized = Node.serialize(node);
    return serialized;
  }
  static deserialize(node: SerializedHero): Hero {
    const deserialized = Node.deserialize(node);
    return deserialized;
  }
}

export class SerializedHero extends SerializedNode {
  name?: string;
  picture?: string;
  email?: string;
}
