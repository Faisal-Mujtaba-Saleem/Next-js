"use client";
import React, { useContext, useState } from 'react';
import SignIn from '@/components/SignIn';
import BlogPostEditor from '@/components/BlogPostEditor';
import { Bounce, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { createPostAction } from '@/app/actions/createPostAction';
import { PostContext } from '@/contexts/post-context/context';

const CreatePost = () => {
    const { data: session } = useSession();

    const { postContent, setPostContent } = useContext(PostContext);

    const handleCreatePostAction = async (create_post_form) => {
        const res = await createPostAction(create_post_form);

        if (res.success === true) {
            toast.info(res.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            toast.error(res.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    if (!session?.user) {
        return <SignIn />;
    }

    return (
        <div className="container w-full h-full mx-auto p-8 flex flex-col">
            <h2 className="text-3xl font-bold text-center">Create a New Post</h2>
            <div id='create_post_form'>
                <form
                    action={handleCreatePostAction}
                    className="space-y-6 mt-6">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter post title"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows="6"
                            placeholder="Write a description for your post..."
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 resize-none"
                        ></textarea>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            placeholder="Enter post category"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                    </div>

                    {/* Cover Photo Link */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute top-1/2 left-0 pl-3 flex items-center pointer-events-none transform -translate-y-1/2">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id='image_url'
                            name="image_url"
                            placeholder="Enter the URL of the cover photo"
                            className="mt-1 block w-full px-4 py-2 pl-12 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                    </div>

                    {/* Upload Markdown */}
                    <div>
                        <input
                            type="text"
                            id="content"
                            name="content"
                            value={JSON.stringify(postContent)}
                            readOnly hidden
                        />
                        <BlogPostEditor setPostContent={setPostContent}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
                        >
                            Publish Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;