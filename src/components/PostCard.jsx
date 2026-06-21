import React from 'react'
import service from '../auth/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='p-4'>
                <div className='w-full'>
                    <img className='w-full bg-gray-100 rounded-xl' src={service.getFilePreview(featuredImage)} alt={title} />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard