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
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-b-blue-600 dark:border-zinc-800 dark:border-b-blue-400" />
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
                </div>
            </div>
        );
    }

    if (authInitError) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
                <div className="w-full max-w-lg rounded-lg border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/25">
                    <h1 className="text-xl font-semibold text-red-800 dark:text-red-300">Authentication check failed</h1>
                    <p className="mt-2 text-sm text-red-700 dark:text-red-300">{authInitError}</p>
                    <button
                        onClick={initializeAuth}
                        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-red-950"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default App;
