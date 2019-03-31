import gql from 'graphql-tag';
import client from '../apollo-client';

// Hero

/////////////////////////////////////////////////////////////////

export const createHeroNode = async (variables: any) => {
  return fetch('http://localhost:8080/heroes', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": 'true',
    },
    body: JSON.stringify(variables), // body data type must match "Content-Type" header
  });
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

export const addHeroTag = (variables: any) => {
  return client
    .mutate({
      mutation: gql`
        mutation AddHeroTags($from: _HeroInput!, $to: _TagInput!) {
            AddHeroTags(from: $from, to: $to) {
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