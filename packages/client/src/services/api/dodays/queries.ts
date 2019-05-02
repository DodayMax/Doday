import gql from 'graphql-tag';
import client from '../apollo-client';
import {
  neo4jResponseDateToJSDate,
  neo4jResponseDateTimeToJSDate,
} from '@root/lib/utils';
import { DodayLike } from '@root/lib/models/entities/common';
import { APIresponseActivityProgress } from '@root/lib/models/entities/activity';

// Dodays

export const fetchActiveDodays = (date: number) => {
  return fetch(`/api/dodays/active?date=${String(date)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return parseAPIResponseDodays(res);
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
