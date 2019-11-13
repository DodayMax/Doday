import { Injectable, Inject } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { parseNeo4jNodeRecord } from '../../utils';
import { NodesQueryParamsDto } from './dto/nodes-query-params';
import { find, totalCount } from '../../queries/dodays';

@Injectable()
export class NodesService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  async find(params: NodesQueryParamsDto): Promise<any> {
    const session = this.dbService.neo4j().session();
    const parsedParams: NodesQueryParamsDto = { user: params.user };
    if (params.labels) {
      parsedParams.labels = params.labels.split(',').join(' :');
    }
    const tx = session.beginTransaction();
    try {
      const nodes = await tx.run(find(parsedParams));
      const countResponse = await tx.run(totalCount(parsedParams));
      const parsed = nodes.records.map(node =>
        parseNeo4jNodeRecord(node as any)
      );
      tx.commit();
      return {
        items: parsed,
        count: countResponse.records[0].get('count'),
      };
    } catch (error) {
      tx.rollback();
      return error.message;
    } finally {
      session.close();
    }
  }
}
