import { Controller, Get, Req, Param } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ModulesService } from './modules.service';
import { AuthorizedRequest, Module } from '@doday/lib';

@ApiUseTags('modules')
@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Get(':id/buy')
  async find(
    @Req() req: AuthorizedRequest,
    @Param('id') id: string
  ): Promise<{
    code: number;
    data: Module;
  }> {
    try {
      const boughtModule = await this.modulesService.buy(id, req.user.did);
      console.log(boughtModule);
      return {
        code: 200,
        data: boughtModule,
      };
    } catch (error) {
      return error.message;
    }
  }
}
