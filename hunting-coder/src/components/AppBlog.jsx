"use client";
import React, { useContext, useEffect, useState } from 'react'
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

    const [blogposts, setBlogposts] = useState([]);
    const [blogpostsMap, setBlogpostsMap] = useState(new Map());
    const [error, setError] = useState(null);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const [page, setPage] = useState(0);

    const loadPosts = async () => {
        try {
            const page_limit = 5;

            const { posts, total_posts } = await fetchPosts(`/api/posts/list/?page=${page + 1}&limit=${page_limit}`);

            posts.some((post) => {
                console.log(blogpostsMap);

                return !blogpostsMap.has(post._id);
            }) &&
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

    useEffect(() => {
        setBlogposts([]);
        setPage(0);
        if (blogposts.length === 0) {
            loadPosts();
        }
    }, []);
    useEffect(() => {
        if (!!blogposts.length) {
            const blogposts_map = new Map(
                blogposts.map(post => [post._id, post])
            );
            setBlogpostsMap(blogposts_map);
        }
    }, [blogposts]);

    return (
        error ?
            <DisplayError error={error} /> :
            (
                <div className="container mx-auto py-20">
                    <main>
                        <AppHeader />
                        <section>
                            {
                                !!blogposts ?
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
