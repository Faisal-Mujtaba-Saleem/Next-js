import BlogArticle from '@/components/BlogArticle';
import Loading from '@/components/Loading';
import React from 'react'

const fetchPost = async (slug) => {
    try {
        const options = { method: 'GET' };

        const res = await fetch(`http://localhost:3000/api/posts/retrieve/${slug}`, options);
        if (!res.ok) throw new Error(res.error);

        return res.json();
    } catch (error) {
        throw error;
    }
}

const Page = async ({ params }) => {
    const { slug } = await params;

    const blogpost = await fetchPost(slug);

    if (!blogpost) return <Loading />

    return (
        <BlogArticle blogpost={blogpost} />
    );
};

export default Page;

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const blogpost = await fetchPost(slug);

    return {
        title: `Hunting Coder - ${blogpost?.title}`,
        description: blogpost?.description || `Discover insightful content on Hunting Coder - ${blogpost?.title}. Explore expert advice, coding tutorials, and the latest trends in ${blogpost?.category} to sharpen your skills and stay at the forefront of the tech industry.`
    }
}