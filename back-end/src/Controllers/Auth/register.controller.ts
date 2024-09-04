import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterUserDTO } from '../../DTOs/Auth/register_user.dto';
import { User } from '../../../src/Schemas/user.schema';
import { UserService } from '../../Services/user.service';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
    try {
      const user = await this.userService.store(registerUserDTO);
      return user;
    } catch (error) {
      throw new HttpException(
        `Registro falhou: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
