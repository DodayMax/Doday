import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HeroModule } from './modules/hero/hero.module';
import { DBModule } from './modules/db/db.module';
import { DodaysModule } from './modules/dodays/dodays.module';
import { ToolsService } from './modules/tools/tools.service';
//

@Module({
  imports: [DBModule, AuthModule, HeroModule, DodaysModule],
  providers: [ToolsService],
})
export class AppModule {}
