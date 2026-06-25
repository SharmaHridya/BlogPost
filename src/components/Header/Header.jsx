import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authService from '../../auth/auth';
import { logout } from '../../store/authslice';
import Logo from '../Logo';
import Container from '../Container';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);


    const navLinks = [
        { name: 'Home', to: '/', auth: true },
        { name: 'All Posts', to: '/all-posts', auth: true },
        { name: 'Write', to: '/add-post', auth: true },
        { name: 'Sign in', to: '/login', guest: true },
        { name: 'Sign up', to: '/signup', guest: true },
    ];

    const visibleLinks = navLinks.filter((link) => {
        if (link.always) return true;
        if (link.auth) return authStatus;
        if (link.guest) return !authStatus;
        return false;
    });

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await authService.userLogout();
            dispatch(logout());
            navigate("/login");
        } catch {
            dispatch(logout());
            navigate("/login");
        } finally {
            setLogoutLoading(false);
        }
    };

    const linkClass = ({ isActive }) =>
        `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-200 ${isActive
            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
        }`;

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
            <Container>
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    {!authStatus ? (
                        <NavLink to="/" className="flex items-center">
                            <Logo />
                        </NavLink>
                    ) : (
                        <NavLink to="/all-posts" className="flex items-center">
                            <Logo />
                        </NavLink>
                    )}

                    {/* Desktop navigation */}
                    <ul className="hidden md:flex items-center gap-1">
                        {visibleLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        {authStatus && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    className="ml-2 text-sm font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-60"
                                >
                                    {logoutLoading ? 'Signing out…' : 'Sign out'}
                                </button>
                            </li>
                        )}
                    </ul>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </nav>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-2">
                        <ul className="flex flex-col gap-1">
                            {visibleLinks.map((link) => (
                                <li key={link.name}>
                                    <NavLink
                                        to={link.to}
                                        className={linkClass}
                                        end={link.to === '/'}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            {authStatus && (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        disabled={logoutLoading}
                                        className="text-sm font-medium px-3 py-1.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 w-full text-left"
                                    >
                                        {logoutLoading ? 'Signing out…' : 'Sign out'}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </Container>
        </header>
    );
}

export default Header;