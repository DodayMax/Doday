import { v1 as neo4j } from 'neo4j-driver';

export const findAllTools = (tx: neo4j.Transaction) => {
  return tx.run(
    `
        MATCH (t:Tool)
        RETURN t
      `
  );
};
