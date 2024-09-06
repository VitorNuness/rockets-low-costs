import { Injectable } from '@nestjs/common';
import { LaunchService } from './launch.service';

@Injectable()
export class MissionService {
  constructor(private readonly launchService: LaunchService) {}

  async fetchMissions() {
    const response = await fetch('https://api.spacexdata.com/v3/launches');
    return await response.json();
  }

  async getAvailableUserMissions(userName: string) {
    const missions = await this.fetchMissions();
    const userLaunches = await this.launchService.getUserLaunches(userName);

    const availableMissions = missions.filter(
      (mission) =>
        !userLaunches.some(
          (launch: any) => launch.mission.name === mission.mission_name,
        ),
    );

    return availableMissions;
  }
}
