import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import service from '../auth/config';
import { Button, Container } from '../components';
import { toUserMessage } from '../utils/appwriteError';
import { estimateReadingTime, formatPostDate, getInitials } from '../utils/postMeta';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const loadPost = useCallback(() => {
        if (!slug) {
            navigate('/', { replace: true });
            return;
        }
        setLoading(true);
        setError('');
        setNotFound(false);
        service.getPost(slug)
            .then((postData) => {
                if (postData) {
                    setPost(postData);
                } else {
                    setNotFound(true);
                    setPost(null);
                }
            })
            .catch((err) => {
                setError(toUserMessage(err, 'Failed to load this post. Please try again.'));
                setPost(null);
            })
            .finally(() => setLoading(false));
    }, [navigate, slug]);

    useEffect(() => {
        queueMicrotask(() => {
            loadPost();
        });
    }, [loadPost]);

    const handleDelete = async () => {
        if (!window.confirm('Delete this post? This action cannot be undone.')) return;
        setDeleting(true);
        try {
            await service.deletePost(post.$id);
            if (post.featuredImage) {
                await service.deleteFile(post.featuredImage);
            }
            navigate('/');
        } catch (err) {
            setError(toUserMessage(err, 'Unable to delete post right now. Please try again.'));
        } finally {
            setDeleting(false);
        }
    };

    // Loading skeleton
    if (loading) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="animate-pulse space-y-6">
                        <div className="aspect-video w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className={`h-4 rounded bg-zinc-100 dark:bg-zinc-700 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="mx-auto max-w-2xl rounded-lg border border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
                        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">Post not found</h1>
                        <p className="mt-2 text-zinc-500 dark:text-zinc-400">The post you are looking for does not exist.</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 px-6 py-16 text-center dark:border-red-900/60 dark:bg-red-950/20">
                        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">Could not load post</h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-300">{error}</p>
                        <button
                            onClick={loadPost}
                            className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-red-950"
                        >
                            Retry
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
            <Container>
                <article className="max-w-3xl mx-auto">
                    {/* Featured image */}
                    <div className="relative mb-8 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        {post.featuredImage && (
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="aspect-[16/9] w-full object-cover"
                            />
                        )}
                        {/* Author controls */}
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="secondary" className="shadow-lg">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                    loading={deleting}
                                    disabled={deleting}
                                    className="shadow-lg"
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <header className="mb-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700 ring-1 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60">
                                {getInitials(isAuthor ? 'You' : 'Community writer')}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                    {isAuthor ? 'You' : 'Community writer'}
                                </p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {formatPostDate(post.$createdAt)} · {estimateReadingTime(post.content)}
                                </p>
                            </div>
                        </div>
                        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white sm:text-5xl sm:leading-tight">
                            {post.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div className="rounded-lg border border-zinc-200 bg-white px-5 py-7 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 sm:px-8 sm:py-9">
                        <div className="prose max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    );
}
