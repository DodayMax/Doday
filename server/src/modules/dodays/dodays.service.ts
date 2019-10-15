import { Injectable, Inject } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { parseNeo4jRecords } from '../../utils';
import { DodaysQueryParamsDto } from './dto/dodays-query-params';
import { find } from '../../transactions/dodays';

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
    try {
      return session
        .readTransaction(tx => find(tx, parsedParams))
        .then(result => {
          session.close();
          console.log(result);
          return {
            items: parseNeo4jRecords(result.records as any),
          };
        });
    } catch (error) {
      session.close();
      return error.message;
    }
  }
}
