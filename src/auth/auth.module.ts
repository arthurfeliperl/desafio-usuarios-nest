import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware.js';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'autenticaçãodoJWT', // 
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    const exclude = (path: string) => ({
      path,
      method: RequestMethod.POST,
    })
    consumer
      .apply(AuthMiddleware)
      .exclude(
        exclude('auth/login'),
        exclude('user'),
      )
      .forRoutes('*');
  }
}

//TODO dar uma pesquisada sobre local strategy
