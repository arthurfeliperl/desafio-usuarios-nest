import { CallHandler, ExecutionContext, NestInterceptor,Injectable } from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    console.log('TimingConnectionInterceptor executado ANTES');

    // await new Promise(resolve => setTimeout(resolve, 10000));

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;

        console.log(
          `TimingConnectionInterceptor: levou ${elapsedTime}ms para executar.`,
        );
      }),
    );
  }
}

//Travar a aplicação por alguns milisegundos que podemos determinar