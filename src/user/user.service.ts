import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity.js';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // evita e-mails duplicados
    const userExists = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException('Este email já está em uso.');
    }

    //hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // salva no banco substituindo a senha original pelo hash
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    //converte para JSON e remove a senha antes de devolver pro Postman
    const userResponse = newUser.toJSON();
    delete userResponse.password;

    return userResponse;
  }
}

//TODO pesquisar sobre o decorator Exclude do class-transformer