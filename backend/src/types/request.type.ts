import { Request as RequestExpress } from 'express';

import { JwtPayload } from './jwt-payload.type';

export type Request = RequestExpress & { user: JwtPayload };
