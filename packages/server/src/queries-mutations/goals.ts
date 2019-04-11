import { v1 as neo4j } from 'neo4j-driver';
import { SerializedGoal } from '../models/Goal';
import { dateInputStringFromDate, isToday } from '../util/date-utils';

export const getAllGoalsQuery = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
  }
) => {
  return tx.run(
    `
      MATCH (h:Hero {did: $heroDID})-[]-(g: Goal)
      RETURN g
    `,
    {
      heroDID: props.heroDID,
    }
  );
};

export const createGoalMutation = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    goal: SerializedGoal;
  }
) => {
  return tx.run(
    `
      CREATE (g: Goal { did: $did, type: $type, name: $name, startDate: date($startDate), endDate: date($endDate) })
      with g
      MATCH (h:Hero {did: $heroDID})
      CREATE (h)-[:GOAL]->(g)
    `,
    {
      ...props.goal,
      heroDID: props.heroDID,
      startDate: dateInputStringFromDate(new Date(props.goal.startDate)),
      endDate: dateInputStringFromDate(new Date(props.goal.endDate)),
    }
  );
};
