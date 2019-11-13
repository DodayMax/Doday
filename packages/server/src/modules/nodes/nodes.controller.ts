import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { NodesService } from './nodes.service';
import { Node, AuthorizedRequest } from '@doday/lib';

@ApiUseTags('nodes')
@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Get()
  @ApiImplicitQuery({ name: 'name', required: false })
  @ApiImplicitQuery({ name: 'labels', required: false, isArray: true })
  @ApiImplicitQuery({ name: 'skip', required: false, type: Number })
  @ApiImplicitQuery({ name: 'limit', required: false, type: Number })
  async find(
    @Req() req: AuthorizedRequest,
    @Query('name') name?: string,
    @Query('labels') labels?: string,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string
  ): Promise<{
    items: Node[];
    count: number;
  }> {
    try {
      const nodes = await this.nodesService.find({
        name,
        labels,
        skip,
        limit,
        user: req.user,
      });
      return nodes;
    } catch (error) {
      return error.message;
    }
  }
}
