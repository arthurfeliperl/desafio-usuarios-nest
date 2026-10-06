import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('Token não encontrado.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
      });
      res.locals.user = payload;

    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');

    }
    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}