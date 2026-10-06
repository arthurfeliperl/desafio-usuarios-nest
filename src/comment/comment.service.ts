import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './entities/comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UpdateCommentDto } from './dto/update-comment.dto.js';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    return this.commentModel.create({
      ...createCommentDto,
      userId,
    });
  }

  async findByPost(postId: number) {
    return this.commentModel.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = await this.commentModel.findByPk(id);
    
    if (!comment) throw new NotFoundException('Comentário não encontrado');
    if (comment.userId !== userId) throw new ForbiddenException('Você não pode editar este comentário');

    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentModel.findByPk(id);
    
    if (!comment) throw new NotFoundException('Comentário não encontrado');
    if (comment.userId !== userId) throw new ForbiddenException('Você não pode apagar este comentário');

    await comment.destroy();
    return { message: 'Comentário removido com sucesso' };
  }
}