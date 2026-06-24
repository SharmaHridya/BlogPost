import React, { useId } from 'react';

const InputField = React.forwardRef(function InputField(
    { label, type = "text", className = "", ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                ref={ref}
                className={`
                    w-full px-4 py-2.5 rounded-xl text-sm
                    bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100
                    border border-gray-200 dark:border-gray-700
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    transition duration-200
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default InputField;