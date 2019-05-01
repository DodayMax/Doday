import gql from 'graphql-tag';
import client from '../apollo-client';
import { SerializedActivity } from '@root/lib/models/entities/Activity';

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

// Activities mutations

export const createActivityMutation = async (activity: SerializedActivity) => {
  return fetch('/api/activities/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(activity),
  });
};

export const takeDoday = async (did: string) => {
  return fetch(`/api/dodays/take/${did}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

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
