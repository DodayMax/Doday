import gql from 'graphql-tag';
import client from '../apollo-client';
import { SerializedDoday, Doday } from '@root/lib/models/entities/Doday';

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

export const toggleDoday = ({
  did,
  value,
}: {
  did: string;
  value: boolean;
}) => {
  return fetch(`/api/dodays/${did}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify({ value }),
  });
};

export const deleteDoday = (did: string) => {
  return fetch(`/api/dodays/delete/${did}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const removeDoday = (did: string) => {
  return fetch(`/api/dodays/remove/${did}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const updateDoday = ({
  did,
  updates,
}: {
  did: string;
  updates: Partial<SerializedDoday>;
}) => {
  return fetch(`/api/dodays/${did}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(updates),
  });
};

/////////////////////////////////////////////////////////////////

/**
 * Toggle Doday by changed prop on DOING relation.
 *
 * @param variables HeroID, DodayID, DateTime, Value
 */

export const toggleDodayOld = (variables: {
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
