function Button({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    loading = false,
    ...props
}) {
    const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-950 disabled:opacity-60 disabled:cursor-not-allowed';

    const sizes = {
        sm: 'px-3 py-2 text-xs',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-sm',
    };

    const variants = {
        primary: 'bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'border border-zinc-200 bg-white text-zinc-800 shadow-sm hover:bg-zinc-50 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800',
        danger: 'bg-red-600 text-white shadow-sm shadow-red-600/20 hover:bg-red-700 focus:ring-red-500',
        success: 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 focus:ring-emerald-500',
        ghost: 'bg-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-400 dark:text-zinc-200 dark:hover:bg-zinc-800',
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`${base} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
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
