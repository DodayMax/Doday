import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiUseTags, ApiOkResponse } from '@nestjs/swagger';
//
import { AuthService } from './auth.service';
import { AuthSigninDto, AuthSigninResponseDto } from './dto/auth-signin.dto';
import { HeroService } from '../hero/hero.service';
import { HeroModel } from '@modules/hero/hero.model';
import { AuthorizedRequest } from '@interfaces/common';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly heroService: HeroService
  ) {}

  @Post('signin')
  @ApiOkResponse({ type: AuthSigninResponseDto })
  async signin(
    @Body() authSigninDto: AuthSigninDto
  ): Promise<AuthSigninResponseDto> {
    try {
      const user = await this.authService.getUserByToken(authSigninDto.token);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      // Find Hero from neo4j
      let hero = await this.heroService.findById(user.user_id);
      if (!hero) {
        // If Hero doesn't exist yet create new one
        hero = await this.heroService.create(user);
      }
      // If Hero already in Doday just end
      return {};
    } catch (error) {
      return error.message;
    }
  }

  @Get('me')
  async me(@Req() req: AuthorizedRequest): Promise<HeroModel> {
    try {
      if (req.user.did) {
        const me = this.heroService.findById(req.user.did);
        if (me) {
          return me;
        }
        throw new NotFoundException("Hero doesn't exist in Doday");
      }
      throw new UnauthorizedException('Token not valid');
    } catch (error) {
      return error.message;
    }
  }
}
