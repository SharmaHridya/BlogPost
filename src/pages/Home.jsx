import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, PostCard } from '../components';
import service from '../auth/config';
import { toUserMessage } from '../utils/appwriteError';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadPosts = useCallback(() => {
        setLoading(true);
        setError('');
        service.getPosts()
            .then((result) => {
                setPosts(result.documents);
            })
            .catch((err) => {
                setError(toUserMessage(err, 'Unable to load posts right now. Please try again.'));
                setPosts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        queueMicrotask(() => {
            loadPosts();
        });
    }, [loadPosts]);

    return (
        <div className="py-10">
            <Container>
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                        Ideas worth sharing
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        Discover thoughtful articles written by our community of writers.
                    </p>
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-pulse">
                                <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                    <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No posts yet
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            Be the first to write something. Sign up and start sharing your ideas.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <Link
                                to="/add-post"
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Get started
                            </Link>

                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Could not load posts
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
                        <button
                            onClick={loadPosts}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Post grid */}
                {!loading && !error && posts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;