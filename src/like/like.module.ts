import { Module } from '@nestjs/common';
import { LikeService } from './like.service.js';
import { LikeController } from './like.controller.js';
import { Like } from './entities/like.entity.js';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
