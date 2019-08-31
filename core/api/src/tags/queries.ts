import gql from "graphql-tag";
import client from '../apollo-client';


// Tags

export const getAllTags = (variables: any) => {
  return client
    .query({
      query: gql`
        query allTags($sysname: String) {
          allTags(sysname: $sysname) {
            id
            sysname
          }
        }
      `,
      variables,
      fetchPolicy: 'no-cache'
    });
}