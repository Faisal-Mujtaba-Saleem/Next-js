import React, { useContext } from 'react'
import EditPost from './EditPost'
import { PostsContext } from '@/contexts/posts-context/context';
import { useSession } from 'next-auth/react';


const PostAdminControls = ({ post }) => {
    const { data: session } = useSession();
    const { setBlogposts } = useContext(PostsContext);

    const handleDelete = async (slug) => {
        try {
            const options = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session?.user.id}`,
                },
            };

            const res = await fetch(`/api/posts/delete/${slug}`, options);
            if (!res?.ok) throw new Error(res.error);

            const { message: delete_message, deleted_post } = await res.json();

            toast.success(delete_message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });

            setBlogposts(
                blogposts.filter((post) => post._id !== deleted_post._id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="absolute top-3 right-3 flex space-x-2">
            <EditPost post={post} />
            <button
                onClick={() => handleDelete(post.slug)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Delete Post"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-red-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
        </div>
    )
}

export default PostAdminControls
