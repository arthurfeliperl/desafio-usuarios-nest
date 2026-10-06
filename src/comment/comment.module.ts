import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentService } from './comment.service.js';
import { CommentController } from './comment.controller.js';
import { Comment } from './entities/comment.entity.js'; 

@Module({
  imports: [SequelizeModule.forFeature([Comment])], 
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}