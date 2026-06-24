import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm } from '../components';
import service from '../auth/config';
import { toUserMessage } from '../utils/appwriteError';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();
    const { slug } = useParams();

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
            <div className="py-8">
                <Container>
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
                        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                    </div>
                </Container>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="py-8">
                <Container>
                    <div className="text-center py-16">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Post not found</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">This post no longer exists.</p>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8">
                <Container>
                    <div className="text-center py-16">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Could not open editor</h1>
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

    return post ? (
        <div className="py-8">
            <Container>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit post</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Make changes and republish your article.
                    </p>
                </div>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;