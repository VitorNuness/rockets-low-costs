import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Schemas/user.schema';
import { RegisterUserDTO } from '../DTOs/Auth/register_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async store(registerUserDTO: RegisterUserDTO): Promise<User> {
    const createdUser = new this.userModel(registerUserDTO);
    return await createdUser.save();
  }
}
