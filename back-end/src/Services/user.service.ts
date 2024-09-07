import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { User } from '../Schemas/user.schema';
import { RegisterUserDTO } from '../DTOs/Auth/register_user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async store(
    registerUserDTO: RegisterUserDTO,
  ): Promise<Document<unknown, {}, User>> {
    registerUserDTO.name = registerUserDTO.name.trim().toLocaleLowerCase();
    const existingUser = await this.findUserByName(registerUserDTO.name);
    if (!existingUser) {
      const createdUser = new this.userModel(registerUserDTO);
      return await createdUser.save();
    }
    throw new ConflictException('Este nome já foi cadastrado.');
  }

  async findUserByName(username: string): Promise<Document<unknown, {}, User>> {
    let name = username.trim().toLocaleLowerCase();
    return await this.userModel.findOne({ name: name }).exec();
  }
}
