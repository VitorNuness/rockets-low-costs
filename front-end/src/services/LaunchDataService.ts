import { http } from "@/http-common";
import { LaunchInterface } from "@/interfaces/launch.interface";

class LaunchDataService {
    async createUserLaunch(data: LaunchInterface): Promise<void> {
        try {
            const user = JSON.parse(sessionStorage.getItem("user") ?? "");
            let username = String(user.name).toLocaleLowerCase();
            const launch = await http.post(`/${username}/launches`, data);
            this.saveLaunch(launch.data);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchUserLaunches() {
        try {
            const user = JSON.parse(sessionStorage.getItem("user") ?? "");
            let username = String(user.name).toLocaleLowerCase();
            const launches = await http.get(`/${username}/launches`);
            return launches.data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserLaunchProfit(data: {
        launchId: string;
        profit: number | null;
    }) {
        try {
            const user = JSON.parse(sessionStorage.getItem("user") ?? "");
            let username = String(user.name).toLocaleLowerCase();
            const launch = await http.put(`/${username}/launches`, data);
            this.saveLaunch(launch.data);
        } catch (error) {
            console.log(error);
        }
    }

    async saveLaunch(launch: any) {
        this.removeLaunches();
        localStorage.setItem("launch", JSON.stringify(launch));
    }

    async removeLaunches() {
        localStorage.removeItem("launch");
    }

    async getLaunch() {
        const launch = localStorage.getItem("launch");
        return launch ? JSON.parse(launch) : null;
    }
}

export default new LaunchDataService();
