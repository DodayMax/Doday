import gql from 'graphql-tag';
import client from '../apollo-client';

// Heroes

export const fetchCurrentHero = () => {
  return fetch('/api/currentHero', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: "no-store",
  }).then((res: Response) => {
    return res.status === 200 ? res.json() : '';
  });
};

export const getHeroByID = (variables: any) => {
  return client.query({
    query: gql`
      query Hero($id: ID!) {
        Hero(id: $id) {
          id
          name
          tags {
            id
            sysname
            color
            weight
          }
        }
      }
    `,
    variables,
    fetchPolicy: 'no-cache',
  });
};
