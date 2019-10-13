import { Request } from 'express';
import { auth } from 'firebase-admin';

export interface RequestUser extends auth.DecodedIdToken {
  did?: string;
}

export interface RequestWithUser extends Request {
  user: RequestUser;
}
