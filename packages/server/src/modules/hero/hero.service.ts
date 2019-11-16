import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { HeroModel } from './hero.model';
import { findHeroById, createHero } from '../../queries/heroes';
import { auth } from 'firebase-admin';
import { mapHeroFromToken } from '../../utils';
import { firstItem } from '@doday/lib';
import { parseHeroNeo4jRecords } from '../../utils';

@Injectable()
export class HeroService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  async findById(id: string): Promise<HeroModel> {
    const session = this.dbService.neo4j().session();
    try {
      return session
        .readTransaction(tx => findHeroById(tx, { did: id }))
        .then(result => {
          session.close();
          return firstItem(parseHeroNeo4jRecords(result.records as any));
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }

  async create(user: auth.DecodedIdToken): Promise<HeroModel> {
    const session = this.dbService.neo4j().session();
    const hero = mapHeroFromToken(user);
    hero.createdAt = new Date().toISOString();
    hero.updatedAt = new Date().toISOString();
    try {
      return session
        .writeTransaction(tx => createHero(tx, hero as HeroModel))
        .then(result => {
          session.close();
          if (result.records.length) {
            return (result.records[0] as any)._fields[0]
              .properties as HeroModel;
          }
          throw new NotFoundException();
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }
}
