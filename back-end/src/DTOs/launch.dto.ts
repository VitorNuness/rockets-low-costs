import { MissionDTO } from './mission.dto';
import { RocketDTO } from './rocket.dto';

export class LaunchDTO {
  rocket: RocketDTO;
  mission: MissionDTO;
  profit: number | null;
  date: Date;
  status: boolean | null;
  user: string | null;
}
