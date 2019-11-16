import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HeroModule } from './modules/hero/hero.module';
import { DBModule } from './modules/db/db.module';
import { NodesModule } from './modules/nodes/nodes.module';
import { ModulesService } from './modules/modules/modules.service';
import { ModulesModule } from './modules/modules/modules.module';
//

@Module({
  imports: [DBModule, AuthModule, HeroModule, NodesModule, ModulesModule],
  providers: [ModulesService],
})
export class AppModule {}
