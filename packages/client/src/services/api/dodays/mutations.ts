import { SerializedResource } from '@root/lib/models/entities/resource';
import {
  SerializedDodayLike,
  SerializedProgressLike,
} from '@root/lib/models/entities/common';

// Dodays mutations

export const createDodayMutation = async (payload: {
  doday: SerializedDodayLike;
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

export const takeDodayMutation = async (payload: {
  dodayDID: string;
  progress: Partial<SerializedProgressLike>;
}) => {
  return fetch(`/api/dodays/${payload.dodayDID}/take`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload.progress),
  });
};

export const createAndTakeDodayMutation = async (payload: {
  doday: SerializedDodayLike;
  progress: SerializedProgressLike;
  resource?: SerializedResource;
}) => {
  return fetch('/api/dodays?take=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(payload),
  });
};

export const deleteDodayMutation = (did: string) => {
  return fetch(`/api/dodays/${did}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const untakeDodayMutation = (did: string) => {
  return fetch(`/api/dodays/${did}/untake`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};

export const updateDodayMutation = ({
  did,
  updates,
}: {
  did: string;
  updates: {
    doday?: Partial<SerializedDodayLike>;
    progress?: Partial<SerializedProgressLike>;
    resource?: Partial<SerializedResource>;
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
