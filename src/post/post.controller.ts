import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import type { Request } from 'express';
import { PostService } from './post.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { CursorPaginationDto } from '../common/dto/cursor-pagination.dto.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthMiddleware)
  @Post()
  create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.postService.create(dto, (req as any).user.sub);
  }

  @Get()
  findAll(@Query() paginationDto: CursorPaginationDto) {
    return this.postService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthMiddleware)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req: Request) {
    return this.postService.update(id, dto, (req as any).user.sub);
  }

  @UseGuards(AuthMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.postService.remove(id, (req as any).user.sub);
  }
}