import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ModulesController } from './modules.controller';
import { ModulesService } from './modules.service';
import { DBModule } from '../db/db.module';
import { AuthMiddleware } from '../../middlewares/auth/auth.middleware';

@Module({
  imports: [DBModule],
  controllers: [ModulesController],
  exports: [ModulesService],
  providers: [ModulesService],
})
export class ModulesModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'modules/:id/buy', method: RequestMethod.GET });
  }
}
