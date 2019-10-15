import {
  encodeQueryData,
  firstItem,
  DodayLike,
  APIResponseProgressBase,
  neo4jResponseDateTimeToJSDate,
} from '@doday/lib';
import { DodaysQueryParams, DodaysWithProgressQueryParams } from '../types';

// Dodays

export const searchDodays = (params?: DodaysQueryParams) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/dodays/search${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return await parseAPIResponseDodays(res);
  });
};

export const searchDodaysCount = (params?: DodaysQueryParams) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/dodays/search/count${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    const response = await res.json();
    return (
      response[0] &&
      response[0]._fields &&
      response[0]._fields[0] &&
      response[0]._fields[0].low
    );
  });
};

export const fetchDodays = (params?: DodaysQueryParams) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/dodays${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return await res;
  });
};

export const fetchDodaysCount = (params?: DodaysQueryParams) => {
  let paramsString = '';
  if (params) paramsString = `?${encodeQueryData(params)}`;

  return fetch(`/api/dodays/count${paramsString}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    const response = await res.json();
    return (
      response[0] &&
      response[0]._fields &&
      response[0]._fields[0] &&
      response[0]._fields[0].low
    );
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

export const parseAPIResponseDodays = async (
  res: any
): Promise<DodayLike[]> => {
  const json = await res.json();
  const dodays: DodayLike[] = json.map((item: any) => {
    const nodes = item._fields[0];
    const dodayNode = nodes.doday && nodes.doday.properties;
    const progressNode = nodes.progress && nodes.progress.properties;
    const resourceNode = nodes.resource && nodes.resource.properties;
    const rate = nodes.rate && nodes.rate.low;
    return {
      ...dodayNode,
      rate,
      progress: progressNode && deserializeProgressNode(progressNode),
      resource: resourceNode,
    };
  });
  return dodays;
};

export const deserializeProgressNode = (progress: APIResponseProgressBase) => {
  return {
    ...progress,
    date: progress.date && neo4jResponseDateTimeToJSDate(progress.date),
    completedAt:
      progress.completedAt &&
      neo4jResponseDateTimeToJSDate(progress.completedAt),
    tookAt: progress.tookAt && neo4jResponseDateTimeToJSDate(progress.tookAt),
  };
};
