import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import Container from '../Container';

const footerLinks = [
    {
        heading: 'Product',
        links: [
            { label: 'Features', to: '/' },
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
            { label: 'Privacy Policy', to: '/' },
            { label: 'Terms of Service', to: '/' },
        ],
    },
];

function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <Container>
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand column */}
                    <div className="lg:col-span-1">
                        <Logo />
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            A modern blogging platform for writers who care about craft and clarity.
                        </p>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((col) => (
                        <div key={col.heading}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                                {col.heading}
                            </h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        © {new Date().getFullYear()} Inkwell. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Built with React & Appwrite
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;