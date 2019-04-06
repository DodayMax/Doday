import { v1 as neo4j } from 'neo4j-driver';
import { SerializedDoday } from '../models/Doday';

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
      CREATE (p:Progress { did: {did}, completed: {completed}, tookAt: {tookAt} })
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
      tookAt: Date.now(),
      completed: false,
    }
  );
};
