import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
//
import { HeroModule } from '../hero/hero.module';
import { HeroService } from '../hero/hero.service';
//
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DBModule } from '../db/db.module';
import { DBService } from '../db/db.service';
import { AuthMiddleware } from '../../middlewares/auth/auth.middleware';

@Module({
  imports: [HeroModule, DBModule],
  providers: [AuthService, HeroService, DBService],
  controllers: [AuthController],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/me', method: RequestMethod.GET });
  }
}
