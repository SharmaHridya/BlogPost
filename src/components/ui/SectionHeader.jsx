function SectionHeader({ eyebrow, title, description, action, className = '' }) {
    return (
        <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
            <div className="max-w-2xl">
                {eyebrow && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                        {eyebrow}
                    </p>
                )}
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                        {description}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    );
}

export default SectionHeader;
