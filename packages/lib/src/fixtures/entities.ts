import { EntityConfig, NodeLabel } from '../models';
import { Behavior } from '../common-interfaces';

export const fakeEntityConfig: EntityConfig = {
  doday: NodeLabel.Activity,
  progress: NodeLabel.ActivityProgress,
  behavior: [Behavior.Creatable],
};
