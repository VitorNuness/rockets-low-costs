import { MissionInterface } from "./mission.interface";
import { RocketInterface } from "./rocket.interface";

export interface LaunchInterface {
    id: string | null;
    rocket: RocketInterface;
    mission: MissionInterface;
    profit: number | null;
    date: string;
    status: boolean | null;
}
