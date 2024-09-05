import { http } from "@/http-common";

class AuthDataService {
    async register(data: { name: string; age: number }) {
        try {
            return await http.post("/register", data);
        } catch (error) {
            throw error;
        }
    }
}

export default new AuthDataService();
