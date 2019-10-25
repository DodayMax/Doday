import { Injectable, Inject } from '@nestjs/common';
import { auth } from 'firebase-admin';
//
import { DBService } from '../db/db.service';

@Injectable()
export class AuthService {
  constructor(@Inject(DBService) private readonly dbService: DBService) {}

  authProvider = this.dbService.firebaseAuth();

  async updateUser(
    uid: string,
    properties: auth.UpdateRequest
  ): Promise<auth.UserRecord> {
    const user = await this.authProvider.updateUser(uid, properties);
    return user;
  }

  async getUserByToken(idToken: string): Promise<auth.DecodedIdToken> {
    const decodedIdToken = await this.authProvider.verifyIdToken(idToken);
    return { ...decodedIdToken };
  }
}
