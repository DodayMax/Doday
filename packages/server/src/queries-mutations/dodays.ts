import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/doday';
import { endDay, startDay } from '../util/date-utils';
import { SerializedResource } from '../models/resource';
import { SerializedProgress } from '../models/progress';
import {
  DodaysQueryParams,
  DodaysWithProgressQueryParams,
} from '../controllers/dodays';

export const dodaysQuery = (
  tx: neo4j.Transaction,
  props: DodaysQueryParams
) => {
  return tx.run(
    `
      MATCH (d:Doday)-[]-(h:Hero)
      WHERE h.did = $heroDID
      AND d.public = true
      ${props.type ? `AND d.type = $type` : ''}
      ${props.createdBy ? `AND d.ownerDID = $createdBy` : ''}
      OPTIONAL MATCH (d)-[]-(take:Progress)
      OPTIONAL MATCH (d)-[]-(complete:Progress {completed: true})
      OPTIONAL MATCH (d)-[]-(pin:Progress {pinned: true})
      OPTIONAL MATCH (d)-[]-(overdue:Progress {overdue: true})
      OPTIONAL MATCH (r:Resource)-[]-(d)
      WITH d, r, (count(take) * 10) + (count(complete) * 20) + (count(pin) * 12) - (count(overdue) * 11) as rate
      RETURN {
        doday: d,
        rate: rate,
        resource: r
      }
      ORDER BY rate DESC, d.created DESC
      ${props.skip ? 'SKIP $skip' : ''}
      ${props.limit ? 'LIMIT $limit' : ''}
    `,
    {
      ...props,
    }
  );
};

export const dodaysCountQuery = (
  tx: neo4j.Transaction,
  props: DodaysQueryParams
) => {
  return tx.run(
    `
      MATCH (d:Doday)-[]-(h:Hero)
      WHERE h.did = $heroDID
      AND d.public = true
      ${props.type ? `AND d.type = $type` : ''}
      ${props.createdBy ? `AND d.ownerDID = $createdBy` : ''}
      RETURN count(d)
    `,
    {
      ...props,
    }
  );
};

export const dodaysWithProgressQuery = (
  tx: neo4j.Transaction,
  props: DodaysWithProgressQueryParams
) => {
  let dateQuery = '';
  let startDate;
  let endDate;

  if (!props.startdate && props.enddate) {
    endDate = props.enddate;
    dateQuery = 'AND p.date <= datetime($enddate)';
  } else if (props.startdate && props.enddate) {
    startDate = props.startdate;
    endDate = props.enddate;
    dateQuery =
      'AND p.date >= datetime($startdate) AND p.date <= datetime($enddate)';
  } else if (props.startdate && !props.enddate) {
    startDate = props.startdate;
    dateQuery = 'AND p.date >= datetime($startdate)';
  } else if (!props.startdate && !props.enddate && props.date) {
    startDate = props.date;
    endDate = props.date;
    dateQuery =
      'AND p.date >= datetime($startdate) AND p.date <= datetime($enddate)';
  } else if (props.exactDate) {
    endDate = props.exactDate;
    dateQuery = 'AND p.date <= datetime($enddate)';
  }
  return tx.run(
    `
      MATCH (d:Doday)-[]-(p:Progress)-[]-(h:Hero)
      WHERE h.did = $heroDID
      ${dateQuery}
      ${props.dodaytype ? `AND d.type = $dodaytype` : ''}
      ${props.completed != null ? `AND p.completed = $completed` : ''}
      ${props.createdBy ? `AND d.ownerDID = $createdBy` : ''}
      OPTIONAL MATCH (r:Resource)-[]-(d)
      RETURN {
        doday: d,
        progress: p,
        resource: r
      }
      ORDER BY p.completed
    `,
    {
      ...props,
      startdate: startDate && startDay(new Date(startDate)).toISOString(),
      enddate: endDate && endDay(new Date(endDate)).toISOString(),
    }
  );
};

export const dodayByDIDQuery = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday {did: $dodayDID})-[]-(h:Hero {did: $heroDID})
      OPTIONAL MATCH (r:Resource)-[]-(d)
      RETURN {
        doday: d,
        resource: r
      }
    `,
    {
      ...props,
    }
  );
};

export const dodayWithProgressByDIDQuery = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday {did: $dodayDID})-[]-(h:Hero {did: $heroDID})
      OPTIONAL MATCH (p:Progress {ownerDID: $heroDID})-[]-(d)
      OPTIONAL MATCH (r:Resource)-[]-(d)
      RETURN {
        doday: d,
        progress: p,
        resource: r
      }
    `,
    {
      ...props,
    }
  );
};

export const createDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    doday: SerializedDoday;
    resource: SerializedResource;
  }
) => {
  return tx.run(
    `
      CREATE (d:Doday $doday)
      ${
        props.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
          `
          : ''
      }
      WITH d ${props.resource ? ', r' : ''}
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      ${props.resource ? ' CREATE (d)-[:RESOURCE]->(r)' : ''}
    `,
    {
      doday: props.doday,
      resource: props.resource,
      resourceURL: props.resource && props.resource.url,
      heroDID: props.heroDID,
    }
  );
};

export const createAndTakeDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    doday: SerializedDoday;
    progress: SerializedProgress;
    resource: SerializedResource;
  }
) => {
  /** Omit date to convert it to neo4j datetime */
  const { date, ...passthrough } = props.progress;
  return tx.run(
    `
      CREATE (d:Doday $doday)
      CREATE (p:Progress $progress)
      ${date ? 'SET p.date = datetime($date)' : ''}
      SET p.tookAt = datetime($tookAt)
      ${
        props.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
          `
          : ''
      }
      WITH d, p ${props.resource ? ', r' : ''}
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
      ${props.resource ? ' CREATE (d)-[:RESOURCE]->(r)' : ''}
    `,
    {
      doday: props.doday,
      progress: passthrough,
      resource: props.resource,
      resourceURL: props.resource && props.resource.url,
      heroDID: props.heroDID,
      date: date && new Date(date).toISOString(),
      tookAt: new Date().toISOString(),
    }
  );
};

export const takeDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
    progress: SerializedProgress;
  }
) => {
  /** Omit date to convert it to neo4j datetime */
  const { date, ...passthrough } = props.progress;
  return tx.run(
    `
      MATCH (d:Doday { did: $dodayDID })
      MATCH (h:Hero { did: $heroDID })
      CREATE (p:Progress $progress)
      ${date ? 'SET p.date = datetime($date)' : ''}
      SET p.tookAt = datetime($tookAt)
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
    `,
    {
      heroDID: props.heroDID,
      dodayDID: props.dodayDID,
      progress: passthrough,
      date: date && new Date(date).toISOString(),
      tookAt: new Date().toISOString(),
    }
  );
};

export const deleteDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress {ownerDID: $heroDID})
      MATCH (d:Doday {did: $dodayDID})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p)<-[r3:DOING]-(h)
      OPTIONAL MATCH (d)-[r4:RESOURCE]-(:Resource)
      OPTIONAL MATCH (p)-[r5:INSIDE]-(:Goal)
      DELETE r1, r2, r3, r4, r5, d, p
    `,
    {
      ...props,
    }
  );
};

export const removeDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday {did: $dodayDID})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p:Progress {ownerDID: $heroDID})<-[r3:DOING]-(h)
      OPTIONAL MATCH (p)-[r4:INSIDE]-(:Goal)
      DELETE r2, r3, r4, p
    `,
    {
      ...props,
    }
  );
};

export const updateDodayTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dodayDID: string;
    updates: {
      doday: Partial<SerializedDoday>;
      progress: Partial<SerializedProgress>;
      resource: Partial<SerializedResource>;
    };
  }
) => {
  /** Omit date to convert it to neo4j datetime */
  const { date, ...passthrough } = props.updates.progress;
  return tx.run(
    `
      MATCH (d:Doday {did: $did})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p:Progress {ownerDID: $heroDID})<-[r3:DOING]-(h)
      ${props.updates.doday ? 'SET d += $doday' : ''}
      ${props.updates.progress ? 'SET p += $progress' : ''}
      ${date ? 'SET p.date = datetime($date)' : ''}
      ${
        props.updates.progress.completed
          ? 'SET p.completedAt = datetime($completedAt)'
          : ''
      }
      ${
        props.updates.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
            WITH d, p, r
            CREATE (d)-[:RESOURCE]->(r)
          `
          : ''
      }
    `,
    {
      heroDID: props.heroDID,
      did: props.dodayDID,
      doday: props.updates.doday,
      progress: passthrough,
      resource: props.updates.resource,
      date: date && new Date(date).toISOString(),
      completedAt: new Date().toISOString(),
    }
  );
};

export const multyUpdateDodaysTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    dids: string[];
    updates: {
      doday?: Partial<SerializedDoday>;
      progress?: Partial<SerializedProgress>;
    };
  }
) => {
  /** Omit date to convert it to neo4j datetime */
  const { date, ...passthrough } = props.updates.progress;
  return tx.run(
    `
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d: Doday)<-[r2:ORIGIN]-(p: Progress)<-[r3:DOING]-(h)
      WHERE p.did IN $dids
      SET d += $doday
      SET p += $progress
      ${date ? 'SET p.date = datetime($date)' : ''}
      ${
        props.updates.progress.completed
          ? 'SET p.completedAt = datetime($completedAt)'
          : ''
      }
    `,
    {
      heroDID: props.heroDID,
      dids: props.dids,
      doday: props.updates.doday,
      progress: passthrough,
      date: date && new Date(date).toISOString(),
      completedAt: new Date().toISOString(),
    }
  );
};
