import gql from 'graphql-tag';
import client from '../apollo-client';
import { Doday, APIResponseDoday } from '@root/lib/models/entities/Doday';
import {
  firstItem,
  neo4jResponseDateToJSDate,
  neo4jResponseDateTimeToJSDate,
} from '@root/lib/utils';
import { parseGraphQLResponseProgressToDoday } from '@root/lib/utils/api-utils';
import { GraphQLResponseProgress } from '@root/lib/models/entities/Progress';

// Dodays

export const dodayProgressByDID = async (variables: any) => {
  const res = await client.query({
    query: gql`
      query Progress($did: String) {
        Progress(did: $did) {
          did
          date {
            year
            month
            day
          }
          dateIsLocked
          completed
          relatedGoal {
            did
            name
            color
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
          }
          origin {
            name
            activityType
            type
            duration
            public
            resource {
              description
              image
              provider
              url
            }
            owner {
              did
            }
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  const progress: GraphQLResponseProgress = firstItem(res.data.Progress);

  return parseGraphQLResponseProgressToDoday(progress);
};

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

export const fetchPublicDodays = (date?: number) => {
  return fetch(`/api/dodays/public`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return parseAPIResponseDodays(res);
  });
};

export const parseAPIResponseDodays = async (res): Promise<Doday[]> => {
  const json = await res.json();
  const dodays = [];
  json.map(doday => {
    doday._fields.map((doday: APIResponseDoday) => {
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
