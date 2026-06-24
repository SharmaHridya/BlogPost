import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, PostForm } from '../components';
import service from '../auth/config';

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { slug } = useParams();

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