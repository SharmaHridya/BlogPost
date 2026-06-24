import { Link } from 'react-router-dom';
import { Container } from '../components';

export default function NotFound() {
    return (
        <div className="py-16">
            <Container>
                <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
                    <p className="mt-3 text-gray-500 dark:text-gray-400">The page you requested could not be found.</p>
                    <Link
                        to="/"
                        className="inline-block mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Go home
                    </Link>
                </div>
            </Container>
        </div>
    );
}
