import React, { useId } from 'react';

const InputField = React.forwardRef(function InputField(
    { label, type = "text", className = "", error, ...props },
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
            <input
                type={type}
                id={id}
                ref={ref}
                className={`
                    w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm
                    bg-white dark:bg-zinc-900
                    text-zinc-950 dark:text-zinc-100
                    border-zinc-200 dark:border-zinc-700
                    placeholder-zinc-400 dark:placeholder-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-zinc-50 disabled:text-zinc-500 dark:disabled:bg-zinc-800
                    file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-800 dark:file:text-zinc-200
                    transition duration-200
                    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
});

export default InputField;
