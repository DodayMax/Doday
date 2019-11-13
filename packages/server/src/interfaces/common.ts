import { Request } from 'express';
import { AuthorizedRequest } from '@doday/lib';

export interface AuthorizedRequest extends AuthorizedRequest, Request {}
