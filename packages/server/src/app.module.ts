import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HeroModule } from './modules/hero/hero.module';
import { DBModule } from './modules/db/db.module';
import { NodesModule } from './modules/nodes/nodes.module';
import { ToolsService } from './modules/tools/tools.service';
//

@Module({
  imports: [DBModule, AuthModule, HeroModule, NodesModule],
  providers: [ToolsService],
})
export class AppModule {}
