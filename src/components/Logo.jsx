import { Link } from 'react-router-dom';

function Logo({ linkTo = '/', showText = true }) {
    const mark = (
        <>
            <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-sm transition-colors duration-200 group-hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:group-hover:bg-blue-400"
                style={{ minWidth: '2.25rem' }}
            >
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
            </div>
            {showText && (
                <span className="text-lg font-semibold tracking-tight text-zinc-950 transition-colors duration-200 group-hover:text-blue-700 dark:text-zinc-50 dark:group-hover:text-blue-300">
                    Inkwell
                </span>
            )}
        </>
    );

    if (linkTo === false) {
        return (
            <div className="group inline-flex items-center gap-2.5">
                {mark}
            </div>
        );
    }

    return (
        <Link to={linkTo} className="group inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950">
            {mark}
        </Link>
    );
}

export default Logo;
