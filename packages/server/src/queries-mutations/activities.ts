import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/doday';
import { SerializedProgress } from '../models/progress';
import { Resource } from '../models/resource';

export const createActivityTransaction = (
  tx: neo4j.Transaction,
  props: {
    activity: SerializedDoday;
    resource: Resource;
    heroDID: string;
  }
) => {
  return tx.run(
    `
      CREATE (d:Doday {
        did: {did},
        activityType: {activityType},
        type: {type},
        name: {name},
        duration: {duration},
        ${props.activity.tags ? ' tags: {tags},' : ''}
        public: {public},
        ownerDID: {heroDID}
      })
      ${
        props.activity.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
          `
          : ''
      }
      WITH d ${props.activity.resource ? ', r' : ''}
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      ${props.activity.resource ? ' CREATE (d)-[:RESOURCE]->(r)' : ''}
    `,
    {
      ...props.doday,
      resourceURL: props.doday.resource && props.doday.resource.url,
      heroDID: props.heroDID,
    }
  );
};

export const createAndTakeActivityTransaction = (
  tx: neo4j.Transaction,
  props: {
    payload: {
      activity: Partial<SerializedDoday>;
      progress: Partial<SerializedProgress>;
    };
    heroDID: string;
  }
) => {
  return tx.run(
    `
      CREATE (d:Doday {
        did: {did},
        activityType: {activityType},
        type: {type},
        name: {name},
        duration: {duration}, 
        ${props.payload.activity.tags ? ' tags: {tags},' : ''}
        public: {public},
        ownerDID: {heroDID}
      })
      CREATE (p:Progress {
        did: {did},
        ${props.payload.progress.date ? 'date: datetime({date}),' : ''}
        dateIsLocked: {dateIsLocked},
        completed: {completed},
        tookAt: datetime({tookAt})
        ownerDID: {heroDID}
      })
      ${
        props.payload.activity.resource
          ? `
            MERGE (r:Resource {url: {resourceURL}})
            ON CREATE SET r = {resource}
          `
          : ''
      }
      WITH d, p ${props.payload.activity.resource ? ', r' : ''}
      MATCH (h:Hero { did: {heroDID} })
      CREATE (h)-[:CREATE]->(d)
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
      ${props.payload.activity.resource ? ' CREATE (d)-[:RESOURCE]->(r)' : ''}
    `,
    {
      ...props.payload.activity,
      resourceURL:
        props.payload.activity.resource && props.payload.activity.resource.url,
      heroDID: props.heroDID,
      date:
        props.payload.progress.date &&
        new Date(props.payload.progress.date).toISOString(),
      tookAt: new Date().toISOString(),
      completed: false,
    }
  );
};

export const takeActivityTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    did: string;
    date: number;
    dateIsLocked: boolean;
  }
) => {
  return tx.run(
    `
      MATCH (d:Doday { did: $did })
      MATCH (h:Hero { did: $heroDID })
      CREATE (p:Progress {
        did: $did,
        ${props.date ? 'date: datetime($date),' : ''}
        dateIsLocked: $dateIsLocked,
        completed: false,
        tookAt: datetime($tookAt)
        ownerDID: {heroDID}
      })
      CREATE (h)-[:DOING]->(p)
      CREATE (p)-[:ORIGIN]->(d)
    `,
    {
      did: props.did,
      heroDID: props.heroDID,
      date: new Date(props.date).toISOString(),
      tookAt: new Date().toISOString(),
    }
  );
};

export const deleteActivityTransaction = (
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

export const removeActivityTransaction = (
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

export const updateActivityTransaction = (
  tx: neo4j.Transaction,
  props: {
    heroDID: string;
    did: string;
    updates: {
      activity: Partial<SerializedDoday>;
      progress: Partial<SerializedProgress>;
    };
  }
) => {
  return tx.run(
    `
      MATCH (p:Progress {did: $did})
      MATCH (d:Doday {did: $did})
      MATCH (h:Hero {did: $heroDID})
      MATCH (h)-[r1:CREATE]->(d)<-[r2:ORIGIN]-(p)<-[r3:DOING]-(h)
      SET d += $activity
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
      activity: props.updates.activity,
      date: props.updates.date && new Date(props.updates.date).toISOString(),
      dateIsLocked: props.updates.dateIsLocked,
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
