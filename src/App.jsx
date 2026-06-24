import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from './auth/auth';
import { login, logout } from './store/authslice';
import { Header, Footer } from './components/index.js';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // On mount: check if the user has an active Appwrite session
    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

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
