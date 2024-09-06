import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Launch } from '../Schemas/launch.schema';
import { LaunchDTO } from '../DTOs/launch.dto';

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

  async storeUserLaunch(
    userName: string,
    launchDTO: LaunchDTO,
  ): Promise<Document<unknown, {}, Launch | undefined>> {
    const user = await this.userService.findUserByName(userName);

    if (!launchDTO.rocket.status) {
      launchDTO.status = false;
      launchDTO.profit = null;
    }

    let total = launchDTO.profit
      ? launchDTO.rocket.cost * (1 + launchDTO.profit / 100)
      : null;

    const createdLaunch = new this.launchModel({
      user: user._id,
      total: total,
      ...launchDTO,
    });
    return await createdLaunch.save();
  }
}
