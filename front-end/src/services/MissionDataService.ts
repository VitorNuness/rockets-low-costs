import { http } from "@/http-common";

class MissionDataService {
    async fetchUserLaunchMissions(): Promise<any> {
        try {
            const user = JSON.parse(sessionStorage.getItem("user") ?? "");
            let username = String(user.name).toLocaleLowerCase();
            const missions = await http.get(`/${username}/missions`);
            return missions.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new MissionDataService();
