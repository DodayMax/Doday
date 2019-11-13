import { AuthorizedRequest } from './common';

export class NodeQueryParams extends AuthorizedRequest {
  name?: string;
  labels?: string;
  skip?: string;
  limit?: string;
}
