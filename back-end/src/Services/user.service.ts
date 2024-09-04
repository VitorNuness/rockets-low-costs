import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Schemas/user.schema';
import { RegisterUserDTO } from '../DTOs/Auth/register_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async store(registerUserDTO: RegisterUserDTO): Promise<User> {
    const existingUser = await this.findUserByName(registerUserDTO.name);
    if (!existingUser) {
      const createdUser = new this.userModel(registerUserDTO);
      return await createdUser.save();
    }
    throw new ConflictException('Este nome já foi cadastrado.');
  }

  async findUserByName(name: string): Promise<User> {
    return await this.userModel.findOne({ name: name }).exec();
  }
}
