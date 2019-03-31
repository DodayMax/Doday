import gql from "graphql-tag";
import client from '../apollo-client';


// Dodays

export const getDay = (variables: any) => {
  return client
    .query({
      query: gql`
        query Day($date: _Neo4jDateInput) {
          Day(date: $date) {
            active
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}