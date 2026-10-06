import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './entities/like.entity.js';
import { CreateLikeDto } from './dto/create-like.dto.js';

@Injectable()
export class LikeService {
  constructor(@InjectModel(Like) private likeModel: typeof Like) {}

  async create(createLikeDto: CreateLikeDto, userId: number) {
    const likeExistente = await this.likeModel.findOne({
      where: { postId: createLikeDto.postId, userId },
    });

    if (likeExistente) {
      return likeExistente; 
    }

    return this.likeModel.create({
      postId: createLikeDto.postId,
      userId,
    });
  }

  async countByPost(postId: number) {
    const total = await this.likeModel.count({ where: { postId } });
    return { postId, likes: total };
  }

  async remove(postId: number, userId: number) {
    const like = await this.likeModel.findOne({
      where: { postId, userId },
    });
    
    if (!like) throw new NotFoundException('Curtida não encontrada');

    await like.destroy(); 
    return { message: 'Curtida removida com sucesso' };
  }
}