import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Post } from './entities/post.entity.js';
import { User } from '../user/entities/user.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CursorPaginationDto } from '../common/dto/cursor-pagination.dto.js';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postModel: typeof Post) {}

  async create(dto: CreatePostDto, userId: number) {
    return this.postModel.create({ ...dto, userId });
  }

  async findAll({ cursor, limit }: CursorPaginationDto) {
    const posts = await this.postModel.findAll({
      where: cursor ? { id: { [Op.lt]: cursor } } : {},
      order: [['id', 'DESC']],
      limit,
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    const nextCursor = posts.length === limit ? posts[posts.length - 1].id : null;
    return { data: posts, nextCursor };
  }

  async findOne(id: string) {
    const post = await this.postModel.findByPk(id, {
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
    if (!post) throw new NotFoundException('Post não encontrado');
    return post;
  }

  async update(id: string, dto: UpdatePostDto, userId: number) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('Você não pode editar um post que não é seu');
    }
    await post.update(dto);
    return post;
  }

  async remove(id: string, userId: number) {
    const post = await this.findOne(id);
    if (post.userId !== userId) {
      throw new ForbiddenException('Você não pode remover um post que não é seu');
    }
    await post.destroy();
    return { message: 'Post removido com sucesso' };
  }
}
