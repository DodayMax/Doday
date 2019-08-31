// Heroes

export const fetchCurrentHero = () => {
  return fetch('/api/currentHero', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  }).then((res: Response) => {
    return res.status === 200 ? res.json() : '';
  });
};
