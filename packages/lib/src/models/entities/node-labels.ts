/**
 * Types of the available nodes
 */
export enum NodeLabel {
  /**
   * Base abstract NodeLabels for system only
   * You can't create Node with only these labels
   */
  Node = 'Node',
  Doday = 'Doday',
  Progress = 'Progress',
  /**
   * Node labels which are used by actual Node instances
   */
  Entity = 'Entity',
  Hero = 'Hero',
  Module = 'Module',
  ModuleProgress = 'ModuleProgress',
  Tool = 'Tool',
  ToolProgress = 'ToolProgress',
  Activity = 'Activity',
  ActivityProgress = 'ActivityProgress',
  Resource = 'Resource',
}
