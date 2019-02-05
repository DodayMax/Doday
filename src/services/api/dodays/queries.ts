import gql from "graphql-tag";
import client from '../apollo-client';


// Dodays

export const activeDodaysForHero = (variables: any) => {
  return client
    .query({
      query: gql`
        query activeDodays($id: ID!) {
          activeDodays(heroID: $id) {
            id
            name
            completed
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}