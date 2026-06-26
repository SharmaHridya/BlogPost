import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Container from '../Container';

const footerLinks = [
    {
        heading: 'Product',
        links: [
            { label: 'Features', to: '/features' },
            { label: 'All Posts', to: '/all-posts' },
            { label: 'Write', to: '/add-post' },
        ],
    },
    {
        heading: 'Account',
        links: [
            { label: 'Sign in', to: '/login' },
            { label: 'Sign up', to: '/signup' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '/privacy-policy' },
            { label: 'Terms of Service', to: '/terms' },
        ],
    },
];

function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <Container>
                <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Logo />
                        <p className="mt-4 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                            A modern blogging platform for writers who care about craft and clarity.
                        </p>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.heading}>
                            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                                {col.heading}
                            </h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-zinc-600 transition-colors duration-200 hover:text-blue-700 focus:outline-none focus:underline dark:text-zinc-400 dark:hover:text-blue-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200 py-6 dark:border-zinc-800 sm:flex-row">
    <p className="text-xs text-zinc-500 dark:text-zinc-500">
        © {new Date().getFullYear()} Inkwell. All rights reserved.
    </p>

    <p className="text-xs text-zinc-500 dark:text-zinc-500">
        Built with React, Appwrite & lots of coffee ☕
    </p>

    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <span>Made with ❤️ by Sharma Hridya.</span>

        <a
            href="https://github.com/SharmaHridya"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
            GitHub
        </a>
    </div>
</div>
            </Container>
        </footer>
    );
}

export default Footer;
