import { Goal } from '@root/lib/models/entities/Goal';
import { neo4jResponseDateToJSDate } from '@root/lib/utils';

// Goals

export const fetchAllGoals = () => {
  return fetch(`/api/goals`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  }).then((res: Response) => {
    return parseGoalsResponse(res);
  });
};

export const parseGoalsResponse = async (res): Promise<Goal[]> => {
  const json = await res.json();
  const goals = [];
  json.map(goal => {
    goal._fields.map(node => {
      const goal = node.properties;
      const startDate = goal.startDate;
      const endDate = goal.endDate;
      goal.startDate = neo4jResponseDateToJSDate(startDate);
      goal.endDate = neo4jResponseDateToJSDate(endDate);
      goals.push(goal);
    });
  });
  return goals;
};
