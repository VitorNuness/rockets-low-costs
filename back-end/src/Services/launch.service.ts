import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Launch } from '../Schemas/launche.schema';

@Injectable()
export class LaunchService {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    private userService: UserService,
  ) {}

  async getUserLaunches(userName: string) {
    const user = await this.userService.findUserByName(userName);
    if (!user) {
      return [];
    }
    return await this.launchModel.find({ user: user._id }).exec();
  }
}
