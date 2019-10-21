import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { NodesController } from './nodes.controller';
import { NodesService } from './nodes.service';
import { DBModule } from '../db/db.module';
import { AuthMiddleware } from '../../middlewares/auth/auth.middleware';

@Module({
  imports: [DBModule],
  controllers: [NodesController],
  exports: [NodesService],
  providers: [NodesService],
})
export class NodesModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'nodes', method: RequestMethod.GET },
        { path: 'nodes/:id/buy', method: RequestMethod.POST }
      );
  }
}
