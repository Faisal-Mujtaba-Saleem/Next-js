"use client";
import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs';

const BlogArticle = ({ blogpost }) => {
    const blogContentRef = useRef(null);

    useEffect(() => {
        const code_elements = document.querySelectorAll('[data-language]');
        for (const element of code_elements) {
            element.classList.add(`language-${element.getAttribute('data-language')}`);
        }

        if (blogContentRef?.current) {
            Prism.highlightAll();
        }
    }, [blogpost, blogContentRef])

    return (
        <React.Fragment>
            <article className="container mx-auto p-6 lg:p-12">

                {/* Header Section */}
                <header className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <p className=" font-light italic">
                            {
                                new Date(blogpost?.publishedAt).toDateString()
                            }
                        </p>
                        <span className="dark:bg-indigo-200 bg-black rounded-full w-1 h-1">.</span>
                        <p className="font-semibold">{blogpost?.author?.name}</p>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 px-32">{blogpost?.title}</h1>
                    {
                        blogpost?.description &&
                        <p className="text-base max-w-2xl mx-auto font-medium italic">
                            <span className="pl-4 border-l-2 border-gray-500">
                                &#x0022;
                                {blogpost?.description}
                                &#x0022;
                            </span>
                        </p>
                    }
                </header>

                {/* Main Content */}
                <section className="space-y-8">
                    <style jsx>{`
                        #blog-content :global(h1) {
                            font-size: 2.25rem;
                            margin-bottom: 1rem;
                        }

                        #blog-content :global(h2) {
                            font-size: 1.875rem;
                            margin-bottom: 0.75rem;
                        }

                        #blog-content :global(h3) {
                            font-size: 1.5rem;
                            margin-bottom: 0.5rem;
                        }

                        #blog-content :global(h4) {
                            font-size: 1.125rem;
                            margin-bottom: 0.25rem;
                        }

                        #blog-content :global(h5) {
                            font-size: 1rem;
                            margin-bottom: 0.75rem;
                        }

                        #blog-content :global(h6) {
                            font-size: 0.375rem;
                            margin-bottom: 0.25rem;
                        }

                        #blog-content :global(p) {
                            font-size: 1rem;
                            line-height: 1.6;
                            margin-bottom: 1rem;
                        }

                        #blog-content :global(img) {
                            max-width: 100%;
                            height: auto;
                            display: block;
                            margin: 1rem 0;
                        }

                        #blog-content :global(a) {
                            color: #0070f3;
                            text-decoration: underline;
                        }

                        #blog-content :global(a:hover) {
                            color: #0056c1;
                        }
                    `}</style>
                    <div
                        ref={blogContentRef}
                        id='blog-content'
                        className="prose lg:prose-xl dark:prose-invert language-py container mx-auto"
                        dangerouslySetInnerHTML={{ __html: blogpost.content.html_content }}
                    />
                </section>
            </article>
        </React.Fragment>
    )
}

export default BlogArticle
