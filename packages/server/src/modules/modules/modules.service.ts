import { Injectable, Inject } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { Module, firstItem } from '@doday/lib';
import { buyModule } from '../../queries/modules';
import { parseNeo4jRecords } from '../../utils';

@Injectable()
export class ModulesService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  async buy(id: string, uid: string): Promise<Module> {
    const session = this.dbService.neo4j().session();
    try {
      return session
        .writeTransaction(tx => buyModule(tx, { did: id, uid }))
        .then(result => {
          session.close();
          return firstItem(parseNeo4jRecords(result.records as any));
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }
}
