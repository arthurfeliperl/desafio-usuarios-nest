import { Request } from 'express';

export interface JwtPayload {
  sub: number;
  email: string;
}

export interface AuthRequest extends Request {
  user: JwtPayload;
}