import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authService from '../../auth/auth';
import { logout } from '../../store/authslice';
import Logo from '../Logo';
import Container from '../Container';
import Button from '../Button';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [scrolled, setScrolled] = useState(false);


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

    useEffect(() => {
        // close menu after navigation (async to avoid sync render warnings)
        queueMicrotask(() => setMenuOpen(false));
    }, [location.pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        `block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 ${isActive
            ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/45 dark:text-blue-300 dark:ring-blue-900/70'
            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
        }`;

    return (
        <header
            className={`sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl transition-shadow duration-300 dark:border-zinc-800/80 dark:bg-zinc-950/88 ${scrolled ? 'shadow-sm shadow-zinc-950/5 dark:shadow-black/20' : ''}`}
        >
            <Container>
                <nav className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    {!authStatus ? (
                        <NavLink to="/" className="flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950">
                            <Logo linkTo={false} />
                        </NavLink>
                    ) : (
                        <Logo linkTo={false} showText />
                    )}

                    {/* Desktop navigation */}
                    <ul className="hidden items-center gap-1 md:flex">
                        {visibleLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink to={link.to} className={linkClass} end={link.to === '/'}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        {authStatus && (
                            <li>
                                <Button
                                    onClick={handleLogout}
                                    disabled={logoutLoading}
                                    loading={logoutLoading}
                                    variant="secondary"
                                    size="sm"
                                    className="ml-2"
                                >
                                    Sign out
                                </Button>
                            </li>
                        )}
                    </ul>

                    {/* Mobile menu button */}
                    <button
                        className="rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus:ring-offset-zinc-950 md:hidden"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
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
                    <div className="border-t border-zinc-200 pb-4 pt-3 dark:border-zinc-800 md:hidden">
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
                                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-red-400 dark:hover:bg-red-950/30 dark:focus:ring-offset-zinc-950"
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
