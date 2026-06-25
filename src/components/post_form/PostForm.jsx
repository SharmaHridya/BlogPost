import { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../../auth/config';
import { Button, Select, RTE, InputField } from '../index';




export default function PostForm({ post }) {
    
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
            userId: userData.$id
        },
    });

    // Auto-generate slug from title
    const slugTransform = useCallback((value) => {
        console.log('slugTransform called with:', value);
        if (value && typeof value === 'string') {
            const result = value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");

            return result;
        }
        return '';
    }, []);

    // Auto-generate slug from title using watch with effect
    // Replace your current useEffect with this:
    const title = useWatch({ control, name: 'title' });

    useEffect(() => {
        if (title) {
            setValue('slug', slugTransform(title), { shouldValidate: true });
        }
        else {
            setValue('slug', "");
        }
    }, [title, slugTransform, setValue]);
    const onSubmit = async (data) => {
        setSubmitError('');
        setSubmitting(true);
        try {
            if (post) {
                // Edit mode
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;
                if (file) {
                    service.deleteFile(post.featuredImage);
                }
                const updated = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (updated) {
                    navigate(`/post/${updated.$id}`);
                }
            } else {
                // Create mode
                if (!data.image?.[0]) {
                    setSubmitError('Please select a featured image.');
                    return;
                }
                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    const created = await service.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id,
                    });
                    if (created) {
                        navigate(`/post/${created.$id}`);
                    }
                }
            }
        } catch (err) {
            setSubmitError(err?.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/25 dark:text-red-300">
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left column — content */}
                <div className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 sm:p-6 lg:col-span-2">
                    <div>
                        <InputField
                            label="Title"
                            placeholder="Your post title"
                            error={errors.title?.message}
                            {...register('title', { required: 'Title is required' })}
                        />
                    </div>
                    <div>
                        <InputField
                            label="Slug"
                            readOnly
                            error={errors.slug?.message}
                            {...register("slug", {
                                required: "Slug is required",
                            })}
                        />
                    </div>
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues('content')}
                    />
                </div>

                {/* Right column — sidebar */}
                <aside className="space-y-5 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 sm:p-6">
                    <div>
                        <InputField
                            label="Featured image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                            error={errors.image ? 'Featured image is required' : undefined}
                            {...register('image', { required: !post })}
                        />
                    </div>

                    {/* Current image preview (edit mode) */}
                    {post && (
                        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="aspect-[16/10] w-full object-cover"
                            />
                        </div>
                    )}

                    <Select
                        label="Status"
                        options={['active', 'inactive']}
                        error={errors.status ? 'Choose a status' : undefined}
                        {...register('status', { required: true })}
                    />

                    <Button
                        type="submit"
                        variant={post ? 'success' : 'primary'}
                        className="w-full"
                        loading={submitting}
                        disabled={submitting}
                    >
                        {submitting ? 'Saving…' : post ? 'Update post' : 'Publish post'}
                    </Button>
                    <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                        Active posts appear publicly. Inactive posts stay available in your dashboard as drafts.
                    </p>
                </aside>
            </div>
        </form>
    );
}
