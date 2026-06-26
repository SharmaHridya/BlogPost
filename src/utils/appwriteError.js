const isDev = import.meta.env.DEV;

export function logDevError(scope, error) {
    if (isDev) {
        console.error(`${scope}:`, error);
    }
}

export function isUnauthorizedError(error) {
    if (error.code === 401) return 'Login/Signup to read and edit the posts';
}

export function isNotFoundError(error) {
    return error?.code === 404 || error?.type === 'document_not_found';
}

export function toUserMessage(error, fallback) {
    if (isDev && error?.message) {
        return error.message;
    }
    return fallback;
}
