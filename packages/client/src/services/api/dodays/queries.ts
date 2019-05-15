import { neo4jResponseDateTimeToJSDate, firstItem } from '@root/lib/utils';
import { encodeQueryData } from '@root/lib/utils/api-utils';
import { DodayLike, APIResponseProgressLike } from '@root/tools/types';

// Dodays

export const fetchDodays = (params?: DodaysQueryParams) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/dodays${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return await parseAPIResponseDodays(res);
  });
};

export const fetchDodayByDID = (did: string) => {
  return fetch(`/api/dodays/${did}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return firstItem(await parseAPIResponseDodays(res));
  });
};

export const fetchDodaysWithProgress = (
  params?: DodaysWithProgressQueryParams
) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/progress${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return await parseAPIResponseDodays(res);
  });
};

export const fetchDodayWithProgressByDID = (did: string) => {
  return fetch(`/api/progress/${did}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return firstItem(await parseAPIResponseDodays(res));
  });
};

export const parseAPIResponseDodays = async (res): Promise<DodayLike[]> => {
  const json = await res.json();
  console.log(json);
  const dodays = json.map(item => {
    const nodes = item._fields[0];
    const dodayNode = nodes.doday && nodes.doday.properties;
    const progressNode = nodes.progress && nodes.progress.properties;
    const resourceNode = nodes.resource && nodes.resource.properties;
    return {
      ...dodayNode,
      progress: progressNode && deserializeProgressNode(progressNode),
      resource: resourceNode,
    };
  });
  return dodays;
};

export const deserializeProgressNode = (progress: APIResponseProgressLike) => {
  return {
    ...progress,
    date: progress.date && neo4jResponseDateTimeToJSDate(progress.date),
    completedAt:
      progress.completedAt &&
      neo4jResponseDateTimeToJSDate(progress.completedAt),
    tookAt: progress.tookAt && neo4jResponseDateTimeToJSDate(progress.tookAt),
  };
};

export type DodaysQueryParams = {
  dodaytype?: number;
  createdBy?: string;
};

export type DodaysWithProgressQueryParams = {
  dodaytype?: number;
  exactDate?: number;
  date?: number;
  startdate?: number;
  enddate?: number;
  completed?: boolean;
  createdBy?: string;
};
