import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                //login directly
                return this.userLogin({ email, password });
            }
            else {
                return false;
            }

        } catch (error) {
            throw error();
        }
    }
    async userLogin({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password });

        } catch (error) {
            throw error();
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("User fetched:", user);
            return user;
        } catch (error) {
            console.log("No active session", error);
            return null;
        }


    }

    async userLogout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }



}
const authService = new AuthService()

export default authService

