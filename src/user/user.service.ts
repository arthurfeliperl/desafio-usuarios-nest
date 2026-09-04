import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity.js';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private sanitize(user: User) {
    const userResponse = user.toJSON();
    delete userResponse.password;
    return userResponse;
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException('Este email já está em uso.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.sanitize(newUser);
  }

  async findAll() {
    const users = await this.userModel.findAll();
    return users.map((user) => this.sanitize(user));
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return this.sanitize(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailInUse = await this.userModel.findOne({
        where: { email: updateUserDto.email },
      });

      if (emailInUse) {
        throw new BadRequestException('Este email já está em uso.');
      }
    }

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    await user.update(updateUserDto);

    return this.sanitize(user);
  }

  async remove(id: string) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await user.destroy(); // com paranoid: true isso é um soft-delete

    return { message: 'Usuário removido com sucesso.' };
  }
}