import { Controller, Get, Query } from '@nestjs/common';
import { ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { DodaysService } from './dodays.service';
import { Doday } from '@doday/lib';

@ApiUseTags('dodays')
@Controller('dodays')
export class DodaysController {
  constructor(private readonly dodaysService: DodaysService) {}

  @Get()
  @ApiImplicitQuery({ name: 'name', required: false })
  @ApiImplicitQuery({ name: 'labels', required: false, isArray: true })
  @ApiImplicitQuery({ name: 'skip', required: false, type: Number })
  @ApiImplicitQuery({ name: 'limit', required: false, type: Number })
  async find(
    @Query('name') name?: string,
    @Query('labels') labels?: string,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string
  ): Promise<{
    items: Doday[];
    count: number;
  }> {
    try {
      const dodays = await this.dodaysService.find({
        name,
        labels,
        skip,
        limit,
      });
      return dodays;
    } catch (error) {
      return error.message;
    }
  }
}
