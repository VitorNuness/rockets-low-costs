import { IsInt, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class RegisterUserDTO {
    @IsNotEmpty({ message: 'O nome deve ser preenchido.' })
    @IsString({ message: 'O nome deve ser um texto.' })
    @MaxLength(50, {message: 'O nome deve conter no máximo 50 carácteres.'})
    @MinLength(2, {message: 'O nome deve conter no mínimo 2 carácteres.'})
    name: string;

    @IsNotEmpty({message: 'A idade deve ser preenchida.'})
    @IsInt({ message: 'A idade deve ser um número inteiro.' })
    @Max(110, {message: 'A idade máxima permitida são 110 anos.'})
    @Min(1, {message: 'A idade mínima permitida é 1 ano.'})
    age: number;
}
