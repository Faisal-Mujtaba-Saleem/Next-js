"use client";
import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '@/contexts/post-context/context';
import AppHeader from '@/components/AppHeader';
import BlogPost from '@/components/BlogPost';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '@/components/Loading';
import DisplayError from '@/components/DisplayError';
import PostsNotFound from './PostsNotFound';

const fetchPosts = async (url) => {
    try {
        const options = {
            method: 'GET',
        };

        const res = await fetch(url, options)
        if (!res?.ok) throw new Error(res.error);

        let { posts, total_posts } = await res.json();
        if (!posts || !Array.isArray(posts)) throw new Error('Invalid posts');

        return { posts, total_posts };

    } catch (error) {
        throw error;
    }
};

const AppBlog = () => {
    const { blogposts, setBlogposts } = useContext(PostContext);

    const [error, setError] = useState(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [page, setPage] = useState(0);

    const loadPosts = async () => {
        try {
            const page_limit = 5;

            const { posts, total_posts } = await fetchPosts(`/api/posts/list/?page=${page + 1}&limit=${page_limit}`);

            setBlogposts([...blogposts, ...posts]);

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

    return (
        error ?
            <DisplayError error={error} /> :
            (
                <div className="container mx-auto py-20">
                    <main>
                        <AppHeader />
                        <section>
                            {
                                !!blogposts && !!blogposts?.length ?
                                    <InfiniteScroll
                                        pageStart={page}
                                        loadMore={loadPosts}
                                        hasMore={hasMorePosts}
                                        loader={<Loading key={page} />}
                                    >
                                        {/* Blog Posts Container*/}
                                        <div className='grid grid-cols-1 gap-5'>
                                            {
                                                blogposts.map((post, i) => (
                                                    <React.Fragment key={i}>
                                                        <BlogPost post={post} />
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
            )
    );
}

export default AppBlog
