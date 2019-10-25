import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { HeroModel } from './hero.model';

@ApiUseTags('heroes')
@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get(':id')
  async findByID(@Param('id') id: string): Promise<HeroModel> {
    try {
      const hero = await this.heroService.findById(id);

      if (!hero) {
        throw new NotFoundException('Hero not found');
      }

      return hero;
    } catch (error) {
      return error.message;
    }
  }
}
