import { v1 as neo4j } from 'neo4j-driver';
import { DodaysQueryParamsDto } from '@modules/dodays/dto/dodays-query-params';

export const find = (tx: neo4j.Transaction, params: DodaysQueryParamsDto) => {
  return tx.run(
    `
        MATCH (n:${params.labels || 'Doday'})
        RETURN n
      `
  );
};
