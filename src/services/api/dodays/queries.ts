import gql from "graphql-tag";
import client from '../apollo-client';


// Dodays

export const activeDodaysForHero = (variables: any) => {
  return client
    .query({
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
      fetchPolicy: 'no-cache'
    });
}