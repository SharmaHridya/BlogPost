import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, EmptyState, PostCard, SectionHeader, StatCard } from '../components';
import service from '../auth/config';
import { toUserMessage } from '../utils/appwriteError';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
        <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
            <Container>
                {/* Hero */}
                <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <SectionHeader
                            eyebrow="Publishing workspace"
                            title="Ideas worth sharing, shaped for careful reading."
                            description="Discover thoughtful articles from the community, track what is live, and keep your next draft close at hand."
                        />
                        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                            <Link
                                to="/add-post"
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                            >
                                Write a post
                            </Link>
                            <Link
                                to="/all-posts"
                                className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-900"
                            >
                                View dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatCard label="Published posts" value={posts.length} helper="Live community articles" tone="blue" />
                        <StatCard label="Editorial pace" value={loading ? '...' : 'Fresh'} helper="Updated from Appwrite" tone="emerald" />
                        <StatCard label="Reading mode" value="Clean" helper="Focused article layouts" tone="amber" />
                    </div>
                </section>

                {/* Loading skeleton */}
                {loading && (
                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800" />
                                <div className="space-y-3 p-5">
                                    <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                                    <div className="h-3 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && posts.length === 0 && (
                    <div className="mt-10">
                        <EmptyState
                            title="No posts yet"
                            description="Be the first to publish a thoughtful article for the community."
                            actionLabel="Write the first post"
                            actionTo="/add-post"
                            icon="write"
                        />
                    </div>
                )}

                {!loading && error && (
                    <div className="mt-10 rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/60 dark:bg-red-950/20">
                        <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white">
                            Could not load posts
                        </h2>
                        <p className="mx-auto mt-2 mb-6 max-w-md text-zinc-600 dark:text-zinc-300">{error}</p>
                        <div className="mt-6 flex flex-col items-center gap-4">
            <button
        onClick={loadPosts}
        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-red-950"
    >
        Retry
    </button>

    <button
        onClick={() => navigate('/signup')}
        className="rounded-lg border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:ring-offset-red-950"
    >
        Not logged in? Sign in to view your posts
    </button>
</div>
                    </div>
                )}

                {/* Post grid */}
                {!loading && !error && posts.length > 0 && (
                    <section className="mt-10">
                        <SectionHeader
                            title="Latest community posts"
                            description="A curated feed of active posts from everyone writing in Inkwell."
                            className="mb-6"
                        />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </section>
                )}
            </Container>
        </div>
    );
}

export default Home;
