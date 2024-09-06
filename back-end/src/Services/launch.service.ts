import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Launch } from '../Schemas/launche.schema';

@Injectable()
export class LaunchService {
  constructor(
    @InjectModel(Launch.name) private launchModel: Model<Launch>,
    private userService: UserService,
  ) {}

  async getUserLaunches(
    userName: string,
  ): Promise<Document<unknown, {}, Launch | undefined>[]> {
    const user = await this.userService.findUserByName(userName);
    if (!user) {
      return [];
    }
    return await this.launchModel.find({ user: user._id }).exec();
  }
}
