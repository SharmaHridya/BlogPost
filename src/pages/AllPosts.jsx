import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, EmptyState, PostCard, SectionHeader, StatCard } from '../components';
import service from '../auth/config';
import { toUserMessage } from '../utils/appwriteError';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        service.getAllPosts()
            .then((result) => {
                setPosts(result.documents);
            })
            .catch((err) => setError(toUserMessage(err, 'Failed to load posts. Please try again.')))
            .finally(() => setLoading(false));
    }, []);

    const filteredPosts = posts.filter((post) => {
        const title = (post?.title || '').toLowerCase();
        return title.includes(query.trim().toLowerCase());
    });

    const myPosts = filteredPosts.filter(
        (post) => post.userId === userData?.$id
    );

    const communityPosts = filteredPosts.filter(
        (post) => post.userId !== userData?.$id
    );

    return (
        <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
            <Container>
                <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 sm:p-8">
                    <SectionHeader
                        eyebrow="Content dashboard"
                        title="All Posts"
                        description="Manage drafts, review your own articles, and browse what the community is publishing."
                    />

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <StatCard label="Total Posts" value={filteredPosts.length} helper="Matching current search" tone="blue" />
                        <StatCard label="My Posts" value={myPosts.length} helper="Owned by your account" tone="emerald" />
                        <StatCard label="Community Posts" value={communityPosts.length} helper="Written by others" tone="amber" />
                    </div>

                    {/* Search */}
                    <div className="mt-8 max-w-2xl">
                        <label htmlFor="post-search" className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200">
                            Search posts
                        </label>
                        <div className="relative">
                            <svg className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M10.5 18a7.5 7.5 0 1 1 5.3-2.2l3.7 3.7" />
                            </svg>
                            <input
                                id="post-search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search posts by title"
                                placeholder="Search posts by title"
                                className="w-full rounded-lg border border-zinc-200 bg-white py-3 pr-4 pl-11 text-sm text-zinc-950 shadow-sm placeholder-zinc-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                {/* Error state */}
                {!loading && error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/60 dark:bg-red-950/20">
                        <p className="text-zinc-700 dark:text-zinc-200">{error}</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredPosts.length === 0 && (
                    <EmptyState
                        title={query ? 'No matching posts' : 'No posts available yet'}
                        description={query ? 'Try a different title or clear the search field.' : 'Start your first article and it will appear in this dashboard.'}
                        actionLabel={query ? undefined : 'Write a post'}
                        actionTo={query ? undefined : '/add-post'}
                        icon={query ? 'search' : 'write'}
                    />
                )}

                {/* Your Posts */}
                {!loading && !error && myPosts.length > 0 && (
                    <div className="mb-12">
                        <SectionHeader
                            title="Your Posts"
                            description="Drafts and published pieces attached to your account."
                            className="mb-5"
                        />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {myPosts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Community Posts */}
                {!loading && !error && communityPosts.length > 0 && (
                    <div>
                        <SectionHeader
                            title="Community Posts"
                            description="A separate view of articles written by the rest of the community."
                            className="mb-5"
                        />
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {communityPosts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
