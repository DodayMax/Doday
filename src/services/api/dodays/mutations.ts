import gql from 'graphql-tag';
import client from '../apollo-client';

// Dodays mutations

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

/////////////////////////////////////////////////////////////////

/**
 * Create "CREATE" relation from Hero to Doday
 * 
 * @param variables from Hero id to Doday id
 */

export const addDodayOwner = (variables: { from: { id: string }, to: { id: string } }) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddDodayOwner($from: _HeroInput!, $to: _DodayInput!) {
          AddDodayOwner(from: $from, to: $to) {
            from {
              name
            }
          }
        }
      `,
      variables,
    })
}

/////////////////////////////////////////////////////////////////

/**
 * Add Doday to one of the Category
 * 
 * @param variables from Doday id to Category id
 */

export const addDodayCategories = (variables: { from: { id: string }, to: { id: string } }) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddDodayCategories($from: _DodayInput!, $to: _CategoryInput!) {
          AddDodayCategories(from: $from, to: $to) {
            from {
              name
            }
          }
        }
      `,
      variables,
    })
}

/////////////////////////////////////////////////////////////////

/**
 * Complete Doday by changed prop on DOING relation.
 *
 * @param variables HeroID, DodayID, DateTime
 */

export const completeDoday = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation completeDoday($heroID: ID!, $dodayID: ID!, $date: Float!) {
          completeDoday(heroID: $heroID, dodayID: $dodayID, date: $date) {
            name
          }
        }
      `,
      variables
    })
}
