import { Container, PostForm } from '../components';

function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">New post</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Fill in the details below to publish a new article.
                    </p>
                </div>
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;