import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { RegisterUserDTO } from '../../../src/DTOs/Auth/register_user.dto';
import { User } from '../../../src/Schemas/user.schema';

@Controller('register')
@Injectable()
export class RegisterController {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  @Post()
  register(@Body() registerUserDTO: RegisterUserDTO): void {
    const createdUser = new this.userModel(registerUserDTO);
    createdUser.save();
    return;
  }
}
