import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'O nome deve ser preenchido.' })
  @IsString({ message: 'O nome deve ser um texto.' })
  name: string;
}
