"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PostsContext } from '@/contexts/posts-context/context';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Bounce, toast } from 'react-toastify';
import BlogPostEditor from '@/components/BlogPostEditor';

const EditPost = ({ post }) => {
    if (!post) return null;

    const { author, ...post_ } = post;

    const { data: session } = useSession();

    const { blogposts, setBlogposts } = useContext(PostsContext);
    const { postContent, setPostContent } = useContext(PostsContext);

    const [editPostForm, setEditPostForm] = useState({ ...post_ });

    const submit_btn_ref = useRef(null);

    useEffect(() => {
        if (postContent)
            setEditPostForm({
                ...editPostForm,
                content: postContent
            })
    }, [postContent]);

    const clearPostEditingForm = () => {
        const cleared_post = {};

        for (const field in post_) {
            if (Object.prototype.hasOwnProperty.call(post_, field)) {
                cleared_post[field] = '';
            }
        }

        setEditPostForm({
            ...cleared_post
        });
    }

    const handleChangeInPostEditingForm = (e) => {
        setEditPostForm({
            ...editPostForm,
            [e.target.name]: e.target.value
        });
    }

    const handleEditPostSubmition = async (e) => {
        try {
            // Prevent the default form behaviour.
            e.preventDefault();

            // Send a PUT. request to the API to update the post
            const options = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${session?.user.id}`,
                },
                body: JSON.stringify(editPostForm)
            };

            const res = await fetch(`/api/posts/update/${post.slug}`, options)
            if (!res?.ok) throw new Error(res.error);

            const { message: update_message, updated_post } = await res.json();

            toast.success(update_message, {
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

            setBlogposts(
                blogposts.map((blogpost) => {
                    if (blogpost._id === updated_post._id)
                        return updated_post;

                    return blogpost;
                })
            );

        } catch (error) {
            console.log(error.message);

            toast.error('Failed to update post.', {
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
        } finally {
            clearPostEditingForm();
        }
    }

    return (
        <React.Fragment>
            <Dialog className='dialogue-min-w-full'>
                <DialogTrigger
                    className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Edit post"
                    onClick={() => {
                        setEditPostForm({
                            ...post_,
                        })
                    }}
                >
                    {/* <PencilIcon className="h-5 w-5" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-gray-900">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                </DialogTrigger>

                <DialogContent className="max-h-[80%] overflow-y-scroll">

                    <DialogHeader>
                        <DialogTitle>Edit post</DialogTitle>
                    </DialogHeader>

                    <DialogDescription></DialogDescription>

                    <div id='edit_post_form' className="container py-4">
                        <form
                            onSubmit={handleEditPostSubmition}
                            className="space-y-6">
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
                                    value={editPostForm.title}
                                    onChange={handleChangeInPostEditingForm}
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
                                    value={editPostForm.description}
                                    onChange={handleChangeInPostEditingForm}
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
                                    value={editPostForm.category}
                                    onChange={handleChangeInPostEditingForm}
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
                                    value={editPostForm.image_url}
                                    onChange={handleChangeInPostEditingForm}
                                />
                            </div>

                            {/* Upload Markdown */}
                            <div>
                                <input
                                    type="text"
                                    id="content"
                                    name="content"
                                    value={JSON.stringify(editPostForm.content)}
                                    readOnly hidden
                                />
                                <BlogPostEditor
                                    setPostContent={setPostContent}
                                    initial_value={post.content.md_content}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                ref={submit_btn_ref}
                                hidden
                            >
                            </button>
                        </form>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={
                                (e) => {
                                    submit_btn_ref.current.click();
                                }
                            }
                        >
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </React.Fragment>
    )
}

export default EditPost;
