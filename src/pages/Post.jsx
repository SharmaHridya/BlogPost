import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import service from '../auth/config';
import { Button, Container } from '../components';
import { toUserMessage } from '../utils/appwriteError';

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
            <div className="py-8">
                <Container>
                    <div className="animate-pulse space-y-6">
                        <div className="aspect-video w-full rounded-2xl bg-gray-200 dark:bg-gray-800" />
                        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                        <div className="space-y-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className={`h-4 bg-gray-100 dark:bg-gray-700 rounded ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="py-12">
                <Container>
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">The post you are looking for does not exist.</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-12">
                <Container>
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Could not load post</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">{error}</p>
                        <button
                            onClick={loadPost}
                            className="mt-6 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
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
        <div className="py-8">
            <Container>
                <article className="max-w-3xl mx-auto">
                    {/* Featured image */}
                    <div className="relative rounded-2xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-800">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full object-cover"
                        />
                        {/* Author controls */}
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="success" className="shadow-lg">
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                    loading={deleting}
                                    disabled={deleting}
                                    className="shadow-lg"
                                >
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Content */}
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                        {parse(post.content)}
                    </div>
                </article>
            </Container>
        </div>
    );
}
