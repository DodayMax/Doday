import gql from "graphql-tag";
import client from '../apollo-client';


// Heroes

export const getHeroByID = (variables: any) => {
  return client
    .query({
      query: gql`
        query Hero($id: ID!) {
          Hero(id: $id) {
            id
            name
            tags {
              id
              sysname
              weight
            }
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}