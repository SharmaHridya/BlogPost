import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm, SectionHeader } from '../components';
import service from '../auth/config';
import { toUserMessage } from '../utils/appwriteError';
import { useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (post && userData && post.userId !== userData.$id) {
            navigate("/");
        }
    }, [post, userData, navigate]);

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
                    setPost(null);
                    setNotFound(true);
                }
            })
            .catch((err) => {
                setPost(null);
                setError(toUserMessage(err, 'Failed to load post details. Please try again.'));
            })
            .finally(() => setLoading(false));
    }, [navigate, slug]);

    useEffect(() => {
        queueMicrotask(() => {
            loadPost();
        });
    }, [loadPost]);

    if (loading) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                </Container>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="rounded-lg border border-zinc-200 bg-white px-6 py-16 text-center dark:border-zinc-800 dark:bg-zinc-900">
                        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">Post not found</h1>
                        <p className="mt-2 text-zinc-500 dark:text-zinc-400">This post no longer exists.</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
                <Container>
                    <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-16 text-center dark:border-red-900/60 dark:bg-red-950/20">
                        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">Could not open editor</h1>
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

    return post ? (
        <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
            <Container>
                <SectionHeader
                    eyebrow="Writer studio"
                    title="Edit post"
                    description="Refine your article, update the image, or change publication status."
                    className="mb-8"
                />
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
