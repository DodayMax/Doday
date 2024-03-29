import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Injectable, NestMiddleware, Inject, HttpStatus } from '@nestjs/common';
import { Response, NextFunction } from 'express';
//
import { DBService } from '../../modules/db/db.service';
import { AuthorizedRequest } from '@interfaces/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  authProvider = this.dbService.firebaseAuth();

  async use(req: AuthorizedRequest, res: Response, next: NextFunction) {
    try {
      const authHeaders = req.headers.authorization;
      if (authHeaders && authHeaders.split(' ')[1]) {
        const token = authHeaders.split(' ')[1];
        const user = await this.authProvider.verifyIdToken(token);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = {
          ...user,
          did: user.uid,
        };
        next();
      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/id-token-expired') {
        throw new HttpException('Token expired.', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
