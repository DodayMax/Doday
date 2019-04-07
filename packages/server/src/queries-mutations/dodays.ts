import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/Doday';
import { dateInputStringFromDate, isToday } from '../util/date-utils';

export const activeDodaysForDateQuery = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    date: number;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday)-[]-(p:Progress)-[]-(h:Hero)
      WHERE h.did = $heroDID AND p.date ${
        isToday(new Date(props.date)) ? '<=' : '='
      } date($date)
      RETURN d { .did, .name, .type, .public, date: p.date, completed: p.completed, completedAt: p.completedAt, tookAt: p.tookAt } as Doday
      ORDER BY p.completed
    `,
    {
      heroDID: props.heroDID,
      date: dateInputStringFromDate(new Date(props.date)),
    }
  );
};

export const createAndTakeDodayTransaction = (
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
      date:
        props.doday.date && dateInputStringFromDate(new Date(props.doday.date)),
      tookAt: Date.now(),
      completed: false,
    }
  );
};

export const toggleDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    did: string;
    value: boolean;
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress {did: $did})
      SET p.completed = $value
      SET p.completedAt = date($date)
    `,
    {
      did: props.did,
      value: props.value,
      date: dateInputStringFromDate(new Date()),
    }
  );
};

export const deleteDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    did: string;
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress {did: $did})
      MATCH (d:Doday {did: $did})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r:CREATE]->(d)<-[r1:ORIGIN]-(p)<-[r2:DOING]-(h)
      DELETE r, r1, r2, d, p
    `,
    {
      heroDID: props.heroDID,
      did: props.did,
    }
  );
};
