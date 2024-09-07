class RocketService {
    async fetchMissions() {
        let data = await fetch("https://api.spacexdata.com/v3/launches");
        let response = await data.json();
        return response;
    }

    async fetchRockets() {
        let data = await fetch("https://api.spacexdata.com/v3/rockets");
        let response = await data.json();
        return response;
    }

    async saveRocket(rocket: any) {
        await this.removeRockets();
        localStorage.setItem("rocket", JSON.stringify(rocket));
    }

    async getRocket() {
        const rocket = localStorage.getItem("rocket");
        return rocket ? JSON.parse(rocket) : null;
    }

    async removeRockets() {
        localStorage.removeItem("rocket");
    }
}

export default new RocketService();
