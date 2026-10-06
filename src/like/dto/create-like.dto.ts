import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty({ message: 'O postId é obrigatório.' })
  @IsNumber({}, { message: 'O postId deve ser um número.' })
  postId: number;
}