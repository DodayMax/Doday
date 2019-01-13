import gql from "graphql-tag";
import client from './client';


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