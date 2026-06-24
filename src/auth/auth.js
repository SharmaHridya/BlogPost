import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.userLogin({ email, password });
            }
            return null;
        } catch (error) {
            console.error("AuthService::createAccount::", error);
            throw error;
        }
    }

    async userLogin({ email, password }) {
        try {
            // Appwrite SDK v13+ uses positional arguments
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("AuthService::userLogin::", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // No active session — this is expected for unauthenticated users
            return null;
        }
    }

    async userLogout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService::userLogout::", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
