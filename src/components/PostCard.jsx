import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import service from '../auth/config';

const PostCard = React.memo(function PostCard({ $id, title, featuredImage, status }) {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault();   // stops Link navigation
        e.stopPropagation();  // stops parent click
        navigate(`/edit-post/${$id}`);
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
            className="group block rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
            {/* Image */}
            <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {featuredImage ? (
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex flex-row items-left gap-4">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {title}
                    </h2>

                    {/* Edit Button */}
                    <button
                        onClick={handleEdit}
                        className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-xs px-2 py-1 rounded-md bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-700 dark:text-red-200 transition"
                    >
                        Delete
                    </button>
                </div>

                {status === 'inactive' && (
                    <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        Draft
                    </span>
                )}

                <div className="mt-3 flex items-center text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Read more
                    <svg className="ml-1 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Link>
    );
});

export default PostCard;