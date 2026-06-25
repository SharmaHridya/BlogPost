import { Link } from 'react-router-dom';

function Logo({ linkTo = '/', showText = true }) {
    return (
        <Link to={linkTo} className="inline-flex items-center gap-2 group">
            <div
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 group-hover:bg-indigo-700 transition-colors duration-200 shrink-0"
                style={{ minWidth: '2rem' }}
            >
                <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            </div>
            {showText && (
                <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                    Inkwell
                </span>
            )}
        </Link>
    );
}

export default Logo;