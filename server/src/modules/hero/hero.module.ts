import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
//
import { DBModule } from '../db/db.module';
//
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { AuthMiddleware } from '../../middlewares/auth/auth.middleware';

@Module({
  imports: [DBModule],
  providers: [HeroService],
  exports: [HeroService],
  controllers: [HeroController],
})
export class HeroModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'heroes', method: RequestMethod.GET },
        { path: 'heroes', method: RequestMethod.PUT }
      );
  }
}
