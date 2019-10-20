import { Injectable, Inject } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { parseNeo4jNodeRecord } from '../../utils';
import { DodaysQueryParamsDto } from './dto/dodays-query-params';
import { find, totalCount } from '../../queries/dodays';

@Injectable()
export class DodaysService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  async find(params: DodaysQueryParamsDto): Promise<any> {
    const session = this.dbService.neo4j().session();
    const parsedParams: DodaysQueryParamsDto = {};
    if (params.labels) {
      parsedParams.labels = params.labels.split(', ').join(' :');
      console.log(parsedParams);
    }
    const tx = session.beginTransaction();
    try {
      const dodays = await tx.run(find(parsedParams));
      const countResponse = await tx.run(totalCount(parsedParams));
      const parsed = dodays.records.map(record =>
        parseNeo4jNodeRecord(record as any)
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
