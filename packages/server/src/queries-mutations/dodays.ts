import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/Doday';
import { isToday, endDay, startDay } from '../util/date-utils';

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
      WHERE h.did = $heroDID AND ${
        isToday(new Date(props.date))
          ? 'p.date <= datetime($endDay)'
          : 'p.date >= datetime($startDay) AND p.date <= datetime($endDay)'
      } AND p.completed = false
      OPTIONAL MATCH (p)-[]-(g:Goal)
      RETURN d {
        .did,
        .name,
        .duration,
        .type,
        .activityType,
        .tags,
        .public,
        date: p.date,
        dateIsLocked: p.dateIsLocked,
        completed: p.completed,
        completedAt: p.completedAt,
        tookAt: p.tookAt,
        relatedGoal: { did: g.did, name: g.name, color: g.color }
      } as Doday
      UNION ALL MATCH (d:Doday)-[]-(p:Progress)-[]-(h:Hero)
      WHERE h.did = $heroDID AND p.completedAt >= datetime($startDay) AND p.completedAt <= datetime($endDay) AND p.completed = true
      OPTIONAL MATCH (p)-[]-(g:Goal)
      RETURN d {
        .did,
        .name,
        .duration,
        .type,
        .activityType,
        .tags,
        .public,
        date: p.date,
        dateIsLocked: p.dateIsLocked,
        completed: p.completed,
        completedAt: p.completedAt,
        tookAt: p.tookAt,
        relatedGoal: { did: g.did, name: g.name, color: g.color }
      } as Doday
      ORDER BY p.completed
    `,
    {
      heroDID: props.heroDID,
      startDay: startDay(new Date(props.date)).toISOString(),
      endDay: endDay(new Date(props.date)).toISOString(),
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
      CREATE (d:Doday { did: {did}, activityType: {activityType}, type: {type}, name: {name}, duration: {duration}, ${
        props.doday.tags ? ' tags: {tags}' : ''
      } public: {public} })
      CREATE (p:Progress { did: {did}, ${
        props.doday.date ? 'date: datetime({date}),' : ''
      } dateIsLocked: {dateIsLocked}, completed: {completed}, tookAt: datetime({tookAt}) })
      ${
        props.doday.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
          `
          : ''
      }
      WITH d, p ${props.doday.resource ? ', r' : ''}
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
      ${props.doday.resource ? ' CREATE (d)-[:RESOURCE]->(r)' : ''}
      ${
        props.doday.relatedGoal
          ? `
          WITH p
          MATCH (g:Goal { did: {relatedGoal} })
          CREATE (p)-[:INSIDE]->(g)
        `
          : ''
      }
    `,
    {
      ...props.doday,
      resourceURL: props.doday.resource && props.doday.resource.url,
      heroDID: props.heroDID,
      date: props.doday.date && new Date(props.doday.date).toISOString(),
      tookAt: new Date().toISOString(),
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
      SET p.completedAt = datetime($date)
    `,
    {
      did: props.did,
      value: props.value,
      date: new Date().toISOString(),
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
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p)<-[r3:DOING]-(h)
      OPTIONAL MATCH (d)-[r4:RESOURCE]-(:Resource)
      OPTIONAL MATCH (p)-[r5:INSIDE]-(:Goal)
      DELETE r1, r2, r3, r4, r5, d, p
    `,
    {
      heroDID: props.heroDID,
      did: props.did,
    }
  );
};

export const removeDodayTransaction = (
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
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p)<-[r3:DOING]-(h)
      OPTIONAL MATCH (p)-[r4:INSIDE]-(:Goal)
      DELETE r2, r3, r4, p
    `,
    {
      heroDID: props.heroDID,
      did: props.did,
    }
  );
};

export const updateDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    did: string;
    updates: Partial<SerializedDoday>;
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress {did: $did})
      MATCH (d:Doday {did: $did})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p)<-[r3:DOING]-(h)
      ${
        props.updates.relatedGoal
          ? `
      MATCH (g:Goal {did: $relatedGoal})
      OPTIONAL MATCH (p)-[r4:INSIDE]-(:Goal)
      DELETE r4
      CREATE (p)-[:INSIDE]->(g)
      `
          : ''
      }
      ${props.updates.date ? 'SET p.date = datetime($date)' : ''}
      ${
        props.updates.dateIsLocked != null
          ? 'SET p.dateIsLocked = $dateIsLocked'
          : ''
      }
    `,
    {
      heroDID: props.heroDID,
      did: props.did,
      date: props.updates.date && new Date(props.updates.date).toISOString(),
      dateIsLocked: props.updates.dateIsLocked,
      relatedGoal: props.updates.relatedGoal,
    }
  );
};

export const multyUpdateDodaysTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dids: string[];
    updates: Partial<SerializedDoday>;
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress)-[]-(h:Hero)
      WHERE p.did IN $dids AND h.did = $heroDID
      ${props.updates.date ? 'SET p.date = datetime($date)' : ''}
    `,
    {
      heroDID: props.heroDID,
      dids: props.dids,
      date: props.updates.date && new Date(props.updates.date).toISOString(),
    }
  );
};
