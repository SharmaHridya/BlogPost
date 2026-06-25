import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from './auth/auth';
import { login, logout } from './store/authslice';
import { Header, Footer } from './components/index.js';
import { toUserMessage } from './utils/appwriteError.js';


function App() {
    const [loading, setLoading] = useState(true);
    const [authInitError, setAuthInitError] = useState('');
    const dispatch = useDispatch();

    // On mount: check if the user has an active Appwrite session
    const initializeAuth = useCallback(async () => {
        setLoading(true);
        setAuthInitError('');
        try {
            const userData = await authService.getCurrentUser();
            if (userData) {
                dispatch(login({ userData }));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            dispatch(logout());
            setAuthInitError(
                toUserMessage(
                    error,
                    'We could not verify your session right now. Please check your setup or try again.'
                )
            );
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        queueMicrotask(() => {
            initializeAuth();
        });
    }, [initializeAuth]);

    // Global app loader — shown until the auth check resolves
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
                    <p className="text-sm text-gray-400 dark:text-gray-500">Loading…</p>
                </div>
            </div>
        );
    }

    if (authInitError) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-950">
                <div className="max-w-lg w-full rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 p-6 text-center">
                    <h1 className="text-xl font-semibold text-red-800 dark:text-red-300">Authentication check failed</h1>
                    <p className="mt-2 text-sm text-red-700 dark:text-red-400">{authInitError}</p>
                    <button
                        onClick={initializeAuth}
                        className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
