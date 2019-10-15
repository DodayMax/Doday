import { auth } from 'firebase-admin';
import { Neo4jRecord, Neo4jNode, Doday } from '@doday/lib';
import { HeroModel } from '../modules/hero/hero.model';

export const mapHeroFromToken = (
  user: auth.DecodedIdToken
): Partial<HeroModel> => {
  return {
    did: user.user_id,
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
};

export const parseNeo4jRecords = (records: Neo4jRecord[]): Doday[] => {
  if (!records.length) return [];
  return records.map(record => {
    const node: Neo4jNode = record._fields[0];
    return {
      labels: node.labels,
      ...node.properties,
    };
  });
};
