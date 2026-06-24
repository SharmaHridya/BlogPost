import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * AuthGuard — wraps routes to enforce authentication.
 *
 * @param {boolean} authentication - true = route requires login, false = route is for guests only
 */
export default function AuthGuard({ children, authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);

    if (authentication && !authStatus) {
        return <Navigate to="/login" replace />;
    }

    if (!authentication && authStatus) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
