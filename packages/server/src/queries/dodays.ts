import { NodesQueryParamsDto } from '@modules/nodes/dto/nodes-query-params';

export const find = (params: NodesQueryParamsDto) => {
  return `
        MATCH (d:${params.labels || 'Doday'})
        OPTIONAL MATCH (d)-[]-(p:Progress)-[]-(h:Hero { did: '${
          params.user.did
        }' })
        RETURN {
          doday: d,
          progress: p
        }
      `;
};

export const totalCount = (params: NodesQueryParamsDto) => {
  return `
        MATCH (n:${params.labels || 'Doday'})
        RETURN count(n) as count
      `;
};
