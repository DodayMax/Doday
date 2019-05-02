import gql from 'graphql-tag';
import client from '../apollo-client';
import {
  SerializedActivity,
  SerializedActivityProgress,
} from '@root/lib/models/entities/Activity';
import { SerializedResource } from '@root/lib/models/entities/resource';

// Activities mutations

export const createActivityMutation = async (payload: {
  activity: SerializedActivity;
  resource: SerializedResource;
}) => {
  return fetch('/api/dodays/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload),
  });
};

export const takeActivityMutation = async (payload: {
  dodayDID: string;
  progress: Partial<SerializedActivityProgress>;
}) => {
  return fetch(`/api/dodays/${payload.dodayDID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload.progress),
  });
};

export const createAndTakeActivityMutation = async (payload: {
  activity: SerializedActivity;
  progress: SerializedActivityProgress;
  resource?: SerializedResource;
}) => {
  return fetch('/api/dodays', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload),
  });
};

export const deleteActivityMutation = (did: string) => {
  return fetch(`/api/dodays/delete/${did}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const removeActivityMutation = (did: string) => {
  return fetch(`/api/dodays/remove/${did}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const updateActivityMutation = ({
  did,
  updates,
}: {
  did: string;
  updates: {
    activity: Partial<SerializedActivity>;
    progress: Partial<SerializedActivityProgress>;
    resource: Partial<SerializedResource>;
  };
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
