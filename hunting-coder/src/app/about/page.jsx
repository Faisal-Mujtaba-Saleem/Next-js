import React from "react";
import Link from "next/link";
import AboutHeader from "@/components/AboutHeader";

const Page = () => {
    return (
        <main className="bg-background/100 min-h-screen">
            {/* Hero Section */}
            <header className="relative bg-gradient-to-r from-violet-900 to-indigo-600 text-white py-20 px-5 md:px-10">
                <AboutHeader />
            </header>

            {/* About Section */}
            <section className="py-16 px-5 md:px-10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">
                        About Us
                    </h2>
                    <p className="text-lg leading-relaxed text-center md:text-left">
                        Welcome to *Hunting Coder*, the ultimate destination for all
                        coding enthusiasts. Whether you&#39;re a beginner hunting for your
                        first coding challenge or a seasoned coder sharpening your
                        skills, this is the place for you. Here, we share insightful
                        articles, tutorials, and tips that empower coders to achieve
                        their full potential. As the saying goes, &quot;A hunting coder
                        never rests!&quot; And that&#39;s exactly the spirit of this blog.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-background/100 shadow-lg p-6 rounded-lg hover:shadow-2xl dark:shadow-violet-900 transition-all">
                            <h3 className="text-xl font-bold text-purple-600 mb-4">
                                Our Mission
                            </h3>
                            <p>
                                To empower coders of all levels by sharing knowledge,
                                inspiring innovation, and fostering a community of
                                lifelong learners.
                            </p>
                        </div>
                        <div className="bg-background/100 shadow-lg p-6 rounded-lg hover:shadow-2xl dark:shadow-violet-900 transition-all">
                            <h3 className="text-xl font-bold text-blue-600 mb-4">
                                What We Do
                            </h3>
                            <p>
                                From detailed tutorials to coding challenges, we provide
                                valuable resources and insights to help coders succeed
                                and thrive.
                            </p>
                        </div>
                        <div className="bg-background/100 shadow-lg p-6 rounded-lg hover:shadow-2xl dark:shadow-violet-900 transition-all">
                            <h3 className="text-xl font-bold text-yellow-600 mb-4">
                                Join Our Journey
                            </h3>
                            <p>
                                Be part of our community where ideas are shared, stories
                                are told, and coding excellence is celebrated.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="bg-gradient-to-r from-gray-900 to-gray-600 text-white py-16 px-5 md:px-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-lg md:text-xl mb-8">
                        Got questions or ideas? Reach out to us and become a part of
                        the Hunting Coder community!
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block px-8 py-3 text-lg bg-yellow-400 text-gray-900 rounded-lg shadow-md hover:bg-yellow-500 transition">
                        Contact Us
                    </Link>
                </div>
            </section>
        </main >
    );
};

export default Page;

export const metadata = {
    title: "Hunting Coder - About",
    description: "Learn more about Hunting Coder – a platform dedicated to tech enthusiasts, coders, and programmers. Discover our mission, vision, and how we're empowering a community to share knowledge and grow in the tech industry.",
};