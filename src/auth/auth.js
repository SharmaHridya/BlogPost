import { Client, Account, ID } from "appwrite";
import conf, { appConfig } from "../conf/conf";
import { isUnauthorizedError, logDevError } from "../utils/appwriteError";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        if (appConfig.isConfigured) {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
        } else {
            this.account = null;
        }
    }

    ensureAccount() {
        if (!this.account) {
            throw new Error(
                `App configuration is incomplete. Missing: ${appConfig.missingEnv.join(", ")}`
            );
        }
        return this.account;
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.ensureAccount().create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.userLogin({ email, password });
            }
            return null;
        } catch (error) {
            logDevError("AuthService::createAccount", error);
            throw error;
        }
    }

    async userLogin({ email, password }) {
        try {
            // Appwrite SDK v13+ uses positional arguments
            return await this.ensureAccount().createEmailPasswordSession(email, password);
        } catch (error) {
            logDevError("AuthService::userLogin", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.ensureAccount().get();
        } catch (error) {
            // No active session — this is expected for unauthenticated users
            if (isUnauthorizedError(error)) {
                return null;
            }
            logDevError("AuthService::getCurrentUser", error);
            throw error;
        }
    }

    async userLogout() {
        try {
            await this.ensureAccount().deleteSessions();
        } catch (error) {
            logDevError("AuthService::userLogout", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
