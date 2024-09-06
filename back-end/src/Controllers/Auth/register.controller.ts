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
import { Document } from 'mongoose';

@Controller('register')
export class RegisterController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() registerUserDTO: RegisterUserDTO,
  ): Promise<Document<unknown, {}, User>> {
    try {
      const user = await this.userService.store(registerUserDTO);
      return user;
    } catch (error) {
      throw new HttpException(
        { message: [error.message] },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
