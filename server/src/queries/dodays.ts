import { DodaysQueryParamsDto } from '@modules/dodays/dto/dodays-query-params';

export const find = (params: DodaysQueryParamsDto) => {
  return `
        MATCH (n:${params.labels || 'Doday'})
        RETURN n, count(n)
      `;
};

export const totalCount = (params: DodaysQueryParamsDto) => {
  return `
        MATCH (n:${params.labels || 'Doday'})
        RETURN count(n) as count
      `;
};
