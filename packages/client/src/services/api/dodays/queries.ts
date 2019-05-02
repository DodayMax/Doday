import gql from 'graphql-tag';
import client from '../apollo-client';
import {
  neo4jResponseDateToJSDate,
  neo4jResponseDateTimeToJSDate,
} from '@root/lib/utils';
import { DodayLike } from '@root/lib/models/entities/common';
import { APIresponseActivityProgress } from '@root/lib/models/entities/activity';
import { encodeQueryData } from '@root/lib/utils/api-utils';

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
    console.log(res);
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
    console.log(res);
  });
};

export const parseAPIResponseDodays = async (res): Promise<DodayLike[]> => {
  const json = await res.json();
  const dodays = [];
  json.map(doday => {
    doday._fields.map((doday: APIresponseActivityProgress) => {
      return {
        ...doday,
        date: doday.date && neo4jResponseDateToJSDate(doday.date),
        completedAt:
          doday.completedAt && neo4jResponseDateTimeToJSDate(doday.completedAt),
        tookAt: doday.tookAt && neo4jResponseDateTimeToJSDate(doday.tookAt),
      };
    });
    dodays.push(doday._fields[0]);
  });
  return dodays;
};

export type DodaysQueryParams = {
  type?: number;
  createdBy?: string;
};

export type DodaysWithProgressQueryParams = {
  dodaytype?: number;
  startdate?: number;
  enddate?: number;
  completed?: boolean;
  createdBy?: string;
};
