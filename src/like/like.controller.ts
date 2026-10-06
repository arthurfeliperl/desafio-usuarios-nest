import { Controller, Post, Body, Param, Delete, UseGuards, Req, Get } from '@nestjs/common';
import type { Request } from 'express';
import { LikeService } from './like.service.js';
import { CreateLikeDto } from './dto/create-like.dto.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthMiddleware)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Req() req: Request) {
    return this.likeService.create(createLikeDto, (req as any).user.sub);
  }

  @Get('post/:postId/count')
  countByPost(@Param('postId') postId: string) {
    return this.likeService.countByPost(+postId);
  }

  @UseGuards(AuthMiddleware)
  @Delete(':postId')
  remove(@Param('postId') postId: string, @Req() req: Request) {
    return this.likeService.remove(+postId, (req as any).user.sub);
  }
}