import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import service from '../auth/config';
import { Button, Container } from '../components';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate('/');
                })
                .finally(() => setLoading(false));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const handleDelete = async () => {
        if (!window.confirm('Delete this post? This action cannot be undone.')) return;
        setDeleting(true);
        try {
            const ok = await service.deletePost(post.$id);
            if (ok) {
                service.deleteFile(post.featuredImage);
                navigate('/');
            }
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
