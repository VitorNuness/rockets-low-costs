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
  ): Promise<void> {
    await this.launchService.storeUserLaunch(user, launchDTO);
    return;
  }

  @Put()
  async putUserLaunchProfit(
    @Param('user') username: string,
    @Body() profit: number | null,
  ) {
    return;
  }
}
