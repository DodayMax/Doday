import gql from "graphql-tag";
import client from './client';


// Dodays

export const activeDodaysForHero = (variables: any) => {
  return client
    .query({
      query: gql`
        query activeDodays($id: ID!) {
          activeDodays(heroID: $id) {
            id
            name
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}