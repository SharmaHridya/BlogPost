import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
    { options, label, className = '', error, ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`
                    w-full cursor-pointer rounded-lg border px-3.5 py-2.5 text-sm shadow-sm
                    bg-white dark:bg-zinc-900
                    text-zinc-950 dark:text-zinc-100
                    border-zinc-200 dark:border-zinc-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition duration-200
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700' : ''}
                    ${className}
                `}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
});

export default Select;
