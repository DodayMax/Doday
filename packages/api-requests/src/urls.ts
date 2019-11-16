import { API_URL } from '@doday/lib';

export const createAPIUrl = (params?: any) => ({
  auth: {
    signin: `${API_URL}/auth/signin`,
    me: `${API_URL}/auth/me`,
  },
  dodays: {
    get: `${API_URL}/nodes?labels=Module`,
  },
  modules: {
    buy: (id: string) => `${API_URL}/modules/${id}/buy`,
  },
});
