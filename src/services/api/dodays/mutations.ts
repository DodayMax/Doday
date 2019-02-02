import gql from "graphql-tag";
import client from '../apollo-client';

// Doday

export const createDodayNode = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation CreateDoday($name: String!, $created: Float) {
          CreateDoday(name: $name, created: $created) {
            id
          }
        }
      `,
      variables
    })
}

export const removeHeroDodays = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation RemoveHeroDodays($from: _HeroInput!, $to: _DodayInput!) {
            RemoveHeroDodays(from: $from, to: $to) {
              from {
                name
              }
            }
          }
      `,
      variables
    })
}

export const addHeroDone = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroDone($from: _HeroInput!, $to: _DodayInput!) {
            AddHeroDone(from: $from, to: $to) {
              from {
                name
              }
            }
          }
      `,
      variables
    })
}

export const deleteDodayNode = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation DeleteDoday($id: ID!) {
            DeleteDoday(id: $id) {
              id
            }
          }
      `,
      variables
    })
} 