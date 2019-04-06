import gql from 'graphql-tag';
import client from '../apollo-client';

// Dodays

export const activeDodaysForHero = (variables: any) => {
  return client.query({
    query: gql`
      query activeDodays($id: ID!, $date: String) {
        activeDodays(heroID: $id, date: $date) {
          id
          name
          completed
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
};

export const fetchActiveDodaysForDate = (date: number) => {
  return fetch(`/api/activeDodaysForDate?date=${String(date)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
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
    console.log(dodays);
    return dodays;
  });
};
