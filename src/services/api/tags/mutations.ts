import gql from 'graphql-tag';
import client from '../apollo-client';

// Hero

/////////////////////////////////////////////////////////////////

export const createTag = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation CreateTag($id: ID!, $sysname: String) {
          CreateTag(id: $id, sysname: $sysname) {
            id
          }
        }
      `,
      variables
    });
};