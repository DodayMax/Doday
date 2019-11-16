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

export const parseHeroNeo4jRecords = (records: Neo4jRecord[]): Node[] => {
  if (!records.length) return [];
  return records.map(record => {
    const node: {
      hero: Neo4jNode;
      modules?: { doday: Neo4jNode; progress: Neo4jNode }[];
    } = record._fields[0];
    return {
      labels: node.hero.labels,
      ...node.hero.properties,
      activeModules:
        node.modules &&
        node.modules.map(entity => ({
          doday: mapNode(entity.doday),
          progress: mapNode(entity.progress),
        })),
    };
  });
};

export const parseNeo4jRecords = (records: Neo4jRecord[]): Node[] => {
  if (!records.length) return [];
  return records.map(record => {
    const node: Neo4jNode = record._fields[0];
    console.log(node);
    return {
      labels: node.labels,
      ...node.properties,
    };
  });
};

export const parseNeo4jNodeRecord = (record: Neo4jRecord): Node => {
  const node = record._fields[0];
  return {
    doday: node.doday && mapNode(node.doday),
    progress: node.progress && mapNode(node.progress),
  } as any;
};

export const mapNode = (node: Neo4jNode): Node => ({
  labels: node.labels,
  ...node.properties,
});
