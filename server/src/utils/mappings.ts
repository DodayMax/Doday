import { auth } from 'firebase-admin';
import { Neo4jRecord, Neo4jNode } from '@doday/lib';
import { Hero } from '../modules/hero/hero.model';

export const mapHeroFromToken = (user: auth.DecodedIdToken): Hero => {
  return {
    did: user.user_id,
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
};

export const parseNeo4jRecords = (records: Neo4jRecord[]) => {
  if (!records.length) return [];
  return records.map(record => {
    const node: Neo4jNode = record._fields[0];
    return {
      type: node.labels,
      ...node.properties,
    };
  });
};
