import { Buyable } from '../common-interfaces';

/**
 * Types of the available nodes
 */
export enum NodeType {
  Doday = 'Doday',
  Progress = 'Progress',
  Activity = 'Activity',
  Tool = 'Tool',
  Hero = 'Hero',
}

/**
 * Basic abstract class for all types of nodes
 */
export class Doday {
  did!: string;
  labels!: NodeType[];
  public!: boolean;
  createdAt!: string;
  updatedAt?: string;
}

/**
 * Type of node that represents a person in the app
 */
export class Hero extends Doday {
  name?: string;
  picture?: string;
  email?: string;
}

/**
 * Type of node that stores statistics of relations between nodes
 */
export class Progress extends Doday {}

/**
 * Type of node that represents a tool module
 */
export class Tool extends Doday implements Buyable {
  sysname!: string;
  price!: number;
}
