import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 1. Evita e-mails duplicados
    const userExists = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new BadRequestException('Este email já está em uso.');
    }

    // 2. Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // 3. Salva no banco substituindo a senha original pelo hash
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // 4. Converte para JSON e remove a senha antes de devolver pro Postman
    const userResponse = newUser.toJSON();
    delete userResponse.password;

    return userResponse;
  }
}