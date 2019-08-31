// Hero

/////////////////////////////////////////////////////////////////

export const createHeroNode = async (variables: any) => {
  return fetch('/api/heroes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
    body: JSON.stringify(variables), // body data type must match "Content-Type" header
  });
};
