import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ativa o class-validator globalmente
  // whitelist: true remove do JSON de qualquer campo que não esteja no DTO (evita injeção de dados)
  //transform: true transforma os tipos de dados recebidos para o tipo definido no DTO (ex: string para number) permitindo a paginação
  app.useGlobalPipes(new ValidationPipe({ whitelist: true,transform: true }));
  
  await app.listen(3000);
  
}
bootstrap();
