export interface RequestUser {
  did: string;
}

export class AuthorizedRequest {
  user!: RequestUser;
}
