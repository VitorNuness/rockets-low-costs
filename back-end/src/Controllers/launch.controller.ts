import { Controller, Get, Param } from '@nestjs/common';
import { Document } from 'mongoose';
import { LaunchService } from '../Services/launch.service';
import { Launch } from '../Schemas/launche.schema';

@Controller(':user/launches')
export class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  @Get()
  async getUserLaunches(
    @Param('user') user: string,
  ): Promise<Document<unknown, {}, Launch | undefined>[]> {
    return await this.launchService.getUserLaunches(user);
  }
}
