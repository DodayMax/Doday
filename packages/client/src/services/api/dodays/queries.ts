import gql from 'graphql-tag';
import client from '../apollo-client';
import { Doday } from '@root/lib/models/entities/Doday';
import { firstItem } from '@root/lib/utils';
import { SerializedProgress } from '@root/lib/models/entities/Progress';
import { parseProgressToDoday } from '@root/lib/utils/api-utils';

// Dodays

export const dodayProgressByID = async (variables: any) => {
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
          completed
          origin {
            name
            activityType
            type
            public
            resource {
              title
            }
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
  const progress: SerializedProgress = firstItem(res.data.Progress);

  return parseProgressToDoday(progress);
};

export const fetchActiveDodaysForDate = (date: number) => {
  return fetch(`/api/activeDodaysForDate?date=${String(date)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return parseDodaysResponse(res);
  });
};

export const parseDodaysResponse = async (res): Promise<Doday[]> => {
  const json = await res.json();
  const dodays = [];
  json.map(doday => {
    doday._fields.map(doday => {
      const date = doday.date;
      const jsDate = new Date(
        `${date.year.low}-${date.month.low}-${date.day.low}`
      );
      doday.date = jsDate;
    });
    dodays.push(doday._fields[0]);
  });
  return dodays;
};
