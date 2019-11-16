import { v1 as neo4j } from 'neo4j-driver';
import cuid = require('cuid');

export const buyModule = (
  tx: neo4j.Transaction,
  params: { did: string; uid: string }
) => {
  return tx.run(
    `
        MATCH (t:Tool {did: '${params.did}'})
        MATCH (h:Hero {did: '${params.uid}'})
        MERGE (t)<-[:InProgress]-(p:Progress)<-[:Bought]-(h)
        ON CREATE SET p.did = '${cuid()}', p.public = true, p.createdAt = '${new Date().toISOString()}'
        RETURN t
      `
  );
};
