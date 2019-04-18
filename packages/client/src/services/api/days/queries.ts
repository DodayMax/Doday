import gql from 'graphql-tag';
import client from '../apollo-client';

// Dodays

export const getDay = (variables: any) => {
  return client.query({
    query: gql`
      query Day($date: _Neo4jDateInput) {
        Day(date: $date) {
          active
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
};

export const planOutStartFromDate = (date: number) => {
  return fetch(`/api/utils/planout?date=${String(date)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return console.log(res);
  });
};
