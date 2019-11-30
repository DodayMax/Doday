import { EntityConfig, Behavior, NodeLabel } from '../models';

export const fakeEntityConfig: EntityConfig = {
  doday: NodeLabel.Activity,
  progress: NodeLabel.ActivityProgress,
  behavior: [Behavior.Creatable],
};
