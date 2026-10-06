import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
  @IsString() @IsNotEmpty()
  titulo: string;

  @IsString() @IsNotEmpty()
  texto: string;

  @IsOptional() @IsString()
  imagem?: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
