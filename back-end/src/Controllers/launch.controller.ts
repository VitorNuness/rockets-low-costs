import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Document } from 'mongoose';
import { LaunchService } from '../Services/launch.service';
import { Launch } from '../Schemas/launch.schema';
import { LaunchDTO } from '../DTOs/launch.dto';

@Controller(':user/launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Get()
  async getUserLaunches(
    @Param('user') user: string,
  ): Promise<Document<unknown, {}, Launch | undefined>[]> {
    return await this.launchService.getUserLaunches(user);
  }

  @Post()
  async postUserLaunch(
    @Param('user') user: string,
    @Body() launchDTO: LaunchDTO,
  ) {
    return await this.launchService.storeUserLaunch(user, launchDTO);
  }

  @Put()
  async putUserLaunchProfit(
    @Param('user') username: string,
    @Body() data: { launchId: string; profit: number | null },
  ) {
    return await this.launchService.updateUserLaunchProfit(
      username,
      data.launchId,
      data.profit,
    );
  }
}
