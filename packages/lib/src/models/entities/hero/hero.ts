import { Node, SerializedNode } from '../abstract/node';
import { Module } from '../module/module';
import { ModuleProgress } from '../module/module-progress';
import { Entity } from '../../../common-interfaces';
import { EntityConfig } from '../entity';

/**
 * Type of node that represents a person in the app
 */
export class Hero extends Node {
  name?: string;
  picture?: string;
  email?: string;
  activeModules?: Entity<Module, ModuleProgress>[];
  availableEntities?: Entity<EntityConfig>[];
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
