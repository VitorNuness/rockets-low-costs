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
}

export default new RocketService();
