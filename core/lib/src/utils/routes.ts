import { BASE_ROUTES } from '../constants/routes';

export const createRoute = (params?: any) => ({
  store: {
    page: `${BASE_ROUTES.store}`,
  },
  dodays: {
    id: (id: string) => {
      return `/dodays/${id}`;
    },
  },
  progress: {
    id: (id: string) => {
      return `/progress/${id}`;
    },
  },
  builder: (tool: string) => `/builder/${tool}`,
  profile: {
    page: `${BASE_ROUTES.profile}`,
  },
});

export const parseRoute = (route: string) => {
  const parts = route.split('?');
  const base = parts[0];
  const params = {};
  if (parts.length > 1) {
    const hashes = route.slice(route.indexOf('?') + 1).split('&');
    hashes.map(hash => {
      const [key, val] = hash.split('=');
      params[key] = decodeURIComponent(val);
    });
  }

  return {
    base,
    params,
  };
};
