"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { PostContext } from '@/contexts/post-context/context';
import BlogPost from '@/components/BlogPost';
import Loading from '@/components/Loading';
import DisplayError from '@/components/DisplayError';
import PostsNotFound from '@/components/PostsNotFound';
import InfiniteScroll from 'react-infinite-scroller';
import { ReactTyped } from 'react-typed';

const fetchPosts = async (url, options) => {
    try {
        const res = await fetch(url, options)
        if (!res?.ok) throw new Error(res.error);

        let posts = await res.json();
        return posts;

    } catch (error) {
        throw error;
    }
};

const DashboardPosts = () => {

    const { data: session } = useSession();

    const { blogposts, setBlogposts } = useContext(PostContext);

    const [error, setError] = useState(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [page, setPage] = useState(0);

    const loadPosts = async (user) => {
        try {
            if (!user)
                return

            const page_limit = 5;

            const url = `/api/posts/list/?page=${page + 1}&limit=${page_limit}`;
            const fetch_options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user?.id}`,
                }
            };

            const { posts, total_posts } = await fetchPosts(url, fetch_options);

            setBlogposts((prev_posts) => {
                const posts_to_set = posts.filter((post) => {
                    return !blogpostsMap().has(post._id)
                });

                return [...blogposts, ...posts_to_set];
            });

            const total_pages = Math.ceil(total_posts / page_limit);

            if (page + 1 === total_pages) {
                setHasMorePosts(false);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setPage(page + 1);
        }
    }

    function blogpostsMap() {
        const blogposts_map = new Map(
            blogposts.map(post => [post._id, post])
        );
        return blogposts_map;
    }

    // Rendering Portion.

    return (
        error ?
            <DisplayError error={error} /> :
            <div className="container mx-auto py-10">
                <main>
                    {
                        session?.user &&
                        <header className="mb-14">
                            <h1 className="text-3xl font-semibold">
                                Coding Articles
                                <br className="block md:hidden" /> By {" "}
                                <span
                                    className="font-medium italic text-violet-500 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-violet-500 hover:after:w-full after:transition-all after:duration-300"
                                >
                                    <ReactTyped
                                        strings={[session?.user?.name || "Guest"]}
                                        typeSpeed={40}
                                        backSpeed={50}
                                        backDelay={1500}
                                        loop
                                    />
                                </span>
                            </h1>
                        </header>
                    }


                    <section>
                        {
                            session?.user && blogposts ?
                                <InfiniteScroll
                                    pageStart={page}
                                    loadMore={() => loadPosts(session?.user)}
                                    hasMore={hasMorePosts}
                                    loader={<Loading key={page} />}
                                >
                                    {/* Blog Posts Container*/}
                                    <div className='grid grid-cols-1 gap-5'>
                                        {
                                            blogposts.map((post, i) => (
                                                <React.Fragment key={i}>
                                                    <BlogPost post={post} isAdmin={true} />
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </InfiniteScroll> :
                                <PostsNotFound />
                        }
                    </section>
                </main>
            </div>
    );
};

export default DashboardPosts;