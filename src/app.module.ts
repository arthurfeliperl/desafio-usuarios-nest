import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { PostModule } from './post/post.module.js';
import { Like } from './like/entities/like.entity.js';
import { CommentModule } from './comment/comment.module.js';
import { LikeModule } from './like/like.module.js';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '1234',
      database: 'desafio_usuarios_nest',
      autoLoadModels: true, 
      synchronize: true, 
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    LikeModule,
  ],
})
export class AppModule {}