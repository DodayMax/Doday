import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/Doday';
import { dateInputStringFromDate } from '../util/date-utils';

export const activeDodaysForDate = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    date: number;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday)-[]-(p:Progress)-[]-(h:Hero)
      WHERE h.did = $heroDID AND p.date = date($date)
      RETURN d { .did, .name, .type, .public, date: p.date, completed: p.completed, completedAt: p.completedAt, tookAt: p.tookAt } as Doday
      ORDER BY p.completed
    `,
    {
      heroDID: props.heroDID,
      date: dateInputStringFromDate(new Date(props.date))
    }
  )
};

export const createAndTakeDoday = (
  tx: neo4j.Transaction,
  props: {
    doday: SerializedDoday;
    heroDID: string;
  }
) => {
  return tx.run(
    `
      CREATE (d:Doday { did: {did}, type: {type}, name: {name}, public: {public} })
      CREATE (p:Progress { did: {did}, ${
    props.doday.date ? 'date: date({date}),' : ''
    } completed: {completed}, tookAt: {tookAt} })
      WITH d, p
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
      ${
    props.doday.goalDID
      ? `
          MATCH (g:Goal { did: {goalDID} })
          CREATE (p)-[:INSIDE]->(g)
        `
      : ''
    }
    `,
    {
      ...props.doday,
      heroDID: props.heroDID,
      date: props.doday.date && dateInputStringFromDate(new Date(props.doday.date)),
      tookAt: Date.now(),
      completed: false,
    }
  );
};
