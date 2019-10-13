import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Hero } from './hero.model';
import { findHeroById, createHero } from '../../transactions/heroes';
import { auth } from 'firebase-admin';
import { mapHeroFromToken, parseNeo4jRecords } from '../../utils';
import { firstItem } from '@doday/lib';

@Injectable()
export class HeroService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}
  async findAll(): Promise<any> {
    try {
      return this.dbService
        .neo4j()
        .session()
        .run('MATCH (n:Movie) RETURN n LIMIT 5');
    } catch (error) {
      return error.message;
    }
  }

  async findById(id: string): Promise<any> {
    const session = this.dbService.neo4j().session();
    try {
      return session
        .readTransaction(tx => findHeroById(tx, { did: id }))
        .then(result => {
          session.close();
          return firstItem(parseNeo4jRecords(result.records as any));
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }

  async create(user: auth.DecodedIdToken): Promise<Hero> {
    const session = this.dbService.neo4j().session();
    const hero = mapHeroFromToken(user);
    hero.createdAt = new Date().toISOString();
    hero.updatedAt = new Date().toISOString();
    try {
      return session
        .writeTransaction(tx => createHero(tx, hero))
        .then(result => {
          session.close();
          if (result.records.length) {
            return (result.records[0] as any)._fields[0].properties as Hero;
          }
          throw new NotFoundException();
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }
}
