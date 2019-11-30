import * as _ from 'lodash';
import { NodeLabel } from '../models';

export const getPrimaryLabel = (labels: NodeLabel[]): NodeLabel | undefined => {
  const primaryLabels = [
    NodeLabel.Activity,
    NodeLabel.Hero,
    NodeLabel.Tool,
    NodeLabel.Resource,
    NodeLabel.Entity,
    NodeLabel.Module,
  ];
  const res = labels.map(label => {
    if (primaryLabels.includes(label)) {
      return label;
    }
    return;
  });
  return _.compact(res)[0];
};
