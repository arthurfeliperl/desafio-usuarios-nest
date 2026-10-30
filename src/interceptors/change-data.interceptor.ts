import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class ChandeDataInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ChangeDataInterceptor executado ANTES');
    
    return next.handle().pipe(
      map(data => {
        return data;
      }),
    );
  }
}