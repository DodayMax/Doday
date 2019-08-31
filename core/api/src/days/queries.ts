// Dodays

export const planOutStartFromDate = (date: number) => {
  return fetch(`/api/utils/planout?date=${String(date)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then(async (res: Response) => {
    return console.log(res);
  });
};
