import { useCallback, useEffect, useState, React } from 'react';
import { useForm } from 'react-hook-form';
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
        watch,
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
    const title = watch('title');

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
                <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                    {submitError}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column — content */}
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <InputField
                            label="Title"
                            placeholder="Your post title"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                        )}
                    </div>
                    <div>
                        <InputField
                            label="Slug"
                            readOnly
                            {...register("slug", {
                                required: "Slug is required",
                            })}
                        />
                        {errors.slug && (
                            <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>
                        )}
                    </div>
                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues('content')}
                    />
                </div>

                {/* Right column — sidebar */}
                <div className="space-y-4">
                    <div>
                        <InputField
                            label="Featured image"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                            {...register('image', { required: !post })}
                        />
                        {errors.image && (
                            <p className="mt-1 text-xs text-red-500">Featured image is required</p>
                        )}
                    </div>

                    {/* Current image preview (edit mode) */}
                    {post && (
                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full object-cover"
                            />
                        </div>
                    )}

                    <Select
                        label="Status"
                        options={['active', 'inactive']}
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
                </div>
            </div>
        </form>
    );
}
