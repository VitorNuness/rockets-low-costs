import { Controller, Get, Param } from '@nestjs/common';
import { MissionService } from '../Services/mission.service';

@Controller(':user/missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  async getUserAvaibleMissions(
    @Param('user') user: string,
  ): Promise<Array<any>> {
    return await this.missionService.getAvailableUserMissions(user);
  }
}
