import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * AuthGuard — wraps routes to enforce authentication.
 *
 * @param {boolean} authentication - true = route requires login, false = route is for guests only
 */
export default function AuthGuard({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            // Protected route — user is not logged in
            navigate('/login', { replace: true });
        } else if (!authentication && authStatus) {
            // Guest-only route (login/signup) — user is already logged in
            navigate('/', { replace: true });
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
        );
    }

    return <>{children}</>;
}
