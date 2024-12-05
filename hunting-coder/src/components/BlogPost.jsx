"use client";
import React, { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PostAdminControls from './PostAdminControls';

const BlogPost = ({ post, isAdmin = false }) => {
    const router = useRouter();

    return (
        <article className="relative flex flex-col md:flex-row items-start rounded-lg shadow shadow-violet-200 overflow-hidden border hover:shadow-md hover:shadow-violet-200 transition-shadow duration-300">
            {/* Image Section */}
            <figure className="w-full md:w-1/3 h-60 relative">
                <Image
                    alt="Post image"
                    src={post.image_url}
                    fill
                    sizes="100%"
                />
            </figure>

            {/* Content Section */}
            <section className="flex-1 flex flex-col h-60 p-6 justify-between">
                {/* Header: Category and Date */}
                <header className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm mb-4">
                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toDateString()}
                        </time>
                        <span className="mx-2">•</span>
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-indigo-500 hover:text-indigo-600 ring-1 ring-inset ring-gray-200">
                            <p>{post.category}</p>
                        </span>
                    </div>
                </header>

                {/* Main Content: Title and Description */}
                <div className='flex flex-col justify-evenly h-full'>
                    <h3
                        className="text-xl font-semibold mb-2 cursor-pointer hover:text-indigo-600"
                        onClick={() => router.push(`/blogpost/${post.slug}`)}
                    >
                        {post.title}
                    </h3>
                    {post.description && (
                        <p className="text-sm mb-4 line-clamp-3">
                            {post.description}
                        </p>
                    )}
                </div>

                {/* Footer: Author Section */}
                <footer className="mt-auto flex items-center space-x-4 pt-4 border-t border-gray-200">
                    {post.author.image && (
                        <Image
                            src={post.author.image}
                            alt={post.author.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    )}
                    <div>
                        <p className="text-sm font-semibold">{post.author.name}</p>
                        <p className="text-xs ">{post.author.role}</p>
                    </div>
                </footer>
            </section>

            {/* Admin Controls */}
            {
                isAdmin &&
                <PostAdminControls post={post} />
            }
        </article>
    );
}

export default BlogPost;
