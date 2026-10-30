import {
  Injectable,
  NestMiddleware,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from './auth-request.interface.js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: AuthRequest, res: Response, next: NextFunction): Promise<void> { //esse promise me incomoda
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Token não encontrado.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {});
      (req as AuthRequest).user = payload;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
    next();
  }

  private extractTokenFromHeader(request:AuthRequest ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
