import gql from 'graphql-tag';
import client from '../apollo-client';

// Hero

/////////////////////////////////////////////////////////////////

export const createHeroNode = async (variables: any) => {
  const res = await client
    .mutate({
      mutation: gql`
        mutation CreateHero($id: ID!, $name: String) {
          CreateHero(id: $id, name: $name) {
            id
          }
        }
      `,
      variables
    });
  console.log(res, 'res');
};

/////////////////////////////////////////////////////////////////

export const addHeroDodays = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroDodays($from: _HeroInput!, $to: _DodayInput!, $data: _DoingInput!) {
            AddHeroDodays(from: $from, to: $to, data: $data) {
              from {
                name
              }
            }
          }
      `,
      variables
    });
};

/////////////////////////////////////////////////////////////////

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
    });
};

/////////////////////////////////////////////////////////////////

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
    });
};

/////////////////////////////////////////////////////////////////

export const addHeroRoles = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroRoles($from: _HeroInput!, $to: _RoleInput!) {
            AddHeroRoles(from: $from, to: $to) {
              to {
                sysname
              }
            }
          }
      `,
      variables
    })
}

/////////////////////////////////////////////////////////////////

export const addHeroCategory = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroCategories($from: _HeroInput!, $to: _CategoryInput!) {
            AddHeroCategories(from: $from, to: $to) {
              from {
                id
                name
              }
            }
          }
      `,
      variables
    })
}

/////////////////////////////////////////////////////////////////

export const addHeroInvites = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroInvites($from: _HeroInput!, $to: _HeroInput!) {
            AddHeroInvites(from: $from, to: $to) {
              to {
                name
              }
            }
          }
      `,
      variables
    })
}