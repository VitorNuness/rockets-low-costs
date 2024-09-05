class SessionService {
    async setUserInSession(user: { id: string; name: string; age: number }) {
        await this.clearSession();
        user.name = user.name[0].toLocaleUpperCase() + user.name.slice(1);
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    async clearSession() {
        sessionStorage.clear();
    }
}

export default new SessionService();
