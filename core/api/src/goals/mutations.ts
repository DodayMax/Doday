export const deleteGoal = (did: string) => {
  return fetch(`/api/goals/${did}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'true',
    },
  });
};
