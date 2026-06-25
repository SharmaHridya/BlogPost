import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import service from '../auth/config';
import { estimateReadingTime, formatPostDate, getInitials } from '../utils/postMeta';

const PostCard = React.memo(function PostCard({ $id, title, featuredImage, status, userId, content, $createdAt, authorName }) {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = userData && userId === userData.$id;
    const displayAuthor = isAuthor ? 'You' : authorName || 'Community writer';
    const readingTime = estimateReadingTime(content);
    const createdAt = formatPostDate($createdAt);

    const handleEdit = (e) => {
        e.preventDefault();   // stops Link navigation
        e.stopPropagation();  // stops parent click
        if (isAuthor) {
            navigate(`/edit-post/${$id}`);
        }
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
            await service.deletePost($id);
            window.location.reload(); // or better: remove from state
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <Link
            to={`/post/${$id}`}
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm shadow-zinc-200/60 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-zinc-200/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20 dark:hover:border-blue-900/70 dark:hover:shadow-black/30 dark:focus:ring-offset-zinc-950"
        >
            {/* Image */}
            <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {featuredImage ? (
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <svg className="h-12 w-12 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">
                        {getInitials(displayAuthor)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">{displayAuthor}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{createdAt} · {readingTime}</p>
                    </div>
                </div>

                <div className="flex items-start justify-between gap-3">
                    <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-zinc-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                        {title}
                    </h2>
                </div>

                {status === 'inactive' && (
                    <span className="mt-3 inline-flex w-fit rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100 dark:bg-amber-950/35 dark:text-amber-300 dark:ring-amber-900/60">
                        Draft
                    </span>
                )}

                <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="inline-flex items-center text-sm font-semibold text-blue-700 dark:text-blue-300">
                        Read article
                        <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </span>
                    {isAuthor && (
                        <span className="flex items-center gap-2">
                            <button
                                onClick={handleEdit}
                                className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="rounded-md px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-950/30"
                            >
                                Delete
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
});

export default PostCard;
