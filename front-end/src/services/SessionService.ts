class SessionService {
    async setUserInSession(name: string) {
        await this.clearSession();

        sessionStorage.setItem("user", name);
    }

    async clearSession() {
        sessionStorage.clear();
    }
}

export default new SessionService();
