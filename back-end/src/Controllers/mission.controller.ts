import { Controller, Get, Param } from '@nestjs/common';

@Controller(':user/missions')
export class MissionController {
  @Get()
  getUserAvaibleMissions(@Param('user') user: string): void {
    console.log(user);
    return;
  }
}
