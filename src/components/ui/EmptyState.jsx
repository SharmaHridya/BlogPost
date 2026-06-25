import { Link } from 'react-router-dom';

function EmptyState({ title, description, actionLabel, actionTo, icon = 'document' }) {
    const paths = {
        document: 'M7 3.75h6.25L18 8.5v11.75H7V3.75zm6 0V9h5',
        search: 'M10.5 18a7.5 7.5 0 1 1 5.3-2.2l3.7 3.7',
        write: 'M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
    };

    return (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-14 text-center dark:border-zinc-700 dark:bg-zinc-900/70">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={paths[icon] || paths.document} />
                </svg>
            </div>
            <h2 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-zinc-50">{title}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">{description}</p>
            {actionLabel && actionTo && (
                <Link
                    to={actionTo}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}

export default EmptyState;
