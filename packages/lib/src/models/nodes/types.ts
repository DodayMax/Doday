/**
 * Types of the available nodes
 */
export enum NodeLabel {
  /**
   * Base Node labels for system only
   * You can't create Node with only these labels
   */
  Node = 'Node',
  Doday = 'Doday',
  Progress = 'Progress',
  Module = 'Module',
  Tool = 'Tool',
  /**
   * Node labels which are used by actual Node instances
   */
  Hero = 'Hero',
  Activity = 'Activity',
  ActivityProgress = 'ActivityProgress',
  Resource = 'Resource',
  ActivitiesTool = 'ActivitiesTool',
  ActivitiesToolProgress = 'ActivitiesToolProgress',
}
