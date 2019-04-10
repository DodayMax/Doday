import { SerializedProgress } from '../models/entities/Progress';
import { dateFromNeo4jDateTime, dateFromNeo4jDate } from './date-utils';
import { firstItem } from './utils';
import { Doday } from '../models/entities/Doday';

export const parseMetadataFromUrl = (url: string) => {
  return fetch(`/api/utils/parse?url=${url}`).then((res: Response) => {
    return res.status === 200 ? res.json() : '';
  });
};

export function parseProgressToDoday(progress: SerializedProgress): Doday {
  const deserializedProgress = {
    ...progress,
    tookAt: progress.tookAt && dateFromNeo4jDateTime(progress.tookAt),
    date: progress.date && dateFromNeo4jDate(progress.date),
    completedAt:
      progress.completedAt && dateFromNeo4jDate(progress.completedAt),
    hero: progress.hero && firstItem(progress.hero),
    origin: progress.origin && firstItem(progress.origin),
  };
  return {
    did: deserializedProgress.did,
    activityType: deserializedProgress.origin.activityType,
    type: deserializedProgress.origin.type,
    name: deserializedProgress.origin.name,
    public: deserializedProgress.origin.public,
    // Computed props by relations and from Progress node
    resource: firstItem(deserializedProgress.origin.resource),
    owner:
      deserializedProgress.origin.owner &&
      firstItem(deserializedProgress.origin.owner),
    doing: deserializedProgress.origin.doing,
    done: deserializedProgress.origin.done,
    created: deserializedProgress.origin.created,
    completed: deserializedProgress.completed,
    tookAt: deserializedProgress.tookAt,
    date: deserializedProgress.date,
    completedAt: deserializedProgress.completedAt,
  };
}
