import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import service from '../auth/config';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        service.getAllPosts()
            .then((result) => {
                if (result) {
                    setPosts(result.documents);
                }
            })
            .catch(() => setError('Failed to load posts. Please try again.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="py-8">
            <Container>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Posts</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Manage all your published and draft articles.
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

                {/* Error state */}
                {!loading && error && (
                    <div className="text-center py-16">
                        <div className="text-red-500 mb-2">⚠️</div>
                        <p className="text-gray-600 dark:text-gray-400">{error}</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mx-auto mb-5">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No posts yet</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            You haven&apos;t written anything yet. Start with your first article!
                        </p>
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

export default AllPosts;