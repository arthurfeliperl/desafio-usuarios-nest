import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'O texto do comentário é obrigatório.' })
  @IsString({ message: 'O texto deve ser uma string.' })
  texto: string;

  @IsNotEmpty({ message: 'O postId é obrigatório.' })
  @IsNumber({}, { message: 'O postId deve ser um número.' })
  postId: number;
}