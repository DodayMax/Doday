import gql from 'graphql-tag';
import client from '../apollo-client';
import { SerializedDoday } from '@root/lib/models/entities/Doday';

type Neo4jDateTimeInput = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

type Neo4jDateInput = {
  year: number;
  month: number;
  day: number;
};

// Dodays mutations

export const createAndTakeDodayNode = async (doday: SerializedDoday) => {
  return fetch('/api/dodays', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(doday),
  });
};

export const createDodayNode = (variables: {
  name: string;
  created: number;
  date: Neo4jDateInput;
}) => {
  return client.mutate({
    mutation: gql`
      mutation CreateDoday(
        $name: String!
        $created: Float
        $date: _Neo4jDateInput
      ) {
        CreateDoday(name: $name, created: $created, date: $date) {
          id
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Create Progress node
 *
 * @param variables { id, type }
 */

export const createProgressNode = (variables: {
  id: string;
  type: 'doday' | 'path';
}) => {
  return client.mutate({
    mutation: gql`
      mutation CreateProgress($id: ID!, $type: String) {
        CreateProgress(id: $id, type: $type) {
          id
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Create "PROGRESS" relation from Hero to Progress
 *
 * @param variables from Hero id to Progress id
 */

export const addProgressHero = (variables: {
  from: { id: string };
  to: { id: string };
}) => {
  return client.mutate({
    mutation: gql`
      mutation AddProgressHero($from: _HeroInput!, $to: _ProgressInput!) {
        AddProgressHero(from: $from, to: $to) {
          from {
            id
          }
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Create "DOING" relation from Progress to Doday
 *
 * @param variables from Progress id to Doday id
 */

export const addProgressDoday = (variables: {
  from: { id: string };
  to: { id: string };
  data: {
    tookAt: Neo4jDateTimeInput;
    completed: boolean;
    completedAt?: number;
  };
}) => {
  return client.mutate({
    mutation: gql`
      mutation AddProgressDoing(
        $from: _ProgressInput!
        $to: _DodayInput!
        $data: _DoingInput!
      ) {
        AddProgressDoing(from: $from, to: $to, data: $data) {
          from {
            id
          }
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Create "CREATE" relation from Hero to Doday
 *
 * @param variables from Hero id to Doday id
 */

export const addDodayOwner = (variables: {
  from: { id: string };
  to: { id: string };
}) => {
  return client.mutate({
    mutation: gql`
      mutation AddDodayOwner($from: _HeroInput!, $to: _DodayInput!) {
        AddDodayOwner(from: $from, to: $to) {
          from {
            id
          }
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Add Doday to one of the Tag
 *
 * @param variables from Doday id to Tag id with weight of relation
 */

export const addDodayTag = (variables: {
  from: { id: string };
  to: { id: string };
  data: { weight: number };
}) => {
  return client.mutate({
    mutation: gql`
      mutation AddDodayTags(
        $from: _DodayInput!
        $to: _TagInput!
        $data: _TaggedDodayInput!
      ) {
        AddDodayTags(from: $from, to: $to, data: $data) {
          from {
            id
          }
        }
      }
    `,
    variables,
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Toggle Doday by changed prop on DOING relation.
 *
 * @param variables HeroID, DodayID, DateTime, Value
 */

export const toggleDoday = (variables: {
  heroID: string;
  dodayID: string;
  date: number;
  value: boolean;
}) => {
  return client.mutate({
    mutation: gql`
      mutation toggleDoday(
        $heroID: ID!
        $dodayID: ID!
        $date: Float!
        $value: Boolean
      ) {
        toggleDoday(
          heroID: $heroID
          dodayID: $dodayID
          date: $date
          value: $value
        ) {
          id
        }
      }
    `,
    variables,
  });
};
