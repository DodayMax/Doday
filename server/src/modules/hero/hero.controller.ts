import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { Hero } from './hero.model';

@ApiUseTags('heroes')
@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async findAll(): Promise<Hero[]> {
    try {
      const heroes = await this.heroService.findAll();
      return heroes;
    } catch (error) {
      return error.message;
    }
  }

  @Get(':id')
  async findByID(@Param('id') id: string): Promise<Hero> {
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
