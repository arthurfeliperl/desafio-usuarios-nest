import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostService } from './post.service.js';
import { PostController } from './post.controller.js';
import { Post } from './entities/post.entity.js';
import { User } from '../user/entities/user.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}