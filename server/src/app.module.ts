import { Module } from '@nestjs/common';
//
import { AuthModule } from './modules/auth/auth.module';
import { HeroModule } from './modules/hero/hero.module';
import { DBModule } from './modules/db/db.module';

@Module({
  imports: [DBModule, AuthModule, HeroModule],
})
export class AppModule {}
