import { Module } from '@nestjs/common';
//
import { dbProviders } from './db.providers';
import { DBService } from './db.service';

@Module({
  providers: [...dbProviders, DBService],
  exports: [...dbProviders, DBService],
})
export class DBModule {}
