import { v1 as neo4j } from 'neo4j-driver';
import { HeroModel } from '../modules/hero/hero.model';

export const createHero = (tx: neo4j.Transaction, props: HeroModel) => {
  return tx.run(
    `MERGE (h: Hero {
      did: {did},
      name: {name},
      createdAt: {createdAt},
      updatedAt: {updatedAt},
      ${props.picture ? 'picture: {picture},' : ''}
      ${props.email ? 'email: {email}' : ''}
    }) RETURN h`,
    props
  );
};

export const findHeroById = (tx: neo4j.Transaction, props: { did: string }) => {
  return tx.run(
    `
        MATCH (h:Hero { did: $did })
        OPTIONAL MATCH (h)-[]-(ep:Progress)-[]-(e:Entity)
        WITH h, e, ep, CASE WHEN e IS NULL THEN NULL ELSE collect({
            doday: e,
            progress: ep
          }) END as entities
        OPTIONAL MATCH (h)-[]-(p:Progress)-[]-(m:Module)
        WITH h, p, m, entities
        RETURN {
          hero: h,
          entities: entities,
          modules: CASE WHEN m IS NULL THEN NULL ELSE collect({
            doday: m,
            progress: p
          }) END
        }
      `,
    props
  );
};
