import gql from "graphql-tag";
import client from '../apollo-client';


// Hero

export const createHeroNode = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation CreateHero($id: ID!, $name: String, $created: Float) {
          CreateHero(id: $id, name: $name, created: $created) {
            id
          }
        }
      `,
      variables
    });
}

export const addHeroDodays = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroDodays($from: _HeroInput!, $to: _DodayInput!) {
            AddHeroDodays(from: $from, to: $to) {
              from {
                name
              }
            }
          }
      `,
      variables
    });
} 