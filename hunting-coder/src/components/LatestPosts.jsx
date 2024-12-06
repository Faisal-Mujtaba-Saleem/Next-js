import React from 'react'
import Image from "next/image";
import Link from "next/link";
import PostsNotFound from './PostsNotFound'

const LatestPosts = ({ blogposts }) => {

    if (!blogposts?.length) {
        return <PostsNotFound />
    }

    return (
        <div>
            <h2 className="p-4 pb-8">
                <span className="text-2xl font-bold">Latest Posts</span>
            </h2>
            <div className="container grid gap-8 lg:grid-cols-3 mx-auto">
                {/* <!-- Blog Posts --> */}
                {
                    blogposts.map((post) => (
                        <article
                            key={post._id}
                            className="rounded-lg shadow shadow-violet-200 flex flex-col overflow-hidden h-full transition-transform transform hover:scale-105 duration-300">

                            {/* Card Header (Image) */}
                            <header className="relative w-full h-60">
                                <Image
                                    src={post.image_url}
                                    alt="Post image"
                                    fill
                                    sizes="100%"
                                    className="object-cover"
                                />
                            </header>

                            {/* Card Body */}
                            <section className="flex flex-col justify-between grow p-6">
                                {/* Post Metadata */}
                                <div className="flex items-center text-sm mb-4">
                                    <time dateTime={post.publishedAt}>
                                        {new Date(post.publishedAt).toDateString()}
                                    </time>
                                    <span className="mx-2">•</span>
                                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-indigo-500 hover:text-indigo-600 ring-1 ring-inset ring-gray-200">
                                        <p>{post.category}</p>
                                    </span>
                                </div>

                                {/* Title and Description */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold">
                                        <Link href={`/blogpost/${post.slug}`} className="hover:text-indigo-600">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    {post.description && (
                                        <p className="mt-2 line-clamp-3">
                                            {post.description}
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* Card Footer */}
                            <footer className="flex items-center p-6 border-t border-gray-100">
                                {post?.author?.image && (
                                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 mr-3">
                                        <Image
                                            src={post?.author?.image}
                                            alt={post?.author?.name}
                                            width={48}
                                            height={48}
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold">{post?.author?.name}</p>
                                    <p className="text-sm">{post?.author?.role}</p>
                                </div>
                            </footer>
                        </article>
                    ))
                }
            </div>
        </div>
    )
}

export default LatestPosts
