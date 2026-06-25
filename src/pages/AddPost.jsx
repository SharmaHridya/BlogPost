import { Container, PostForm, SectionHeader } from '../components';

function AddPost() {
    return (
        <div className="bg-zinc-50/70 py-10 dark:bg-zinc-950 sm:py-14">
            <Container>
                <SectionHeader
                    eyebrow="Writer studio"
                    title="New post"
                    description="Shape the title, image, and content readers will see when your article goes live."
                    className="mb-8"
                />
                <PostForm />
            </Container>
        </div>
    );
}

export default AddPost;
