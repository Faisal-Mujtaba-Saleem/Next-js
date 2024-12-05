import BlogArticle from '@/components/BlogArticle';
import Loading from '@/components/Loading';
import React from 'react'

const blogpost = async ({ params }) => {
    const { slug } = await params;

    const fetchPost = async () => {
        try {
            const options = { method: 'GET' };

            const res = await fetch(`http://localhost:3000/api/posts/retrieve/${slug}`, options);
            if (!res.ok) throw new Error(res.error);

            return res.json();
        } catch (error) {
            throw error;
        }
    }

    const blogpost = await fetchPost();

    if (!blogpost) return <Loading />

    return (
        <BlogArticle blogpost={blogpost} />
    );
};

export default blogpost;