import React from 'react';

function Button({
    children,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false,
    ...props
}) {
    const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm shadow-indigo-200 dark:shadow-indigo-900',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm shadow-red-200',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-sm shadow-emerald-200',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-800',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`${base} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
            )}
            {children}
        </button>
    );
}

export default Button;