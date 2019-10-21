import { auth } from 'firebase-admin';
import { Neo4jRecord, Neo4jNode, Node } from '@doday/lib';
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

export const parseNeo4jRecords = (records: Neo4jRecord[]): Node[] => {
  if (!records.length) return [];
  return records.map(record => {
    const node: Neo4jNode = record._fields[0];
    return {
      labels: node.labels,
      ...node.properties,
    };
  });
};

export const parseNeo4jNodeRecord = (record: Neo4jRecord): Node => {
  const node: Neo4jNode = record._fields[0];
  return {
    labels: node.labels,
    ...node.properties,
  };
};
