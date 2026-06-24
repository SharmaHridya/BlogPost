const requiredVars = [
    'VITE_APPWRITE_URL',
    'VITE_APPWRITE_PROJECT_ID',
    'VITE_APPWRITE_DATABASE_ID',
    'VITE_APPWRITE_COLLECTION_ID',
    'VITE_APPWRITE_BUCKET_ID',
];

const readEnv = (key) => {
    const value = import.meta.env[key];
    if (typeof value !== 'string') return '';
    return value.trim();
};

const conf = {
    appwriteUrl: readEnv('VITE_APPWRITE_URL'),
    appwriteProjectId: readEnv('VITE_APPWRITE_PROJECT_ID'),
    appwriteDatabaseId: readEnv('VITE_APPWRITE_DATABASE_ID'),
    appwriteCollectionId: readEnv('VITE_APPWRITE_COLLECTION_ID'),
    appwriteBucketId: readEnv('VITE_APPWRITE_BUCKET_ID'),
};

const missingEnv = requiredVars.filter((key) => !readEnv(key));

export const appConfig = {
    isConfigured: missingEnv.length === 0,
    missingEnv,
};

export default conf;