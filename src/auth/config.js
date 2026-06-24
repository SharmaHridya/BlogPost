import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf, { appConfig } from "../conf/conf";
import { isNotFoundError, logDevError } from "../utils/appwriteError";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        if (appConfig.isConfigured) {
            this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
        } else {
            this.databases = null;
            this.bucket = null;
        }
    }

    ensureConfig() {
        if (!this.databases || !this.bucket) {
            throw new Error(
                `App configuration is incomplete. Missing: ${appConfig.missingEnv.join(", ")}`
            );
        }
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            this.ensureConfig();
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            logDevError("Service::createPost", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            this.ensureConfig();
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            logDevError("Service::updatePost", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            this.ensureConfig();
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            logDevError("Service::deletePost", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            this.ensureConfig();
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            if (isNotFoundError(error)) {
                return null;
            }
            logDevError("Service::getPost", error);
            throw error;
        }
    }

    // Public posts — only active status (for Home page)
    async getPosts() {
        try {
            this.ensureConfig();
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("status", ["active"])]
            );
        } catch (error) {
            logDevError("Service::getPosts", error);
            throw error;
        }
    }

    // All posts — for authenticated author's dashboard (AllPosts page)
    async getAllPosts() {
        try {
            this.ensureConfig();
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                []
            );
        } catch (error) {
            logDevError("Service::getAllPosts", error);
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            this.ensureConfig();
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            logDevError("Service::uploadFile", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            this.ensureConfig();
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            logDevError("Service::deleteFile", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        this.ensureConfig();
        // Returns a URL object — convert to string for use in <img src>
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).toString();
    }
}

const service = new Service();
export default service;