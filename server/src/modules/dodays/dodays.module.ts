import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DodaysController } from './dodays.controller';
import { DodaysService } from './dodays.service';
import { DBModule } from '../db/db.module';
import { AuthMiddleware } from '../../middlewares/auth/auth.middleware';

@Module({
  imports: [DBModule],
  controllers: [DodaysController],
  exports: [DodaysService],
  providers: [DodaysService],
})
export class DodaysModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'dodays', method: RequestMethod.GET },
        { path: 'dodays/:id/buy', method: RequestMethod.POST }
      );
  }
}
